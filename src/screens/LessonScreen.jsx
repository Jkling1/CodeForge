import { useState, useEffect, useRef } from 'react';
import { useGame } from '../contexts/GameContext';
import { getLesson } from '../data/lessons/index';
import LessonHeader from '../components/lesson/LessonHeader';
import LessonComplete from '../components/lesson/LessonComplete';
import CodeChallenge from '../components/lesson/CodeChallenge';
import PromptChallenge from '../components/lesson/PromptChallenge';
import CodeReview from '../components/lesson/CodeReview';
import DebugMission from '../components/lesson/DebugMission';
import BossFight from '../components/lesson/BossFight';

export default function LessonScreen() {
  const { state, dispatch } = useGame();
  const lessonId = state.ui.activeLesson;
  const lesson = getLesson(lessonId);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    setCompleted(false);
    setScore(null);
    setHintsUsed(0);
    startTime.current = Date.now();
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg">Lesson not found</p>
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', screen: 'map' })}
            className="mt-4 px-6 py-2 bg-primary text-slate-900 rounded-lg font-bold"
          >
            Back to Map
          </button>
        </div>
      </div>
    );
  }

  function handleComplete(result) {
    const timeSeconds = Math.floor((Date.now() - startTime.current) / 1000);
    const isPerfect = hintsUsed === 0 && (result.score === undefined || result.score >= 90);

    setCompleted(true);
    setScore(result);

    dispatch({
      type: 'COMPLETE_LESSON',
      lessonId: lesson.id,
      xpBase: lesson.xpReward,
      isPerfect,
      hintsUsed,
      score: result.score || 100,
      timeSeconds,
      lessonType: lesson.type,
      concepts: lesson.concepts,
      language: lesson.language,
      promptScore: result.promptScore || null,
    });

    // Check if boss — complete world
    if (lesson.type === 'boss') {
      dispatch({ type: 'COMPLETE_WORLD', worldId: lesson.worldId });
    }
  }

  function handleWrong() {
    dispatch({ type: 'WRONG_ANSWER' });
  }

  if (completed) {
    return <LessonComplete lesson={lesson} score={score} hintsUsed={hintsUsed} />;
  }

  const lessonProps = {
    lesson,
    onComplete: handleComplete,
    onWrong: handleWrong,
    hintsUsed,
    onUseHint: () => setHintsUsed(h => h + 1),
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 animate-slide-in-right">
      <LessonHeader lesson={lesson} />
      <div className="flex-1 overflow-y-auto">
        {lesson.type === 'concept' && <CodeChallenge {...lessonProps} />}
        {lesson.type === 'prompt' && <PromptChallenge {...lessonProps} />}
        {lesson.type === 'review' && <CodeReview {...lessonProps} />}
        {lesson.type === 'debug' && <DebugMission {...lessonProps} />}
        {lesson.type === 'project' && <CodeChallenge {...lessonProps} />}
        {lesson.type === 'boss' && <BossFight {...lessonProps} />}
      </div>
    </div>
  );
}
