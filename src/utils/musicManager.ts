/**
 * Background Music Manager
 * Manages the single persistent HTMLAudioElement instance for background music.
 * Automatically attempts playback on load, with fallback to first user gesture,
 * and provides persistent Mute / Unmute controls without resetting track position.
 */

const MUSIC_SRC = encodeURI('/Music/Those_Eyes_-_New_West_(mp3.pm).mp3');
const DEFAULT_VOLUME = 0.3; // 30% volume

let audioElement: HTMLAudioElement | null = null;
let isMuted = false;
let isPlaying = false;
let initialized = false;

// Listeners for UI state reactivity
const musicListeners = new Set<(state: { isMuted: boolean; isPlaying: boolean }) => void>();

function notifyListeners(): void {
  musicListeners.forEach((fn) => fn({ isMuted, isPlaying }));
}

/**
 * Get or create the singleton HTMLAudioElement
 */
export function getAudioElement(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!audioElement) {
    // Restore session mute preference if set
    try {
      const storedMute = sessionStorage.getItem('shreya_music_muted');
      if (storedMute !== null) {
        isMuted = storedMute === 'true';
      }
    } catch {
      // Ignore storage access errors
    }

    audioElement = new Audio(MUSIC_SRC);
    audioElement.loop = true;
    audioElement.volume = DEFAULT_VOLUME;
    audioElement.muted = isMuted;

    audioElement.addEventListener('play', () => {
      isPlaying = true;
      notifyListeners();
    });

    audioElement.addEventListener('pause', () => {
      isPlaying = false;
      notifyListeners();
    });

    audioElement.addEventListener('volumechange', () => {
      if (audioElement) {
        isMuted = audioElement.muted;
        notifyListeners();
      }
    });

    audioElement.addEventListener('error', (e) => {
      console.warn('Background music loading error:', e);
      isPlaying = false;
      notifyListeners();
    });
  }
  return audioElement;
}

/**
 * Attempt to start background music playback immediately
 */
export async function startMusic(): Promise<boolean> {
  const audio = getAudioElement();
  if (!audio) return false;

  try {
    audio.muted = isMuted;
    audio.volume = DEFAULT_VOLUME;
    await audio.play();
    isPlaying = true;
    notifyListeners();
    return true;
  } catch {
    // Autoplay blocked by browser policy without user gesture
    isPlaying = false;
    notifyListeners();
    return false;
  }
}

/**
 * Toggle Mute / Unmute
 * NOTE: Muting sets audio.muted = true so the song continues playing smoothly
 * in the background without losing its playback position.
 * Unmuting restores audible sound at the exact current position.
 */
export function toggleMusicMute(): boolean {
  const audio = getAudioElement();
  if (!audio) return false;

  isMuted = !isMuted;
  audio.muted = isMuted;

  // If unmuted and audio happened to be paused, ensure it's playing
  if (!isMuted && audio.paused) {
    audio.play().catch(() => {});
  }

  try {
    sessionStorage.setItem('shreya_music_muted', String(isMuted));
  } catch {}

  notifyListeners();
  return isMuted;
}

export function isMusicMuted(): boolean {
  return isMuted;
}

export function isMusicPlaying(): boolean {
  return isPlaying;
}

export function subscribeMusic(
  callback: (state: { isMuted: boolean; isPlaying: boolean }) => void
): () => void {
  musicListeners.add(callback);
  return () => {
    musicListeners.delete(callback);
  };
}

/**
 * Initialize automatic background music:
 * 1. Attempts immediate playback upon page load.
 * 2. If the browser restricts unprompted autoplay, sets up transparent listeners
 *    on the first user tap/click/keydown anywhere to immediately unlock and play.
 */
export function initBackgroundMusic(): void {
  if (typeof window === 'undefined' || initialized) return;
  initialized = true;

  const audio = getAudioElement();
  if (!audio) return;

  // 1. Attempt immediate autoplay on page load
  startMusic().then((started) => {
    if (started) return;

    // 2. Fallback: Browser blocked unprompted autoplay.
    // Unlock silently on the earliest user interaction anywhere on the screen.
    const unlockOnGesture = () => {
      startMusic().catch(() => {});
      window.removeEventListener('pointerdown', unlockOnGesture);
      window.removeEventListener('click', unlockOnGesture);
      window.removeEventListener('touchstart', unlockOnGesture);
      window.removeEventListener('keydown', unlockOnGesture);
    };

    window.addEventListener('pointerdown', unlockOnGesture, { once: true });
    window.addEventListener('click', unlockOnGesture, { once: true });
    window.addEventListener('touchstart', unlockOnGesture, { once: true });
    window.addEventListener('keydown', unlockOnGesture, { once: true });
  });
}
