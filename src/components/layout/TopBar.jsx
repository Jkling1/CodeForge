import { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import { getXPProgress, getLevelTitle, getLevelColor } from '../../utils/xp';

const REGEN_MS = 30 * 60 * 1000;

export default function TopBar() {
  const { state } = useGame();
  const { user } = state;
  const { level, progress } = getXPProgress(user.xp);
  const [regenTime, setRegenTime] = useState('');

  useEffect(() => {
    if (user.hearts.current >= 5) {
      setRegenTime('');
      return;
    }
    function update() {
      const elapsed = Date.now() - (user.hearts.lastRegenTime || Date.now());
      const remaining = Math.max(0, REGEN_MS - elapsed);
      if (remaining <= 0) {
        setRegenTime('');
      } else {
        const min = Math.floor(remaining / 60000);
        const sec = Math.floor((remaining % 60000) / 1000);
        setRegenTime(`${min}:${String(sec).padStart(2, '0')}`);
      }
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [user.hearts.current, user.hearts.lastRegenTime]);

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700 shrink-0">
      {/* Level Badge */}
      <div className="flex items-center gap-2">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2"
          style={{ borderColor: getLevelColor(level), color: getLevelColor(level) }}
        >
          {level}
        </div>
        <div className="hidden sm:block">
          <div className="text-xs text-slate-400">{getLevelTitle(level)}</div>
          <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress * 100}%`, background: getLevelColor(level) }}
            />
          </div>
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-1">
        <span className={`text-lg ${user.streak.current > 0 ? 'animate-flame' : ''}`}>🔥</span>
        <span className="text-warning font-bold text-sm">{user.streak.current}</span>
      </div>

      {/* Hearts */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-sm ${i < user.hearts.current ? 'text-danger' : 'text-slate-600'}`}>
              ♥
            </span>
          ))}
        </div>
        {regenTime && (
          <span className="text-xs text-slate-500 font-mono">{regenTime}</span>
        )}
      </div>

      {/* XP */}
      <div className="flex items-center gap-1">
        <span className="text-primary font-bold text-sm font-mono">{user.xp.toLocaleString()}</span>
        <span className="text-xs text-slate-400">XP</span>
      </div>
    </div>
  );
}
