
// types/onboarding.types.ts

export interface UserData {
    // Basic Info
    name: string;
    email: string;
    gender: string;
    age: string | number;
    height: string | number;
    weight: string | number;
    activityLevel: string;
    
    // Primary Health Goal
    primaryHealthGoal: string;
    
    // Weight Goal
    weightGoalType: string;
    targetWeight: string | number;
    weightGoalTimeline: string;
    
    // Sleep Info
    sleepHours: string | number;
    bedtime: string;
    wakeTime: string;
    sleepIssues: string[];
    
    // Dietary Preferences
    dietType: string;
    waterIntake: string;
    medicalConditions: string[];
    
    // Workout Preferences
    preferredWorkouts: string[];
    
    // Exercise Setup
    workoutLocation: string;
    workoutEquipment: string[];
  }