import { useState, useEffect } from 'react';
import CodeChallenge from './CodeChallenge';
import PromptChallenge from './PromptChallenge';
import CodeReview from './CodeReview';
import DebugMission from './DebugMission';

export default function BossFight({ lesson, onComplete, onWrong, hintsUsed, onUseHint }) {
  const phases = lesson.phases || [];
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phaseScores, setPhaseScores] = useState([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const phase = phases[currentPhase];
  if (!phase) return null;

  const progress = ((currentPhase + 1) / phases.length) * 100;

  function handlePhaseComplete(result) {
    const scores = [...phaseScores, result.score || 100];
    setPhaseScores(scores);

    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
    } else {
      const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      onComplete({ score: avgScore });
    }
  }

  const phaseLesson = {
    ...phase,
    worldId: lesson.worldId,
    id: `${lesson.id}_phase_${currentPhase}`,
  };

  const phaseProps = {
    lesson: phaseLesson,
    onComplete: handlePhaseComplete,
    onWrong,
    hintsUsed,
    onUseHint,
  };

  const PhaseComponent = {
    concept: CodeChallenge,
    prompt: PromptChallenge,
    review: CodeReview,
    debug: DebugMission,
  }[phase.type] || CodeChallenge;

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="relative">
      {/* Boss Header */}
      <div className="bg-gradient-to-r from-boss-dark/20 to-slate-800 p-4 border-b border-boss/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💀</span>
            <div>
              <div className="text-xs text-boss font-bold uppercase tracking-wider">Boss Fight</div>
              <div className="text-sm font-bold text-slate-100">{lesson.title}</div>
            </div>
          </div>
          <div className="text-sm font-mono text-slate-400">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>

        {/* Phase Progress */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Phase {currentPhase + 1}/{phases.length}</span>
          <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-boss rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Phase indicators */}
        <div className="flex items-center justify-center gap-2 mt-2">
          {phases.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i < currentPhase ? 'bg-success' :
                i === currentPhase ? 'bg-boss animate-pulse' :
                'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Phase Content */}
      <PhaseComponent {...phaseProps} />
    </div>
  );
}
