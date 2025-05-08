// components/onboarding/OnboardingLayout.tsx
"use client"

import React, { ReactNode } from 'react';
import styles from '../../app/styles/onboarding.module.css';

interface OnboardingLayoutProps {
  children: ReactNode;
  step: number;
  totalSteps: number;
  onBack: () => void;
  showBackButton?: boolean;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ 
  children, 
  step, 
  totalSteps, 
  onBack, 
  showBackButton = true 
}) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {showBackButton && (
          <button 
            className={styles.backButton} 
            onClick={onBack}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}
        
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className={styles.stepInfo}>
            Step {step} of {totalSteps}
          </div>
        </div>
        
        <div className={styles.contentContainer}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default OnboardingLayout;