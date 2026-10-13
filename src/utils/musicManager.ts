/**
 * Background Music Manager
 * Manages the single persistent HTMLAudioElement instance for background music.
 */

const MUSIC_SRC = encodeURI('/Music/Those_Eyes_-_New_West_(mp3.pm).mp3');
const DEFAULT_VOLUME = 0.3; // 30% volume

let audioElement: HTMLAudioElement | null = null;
let isPlaying = false;
let userHasInteracted = false;

const musicListeners = new Set<(playing: boolean) => void>();

function notifyListeners(): void {
  musicListeners.forEach((fn) => fn(isPlaying));
}

export function getAudioElement(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!audioElement) {
    audioElement = new Audio(MUSIC_SRC);
    audioElement.loop = true;
    audioElement.volume = DEFAULT_VOLUME;

    audioElement.addEventListener('play', () => {
      isPlaying = true;
      notifyListeners();
    });

    audioElement.addEventListener('pause', () => {
      isPlaying = false;
      notifyListeners();
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
 * Start background music safely after a user interaction
 */
export async function startMusic(): Promise<void> {
  const audio = getAudioElement();
  if (!audio) return;

  try {
    if (audio.paused) {
      await audio.play();
      isPlaying = true;
      notifyListeners();
    }
  } catch (err) {
    // Autoplay prevented or failed gracefully
    console.debug('Audio play request handled:', err);
  }
}

/**
 * Pause background music
 */
export function pauseMusic(): void {
  const audio = getAudioElement();
  if (audio && !audio.paused) {
    audio.pause();
    isPlaying = false;
    notifyListeners();
  }
}

/**
 * Toggle background music play/pause
 */
export function toggleMusic(): boolean {
  const audio = getAudioElement();
  if (!audio) return false;

  if (audio.paused) {
    startMusic();
    return true;
  } else {
    pauseMusic();
    return false;
  }
}

export function isMusicPlaying(): boolean {
  return isPlaying;
}

export function subscribeMusic(callback: (playing: boolean) => void): () => void {
  musicListeners.add(callback);
  return () => {
    musicListeners.delete(callback);
  };
}

/**
 * Automatically trigger playback on first user gesture
 */
export function initAutoplayTrigger(): void {
  if (typeof window === 'undefined' || userHasInteracted) return;

  const onUserGesture = () => {
    if (userHasInteracted) return;
    userHasInteracted = true;

    // Start music on first valid user click/tap/keypress
    startMusic().catch(() => {});

    // Cleanup gesture listeners
    window.removeEventListener('pointerdown', onUserGesture);
    window.removeEventListener('keydown', onUserGesture);
    window.removeEventListener('touchstart', onUserGesture);
  };

  window.addEventListener('pointerdown', onUserGesture, { once: true });
  window.addEventListener('keydown', onUserGesture, { once: true });
  window.addEventListener('touchstart', onUserGesture, { once: true });
}
