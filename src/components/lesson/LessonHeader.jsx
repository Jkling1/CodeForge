import { useGame } from '../../contexts/GameContext';
import { getWorld } from '../../data/worlds';

export default function LessonHeader({ lesson }) {
  const { dispatch, state } = useGame();
  const world = getWorld(lesson.worldId);
  const isReview = state.progress.completedLessons.includes(lesson.id);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 shrink-0">
      <button
        onClick={() => dispatch({ type: 'NAVIGATE', screen: 'map' })}
        className="text-slate-400 hover:text-slate-100 text-lg"
      >
        ← Back
      </button>
      <div className="text-center flex-1 mx-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-medium" style={{ color: world?.theme.accent }}>
            {world?.name}
          </span>
          {isReview && (
            <span className="text-xs bg-success/20 text-success px-1.5 py-0.5 rounded font-bold">
              Review
            </span>
          )}
        </div>
        <div className="text-sm font-bold text-slate-100 truncate">{lesson.title}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-xs ${i < state.user.hearts.current ? 'text-danger' : 'text-slate-600'}`}>♥</span>
          ))}
        </div>
        <span className="text-xs text-primary font-bold">
          {isReview ? '+♥' : `+${lesson.xpReward}`}
        </span>
      </div>
    </div>
  );
}
