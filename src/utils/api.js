const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

let authToken = localStorage.getItem('codeforge_token');

function setToken(token) {
  authToken = token;
  if (token) localStorage.setItem('codeforge_token', token);
  else localStorage.removeItem('codeforge_token');
}

function getToken() {
  return authToken;
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const error = new Error(data?.error || `Request failed (${res.status})`);
    error.status = res.status;
    throw error;
  }
  return data;
}

// ── Auth ──

export async function signup(username, email, password, displayName) {
  const data = await request('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ username, email, password, displayName }),
  });
  setToken(data.token);
  return data;
}

export async function login(login, password) {
  const data = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ login, password }),
  });
  setToken(data.token);
  return data;
}

export async function getMe() {
  return request('/api/auth/me');
}

export function logout() {
  setToken(null);
}

export function isLoggedIn() {
  return !!authToken;
}

// ── Progress Sync ──

export async function loadProgress() {
  return request('/api/progress');
}

export async function saveProgress(gameState) {
  return request('/api/progress', {
    method: 'PUT',
    body: JSON.stringify({ gameState }),
  });
}

// ── Leaderboard ──

export async function getLeaderboard(sort = 'xp', limit = 50) {
  return request(`/api/leaderboard?sort=${sort}&limit=${limit}`);
}

export async function getMyRank() {
  return request('/api/leaderboard/me');
}

// ── AI Tutor ──

export async function askTutor(code, lessonTitle, lessonInstruction, question) {
  return request('/api/tutor', {
    method: 'POST',
    body: JSON.stringify({ code, lessonTitle, lessonInstruction, question }),
  });
}

// ── Stats ──

export async function getGlobalStats() {
  return request('/api/stats');
}

// ── Health ──

export async function checkServer() {
  try {
    const data = await request('/api/health');
    return data;
  } catch {
    return null;
  }
}

export { setToken, getToken };
