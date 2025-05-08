// Profile Tab Component
import React from 'react';

interface ProfileData {
  name: string;
  email: string;
  fitnessGoal: string;
  dietaryPreferences: string[];
}

interface ProfileTabProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  isSubmitting: boolean;
  handleSaveProfile: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ 
  profileData, 
  setProfileData, 
  isSubmitting, 
  handleSaveProfile 
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDietaryPreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    setProfileData(prev => {
      const updatedPreferences = checked
        ? [...prev.dietaryPreferences, value]
        : prev.dietaryPreferences.filter(pref => pref !== value);
      
      return {
        ...prev,
        dietaryPreferences: updatedPreferences
      };
    });
  };

  // List of fitness goals
  const fitnessGoals = [
    { id: 'weightLoss', label: 'Weight Loss' },
    { id: 'muscleGain', label: 'Muscle Gain' },
    { id: 'endurance', label: 'Improve Endurance' },
    { id: 'strength', label: 'Increase Strength' },
    { id: 'flexibility', label: 'Enhance Flexibility' },
    { id: 'generalFitness', label: 'General Fitness' }
  ];

  // List of dietary preferences
  const dietaryPreferences = [
    { id: 'vegan', label: 'Vegan' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'pescatarian', label: 'Pescatarian' },
    { id: 'keto', label: 'Keto' },
    { id: 'paleo', label: 'Paleo' },
    { id: 'glutenFree', label: 'Gluten-Free' },
    { id: 'dairyFree', label: 'Dairy-Free' }
  ];

  return (
    <div className="mt-6 bg-white shadow rounded-lg">
      <div className="px-6 py-6">
        <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
        <p className="mt-1 text-sm text-gray-500">
          Update your personal information and preferences.
        </p>
        
        {/* Personal Information Form */}
        <div className="mt-8 grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                value={profileData.name}
                disabled={true}
                className="block w-full rounded-md border-gray-300 bg-gray-200 py-2 px-4 focus:border-green-500 focus:ring-green-500 sm:text-black cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-gray-500">Name cannot be changed</p>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                value={profileData.email}
                disabled={true}
                className="block w-full rounded-md border-gray-300 bg-gray-200 py-2 px-4 focus:border-green-500 focus:ring-green-500 sm:text-black cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
            </div>
          </div>

          <div>
            <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700">
              Primary Fitness Goal
            </label>
            <div className="mt-2">
              <select
                id="fitnessGoal"
                name="fitnessGoal"
                value={profileData.fitnessGoal}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 bg-gray-100 py-2 px-3 focus:border-green-500 focus:ring-green-500 sm:text-black"
              >
                <option value="">Select a goal</option>
                {fitnessGoals.map(goal => (
                  <option key={goal.id} value={goal.id}>{goal.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dietary Preferences
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {dietaryPreferences.map(pref => (
                <div key={pref.id} className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id={pref.id}
                      name="dietaryPreferences"
                      type="checkbox"
                      checked={profileData.dietaryPreferences.includes(pref.id)}
                      onChange={handleDietaryPreferenceChange}
                      value={pref.id}
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor={pref.id} className="text-sm text-gray-700">
                      {pref.label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleSaveProfile}
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

export default ProfileTab;