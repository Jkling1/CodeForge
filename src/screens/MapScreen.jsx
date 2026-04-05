import { useEffect, useRef } from 'react';
import { useGame } from '../contexts/GameContext';
import { worlds } from '../data/worlds';
import { allLessons } from '../data/lessons/index';
import { getXPProgress, getLevelTitle, getLevelColor } from '../utils/xp';
import WorldSection from '../components/map/WorldSection';

export default function MapScreen() {
  const { state } = useGame();
  const scrollRef = useRef(null);
  const currentRef = useRef(null);
  const xpInfo = getXPProgress(state.user.xp);
  const totalLessons = allLessons.length;
  const completedCount = state.progress.completedLessons.length;

  useEffect(() => {
    if (currentRef.current && scrollRef.current) {
      setTimeout(() => {
        currentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [state.progress.currentWorld, state.progress.completedLessons.length]);

  const currentWorldIndex = worlds.findIndex(w => w.id === state.progress.currentWorld);

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto px-4 py-6 screen-transition">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-100 mb-1">
            <span className="text-primary">Code</span>Forge
          </h1>
          <p className="text-slate-500 text-xs mb-3">
            {completedCount}/{totalLessons} lessons completed
          </p>
          {/* Overall progress bar */}
          <div className="w-full max-w-xs mx-auto h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full animate-progress-fill transition-all duration-500"
              style={{
                width: `${Math.max(1, (completedCount / totalLessons) * 100)}%`,
                background: `linear-gradient(90deg, ${getLevelColor(xpInfo.level)}, var(--color-primary))`,
              }}
            />
          </div>
        </div>

        <div className="relative">
          {/* Vertical path line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{
              background: `linear-gradient(to bottom, ${worlds[0].theme.accent}40, ${worlds[Math.min(currentWorldIndex, 9)].theme.accent}40, #33415520)`,
            }}
          />

          {worlds.map((world, index) => {
            const isCompleted = index < currentWorldIndex;
            const isCurrent = index === currentWorldIndex;
            const isLocked = index > currentWorldIndex;

            return (
              <div
                key={world.id}
                ref={isCurrent ? currentRef : null}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-fade-in"
              >
                <WorldSection
                  world={world}
                  worldIndex={index}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                  isLocked={isLocked}
                />
              </div>
            );
          })}

          {/* End marker */}
          <div className="relative z-10 text-center py-8">
            <div className="text-2xl mb-1">🏆</div>
            <span className="text-xs text-slate-500">Forgemaster awaits</span>
          </div>
        </div>
      </div>
    </div>
  );
}
