import React from 'react';
import './FloatingDecorations.css';

interface FloatingDecorationsProps {
  variant?: 'question' | 'birthday';
}

const FloatingDecorations: React.FC<FloatingDecorationsProps> = ({ variant = 'question' }) => {
  if (variant === 'birthday') {
    return (
      <div className="decorations-container" aria-hidden="true">
        {/* Balloons */}
        <div className="balloon balloon-pink" style={{ left: '4%', top: '8%' }}>
          <svg viewBox="0 0 40 60" width="40" height="60">
            <ellipse cx="20" cy="22" rx="16" ry="18" fill="#F7B8D0" />
            <ellipse cx="14" cy="16" rx="5" ry="4" fill="rgba(255,255,255,0.4)" />
            <path d="M20 40 Q18 46 20 52 Q22 46 20 40Z" fill="#F3C6D6" strokeWidth="0" />
            <path d="M20 52 Q16 56 20 60 Q24 56 20 52Z" fill="#F3C6D6" />
          </svg>
        </div>
        <div className="balloon balloon-yellow" style={{ right: '5%', top: '5%' }}>
          <svg viewBox="0 0 40 60" width="36" height="54">
            <ellipse cx="20" cy="22" rx="16" ry="18" fill="#FFE9A8" />
            <ellipse cx="14" cy="16" rx="5" ry="4" fill="rgba(255,255,255,0.4)" />
            <path d="M20 40 Q18 46 20 52 Q22 46 20 40Z" fill="#FFD66B" />
            <path d="M20 52 Q16 56 20 60 Q24 56 20 52Z" fill="#FFD66B" />
          </svg>
        </div>
        <div className="balloon balloon-pink-2" style={{ right: '14%', top: '18%' }}>
          <svg viewBox="0 0 34 52" width="32" height="48">
            <ellipse cx="17" cy="19" rx="13" ry="15" fill="#FCE4EC" />
            <ellipse cx="12" cy="14" rx="4" ry="3" fill="rgba(255,255,255,0.45)" />
            <path d="M17 34 Q15.5 39 17 44 Q18.5 39 17 34Z" fill="#F3C6D6" />
          </svg>
        </div>

        {/* Stars / sparkles */}
        <div className="sparkle-star" style={{ left: '12%', top: '22%', '--delay': '0s' } as React.CSSProperties}>
          <svg viewBox="0 0 20 20" width="16" height="16">
            <path d="M10 1L11.8 7.8H18.5L12.9 11.8L14.7 18.5L10 14.5L5.3 18.5L7.1 11.8L1.5 7.8H8.2Z" fill="#FFD66B" />
          </svg>
        </div>
        <div className="sparkle-star" style={{ right: '18%', top: '40%', '--delay': '0.4s' } as React.CSSProperties}>
          <svg viewBox="0 0 20 20" width="14" height="14">
            <path d="M10 1L11.8 7.8H18.5L12.9 11.8L14.7 18.5L10 14.5L5.3 18.5L7.1 11.8L1.5 7.8H8.2Z" fill="#FFD66B" />
          </svg>
        </div>
        <div className="sparkle-star" style={{ left: '7%', bottom: '28%', '--delay': '0.8s' } as React.CSSProperties}>
          <svg viewBox="0 0 20 20" width="18" height="18">
            <path d="M10 1L11.8 7.8H18.5L12.9 11.8L14.7 18.5L10 14.5L5.3 18.5L7.1 11.8L1.5 7.8H8.2Z" fill="#F7B8D0" />
          </svg>
        </div>

        {/* Hearts */}
        <div className="float-heart" style={{ left: '20%', bottom: '18%', '--delay': '0.2s' } as React.CSSProperties}>
          <svg viewBox="0 0 20 18" width="16" height="16">
            <path d="M10 16C10 16 1 10.5 1 5.5A4 4 0 0 1 10 4A4 4 0 0 1 19 5.5C19 10.5 10 16 10 16Z" fill="#F7B8D0" />
          </svg>
        </div>
        <div className="float-heart" style={{ right: '22%', bottom: '22%', '--delay': '0.6s' } as React.CSSProperties}>
          <svg viewBox="0 0 20 18" width="14" height="14">
            <path d="M10 16C10 16 1 10.5 1 5.5A4 4 0 0 1 10 4A4 4 0 0 1 19 5.5C19 10.5 10 16 10 16Z" fill="#FFD66B" />
          </svg>
        </div>

        {/* Flowers */}
        <div className="float-flower" style={{ left: '3%', top: '60%', '--delay': '0.3s' } as React.CSSProperties}>
          <svg viewBox="0 0 24 24" width="22" height="22">
            <circle cx="12" cy="8" r="4" fill="#FCE4EC" />
            <circle cx="16.5" cy="11" r="4" fill="#FCE4EC" />
            <circle cx="16" cy="16" r="4" fill="#FCE4EC" />
            <circle cx="12" cy="18" r="4" fill="#FCE4EC" />
            <circle cx="8" cy="16" r="4" fill="#FCE4EC" />
            <circle cx="7.5" cy="11" r="4" fill="#FCE4EC" />
            <circle cx="12" cy="12" r="4" fill="#FFE9A8" />
          </svg>
        </div>
        <div className="float-flower" style={{ right: '4%', bottom: '12%', '--delay': '0.7s' } as React.CSSProperties}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <circle cx="12" cy="8" r="4" fill="#F7B8D0" />
            <circle cx="16.5" cy="11" r="4" fill="#F7B8D0" />
            <circle cx="16" cy="16" r="4" fill="#F7B8D0" />
            <circle cx="12" cy="18" r="4" fill="#F7B8D0" />
            <circle cx="8" cy="16" r="4" fill="#F7B8D0" />
            <circle cx="7.5" cy="11" r="4" fill="#F7B8D0" />
            <circle cx="12" cy="12" r="4" fill="#fff" />
          </svg>
        </div>

        {/* Confetti pieces */}
        <div className="confetti-piece" style={{ left: '30%', top: '6%', '--delay': '0s', '--color': '#F7B8D0' } as React.CSSProperties} />
        <div className="confetti-piece" style={{ left: '65%', top: '10%', '--delay': '0.3s', '--color': '#FFD66B' } as React.CSSProperties} />
        <div className="confetti-piece" style={{ left: '80%', top: '30%', '--delay': '0.6s', '--color': '#FCE4EC' } as React.CSSProperties} />
        <div className="confetti-piece" style={{ left: '15%', top: '50%', '--delay': '0.9s', '--color': '#FFE9A8' } as React.CSSProperties} />
      </div>
    );
  }

  /* ── Question variant ── */
  return (
    <div className="decorations-container" aria-hidden="true">
      {/* Small hearts */}
      <div className="float-heart small" style={{ left: '8%', top: '20%', '--delay': '0s' } as React.CSSProperties}>
        <svg viewBox="0 0 20 18" width="14" height="14">
          <path d="M10 16C10 16 1 10.5 1 5.5A4 4 0 0 1 10 4A4 4 0 0 1 19 5.5C19 10.5 10 16 10 16Z" fill="#F7B8D0" />
        </svg>
      </div>
      <div className="float-heart small" style={{ right: '10%', top: '28%', '--delay': '0.5s' } as React.CSSProperties}>
        <svg viewBox="0 0 20 18" width="12" height="12">
          <path d="M10 16C10 16 1 10.5 1 5.5A4 4 0 0 1 10 4A4 4 0 0 1 19 5.5C19 10.5 10 16 10 16Z" fill="#FCE4EC" />
        </svg>
      </div>
      <div className="float-heart small" style={{ left: '14%', bottom: '22%', '--delay': '0.9s' } as React.CSSProperties}>
        <svg viewBox="0 0 20 18" width="16" height="16">
          <path d="M10 16C10 16 1 10.5 1 5.5A4 4 0 0 1 10 4A4 4 0 0 1 19 5.5C19 10.5 10 16 10 16Z" fill="#F7B8D0" />
        </svg>
      </div>

      {/* Small stars */}
      <div className="sparkle-star" style={{ right: '8%', bottom: '30%', '--delay': '0.3s' } as React.CSSProperties}>
        <svg viewBox="0 0 20 20" width="14" height="14">
          <path d="M10 1L11.8 7.8H18.5L12.9 11.8L14.7 18.5L10 14.5L5.3 18.5L7.1 11.8L1.5 7.8H8.2Z" fill="#FFD66B" />
        </svg>
      </div>
      <div className="sparkle-star" style={{ left: '6%', top: '48%', '--delay': '0.7s' } as React.CSSProperties}>
        <svg viewBox="0 0 20 20" width="12" height="12">
          <path d="M10 1L11.8 7.8H18.5L12.9 11.8L14.7 18.5L10 14.5L5.3 18.5L7.1 11.8L1.5 7.8H8.2Z" fill="#FFE9A8" />
        </svg>
      </div>

      {/* One small flower */}
      <div className="float-flower" style={{ right: '5%', top: '55%', '--delay': '1.1s' } as React.CSSProperties}>
        <svg viewBox="0 0 24 24" width="20" height="20">
          <circle cx="12" cy="8" r="4" fill="#FCE4EC" />
          <circle cx="16.5" cy="11" r="4" fill="#FCE4EC" />
          <circle cx="16" cy="16" r="4" fill="#FCE4EC" />
          <circle cx="12" cy="18" r="4" fill="#FCE4EC" />
          <circle cx="8" cy="16" r="4" fill="#FCE4EC" />
          <circle cx="7.5" cy="11" r="4" fill="#FCE4EC" />
          <circle cx="12" cy="12" r="4" fill="#FFE9A8" />
        </svg>
      </div>
    </div>
  );
};

export default FloatingDecorations;
