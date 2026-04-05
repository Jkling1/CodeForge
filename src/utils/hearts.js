const MAX_HEARTS = 5;
const REGEN_MS = 30 * 60 * 1000; // 30 minutes

function getDateString(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function checkHearts(hearts) {
  const now = Date.now();
  const today = getDateString();
  let { current, lastRegenTime, lastResetDate } = hearts;

  // Reset to full on new day
  if (lastResetDate !== today) {
    return {
      current: MAX_HEARTS,
      maxHearts: MAX_HEARTS,
      lastRegenTime: now,
      lastResetDate: today,
    };
  }

  // Regenerate hearts over time
  if (current < MAX_HEARTS && lastRegenTime) {
    const elapsed = now - lastRegenTime;
    const regenCount = Math.floor(elapsed / REGEN_MS);
    if (regenCount > 0) {
      current = Math.min(MAX_HEARTS, current + regenCount);
      return {
        ...hearts,
        current,
        lastRegenTime: now,
      };
    }
  }

  return hearts;
}

export function loseHeart(hearts) {
  return {
    ...hearts,
    current: Math.max(0, hearts.current - 1),
    lastRegenTime: hearts.current === MAX_HEARTS ? Date.now() : hearts.lastRegenTime,
  };
}

export function gainHeart(hearts) {
  return {
    ...hearts,
    current: Math.min(MAX_HEARTS, hearts.current + 1),
  };
}

export function isLockedOut(hearts) {
  return hearts.current <= 0;
}
