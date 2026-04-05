import { useGame } from '../../contexts/GameContext';
import { getLevelTitle, getLevelColor } from '../../utils/xp';

const confettiColors = ['#7dd3fc', '#4ade80', '#fbbf24', '#c084fc', '#f87171', '#fb923c'];

export default function LevelUpModal() {
  const { state, dispatch } = useGame();
  const level = state.ui.newLevel;
  if (!level) return null;

  const color = getLevelColor(level);
  const title = getLevelTitle(level);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: confettiColors[i % confettiColors.length],
              left: `${Math.random() * 100}%`,
              animation: `confetti-fall ${1.5 + Math.random() * 2}s ease-in ${Math.random() * 0.5}s forwards`,
            }}
          />
        ))}
      </div>

      <div className="bg-slate-800 rounded-2xl p-8 text-center max-w-sm mx-4 animate-slide-in-up border border-slate-600">
        <div
          className="text-6xl font-bold mb-2 font-heading"
          style={{ color }}
        >
          Level {level}
        </div>
        <div className="text-2xl font-bold text-slate-100 mb-1">{title}</div>
        <p className="text-slate-400 mb-6">You're forging ahead! Keep building.</p>
        <button
          onClick={() => dispatch({ type: 'DISMISS_LEVEL_UP' })}
          className="px-8 py-3 rounded-lg font-bold text-slate-900 transition-transform hover:scale-105"
          style={{ background: color }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
