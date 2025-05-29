// weight-goal
"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingDown, ArrowRight, TrendingUp, Check, Weight } from 'lucide-react';
import { useOnboarding } from '@/context/OnboardingContext';

interface WeightGoalOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface TimelineOption {
  id: string;
  title: string;
  subtitle: string;
}

interface WeightGoalPageProps {
  currentWeight?: number; // Get from previous step
  onNext?: (data: WeightGoalData) => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

interface WeightGoalData {
  weightGoal: string;
  targetWeight: number;
  timeline: string;
  weightDifference: number;
}

const WeightGoalPage: React.FC<WeightGoalPageProps> = ({
  currentWeight,
  onNext,
  onBack,
  showBackButton = true
}) => {
  const router = useRouter();
  const { updateOnboardingData, getCurrentWeight } = useOnboarding(); 
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [targetWeight, setTargetWeight] = useState<string>('');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('');
  const [weightDifference, setWeightDifference] = useState<number>(0);
  const [weightError, setWeightError] = useState<string>('');
  const actualCurrentWeight = getCurrentWeight() || currentWeight || 70;

  const weightGoalOptions: WeightGoalOption[] = [
    {
      id: 'lose_weight',
      title: 'Lose Weight',
      description: 'Burn fat and reduce overall weight',
      icon: <TrendingDown className="w-6 h-6" />
    },
    {
      id: 'maintain_weight',
      title: 'Maintain Weight',
      description: 'Stay at your current weight',
      icon: <ArrowRight className="w-6 h-6" />
    },
    {
      id: 'gain_weight',
      title: 'Gain Weight',
      description: 'Add healthy weight to your frame',
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const timelineOptions: TimelineOption[] = [
    {
      id: 'gradual',
      title: 'Gradual',
      subtitle: '(4-6 months)'
    },
    {
      id: 'moderate',
      title: 'Moderate',
      subtitle: '(2-4 months)'
    },
    {
      id: 'ambitious',
      title: 'Ambitious',
      subtitle: '(1-2 months)'
    }
  ];

  // Calculate weight difference and validate when target weight changes
  useEffect(() => {
    const target = parseFloat(targetWeight);
    if (!isNaN(target)) {
      const difference = target - actualCurrentWeight;
      setWeightDifference(difference);
      
      // Validate weight based on selected goal
      validateTargetWeight(target);
    } else {
      setWeightDifference(0);
      setWeightError('');
    }
  }, [targetWeight, actualCurrentWeight, selectedGoal]);

  const validateTargetWeight = (target: number) => {
    setWeightError('');
    
    if (selectedGoal === 'lose_weight' && target >= actualCurrentWeight) {
      setWeightError('Target weight must be less than your current weight for weight loss');
    } else if (selectedGoal === 'gain_weight' && target <= actualCurrentWeight) {
      setWeightError('Target weight must be greater than your current weight for weight gain');
    } else if (target <= 0) {
      setWeightError('Target weight must be greater than 0');
    } else if (target < 30) {
      setWeightError('Target weight seems too low. Please enter a realistic weight');
    } else if (target > 300) {
      setWeightError('Target weight seems too high. Please enter a realistic weight');
    }
  };

  // Auto-set target weight when maintain weight is selected
  useEffect(() => {
    if (selectedGoal === 'maintain_weight') {
      setTargetWeight(actualCurrentWeight.toString());
    }
  }, [selectedGoal, actualCurrentWeight]);

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    setWeightError(''); // Clear any existing errors
    
    // Reset target weight when switching goals (except maintain)
    if (goalId !== 'maintain_weight') {
      setTargetWeight('');
    }
    
    // Re-validate if there's already a target weight
    if (targetWeight && goalId !== 'maintain_weight') {
      const target = parseFloat(targetWeight);
      if (!isNaN(target)) {
        validateTargetWeight(target);
      }
    }
  };

  const handleTargetWeightChange = (value: string) => {
    // Only allow positive numbers and decimal points
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setTargetWeight(value);
      
      // Clear error when user starts typing
      if (weightError) {
        setWeightError('');
      }
    }
  };

  const getWeightDifferenceDisplay = () => {
    if (weightDifference === 0) return null;
    
    const absValue = Math.abs(weightDifference);
    const isLoss = weightDifference < 0;
    const isGain = weightDifference > 0;
    
    let bgColor = 'bg-blue-500';
    let text = '';
    
    if (isLoss) {
      bgColor = 'bg-blue-500';
      text = `Lose ${absValue.toFixed(1)} kg`;
    } else if (isGain) {
      bgColor = 'bg-green-500';
      text = `Gain ${absValue.toFixed(1)} kg`;
    }
    
    return (
      <div className={`w-full p-4 ${bgColor} text-white text-center font-semibold rounded-lg mt-4`}>
        {text}
      </div>
    );
  };

  const handleSubmit = () => {
    // Validation
    if (!selectedGoal || !targetWeight || !selectedTimeline) {
      return;
    }

    const target = parseFloat(targetWeight);
    if (isNaN(target) || target <= 0) {
      return;
    }
    
    // Check if there are any validation errors
    if (weightError) {
      return;
    }

    const data = {
      weightGoal: selectedGoal,
      targetWeight: target,
      timeline: selectedTimeline,
      weightDifference: weightDifference
    };

    console.log('Weight goal data:', data);

    updateOnboardingData('weightGoal', data);

    // Call onNext if provided (for reusability)
    if (onNext) {
      onNext(data);
    } else {
      // Default navigation behavior
      router.push('/onboarding/sleep-info'); // or whatever your next step is
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const isFormValid = selectedGoal && targetWeight && selectedTimeline && !isNaN(parseFloat(targetWeight)) && !weightError;

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
          <div className="bg-blue-500 h-2 rounded-full w-3/7"></div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Set your weight goal
          </h1>
          <p className="text-gray-600">
            Your current weight is the starting point for your fitness journey.
          </p>
        </div>

        {/* Current Weight Display */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 p-3 rounded-full">
              <Weight className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Current Weight</p>
              <p className="text-2xl font-bold text-gray-900">{actualCurrentWeight} kg</p>
            </div>
          </div>
        </div>

        {/* Weight Goal Options */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            What's your weight goal?
          </h2>
          <div className="space-y-3">
            {weightGoalOptions.map((goal) => (
              <button
                key={goal.id}
                type="button"
                onClick={() => handleGoalSelect(goal.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedGoal === goal.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      selectedGoal === goal.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      {goal.icon}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
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
                  {selectedGoal === goal.id && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Target Weight Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Target Weight (kg)
          </label>
          <div className="relative">
            <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              placeholder={actualCurrentWeight.toString()}
              value={targetWeight}
              onChange={(e) => handleTargetWeightChange(e.target.value)}
              disabled={selectedGoal === 'maintain_weight'}
              className={`w-full pl-10 pr-12 py-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black text-lg disabled:bg-gray-100 ${
                weightError ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              min="1"
              step="0.1"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
              kg
            </span>
          </div>
          
          {/* Error Message */}
          {weightError && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{weightError}</p>
            </div>
          )}
          
          {getWeightDifferenceDisplay()}
        </div>

        {/* Timeline Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            How quickly do you want to reach your goal?
          </h2>
          <div className="space-y-3">
            {timelineOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedTimeline(option.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedTimeline === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`font-semibold ${
                      selectedTimeline === option.id ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {option.title}
                    </span>
                    <span className={`ml-2 text-sm ${
                      selectedTimeline === option.id ? 'text-blue-700' : 'text-gray-600'
                    }`}>
                      {option.subtitle}
                    </span>
                  </div>
                  {selectedTimeline === option.id && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end items-center mt-8">
          <button 
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeightGoalPage;