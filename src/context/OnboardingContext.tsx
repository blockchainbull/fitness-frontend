'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BasicInfo {
  name: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  activityLevel: string;
  bmi: number;
  bmr: number;
  tdee: number;
}

interface WeightGoal {
  weightGoal: string;
  targetWeight: number;
  timeline: string;
  weightDifference: number;
}

interface SleepInfo {
  sleepHours: number;
  bedtime: string;
  wakeupTime: string;
  sleepIssues: string[];
}

interface DietaryPreferences {
  dietaryPreferences: string[];
  waterIntake: number;
  medicalConditions: string[];
  otherCondition?: string;
}

interface WorkoutPreferences {
  workoutTypes: string[];
  frequency: number;
  duration: number;
}

interface ExerciseSetup {
  workoutLocation: string;
  equipment: string[];
  fitnessLevel: string;
  hasTrainer: boolean;
}

interface OnboardingData {
  basicInfo?: BasicInfo;
  primaryGoal?: string;
  weightGoal?: WeightGoal;
  sleepInfo?: SleepInfo;
  dietaryPreferences?: DietaryPreferences;
  workoutPreferences?: WorkoutPreferences;
  exerciseSetup?: ExerciseSetup;
}

interface OnboardingContextType {
  onboardingData: OnboardingData;
  updateOnboardingData: (step: keyof OnboardingData, data: any) => void;
  getCurrentWeight: () => number | null;
  completeOnboarding: () => Promise<any>;
  clearOnboardingData: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});

  const updateOnboardingData = (step: keyof OnboardingData, data: any) => {
    setOnboardingData(prev => ({
      ...prev,
      [step]: data
    }));
    
    // Optional: Save to localStorage for persistence across browser sessions
    if (typeof window !== 'undefined') {
      const updatedData = { ...onboardingData, [step]: data };
      localStorage.setItem('onboardingData', JSON.stringify(updatedData));
    }
  };

  const getCurrentWeight = () => {
    return onboardingData.basicInfo?.weight || null;
  };

  const completeOnboarding = async () => {
    try {
      // Call your backend API directly instead of Next.js API routes
      const response = await fetch('http://localhost:8000/api/onboarding/complete', {  // Updated URL
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(onboardingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to complete onboarding');
      }
      
      const result = await response.json();
      console.log('Onboarding completed successfully:', result);
      
      // Clear onboarding data after successful completion
      clearOnboardingData();
      
      return result;
      
    } catch (error) {
      console.error('Onboarding error:', error);
      throw error;
    }
  };

  const clearOnboardingData = () => {
    setOnboardingData({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem('onboardingData');
    }
  };

  // Optional: Load data from localStorage on initialization
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('onboardingData');
      if (saved) {
        try {
          setOnboardingData(JSON.parse(saved));
        } catch (error) {
          console.error('Failed to parse saved onboarding data:', error);
        }
      }
    }
  }, []);

  return (
    <OnboardingContext.Provider value={{ 
      onboardingData, 
      updateOnboardingData, 
      getCurrentWeight,
      completeOnboarding,
      clearOnboardingData
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};