import { useGame } from '../../contexts/GameContext';
import { rarityColors } from '../../data/achievements';

export default function AchievementPopup() {
  const { state, dispatch } = useGame();
  const achievement = state.achievements.pending[0];
  if (!achievement) return null;

  const color = rarityColors[achievement.rarity] || '#94a3b8';

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-in-up">
      <div
        className="bg-slate-800 border rounded-xl px-6 py-4 flex items-center gap-4 shadow-lg min-w-72"
        style={{ borderColor: color }}
      >
        <span className="text-3xl">{achievement.icon}</span>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color }}>
            {achievement.rarity} Achievement
          </div>
          <div className="text-slate-100 font-bold">{achievement.name}</div>
          <div className="text-slate-400 text-sm">{achievement.description}</div>
        </div>
        <button
          onClick={() => dispatch({ type: 'DISMISS_ACHIEVEMENT' })}
          className="text-slate-500 hover:text-slate-300 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}
