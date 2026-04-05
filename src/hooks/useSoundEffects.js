import { useEffect, useRef } from 'react';
import { playSound } from '../utils/sounds';

export function useSoundEffects(state) {
  const prevState = useRef(state);
  const settings = state.user.settings;

  useEffect(() => {
    const prev = prevState.current;
    if (prev === state) return;

    // XP gained
    if (state.user.xp > prev.user.xp) {
      playSound('xpGain', settings);
    }

    // Level up
    if (state.ui.showLevelUp && !prev.ui.showLevelUp) {
      playSound('levelUp', settings);
    }

    // Heart lost
    if (state.user.hearts.current < prev.user.hearts.current) {
      playSound('heartLoss', settings);
    }

    // Achievement earned
    if (state.achievements.pending.length > prev.achievements.pending.length) {
      playSound('achievement', settings);
    }

    // Lesson completed (new lesson added to completed list)
    if (state.progress.completedLessons.length > prev.progress.completedLessons.length) {
      playSound('complete', settings);
    }

    // Streak increased
    if (state.user.streak.current > prev.user.streak.current && prev.user.streak.current > 0) {
      playSound('streak', settings);
    }

    prevState.current = state;
  }, [state, settings]);
}
