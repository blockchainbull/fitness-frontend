// exercise-setup
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaDumbbell, FaHome, FaTree, FaBriefcase, FaStore } from 'react-icons/fa';
import { MdFitnessCenter } from 'react-icons/md';
import { Check } from 'lucide-react';
import { useOnboarding } from '@/context/OnboardingContext';

interface WorkoutLocation {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ExerciseSetupData {
  workoutLocation: string;
  equipment: string[];
  fitnessLevel: string;
  hasTrainer: boolean;
}

interface ExerciseSetupPageProps {
  onNext?: (data: ExerciseSetupData) => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

interface CompletionPopupProps {
  isOpen: boolean;
  onComplete: () => void;
}

const CompletionPopup: React.FC<CompletionPopupProps> = ({ isOpen, onComplete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-mx-4 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-white" />
        </div>
        
        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          You're all set!
        </h2>
        <p className="text-gray-600 mb-8">
          Thank you for providing your information. Your personalized health journey is ready!
        </p>
        
        {/* Get Started Button */}
        <button
          onClick={onComplete}
          className="w-full px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

const ExerciseSetupPage: React.FC<ExerciseSetupPageProps> = ({
  onNext,
  onBack,
  showBackButton = true
}) => {
  const router = useRouter();
  const { updateOnboardingData, completeOnboarding } = useOnboarding();
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [fitnessLevel, setFitnessLevel] = useState<string>('');
  const [hasTrainer, setHasTrainer] = useState<boolean>(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState<boolean>(false);

  const workoutLocations: WorkoutLocation[] = [
    {
      id: 'gym',
      title: 'Gym',
      description: 'Commercial gym or fitness center',
      icon: <FaDumbbell className="w-12 h-12" />
    },
    {
      id: 'home',
      title: 'Home',
      description: 'Working out in your living space',
      icon: <FaHome className="w-12 h-12" />
    },
    {
      id: 'outdoors',
      title: 'Outdoors',
      description: 'Parks, trails, or outdoor spaces',
      icon: <FaTree className="w-12 h-12" />
    },
    {
      id: 'office',
      title: 'Office',
      description: 'Workplace gym or during breaks',
      icon: <FaBriefcase className="w-12 h-12" />
    },
    {
      id: 'studio',
      title: 'Studio',
      description: 'Specialized fitness studios',
      icon: <FaStore className="w-12 h-12" />
    }
  ];

  const equipmentOptions = [
    'Dumbbells',
    'Barbell & Plates',
    'Resistance bands',
    'Kettlebells',
    'Cardio machines',
    'Yoga mat',
    'Pull-up bar',
    'Bench',
    'TRX/Suspension trainer',
    'Medicine ball',
    'None'
  ];

  const fitnessLevels = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ];

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
  };

  const handleEquipmentToggle = (equipment: string) => {
    if (equipment === 'None') {
      // If "None" is selected, clear all other selections
      setSelectedEquipment(selectedEquipment.includes('None') ? [] : ['None']);
    } else {
      // Remove "None" if another equipment is selected
      const filteredEquipment = selectedEquipment.filter(item => item !== 'None');
      
      if (filteredEquipment.includes(equipment)) {
        setSelectedEquipment(filteredEquipment.filter(item => item !== equipment));
      } else {
        setSelectedEquipment([...filteredEquipment, equipment]);
      }
    }
  };

  const handleSubmit = async () => {
    const data = {
      workoutLocation: selectedLocation,
      equipment: selectedEquipment,
      fitnessLevel: fitnessLevel,
      hasTrainer: hasTrainer
    };

    console.log('Exercise setup data BEFORE saving to context:', data);

    updateOnboardingData('exerciseSetup', data);
    
    console.log('Exercise setup data saved to context');

    // Wait a moment to ensure context is updated
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      console.log('About to complete onboarding...');
      const result = await completeOnboarding();
      console.log('Onboarding completed successfully:', result);
      
      // Show completion popup after successful save
      setShowCompletionPopup(true);
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      // Handle error - maybe show error message to user
    }

    // Call onNext if provided
    if (onNext) {
      onNext(data);
    }
  };

  const handleCompletionAndRedirect = () => {
    setShowCompletionPopup(false);
    
    // Redirect to dashboard
    router.push('/dashboard'); // or wherever your dashboard is located
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const isFormValid = selectedLocation && selectedEquipment.length > 0 && fitnessLevel;

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
          <div className="bg-blue-500 h-2 rounded-full w-full"></div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Your Current Exercise Setup
          </h1>
          <p className="text-gray-600">
            Tell us about where and how you currently exercise.
          </p>
        </div>

        {/* Workout Location */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Where do you usually workout?
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {workoutLocations.map((location) => (
              <button
                key={location.id}
                type="button"
                onClick={() => handleLocationSelect(location.id)}
                className={`p-6 rounded-lg border-2 text-center transition-all min-h-[140px] flex flex-col items-center justify-center ${
                  selectedLocation === location.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className={`mb-3 ${
                  selectedLocation === location.id ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {location.icon}
                </div>
                <h3 className="font-semibold mb-2">{location.title}</h3>
                <p className="text-sm text-center">{location.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            What equipment do you have access to?
          </h2>
          <p className="text-gray-600 mb-4">Select all that apply</p>
          
          <div className="flex flex-wrap gap-3">
            {equipmentOptions.map((equipment) => (
              <button
                key={equipment}
                type="button"
                onClick={() => handleEquipmentToggle(equipment)}
                className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                  selectedEquipment.includes(equipment)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {equipment}
              </button>
            ))}
          </div>
        </div>

        {/* Fitness Level */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            What's your current fitness level?
          </h2>
          
          <div className="flex space-x-4">
            {fitnessLevels.map((level) => (
              <button
                key={level.id}
                type="button"
                onClick={() => setFitnessLevel(level.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex-1 ${
                  fitnessLevel === level.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Personal Trainer */}
        <div className="mb-8">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900">
              Do you work with a personal trainer?
            </h2>
            
            <button
              type="button"
              onClick={() => setHasTrainer(!hasTrainer)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                hasTrainer ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  hasTrainer ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end items-center mt-8">
          <button 
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Finish
          </button>
        </div>
      </div>

      {/* Completion Popup */}
      <CompletionPopup 
        isOpen={showCompletionPopup}
        onComplete={handleCompletionAndRedirect}
      />
    </div>
  );
};

export default ExerciseSetupPage;