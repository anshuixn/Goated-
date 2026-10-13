import React, { useState, useCallback, useRef, useEffect } from 'react';
import BabyPanda from './BabyPanda';
import type { PandaExpression } from './BabyPanda';
import CuteButton from './CuteButton';
import FloatingDecorations from './FloatingDecorations';
import HeartBurst from './HeartBurst';
import {
  playPop,
  playBubblePop,
  playCrossSound,
  playPandaReaction,
} from '../utils/audioSystem';
import './QuestionCard.css';

export const Q1_NO_MESSAGES = [
  "Wait… you’re Shreya, right? 🐼",
  "My little panda heart says otherwise! 💗",
  "Are you sure? I prepared this tiny surprise for you! 🎀",
  "Even the teddy bears are saying YES! 🧸",
  "Psst… the YES button looks extra cute today! ✨",
  "My paws are getting tired of asking! 🐾",
  "I think someone is trying to be difficult! Hehe. 🌸",
  "Just one little YES, pretty please? 🥺",
  "The surprise is getting impatient! 🎁",
  "My panda instincts are 100% sure! 💕",
  "Okay, okay… but look how BIG the YES button is getting! 😭",
  "Last chance, Shreya! Your little surprise is waiting! 🎂",
];

export const Q2_NO_MESSAGES = [
  "Wait… today really isn’t your birthday? 🎂",
  "My little panda calendar says otherwise! 🗓️💗",
  "Are you sure? I prepared this tiny birthday surprise for you! 🎀",
  "Even the birthday candles are saying YES! 🕯️",
  "Psst… the birthday YES button looks extra sweet today! ✨",
  "My paws are getting tired of holding the cake! 🐾",
  "I think someone is trying to hide her special day! Hehe. 🌸",
  "Just one little birthday YES, pretty please? 🥺",
  "The birthday surprise is getting impatient! 🎁",
  "My panda instincts are 100% sure it’s your birthday! 💕",
  "Okay, okay… but look how BIG the YES button is getting! 😭",
  "Last chance, Shreya! Your little birthday surprise is waiting! 🎂",
];

// Scale multipliers for YES button on NO clicks 0 to 5
const YES_SCALES = [1.0, 1.15, 1.32, 1.52, 1.76, 2.05];

interface QuestionCardProps {
  questionNumber: 1 | 2;
  onYes: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionNumber, onYes }) => {
  // Independent state per question
  const [noClickCount, setNoClickCount] = useState(0);
  const [pandaExpression, setPandaExpression] = useState<PandaExpression>(
    questionNumber === 1 ? 'waving' : 'curious'
  );
  const [pandaAnimate, setPandaAnimate] = useState<'idle' | 'bounce' | 'tilt' | 'none'>('idle');
  const [showHearts, setShowHearts] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const [bubbleKey, setBubbleKey] = useState(0);
  const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset all state when question changes
  useEffect(() => {
    setNoClickCount(0);
    setPandaExpression(questionNumber === 1 ? 'waving' : 'curious');
    setPandaAnimate('idle');
    setShowHearts(false);
    setYesClicked(false);
    setBubbleKey(0);
  }, [questionNumber]);

  const triggerPandaAnim = useCallback((anim: 'bounce' | 'tilt', expr: PandaExpression) => {
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    setPandaAnimate('none');
    setPandaExpression(expr);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPandaAnimate(anim);
        animTimeoutRef.current = setTimeout(() => setPandaAnimate('idle'), 700);
      });
    });
  }, []);

  const handleNo = useCallback(() => {
    if (yesClicked) return;
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);
    setBubbleKey((prev) => prev + 1);

    // B. NO button: Distinct bubble pop sound
    playBubblePop();

    // D. Panda reaction sound based on click progress
    if (newCount === 1) {
      triggerPandaAnim('tilt', 'curious');
      playPandaReaction('curious');
    } else if (newCount >= 2 && newCount <= 4) {
      triggerPandaAnim('tilt', 'curious');
      playPandaReaction('bloop');
    } else if (newCount >= 5 && newCount <= 9) {
      triggerPandaAnim('tilt', 'suspicious');
      playPandaReaction('curious');
    } else {
      triggerPandaAnim('bounce', 'suspicious');
      playPandaReaction('giggle');
    }
  }, [noClickCount, yesClicked, triggerPandaAnim]);

  const handleYes = useCallback(() => {
    if (yesClicked) return;
    setYesClicked(true);

    // A. Normal button: Soft pop sound
    playPop();
    playPandaReaction('chirp');

    triggerPandaAnim('bounce', 'excited');
    setShowHearts(true);
    setTimeout(() => {
      onYes();
    }, 650);
  }, [yesClicked, triggerPandaAnim, onYes]);

  // Question-specific content
  const content = questionNumber === 1
    ? {
        label: 'A tiny surprise for you…',
        question: 'Are you Shreya?',
        subtext: 'Our little baby panda has something very special to ask you!',
        yesLabel: 'Yes, that’s me! ✨',
        noLabel: 'Nope!',
        messages: Q1_NO_MESSAGES,
        decoration: null,
      }
    : {
        label: 'Hmm, wait a moment…',
        question: 'Is today your birthday?',
        subtext: 'Wait a second… are we celebrating someone very special today?',
        yesLabel: 'Yes, it is! 🎂',
        noLabel: 'Nope!',
        messages: Q2_NO_MESSAGES,
        decoration: (
          <svg className="birthday-candle-deco" viewBox="0 0 24 40" width="18" height="30" aria-hidden="true">
            <rect x="9" y="12" width="6" height="24" rx="3" fill="#F7B8D0" />
            <rect x="9" y="12" width="6" height="24" rx="3" fill="url(#candleStripe)" />
            <ellipse cx="12" cy="36" rx="3" ry="1.5" fill="rgba(0,0,0,0.08)" />
            <ellipse cx="12" cy="7" rx="3.5" ry="5" fill="#FFD66B" />
            <ellipse cx="12" cy="8" rx="2" ry="3.5" fill="#FFB347" />
            <ellipse cx="12" cy="9" rx="1" ry="2" fill="white" opacity="0.6" />
            <defs>
              <pattern id="candleStripe" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                <rect width="2" height="4" fill="rgba(255,255,255,0.4)" />
              </pattern>
            </defs>
          </svg>
        ),
      };

  // Get current message safely (clamped to last message after 12 clicks)
  const currentMessageIndex = Math.min(Math.max(0, noClickCount - 1), content.messages.length - 1);
  const currentMessage = noClickCount > 0 ? content.messages[currentMessageIndex] : null;

  // YES button scale inside the card (capped at index 5 before full-screen takeover at 6+)
  const currentScale = YES_SCALES[Math.min(noClickCount, YES_SCALES.length - 1)];

  // Full-screen YES takeover triggers at 6 or more NO clicks
  const isFullScreenYes = noClickCount >= 6;

  return (
    <div className="question-scene">
      <FloatingDecorations variant="question" />

      <div className="question-card" role="main">
        {/* Top label */}
        <p className="question-card__label">
          <span className="label-dot" aria-hidden="true">✦</span>
          {content.label}
          <span className="label-dot" aria-hidden="true">✦</span>
        </p>

        {/* Panda Area */}
        <div className="question-card__panda-area">
          {showHearts && <HeartBurst />}
          <BabyPanda
            expression={pandaExpression}
            animate={pandaAnimate}
            size={200}
          />
        </div>

        {/* ── Panda Speech Bubble for 12 sequential messages ── */}
        {currentMessage && (
          <div
            key={bubbleKey}
            className="panda-speech-bubble"
            role="status"
            aria-live="polite"
          >
            <div className="speech-bubble-tail" aria-hidden="true" />
            <p className="speech-bubble-text">{currentMessage}</p>
          </div>
        )}

        {/* Question Text */}
        <div className="question-card__text">
          <h1 className="question-card__question">
            {content.question}
            {content.decoration && (
              <span className="question-card__deco-inline" aria-hidden="true">
                {content.decoration}
              </span>
            )}
          </h1>
          <p className="question-card__subtext">{content.subtext}</p>
        </div>

        {/* ── Action Buttons ── */}
        <div className="question-card__buttons">
          {/* YES Button — Grows progressively with spring easing */}
          <div
            className={`yes-btn-growth-wrapper ${noClickCount > 0 ? 'yes-btn-growing' : ''}`}
            style={{
              transform: `scale(${currentScale})`,
              transformOrigin: 'center center',
            }}
          >
            <CuteButton
              id={`yes-btn-q${questionNumber}`}
              variant="primary"
              onClick={handleYes}
              disabled={yesClicked}
              className={`growing-yes-btn ${noClickCount >= 3 ? 'growing-yes-btn--prominent' : ''}`}
            >
              <span className="yes-btn-content">
                {noClickCount >= 2 && <span className="yes-btn-sparkle" aria-hidden="true">💖 </span>}
                {content.yesLabel}
                {noClickCount >= 4 && <span className="yes-btn-sparkle" aria-hidden="true"> ✨</span>}
              </span>
            </CuteButton>
          </div>

          {/* NO Button — Remains interactive and triggers YES growth */}
          <div
            className="no-btn-wrapper"
            aria-live="polite"
            aria-label={`No button, clicked ${noClickCount} times`}
          >
            <CuteButton
              id={`no-btn-q${questionNumber}`}
              variant="secondary"
              onClick={handleNo}
              disabled={yesClicked}
              className="playable-no-btn"
            >
              {noClickCount >= 4 ? 'Still no… 🙈' : noClickCount >= 1 ? 'Nope! 🤔' : content.noLabel}
            </CuteButton>
          </div>
        </div>
      </div>

      {/* ── 2.3 & 2.4 FULL-SCREEN YES STATE (Visual takeover at 6+ clicks) ── */}
      {isFullScreenYes && (
        <div
          className="fullscreen-yes-takeover"
          role="dialog"
          aria-modal="true"
          aria-label="Full screen invitation to select YES"
          onClick={handleYes}
        >
          {/* Ambient sparkling background */}
          <div className="fullscreen-yes-backdrop" aria-hidden="true">
            <span className="fs-glow fs-glow-1" />
            <span className="fs-glow fs-glow-2" />
          </div>

          <div
            className="fullscreen-yes-card"
            onClick={(e) => e.stopPropagation()} // Card container
          >
            <div className="fullscreen-yes-panda">
              <BabyPanda
                expression={pandaExpression}
                animate="bounce"
                size={180}
              />
            </div>

            {/* Speech bubble in takeover */}
            {currentMessage && (
              <div
                key={`fs-${bubbleKey}`}
                className="panda-speech-bubble fullscreen-bubble"
                role="status"
                aria-live="polite"
              >
                <div className="speech-bubble-tail" aria-hidden="true" />
                <p className="speech-bubble-text">{currentMessage}</p>
              </div>
            )}

            <h2 className="fullscreen-yes-title">
              There is only one answer now, Shreya! 🎀
            </h2>
            <p className="fullscreen-yes-subtitle">
              (Look how big and irresistible the YES button has become!)
            </p>

            {/* Massive interactive YES button */}
            <button
              id={`fullscreen-yes-btn-q${questionNumber}`}
              className="fullscreen-giant-yes-btn"
              onClick={handleYes}
              disabled={yesClicked}
              aria-label={content.yesLabel}
              autoFocus
            >
              <span className="giant-yes-sparkles" aria-hidden="true">✨ 💖 ✨</span>
              <span className="giant-yes-text">{content.yesLabel}</span>
              <span className="giant-yes-tap-hint">Tap anywhere to say YES!</span>
            </button>

            {/* Optional tiny NO button allows reading messages up to message 12 */}
            {noClickCount < 12 && (
              <button
                className="fullscreen-tiny-no-link"
                onClick={(e) => {
                  e.stopPropagation();
                  playCrossSound();
                  handleNo();
                }}
                disabled={yesClicked}
                aria-label="Refuse once more"
              >
                <span>…still saying nope? 🙈 ({noClickCount}/12)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
