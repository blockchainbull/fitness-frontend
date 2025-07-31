// sleep-info
"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';
import { useOnboarding } from '@/context/OnboardingContext';
import EnhancedTimePicker from '@/components/EnchancedTimePicker'; 

interface SleepIssue {
  id: string;
  label: string;
}

interface SleepInfoPageProps {
  onNext?: (data: SleepInfoData) => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

interface SleepInfoData {
  sleepHours: number;
  bedtime: string;
  wakeupTime: string;
  sleepIssues: string[];
}

const SleepInfoPage: React.FC<SleepInfoPageProps> = ({
  onNext,
  onBack,
  showBackButton = true
}) => {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  const [sleepHours, setSleepHours] = useState<number>(7.0);
  const [bedtime, setBedtime] = useState<string>('10:00 PM');
  const [wakeupTime, setWakeupTime] = useState<string>('6:00 AM');
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [showBedtimePicker, setShowBedtimePicker] = useState<boolean>(false);
  const [showWakeupPicker, setShowWakeupPicker] = useState<boolean>(false);

  const sleepIssues: SleepIssue[] = [
    { id: 'trouble_falling_asleep', label: 'Trouble falling asleep' },
    { id: 'waking_during_night', label: 'Waking up during the night' },
    { id: 'waking_too_early', label: 'Waking up too early' },
    { id: 'feeling_tired', label: 'Feeling tired after sleep' },
    { id: 'snoring', label: 'Snoring' },
    { id: 'sleep_apnea', label: 'Sleep apnea' },
    { id: 'none', label: 'None' }
  ];

  // Convert time string to minutes for calculation
  const timeToMinutes = (timeStr: string): number => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes;
    
    if (period === 'PM' && hours !== 12) {
      totalMinutes += 12 * 60;
    } else if (period === 'AM' && hours === 12) {
      totalMinutes = minutes;
    }
    
    return totalMinutes;
  };

  // Convert minutes to time string
  const minutesToTime = (minutes: number): string => {
    minutes = minutes % (24 * 60); // Handle day overflow
    if (minutes < 0) minutes += 24 * 60; // Handle negative values
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    
    return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  // Auto-update wake up time when bedtime or sleep hours change
  useEffect(() => {
    const bedtimeMinutes = timeToMinutes(bedtime);
    const wakeupMinutes = bedtimeMinutes + (sleepHours * 60);
    const newWakeupTime = minutesToTime(wakeupMinutes);
    setWakeupTime(newWakeupTime);
  }, [bedtime, sleepHours]);

  const handleSleepHoursChange = (hours: number) => {
    setSleepHours(hours);
  };

  const handleIssueToggle = (issueId: string) => {
    if (issueId === 'none') {
      // If "None" is selected, clear all other selections
      setSelectedIssues(selectedIssues.includes('none') ? [] : ['none']);
    } else {
      // If any other issue is selected, remove "None" if it was selected
      let newIssues = [...selectedIssues];
      
      if (newIssues.includes('none')) {
        newIssues = newIssues.filter(id => id !== 'none');
      }
      
      if (newIssues.includes(issueId)) {
        newIssues = newIssues.filter(id => id !== issueId);
      } else {
        newIssues.push(issueId);
      }
      
      setSelectedIssues(newIssues);
    }
  };

  const handleSubmit = () => {
    const data: SleepInfoData = {
      sleepHours,
      bedtime,
      wakeupTime,
      sleepIssues: selectedIssues
    };

    console.log('Sleep info data:', data);

    updateOnboardingData('sleepInfo', data);

    if (onNext) {
      onNext(data);
    } else {
      router.push('/onboarding/dietary-preferences');
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
          <div className="bg-blue-500 h-2 rounded-full w-4/7"></div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Tell us about your sleep
          </h1>
          <p className="text-gray-600">
            Quality sleep is essential for recovery and overall health.
          </p>
        </div>

        {/* Sleep Hours Slider */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            How many hours do you sleep per night?
          </h2>
          
          <div className="text-center mb-4">
            <span className="text-3xl font-bold text-blue-600">
              {sleepHours.toFixed(1)} hours
            </span>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min="3"
              max="12"
              step="0.5"
              value={sleepHours}
              onChange={(e) => handleSleepHoursChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>3h</span>
              <span>12h</span>
            </div>
          </div>
        </div>

        {/* Bedtime and Wake up time */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Bedtime</h3>
            <button
              onClick={() => setShowBedtimePicker(true)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center space-x-3 hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <Moon className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">{bedtime}</span>
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Wake up time</h3>
            <button
              onClick={() => setShowWakeupPicker(true)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center space-x-3 hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <Sun className="w-6 h-6 text-orange-500" />
              <span className="text-lg font-semibold text-gray-900">{wakeupTime}</span>
            </button>
          </div>
        </div>

        {/* Sleep Issues */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Do you experience any sleep issues?
          </h2>
          <p className="text-gray-600 mb-4">Select all that apply</p>
          
          <div className="space-y-3">
            {sleepIssues.map((issue) => (
              <label
                key={issue.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-gray-900">{issue.label}</span>
                <input
                  type="checkbox"
                  checked={selectedIssues.includes(issue.id)}
                  onChange={() => handleIssueToggle(issue.id)}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
              </label>
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

      {/* Enhanced Time Pickers */}
      <EnhancedTimePicker
        isOpen={showBedtimePicker}
        onClose={() => setShowBedtimePicker(false)}
        onTimeSelect={setBedtime}
        initialTime={bedtime}
        title="Select Bedtime"
      />
      
      <EnhancedTimePicker
        isOpen={showWakeupPicker}
        onClose={() => setShowWakeupPicker(false)}
        onTimeSelect={setWakeupTime}
        initialTime={wakeupTime}
        title="Select Wake Up Time"
      />

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

export default SleepInfoPage;