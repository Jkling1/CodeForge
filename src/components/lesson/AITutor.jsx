import { useState, useCallback } from 'react';
import { useGame } from '../../contexts/GameContext';
import { askTutor, isLoggedIn } from '../../utils/api';

// Smart offline analysis — compares user code to solution and gives targeted hints
function analyzeCode(userCode, lesson) {
  const tips = [];
  const solution = lesson.solution || '';
  const code = userCode.trim();

  if (!code) {
    return [{ type: 'start', message: "You haven't written any code yet. Read the instructions and give it a try! Start with the first requirement." }];
  }

  if (code.length < 10) {
    return [{ type: 'short', message: "Your code is very short. Re-read the instructions — there are multiple parts to complete." }];
  }

  // Check for common syntax errors
  const openParens = (code.match(/\(/g) || []).length;
  const closeParens = (code.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    tips.push({ type: 'syntax', message: `Mismatched parentheses: ${openParens} opening, ${closeParens} closing. Check your code for missing or extra parentheses.` });
  }

  const openBraces = (code.match(/\{/g) || []).length;
  const closeBraces = (code.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    tips.push({ type: 'syntax', message: `Mismatched braces: ${openBraces} opening, ${closeBraces} closing. Make sure every { has a matching }.` });
  }

  // Check if key solution elements are present
  if (solution) {
    const solutionFns = solution.match(/function\s+(\w+)/g) || [];
    solutionFns.forEach(fn => {
      const fnName = fn.replace('function ', '');
      if (!code.includes(fnName)) {
        tips.push({ type: 'missing', message: `Your code should define a function called "${fnName}". Check the instructions for the required function name.` });
      }
    });

    // Check for console.log calls
    const solutionLogs = (solution.match(/console\.log/g) || []).length;
    const userLogs = (code.match(/console\.log/g) || []).length;
    if (solutionLogs > 0 && userLogs === 0) {
      tips.push({ type: 'output', message: "Don't forget to log your results with console.log()! The validator checks the output." });
    } else if (solutionLogs > userLogs) {
      tips.push({ type: 'output', message: `The solution has ${solutionLogs} console.log() calls but you only have ${userLogs}. Make sure you're logging all required outputs.` });
    }

    // Check for key patterns/methods
    const keyMethods = ['map', 'filter', 'reduce', 'forEach', 'find', 'sort', 'split', 'join', 'push', 'pop', 'slice', 'splice', 'replace', 'match', 'includes', 'indexOf', 'JSON.parse', 'JSON.stringify', 'Math.', 'toFixed', 'toString', 'toLowerCase', 'toUpperCase'];
    keyMethods.forEach(method => {
      if (solution.includes(method) && !code.includes(method)) {
        tips.push({ type: 'hint', message: `Consider using \`${method}\` — it might help solve this challenge.` });
      }
    });

    // Check for return statement
    if (solution.includes('return ') && !code.includes('return ')) {
      tips.push({ type: 'missing', message: "Your function might be missing a return statement. Functions need to return values to be useful!" });
    }
  }

  // Lesson-type specific tips
  if (lesson.type === 'debug' && code === lesson.starterCode) {
    tips.push({ type: 'start', message: "You haven't changed the code yet. Read the bug description carefully and look for the issues mentioned." });
  }

  if (lesson.validation?.type === 'html') {
    if (!code.includes('<')) {
      tips.push({ type: 'html', message: "This is an HTML lesson — your code should contain HTML tags like <div>, <h1>, <p>, etc." });
    }
  }

  if (tips.length === 0) {
    tips.push({ type: 'close', message: "Your code structure looks reasonable! Try running it to see if the output matches what's expected. Check the error messages carefully if it fails." });
  }

  return tips.slice(0, 3); // Max 3 tips at a time
}

// Claude API tutor (optional)
async function askClaude(userCode, lesson, apiKey, question) {
  const systemPrompt = `You are a friendly coding tutor helping a student learn to code. The student is working on a lesson called "${lesson.title}".

Lesson instructions: ${lesson.instruction?.slice(0, 500)}

The expected solution approach involves: ${lesson.solution?.slice(0, 300) || 'N/A'}

Rules:
- Give SHORT, helpful hints (2-3 sentences max)
- Don't give the full answer — guide them toward it
- Point out specific issues in their code
- Be encouraging
- If they're close, tell them what's almost right`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: `My code:\n\`\`\`\n${userCode}\n\`\`\`\n\n${question || "I'm stuck. What should I look at?"}`,
      }],
    }),
  });

  if (!response.ok) throw new Error('API request failed');
  const data = await response.json();
  return data.content?.[0]?.text || 'Sorry, I couldn\'t generate a response.';
}

export default function AITutor({ lesson, userCode, isOpen, onClose }) {
  const { state } = useGame();
  const apiKey = state.user.settings?.claudeApiKey;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const getSmartHints = useCallback(() => {
    const tips = analyzeCode(userCode, lesson);
    setMessages(prev => [
      ...prev,
      { role: 'user', text: 'Help me with this code' },
      ...tips.map(t => ({ role: 'tutor', text: t.message, type: t.type })),
    ]);
  }, [userCode, lesson]);

  async function handleAsk() {
    const question = input.trim() || "I'm stuck. What should I look at?";
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: question }]);

    // Try: 1) Server proxy (if logged in), 2) Client API key, 3) Smart analysis
    const useAI = apiKey || isLoggedIn();
    if (useAI) {
      setLoading(true);
      try {
        let reply;
        if (isLoggedIn()) {
          // Server-side proxy — no API key needed from user
          const data = await askTutor(userCode, lesson.title, lesson.instruction, question);
          reply = data.message;
        } else {
          reply = await askClaude(userCode, lesson, apiKey, question);
        }
        setMessages(prev => [...prev, { role: 'tutor', text: reply, type: 'ai' }]);
      } catch (err) {
        // Fall back to smart analysis if AI fails
        const tips = analyzeCode(userCode, lesson);
        setMessages(prev => [...prev, ...tips.map(t => ({ role: 'tutor', text: t.message, type: t.type }))]);
      }
      setLoading(false);
    } else {
      const tips = analyzeCode(userCode, lesson);
      setMessages(prev => [...prev, ...tips.map(t => ({ role: 'tutor', text: t.message, type: t.type }))]);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-slate-800 w-full max-w-lg max-h-[70vh] rounded-t-2xl sm:rounded-2xl border border-slate-600 flex flex-col animate-slide-in-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <div>
              <h3 className="text-sm font-bold text-slate-100">AI Tutor</h3>
              <span className="text-xs text-slate-500">
                {apiKey || isLoggedIn() ? '✨ Claude-powered' : '💡 Smart analysis'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 text-lg">×</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
          {messages.length === 0 && (
            <div className="text-center text-slate-500 text-sm py-8">
              <p className="text-2xl mb-2">🤖</p>
              <p>Need help? Ask me anything about this lesson.</p>
              <p className="text-xs mt-1">I'll analyze your code and give you hints.</p>
              {!apiKey && (
                <p className="text-xs mt-3 text-slate-600">
                  Tip: Add a Claude API key in Profile → Settings for AI-powered tutoring
                </p>
              )}
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                msg.role === 'user'
                  ? 'bg-primary/20 text-primary'
                  : msg.type === 'error'
                    ? 'bg-danger/10 text-danger border border-danger/20'
                    : msg.type === 'ai'
                      ? 'bg-boss/10 text-slate-200 border border-boss/20'
                      : 'bg-slate-700 text-slate-200'
              }`}>
                {msg.role === 'tutor' && msg.type === 'ai' && <span className="text-xs text-boss">✨ </span>}
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 rounded-xl px-4 py-2 text-sm text-slate-400">
                Thinking<span className="animate-pulse">...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-700">
          <div className="flex gap-2">
            {messages.length === 0 && (
              <button
                onClick={getSmartHints}
                className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors shrink-0"
              >
                💡 Analyze My Code
              </button>
            )}
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !loading && handleAsk()}
              placeholder={apiKey ? "Ask Claude for help..." : "Ask for a hint..."}
              className="flex-1 bg-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm outline-none border border-slate-600 focus:border-primary placeholder-slate-500"
              disabled={loading}
            />
            <button
              onClick={handleAsk}
              disabled={loading}
              className="px-4 py-2 bg-primary text-slate-900 rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors disabled:opacity-50 shrink-0"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
