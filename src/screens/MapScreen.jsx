import { useEffect, useRef } from 'react';
import { useGame } from '../contexts/GameContext';
import { worlds } from '../data/worlds';
import WorldSection from '../components/map/WorldSection';

export default function MapScreen() {
  const { state } = useGame();
  const scrollRef = useRef(null);
  const currentRef = useRef(null);

  useEffect(() => {
    if (currentRef.current && scrollRef.current) {
      setTimeout(() => {
        currentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, []);

  const currentWorldIndex = worlds.findIndex(w => w.id === state.progress.currentWorld);

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto px-4 py-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-slate-100">CodeForge</h1>
        <p className="text-center text-slate-400 text-sm mb-8">Your path from first prompt to full-stack builder</p>

        <div className="relative">
          {/* Vertical path line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 -translate-x-1/2" />

          {worlds.map((world, index) => {
            const isCompleted = index < currentWorldIndex;
            const isCurrent = index === currentWorldIndex;
            const isLocked = index > currentWorldIndex;

            return (
              <div key={world.id} ref={isCurrent ? currentRef : null}>
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
        </div>
      </div>
    </div>
  );
}
