import React from 'react';
import './BabyPanda.css';

export type PandaExpression =
  | 'happy'
  | 'waving'
  | 'curious'
  | 'suspicious'
  | 'excited'
  | 'celebrate'
  | 'hugging';

export type PandaVariant = 'normal' | 'birthday';

interface BabyPandaProps {
  expression?: PandaExpression;
  variant?: PandaVariant;
  size?: number;
  animate?: 'idle' | 'bounce' | 'tilt' | 'none';
  className?: string;
}

const BabyPanda: React.FC<BabyPandaProps> = ({
  expression = 'happy',
  variant = 'normal',
  size = 180,
  animate = 'idle',
  className = '',
}) => {
  const isBirthday = variant === 'birthday';

  /* ── Mouth paths ── */
  const mouthPath: Record<PandaExpression, string> = {
    happy:      'M 44 70 Q 50 77 56 70',
    waving:     'M 43 69 Q 50 77 57 69',
    curious:    'M 45 70 Q 50 74 55 70',
    suspicious: 'M 44 71 Q 50 74 56 71',
    excited:    'M 42 68 Q 50 79 58 68',
    celebrate:  'M 41 67 Q 50 80 59 67',
    hugging:    'M 43 70 Q 50 77 57 70',
  };

  /* ── Eyes ── */
  const renderEyes = () => {
    if (expression === 'suspicious') {
      return (
        <g>
          <ellipse cx="37" cy="57" rx="9" ry="6" fill="#1a1a1a" stroke="#1a1a1a" strokeWidth="0.5" />
          <circle cx="39.5" cy="55.5" r="2.5" fill="white" />
          <circle cx="40.5" cy="54.5" r="1" fill="white" opacity="0.5" />
          <ellipse cx="63" cy="57" rx="9" ry="6" fill="#1a1a1a" stroke="#1a1a1a" strokeWidth="0.5" />
          <circle cx="65.5" cy="55.5" r="2.5" fill="white" />
          <circle cx="66.5" cy="54.5" r="1" fill="white" opacity="0.5" />
        </g>
      );
    }
    if (expression === 'excited' || expression === 'celebrate') {
      return (
        <g>
          <circle cx="37" cy="57" r="10" fill="#1a1a1a" />
          <circle cx="41" cy="53.5" r="3.5" fill="white" />
          <circle cx="42.5" cy="52" r="1.5" fill="white" opacity="0.6" />
          <circle cx="34.5" cy="60" r="1.5" fill="white" />
          <circle cx="63" cy="57" r="10" fill="#1a1a1a" />
          <circle cx="67" cy="53.5" r="3.5" fill="white" />
          <circle cx="68.5" cy="52" r="1.5" fill="white" opacity="0.6" />
          <circle cx="60.5" cy="60" r="1.5" fill="white" />
        </g>
      );
    }
    if (expression === 'curious') {
      return (
        <g>
          <circle cx="37" cy="57" r="9" fill="#1a1a1a" />
          <circle cx="40.5" cy="54" r="3" fill="white" />
          <circle cx="42" cy="52.5" r="1.2" fill="white" opacity="0.5" />
          <circle cx="63" cy="56" r="10" fill="#1a1a1a" />
          <circle cx="67" cy="52.5" r="3.5" fill="white" />
          <circle cx="68.5" cy="51" r="1.5" fill="white" opacity="0.5" />
        </g>
      );
    }
    return (
      <g>
        <circle cx="37" cy="57" r="9.5" fill="#1a1a1a" />
        <circle cx="41" cy="53.5" r="3.5" fill="white" />
        <circle cx="42.5" cy="52" r="1.5" fill="white" opacity="0.5" />
        <circle cx="34.5" cy="60" r="1.5" fill="white" opacity="0.4" />
        <circle cx="63" cy="57" r="9.5" fill="#1a1a1a" />
        <circle cx="67" cy="53.5" r="3.5" fill="white" />
        <circle cx="68.5" cy="52" r="1.5" fill="white" opacity="0.5" />
        <circle cx="60.5" cy="60" r="1.5" fill="white" opacity="0.4" />
      </g>
    );
  };

  /* ── Arms ── */
  const renderArms = () => {
    if (expression === 'waving') {
      return (
        <g>
          {/* left arm resting */}
          <ellipse cx="22" cy="142" rx="12" ry="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="0.8" transform="rotate(-10 22 142)" />
          {/* right arm raised */}
          <ellipse cx="81" cy="112" rx="11" ry="9" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="0.8" transform="rotate(-55 81 112)" />
          {/* hand tip */}
          <ellipse cx="77" cy="104" rx="8" ry="6" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="0.8" transform="rotate(-55 77 104)" />
        </g>
      );
    }
    if (expression === 'celebrate') {
      return (
        <g>
          <ellipse cx="16" cy="120" rx="12" ry="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="0.8" transform="rotate(45 16 120)" />
          <ellipse cx="84" cy="120" rx="12" ry="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="0.8" transform="rotate(-45 84 120)" />
        </g>
      );
    }
    if (expression === 'hugging') {
      return (
        <g>
          <ellipse cx="19" cy="135" rx="14" ry="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="0.8" transform="rotate(25 19 135)" />
          <ellipse cx="81" cy="135" rx="14" ry="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="0.8" transform="rotate(-25 81 135)" />
        </g>
      );
    }
    return (
      <g>
        <ellipse cx="20" cy="138" rx="12" ry="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="0.8" transform="rotate(-8 20 138)" />
        <ellipse cx="80" cy="138" rx="12" ry="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="0.8" transform="rotate(8 80 138)" />
      </g>
    );
  };

  const animClass = {
    idle:   'panda-idle',
    bounce: 'panda-bounce',
    tilt:   'panda-tilt',
    none:   '',
  }[animate];

  return (
    <div
      className={`panda-wrapper ${animClass} ${className}`}
      style={{ width: size, height: 'auto', display: 'inline-block' }}
      aria-label="Cute baby panda character"
      role="img"
    >
      <svg
        viewBox="0 0 100 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        {/* ── Birthday Hat ── */}
        {isBirthday && (
          <g>
            {/* Hat cone */}
            <polygon points="50,2 32,33 68,33" fill="#F7B8D0" stroke="#F48CAF" strokeWidth="0.8" strokeLinejoin="round" />
            {/* Stripes */}
            <line x1="41" y1="32" x2="35" y2="8" stroke="#F48CAF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            <line x1="52" y1="33" x2="50" y2="3" stroke="#F48CAF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            {/* Brim */}
            <rect x="30" y="31" width="40" height="7" rx="3.5" fill="#FFD66B" stroke="#FFB347" strokeWidth="0.5" />
            {/* Star on tip */}
            <path d="M50 2 L51.2 5.8 L55.2 5.8 L52 8.2 L53.2 12 L50 9.6 L46.8 12 L48 8.2 L44.8 5.8 L48.8 5.8Z" fill="#FFD66B" />
          </g>
        )}

        {/* ── Ears ── */}
        <ellipse cx="21" cy="38" rx="14" ry="13" fill="#1a1a1a" />
        <ellipse cx="21" cy="38" rx="9" ry="8" fill="#2d2d2d" />
        <ellipse cx="79" cy="38" rx="14" ry="13" fill="#1a1a1a" />
        <ellipse cx="79" cy="38" rx="9" ry="8" fill="#2d2d2d" />

        {/* ── Head ── */}
        <ellipse cx="50" cy="62" rx="37" ry="35" fill="#FAFAFA" stroke="#E8E8E8" strokeWidth="1" />

        {/* ── Eye patches ── */}
        <ellipse cx="37" cy="60" rx="15" ry="14" fill="#1a1a1a" />
        <ellipse cx="63" cy="60" rx="15" ry="14" fill="#1a1a1a" />

        {/* ── Eyes ── */}
        {renderEyes()}

        {/* ── Nose ── */}
        <ellipse cx="50" cy="70" rx="5.5" ry="4" fill="#1a1a1a" />
        <ellipse cx="48.5" cy="68.5" rx="2" ry="1.2" fill="#3a3a3a" />

        {/* ── Mouth ── */}
        <path
          d={mouthPath[expression]}
          stroke="#9A7A84"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* ── Cheeks ── */}
        <ellipse cx="25" cy="74" rx="10" ry="7" fill="rgba(247,184,208,0.55)" />
        <ellipse cx="75" cy="74" rx="10" ry="7" fill="rgba(247,184,208,0.55)" />

        {/* ── Bow (non-birthday) ── */}
        {!isBirthday && (
          <g transform="translate(68, 28) rotate(-12)">
            {/* Left loop */}
            <ellipse cx="-9" cy="0" rx="8" ry="5.5" fill="#F7B8D0" stroke="#F48CAF" strokeWidth="0.5" />
            <ellipse cx="-8.5" cy="-1.5" rx="3.5" ry="2" fill="rgba(255,255,255,0.4)" />
            {/* Right loop */}
            <ellipse cx="9" cy="0" rx="8" ry="5.5" fill="#F7B8D0" stroke="#F48CAF" strokeWidth="0.5" />
            <ellipse cx="8.5" cy="-1.5" rx="3.5" ry="2" fill="rgba(255,255,255,0.4)" />
            {/* Center knot */}
            <circle cx="0" cy="0" r="4" fill="#F48CAF" />
            <circle cx="0" cy="-1" r="1.5" fill="rgba(255,255,255,0.3)" />
          </g>
        )}

        {/* ── Body ── */}
        <ellipse cx="50" cy="158" rx="28" ry="30" fill="#F0F0F0" stroke="#E0E0E0" strokeWidth="0.8" />
        {/* Belly */}
        <ellipse cx="50" cy="158" rx="18" ry="20" fill="#FAFAFA" />

        {/* ── Arms ── */}
        {renderArms()}

        {/* ── Legs ── */}
        <ellipse cx="35" cy="182" rx="13" ry="10" fill="#1a1a1a" transform="rotate(-8 35 182)" />
        <ellipse cx="65" cy="182" rx="13" ry="10" fill="#1a1a1a" transform="rotate(8 65 182)" />
        {/* Paw pads */}
        <ellipse cx="34" cy="185" rx="7.5" ry="4" fill="#2d2d2d" />
        <ellipse cx="64" cy="185" rx="7.5" ry="4" fill="#2d2d2d" />

        {/* ── Ground shadow ── */}
        <ellipse cx="50" cy="197" rx="24" ry="4" fill="rgba(98,75,83,0.08)" />
      </svg>
    </div>
  );
};

export default BabyPanda;
