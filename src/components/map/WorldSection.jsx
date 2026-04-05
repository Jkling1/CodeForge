import { useGame } from '../../contexts/GameContext';
import LessonNode from './LessonNode';
import { getLessonsForWorld } from '../../data/lessons/index';

export default function WorldSection({ world, worldIndex, isCompleted, isCurrent, isLocked }) {
  const { state } = useGame();
  const lessons = getLessonsForWorld(world.id);

  return (
    <div className={`relative mb-8 transition-opacity duration-500 ${isLocked ? 'opacity-40' : ''}`}>
      {/* World Header */}
      <div
        className={`relative z-10 mx-auto w-fit px-5 py-2 rounded-xl border mb-4 ${
          isCurrent ? 'animate-pulse-glow' : ''
        }`}
        style={{
          background: isLocked ? '#1e293b' : world.theme.bg,
          borderColor: isLocked ? '#475569' : world.theme.accent,
          '--glow-color': world.theme.glow,
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{world.icon}</span>
          <div>
            <h3
              className="font-bold text-sm"
              style={{ color: isLocked ? '#64748b' : world.theme.accent }}
            >
              World {worldIndex + 1}
            </h3>
            <h2 className="font-bold text-base text-slate-100">
              {world.name}
            </h2>
          </div>
        </div>
        {isCurrent && (
          <p className="text-xs text-slate-400 mt-1 max-w-60">{world.flavor}</p>
        )}
      </div>

      {/* Lesson Nodes */}
      <div className="flex flex-col items-center gap-3">
        {lessons.map((lesson, idx) => {
          const completed = state.progress.completedLessons.includes(lesson.id);
          const perfect = state.progress.perfectLessons.includes(lesson.id);
          const isNextLesson = isCurrent && !completed &&
            lessons.slice(0, idx).every(l => state.progress.completedLessons.includes(l.id));
          const lessonLocked = isLocked || (!completed && !isNextLesson);

          return (
            <LessonNode
              key={lesson.id}
              lesson={lesson}
              index={idx}
              total={lessons.length}
              completed={completed}
              perfect={perfect}
              isAvailable={isNextLesson}
              isLocked={lessonLocked}
              worldTheme={world.theme}
            />
          );
        })}
      </div>
    </div>
  );
}
