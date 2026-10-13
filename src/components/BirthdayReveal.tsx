import React, { useState, useCallback } from 'react';
import BabyPanda from './BabyPanda';
import CuteButton from './CuteButton';
import FloatingDecorations from './FloatingDecorations';
import HeartBurst from './HeartBurst';
import './BirthdayReveal.css';

const BirthdayReveal: React.FC = () => {
  const [isHugging, setIsHugging] = useState(false);
  const [showHugHearts, setShowHugHearts] = useState(false);

  const handleHug = useCallback(() => {
    if (isHugging) return;
    setIsHugging(true);
    setShowHugHearts(true);
    setTimeout(() => {
      setIsHugging(false);
      setShowHugHearts(false);
    }, 1400);
  }, [isHugging]);

  return (
    <div className="birthday-scene">
      <FloatingDecorations variant="birthday" />

      <main className="birthday-content" role="main">

        {/* ── Panda + birthday hat ── */}
        <div className="birthday-panda-wrap reveal-panda">
          {showHugHearts && <HeartBurst />}
          <BabyPanda
            expression={isHugging ? 'hugging' : 'celebrate'}
            variant="birthday"
            animate={isHugging ? 'bounce' : 'idle'}
            size={220}
          />
        </div>

        {/* ── Birthday Cake illustration ── */}
        <div className="birthday-cake reveal-cake" aria-hidden="true">
          <svg viewBox="0 0 120 100" width="110" height="92">
            {/* Cake base tier */}
            <rect x="10" y="58" width="100" height="34" rx="10" fill="#FCE4EC" />
            <rect x="10" y="58" width="100" height="12" rx="6" fill="#F7B8D0" />
            {/* Middle tier */}
            <rect x="22" y="36" width="76" height="26" rx="8" fill="#FFE9A8" />
            <rect x="22" y="36" width="76" height="10" rx="5" fill="#FFD66B" />
            {/* Top tier */}
            <rect x="34" y="18" width="52" height="22" rx="7" fill="#FCE4EC" />
            <rect x="34" y="18" width="52" height="8" rx="4" fill="#F7B8D0" />
            {/* Candle 1 */}
            <rect x="48" y="6" width="6" height="14" rx="3" fill="#F48CAF" />
            <ellipse cx="51" cy="4" rx="4" ry="6" fill="#FFD66B" />
            <ellipse cx="51" cy="5.5" rx="2" ry="4" fill="#FFB347" />
            <ellipse cx="51" cy="7" rx="1" ry="2.5" fill="white" opacity="0.55" />
            {/* Candle 2 */}
            <rect x="66" y="6" width="6" height="14" rx="3" fill="#FFD66B" />
            <ellipse cx="69" cy="4" rx="4" ry="6" fill="#FFD66B" />
            <ellipse cx="69" cy="5.5" rx="2" ry="4" fill="#FFB347" />
            <ellipse cx="69" cy="7" rx="1" ry="2.5" fill="white" opacity="0.55" />
            {/* Dots decoration on base tier */}
            <circle cx="30" cy="74" r="3.5" fill="#F7B8D0" />
            <circle cx="45" cy="80" r="3.5" fill="#FFD66B" />
            <circle cx="60" cy="74" r="3.5" fill="#F7B8D0" />
            <circle cx="75" cy="80" r="3.5" fill="#FFD66B" />
            <circle cx="90" cy="74" r="3.5" fill="#F7B8D0" />
            {/* Heart on middle tier */}
            <path d="M60 52 C60 52 53 48.5 53 45A3.5 3.5 0 0 1 60 44A3.5 3.5 0 0 1 67 45C67 48.5 60 52 60 52Z" fill="#F48CAF" />
          </svg>
        </div>

        {/* ── Main heading ── */}
        <div className="birthday-heading-wrap reveal-heading">
          <h1 className="birthday-heading">
            Happiest Birthday,{' '}
            <span className="birthday-heading__name">Shreya!</span>
          </h1>
          {/* Decorative ribbon under heading */}
          <div className="heading-ribbon" aria-hidden="true">
            <svg viewBox="0 0 200 18" width="180" height="16">
              <path d="M0 9 C40 0, 80 18, 100 9 C120 0, 160 18, 200 9" stroke="#F7B8D0" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* ── Birthday message ── */}
        <div className="birthday-message-wrap reveal-message">
          <p className="birthday-message">
            Today is all about you, your beautiful smile, and all the happiness you deserve.
            May your day be filled with love, laughter, little surprises, and countless reasons to smile.
          </p>
        </div>

        {/* ── Hug button ── */}
        <div className="birthday-actions reveal-actions">
          <CuteButton
            id="hug-btn"
            variant="primary"
            onClick={handleHug}
          >
            {isHugging ? '🐾 Hugging you…' : '🤗 Send You a Big Hug'}
          </CuteButton>
        </div>

      </main>
    </div>
  );
};

export default BirthdayReveal;
