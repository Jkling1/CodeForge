import { useEffect, useRef } from 'react';
import { GameProvider, useGame } from './contexts/GameContext';
import { useSoundEffects } from './hooks/useSoundEffects';
import { isLoggedIn, saveProgress } from './utils/api';
import Layout from './components/layout/Layout';
import OnboardingScreen from './screens/OnboardingScreen';
import MapScreen from './screens/MapScreen';
import LessonScreen from './screens/LessonScreen';
import PracticeScreen from './screens/PracticeScreen';
import StatsScreen from './screens/StatsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import LevelUpModal from './components/ui/LevelUpModal';
import AchievementPopup from './components/ui/AchievementPopup';
import XPPopup from './components/ui/XPPopup';

function AppContent() {
  const { state } = useGame();
  const { screen } = state.ui;
  useSoundEffects(state);

  // Auto-sync progress to server when logged in (debounced)
  const syncTimer = useRef(null);
  const prevXP = useRef(state.user.xp);
  useEffect(() => {
    if (!isLoggedIn()) return;
    if (state.user.xp === prevXP.current) return;
    prevXP.current = state.user.xp;

    clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      saveProgress(state).catch(() => {});
    }, 3000);
  }, [state]);

  if (!state.user.onboarded) {
    return <OnboardingScreen />;
  }

  return (
    <Layout>
      <div key={screen} className={screen !== 'lesson' ? 'screen-transition' : ''}>
        {screen === 'map' && <MapScreen />}
        {screen === 'lesson' && <LessonScreen />}
        {screen === 'practice' && <PracticeScreen />}
        {screen === 'stats' && <StatsScreen />}
        {screen === 'leaderboard' && <LeaderboardScreen />}
        {screen === 'profile' && <ProfileScreen />}
      </div>
      <XPPopup />
      {state.ui.showLevelUp && <LevelUpModal />}
      {state.achievements.pending.length > 0 && <AchievementPopup />}
    </Layout>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
