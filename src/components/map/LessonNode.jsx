import { useGame } from '../../contexts/GameContext';
import { isLockedOut } from '../../utils/hearts';

const typeIcons = {
  concept: '{ }',
  prompt: '>_',
  review: '?',
  debug: '🐛',
  project: '📦',
  boss: '💀',
};

export default function LessonNode({ lesson, index, total, completed, perfect, isAvailable, isLocked, worldTheme }) {
  const { state, dispatch } = useGame();
  const isBoss = lesson.type === 'boss';
  const hearts = state.user.hearts;
  const locked = isLocked || (isLockedOut(hearts) && !completed);

  // Alternate left-right positioning
  const offset = index % 2 === 0 ? -40 : 40;

  function handleClick() {
    if (locked) return;
    dispatch({ type: 'START_LESSON', lessonId: lesson.id });
  }

  const size = isBoss ? 'w-14 h-14' : 'w-11 h-11';
  const shape = isBoss ? 'rotate-45 rounded-lg' : 'rounded-full';

  let bgColor = '#334155';
  let borderColor = '#475569';
  let textColor = '#64748b';

  if (completed) {
    bgColor = worldTheme.bg;
    borderColor = worldTheme.accent;
    textColor = worldTheme.accent;
  }
  if (isAvailable) {
    bgColor = worldTheme.bg;
    borderColor = worldTheme.accent;
    textColor = worldTheme.accent;
  }

  return (
    <div className="flex flex-col items-center" style={{ transform: `translateX(${locked ? 0 : offset}px)` }}>
      <button
        onClick={handleClick}
        disabled={locked}
        className={`${size} ${shape} border-2 flex items-center justify-center transition-all duration-300 relative ${
          isAvailable ? 'animate-pulse-glow cursor-pointer hover:scale-110' :
          completed ? 'cursor-pointer hover:scale-105' :
          'cursor-not-allowed'
        }`}
        style={{
          background: bgColor,
          borderColor,
          '--glow-color': worldTheme.glow,
        }}
        title={locked ? '🔒 Locked' : lesson.title}
      >
        <span className={`text-xs font-bold ${isBoss ? '-rotate-45' : ''}`} style={{ color: textColor }}>
          {locked ? '🔒' : completed ? '✓' : typeIcons[lesson.type] || (index + 1)}
        </span>

        {perfect && (
          <span className="absolute -top-1 -right-1 text-xs">⭐</span>
        )}
      </button>

      {(isAvailable || completed) && (
        <span className="text-xs mt-1 text-slate-400 max-w-28 text-center leading-tight">
          {lesson.title}
        </span>
      )}
    </div>
  );
}
