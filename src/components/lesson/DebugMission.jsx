import { useState, useEffect } from 'react';
import CodeEditor from '../editor/CodeEditor';
import HTMLPreview from '../editor/HTMLPreview';
import Terminal from '../editor/Terminal';
import HintSystem from './HintSystem';
import { executeCode, validateOutput, validateHTML } from '../../utils/sandbox';

export default function DebugMission({ lesson, onComplete, onWrong, hintsUsed, onUseHint, onCodeChange }) {
  const [code, setCode] = useState(lesson.starterCode || '');

  useEffect(() => { onCodeChange?.(code); }, [code, onCodeChange]);
  const [output, setOutput] = useState(null);
  const [solved, setSolved] = useState(false);
  const isHTML = lesson.validation?.type === 'html' || lesson.language === 'html' || lesson.language === 'css';

  function handleRun() {
    const validation = lesson.validation || {};

    if (validation.type === 'html') {
      const result = validateHTML(code, validation.checks || []);
      setOutput({
        output: result.results.map(r => `${r.pass ? '✓' : '✗'} ${r.label}`),
        errors: [],
        testResults: [],
        success: result.success,
      });
      if (result.success) setSolved(true);
      else onWrong();
      return;
    }

    const result = executeCode(code, validation.testCases || []);

    if (validation.type === 'output' && validation.expected) {
      const valid = validateOutput(result.output, validation.expected);
      if (!valid && result.success) {
        result.success = false;
        result.errors.push(`Expected output: ${validation.expected.join(', ')}`);
      }
    }

    setOutput(result);
    if (result.success) setSolved(true);
    else onWrong();
  }

  return (
    <div className="p-4 space-y-4">
      {/* Instruction */}
      <div className="bg-slate-800 rounded-xl p-4 border border-danger/30">
        <div className="text-xs text-danger font-bold mb-2">🐛 DEBUG MISSION</div>
        <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{lesson.instruction}</p>
      </div>

      {/* Code Editor */}
      <CodeEditor value={code} onChange={setCode} language={lesson.language || 'javascript'} />

      {/* HTML Preview */}
      {isHTML && code.trim().length > 0 && <HTMLPreview code={code} />}

      {/* Output */}
      {output && <Terminal output={output.output} errors={output.errors} testResults={output.testResults} />}

      {/* Hints */}
      <HintSystem hints={lesson.hints} hintsUsed={hintsUsed} onUseHint={onUseHint} />

      {/* Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleRun}
          className="px-6 py-3 bg-slate-700 text-slate-100 rounded-lg font-bold hover:bg-slate-600 transition-colors"
        >
          ▶ Test Fix
        </button>
        {solved && (
          <button
            onClick={() => onComplete({ score: 100 })}
            className="px-6 py-3 bg-success text-slate-900 rounded-lg font-bold hover:bg-success-dark transition-colors animate-slide-in-up"
          >
            Bug Fixed! ✓
          </button>
        )}
      </div>
    </div>
  );
}
