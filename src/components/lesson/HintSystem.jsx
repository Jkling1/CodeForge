import { useState } from 'react';

export default function HintSystem({ hints = [], hintsUsed, onUseHint }) {
  const [showHint, setShowHint] = useState(false);

  if (!hints.length) return null;

  const currentHint = hintsUsed < hints.length ? hints[hintsUsed] : hints[hints.length - 1];
  const allUsed = hintsUsed >= hints.length;

  return (
    <div className="mt-3">
      {showHint && hintsUsed > 0 && (
        <div className="bg-slate-700/50 rounded-lg p-3 mb-2 border border-warning/20">
          <div className="text-xs text-warning font-bold mb-1">Hint {Math.min(hintsUsed, hints.length)}/{hints.length}</div>
          <div className="text-sm text-slate-300">{hints[Math.min(hintsUsed, hints.length) - 1]}</div>
        </div>
      )}

      {!allUsed && (
        <button
          onClick={() => {
            onUseHint();
            setShowHint(true);
          }}
          className="text-sm text-warning/70 hover:text-warning transition-colors flex items-center gap-1"
        >
          💡 Hint ({hintsUsed}/{hints.length})
        </button>
      )}
    </div>
  );
}
