import { useState, useRef, useEffect } from 'react';

function highlightSyntax(code, language) {
  // Simple token-based highlighting
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Strings
  html = html.replace(/(["'`])(?:(?!\1|\\).|\\.)*\1/g, '<span style="color:#86efac">$&</span>');
  // Comments
  html = html.replace(/(\/\/.*$)/gm, '<span style="color:#64748b">$&</span>');
  // Keywords
  const keywords = 'const|let|var|function|return|if|else|for|while|class|import|export|from|default|new|this|true|false|null|undefined|async|await|try|catch|throw|switch|case|break|continue|typeof|instanceof';
  html = html.replace(new RegExp(`\\b(${keywords})\\b`, 'g'), '<span style="color:#c084fc">$&</span>');
  // Numbers
  html = html.replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#fbbf24">$&</span>');
  // Functions
  html = html.replace(/(\w+)\s*\(/g, '<span style="color:#7dd3fc">$1</span>(');

  return html;
}

export default function CodeEditor({ value, onChange, readOnly = false, language = 'javascript' }) {
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    setLineCount(Math.max(1, (value || '').split('\n').length));
  }, [value]);

  function handleScroll() {
    if (highlightRef.current && textareaRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  }

  return (
    <div className="relative bg-slate-900 rounded-lg border border-slate-700 overflow-hidden font-mono text-sm">
      <div className="flex">
        {/* Line numbers */}
        <div className="select-none py-3 px-2 text-right text-slate-600 text-xs leading-5 shrink-0 bg-slate-900/50">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Editor area */}
        <div className="relative flex-1 overflow-hidden">
          {/* Syntax highlight layer */}
          <pre
            ref={highlightRef}
            className="absolute inset-0 py-3 px-3 text-sm leading-5 overflow-hidden pointer-events-none whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: highlightSyntax(value || '', language) }}
          />

          {/* Input layer */}
          <textarea
            ref={textareaRef}
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            spellCheck={false}
            className="relative w-full py-3 px-3 bg-transparent text-transparent caret-slate-100 resize-none outline-none text-sm leading-5 min-h-40 whitespace-pre-wrap break-words"
            style={{ caretColor: '#f1f5f9' }}
          />
        </div>
      </div>
    </div>
  );
}
