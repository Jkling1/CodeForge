import { useState, useMemo } from 'react';
import { useGame } from '../contexts/GameContext';
import { allLessons } from '../data/lessons/index';
import { worlds } from '../data/worlds';

// Deterministic daily seed — same challenge for everyone each day
function getDailySeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function seededRandom(seed) {
  seed = (seed * 16807) % 2147483647;
  return { value: (seed - 1) / 2147483646, seed };
}

function getDailyChallenges(completedSet, count = 3) {
  const available = allLessons.filter(l => completedSet.has(l.id));
  if (available.length === 0) return [];
  let seed = getDailySeed();
  const challenges = [];
  const used = new Set();
  for (let i = 0; i < Math.min(count, available.length); i++) {
    const r = seededRandom(seed + i);
    seed = r.seed;
    let idx = Math.floor(r.value * available.length);
    while (used.has(idx)) idx = (idx + 1) % available.length;
    used.add(idx);
    challenges.push(available[idx]);
  }
  return challenges;
}

const typeLabels = { concept: 'Code', prompt: 'Prompt', review: 'Quiz', debug: 'Debug', project: 'Project', boss: 'Boss' };
const typeColors = { concept: 'text-primary', prompt: 'text-boss', review: 'text-warning', debug: 'text-danger', project: 'text-success', boss: 'text-boss' };

export default function PracticeScreen() {
  const { state, dispatch } = useGame();
  const { completedLessons, conceptProficiency } = state.progress;
  const [selectedWorld, setSelectedWorld] = useState(null);
  const today = new Date().toISOString().slice(0, 10);
  const dailyCompleted = state.stats.dailyChallengesCompleted?.[today] || [];

  const completedSet = useMemo(() => new Set(completedLessons), [completedLessons]);

  // Daily challenges — 3 per day, deterministic
  const dailyChallenges = useMemo(() => getDailyChallenges(completedSet, 3), [completedSet]);

  // Weak spots
  const weakSpots = useMemo(() => {
    return Object.entries(conceptProficiency)
      .filter(([, level]) => level < 2)
      .map(([concept]) => {
        const lessons = allLessons.filter(l => l.concepts?.includes(concept) && completedSet.has(l.id));
        return { concept, lessons, proficiency: conceptProficiency[concept] };
      })
      .filter(ws => ws.lessons.length > 0)
      .slice(0, 5);
  }, [conceptProficiency, completedSet]);

  // World review lessons
  const worldLessons = useMemo(() => {
    if (!selectedWorld) return [];
    return allLessons.filter(l => l.worldId === selectedWorld && completedSet.has(l.id));
  }, [selectedWorld, completedSet]);

  function playRandom() {
    const available = allLessons.filter(l => completedSet.has(l.id));
    if (available.length === 0) return;
    const lesson = available[Math.floor(Math.random() * available.length)];
    dispatch({ type: 'START_LESSON', lessonId: lesson.id });
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4 screen-transition">
      <h1 className="text-2xl font-bold text-slate-100">Practice</h1>

      {/* Hearts recovery banner */}
      {state.user.hearts.current < 5 && completedLessons.length > 0 && (
        <div className="bg-danger/10 border border-danger/30 rounded-xl p-3 flex items-center gap-3">
          <span className="text-2xl">💔</span>
          <div className="flex-1">
            <p className="text-sm text-slate-200 font-medium">Low on hearts!</p>
            <p className="text-xs text-slate-400">Complete any review below to earn +1 ♥</p>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-sm ${i < state.user.hearts.current ? 'text-danger' : 'text-slate-600'}`}>♥</span>
            ))}
          </div>
        </div>
      )}

      {/* Daily Challenges */}
      {dailyChallenges.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-100">Daily Challenges</h2>
            <span className="text-xs text-slate-500">
              {dailyCompleted.length}/{dailyChallenges.length} done today
            </span>
          </div>
          <div className="space-y-2">
            {dailyChallenges.map((lesson, i) => {
              const done = dailyCompleted.includes(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => dispatch({ type: 'START_LESSON', lessonId: lesson.id })}
                  className={`w-full rounded-xl p-4 border text-left transition-all ${
                    done
                      ? 'bg-slate-800/50 border-success/20 opacity-60'
                      : 'bg-gradient-to-r from-boss-dark/20 to-primary/10 border-boss/30 hover:border-boss/50 hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${done ? 'bg-success/20 text-success' : 'bg-boss/20 text-boss'}`}>
                      {done ? '✓' : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-100 font-bold text-sm truncate">{lesson.title}</span>
                        <span className={`text-xs ${typeColors[lesson.type] || 'text-slate-400'}`}>
                          {typeLabels[lesson.type] || lesson.type}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">{lesson.description}</div>
                    </div>
                    <div className="text-xs text-primary font-bold shrink-0">
                      {done ? 'Done' : `+${Math.floor(lesson.xpReward * 0.5)} XP`}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {dailyCompleted.length === dailyChallenges.length && dailyChallenges.length > 0 && (
            <div className="text-center mt-2 text-xs text-success font-bold">
              🎉 All daily challenges complete! Come back tomorrow.
            </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
          <p className="text-slate-400">Complete some lessons to unlock daily challenges!</p>
        </div>
      )}

      {/* Quick Actions */}
      {completedLessons.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={playRandom}
            className="bg-slate-800 rounded-xl p-3 border border-slate-700 text-center hover:border-slate-500 transition-colors"
          >
            <span className="text-xl">🎲</span>
            <div className="text-xs text-slate-300 font-medium mt-1">Random</div>
          </button>
          <button
            onClick={() => {
              const weakLesson = weakSpots[0]?.lessons[0];
              if (weakLesson) dispatch({ type: 'START_LESSON', lessonId: weakLesson.id });
            }}
            className="bg-slate-800 rounded-xl p-3 border border-slate-700 text-center hover:border-warning/30 transition-colors"
            disabled={weakSpots.length === 0}
          >
            <span className="text-xl">🎯</span>
            <div className="text-xs text-slate-300 font-medium mt-1">Weak Spot</div>
          </button>
        </div>
      )}

      {/* Weak Spots */}
      {weakSpots.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Needs Practice</h2>
          <div className="flex flex-wrap gap-1.5">
            {weakSpots.map(ws => (
              <button
                key={ws.concept}
                onClick={() => {
                  if (ws.lessons[0]) dispatch({ type: 'START_LESSON', lessonId: ws.lessons[0].id });
                }}
                className="bg-slate-800 rounded-lg px-3 py-1.5 border border-warning/20 text-sm text-slate-300 hover:border-warning/40 transition-colors"
              >
                {ws.concept.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* World Review */}
      <div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">World Review</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {worlds.map((w, i) => {
            const wLessons = allLessons.filter(l => l.worldId === w.id && completedSet.has(l.id));
            if (wLessons.length === 0) return null;
            return (
              <button
                key={w.id}
                onClick={() => setSelectedWorld(selectedWorld === w.id ? null : w.id)}
                className={`shrink-0 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                  selectedWorld === w.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-slate-700 bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {w.icon} W{i + 1}
              </button>
            );
          })}
        </div>

        {selectedWorld && worldLessons.length > 0 && (
          <div className="space-y-1.5 mt-2">
            {worldLessons.map(lesson => (
              <button
                key={lesson.id}
                onClick={() => dispatch({ type: 'START_LESSON', lessonId: lesson.id })}
                className="w-full bg-slate-800/50 rounded-lg p-2.5 border border-slate-700 text-left hover:border-slate-500 transition-colors flex items-center gap-2"
              >
                <span className={`text-xs ${typeColors[lesson.type] || 'text-slate-400'}`}>
                  {typeLabels[lesson.type]}
                </span>
                <span className="text-sm text-slate-200 truncate flex-1">{lesson.title}</span>
                <span className="text-xs text-slate-500">+{Math.floor(lesson.xpReward * 0.25)} XP</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stats summary */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{completedLessons.length}</div>
            <div className="text-xs text-slate-400">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning">{state.progress.perfectLessons.length}</div>
            <div className="text-xs text-slate-400">Perfect</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success">{state.progress.worldsCompleted}</div>
            <div className="text-xs text-slate-400">Worlds</div>
          </div>
        </div>
      </div>
    </div>
  );
}
