import { useState } from 'react';
import CodeEditor from '../editor/CodeEditor';
import HintSystem from './HintSystem';

export default function CodeReview({ lesson, onComplete, onWrong, hintsUsed, onUseHint }) {
  const questions = lesson.questions || [];
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = questions[currentQ];
  if (!question) return null;

  const totalCorrect = answered.filter(Boolean).length;
  const isComplete = answered.length === questions.length;

  function handleAnswer(answerIndex) {
    if (showExplanation) return;
    setSelected(answerIndex);
    const correct = answerIndex === question.answer;
    setShowExplanation(true);
    setAnswered([...answered, correct]);
    if (!correct) onWrong();
  }

  function handleNext() {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  }

  function handleFinish() {
    const score = Math.round((totalCorrect / questions.length) * 100);
    onComplete({ score });
  }

  return (
    <div className="p-4 space-y-4">
      {/* Instruction */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="text-xs text-primary font-bold mb-2">CODE REVIEW</div>
        <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{lesson.instruction}</p>
      </div>

      {/* Code to review */}
      {lesson.starterCode && (
        <CodeEditor value={lesson.starterCode} readOnly language={lesson.language || 'javascript'} />
      )}

      {/* Progress */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">Question {currentQ + 1} of {questions.length}</span>
        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(answered.length / questions.length) * 100}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h4 className="text-sm font-bold text-slate-100 mb-3">{question.question}</h4>

        <div className="space-y-2">
          {question.options.map((opt, i) => {
            let borderColor = 'border-slate-600';
            let bg = 'bg-slate-700/50';

            if (showExplanation) {
              if (i === question.answer) {
                borderColor = 'border-success';
                bg = 'bg-success/10';
              } else if (i === selected && i !== question.answer) {
                borderColor = 'border-danger';
                bg = 'bg-danger/10';
              }
            } else if (i === selected) {
              borderColor = 'border-primary';
              bg = 'bg-primary/10';
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={showExplanation}
                className={`w-full text-left p-3 rounded-lg border ${borderColor} ${bg} text-sm text-slate-200 transition-colors hover:border-slate-400`}
              >
                <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-3 p-3 bg-slate-700/50 rounded-lg">
            <p className="text-sm text-slate-300">{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Hints */}
      <HintSystem hints={lesson.hints} hintsUsed={hintsUsed} onUseHint={onUseHint} />

      {/* Navigation */}
      <div className="flex justify-end">
        {showExplanation && !isComplete && (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-primary text-slate-900 rounded-lg font-bold hover:bg-primary-dark transition-colors"
          >
            Next Question →
          </button>
        )}
        {isComplete && (
          <button
            onClick={handleFinish}
            className="px-6 py-3 bg-success text-slate-900 rounded-lg font-bold hover:bg-success-dark transition-colors animate-slide-in-up"
          >
            Complete ({totalCorrect}/{questions.length}) ✓
          </button>
        )}
      </div>
    </div>
  );
}
