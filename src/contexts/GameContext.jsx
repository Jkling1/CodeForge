import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { loadState, saveState } from '../utils/storage';
import { getLevelFromXP, calculateXPReward, getStreakMultiplier } from '../utils/xp';
import { checkStreak, recordActivity } from '../utils/streaks';
import { checkHearts, loseHeart, gainHeart, isLockedOut } from '../utils/hearts';
import { checkAchievements } from '../data/achievements';

const GameContext = createContext(null);

const initialState = {
  user: {
    name: 'Builder',
    level: 1,
    xp: 0,
    streak: { current: 0, best: 0, lastActiveDate: null, freezesAvailable: 0 },
    hearts: { current: 5, maxHearts: 5, lastRegenTime: Date.now(), lastResetDate: new Date().toISOString().slice(0, 10) },
    settings: { soundEnabled: true, darkMode: true },
  },
  progress: {
    completedLessons: [],
    perfectLessons: [],
    lessonAttempts: {},
    lessonScores: {},
    promptScores: {},
    currentWorld: 'world1',
    currentLesson: null,
    conceptProficiency: {},
    languageLessons: { html: 0, css: 0, javascript: 0, python: 0, ruby: 0 },
    worldsCompleted: 0,
    debugsCompleted: 0,
    perfectPromptStreak: 0,
    persistenceUnlocked: false,
    nightOwlUnlocked: false,
  },
  achievements: {
    earned: {},
    pending: [],
  },
  stats: {
    totalTimeSeconds: 0,
    lessonsCompletedToday: 0,
    xpHistory: {},
    sessionsCount: 0,
    lastSessionDate: null,
  },
  ui: {
    screen: 'map',
    activeLesson: null,
    showLevelUp: false,
    newLevel: null,
    xpPopups: [],
    showAchievement: null,
  },
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE': {
      return { ...state, ui: { ...state.ui, screen: action.screen, activeLesson: action.lessonId || null } };
    }

    case 'START_LESSON': {
      const attempts = state.progress.lessonAttempts[action.lessonId] || 0;
      return {
        ...state,
        ui: { ...state.ui, screen: 'lesson', activeLesson: action.lessonId },
        progress: {
          ...state.progress,
          currentLesson: action.lessonId,
          lessonAttempts: { ...state.progress.lessonAttempts, [action.lessonId]: attempts },
        },
      };
    }

    case 'WRONG_ANSWER': {
      const hearts = loseHeart(state.user.hearts);
      const lessonId = state.ui.activeLesson;
      const attempts = (state.progress.lessonAttempts[lessonId] || 0) + 1;
      return {
        ...state,
        user: { ...state.user, hearts },
        progress: {
          ...state.progress,
          lessonAttempts: { ...state.progress.lessonAttempts, [lessonId]: attempts },
        },
      };
    }

    case 'COMPLETE_LESSON': {
      const { lessonId, xpBase, isPerfect, hintsUsed, score, timeSeconds, lessonType, concepts, language, promptScore } = action;
      const isReview = state.progress.completedLessons.includes(lessonId);
      const streakDays = state.user.streak.current;

      const xpEarned = calculateXPReward(xpBase, {
        isPerfect: isPerfect && !isReview,
        streakDays,
        isReview,
        isSpeedBonus: timeSeconds && timeSeconds < 60,
      });

      const newXP = state.user.xp + xpEarned;
      const newLevel = getLevelFromXP(newXP);
      const leveledUp = newLevel > state.user.level;

      const newCompleted = isReview ? state.progress.completedLessons : [...state.progress.completedLessons, lessonId];
      const newPerfect = isPerfect && !isReview ? [...state.progress.perfectLessons, lessonId] : state.progress.perfectLessons;

      // Update concept proficiency
      const newProficiency = { ...state.progress.conceptProficiency };
      (concepts || []).forEach(c => {
        const current = newProficiency[c] || 0;
        newProficiency[c] = Math.min(3, current + (isPerfect ? 2 : 1));
      });

      // Language tracking
      const newLangLessons = { ...state.progress.languageLessons };
      if (language && newLangLessons[language] !== undefined && !isReview) {
        newLangLessons[language]++;
      }

      // Prompt score tracking
      const newPromptScores = { ...state.progress.promptScores };
      if (promptScore) {
        newPromptScores[lessonId] = promptScore;
      }

      // Debug tracking
      const debugsCompleted = state.progress.debugsCompleted + (lessonType === 'debug' && !isReview ? 1 : 0);

      // Persistence achievement check
      const attempts = state.progress.lessonAttempts[lessonId] || 0;
      const persistenceUnlocked = state.progress.persistenceUnlocked || attempts >= 5;

      // Night owl check
      const nightOwlUnlocked = state.progress.nightOwlUnlocked || new Date().getHours() < 5;

      // XP history
      const today = new Date().toISOString().slice(0, 10);
      const xpHistory = { ...state.stats.xpHistory, [today]: (state.stats.xpHistory[today] || 0) + xpEarned };

      // Streak
      const newStreak = recordActivity(state.user.streak);

      // Hearts: gain 1 for review
      const hearts = isReview ? gainHeart(state.user.hearts) : state.user.hearts;

      const newState = {
        ...state,
        user: {
          ...state.user,
          xp: newXP,
          level: newLevel,
          streak: newStreak,
          hearts,
        },
        progress: {
          ...state.progress,
          completedLessons: newCompleted,
          perfectLessons: newPerfect,
          lessonScores: { ...state.progress.lessonScores, [lessonId]: { score, hintsUsed, time: timeSeconds } },
          conceptProficiency: newProficiency,
          languageLessons: newLangLessons,
          promptScores: newPromptScores,
          debugsCompleted,
          persistenceUnlocked,
          nightOwlUnlocked,
        },
        stats: {
          ...state.stats,
          lessonsCompletedToday: state.stats.lessonsCompletedToday + (isReview ? 0 : 1),
          xpHistory,
        },
        ui: {
          ...state.ui,
          xpPopups: [...state.ui.xpPopups, { id: Date.now(), amount: xpEarned }],
          showLevelUp: leveledUp,
          newLevel: leveledUp ? newLevel : null,
        },
      };

      // Check achievements
      const newAchievements = checkAchievements(newState);
      if (newAchievements.length > 0) {
        const earned = { ...newState.achievements.earned };
        newAchievements.forEach(a => { earned[a.id] = new Date().toISOString(); });
        newState.achievements = { ...newState.achievements, earned, pending: [...newState.achievements.pending, ...newAchievements] };
      }

      return newState;
    }

    case 'COMPLETE_WORLD': {
      const nextWorldNum = parseInt(action.worldId.replace('world', '')) + 1;
      const nextWorld = nextWorldNum <= 10 ? `world${nextWorldNum}` : state.progress.currentWorld;
      return {
        ...state,
        progress: {
          ...state.progress,
          currentWorld: nextWorld,
          worldsCompleted: state.progress.worldsCompleted + 1,
        },
      };
    }

    case 'DISMISS_LEVEL_UP':
      return { ...state, ui: { ...state.ui, showLevelUp: false, newLevel: null } };

    case 'DISMISS_ACHIEVEMENT':
      return { ...state, achievements: { ...state.achievements, pending: state.achievements.pending.slice(1) } };

    case 'CLEAR_XP_POPUP':
      return { ...state, ui: { ...state.ui, xpPopups: state.ui.xpPopups.filter(p => p.id !== action.id) } };

    case 'CHECK_HEARTS':
      return { ...state, user: { ...state.user, hearts: checkHearts(state.user.hearts) } };

    case 'CHECK_STREAK':
      return { ...state, user: { ...state.user, streak: checkStreak(state.user.streak) } };

    case 'START_SESSION': {
      const today = new Date().toISOString().slice(0, 10);
      const isNewDay = state.stats.lastSessionDate !== today;
      return {
        ...state,
        user: {
          ...state.user,
          hearts: checkHearts(state.user.hearts),
          streak: checkStreak(state.user.streak),
        },
        stats: {
          ...state.stats,
          sessionsCount: state.stats.sessionsCount + 1,
          lastSessionDate: today,
          lessonsCompletedToday: isNewDay ? 0 : state.stats.lessonsCompletedToday,
        },
      };
    }

    case 'UPDATE_SETTINGS':
      return { ...state, user: { ...state.user, settings: { ...state.user.settings, ...action.settings } } };

    case 'UPDATE_NAME':
      return { ...state, user: { ...state.user, name: action.name } };

    case 'RESET_PROGRESS':
      return { ...initialState, ui: state.ui };

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const saved = loadState();
  const [state, dispatch] = useReducer(gameReducer, saved || initialState);

  // Persist on every state change
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Session init
  useEffect(() => {
    dispatch({ type: 'START_SESSION' });
    const interval = setInterval(() => {
      dispatch({ type: 'CHECK_HEARTS' });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useCallback((screen, lessonId) => {
    dispatch({ type: 'NAVIGATE', screen, lessonId });
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch, navigate }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be inside GameProvider');
  return ctx;
}
