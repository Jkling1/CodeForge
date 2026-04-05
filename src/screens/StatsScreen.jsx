import { useMemo } from 'react';
import { useGame } from '../contexts/GameContext';
import { getXPProgress, getLevelTitle, getLevelColor, getStreakMultiplier } from '../utils/xp';
import { allLessons } from '../data/lessons/index';

export default function StatsScreen() {
  const { state } = useGame();
  const { user, progress, stats } = state;
  const xpInfo = getXPProgress(user.xp);

  // XP chart - last 7 days
  const xpChart = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({ date: key, label: d.toLocaleDateString('en', { weekday: 'short' }), xp: stats.xpHistory[key] || 0 });
    }
    return days;
  }, [stats.xpHistory]);

  const maxXP = Math.max(...xpChart.map(d => d.xp), 1);

  // Language bars
  const languages = [
    { name: 'HTML', key: 'html', color: '#f97316' },
    { name: 'CSS', key: 'css', color: '#38bdf8' },
    { name: 'JavaScript', key: 'javascript', color: '#facc15' },
    { name: 'Python', key: 'python', color: '#4ade80' },
    { name: 'Ruby', key: 'ruby', color: '#f87171' },
  ];

  // Accuracy
  const totalAttempts = Object.values(progress.lessonAttempts).reduce((a, b) => a + b, 0);
  const accuracy = progress.completedLessons.length > 0 && totalAttempts > 0
    ? Math.round((progress.completedLessons.length / (progress.completedLessons.length + totalAttempts)) * 100)
    : 100;

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-slate-100">Stats</h1>

      {/* Level Card */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-3"
            style={{ borderColor: getLevelColor(xpInfo.level), color: getLevelColor(xpInfo.level) }}
          >
            {xpInfo.level}
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold text-slate-100">{getLevelTitle(xpInfo.level)}</div>
            <div className="text-sm text-slate-400">{user.xp.toLocaleString()} XP total</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${xpInfo.progress * 100}%`, background: getLevelColor(xpInfo.level) }} />
              </div>
              <span className="text-xs text-slate-400">{xpInfo.xpInLevel}/{xpInfo.xpNeeded}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-800 rounded-xl p-3 border border-slate-700 text-center">
          <div className="text-2xl font-bold text-warning">{user.streak.current}</div>
          <div className="text-xs text-slate-400">Day Streak</div>
          <div className="text-xs text-slate-500">Best: {user.streak.best}</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-3 border border-slate-700 text-center">
          <div className="text-2xl font-bold text-primary">{progress.completedLessons.length}</div>
          <div className="text-xs text-slate-400">Lessons</div>
          <div className="text-xs text-slate-500">{allLessons.length} total</div>
        </div>
        <div className="bg-slate-800 rounded-xl p-3 border border-slate-700 text-center">
          <div className="text-2xl font-bold text-success">{accuracy}%</div>
          <div className="text-xs text-slate-400">Accuracy</div>
        </div>
      </div>

      {/* XP Chart */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h3 className="text-sm font-bold text-slate-300 mb-3">XP This Week</h3>
        <div className="flex items-end justify-between gap-1 h-24">
          {xpChart.map(day => (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
              <div className="text-xs text-slate-500 font-mono">{day.xp > 0 ? day.xp : ''}</div>
              <div className="w-full bg-slate-700 rounded-t relative" style={{ height: `${Math.max(4, (day.xp / maxXP) * 80)}px` }}>
                <div className="absolute inset-0 bg-primary/60 rounded-t" style={{ height: `${(day.xp / maxXP) * 100}%` }} />
              </div>
              <div className="text-xs text-slate-500">{day.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Language Proficiency */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h3 className="text-sm font-bold text-slate-300 mb-3">Language Progress</h3>
        <div className="space-y-3">
          {languages.map(lang => {
            const count = progress.languageLessons[lang.key] || 0;
            const max = allLessons.filter(l => l.language === lang.key).length || 10;
            const pct = Math.min(100, (count / max) * 100);
            return (
              <div key={lang.key} className="flex items-center gap-3">
                <span className="text-xs text-slate-400 w-20">{lang.name}</span>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: lang.color }} />
                </div>
                <span className="text-xs text-slate-500 w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak Multiplier */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-300">Streak Multiplier</h3>
            <p className="text-xs text-slate-400">Keep your streak going for bonus XP</p>
          </div>
          <div className="text-2xl font-bold text-warning">{getStreakMultiplier(user.streak.current)}x</div>
        </div>
      </div>

      {/* World Progress */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h3 className="text-sm font-bold text-slate-300 mb-3">Worlds Completed</h3>
        <div className="flex gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-3 rounded-full ${i < progress.worldsCompleted ? 'bg-success' : 'bg-slate-700'}`}
            />
          ))}
        </div>
        <div className="text-xs text-slate-400 mt-1">{progress.worldsCompleted}/10</div>
      </div>
    </div>
  );
}
