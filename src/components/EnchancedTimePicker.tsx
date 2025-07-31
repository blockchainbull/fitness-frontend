"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';

interface EnhancedTimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeSelect: (time: string) => void;
  initialTime: string;
  title: string;
}

const EnhancedTimePicker: React.FC<EnhancedTimePickerProps> = ({
  isOpen,
  onClose,
  onTimeSelect,
  initialTime,
  title
}) => {
  const [hour, setHour] = useState<number>(10);
  const [minute, setMinute] = useState<number>(0);
  const [period, setPeriod] = useState<'AM' | 'PM'>('PM');

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  // Parse initial time when component opens
  useEffect(() => {
    if (isOpen && initialTime) {
      const [time, timePeriod] = initialTime.split(' ');
      const [h, m] = time.split(':').map(Number);
      
      setHour(h);
      setMinute(m);
      setPeriod(timePeriod as 'AM' | 'PM');
    }
  }, [isOpen, initialTime]);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleConfirm = () => {
    const formattedTime = `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
    onTimeSelect(formattedTime);
    onClose();
  };

  const scrollToValue = (ref: React.RefObject<HTMLDivElement>, value: number, itemHeight: number = 40) => {
    if (ref.current) {
      ref.current.scrollTop = value * itemHeight - itemHeight * 2; // Center the selection
    }
  };

  const handleHourScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const itemHeight = 40;
    const index = Math.round(scrollTop / itemHeight);
    const selectedHour = hours[index];
    if (selectedHour) {
      setHour(selectedHour);
    }
  };

  const handleMinuteScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const itemHeight = 40;
    const index = Math.round(scrollTop / itemHeight);
    const selectedMinute = minutes[index];
    if (selectedMinute !== undefined) {
      setMinute(selectedMinute);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 max-w-sm mx-4">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-6">
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        {/* Time Display */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-gray-900">
            {hour}:{minute.toString().padStart(2, '0')} {period}
          </div>
        </div>

        {/* Time Selection */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          {/* Hour Selection */}
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-700 mb-2">Hour</label>
            <div className="relative">
              <select
                value={hour}
                onChange={(e) => setHour(Number(e.target.value))}
                className="w-16 h-12 text-center text-lg font-semibold border border-gray-800 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
              >
                {hours.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-2xl font-bold text-gray-900 mt-6">:</div>

          {/* Minute Selection */}
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-700 mb-2">Minute</label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="59"
                value={minute}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val >= 0 && val <= 59) {
                    setMinute(val);
                  }
                }}
                className="w-16 h-12 text-center text-lg font-semibold border border-gray-800 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* AM/PM Selection */}
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-700 mb-2">Period</label>
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => setPeriod('AM')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  period === 'AM'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                AM
              </button>
              <button
                onClick={() => setPeriod('PM')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  period === 'PM'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                PM
              </button>
            </div>
          </div>
        </div>

        {/* Quick Time Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { label: '10PM', hour: 10, minute: 0, period: 'PM' },
            { label: '11PM', hour: 11, minute: 0, period: 'PM' },
            { label: '12AM', hour: 12, minute: 0, period: 'AM' },
            { label: '1AM', hour: 1, minute: 0, period: 'AM' },
            { label: '2AM', hour: 2, minute: 0, period: 'AM' },
            { label: '3AM', hour: 3, minute: 0, period: 'AM' },
            { label: '4AM', hour: 4, minute: 0, period: 'AM' },
            { label: '5AM', hour: 5, minute: 0, period: 'AM' },
            
          ].map((time) => (
            <button
              key={time.label}
              onClick={() => {
                setHour(time.hour);
                setMinute(time.minute);
                setPeriod(time.period as 'AM' | 'PM');
              }}
              className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              {time.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 font-semibold hover:bg-gray-50 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTimePicker;