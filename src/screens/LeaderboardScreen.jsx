import { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { getLeaderboard, getMyRank, isLoggedIn } from '../utils/api';
import { getLevelColor, getLevelTitle } from '../utils/xp';

const sortOptions = [
  { key: 'xp', label: 'XP' },
  { key: 'level', label: 'Level' },
  { key: 'streak', label: 'Streak' },
  { key: 'lessons', label: 'Lessons' },
];

export default function LeaderboardScreen() {
  const { state } = useGame();
  const [entries, setEntries] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [sort, setSort] = useState('xp');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await getLeaderboard(sort);
        setEntries(data.entries);
        if (isLoggedIn()) {
          const me = await getMyRank();
          setMyRank(me);
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    load();
  }, [sort]);

  const rankIcons = ['🥇', '🥈', '🥉'];

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4 screen-transition">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-100">Leaderboard</h1>
        {myRank?.rank && (
          <span className="text-sm text-primary font-bold">Your rank: #{myRank.rank}</span>
        )}
      </div>

      {/* Sort tabs */}
      <div className="flex gap-1.5">
        {sortOptions.map(opt => (
          <button
            key={opt.key}
            onClick={() => setSort(opt.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              sort === opt.key
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Error/Loading */}
      {error && (
        <div className="bg-danger/10 border border-danger/30 rounded-xl p-4 text-center">
          <p className="text-danger text-sm">{error}</p>
          <p className="text-slate-500 text-xs mt-1">Make sure the server is running (npm run dev:server)</p>
        </div>
      )}

      {loading && !error && (
        <div className="text-center py-8 text-slate-500">Loading...</div>
      )}

      {/* Not logged in */}
      {!isLoggedIn() && !loading && !error && (
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
          <p className="text-slate-400 text-sm">Log in to see your rank and appear on the leaderboard.</p>
        </div>
      )}

      {/* Entries */}
      {!loading && entries.length > 0 && (
        <div className="space-y-1.5">
          {entries.map(entry => {
            const isMe = myRank?.entry?.user_id === entry.user_id;
            return (
              <div
                key={entry.user_id}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-colors ${
                  isMe
                    ? 'bg-primary/10 border-primary/30'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                {/* Rank */}
                <div className="w-8 text-center shrink-0">
                  {entry.rank <= 3 ? (
                    <span className="text-lg">{rankIcons[entry.rank - 1]}</span>
                  ) : (
                    <span className="text-sm text-slate-500 font-mono">{entry.rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border"
                  style={{ borderColor: getLevelColor(entry.level), color: getLevelColor(entry.level) }}
                >
                  {entry.display_name?.charAt(0)?.toUpperCase() || '?'}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold truncate ${isMe ? 'text-primary' : 'text-slate-100'}`}>
                      {entry.display_name}
                    </span>
                    {isMe && <span className="text-xs bg-primary/20 text-primary px-1.5 rounded">You</span>}
                  </div>
                  <div className="text-xs text-slate-500">
                    Lv.{entry.level} {getLevelTitle(entry.level)} · {entry.lessons_completed} lessons · W{entry.worlds_completed}
                  </div>
                </div>

                {/* Stat */}
                <div className="text-right shrink-0">
                  {sort === 'xp' && <div className="text-sm font-bold text-primary font-mono">{entry.xp.toLocaleString()}</div>}
                  {sort === 'level' && <div className="text-sm font-bold" style={{ color: getLevelColor(entry.level) }}>Lv.{entry.level}</div>}
                  {sort === 'streak' && <div className="text-sm font-bold text-warning">🔥 {entry.streak}</div>}
                  {sort === 'lessons' && <div className="text-sm font-bold text-success">{entry.lessons_completed}</div>}
                  <div className="text-xs text-slate-500">
                    {sort === 'xp' ? 'XP' : sort === 'streak' ? 'days' : ''}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && entries.length === 0 && !error && (
        <div className="text-center py-8 text-slate-500 text-sm">
          No entries yet. Be the first on the leaderboard!
        </div>
      )}
    </div>
  );
}
