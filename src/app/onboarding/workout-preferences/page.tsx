// workout-preferences
"use client"

import { useOnboarding } from '@/context/OnboardingContext';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaRunning, 
  FaDumbbell, 
  FaClock, 
  FaHeart, 
  FaUser, 
  FaBasketballBall, 
  FaWalking, 
  FaMusic 
} from 'react-icons/fa';
import { 
  GiWeightLiftingUp, 
  GiBoxingGlove, 
  GiAbdominalArmor,
  GiBodyBalance
} from 'react-icons/gi';
import { MdDirectionsRun, MdFitnessCenter, MdSelfImprovement } from 'react-icons/md';

interface WorkoutType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface WorkoutPreferencesData {
  workoutTypes: string[];
  frequency: number;
  duration: number;
}

interface WorkoutPreferencesPageProps {
  onNext?: (data: WorkoutPreferencesData) => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

const WorkoutPreferencesPage: React.FC<WorkoutPreferencesPageProps> = ({
  onNext,
  onBack,
  showBackButton = true
}) => {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<number>(3);
  const [duration, setDuration] = useState<number>(30);

  const workoutTypes: WorkoutType[] = [
    {
      id: 'cardio',
      title: 'Cardio',
      description: 'Running, cycling, swimming, etc.',
      icon: <MdDirectionsRun className="w-12 h-12" />
    },
    {
      id: 'strength_training',
      title: 'Strength Training',
      description: 'Weightlifting, resistance training',
      icon: <GiWeightLiftingUp className="w-12 h-12" />
    },
    {
      id: 'hiit',
      title: 'HIIT',
      description: 'High-intensity interval training',
      icon: <GiBoxingGlove className="w-12 h-12" />
    },
    {
      id: 'yoga',
      title: 'Yoga',
      description: 'Flexibility, balance, and mindfulness',
      icon: <MdSelfImprovement className="w-12 h-12" />
    },
    {
      id: 'pilates',
      title: 'Pilates',
      description: 'Core strength and stability',
      icon: <GiAbdominalArmor className="w-12 h-12" />
    },
    {
      id: 'sports',
      title: 'Sports',
      description: 'Basketball, tennis, soccer, etc.',
      icon: <FaBasketballBall className="w-12 h-12" />
    },
    {
      id: 'walking',
      title: 'Walking',
      description: 'Low-impact aerobic exercise',
      icon: <FaWalking className="w-12 h-12" />
    },
    {
      id: 'dancing',
      title: 'Dancing',
      description: 'Fun, rhythmic movement',
      icon: <FaMusic className="w-12 h-12" />
    },
    {
      id: 'crossfit',
      title: 'Crossfit',
      description: 'High-intensity functional training',
      icon: <MdFitnessCenter className="w-12 h-12" />
    }
  ];

  const handleWorkoutToggle = (workoutId: string) => {
    if (selectedWorkouts.includes(workoutId)) {
      setSelectedWorkouts(selectedWorkouts.filter(id => id !== workoutId));
    } else {
      setSelectedWorkouts([...selectedWorkouts, workoutId]);
    }
  };

  const handleSubmit = () => {
    const data = {
      workoutTypes: selectedWorkouts,
      frequency: frequency,
      duration: duration
    };

    console.log('Workout preferences data:', data);

    updateOnboardingData('workoutPreferences', data);

    if (onNext) {
      onNext(data);
    } else {
      router.push('/onboarding/exercise-setup'); // or next step
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        {/* Back Button */}
        {showBackButton && (
          <button 
            onClick={handleBackClick}
            type="button"
            className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
        )}

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div className="bg-blue-500 h-2 rounded-full w-6/7"></div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Workout Preferences
          </h1>
          <p className="text-gray-600">
            Tell us what types of workouts you enjoy.
          </p>
        </div>

        {/* Workout Types */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            What types of workouts do you prefer?
          </h2>
          <p className="text-gray-600 mb-6">Select all that apply</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {workoutTypes.map((workout) => (
              <button
                key={workout.id}
                type="button"
                onClick={() => handleWorkoutToggle(workout.id)}
                className={`p-6 rounded-lg border-2 text-center transition-all min-h-[140px] flex flex-col items-center justify-center ${
                  selectedWorkouts.includes(workout.id)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className={`mb-3 ${
                  selectedWorkouts.includes(workout.id) ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {workout.icon}
                </div>
                <h3 className="font-semibold mb-2">{workout.title}</h3>
                <p className="text-sm text-center">{workout.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Workout Frequency */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            How many days per week do you want to work out?
          </h2>
          
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setFrequency(day)}
                className={`w-12 h-12 rounded-full font-semibold transition-all ${
                  frequency === day
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          
          <div className="text-center mt-3">
            <span className="text-gray-600">days per week</span>
          </div>
        </div>

        {/* Workout Duration */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            How long do you prefer your workouts to be?
          </h2>
          
          <div className="text-center mb-6">
            <span className="text-3xl font-bold text-blue-600">
              {duration} minutes
            </span>
          </div>
          
          <div className="relative max-w-md mx-auto">
            <input
              type="range"
              min="15"
              max="90"
              step="5"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>15 min</span>
              <span>90 min</span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end items-center mt-8">
          <button 
            onClick={handleSubmit}
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default WorkoutPreferencesPage;