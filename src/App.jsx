import { GameProvider, useGame } from './contexts/GameContext';
import Layout from './components/layout/Layout';
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

  return (
    <Layout>
      {screen === 'map' && <MapScreen />}
      {screen === 'lesson' && <LessonScreen />}
      {screen === 'practice' && <PracticeScreen />}
      {screen === 'stats' && <StatsScreen />}
      {screen === 'profile' && <ProfileScreen />}
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
