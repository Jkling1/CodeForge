function getDateString(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function daysBetween(dateStr1, dateStr2) {
  const d1 = new Date(dateStr1 + 'T00:00:00');
  const d2 = new Date(dateStr2 + 'T00:00:00');
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

export function checkStreak(streak) {
  const today = getDateString();
  const { lastActiveDate, current, freezesAvailable } = streak;

  if (!lastActiveDate) {
    return { ...streak, current: 0, lastActiveDate: null };
  }

  const gap = daysBetween(lastActiveDate, today);

  if (gap <= 0) return streak;
  if (gap === 1) return streak;

  if (gap === 2 && freezesAvailable > 0) {
    return {
      ...streak,
      freezesAvailable: freezesAvailable - 1,
      freezeUsedDate: lastActiveDate,
    };
  }

  return {
    ...streak,
    current: 0,
  };
}

export function recordActivity(streak) {
  const today = getDateString();
  const { lastActiveDate, current, best } = streak;

  if (lastActiveDate === today) return streak;

  const gap = lastActiveDate ? daysBetween(lastActiveDate, today) : 999;
  const newCurrent = gap === 1 ? current + 1 : gap === 0 ? current : 1;
  const newBest = Math.max(best, newCurrent);

  const earnedFreeze = newCurrent > 0 && newCurrent % 7 === 0;
  const newFreezes = earnedFreeze
    ? Math.min((streak.freezesAvailable || 0) + 1, 3)
    : (streak.freezesAvailable || 0);

  return {
    ...streak,
    current: newCurrent,
    best: newBest,
    lastActiveDate: today,
    freezesAvailable: newFreezes,
  };
}
