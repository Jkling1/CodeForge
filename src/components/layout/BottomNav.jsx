import { useGame } from '../../contexts/GameContext';

const tabs = [
  { id: 'map', label: 'Map', icon: '🗺️' },
  { id: 'practice', label: 'Practice', icon: '🎯' },
  { id: 'leaderboard', label: 'Ranks', icon: '🏆' },
  { id: 'stats', label: 'Stats', icon: '📊' },
  { id: 'profile', label: 'Profile', icon: '👤' },
];

export default function BottomNav() {
  const { state, navigate } = useGame();
  const current = state.ui.screen;

  if (current === 'lesson') return null;

  return (
    <div className="flex items-center justify-around bg-slate-800/95 backdrop-blur-sm border-t border-slate-700 py-1.5 shrink-0 no-select">
      {tabs.map(tab => {
        const active = current === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.id)}
            className={`relative flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-xl transition-all duration-200 ${
              active
                ? 'text-primary bg-primary/10 scale-105'
                : 'text-slate-500 hover:text-slate-300 active:scale-95'
            }`}
          >
            <span className={`text-xl transition-transform ${active ? 'scale-110' : ''}`}>{tab.icon}</span>
            <span className={`text-xs font-medium ${active ? 'text-primary' : ''}`}>{tab.label}</span>
            {active && (
              <div className="absolute -bottom-1.5 w-4 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
