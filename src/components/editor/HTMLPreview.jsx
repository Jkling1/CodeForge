import { useState, useMemo } from 'react';

export default function HTMLPreview({ code }) {
  const [expanded, setExpanded] = useState(false);

  const srcDoc = useMemo(() => {
    // Wrap bare HTML snippets in a basic document if no <html> tag
    const hasDocType = code.toLowerCase().includes('<html') || code.toLowerCase().includes('<!doctype');
    if (hasDocType) return code;
    return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>body{font-family:system-ui,sans-serif;padding:12px;margin:0;}</style></head>
<body>${code}</body></html>`;
  }, [code]);

  return (
    <div className="rounded-lg border border-slate-600 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-danger/60" />
            <span className="w-2 h-2 rounded-full bg-warning/60" />
            <span className="w-2 h-2 rounded-full bg-success/60" />
          </div>
          <span className="text-xs text-slate-400 font-mono">Preview</span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          {expanded ? '↕ Collapse' : '↕ Expand'}
        </button>
      </div>
      <iframe
        srcDoc={srcDoc}
        sandbox=""
        title="HTML Preview"
        className="w-full bg-white border-0"
        style={{ height: expanded ? '300px' : '160px' }}
      />
    </div>
  );
}
