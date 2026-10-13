import React, { useState, useEffect } from 'react';
import { isMusicMuted, toggleMusicMute, subscribeMusic } from '../utils/musicManager';
import { isSfxMuted, toggleSfx, subscribeSfx, playControlFeedback } from '../utils/audioSystem';
import './AudioControls.css';

const AudioControls: React.FC = () => {
  const [muted, setMuted] = useState(isMusicMuted());
  const [sfxOff, setSfxOff] = useState(isSfxMuted());

  useEffect(() => {
    const unsubMusic = subscribeMusic(({ isMuted }) => setMuted(isMuted));
    const unsubSfx = subscribeSfx((isMuted) => setSfxOff(isMuted));
    return () => {
      unsubMusic();
      unsubSfx();
    };
  }, []);

  const handleToggleMusicMute = () => {
    playControlFeedback();
    toggleMusicMute();
  };

  const handleToggleSfx = () => {
    playControlFeedback();
    toggleSfx();
  };

  return (
    <aside className="audio-controls-dock" aria-label="Audio settings">
      {/* Background Music Mute / Unmute Button */}
      <button
        type="button"
        id="toggle-music-btn"
        className={`audio-btn ${!muted ? 'audio-btn--active' : 'audio-btn--paused'}`}
        onClick={handleToggleMusicMute}
        title={!muted ? 'Mute background music' : 'Unmute background music'}
        aria-label={!muted ? 'Mute background music' : 'Unmute background music'}
        aria-pressed={!muted}
      >
        <span className="audio-btn__icon" aria-hidden="true">
          {!muted ? '🎵' : '🔇'}
        </span>
        <span className="audio-btn__label">
          {!muted ? 'Music: On' : 'Music: Muted'}
        </span>
        {!muted && (
          <span className="audio-wave-bars" aria-hidden="true">
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
          </span>
        )}
      </button>

      {/* Sound Effects Independent Toggle */}
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
