export const achievements = [
  // Progression
  { id: 'first_lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '🏁', rarity: 'Common', category: 'progression', check: (s) => s.progress.completedLessons.length >= 1 },
  { id: 'first_world', name: 'World Conqueror', description: 'Complete your first world', icon: '🌍', rarity: 'Rare', category: 'progression', check: (s) => s.progress.worldsCompleted >= 1 },
  { id: 'halfway', name: 'Halfway There', description: 'Complete 5 worlds', icon: '⛰️', rarity: 'Epic', category: 'progression', check: (s) => s.progress.worldsCompleted >= 5 },
  { id: 'all_worlds', name: 'World Traveler', description: 'Complete all 10 worlds', icon: '🏆', rarity: 'Legendary', category: 'progression', check: (s) => s.progress.worldsCompleted >= 10 },
  { id: 'ten_lessons', name: 'Getting Started', description: 'Complete 10 lessons', icon: '📚', rarity: 'Common', category: 'progression', check: (s) => s.progress.completedLessons.length >= 10 },
  { id: 'fifty_lessons', name: 'Dedicated Learner', description: 'Complete 50 lessons', icon: '📖', rarity: 'Rare', category: 'progression', check: (s) => s.progress.completedLessons.length >= 50 },
  { id: 'hundred_lessons', name: 'Century', description: 'Complete 100 lessons', icon: '💯', rarity: 'Epic', category: 'progression', check: (s) => s.progress.completedLessons.length >= 100 },

  // Streak
  { id: 'streak_7', name: 'Week Warrior', description: '7-day streak', icon: '🔥', rarity: 'Common', category: 'streak', check: (s) => s.user.streak.best >= 7 },
  { id: 'streak_30', name: 'Monthly Master', description: '30-day streak', icon: '🔥', rarity: 'Rare', category: 'streak', check: (s) => s.user.streak.best >= 30 },
  { id: 'streak_100', name: 'Unstoppable', description: '100-day streak', icon: '🔥', rarity: 'Legendary', category: 'streak', check: (s) => s.user.streak.best >= 100 },

  // Skill
  { id: 'prompt_master', name: 'Prompt Master', description: 'Score 90%+ on 10 prompt challenges', icon: '💬', rarity: 'Epic', category: 'skill', check: (s) => { const scores = Object.values(s.progress.promptScores || {}); return scores.filter(sc => sc.overall >= 90).length >= 10; } },
  { id: 'bug_hunter', name: 'Bug Hunter', description: 'Complete 10 debug missions', icon: '🐛', rarity: 'Rare', category: 'skill', check: (s) => (s.progress.debugsCompleted || 0) >= 10 },
  { id: 'first_prompt', name: 'First Prompt', description: 'Complete your first prompt challenge', icon: '✨', rarity: 'Common', category: 'skill', check: (s) => Object.keys(s.progress.promptScores || {}).length >= 1 },
  { id: 'ai_whisperer', name: 'AI Whisperer', description: '5 perfect prompt scores in a row', icon: '🧠', rarity: 'Epic', category: 'skill', check: (s) => (s.progress.perfectPromptStreak || 0) >= 5 },

  // Perfection
  { id: 'first_perfect', name: 'Flawless', description: 'Get a perfect score on any lesson', icon: '⭐', rarity: 'Common', category: 'perfection', check: (s) => s.progress.perfectLessons.length >= 1 },
  { id: 'ten_perfects', name: 'Perfectionist', description: '10 perfect lessons', icon: '🌟', rarity: 'Rare', category: 'perfection', check: (s) => s.progress.perfectLessons.length >= 10 },

  // Hidden
  { id: 'persistence', name: 'Persistence', description: 'Fail 5 times then pass', icon: '💪', rarity: 'Rare', category: 'hidden', check: (s) => s.progress.persistenceUnlocked },
  { id: 'night_owl', name: 'Night Owl', description: 'Complete a lesson after midnight', icon: '🦉', rarity: 'Rare', category: 'hidden', check: (s) => s.progress.nightOwlUnlocked },

  // Level
  { id: 'level_5', name: 'Apprentice', description: 'Reach Level 5', icon: '🔰', rarity: 'Common', category: 'level', check: (s) => s.user.level >= 5 },
  { id: 'level_10', name: 'Builder', description: 'Reach Level 10', icon: '🔨', rarity: 'Rare', category: 'level', check: (s) => s.user.level >= 10 },
  { id: 'level_20', name: 'Engineer', description: 'Reach Level 20', icon: '⚙️', rarity: 'Epic', category: 'level', check: (s) => s.user.level >= 20 },
  { id: 'level_30', name: 'Forgemaster', description: 'Reach Level 30', icon: '👑', rarity: 'Legendary', category: 'level', check: (s) => s.user.level >= 30 },
];

export function checkAchievements(state) {
  const newAchievements = [];
  for (const ach of achievements) {
    if (!state.achievements.earned[ach.id]) {
      try {
        if (ach.check(state)) {
          newAchievements.push(ach);
        }
      } catch { /* skip broken checks */ }
    }
  }
  return newAchievements;
}

export const rarityColors = {
  Common: '#94a3b8',
  Rare: '#38bdf8',
  Epic: '#c084fc',
  Legendary: '#fbbf24',
};
