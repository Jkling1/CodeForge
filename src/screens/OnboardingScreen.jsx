import { useState } from 'react';
import { useGame } from '../contexts/GameContext';

const slides = [
  {
    title: 'Welcome to CodeForge',
    subtitle: 'Your journey from first prompt to full-stack builder starts here.',
    icon: '🔥',
    description: 'CodeForge teaches you programming AND how to use AI tools like Claude Code to build real software. Learn by doing — every lesson is hands-on.',
  },
  {
    title: 'Follow the Map',
    subtitle: '10 worlds. 100+ lessons. One path.',
    icon: '🗺️',
    description: 'Your World Map shows your journey. Complete lessons in order, defeat bosses to unlock new worlds. From terminal basics to full-stack apps.',
  },
  {
    title: 'Learn by Building',
    subtitle: '6 lesson types keep things fresh.',
    icon: '⚡',
    description: 'Write code, craft prompts for Claude Code, review AI-generated code, debug broken programs, build projects, and defeat boss challenges.',
  },
  {
    title: 'Level Up',
    subtitle: 'XP, streaks, hearts, achievements.',
    icon: '⭐',
    description: 'Earn XP for every lesson. Maintain daily streaks for bonus multipliers. Use hearts wisely — wrong answers cost one. Collect achievements along the way.',
  },
];

export default function OnboardingScreen() {
  const { dispatch } = useGame();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [name, setName] = useState('');
  const isLast = currentSlide === slides.length;

  function handleStart() {
    const finalName = name.trim() || 'Builder';
    dispatch({ type: 'UPDATE_NAME', name: finalName });
    dispatch({ type: 'COMPLETE_ONBOARDING' });
  }

  if (isLast) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-slate-900">
        <div className="text-center max-w-sm animate-slide-in-up">
          <div className="text-6xl mb-4">🏗️</div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">What's your name?</h1>
          <p className="text-slate-400 mb-6">This is how you'll appear in CodeForge.</p>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name..."
            maxLength={20}
            className="w-full bg-slate-800 text-slate-100 rounded-xl px-4 py-3 text-center text-lg outline-none border-2 border-slate-700 focus:border-primary mb-6 font-heading"
            autoFocus
            onKeyDown={e => e.key === 'Enter' && handleStart()}
          />
          <button
            onClick={handleStart}
            className="w-full px-8 py-4 bg-primary text-slate-900 rounded-xl font-bold text-lg hover:bg-primary-dark transition-all hover:scale-105"
          >
            Start Forging →
          </button>
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-900">
      <div className="text-center max-w-sm animate-slide-in-up" key={currentSlide}>
        <div className="text-7xl mb-6">{slide.icon}</div>
        <h1 className="text-2xl font-bold text-slate-100 mb-1">{slide.title}</h1>
        <p className="text-primary font-medium text-sm mb-4">{slide.subtitle}</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">{slide.description}</p>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mb-6">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-primary w-6' : 'bg-slate-600'}`}
          />
        ))}
      </div>

      <div className="flex gap-3 w-full max-w-sm">
        <button
          onClick={handleStart}
          className="px-6 py-3 text-slate-500 hover:text-slate-300 transition-colors text-sm"
        >
          Skip
        </button>
        <button
          onClick={() => setCurrentSlide(currentSlide + 1)}
          className="flex-1 px-8 py-3 bg-primary text-slate-900 rounded-xl font-bold hover:bg-primary-dark transition-all"
        >
          {currentSlide === slides.length - 1 ? 'Almost there →' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
