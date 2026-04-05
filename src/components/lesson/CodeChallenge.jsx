import { useState } from 'react';
import CodeEditor from '../editor/CodeEditor';
import Terminal from '../editor/Terminal';
import HintSystem from './HintSystem';
import { executeCode, validateOutput, validateHTML } from '../../utils/sandbox';

export default function CodeChallenge({ lesson, onComplete, onWrong, hintsUsed, onUseHint }) {
  const [code, setCode] = useState(lesson.starterCode || '');
  const [output, setOutput] = useState(null);
  const [ran, setRan] = useState(false);

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
      setRan(true);
      if (!result.success) onWrong();
      return;
    }

    const result = executeCode(code, validation.testCases || []);
    setOutput(result);
    setRan(true);

    if (validation.type === 'output' && validation.expected) {
      const valid = validateOutput(result.output, validation.expected);
      if (!valid && result.success) {
        result.success = false;
        result.errors.push(`Expected output: ${validation.expected.join(', ')}`);
      }
    }

    if (!result.success) {
      onWrong();
    }
  }

  function handleSubmit() {
    onComplete({ score: 100 });
  }

  return (
    <div className="p-4 space-y-4">
      {/* Instruction */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{lesson.instruction}</p>
      </div>

      {/* Editor */}
      <CodeEditor
        value={code}
        onChange={setCode}
        language={lesson.language || 'javascript'}
      />

      {/* Terminal Output */}
      {output && (
        <Terminal
          output={output.output}
          errors={output.errors}
          testResults={output.testResults}
        />
      )}

      {/* Hints */}
      <HintSystem hints={lesson.hints} hintsUsed={hintsUsed} onUseHint={onUseHint} />

      {/* Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleRun}
          className="px-6 py-3 bg-slate-700 text-slate-100 rounded-lg font-bold hover:bg-slate-600 transition-colors"
        >
          ▶ Run Code
        </button>

        {ran && output?.success && (
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
