/**
 * Web Audio API Sound Effects Synthesizer
 * 100% self-contained, lightweight, royalty-free cute sound effects.
 */

let audioCtx: AudioContext | null = null;
let sfxMuted = false;

// Audio listeners for UI reactivity
const sfxListeners = new Set<(muted: boolean) => void>();

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSfxMuted(): boolean {
  return sfxMuted;
}

export function setSfxMuted(muted: boolean): void {
  sfxMuted = muted;
  sfxListeners.forEach((fn) => fn(muted));
}

export function toggleSfx(): boolean {
  setSfxMuted(!sfxMuted);
  return sfxMuted;
}

export function subscribeSfx(callback: (muted: boolean) => void): () => void {
  sfxListeners.add(callback);
  return () => {
    sfxListeners.delete(callback);
  };
}

/**
 * A. Normal button — Soft Pop
 * Gentle, rounded, cheerful pop (approx 90-120ms)
 */
export function playPop(): void {
  if (sfxMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Gentle pitch drop from 520Hz to 220Hz
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.09);

    // Soft envelope
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.11);

    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  } catch {
    // Graceful fallback if audio context blocked
  }
}

/**
 * B. NO button — Bubble Pop
 * Playful cartoon bubble pop with pitch sweep and resonant decay (approx 160ms)
 */
export function playBubblePop(): void {
  if (sfxMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Primary bubbly oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Classic bubble swoop: rapid scoop up then soft pop decay
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.05);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.15);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.17);

    // Resonant harmonic overtone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(560, now);
    osc2.frequency.exponentialRampToValueAtTime(920, now + 0.06);

    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.linearRampToValueAtTime(0.07, now + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(ctx.destination);
    gain2.connect(ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 0.18);
    osc2.stop(now + 0.18);

    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
      osc2.disconnect();
      gain2.disconnect();
    };
  } catch {
    // Graceful error handling
  }
}

/**
 * C. Cross / close / dismiss — Cute Cross Sound
 * Soft descending two-tone bloop (approx 120ms)
 */
export function playCrossSound(): void {
  if (sfxMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Gentle downward slide
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.11);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);

    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  } catch {}
}

/**
 * D. Panda Reactions
 * Collection of cute original reaction sounds (chirp, bloop, giggle, curious)
 */
export function playPandaReaction(variant: 'chirp' | 'bloop' | 'giggle' | 'curious' = 'bloop'): void {
  if (sfxMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    if (variant === 'chirp') {
      // Two-note happy chirp (E5 -> A5)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';

      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.setValueAtTime(880, now + 0.07);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
      gain.gain.setValueAtTime(0.18, now + 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    } else if (variant === 'giggle') {
      // Three tiny bouncy micro-tones
      const freqs = [523.25, 659.25, 783.99];
      freqs.forEach((freq, idx) => {
        const toneTime = now + idx * 0.045;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, toneTime);

        gain.gain.setValueAtTime(0.0001, toneTime);
        gain.gain.linearRampToValueAtTime(0.15, toneTime + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, toneTime + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(toneTime);
        osc.stop(toneTime + 0.045);
        osc.onended = () => {
          osc.disconnect();
          gain.disconnect();
        };
      });
    } else if (variant === 'curious') {
      // Inquisitive upward frequency bend
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';

      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.09);
      osc.frequency.exponentialRampToValueAtTime(490, now + 0.14);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    } else {
      // 'bloop' default: curious soft upward bloop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';

      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.1);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    }
  } catch {}
}

/**
 * E. Birthday Reveal — Sparkle & Celebratory Chime
 * Magical ascending chime arpeggio with delicate bell resonance (approx 650ms)
 */
export function playRevealChime(): void {
  if (sfxMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Pentatonic chime scale: C6, E6, G6, B6, C7, E7
    const notes = [1046.5, 1318.51, 1567.98, 1975.53, 2093.0, 2637.02];

    notes.forEach((freq, idx) => {
      const noteTime = now + idx * 0.075;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      // Bell chime envelope
      gain.gain.setValueAtTime(0.0001, noteTime);
      gain.gain.linearRampToValueAtTime(0.18, noteTime + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.38);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.4);

      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    });
  } catch {}
}

/**
 * F. Hug Interaction — Warm, Gentle Hug
 * Comforting, affectionate warm chord swell (approx 350ms)
 */
export function playHugSound(): void {
  if (sfxMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // F major gentle triad: F4 (349Hz), A4 (440Hz), C5 (523Hz)
    const chord = [349.23, 440.0, 523.25];

    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Warm soothing swell and soft decay
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.36);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.38);

      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    });
  } catch {}
}

/**
 * G. Control Feedback — Soft Tap
 */
export function playControlFeedback(): void {
  if (sfxMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(740, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.04);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.055);

    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  } catch {}
}
