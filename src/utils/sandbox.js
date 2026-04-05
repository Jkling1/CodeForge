export function executeCode(code, testCases = []) {
  const logs = [];
  const errors = [];
  const mockConsole = {
    log: (...args) => logs.push(args.map(String).join(' ')),
    error: (...args) => errors.push(args.map(String).join(' ')),
    warn: (...args) => logs.push('[warn] ' + args.map(String).join(' ')),
  };

  try {
    const fn = new Function('console', 'document', code);
    fn(mockConsole, null);

    if (testCases.length > 0) {
      const testResults = testCases.map(tc => {
        try {
          const testFn = new Function('console', 'document', `${code}\n return (${tc.test})();`);
          const result = testFn(mockConsole, null);
          return { pass: result === tc.expected, test: tc.label, actual: result, expected: tc.expected };
        } catch (e) {
          return { pass: false, test: tc.label, error: e.message };
        }
      });
      const allPass = testResults.every(r => r.pass);
      return { success: allPass, output: logs, errors, testResults };
    }

    return { success: true, output: logs, errors, testResults: [] };
  } catch (error) {
    return { success: false, output: logs, errors: [error.message], testResults: [] };
  }
}

export function validateOutput(actual, expected) {
  const normalizeLines = arr => arr.map(s => s.trim()).filter(Boolean);
  const a = normalizeLines(actual);
  const e = normalizeLines(Array.isArray(expected) ? expected : [expected]);

  if (a.length !== e.length) return false;
  return a.every((line, i) => line === e[i]);
}

export function validateHTML(code, checks) {
  const results = [];
  for (const check of checks) {
    if (check.type === 'contains') {
      results.push({
        pass: code.toLowerCase().includes(check.value.toLowerCase()),
        label: check.label || `Contains ${check.value}`,
      });
    } else if (check.type === 'regex') {
      results.push({
        pass: new RegExp(check.value, 'i').test(code),
        label: check.label || `Matches pattern`,
      });
    } else if (check.type === 'count') {
      const matches = code.match(new RegExp(check.value, 'gi'));
      results.push({
        pass: matches && matches.length >= check.min,
        label: check.label || `Has at least ${check.min} ${check.value}`,
      });
    }
  }
  return { success: results.every(r => r.pass), results };
}
