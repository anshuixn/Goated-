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
  size = 190,
  animate = 'idle',
  className = '',
}) => {
  const isBirthday = variant === 'birthday';

  /* ── Mouth rendering based on expression ── */
  const renderMouth = () => {
    if (expression === 'excited' || expression === 'celebrate') {
      return (
        <g id="panda-mouth">
          {/* Philtrum line */}
          <line x1="100" y1="102" x2="100" y2="105" stroke="#4A3E44" strokeWidth="1.8" strokeLinecap="round" />
          {/* Open happy baby smile */}
          <path
            d="M 92 105 Q 100 106 108 105 C 108 116 92 116 92 105 Z"
            fill="#F48CAF"
            stroke="#4A3E44"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Cute tongue */}
          <path
            d="M 95 109 Q 100 107 105 109 C 104 114 96 114 95 109 Z"
            fill="#FFBACD"
          />
        </g>
      );
    }

    if (expression === 'suspicious') {
      return (
        <g id="panda-mouth">
          <line x1="100" y1="102" x2="100" y2="105" stroke="#4A3E44" strokeWidth="1.8" strokeLinecap="round" />
          {/* Gentle questioning pout */}
          <path
            d="M 94 107 Q 99 105.5 105 107"
            stroke="#4A3E44"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      );
    }

    if (expression === 'curious') {
      return (
        <g id="panda-mouth">
          <line x1="100" y1="102" x2="100" y2="105.5" stroke="#4A3E44" strokeWidth="1.8" strokeLinecap="round" />
          {/* Small gentle "o" / curious smile */}
          <path
            d="M 94 106.5 Q 97 109.5 100 106.5 Q 103 109.5 106 106.5"
            stroke="#4A3E44"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      );
    }

    // Default friendly baby panda double smile
    return (
      <g id="panda-mouth">
        <line x1="100" y1="102" x2="100" y2="105" stroke="#4A3E44" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M 93 105.5 Q 96.5 109 100 105.5 Q 103.5 109 107 105.5"
          stroke="#4A3E44"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    );
  };

  /* ── Eyes inside distinct panda eye patches ── */
  const renderEyes = () => {
    if (expression === 'suspicious') {
      return (
        <g id="panda-eyes">
          {/* Left eye squinting cutely */}
          <ellipse cx="75" cy="87" rx="6.5" ry="4.2" fill="#161418" />
          <circle cx="77" cy="85.5" r="2.2" fill="#FFFFFF" />
          <circle cx="73" cy="88" r="1.1" fill="#FFFFFF" opacity="0.8" />

          {/* Right eye squinting */}
          <ellipse cx="125" cy="87" rx="6.5" ry="4.2" fill="#161418" />
          <circle cx="127" cy="85.5" r="2.2" fill="#FFFFFF" />
          <circle cx="123" cy="88" r="1.1" fill="#FFFFFF" opacity="0.8" />
        </g>
      );
    }

    if (expression === 'excited' || expression === 'celebrate') {
      return (
        <g id="panda-eyes">
          {/* Left glossy eye with big sparkles */}
          <circle cx="75" cy="86" r="8" fill="#141216" />
          <circle cx="78" cy="83" r="3.4" fill="#FFFFFF" />
          <circle cx="72.5" cy="89" r="1.8" fill="#FFFFFF" opacity="0.9" />
          <circle cx="79" cy="87.5" r="1.1" fill="#FFFFFF" opacity="0.8" />

          {/* Right glossy eye with big sparkles */}
          <circle cx="125" cy="86" r="8" fill="#141216" />
          <circle cx="128" cy="83" r="3.4" fill="#FFFFFF" />
          <circle cx="122.5" cy="89" r="1.8" fill="#FFFFFF" opacity="0.9" />
          <circle cx="129" cy="87.5" r="1.1" fill="#FFFFFF" opacity="0.8" />
        </g>
      );
    }

    if (expression === 'curious') {
      return (
        <g id="panda-eyes">
          {/* Left eye */}
          <circle cx="75" cy="86" r="7.5" fill="#151316" />
          <circle cx="77.8" cy="83.5" r="3" fill="#FFFFFF" />
          <circle cx="73" cy="88.5" r="1.5" fill="#FFFFFF" opacity="0.85" />

          {/* Right eye slightly wide */}
          <circle cx="125" cy="85.5" r="8.2" fill="#151316" />
          <circle cx="128" cy="82.8" r="3.3" fill="#FFFFFF" />
          <circle cx="122.5" cy="88.5" r="1.7" fill="#FFFFFF" opacity="0.9" />
        </g>
      );
    }

    // Default friendly baby eyes with double white catchlights
    return (
      <g id="panda-eyes">
        {/* Left eye */}
        <circle cx="75" cy="86.5" r="7.5" fill="#151316" />
        <circle cx="77.5" cy="83.8" r="3" fill="#FFFFFF" />
        <circle cx="73" cy="89" r="1.5" fill="#FFFFFF" opacity="0.85" />

        {/* Right eye */}
        <circle cx="125" cy="86.5" r="7.5" fill="#151316" />
        <circle cx="127.5" cy="83.8" r="3" fill="#FFFFFF" />
        <circle cx="123" cy="89" r="1.5" fill="#FFFFFF" opacity="0.85" />
      </g>
    );
  };

  /* ── Arms & Limbs (Black arms and legs, true giant panda anatomy) ── */
  const renderArms = () => {
    if (expression === 'waving') {
      return (
        <g id="panda-arms">
          {/* Left black arm resting gently */}
          <path
            d="M 54 135 C 38 142 36 166 52 170 C 65 172 74 158 70 144 C 67 136 60 133 54 135 Z"
            fill="#232126"
            stroke="#19171B"
            strokeWidth="0.8"
          />
          {/* Paw pad on resting arm */}
          <ellipse cx="50" cy="158" rx="5" ry="3.8" fill="#36323B" transform="rotate(-15 50 158)" />

          {/* Right arm raised waving */}
          <g className="panda-paw-wave">
            <path
              d="M 144 136 C 158 130 178 116 172 98 C 166 84 148 92 138 108 C 130 120 136 132 144 136 Z"
              fill="#232126"
              stroke="#19171B"
              strokeWidth="0.8"
            />
            {/* Waving paw beans */}
            <ellipse cx="163" cy="98" rx="5.5" ry="4.5" fill="#36323B" transform="rotate(-25 163 98)" />
            <circle cx="157" cy="91" r="2" fill="#36323B" />
            <circle cx="163" cy="89" r="2" fill="#36323B" />
            <circle cx="169" cy="91" r="2" fill="#36323B" />
          </g>
        </g>
      );
    }

    if (expression === 'celebrate' || expression === 'excited') {
      return (
        <g id="panda-arms">
          {/* Both arms raised up joyfully \o/ */}
          {/* Left raised arm */}
          <path
            d="M 58 136 C 44 130 24 114 30 96 C 36 82 54 90 64 106 C 72 118 66 132 58 136 Z"
            fill="#232126"
            stroke="#19171B"
            strokeWidth="0.8"
          />
          <ellipse cx="38" cy="96" rx="5.5" ry="4.5" fill="#36323B" transform="rotate(25 38 96)" />
          <circle cx="32" cy="89" r="2" fill="#36323B" />
          <circle cx="38" cy="87" r="2" fill="#36323B" />
          <circle cx="44" cy="89" r="2" fill="#36323B" />

          {/* Right raised arm */}
          <path
            d="M 142 136 C 156 130 176 114 170 96 C 164 82 146 90 136 106 C 128 118 134 132 142 136 Z"
            fill="#232126"
            stroke="#19171B"
            strokeWidth="0.8"
          />
          <ellipse cx="162" cy="96" rx="5.5" ry="4.5" fill="#36323B" transform="rotate(-25 162 96)" />
          <circle cx="156" cy="89" r="2" fill="#36323B" />
          <circle cx="162" cy="87" r="2" fill="#36323B" />
          <circle cx="168" cy="89" r="2" fill="#36323B" />
        </g>
      );
    }

    if (expression === 'hugging') {
      return (
        <g id="panda-arms" className="panda-arms-hug">
          {/* Left arm wrapped inward around tummy/viewer */}
          <path
            d="M 50 136 C 35 142 38 168 62 172 C 80 174 95 165 92 152 C 90 144 76 140 68 141 C 58 134 52 134 50 136 Z"
            fill="#232126"
            stroke="#19171B"
            strokeWidth="0.8"
          />
          <ellipse cx="84" cy="158" rx="5" ry="4" fill="#36323B" />

          {/* Right arm wrapped inward around tummy/viewer */}
          <path
            d="M 150 136 C 165 142 162 168 138 172 C 120 174 105 165 108 152 C 110 144 124 140 132 141 C 142 134 148 134 150 136 Z"
            fill="#232126"
            stroke="#19171B"
            strokeWidth="0.8"
          />
          <ellipse cx="116" cy="158" rx="5" ry="4" fill="#36323B" />
        </g>
      );
    }

    // Default resting / curious / suspicious arms
    return (
      <g id="panda-arms">
        {/* Left arm */}
        <path
          d="M 55 135 C 38 142 38 168 56 172 C 70 174 78 159 74 145 C 70 136 62 133 55 135 Z"
          fill="#232126"
          stroke="#19171B"
          strokeWidth="0.8"
        />
        <ellipse cx="54" cy="160" rx="5" ry="4" fill="#36323B" transform="rotate(-10 54 160)" />

        {/* Right arm */}
        <path
          d="M 145 135 C 162 142 162 168 144 172 C 130 174 122 159 126 145 C 130 136 138 133 145 135 Z"
          fill="#232126"
          stroke="#19171B"
          strokeWidth="0.8"
        />
        <ellipse cx="146" cy="160" rx="5" ry="4" fill="#36323B" transform="rotate(10 146 160)" />
      </g>
    );
  };

  const animClass = {
    idle: 'panda-idle',
    bounce: 'panda-bounce',
    tilt: 'panda-tilt',
    none: '',
  }[animate];

  return (
    <div
      className={`panda-wrapper ${animClass} ${className}`}
      style={{ width: size, height: 'auto', display: 'inline-block' }}
      aria-label="Adorable baby giant panda"
      role="img"
    >
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        className="panda-svg"
      >
        <defs>
          {/* Soft plush shading gradients */}
          <radialGradient id="pandaHeadShade" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#FAF7F8" />
            <stop offset="100%" stopColor="#F0E8EB" />
          </radialGradient>

          <radialGradient id="pandaBellyShade" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="80%" stopColor="#FAF8FA" />
            <stop offset="100%" stopColor="#EFE8EB" />
          </radialGradient>

          <radialGradient id="earDepth" cx="45%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#353138" />
            <stop offset="100%" stopColor="#1E1C21" />
          </radialGradient>

          <filter id="softPlushDrop" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#624B53" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* ── Ground shadow ── */}
        <ellipse cx="100" cy="228" rx="64" ry="8" fill="rgba(98, 75, 83, 0.12)" />

        {/* ── Party Hat (for birthday screen) ── */}
        {isBirthday && (
          <g id="panda-party-hat" transform="translate(0, -2)">
            {/* Cone */}
            <polygon
              points="100,6 78,44 122,44"
              fill="#F48CAF"
              stroke="#E27499"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Striped patterns on hat */}
            <path d="M 86 44 L 97 12" stroke="#FFE9A8" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 98 44 L 103 8" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <path d="M 110 44 L 106 18" stroke="#FFE9A8" strokeWidth="3" strokeLinecap="round" />
            {/* Fluffy Brim */}
            <rect x="74" y="42" width="52" height="8" rx="4" fill="#FFE9A8" stroke="#FCD367" strokeWidth="1" />
            {/* Yellow star pom-pom at tip */}
            <path
              d="M 100 2 L 102 6 L 106 6 L 103 9 L 104 13 L 100 11 L 96 13 L 97 9 L 94 6 L 98 6 Z"
              fill="#FFD66B"
              stroke="#E8A926"
              strokeWidth="0.6"
            />
          </g>
        )}

        {/* ── Ears (Rounded, prominent black panda ears positioned symmetrically near top of head) ── */}
        {/* Left ear */}
        <g id="left-panda-ear">
          <ellipse cx="50" cy="50" rx="20" ry="18" fill="#211F24" transform="rotate(-22 50 50)" />
          {/* Inner ear soft depth */}
          <ellipse cx="52" cy="50" rx="12" ry="10" fill="url(#earDepth)" transform="rotate(-22 52 50)" opacity="0.85" />
        </g>
        {/* Right ear */}
        <g id="right-panda-ear">
          <ellipse cx="150" cy="50" rx="20" ry="18" fill="#211F24" transform="rotate(22 150 50)" />
          {/* Inner ear soft depth */}
          <ellipse cx="148" cy="50" rx="12" ry="10" fill="url(#earDepth)" transform="rotate(22 148 50)" opacity="0.85" />
        </g>

        {/* ── Body Base: Black Shoulder Band & Hind Legs (True Panda Pattern) ── */}
        {/* Black hind feet */}
        <ellipse cx="64" cy="214" rx="22" ry="14" fill="#211F24" transform="rotate(-6 64 214)" />
        <ellipse cx="136" cy="214" rx="22" ry="14" fill="#211F24" transform="rotate(6 136 214)" />
        {/* Foot pads (toe beans!) */}
        <ellipse cx="64" cy="216" rx="9" ry="6" fill="#3D3740" />
        <circle cx="56" cy="208" r="2.8" fill="#3D3740" />
        <circle cx="64" cy="206" r="3" fill="#3D3740" />
        <circle cx="72" cy="208" r="2.8" fill="#3D3740" />

        <ellipse cx="136" cy="216" rx="9" ry="6" fill="#3D3740" />
        <circle cx="128" cy="208" r="2.8" fill="#3D3740" />
        <circle cx="136" cy="206" r="3" fill="#3D3740" />
        <circle cx="144" cy="208" r="2.8" fill="#3D3740" />

        {/* Black body saddle / vest band across upper torso */}
        <path
          d="M 44 140 C 38 175, 48 214, 100 216 C 152 214, 162 175, 156 140 C 148 126, 126 122, 100 122 C 74 122, 52 126, 44 140 Z"
          fill="#211F24"
        />

        {/* Predominantly white baby panda belly */}
        <ellipse
          cx="100"
          cy="176"
          rx="38"
          ry="34"
          fill="url(#pandaBellyShade)"
          stroke="#EAE2E5"
          strokeWidth="1"
        />

        {/* Arms layer (renders dynamically by pose) */}
        {renderArms()}

        {/* ── Head: Large rounded head with soft baby panda jowls & fluffy silhouette ── */}
        <path
          d="M 100 44 C 146 44, 162 68, 160 92 C 158 108, 153 118, 142 128 C 130 138, 116 140, 100 140 C 84 140, 70 138, 58 128 C 47 118, 42 108, 40 92 C 38 68, 54 44, 100 44 Z"
          fill="url(#pandaHeadShade)"
          stroke="#EAE1E4"
          strokeWidth="1.2"
        />

        {/* Subtle fluffy contour tufts on cheeks */}
        <path d="M 40 96 C 36 98, 36 102, 41 104" stroke="#EAE1E4" strokeWidth="1" fill="none" />
        <path d="M 160 96 C 164 98, 164 102, 159 104" stroke="#EAE1E4" strokeWidth="1" fill="none" />

        {/* ── DISTINCT PANDA EYE PATCHES (Diagonal organic ovals angled downward-inward) ── */}
        {/* Left eye patch */}
        <ellipse
          cx="74"
          cy="87"
          rx="17"
          ry="13.5"
          fill="#211F24"
          transform="rotate(-18 74 87)"
        />
        {/* Right eye patch */}
        <ellipse
          cx="126"
          cy="87"
          rx="17"
          ry="13.5"
          fill="#211F24"
          transform="rotate(18 126 87)"
        />

        {/* ── Eyes (Tiny expressive baby eyes with bright white catchlights) ── */}
        {renderEyes()}

        {/* ── Nose: Small, black, rounded triangular panda nose ── */}
        <path
          d="M 94 97 C 94 94.5, 106 94.5, 106 97 C 106 100, 102.5 103.5, 100 103.5 C 97.5 103.5, 94 100, 94 97 Z"
          fill="#211F24"
        />
        {/* Delicate nose highlight */}
        <ellipse cx="98.5" cy="96.5" rx="2" ry="1" fill="#4B454E" />

        {/* ── Mouth directly beneath the nose with natural spacing ── */}
        {renderMouth()}

        {/* ── Soft Pink Blush on Cheeks (subtle enough that B&W markings dominate) ── */}
        <ellipse cx="49" cy="107" rx="11" ry="6.5" fill="rgba(247, 184, 208, 0.45)" />
        <ellipse cx="151" cy="107" rx="11" ry="6.5" fill="rgba(247, 184, 208, 0.45)" />

        {/* ── Tiny Pink Bow (for non-birthday screens, placed adorably near right ear) ── */}
        {!isBirthday && (
          <g id="panda-pink-bow" transform="translate(136, 42) rotate(16)">
            {/* Left ribbon loop */}
            <path
              d="M 0 0 C -12 -9, -15 8, 0 0 Z"
              fill="#F7B8D0"
              stroke="#F48CAF"
              strokeWidth="0.8"
            />
            {/* Right ribbon loop */}
            <path
              d="M 0 0 C 12 -9, 15 8, 0 0 Z"
              fill="#F7B8D0"
              stroke="#F48CAF"
              strokeWidth="0.8"
            />
            {/* Center knot */}
            <circle cx="0" cy="0" r="4" fill="#F48CAF" stroke="#DE6C95" strokeWidth="0.6" />
            <circle cx="-1" cy="-1" r="1.3" fill="#FFFFFF" opacity="0.6" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default BabyPanda;
