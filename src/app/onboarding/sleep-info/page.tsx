// sleep-info
"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Moon, Sun, X } from 'lucide-react';
import { useOnboarding } from '@/context/OnboardingContext';

interface SleepIssue {
  id: string;
  label: string;
}

interface SleepInfoData {
  sleepHours: number;
  bedtime: string;
  wakeupTime: string;
  sleepIssues: string[];
}

interface SleepInfoPageProps {
  onNext?: (data: SleepInfoData) => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

interface TimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeSelect: (time: string) => void;
  initialTime: string;
  title: string;
}

const TimePicker: React.FC<TimePickerProps> = ({ isOpen, onClose, onTimeSelect, initialTime, title }) => {
  const [selectedHour, setSelectedHour] = useState<number>(12);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [isAM, setIsAM] = useState<boolean>(true);

  useEffect(() => {
    if (initialTime && isOpen) {
      const [time, period] = initialTime.split(' ');
      const [hour, minute] = time.split(':').map(Number);
      setSelectedHour(hour);
      setSelectedMinute(minute);
      setIsAM(period === 'AM');
    }
  }, [initialTime, isOpen]);

  const handleConfirm = () => {
    const period = isAM ? 'AM' : 'PM';
    const formattedTime = `${selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${period}`;
    onTimeSelect(formattedTime);
    onClose();
  };

  const handleHourChange = (value: string) => {
    const hour = parseInt(value);
    if (!isNaN(hour) && hour >= 1 && hour <= 12) {
      setSelectedHour(hour);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h3 className="text-lg font-semibold mb-6 text-center text-gray-800">{title}</h3>
        
        <div className="flex items-center justify-center space-x-4 mb-6">
          {/* Hour Input */}
          <input
            type="number"
            min="1"
            max="12"
            value={selectedHour}
            onChange={(e) => handleHourChange(e.target.value)}
            className="text-6xl font-bold text-gray-900 w-20 text-center border-none outline-none bg-transparent"
          />
          
          <div className="text-6xl font-bold text-gray-900">:</div>
          
          {/* Minute */}
          <div className="bg-blue-600 text-white text-6xl font-bold px-4 py-2 rounded-lg">
            {selectedMinute.toString().padStart(2, '0')}
          </div>
          
          {/* AM/PM Toggle */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setIsAM(true)}
              className={`px-3 py-2 rounded text-sm font-semibold ${
                isAM ? 'bg-cyan-400 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              AM
            </button>
            <button
              onClick={() => setIsAM(false)}
              className={`px-3 py-2 rounded text-sm font-semibold ${
                !isAM ? 'bg-cyan-400 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              PM
            </button>
          </div>
        </div>

        {/* Minute Selector Circle */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 border-2 border-gray-200 rounded-full bg-gray-50">
            {/* Minute markers */}
            {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((minute) => {
              const angle = (minute / 60) * 360 - 90; // Start from top (12 o'clock)
              const radius = 80;
              const x = Math.cos((angle * Math.PI) / 180) * radius + 96;
              const y = Math.sin((angle * Math.PI) / 180) * radius + 96;
              
              return (
                <button
                  key={minute}
                  onClick={() => setSelectedMinute(minute)}
                  className={`absolute w-8 h-8 rounded-full text-xs font-semibold transform -translate-x-1/2 -translate-y-1/2 ${
                    selectedMinute === minute
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-300'
                  }`}
                  style={{ left: x, top: y }}
                >
                  {minute.toString().padStart(2, '0')}
                </button>
              );
            })}
            
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
            
            {/* Line to selected minute - Fixed positioning */}
            <div 
              className="absolute bg-blue-600 z-5"
              style={{ 
                width: '2px',
                height: '80px',
                left: '50%',
                top: '50%',
                transformOrigin: 'bottom center',
                transform: `translate(-50%, -100%) rotate(${(selectedMinute / 60) * 360}deg)`
              }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

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

  // Update wake up time when bedtime or sleep hours change
  useEffect(() => {
    const bedtimeMinutes = timeToMinutes(bedtime);
    const sleepMinutes = sleepHours * 60;
    const wakeupMinutes = bedtimeMinutes + sleepMinutes;
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
      // Remove "None" if another issue is selected
      const filteredIssues = selectedIssues.filter(id => id !== 'none');
      
      if (filteredIssues.includes(issueId)) {
        setSelectedIssues(filteredIssues.filter(id => id !== issueId));
      } else {
        setSelectedIssues([...filteredIssues, issueId]);
      }
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
      router.push('/onboarding/dietary-preferences'); // or next step
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
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center space-x-3 hover:bg-gray-100 transition-colors"
            >
              <Moon className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-900">{bedtime}</span>
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Wake up time</h3>
            <button
              onClick={() => setShowWakeupPicker(true)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center space-x-3 hover:bg-gray-100 transition-colors"
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

      {/* Time Pickers */}
      <TimePicker
        isOpen={showBedtimePicker}
        onClose={() => setShowBedtimePicker(false)}
        onTimeSelect={setBedtime}
        initialTime={bedtime}
        title="Select time"
      />
      
      <TimePicker
        isOpen={showWakeupPicker}
        onClose={() => setShowWakeupPicker(false)}
        onTimeSelect={setWakeupTime}
        initialTime={wakeupTime}
        title="Select time"
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