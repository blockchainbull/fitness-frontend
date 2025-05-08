// Body Metrics Tab Component
import React from 'react';

interface PhysicalStats {
  height: number;
  weight: number;
  age: number;
  gender: string;
  activityLevel: string;
}

interface HealthMetrics {
  bmr: number;
  tdee: number;
  bmi: number;
}

interface BodyMetricsTabProps {
  physicalStats: PhysicalStats;
  handlePhysicalStatsChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  measurementUnit: string;
  healthMetrics: HealthMetrics;
  isSubmitting: boolean;
  handleSaveSettings: () => void;
}

const BodyMetricsTab: React.FC<BodyMetricsTabProps> = ({ 
  physicalStats, 
  handlePhysicalStatsChange, 
  measurementUnit, 
  healthMetrics, 
  isSubmitting, 
  handleSaveSettings 
}) => {
  return (
    <div className="mt-6 bg-white shadow rounded-lg">
      <div className="px-6 py-6">
        <h3 className="text-lg font-medium text-gray-900">Body Metrics</h3>
        <p className="mt-1 text-sm text-gray-500">
          Keep your body measurements up to date for accurate fitness recommendations.
        </p>
        
        {/* Measurements Input Section */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">
              Height
            </label>
            <div className="mt-2 relative rounded-md shadow-sm">
              <input
                type="number"
                name="height"
                id="height"
                value={physicalStats.height || ''}
                onChange={handlePhysicalStatsChange}
                className="block w-full rounded-md border-gray-300 bg-gray-100 pl-4 pr-12 py-2 focus:border-green-500 focus:ring-green-500 sm:text-black"
                placeholder="0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">
                  {measurementUnit === 'metric' ? 'cm' : 'in'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Weight
            </label>
            <div className="mt-2 relative rounded-md shadow-sm">
              <input
                type="number"
                name="weight"
                id="weight"
                value={physicalStats.weight || ''}
                onChange={handlePhysicalStatsChange}
                className="block w-full rounded-md border-gray-300 bg-gray-100 pl-4 pr-12 py-2 focus:border-green-500 focus:ring-green-500 sm:text-black"
                placeholder="0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">
                  {measurementUnit === 'metric' ? 'kg' : 'lb'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="age"
                id="age"
                value={physicalStats.age || ''}
                onChange={handlePhysicalStatsChange}
                className="block w-full rounded-md border-gray-300 bg-gray-100 py-2 px-4 focus:border-green-500 focus:ring-green-500 sm:text-black"
                placeholder="Age"
              />
            </div>
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="mt-2">
              <select
                id="gender"
                name="gender"
                value={physicalStats.gender}
                disabled={true}
                className="block w-full rounded-md border-gray-300 bg-gray-200 py-2 px-3 text-black focus:border-green-500 focus:ring-green-500 sm:text-sm cursor-not-allowed"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">Gender cannot be changed</p>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700">
              Activity Level
            </label>
            <div className="mt-2">
              <select
                id="activityLevel"
                name="activityLevel"
                value={physicalStats.activityLevel}
                onChange={handlePhysicalStatsChange}
                className="block w-full rounded-md border-gray-300 bg-gray-100 py-2 px-3 focus:border-green-500 focus:ring-green-500 sm:text-black"
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (1-3 days/week)</option>
                <option value="moderate">Moderate (3-5 days/week)</option>
                <option value="active">Active (6-7 days/week)</option>
                <option value="veryActive">Very Active (physical job or 2x training)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Estimated Metrics Section - Improved Design */}
        <div className="mt-10">
          <h4 className="text-base font-medium text-gray-900 mb-4">Your Estimated Metrics</h4>
          <div className="bg-gray-50 rounded-md overflow-hidden">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* BMR Card */}
              <div className="p-6">
                <h5 className="text-sm font-medium text-gray-500">Basal Metabolic Rate (BMR)</h5>
                <p className="mt-2 text-3xl font-bold text-gray-900">{healthMetrics.bmr} <span className="text-lg font-medium">calories/day</span></p>
                <p className="mt-2 text-xs text-gray-500">Calories your body needs at complete rest</p>
              </div>
              
              {/* TDEE Card */}
              <div className="p-6">
                <h5 className="text-sm font-medium text-gray-500">Total Daily Energy Expenditure (TDEE)</h5>
                <p className="mt-2 text-3xl font-bold text-gray-900">{healthMetrics.tdee} <span className="text-lg font-medium">calories/day</span></p>
                <p className="mt-2 text-xs text-gray-500">Total calories burned daily with activity</p>
              </div>
              
              {/* BMI Card */}
              <div className="p-6">
                <h5 className="text-sm font-medium text-gray-500">Body Mass Index (BMI)</h5>
                <p className="mt-2 text-3xl font-bold text-gray-900">{healthMetrics.bmi}</p>
                <p className="mt-2 text-xs text-gray-500">Weight relative to height</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={isSubmitting}
            className={`inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BodyMetricsTab;