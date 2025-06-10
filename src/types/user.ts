// src/types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  
  // Physical characteristics
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
  activityLevel?: string;
  
  // Health metrics
  bmi?: number;
  bmr?: number;
  tdee?: number;
  
  // Goals
  primaryGoal?: string;
  fitnessGoal?: string;
  weightGoal?: string;
  targetWeight?: number;
  goalTimeline?: string;
  
  // Sleep
  sleepHours?: number;
  bedtime?: string;
  wakeupTime?: string;
  sleepIssues?: string[];
  
  // Nutrition
  dietaryPreferences?: string[];
  waterIntake?: number;
  medicalConditions?: string[];
  otherMedicalCondition?: string;
  
  // Exercise
  preferredWorkouts?: string[];
  workoutFrequency?: number;
  workoutDuration?: number;
  workoutLocation?: string;
  availableEquipment?: string[];
  fitnessLevel?: string;
  hasTrainer?: boolean;
  
  // Legacy/compatibility fields
  physicalStats?: {
    height: number;
    weight: number;
    age: number;
    gender: string;
    activityLevel: string;
  };
  healthMetrics?: {
    bmr: number;
    tdee: number;
    bmi: number;
  };
  preferences?: {
    notifications: {
      email: boolean;
      app: boolean;
      marketing: boolean;
    };
    privacy: {
      shareProgress: boolean;
      publicProfile: boolean;
    };
    theme: string;
    measurementUnit: string;
  };
}