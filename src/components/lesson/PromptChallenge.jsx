import { useState } from 'react';
import { evaluatePrompt } from '../../utils/promptEvaluator';
import HintSystem from './HintSystem';

export default function PromptChallenge({ lesson, onComplete, onWrong, hintsUsed, onUseHint }) {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSend() {
    if (!prompt.trim()) return;

    const evaluation = evaluatePrompt(prompt, lesson.rubric);
    setResult(evaluation);
    setSubmitted(true);

    if (evaluation.overall < 50) {
      onWrong();
    }
  }

  function handleSubmit() {
    onComplete({
      score: result.overall,
      promptScore: result,
    });
  }

  const response = result ? lesson.simulatedResponses?.[result.tier] || lesson.simulatedResponses?.medium : null;

  return (
    <div className="p-4 space-y-4">
      {/* Goal */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="text-xs text-boss font-bold mb-2">PROMPT CHALLENGE</div>
        <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{lesson.instruction}</p>
      </div>

      {/* Prompt Input */}
      <div className="bg-black rounded-lg border border-slate-700 p-4">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2 font-mono">
          <span className="text-success">$</span>
          <span>claude</span>
        </div>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Type your prompt to Claude Code..."
          className="w-full bg-transparent text-slate-100 font-mono text-sm resize-none outline-none min-h-32 placeholder-slate-600"
          disabled={submitted && result?.overall >= 50}
        />
      </div>

      {/* Simulated Response */}
      {response && (
        <div className="bg-slate-800/50 rounded-lg border border-slate-600 overflow-hidden">
          <div className="px-4 py-2 bg-slate-700/50 text-xs font-bold text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-boss" />
            Claude Code Response
          </div>
          <pre className="p-4 text-sm text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap">{response}</pre>
        </div>
      )}

      {/* Score */}
      {result && (
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-200">Prompt Score</h4>
            <span className={`text-lg font-bold ${result.overall >= 80 ? 'text-success' : result.overall >= 50 ? 'text-warning' : 'text-danger'}`}>
              {result.overall}%
            </span>
          </div>

          <div className="space-y-2">
            {['specificity', 'completeness', 'clarity'].map(key => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-xs text-slate-400 w-24 capitalize">{key}</span>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${result[key]}%`,
                      background: result[key] >= 80 ? '#4ade80' : result[key] >= 50 ? '#fbbf24' : '#f87171',
                    }}
                  />
                </div>
                <span className="text-xs font-mono text-slate-300 w-8">{result[key]}%</span>
              </div>
            ))}
          </div>

          {result.feedback.length > 0 && (
            <div className="mt-3 space-y-1">
              {result.feedback.map((f, i) => (
                <p key={i} className="text-xs text-warning/80">⚠ {f}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Hints */}
      <HintSystem hints={lesson.hints} hintsUsed={hintsUsed} onUseHint={onUseHint} />

      {/* Buttons */}
      <div className="flex items-center gap-3 flex-wrap">
        {!submitted || (result && result.overall < 50) ? (
          <>
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-boss text-white rounded-lg font-bold hover:bg-boss-dark transition-colors"
            >
              {submitted ? 'Retry →' : 'Send to Claude Code →'}
            </button>
            {submitted && result && result.overall < 50 && (
              <button
                onClick={() => { setPrompt(''); setResult(null); setSubmitted(false); }}
                className="px-4 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition-colors"
              >
                Clear & Start Over
              </button>
            )}
          </>
        ) : null}

        {result && result.overall >= 50 && (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-success text-slate-900 rounded-lg font-bold hover:bg-success-dark transition-colors animate-slide-in-up"
          >
            Submit ✓
          </button>
        )}
      </div>
    </div>
  );
}
