// Web Audio API sound effects — no audio files needed
let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(frequency, duration, type = 'sine', volume = 0.15) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch { /* audio not available */ }
}

function playSequence(notes, tempo = 0.12) {
  notes.forEach(([freq, dur, type], i) => {
    setTimeout(() => playTone(freq, dur || 0.15, type || 'sine'), i * tempo * 1000);
  });
}

export const sounds = {
  // Correct answer — ascending two-note chime
  correct() {
    playSequence([[523, 0.1], [659, 0.2]], 0.1);
  },

  // Wrong answer — descending buzz
  wrong() {
    playSequence([[300, 0.15, 'square'], [200, 0.2, 'square']], 0.12);
  },

  // XP gain — quick sparkle
  xpGain() {
    playSequence([[880, 0.08], [1100, 0.08], [1320, 0.12]], 0.06);
  },

  // Level up — triumphant fanfare
  levelUp() {
    playSequence([
      [523, 0.12], [659, 0.12], [784, 0.12], [1047, 0.3],
    ], 0.15);
  },

  // Heart loss — soft thud
  heartLoss() {
    playTone(150, 0.3, 'sine', 0.2);
  },

  // Achievement unlock — magical ascending
  achievement() {
    playSequence([
      [440, 0.1], [554, 0.1], [659, 0.1], [880, 0.25],
    ], 0.1);
  },

  // Boss fight start — dramatic low rumble + high hit
  bossStart() {
    playSequence([
      [100, 0.3, 'sawtooth'], [80, 0.3, 'sawtooth'], [600, 0.15, 'square'],
    ], 0.25);
  },

  // Button click — subtle tap
  click() {
    playTone(800, 0.05, 'sine', 0.08);
  },

  // Lesson complete — happy resolution
  complete() {
    playSequence([
      [523, 0.1], [659, 0.1], [784, 0.15], [1047, 0.3],
    ], 0.12);
  },

  // Streak — fire whoosh
  streak() {
    playSequence([
      [200, 0.08, 'sawtooth'], [400, 0.08, 'sawtooth'], [800, 0.15, 'sawtooth'],
    ], 0.06);
  },

  // Hint used — soft notification
  hint() {
    playTone(600, 0.1, 'triangle', 0.1);
  },
};

// Wrapper that checks settings before playing
export function playSound(soundName, settings) {
  if (settings?.soundEnabled === false) return;
  const fn = sounds[soundName];
  if (fn) fn();
}
