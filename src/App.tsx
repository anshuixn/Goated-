import React, { useState, useCallback } from 'react';
import QuestionCard from './components/QuestionCard';
import BirthdayReveal from './components/BirthdayReveal';
import PageTransition from './components/PageTransition';
import './App.css';

type Scene = 'q1' | 'q2' | 'revealing' | 'birthday';

const App: React.FC = () => {
  const [scene, setScene] = useState<Scene>('q1');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleQ1Yes = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    // Small pause for panda bounce to finish, then switch to Q2
    setTimeout(() => {
      setScene('q2');
      setIsTransitioning(false);
    }, 700);
  }, [isTransitioning]);

  const handleQ2Yes = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    // Start paper tear reveal
    setScene('revealing');
  }, [isTransitioning]);

  const handleRevealComplete = useCallback(() => {
    setScene('birthday');
    setIsTransitioning(false);
  }, []);

  return (
    <div className="app-root">
      {/* ── Scene rendering ── */}
      {(scene === 'q1') && (
        <div className="scene-wrapper scene-enter" key="q1">
          <QuestionCard questionNumber={1} onYes={handleQ1Yes} />
        </div>
      )}

      {(scene === 'q2') && (
        <div className="scene-wrapper scene-enter" key="q2">
          <QuestionCard questionNumber={2} onYes={handleQ2Yes} />
        </div>
      )}

      {(scene === 'revealing' || scene === 'birthday') && (
        <div className="scene-wrapper" key="birthday">
          <BirthdayReveal />
        </div>
      )}

      {/* ── Paper tear transition overlay ── */}
      <PageTransition
        isRevealing={scene === 'revealing'}
        onRevealComplete={handleRevealComplete}
      />
    </div>
  );
};

export default App;
