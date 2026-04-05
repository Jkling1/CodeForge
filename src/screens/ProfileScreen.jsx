import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { getLevelTitle, getLevelColor, getXPProgress } from '../utils/xp';
import { achievements, rarityColors } from '../data/achievements';
import { exportState, clearState } from '../utils/storage';

export default function ProfileScreen() {
  const { state, dispatch } = useGame();
  const { user } = state;
  const xpInfo = getXPProgress(user.xp);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);
  const [showResetConfirm, setShowResetConfirm] = useState(0);

  function handleSaveName() {
    if (nameInput.trim()) {
      dispatch({ type: 'UPDATE_NAME', name: nameInput.trim() });
    }
    setEditingName(false);
  }

  function handleReset() {
    if (showResetConfirm < 2) {
      setShowResetConfirm(showResetConfirm + 1);
      return;
    }
    clearState();
    dispatch({ type: 'RESET_PROGRESS' });
    setShowResetConfirm(0);
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-slate-100">Profile</h1>

      {/* User Card */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
        <div
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl font-bold border-3 mb-3"
          style={{ borderColor: getLevelColor(xpInfo.level), color: getLevelColor(xpInfo.level) }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>

        {editingName ? (
          <div className="flex items-center justify-center gap-2 mb-2">
            <input
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              className="bg-slate-700 text-slate-100 rounded-lg px-3 py-1 text-center outline-none border border-slate-600 focus:border-primary"
              maxLength={20}
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleSaveName()}
            />
            <button onClick={handleSaveName} className="text-success hover:text-success-dark">✓</button>
          </div>
        ) : (
          <button onClick={() => setEditingName(true)} className="text-xl font-bold text-slate-100 hover:text-primary transition-colors">
            {user.name} ✏️
          </button>
        )}

        <div className="text-sm font-bold" style={{ color: getLevelColor(xpInfo.level) }}>
          Level {xpInfo.level} — {getLevelTitle(xpInfo.level)}
        </div>
        <div className="text-xs text-slate-400 mt-1">{user.xp.toLocaleString()} XP</div>

        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-700">
          <div>
            <div className="text-lg font-bold text-warning">{user.streak.current}</div>
            <div className="text-xs text-slate-400">Streak</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">{state.progress.completedLessons.length}</div>
            <div className="text-xs text-slate-400">Lessons</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">{state.progress.worldsCompleted}</div>
            <div className="text-xs text-slate-400">Worlds</div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-lg font-bold text-slate-100 mb-3">
          Achievements ({Object.keys(state.achievements.earned).length}/{achievements.length})
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {achievements.map(ach => {
            const earned = !!state.achievements.earned[ach.id];
            return (
              <div
                key={ach.id}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 border transition-all ${
                  earned
                    ? 'bg-slate-800 border-slate-600 hover:scale-105'
                    : 'bg-slate-800/30 border-slate-700/30 opacity-40'
                }`}
                title={`${ach.name}: ${ach.description}`}
              >
                <span className="text-2xl">{earned ? ach.icon : '?'}</span>
                <span className="text-xs mt-1 text-center leading-tight" style={{ color: earned ? rarityColors[ach.rarity] : '#475569' }}>
                  {earned ? ach.name : '???'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 space-y-3">
        <h2 className="text-lg font-bold text-slate-100">Settings</h2>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-300">Sound Effects</span>
          <button
            onClick={() => dispatch({ type: 'UPDATE_SETTINGS', settings: { soundEnabled: !user.settings.soundEnabled } })}
            className={`w-12 h-6 rounded-full transition-colors relative ${user.settings.soundEnabled ? 'bg-primary' : 'bg-slate-600'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${user.settings.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>

        <button
          onClick={() => exportState()}
          className="w-full py-2 bg-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-600 transition-colors"
        >
          Export Progress (JSON)
        </button>

        <button
          onClick={handleReset}
          className={`w-full py-2 rounded-lg text-sm transition-colors ${
            showResetConfirm === 0
              ? 'bg-slate-700 text-slate-400 hover:text-danger'
              : showResetConfirm === 1
                ? 'bg-danger/20 text-danger border border-danger/30'
                : 'bg-danger text-white'
          }`}
        >
          {showResetConfirm === 0 ? 'Reset All Progress' : showResetConfirm === 1 ? 'Are you sure?' : 'Click again to confirm reset'}
        </button>
      </div>
    </div>
  );
}
