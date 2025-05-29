// dietary-preferences
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Droplets } from 'lucide-react';
import { useOnboarding } from '@/context/OnboardingContext';

interface DietaryPreference {
  id: string;
  label: string;
}

interface MedicalCondition {
  id: string;
  label: string;
}

interface DietaryPreferencesData {
  dietaryPreferences: string[];
  waterIntake: number;
  medicalConditions: string[];
  otherCondition?: string;
}

interface DietaryPreferencesPageProps {
  onNext?: (data: DietaryPreferencesData) => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

const DietaryPreferencesPage: React.FC<DietaryPreferencesPageProps> = ({
  onNext,
  onBack,
  showBackButton = true
}) => {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(['no_restrictions']);
  const [waterIntake, setWaterIntake] = useState<number>(4.0);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [otherCondition, setOtherCondition] = useState<string>('');

  const dietaryPreferences: DietaryPreference[] = [
    { id: 'no_restrictions', label: 'No restrictions' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'pescatarian', label: 'Pescatarian' },
    { id: 'gluten_free', label: 'Gluten-free' },
    { id: 'dairy_free', label: 'Dairy-free' },
    { id: 'keto', label: 'Keto' },
    { id: 'paleo', label: 'Paleo' },
    { id: 'low_carb', label: 'Low carb' },
    { id: 'low_fat', label: 'Low fat' },
    { id: 'mediterranean', label: 'Mediterranean' },
    { id: 'halal', label: 'Halal' },
    { id: 'kosher', label: 'Kosher' }
  ];

  const medicalConditions: MedicalCondition[] = [
    { id: 'none', label: 'None' },
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'hypertension', label: 'Hypertension' },
    { id: 'heart_disease', label: 'Heart disease' },
    { id: 'asthma', label: 'Asthma' },
    { id: 'thyroid_issues', label: 'Thyroid issues' },
    { id: 'food_allergies', label: 'Food allergies' },
    { id: 'digestive_disorders', label: 'Digestive disorders' },
    { id: 'arthritis', label: 'Arthritis' },
    { id: 'other', label: 'Other (please specify)' }
  ];

  const handlePreferenceToggle = (prefId: string) => {
    if (prefId === 'no_restrictions') {
      // If "No restrictions" is selected, clear all other selections
      setSelectedPreferences(selectedPreferences.includes('no_restrictions') ? [] : ['no_restrictions']);
    } else {
      // Remove "No restrictions" if another preference is selected
      const filteredPreferences = selectedPreferences.filter(id => id !== 'no_restrictions');
      
      if (filteredPreferences.includes(prefId)) {
        setSelectedPreferences(filteredPreferences.filter(id => id !== prefId));
      } else {
        setSelectedPreferences([...filteredPreferences, prefId]);
      }
    }
  };

  const handleConditionToggle = (conditionId: string) => {
    if (conditionId === 'none') {
      // If "None" is selected, clear all other selections
      setSelectedConditions(selectedConditions.includes('none') ? [] : ['none']);
      setOtherCondition('');
    } else {
      // Remove "None" if another condition is selected
      const filteredConditions = selectedConditions.filter(id => id !== 'none');
      
      if (filteredConditions.includes(conditionId)) {
        const newConditions = filteredConditions.filter(id => id !== conditionId);
        setSelectedConditions(newConditions);
        // Clear other condition text if "other" is unchecked
        if (conditionId === 'other') {
          setOtherCondition('');
        }
      } else {
        setSelectedConditions([...filteredConditions, conditionId]);
      }
    }
  };

  const handleSubmit = () => {
    const data = {
      dietaryPreferences: selectedPreferences,
      waterIntake: waterIntake,
      medicalConditions: selectedConditions,
      otherCondition: selectedConditions.includes('other') ? otherCondition : undefined
    };

    console.log('Dietary preferences data:', data);

    updateOnboardingData('dietaryPreferences', data);

    if (onNext) {
      onNext(data);
    } else {
      router.push('/onboarding/workout-preferences'); // or next step
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
          <div className="bg-blue-500 h-2 rounded-full w-5/7"></div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Dietary & Health Information
          </h1>
          <p className="text-gray-600">
            Tell us about your diet preferences and health conditions.
          </p>
        </div>

        {/* Dietary Preferences */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Dietary Preferences
          </h2>
          <p className="text-gray-600 mb-4">Select all that apply</p>
          
          <div className="flex flex-wrap gap-3">
            {dietaryPreferences.map((preference) => (
              <button
                key={preference.id}
                type="button"
                onClick={() => handlePreferenceToggle(preference.id)}
                className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                  selectedPreferences.includes(preference.id)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {preference.label}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Water Intake */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Daily Water Intake Goal
          </h2>
          
          <div className="flex items-center justify-center mb-4">
            <Droplets className="w-6 h-6 text-blue-500 mr-2" />
            <span className="text-3xl font-bold text-blue-600">
              {waterIntake.toFixed(1)} liters
            </span>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={waterIntake}
              onChange={(e) => setWaterIntake(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>0.5L</span>
              <span>5.0L</span>
            </div>
          </div>
        </div>

        {/* Medical Conditions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Pre-existing Medical Conditions
          </h2>
          <p className="text-gray-600 mb-4">Select all that apply</p>
          
          <div className="space-y-3">
            {medicalConditions.map((condition) => (
              <div key={condition.id}>
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-gray-900">{condition.label}</span>
                  <input
                    type="checkbox"
                    checked={selectedConditions.includes(condition.id)}
                    onChange={() => handleConditionToggle(condition.id)}
                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                  />
                </label>
                
                {/* Other condition text input */}
                {condition.id === 'other' && selectedConditions.includes('other') && (
                  <div className="mt-3 ml-4">
                    <input
                      type="text"
                      placeholder="Please specify your condition"
                      value={otherCondition}
                      onChange={(e) => setOtherCondition(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                    />
                  </div>
                )}
              </div>
            ))}
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

export default DietaryPreferencesPage;