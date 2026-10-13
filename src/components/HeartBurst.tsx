import React, { useEffect, useState } from 'react';
import './HeartBurst.css';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

const COLORS = ['#F7B8D0', '#FCE4EC', '#FFD66B', '#FFE9A8'];

const HeartBurst: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts: Heart[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      y: -(Math.random() * 80 + 30),
      size: Math.random() * 12 + 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.3,
    }));
    setHearts(newHearts);
    const t = setTimeout(() => setHearts([]), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="heart-burst" aria-hidden="true">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="heart-burst__heart"
          style={{
            '--tx': `${h.x}px`,
            '--ty': `${h.y}px`,
            width: h.size,
            height: h.size,
            animationDelay: `${h.delay}s`,
          } as React.CSSProperties}
        >
          <svg viewBox="0 0 20 18" width="100%" height="100%">
            <path
              d="M10 16C10 16 1 10.5 1 5.5A4 4 0 0 1 10 4A4 4 0 0 1 19 5.5C19 10.5 10 16 10 16Z"
              fill={h.color}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default HeartBurst;
