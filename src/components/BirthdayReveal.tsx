import React, { useState, useCallback } from 'react';
import BabyPanda from './BabyPanda';
import CuteButton from './CuteButton';
import FloatingDecorations from './FloatingDecorations';
import HeartBurst from './HeartBurst';
import { playHugSound, playPandaReaction } from '../utils/audioSystem';
import './BirthdayReveal.css';

const GREETING = "Hello Shreya,";

const HINGLISH_PARAGRAPHS = [
  "I know that idhar kuch time se main tumse bahut achhe se baat nahi kar pa raha, time nahi de pa raha. But the thing is ki I know that you have faced various problems and I have always tried to be with you. I have always tried to stay by your side and help you with however ways I can.",
  "Abhi I know tumhare NEET ke exams aane wale hain, toh you are in great pressure for that. But I know tum kar logi.",
  "Not about just this NEET exams. I know tum apne life mein bhi achhe aur successful post tak zaroor pahunchogi aur apne saare dreams ko achieve karogi."
];

const FINAL_WISH = "Happiest birthday, Shreya. ❤️";

const BirthdayReveal: React.FC = () => {
  const [isHugging, setIsHugging] = useState(false);
  const [showHugHearts, setShowHugHearts] = useState(false);

  const handleHug = useCallback(() => {
    if (isHugging) return;
    setIsHugging(true);
    setShowHugHearts(true);

    // Warm comforting hug sound + happy panda reaction
    playHugSound();
    playPandaReaction('giggle');

    setTimeout(() => {
      setIsHugging(false);
      setShowHugHearts(false);
    }, 1800);
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
          <svg viewBox="0 0 120 100" width="105" height="88">
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
            <ellipse cx="51" cy="7" rx="1" ry="2.5" fill="white" opacity="0.6" />
            {/* Candle 2 */}
            <rect x="66" y="6" width="6" height="14" rx="3" fill="#FFD66B" />
            <ellipse cx="69" cy="4" rx="4" ry="6" fill="#FFD66B" />
            <ellipse cx="69" cy="5.5" rx="2" ry="4" fill="#FFB347" />
            <ellipse cx="69" cy="7" rx="1" ry="2.5" fill="white" opacity="0.6" />
            {/* Dots decoration */}
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
          <div className="birthday-badge" aria-hidden="true">
            <span>✨ A special letter for you ✨</span>
          </div>
          <h1 className="birthday-heading">
            Happiest Birthday,{' '}
            <span className="birthday-heading__name">Shreya!</span> 🎀💗
          </h1>
          <div className="heading-ribbon" aria-hidden="true">
            <svg viewBox="0 0 200 18" width="180" height="16">
              <path d="M0 9 C40 0, 80 18, 100 9 C120 0, 160 18, 200 9" stroke="#F7B8D0" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* ── Editorial Romanized Hinglish Birthday Message Letter ── */}
        <article className="birthday-letter-card reveal-message" aria-label="Birthday letter for Shreya">
          <div className="letter-card-header" aria-hidden="true">
            <span className="letter-stamp">💌 FROM A TRUE FRIEND</span>
            <div className="letter-sparkle-dots">
              <span>🌸</span>
              <span>🐾</span>
              <span>✨</span>
            </div>
          </div>

          <div className="letter-body">
            {/* Salutation Greeting */}
            <p className="letter-greeting">{GREETING}</p>

            {/* Paragraphs in natural Romanized Hinglish */}
            {HINGLISH_PARAGRAPHS.map((paragraph, idx) => (
              <p key={idx} className="letter-paragraph">
                {paragraph}
              </p>
            ))}

            {/* Special Highlight Box for Final Wish */}
            <div className="final-wish-box">
              <p className="final-wish-text">{FINAL_WISH}</p>
            </div>
          </div>

          <div className="letter-card-footer" aria-hidden="true">
            <span className="letter-paw-sign">With all warmth & panda hugs 🐾</span>
          </div>
        </article>

        {/* ── Hug button ── */}
        <div className="birthday-actions reveal-actions">
          <CuteButton
            id="hug-btn"
            variant="primary"
            onClick={handleHug}
            className="hug-action-btn"
          >
            {isHugging ? '🐾 Sending you the warmest hug… 💗' : '🤗 Send You a Big Panda Hug'}
          </CuteButton>
        </div>

      </main>
    </div>
  );
};

export default BirthdayReveal;
