import React, { useEffect, useState } from 'react';
import { playRevealChime } from '../utils/audioSystem';
import './PageTransition.css';

interface PageTransitionProps {
  isRevealing: boolean;
  onRevealComplete: () => void;
}

const PageTransition: React.FC<PageTransitionProps> = ({ isRevealing, onRevealComplete }) => {
  const [phase, setPhase] = useState<'idle' | 'tear' | 'done'>('idle');

  useEffect(() => {
    if (!isRevealing) return;
    setPhase('tear');
    // Synchronize sparkle & celebratory chime with reveal animation
    playRevealChime();
    const t = setTimeout(() => {
      setPhase('done');
      onRevealComplete();
    }, 1000);
    return () => clearTimeout(t);
  }, [isRevealing, onRevealComplete]);

  if (phase === 'idle') return null;
  if (phase === 'done') return null;

  return (
    <div className="page-transition" aria-hidden="true">
      {/* The tearing paper layer */}
      <div className={`paper-front ${phase === 'tear' ? 'paper-front--tear' : ''}`}>
        {/* Jagged tear edge using SVG clip */}
        <svg
          className="tear-edge"
          viewBox="0 0 100 8"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0 L5 6 L10 1 L15 7 L20 2 L25 6 L30 1 L35 5 L40 0 L45 7 L50 2 L55 6 L60 1 L65 5 L70 0 L75 6 L80 2 L85 5 L90 1 L95 6 L100 0 L100 8 L0 8Z"
            fill="var(--color-cream)"
          />
        </svg>
      </div>
    </div>
  );
};

export default PageTransition;
