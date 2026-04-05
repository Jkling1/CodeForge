import { useState } from 'react';
import CodeEditor from '../editor/CodeEditor';
import HTMLPreview from '../editor/HTMLPreview';
import Terminal from '../editor/Terminal';
import HintSystem from './HintSystem';
import { executeCode, validateOutput, validateHTML } from '../../utils/sandbox';

export default function BuildProject({ lesson, onComplete, onWrong, hintsUsed, onUseHint }) {
  const steps = lesson.steps || [lesson]; // fallback to single step
  const [currentStep, setCurrentStep] = useState(0);
  const [code, setCode] = useState(steps[0]?.starterCode || lesson.starterCode || '');
  const [output, setOutput] = useState(null);
  const [stepComplete, setStepComplete] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isHTML = step?.validation?.type === 'html' || lesson.language === 'html';

  function handleRun() {
    const validation = step?.validation || lesson.validation || {};

    if (validation.type === 'html') {
      const result = validateHTML(code, validation.checks || []);
      setOutput({
        output: result.results.map(r => `${r.pass ? '✓' : '✗'} ${r.label}`),
        errors: [], testResults: [], success: result.success,
      });
      if (result.success) setStepComplete(true);
      else onWrong();
      return;
    }

    const result = executeCode(code, validation.testCases || []);
    if (validation.type === 'output' && validation.expected) {
      const valid = validateOutput(result.output, validation.expected);
      if (!valid && result.success) {
        result.success = false;
        result.errors.push(`Expected: ${validation.expected.join(', ')}`);
      }
    }
    setOutput(result);
    if (result.success) setStepComplete(true);
    else onWrong();
  }

  function handleNext() {
    setCompletedSteps([...completedSteps, currentStep]);
    if (isLastStep) {
      onComplete({ score: 100 });
    } else {
      const nextStep = steps[currentStep + 1];
      setCurrentStep(currentStep + 1);
      // Carry code forward or use next step's starter
      if (nextStep?.starterCode) {
        setCode(nextStep.starterCode);
      }
      setOutput(null);
      setStepComplete(false);
    }
  }

  return (
    <div className="p-4 space-y-4">
      {/* Project Header */}
      <div className="bg-gradient-to-r from-primary/10 to-slate-800 rounded-xl p-4 border border-primary/20">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-primary font-bold uppercase tracking-wider">
            📦 Build Project
          </div>
          <div className="text-xs text-slate-400">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Step Progress */}
        <div className="flex gap-1 mb-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                completedSteps.includes(i) ? 'bg-success' :
                i === currentStep ? 'bg-primary' :
                'bg-slate-600'
              }`}
            />
          ))}
        </div>

        <h3 className="text-slate-100 font-bold text-sm mb-1">
          {step?.title || lesson.title}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
          {step?.instruction || lesson.instruction}
        </p>
      </div>

      {/* Editor */}
      <CodeEditor
        value={code}
        onChange={setCode}
        language={lesson.language || 'javascript'}
      />

      {/* HTML Preview */}
      {isHTML && code.trim().length > 0 && <HTMLPreview code={code} />}

      {/* Output */}
      {output && (
        <Terminal output={output.output} errors={output.errors} testResults={output.testResults} />
      )}

      {/* Hints */}
      <HintSystem hints={step?.hints || lesson.hints} hintsUsed={hintsUsed} onUseHint={onUseHint} />

      {/* Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleRun}
          className="px-6 py-3 bg-slate-700 text-slate-100 rounded-lg font-bold hover:bg-slate-600 transition-colors"
        >
          ▶ Run Code
        </button>

        {stepComplete && (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-success text-slate-900 rounded-lg font-bold hover:bg-success-dark transition-colors animate-slide-in-up"
          >
            {isLastStep ? 'Complete Project ✓' : 'Next Step →'}
          </button>
        )}
      </div>
    </div>
  );
}
