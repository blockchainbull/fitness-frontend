// components/onboarding/WorkoutPreferences.tsx
"use client"

import React, { useState } from 'react';
import { UserData } from '../../../types/onboarding.types';
import styles from '../../app/styles/onboarding.module.css';

interface WorkoutPreferencesProps {
  userData: UserData;
  onNext: (data: Partial<UserData>) => void;
}

interface WorkoutType {
  id: string;
  label: string;
  icon: string;
}

const WorkoutPreferences: React.FC<WorkoutPreferencesProps> = ({ userData, onNext }) => {
  const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>(userData.preferredWorkouts || []);
  
  const workoutTypes: WorkoutType[] = [
    { id: 'cardio', label: 'Cardio', icon: '🏃' },
    { id: 'strength', label: 'Strength Training', icon: '💪' },
    { id: 'hiit', label: 'HIIT', icon: '⏱️' },
    { id: 'yoga', label: 'Yoga', icon: '🧘' },
    { id: 'pilates', label: 'Pilates', icon: '🤸' },
    { id: 'cycling', label: 'Cycling', icon: '🚴' },
    { id: 'swimming', label: 'Swimming', icon: '🏊' },
    { id: 'running', label: 'Running', icon: '🏃' },
    { id: 'walking', label: 'Walking', icon: '🚶' },
    { id: 'dance', label: 'Dance', icon: '💃' },
    { id: 'sports', label: 'Sports', icon: '⚽' },
    { id: 'flexibility', label: 'Flexibility', icon: '🤸' },
  ];
  
  const handleWorkoutToggle = (workoutId: string) => {
    if (selectedWorkouts.includes(workoutId)) {
      setSelectedWorkouts(selectedWorkouts.filter(id => id !== workoutId));
    } else {
      setSelectedWorkouts([...selectedWorkouts, workoutId]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onNext({
      preferredWorkouts: selectedWorkouts,
    });
  };
  
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>What workouts do you prefer?</h1>
      <p className={styles.formSubtitle}>
        Select the types of workouts you enjoy or would like to try
      </p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.workoutList}>
          {workoutTypes.map((workout) => (
            <div
              key={workout.id}
              className={`${styles.workoutItem} ${selectedWorkouts.includes(workout.id) ? styles.workoutItemSelected : ''}`}
              onClick={() => handleWorkoutToggle(workout.id)}
            >
              <span className={styles.workoutIcon}>{workout.icon}</span>
              <span className={styles.workoutLabel}>{workout.label}</span>
            </div>
          ))}
        </div>
        
        <button type="submit" className={styles.continueButton}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default WorkoutPreferences;