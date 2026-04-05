import { useGame } from '../../contexts/GameContext';

export default function LessonComplete({ lesson, score, hintsUsed }) {
  const { dispatch } = useGame();
  const isPerfect = hintsUsed === 0 && (!score || score.score === undefined || score.score >= 90);

  return (
    <div className="h-full flex items-center justify-center p-6 bg-slate-900">
      <div className="text-center max-w-sm animate-slide-in-up">
        <div className="text-6xl mb-4">
          {isPerfect ? '⭐' : lesson.type === 'boss' ? '🏆' : '✅'}
        </div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">
          {isPerfect ? 'Perfect!' : lesson.type === 'boss' ? 'Boss Defeated!' : 'Lesson Complete!'}
        </h2>
        <p className="text-slate-400 mb-4">{lesson.title}</p>

        {score?.promptScore && (
          <div className="bg-slate-800 rounded-xl p-4 mb-4 text-left">
            <h4 className="text-sm font-bold text-slate-300 mb-2">Prompt Score</h4>
            <div className="space-y-2">
              {['specificity', 'completeness', 'clarity'].map(key => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 w-24 capitalize">{key}</span>
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${score.promptScore[key]}%`,
                        background: score.promptScore[key] >= 80 ? '#4ade80' : score.promptScore[key] >= 50 ? '#fbbf24' : '#f87171',
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono text-slate-300 w-8">{score.promptScore[key]}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="bg-slate-800 rounded-lg px-4 py-2">
            <div className="text-primary font-bold text-lg">+{lesson.xpReward}</div>
            <div className="text-xs text-slate-400">XP</div>
          </div>
          {isPerfect && (
            <div className="bg-slate-800 rounded-lg px-4 py-2">
              <div className="text-warning font-bold text-lg">2x</div>
              <div className="text-xs text-slate-400">Perfect</div>
            </div>
          )}
          {hintsUsed > 0 && (
            <div className="bg-slate-800 rounded-lg px-4 py-2">
              <div className="text-slate-300 font-bold text-lg">{hintsUsed}</div>
              <div className="text-xs text-slate-400">Hints</div>
            </div>
          )}
        </div>

        {lesson.concepts && lesson.concepts.length > 0 && (
          <div className="mb-6">
            <p className="text-xs text-slate-500 mb-2">Concepts practiced:</p>
            <div className="flex flex-wrap justify-center gap-1">
              {lesson.concepts.map(c => (
                <span key={c} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => dispatch({ type: 'NAVIGATE', screen: 'map' })}
          className="px-8 py-3 bg-primary text-slate-900 rounded-lg font-bold text-lg hover:bg-primary-dark transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
