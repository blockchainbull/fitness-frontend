// src/app/onboarding/period-cycle/page.tsx
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Check } from 'lucide-react';
import { useOnboarding } from '@/context/OnboardingContext';

interface PeriodCyclePageProps {
  onNext?: (data: PeriodCycleData) => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

interface PeriodCycleData {
  hasPeriods: boolean;
  lastPeriodDate?: string;
  cycleLength?: number;
  cycleLengthRegular: boolean;
  pregnancyStatus?: string;
  trackingPreference: string;
}

const PeriodCyclePage: React.FC<PeriodCyclePageProps> = ({
  onNext,
  onBack,
  showBackButton = true
}) => {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [hasPeriods, setHasPeriods] = useState<boolean | null>(null);
  const [lastPeriodDate, setLastPeriodDate] = useState<string>('');
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [cycleLengthRegular, setCycleLengthRegular] = useState<boolean>(true);
  const [pregnancyStatus, setPregnancyStatus] = useState<string>('');
  const [trackingPreference, setTrackingPreference] = useState<string>('');

  const pregnancyOptions = [
    { id: 'not_pregnant', label: 'Not pregnant' },
    { id: 'pregnant', label: 'Currently pregnant' },
    { id: 'breastfeeding', label: 'Breastfeeding' },
    { id: 'trying_to_conceive', label: 'Trying to conceive' },
    { id: 'prefer_not_to_say', label: 'Prefer not to say' }
  ];

  const trackingOptions = [
    { id: 'track_periods', label: 'Track my periods in the app' },
    { id: 'general_wellness', label: 'Just general wellness support' },
    { id: 'no_tracking', label: 'No period-related features' }
  ];

  const handleSubmit = () => {
    if (hasPeriods === null || !trackingPreference) {
      return; // Don't proceed if required fields are not selected
    }

    const data: PeriodCycleData = {
      hasPeriods: hasPeriods,
      lastPeriodDate: hasPeriods ? lastPeriodDate : undefined,
      cycleLength: hasPeriods ? cycleLength : undefined,
      cycleLengthRegular: hasPeriods ? cycleLengthRegular : false,
      pregnancyStatus: hasPeriods ? pregnancyStatus : undefined,
      trackingPreference
    };

    // Enhanced debugging for backend compatibility
    console.log('🌸 Period cycle data being saved to context:', data);
    console.log('📝 Data types check:', {
      hasPeriods: typeof data.hasPeriods,
      lastPeriodDate: typeof data.lastPeriodDate,
      cycleLength: typeof data.cycleLength,
      cycleLengthRegular: typeof data.cycleLengthRegular,
      pregnancyStatus: typeof data.pregnancyStatus,
      trackingPreference: typeof data.trackingPreference
    });

    updateOnboardingData('periodCycle', data);

    if (onNext) {
      onNext(data);
    } else {
      router.push('/onboarding/primary-health-goal');
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  // Enhanced form validation
  const isFormValid = hasPeriods !== null && trackingPreference && 
    (!hasPeriods || (lastPeriodDate && pregnancyStatus));

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
            Reproductive Health
          </h1>
          <p className="text-gray-600">
            Help us provide you with personalized health insights and support.
          </p>
        </div>

        {/* Do you have periods? */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Do you currently have menstrual periods?
          </h2>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setHasPeriods(true)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                hasPeriods === true
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-semibold ${
                  hasPeriods === true ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  Yes, I have regular periods
                </span>
                {hasPeriods === true && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => setHasPeriods(false)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                hasPeriods === false
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-semibold ${
                  hasPeriods === false ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  No, I don't have periods currently
                </span>
                {hasPeriods === false && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Additional questions if has periods */}
        {hasPeriods === true && (
          <>
            {/* Last Period Date */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                When was your last period? (approximate date)
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 w-5 h-5" />
                <input
                  type="date"
                  value={lastPeriodDate}
                  onChange={(e) => setLastPeriodDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black focus:border-transparent outline-none"
                  required={hasPeriods === true}
                />
              </div>
            </div>

            {/* Cycle Length */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Average cycle length (days)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
                  min="20"
                  max="45"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 text-black focus:ring-blue-500 focus:border-transparent outline-none text-center"
                />
                <span className="text-gray-600">days</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Typical range: 21-35 days</p>
            </div>

            {/* Cycle Regularity */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Are your cycles usually regular?
              </h3>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setCycleLengthRegular(true)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    cycleLengthRegular
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Yes, regular
                </button>
                <button
                  type="button"
                  onClick={() => setCycleLengthRegular(false)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    !cycleLengthRegular
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  No, irregular
                </button>
              </div>
            </div>

            {/* Pregnancy Status */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Current status (optional)
              </h3>
              <div className="space-y-2">
                {pregnancyOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setPregnancyStatus(option.id)}
                    className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                      pregnancyStatus === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`${
                        pregnancyStatus === option.id ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {option.label}
                      </span>
                      {pregnancyStatus === option.id && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Tracking Preference */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            How would you like us to support your reproductive health?
          </h2>
          <div className="space-y-3">
            {trackingOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setTrackingPreference(option.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  trackingPreference === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${
                    trackingPreference === option.id ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {option.label}
                  </span>
                  {trackingPreference === option.id && (
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

export default PeriodCyclePage;