import { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { isLockedOut } from '../../utils/hearts';
import NoHeartsModal from '../ui/NoHeartsModal';

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
  const noHearts = isLockedOut(hearts) && !completed;
  const locked = isLocked || noHearts;
  const [showNoHearts, setShowNoHearts] = useState(false);

  // Alternate left-right positioning
  const offset = index % 2 === 0 ? -40 : 40;

  function handleClick() {
    if (isLocked) return;
    if (noHearts) {
      setShowNoHearts(true);
      return;
    }
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
    <div className="flex flex-col items-center" style={{ transform: `translateX(${locked && !noHearts ? 0 : offset}px)` }}>
      <button
        onClick={handleClick}
        disabled={isLocked}
        className={`${size} ${shape} border-2 flex items-center justify-center transition-all duration-300 relative ${
          isAvailable && !noHearts ? 'animate-pulse-glow cursor-pointer hover:scale-110' :
          completed ? 'cursor-pointer hover:scale-105' :
          noHearts && !isLocked ? 'cursor-pointer opacity-60 hover:scale-105' :
          'cursor-not-allowed'
        }`}
        style={{
          background: bgColor,
          borderColor: noHearts && !isLocked ? '#f87171' : borderColor,
          '--glow-color': worldTheme.glow,
        }}
        title={isLocked ? '🔒 Locked' : noHearts ? '💔 No hearts' : lesson.title}
      >
        <span className={`text-xs font-bold ${isBoss ? '-rotate-45' : ''}`} style={{ color: textColor }}>
          {isLocked ? '🔒' : noHearts && !completed ? '💔' : completed ? '✓' : typeIcons[lesson.type] || (index + 1)}
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

      {showNoHearts && <NoHeartsModal onClose={() => setShowNoHearts(false)} />}
    </div>
  );
}
