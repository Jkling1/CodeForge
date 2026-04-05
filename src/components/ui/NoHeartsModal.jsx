import { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';

const REGEN_MS = 30 * 60 * 1000;

export default function NoHeartsModal({ onClose }) {
  const { navigate, state } = useGame();
  const [regenTime, setRegenTime] = useState('');

  useEffect(() => {
    function update() {
      const elapsed = Date.now() - (state.user.hearts.lastRegenTime || Date.now());
      const remaining = Math.max(0, REGEN_MS - elapsed);
      const min = Math.floor(remaining / 60000);
      const sec = Math.floor((remaining % 60000) / 1000);
      setRegenTime(`${min}:${String(sec).padStart(2, '0')}`);
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [state.user.hearts.lastRegenTime]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl p-6 max-w-sm mx-4 text-center border border-danger/30 animate-slide-in-up" onClick={e => e.stopPropagation()}>
        <div className="text-5xl mb-3">💔</div>
        <h2 className="text-xl font-bold text-slate-100 mb-2">Out of Hearts!</h2>
        <p className="text-slate-400 text-sm mb-4">
          You need hearts to attempt new lessons. Hearts regenerate over time, or you can earn them by reviewing completed lessons.
        </p>

        <div className="bg-slate-700/50 rounded-lg p-3 mb-4">
          <div className="text-xs text-slate-500 mb-1">Next heart in</div>
          <div className="text-2xl font-bold font-mono text-danger">{regenTime}</div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => { onClose(); navigate('practice'); }}
            className="w-full px-6 py-3 bg-success text-slate-900 rounded-lg font-bold hover:bg-success-dark transition-colors"
          >
            Review for Hearts ♥
          </button>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-colors"
          >
            Wait for Hearts
          </button>
        </div>
      </div>
    </div>
  );
}
