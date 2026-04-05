import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import db from './db.js';
import { generateToken, authMiddleware } from './auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY || '';

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// ──────────────────────────────────────────
// AUTH ROUTES
// ──────────────────────────────────────────

app.post('/api/auth/signup', (req, res) => {
  const { username, email, password, displayName } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }
  if (username.length < 3 || username.length > 20) {
    return res.status(400).json({ error: 'Username must be 3-20 characters' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE username = ? OR email = ?').get(username, email);
  if (existing) {
    return res.status(409).json({ error: 'Username or email already exists' });
  }

  const hash = bcrypt.hashSync(password, 10);
  const result = db.prepare(
    'INSERT INTO users (username, email, password_hash, display_name) VALUES (?, ?, ?, ?)'
  ).run(username, email.toLowerCase(), hash, displayName || username);

  const token = generateToken(result.lastInsertRowid);

  res.status(201).json({
    token,
    user: { id: result.lastInsertRowid, username, email, displayName: displayName || username },
  });
});

app.post('/api/auth/login', (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ error: 'Login and password are required' });
  }

  const user = db.prepare(
    'SELECT id, username, email, password_hash, display_name FROM users WHERE username = ? OR email = ?'
  ).get(login, login.toLowerCase());

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken(user.id);

  res.json({
    token,
    user: { id: user.id, username: user.username, email: user.email, displayName: user.display_name },
  });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = db.prepare('SELECT id, username, email, display_name FROM users WHERE id = ?').get(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, username: user.username, email: user.email, displayName: user.display_name });
});

// ──────────────────────────────────────────
// PROGRESS SYNC
// ──────────────────────────────────────────

app.get('/api/progress', authMiddleware, (req, res) => {
  const row = db.prepare('SELECT game_state, updated_at FROM progress WHERE user_id = ?').get(req.userId);
  if (!row) return res.json({ gameState: null });

  res.json({ gameState: JSON.parse(row.game_state), updatedAt: row.updated_at });
});

app.put('/api/progress', authMiddleware, (req, res) => {
  const { gameState } = req.body;
  if (!gameState) return res.status(400).json({ error: 'gameState is required' });

  const stateStr = JSON.stringify(gameState);
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO progress (user_id, game_state, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET game_state = ?, updated_at = ?
  `).run(req.userId, stateStr, now, stateStr, now);

  // Update leaderboard cache
  const user = db.prepare('SELECT display_name FROM users WHERE id = ?').get(req.userId);
  const u = gameState.user || {};
  const p = gameState.progress || {};

  db.prepare(`
    INSERT INTO leaderboard_cache (user_id, display_name, level, xp, streak, lessons_completed, worlds_completed, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      display_name = ?, level = ?, xp = ?, streak = ?, lessons_completed = ?, worlds_completed = ?, updated_at = ?
  `).run(
    req.userId, user?.display_name || u.name || 'Builder',
    u.level || 1, u.xp || 0, u.streak?.current || 0,
    p.completedLessons?.length || 0, p.worldsCompleted || 0, now,
    user?.display_name || u.name || 'Builder',
    u.level || 1, u.xp || 0, u.streak?.current || 0,
    p.completedLessons?.length || 0, p.worldsCompleted || 0, now,
  );

  res.json({ success: true, updatedAt: now });
});

// ──────────────────────────────────────────
// LEADERBOARD
// ──────────────────────────────────────────

app.get('/api/leaderboard', (req, res) => {
  const { sort = 'xp', limit = 50 } = req.query;
  const validSorts = { xp: 'xp DESC', streak: 'streak DESC', lessons: 'lessons_completed DESC', level: 'level DESC, xp DESC' };
  const orderBy = validSorts[sort] || 'xp DESC';
  const maxLimit = Math.min(parseInt(limit) || 50, 100);

  const rows = db.prepare(`
    SELECT user_id, display_name, level, xp, streak, lessons_completed, worlds_completed
    FROM leaderboard_cache
    ORDER BY ${orderBy}
    LIMIT ?
  `).all(maxLimit);

  res.json({
    entries: rows.map((r, i) => ({ rank: i + 1, ...r })),
    total: db.prepare('SELECT COUNT(*) as count FROM leaderboard_cache').get().count,
  });
});

app.get('/api/leaderboard/me', authMiddleware, (req, res) => {
  const me = db.prepare('SELECT * FROM leaderboard_cache WHERE user_id = ?').get(req.userId);
  if (!me) return res.json({ rank: null, entry: null });

  const rank = db.prepare('SELECT COUNT(*) as count FROM leaderboard_cache WHERE xp > ?').get(me.xp).count + 1;
  res.json({ rank, entry: me });
});

// ──────────────────────────────────────────
// AI TUTOR PROXY
// ──────────────────────────────────────────

app.post('/api/tutor', authMiddleware, async (req, res) => {
  const apiKey = CLAUDE_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'AI tutor not configured on this server' });
  }

  const { code, lessonTitle, lessonInstruction, question } = req.body;
  if (!code && !question) {
    return res.status(400).json({ error: 'Code or question is required' });
  }

  const systemPrompt = `You are a friendly coding tutor helping a student in CodeForge, a learn-to-code app. The student is working on "${lessonTitle || 'a coding lesson'}".

Lesson: ${(lessonInstruction || '').slice(0, 500)}

Rules:
- Give SHORT hints (2-3 sentences max)
- Don't give the full answer — guide them toward it
- Point out specific issues in their code
- Be encouraging and supportive
- Use simple language`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 250,
        system: systemPrompt,
        messages: [{ role: 'user', content: `My code:\n\`\`\`\n${(code || '').slice(0, 2000)}\n\`\`\`\n\n${question || "I'm stuck. Help?"}` }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(502).json({ error: 'Claude API error', detail: err });
    }

    const data = await response.json();
    res.json({ message: data.content?.[0]?.text || 'No response generated.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reach Claude API' });
  }
});

// ──────────────────────────────────────────
// STATS (public)
// ──────────────────────────────────────────

app.get('/api/stats', (req, res) => {
  const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  const totalLessonsCompleted = db.prepare('SELECT COALESCE(SUM(lessons_completed), 0) as total FROM leaderboard_cache').get().total;
  const topLevel = db.prepare('SELECT COALESCE(MAX(level), 0) as max FROM leaderboard_cache').get().max;
  const topStreak = db.prepare('SELECT COALESCE(MAX(streak), 0) as max FROM leaderboard_cache').get().max;

  res.json({ totalUsers, totalLessonsCompleted, topLevel, topStreak });
});

// ──────────────────────────────────────────
// HEALTH CHECK
// ──────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), aiTutor: !!CLAUDE_API_KEY });
});

// ──────────────────────────────────────────
// START
// ──────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`🔥 CodeForge API running on http://localhost:${PORT}`);
  console.log(`   AI Tutor: ${CLAUDE_API_KEY ? 'enabled' : 'disabled (set CLAUDE_API_KEY)'}`);
});
