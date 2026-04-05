export default function Terminal({ output = [], errors = [], testResults = [] }) {
  const hasContent = output.length > 0 || errors.length > 0 || testResults.length > 0;

  if (!hasContent) return null;

  return (
    <div className="bg-black rounded-lg border border-slate-700 p-3 font-mono text-sm max-h-48 overflow-y-auto">
      <div className="text-xs text-slate-500 mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-success-dark" />
        Output
      </div>

      {output.map((line, i) => (
        <div key={i} className="text-slate-300 leading-relaxed">{line}</div>
      ))}

      {errors.map((err, i) => (
        <div key={`e${i}`} className="text-danger leading-relaxed">Error: {err}</div>
      ))}

      {testResults.map((r, i) => (
        <div key={`t${i}`} className={`leading-relaxed ${r.pass ? 'text-success' : 'text-danger'}`}>
          {r.pass ? '✓' : '✗'} {r.test || r.label}
          {!r.pass && r.error && <span className="text-slate-500 ml-2">({r.error})</span>}
          {!r.pass && r.expected !== undefined && (
            <span className="text-slate-500 ml-2">(expected: {String(r.expected)}, got: {String(r.actual)})</span>
          )}
        </div>
      ))}
    </div>
  );
}
