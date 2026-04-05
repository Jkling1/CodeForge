import { useMemo } from 'react';
import { useGame } from '../contexts/GameContext';
import { allLessons } from '../data/lessons/index';

export default function PracticeScreen() {
  const { state, dispatch } = useGame();
  const { completedLessons, conceptProficiency } = state.progress;

  const completedSet = useMemo(() => new Set(completedLessons), [completedLessons]);

  // Daily challenge: deterministic random from completed lessons
  const dailyChallenge = useMemo(() => {
    const available = allLessons.filter(l => completedSet.has(l.id));
    if (available.length === 0) return null;
    const dayIndex = Math.floor(Date.now() / 86400000) % available.length;
    return available[dayIndex];
  }, [completedSet]);

  // Weak spots: concepts with low proficiency
  const weakSpots = useMemo(() => {
    return Object.entries(conceptProficiency)
      .filter(([, level]) => level < 2)
      .map(([concept]) => {
        const lessons = allLessons.filter(l => l.concepts?.includes(concept) && completedSet.has(l.id));
        return { concept, lessons, proficiency: conceptProficiency[concept] };
      })
      .filter(ws => ws.lessons.length > 0)
      .slice(0, 5);
  }, [conceptProficiency, completedSet]);

  // Random completed lesson
  function playRandom() {
    const available = allLessons.filter(l => completedSet.has(l.id));
    if (available.length === 0) return;
    const lesson = available[Math.floor(Math.random() * available.length)];
    dispatch({ type: 'START_LESSON', lessonId: lesson.id });
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-slate-100">Practice</h1>

      {/* Daily Challenge */}
      {dailyChallenge ? (
        <button
          onClick={() => dispatch({ type: 'START_LESSON', lessonId: dailyChallenge.id })}
          className="w-full bg-gradient-to-r from-boss-dark/30 to-primary/20 rounded-xl p-4 border border-boss/30 text-left hover:border-boss/50 transition-colors"
        >
          <div className="text-xs text-boss font-bold mb-1">DAILY CHALLENGE</div>
          <div className="text-slate-100 font-bold">{dailyChallenge.title}</div>
          <div className="text-sm text-slate-400">{dailyChallenge.description}</div>
          <div className="text-xs text-primary mt-2">+{Math.floor(dailyChallenge.xpReward * 0.25)} XP • Review reward</div>
        </button>
      ) : (
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-center">
          <p className="text-slate-400">Complete some lessons first to unlock practice mode!</p>
        </div>
      )}

      {/* Random Challenge */}
      {completedLessons.length > 0 && (
        <button
          onClick={playRandom}
          className="w-full bg-slate-800 rounded-xl p-4 border border-slate-700 text-left hover:border-slate-500 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎲</span>
            <div>
              <div className="text-slate-100 font-bold">Random Challenge</div>
              <div className="text-sm text-slate-400">Replay a random completed lesson</div>
            </div>
          </div>
        </button>
      )}

      {/* Weak Spots */}
      {weakSpots.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-slate-100 mb-2">Weak Spots</h2>
          <div className="space-y-2">
            {weakSpots.map(ws => (
              <button
                key={ws.concept}
                onClick={() => {
                  if (ws.lessons[0]) dispatch({ type: 'START_LESSON', lessonId: ws.lessons[0].id });
                }}
                className="w-full bg-slate-800 rounded-lg p-3 border border-slate-700 text-left hover:border-warning/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-200">{ws.concept}</span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i < ws.proficiency ? 'bg-warning' : 'bg-slate-600'}`} />
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stats summary */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{completedLessons.length}</div>
            <div className="text-xs text-slate-400">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning">{state.progress.perfectLessons.length}</div>
            <div className="text-xs text-slate-400">Perfect</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success">{state.progress.worldsCompleted}</div>
            <div className="text-xs text-slate-400">Worlds</div>
          </div>
        </div>
      </div>
    </div>
  );
}
