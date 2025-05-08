// pages/onboarding/page.tsx
"use client" 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BasicInfo from '@/components/onboarding/BasicInfo';
import PrimaryHealthGoal from '@/components/onboarding/PrimaryHealthGoal';
import WeightGoal from '@/components/onboarding/WeightGoal';
import SleepInfo from '@/components/onboarding/SleepInfo';
import DietaryPreferences from '@/components/onboarding/DietaryPreferences';
import WorkoutPreferences from '@/components/onboarding/WorkoutPreferences';
import ExerciseSetup from '@/components/onboarding/ExerciseSetup';
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import { UserData } from '../../../types/onboarding.types';

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [userData, setUserData] = useState<UserData>({
    // Basic Info
    name: '',
    email: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
    activityLevel: '',
    
    // Primary Health Goal
    primaryHealthGoal: '',
    
    // Weight Goal
    weightGoalType: '',
    targetWeight: '',
    weightGoalTimeline: '',
    
    // Sleep Info
    sleepHours: '',
    sleepQuality: '',
    
    // Dietary Preferences
    dietType: '',
    waterIntake: '',
    medicalConditions: [],
    
    // Workout Preferences
    preferredWorkouts: [],
    
    // Exercise Setup
    workoutLocation: '',
    workoutEquipment: []
  });
  
  const totalSteps = 7;
  
  const handleNext = (data: Partial<UserData>): void => {
    // Update user data with new form data
    const updatedUserData = {
      ...userData,
      ...data
    };
    
    setUserData(updatedUserData);
    
    // Save to API or local storage
    localStorage.setItem('onboarding_data', JSON.stringify(updatedUserData));
    
    // If last step, complete onboarding
    if (step === totalSteps - 1) {
      handleComplete();
    } else {
      // Move to next step
      setStep(step + 1);
    }
  };
  
  const handleBack = (): void => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const handleComplete = async (): Promise<void> => {
    try {
      // Submit final data to API
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        // Navigate to dashboard
        router.push('/dashboard');
      } else {
        console.error('Failed to complete onboarding');
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };
  
  // Load saved data on initial mount
  useEffect(() => {
    const savedData = localStorage.getItem('onboarding_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as UserData;
        setUserData(parsedData);
        
        // Optional: Check if we should resume at a specific step
        const savedStep = localStorage.getItem('onboarding_step');
        if (savedStep) {
          setStep(parseInt(savedStep, 10));
        }
      } catch (error) {
        console.error('Error parsing saved onboarding data', error);
      }
    }
  }, []);
  
  // Save current step to local storage when it changes
  useEffect(() => {
    localStorage.setItem('onboarding_step', step.toString());
  }, [step]);
  
  const renderStep = (): JSX.Element | null => {
    switch (step) {
      case 0:
        return <BasicInfo userData={userData} onNext={handleNext} />;
      case 1:
        return <PrimaryHealthGoal userData={userData} onNext={handleNext} />;
      case 2:
        return <WeightGoal userData={userData} onNext={handleNext} />;
      case 3:
        return <SleepInfo userData={userData} onNext={handleNext} />;
      case 4:
        return <DietaryPreferences userData={userData} onNext={handleNext} />;
      case 5:
        return <WorkoutPreferences userData={userData} onNext={handleNext} />;
      case 6:
        return <ExerciseSetup userData={userData} onNext={handleNext} />;
      default:
        return null;
    }
  };
  
  return (
    <OnboardingLayout 
      step={step} 
      totalSteps={totalSteps} 
      onBack={handleBack}
      showBackButton={step > 0}
    >
      {renderStep()}
    </OnboardingLayout>
  );
}







