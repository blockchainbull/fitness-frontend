// primary-health-goal
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingDown, Dumbbell, Activity, Heart, Brain, Check } from 'lucide-react';
import { useOnboarding } from '@/context/OnboardingContext';

interface HealthGoal {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface PrimaryHealthGoalPageProps {
  onNext?: (goal: string) => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

const PrimaryHealthGoalPage: React.FC<PrimaryHealthGoalPageProps> = ({
  onNext,
  onBack,
  showBackButton = true
}) => {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [selectedGoal, setSelectedGoal] = useState<string>('');

  const healthGoals: HealthGoal[] = [
    {
      id: 'lose_weight',
      title: 'Lose Weight',
      description: 'Reduce body fat and achieve a healthier weight',
      icon: <TrendingDown className="w-6 h-6" />
    },
    {
      id: 'build_muscle',
      title: 'Build Muscle',
      description: 'Increase muscle mass and strength',
      icon: <Dumbbell className="w-6 h-6" />
    },
    {
      id: 'improve_fitness',
      title: 'Improve Fitness',
      description: 'Enhance overall fitness and endurance',
      icon: <Activity className="w-6 h-6" />
    },
    {
      id: 'maintain_health',
      title: 'Maintain Health',
      description: 'Keep current weight and maintain wellness',
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: 'reduce_stress',
      title: 'Reduce Stress',
      description: 'Focus on mental wellbeing and stress reduction',
      icon: <Brain className="w-6 h-6" />
    }
  ];

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  const handleSubmit = () => {
    if (!selectedGoal) {
      return; // Don't proceed if no goal is selected
    }

    console.log('Selected goal:', selectedGoal);

    updateOnboardingData('primaryGoal', selectedGoal);

    // Call onNext if provided (for reusability)
    if (onNext) {
      onNext(selectedGoal);
    } else {
      // Default navigation behavior - navigate to next onboarding step
      router.push('/onboarding/weight-goal'); // or whatever your next step is
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      // Default back behavior
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
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
          <div className="bg-blue-500 h-2 rounded-full w-2/7"></div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            What's your primary health goal?
          </h1>
          <p className="text-gray-600">
            Choose the goal that best describes what you want to achieve.
          </p>
        </div>

        {/* Goal Options */}
        <div className="space-y-4 mb-8">
          {healthGoals.map((goal) => (
            <button
              key={goal.id}
              type="button"
              onClick={() => handleGoalSelect(goal.id)}
              className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                selectedGoal === goal.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-full ${
                    selectedGoal === goal.id 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {goal.icon}
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${
                      selectedGoal === goal.id ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {goal.title}
                    </h3>
                    <p className={`text-sm ${
                      selectedGoal === goal.id ? 'text-blue-700' : 'text-gray-600'
                    }`}>
                      {goal.description}
                    </p>
                  </div>
                </div>
                
                {/* Check mark */}
                {selectedGoal === goal.id && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end items-center mt-8">
          <button 
            onClick={handleSubmit}
            disabled={!selectedGoal}
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrimaryHealthGoalPage;