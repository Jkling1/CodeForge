import { useGame } from '../../contexts/GameContext';
import { getLevelTitle, getLevelColor } from '../../utils/xp';

const confettiColors = ['#7dd3fc', '#4ade80', '#fbbf24', '#c084fc', '#f87171', '#fb923c'];
const confettiShapes = ['rounded-full', 'rounded-sm', 'rounded-none'];

export default function LevelUpModal() {
  const { state, dispatch } = useGame();
  const level = state.ui.newLevel;
  if (!level) return null;

  const color = getLevelColor(level);
  const title = getLevelTitle(level);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className={`absolute ${confettiShapes[i % 3]}`}
            style={{
              background: confettiColors[i % confettiColors.length],
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              left: `${Math.random() * 100}%`,
              animation: `confetti-fall ${1.5 + Math.random() * 2.5}s ease-in ${Math.random() * 0.8}s forwards`,
            }}
          />
        ))}
      </div>

      {/* Glow ring */}
      <div
        className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: color }}
      />

      <div className="relative bg-slate-800 rounded-2xl p-8 text-center max-w-sm mx-4 animate-bounce-in border border-slate-600 shadow-2xl">
        {/* Level Number */}
        <div
          className="text-7xl font-bold mb-2 font-heading drop-shadow-lg"
          style={{ color, textShadow: `0 0 40px ${color}60` }}
        >
          {level}
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Level Up!</div>
        <div className="text-2xl font-bold text-slate-100 mb-4">{title}</div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-12" style={{ background: `${color}40` }} />
          <span style={{ color }}>✦</span>
          <div className="h-px w-12" style={{ background: `${color}40` }} />
        </div>

        <p className="text-slate-400 text-sm mb-6">You're forging ahead! Keep building.</p>
        <button
          onClick={() => dispatch({ type: 'DISMISS_LEVEL_UP' })}
          className="px-8 py-3 rounded-xl font-bold text-slate-900 transition-all hover:scale-105 hover:shadow-lg"
          style={{ background: color, boxShadow: `0 4px 20px ${color}40` }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
