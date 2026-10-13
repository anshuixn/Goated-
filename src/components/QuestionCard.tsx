import React, { useState, useCallback, useRef, useEffect } from 'react';
import BabyPanda from './BabyPanda';
import type { PandaExpression } from './BabyPanda';
import CuteButton from './CuteButton';
import FloatingDecorations from './FloatingDecorations';
import HeartBurst from './HeartBurst';
import './QuestionCard.css';

const NO_SCALES = [1.0, 1.12, 1.28, 1.48, 1.7];
const MAX_SCALE_IDX = NO_SCALES.length - 1;

interface QuestionCardProps {
  questionNumber: 1 | 2;
  onYes: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionNumber, onYes }) => {
  const [noClickCount, setNoClickCount] = useState(0);
  const [pandaExpression, setPandaExpression] = useState<PandaExpression>(
    questionNumber === 1 ? 'waving' : 'curious'
  );
  const [pandaAnimate, setPandaAnimate] = useState<'idle' | 'bounce' | 'tilt' | 'none'>('idle');
  const [showHearts, setShowHearts] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);
  const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset state when question changes
  useEffect(() => {
    setNoClickCount(0);
    setPandaExpression(questionNumber === 1 ? 'waving' : 'curious');
    setPandaAnimate('idle');
    setShowHearts(false);
    setYesClicked(false);
  }, [questionNumber]);

  const triggerPandaAnim = useCallback((anim: 'bounce' | 'tilt', expr: PandaExpression) => {
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    setPandaAnimate('none');
    setPandaExpression(expr);
    // micro-delay to restart animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPandaAnimate(anim);
        animTimeoutRef.current = setTimeout(() => setPandaAnimate('idle'), 700);
      });
    });
  }, []);

  const handleNo = useCallback(() => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);

    if (newCount === 1) {
      triggerPandaAnim('tilt', 'curious');
    } else if (newCount >= 3) {
      triggerPandaAnim('tilt', 'suspicious');
    } else {
      triggerPandaAnim('tilt', 'curious');
    }
  }, [noClickCount, triggerPandaAnim]);

  const handleYes = useCallback(() => {
    if (yesClicked) return;
    setYesClicked(true);
    triggerPandaAnim('bounce', 'excited');
    setShowHearts(true);
    setTimeout(() => {
      onYes();
    }, 600);
  }, [yesClicked, triggerPandaAnim, onYes]);

  const scaleIdx = Math.min(noClickCount, MAX_SCALE_IDX);
  const noScale = NO_SCALES[scaleIdx];

  // Question-specific content
  const content = questionNumber === 1
    ? {
        label: 'A tiny surprise for you…',
        question: 'Are you Shreya?',
        subtext: 'Our little panda has something to ask you!',
        yesLabel: 'Yes, that\'s me! ✨',
        noLabel: 'Nope!',
        decoration: null,
      }
    : {
        label: 'Hmm, wait a moment…',
        question: 'Is today your birthday?',
        subtext: 'Wait a second… are we celebrating someone special today?',
        yesLabel: 'Yes, it is! 🎂',
        noLabel: 'Nope!',
        decoration: (
          <svg className="birthday-candle-deco" viewBox="0 0 24 40" width="18" height="30" aria-hidden="true">
            <rect x="9" y="12" width="6" height="24" rx="3" fill="#F7B8D0" />
            <rect x="9" y="12" width="6" height="24" rx="3" fill="url(#candleStripe)" />
            <ellipse cx="12" cy="36" rx="3" ry="1.5" fill="rgba(0,0,0,0.08)" />
            {/* Flame */}
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

        {/* Panda */}
        <div className="question-card__panda-area">
          {showHearts && <HeartBurst />}
          <BabyPanda
            expression={pandaExpression}
            animate={pandaAnimate}
            size={200}
          />
        </div>

        {/* Question */}
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

        {/* Buttons */}
        <div className="question-card__buttons">
          {/* YES - always accessible */}
          <CuteButton
            id={`yes-btn-q${questionNumber}`}
            variant="primary"
            onClick={handleYes}
            disabled={yesClicked}
          >
            {content.yesLabel}
          </CuteButton>

          {/* NO - grows progressively */}
          <div className="no-btn-wrapper" aria-live="polite" aria-label={`No button, clicked ${noClickCount} times`}>
            <CuteButton
              id={`no-btn-q${questionNumber}`}
              variant="secondary"
              onClick={handleNo}
              scale={noScale}
            >
              {noClickCount >= 3 ? '…Still nope? 🤔' : noClickCount >= 1 ? 'Hmm, nope!' : content.noLabel}
            </CuteButton>
            {noClickCount >= MAX_SCALE_IDX && (
              <span className="no-btn-max-hint" aria-hidden="true">ఠ_ఠ</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
