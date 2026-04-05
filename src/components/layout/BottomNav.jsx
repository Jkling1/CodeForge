import { useGame } from '../../contexts/GameContext';

const tabs = [
  { id: 'map', label: 'Map', icon: '🗺️' },
  { id: 'practice', label: 'Practice', icon: '🎯' },
  { id: 'stats', label: 'Stats', icon: '📊' },
  { id: 'profile', label: 'Profile', icon: '👤' },
];

export default function BottomNav() {
  const { state, navigate } = useGame();
  const current = state.ui.screen;

  if (current === 'lesson') return null;

  return (
    <div className="flex items-center justify-around bg-slate-800 border-t border-slate-700 py-2 shrink-0">
      {tabs.map(tab => {
        const active = current === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg transition-colors ${
              active ? 'text-primary' : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
