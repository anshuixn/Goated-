import React, { useState, useEffect } from 'react';
import { isMusicPlaying, toggleMusic, subscribeMusic } from '../utils/musicManager';
import { isSfxMuted, toggleSfx, subscribeSfx, playControlFeedback } from '../utils/audioSystem';
import './AudioControls.css';

const AudioControls: React.FC = () => {
  const [playing, setPlaying] = useState(isMusicPlaying());
  const [sfxOff, setSfxOff] = useState(isSfxMuted());

  useEffect(() => {
    const unsubMusic = subscribeMusic((isPlaying) => setPlaying(isPlaying));
    const unsubSfx = subscribeSfx((isMuted) => setSfxOff(isMuted));
    return () => {
      unsubMusic();
      unsubSfx();
    };
  }, []);

  const handleToggleMusic = () => {
    playControlFeedback();
    toggleMusic();
  };

  const handleToggleSfx = () => {
    playControlFeedback();
    toggleSfx();
  };

  return (
    <aside className="audio-controls-dock" aria-label="Audio settings">
      {/* Background Music Button */}
      <button
        type="button"
        id="toggle-music-btn"
        className={`audio-btn ${playing ? 'audio-btn--active' : 'audio-btn--paused'}`}
        onClick={handleToggleMusic}
        title={playing ? 'Pause music' : 'Play music'}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        aria-pressed={playing}
      >
        <span className="audio-btn__icon" aria-hidden="true">
          {playing ? '🎵' : '🔇'}
        </span>
        <span className="audio-btn__label">
          {playing ? 'Music: On' : 'Music: Off'}
        </span>
        {playing && <span className="audio-wave-bars" aria-hidden="true">
          <span className="bar bar-1" />
          <span className="bar bar-2" />
          <span className="bar bar-3" />
        </span>}
      </button>

      {/* Sound Effects Button */}
      <button
        type="button"
        id="toggle-sfx-btn"
        className={`audio-btn ${!sfxOff ? 'audio-btn--active' : 'audio-btn--paused'}`}
        onClick={handleToggleSfx}
        title={sfxOff ? 'Unmute sound effects' : 'Mute sound effects'}
        aria-label={sfxOff ? 'Unmute sound effects' : 'Mute sound effects'}
        aria-pressed={!sfxOff}
      >
        <span className="audio-btn__icon" aria-hidden="true">
          {!sfxOff ? '✨' : '🔈'}
        </span>
        <span className="audio-btn__label">
          {!sfxOff ? 'SFX: On' : 'SFX: Off'}
        </span>
      </button>
    </aside>
  );
};

export default AudioControls;
