import { useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';

export default function XPPopup() {
  const { state, dispatch } = useGame();
  const popups = state.ui.xpPopups;

  useEffect(() => {
    popups.forEach(p => {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_XP_POPUP', id: p.id });
      }, 1500);
      return () => clearTimeout(timer);
    });
  }, [popups, dispatch]);

  if (popups.length === 0) return null;

  return (
    <div className="fixed top-16 right-4 z-50 pointer-events-none">
      {popups.map(p => (
        <div key={p.id} className="animate-float-up text-primary font-bold text-2xl font-mono">
          +{p.amount} XP
        </div>
      ))}
    </div>
  );
}
