// components/onboarding/WeightGoal.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { UserData } from '../../../types/onboarding.types';
import styles from '../../app/styles/onboarding.module.css';

interface WeightGoalProps {
  userData: UserData;
  onNext: (data: Partial<UserData>) => void;
}

interface WeightTimeframe {
  value: string;
  label: string;
}

const WeightGoal: React.FC<WeightGoalProps> = ({ userData, onNext }) => {
  const currentWeight = userData.weight ? Number(userData.weight) : 0;
  const [goalType, setGoalType] = useState<string>(userData.weightGoalType || 'lose');
  const [targetWeight, setTargetWeight] = useState<string>(
    userData.targetWeight ? userData.targetWeight.toString() : ''
  );
  const [weightGoalTimeline, setWeightGoalTimeline] = useState<string>(
    userData.weightGoalTimeline || ''
  );
  
  const [weightDifference, setWeightDifference] = useState<string | null>(null);
  
  const [errors, setErrors] = useState<{
    targetWeight?: string;
    weightGoalTimeline?: string;
  }>({});
  
  const weightTimeframes: WeightTimeframe[] = [
    { value: 'slow', label: 'Gradual (4-6 months)' },
    { value: 'moderate', label: 'Moderate (2-4 months)' },
    { value: 'fast', label: 'Ambitious (1-2 months)' }
  ];
  
  // Calculate weight difference when target weight changes
  useEffect(() => {
    if (currentWeight && targetWeight) {
      const target = parseFloat(targetWeight);
      const difference = target - currentWeight;
      
      if (difference > 0) {
        setWeightDifference(`Gain ${Math.abs(difference).toFixed(1)} kg`);
      } else if (difference < 0) {
        setWeightDifference(`Lose ${Math.abs(difference).toFixed(1)} kg`);
      } else {
        setWeightDifference('Maintain current weight');
      }
    } else {
      setWeightDifference(null);
    }
  }, [currentWeight, targetWeight]);
  
  // Auto-set target weight when selecting "maintain"
  useEffect(() => {
    if (goalType === 'maintain' && currentWeight) {
      setTargetWeight(currentWeight.toString());
    }
  }, [goalType, currentWeight]);
  
  const validateForm = (): boolean => {
    const newErrors: {
      targetWeight?: string;
      weightGoalTimeline?: string;
    } = {};
    
    if (!targetWeight) {
      newErrors.targetWeight = 'Target weight is required';
    } else {
      const weight = Number(targetWeight);
      if (isNaN(weight) || weight < 30 || weight > 300) {
        newErrors.targetWeight = 'Target weight must be between 30kg and 300kg';
      }
    }
    
    if (goalType !== 'maintain' && !weightGoalTimeline) {
      newErrors.weightGoalTimeline = 'Please select a timeframe for your goal';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleGoalTypeChange = (type: string) => {
    setGoalType(type);
  };
  
  const handleTargetWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetWeight(e.target.value);
  };
  
  const handleTimeframeSelect = (timeframe: string) => {
    setWeightGoalTimeline(timeframe);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext({
        weightGoalType: goalType,
        targetWeight,
        weightGoalTimeline: goalType === 'maintain' ? 'maintain' : weightGoalTimeline
      });
    }
  };
  
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>What's your weight goal?</h1>
      <p className={styles.formSubtitle}>
        Setting a specific weight goal helps us create a more effective plan
      </p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {currentWeight > 0 && (
          <div className={styles.currentWeightBox}>
            <div>
              <div className={styles.currentWeightLabel}>Current Weight</div>
              <div className={styles.currentWeightValue}>{currentWeight} kg</div>
            </div>
          </div>
        )}
        
        <div className={styles.formGroup}>
          <label className={styles.label}>What's your weight goal?</label>
          
          <div className={styles.goalsGrid}>
            <div 
              className={`${styles.goalCard} ${goalType === 'lose' ? styles.goalCardSelected : ''}`}
              onClick={() => handleGoalTypeChange('lose')}
            >
              <div className={styles.goalIcon}>⬇️</div>
              <div className={styles.goalContent}>
                <h3 className={styles.goalTitle}>Lose Weight</h3>
                <p className={styles.goalDescription}>Burn fat and reduce overall weight</p>
              </div>
            </div>
            
            <div 
              className={`${styles.goalCard} ${goalType === 'maintain' ? styles.goalCardSelected : ''}`}
              onClick={() => handleGoalTypeChange('maintain')}
            >
              <div className={styles.goalIcon}>⚖️</div>
              <div className={styles.goalContent}>
                <h3 className={styles.goalTitle}>Maintain Weight</h3>
                <p className={styles.goalDescription}>Stay at your current weight</p>
              </div>
            </div>
            
            <div 
              className={`${styles.goalCard} ${goalType === 'gain' ? styles.goalCardSelected : ''}`}
              onClick={() => handleGoalTypeChange('gain')}
            >
              <div className={styles.goalIcon}>⬆️</div>
              <div className={styles.goalContent}>
                <h3 className={styles.goalTitle}>Gain Weight</h3>
                <p className={styles.goalDescription}>Add healthy weight to your frame</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <div className={styles.inputWithLabel}>
            <label htmlFor="targetWeight" className={styles.label}>Target Weight (kg)</label>
            <input
              type="number"
              id="targetWeight"
              name="targetWeight"
              value={targetWeight}
              onChange={handleTargetWeightChange}
              className={styles.input}
              placeholder="Enter your target weight"
              min="30"
              max="300"
              step="0.1"
              disabled={goalType === 'maintain'}
            />
          </div>
          {errors.targetWeight && <span className={styles.errorText}>{errors.targetWeight}</span>}
        </div>
        
        {weightDifference && (
          <div className={styles.weightDifference}>
            {weightDifference}
          </div>
        )}
        
        {goalType !== 'maintain' && (
          <div className={styles.formGroup}>
            <label className={styles.label}>How quickly do you want to reach your goal?</label>
            <div className={styles.timelineOptions}>
              {weightTimeframes.map((timeframe) => (
                <div
                  key={timeframe.value}
                  className={`${styles.timelineOption} ${
                    weightGoalTimeline === timeframe.value ? styles.timelineOptionSelected : ''
                  }`}
                  onClick={() => handleTimeframeSelect(timeframe.value)}
                >
                  <div className={styles.timelineLabel}>{timeframe.label}</div>
                </div>
              ))}
            </div>
            {errors.weightGoalTimeline && (
              <span className={styles.errorText}>{errors.weightGoalTimeline}</span>
            )}
          </div>
        )}
        
        <button type="submit" className={styles.continueButton}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default WeightGoal;