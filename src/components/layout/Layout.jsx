import TopBar from './TopBar';
import BottomNav from './BottomNav';
import { useGame } from '../../contexts/GameContext';

export default function Layout({ children }) {
  const { state } = useGame();
  const isLesson = state.ui.screen === 'lesson';

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {!isLesson && <TopBar />}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
