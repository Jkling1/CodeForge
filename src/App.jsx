import { GameProvider, useGame } from './contexts/GameContext';
import { useSoundEffects } from './hooks/useSoundEffects';
import Layout from './components/layout/Layout';
import OnboardingScreen from './screens/OnboardingScreen';
import MapScreen from './screens/MapScreen';
import LessonScreen from './screens/LessonScreen';
import PracticeScreen from './screens/PracticeScreen';
import StatsScreen from './screens/StatsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LevelUpModal from './components/ui/LevelUpModal';
import AchievementPopup from './components/ui/AchievementPopup';
import XPPopup from './components/ui/XPPopup';

function AppContent() {
  const { state } = useGame();
  const { screen } = state.ui;
  useSoundEffects(state);

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
