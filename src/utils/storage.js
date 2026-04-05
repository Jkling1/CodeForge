const STORAGE_KEY = 'codeforge_state';
const STORAGE_VERSION = 1;

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed._version !== STORAGE_VERSION) return null;
    return parsed.state;
  } catch {
    return null;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      _version: STORAGE_VERSION,
      state,
      _savedAt: new Date().toISOString(),
    }));
  } catch {
    // localStorage full or unavailable
  }
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportState() {
  const state = loadState();
  if (!state) return null;
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `codeforge-progress-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
