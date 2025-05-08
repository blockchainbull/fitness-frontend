// components/onboarding/PrimaryHealthGoal.tsx
"use client"

import React, { useState } from 'react';
import { UserData } from '../../../types/onboarding.types';
import styles from '../../app/styles/onboarding.module.css';

interface HealthGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface PrimaryHealthGoalProps {
  userData: UserData;
  onNext: (data: Partial<UserData>) => void;
}

const PrimaryHealthGoal: React.FC<PrimaryHealthGoalProps> = ({ userData, onNext }) => {
  const [selectedGoal, setSelectedGoal] = useState<string>(userData.primaryHealthGoal || '');
  const [error, setError] = useState<string>('');
  
  const healthGoals: HealthGoal[] = [
    {
      id: 'lose_weight',
      title: 'Lose Weight',
      description: 'Burn fat and reduce body weight',
      icon: '🔻'
    },
    {
      id: 'build_muscle',
      title: 'Build Muscle',
      description: 'Increase strength and muscle mass',
      icon: '💪'
    },
    {
      id: 'improve_fitness',
      title: 'Improve Fitness',
      description: 'Enhance overall fitness and endurance',
      icon: '🏃'
    },
    {
      id: 'manage_health',
      title: 'Manage Health',
      description: 'Address specific health conditions',
      icon: '❤️'
    },
    {
      id: 'increase_energy',
      title: 'Increase Energy',
      description: 'Boost daily energy levels',
      icon: '⚡'
    },
    {
      id: 'reduce_stress',
      title: 'Reduce Stress',
      description: 'Improve mental wellbeing',
      icon: '🧘'
    }
  ];
  
  const handleGoalSelect = (goalId: string): void => {
    setSelectedGoal(goalId);
    setError('');
  };
  
  const handleContinue = (): void => {
    if (!selectedGoal) {
      setError('Please select a primary health goal');
      return;
    }
    
    onNext({ primaryHealthGoal: selectedGoal });
  };
  
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>What is your primary health goal?</h1>
      <p className={styles.formSubtitle}>
        Select the main goal you want to achieve with your fitness journey
      </p>
      
      <div className={styles.goalsGrid}>
        {healthGoals.map((goal) => (
          <div
            key={goal.id}
            className={`${styles.goalCard} ${selectedGoal === goal.id ? styles.goalCardSelected : ''}`}
            onClick={() => handleGoalSelect(goal.id)}
          >
            <div className={styles.goalIcon}>{goal.icon}</div>
            <div className={styles.goalContent}>
              <h3 className={styles.goalTitle}>{goal.title}</h3>
              <p className={styles.goalDescription}>{goal.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {error && <p className={styles.errorText}>{error}</p>}
      
      <button 
        onClick={handleContinue} 
        className={styles.continueButton}
        type="button"
      >
        Continue
      </button>
    </div>
  );
};

export default PrimaryHealthGoal;