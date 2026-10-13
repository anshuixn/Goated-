import React from 'react';
import './CuteButton.css';

interface CuteButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  scale?: number;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const CuteButton: React.FC<CuteButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  scale = 1,
  disabled = false,
  id,
  className = '',
}) => {
  return (
    <button
      id={id}
      className={`cute-btn cute-btn--${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        transform: `scale(${scale})`,
        /* Keep layout stable: use padding as spacing reference */
      }}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      <span className="cute-btn__label">{children}</span>
    </button>
  );
};

export default CuteButton;
