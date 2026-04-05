export function xpForLevel(level) {
  if (level <= 1) return 0;
  if (level <= 5) return Math.floor(50 * Math.pow(level, 1.5));
  if (level <= 15) return Math.floor(100 * Math.pow(level, 1.6));
  return Math.floor(200 * Math.pow(level, 1.7));
}

export function getLevelFromXP(totalXP) {
  let level = 1;
  while (xpForLevel(level + 1) <= totalXP) {
    level++;
    if (level >= 30) break;
  }
  return level;
}

export function getLevelTitle(level) {
  if (level >= 30) return 'Forgemaster';
  if (level >= 25) return 'Architect';
  if (level >= 20) return 'Engineer';
  if (level >= 15) return 'Developer';
  if (level >= 10) return 'Builder';
  if (level >= 5) return 'Apprentice';
  return 'Beginner';
}

export function getLevelColor(level) {
  if (level >= 30) return '#fbbf24';
  if (level >= 25) return '#c084fc';
  if (level >= 20) return '#7dd3fc';
  if (level >= 15) return '#4ade80';
  if (level >= 10) return '#38bdf8';
  if (level >= 5) return '#86efac';
  return '#94a3b8';
}

export function getXPProgress(totalXP) {
  const level = getLevelFromXP(totalXP);
  const currentLevelXP = xpForLevel(level);
  const nextLevelXP = xpForLevel(level + 1);
  const progress = nextLevelXP > currentLevelXP
    ? (totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)
    : 1;
  return { level, currentLevelXP, nextLevelXP, progress, xpInLevel: totalXP - currentLevelXP, xpNeeded: nextLevelXP - currentLevelXP };
}

export function calculateXPReward(baseXP, { isPerfect, streakDays, isReview, isSpeedBonus }) {
  let xp = baseXP;
  if (isReview) return Math.floor(xp * 0.25);
  if (isPerfect) xp *= 2;
  if (isSpeedBonus) xp *= 1.25;
  xp *= getStreakMultiplier(streakDays);
  return Math.floor(xp);
}

export function getStreakMultiplier(days) {
  if (days >= 100) return 3.0;
  if (days >= 60) return 2.5;
  if (days >= 30) return 2.0;
  if (days >= 14) return 1.75;
  if (days >= 7) return 1.5;
  if (days >= 3) return 1.2;
  return 1.0;
}
