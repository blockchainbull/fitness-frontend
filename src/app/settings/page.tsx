// src/app/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading, updateSettings } = useAuth();

  const [activeTab, setActiveTab] = useState('profile');

  // User physical stats - initialized with empty values
  const [physicalStats, setPhysicalStats] = useState({
    height: 0, // in cm
    weight: 0, // in kg
    age: 0,
    gender: 'male',
    activityLevel: 'moderate'
  });

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    fitnessGoal: '',
    dietaryPreferences: [] as string[]
  });

  // Health metrics
  const [healthMetrics, setHealthMetrics] = useState({
    bmr: 0,
    tdee: 0,
    bmi: 0
  });
  
  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load user data when component mounts or when user changes
  useEffect(() => {
    if (user) {
      console.log("Loading user data:", user);
      
      // Set profile data
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        fitnessGoal: user.fitnessGoal || '',
        dietaryPreferences: user.dietaryPreferences || []
      });

      // Set physical stats if available
      if (user.physicalStats) {
        console.log("Setting physical stats:", user.physicalStats);
        setPhysicalStats({
          height: user.physicalStats.height || 0,
          weight: user.physicalStats.weight || 0,
          age: user.physicalStats.age || 0,
          gender: user.physicalStats.gender || 'male',
          activityLevel: user.physicalStats.activityLevel || 'moderate'
        });
      }
      
      // Set health metrics if available
      if (user.healthMetrics) {
        console.log("Setting health metrics:", user.healthMetrics);
        setHealthMetrics({
          bmr: user.healthMetrics.bmr || 0,
          tdee: user.healthMetrics.tdee || 0,
          bmi: user.healthMetrics.bmi || 0
        });
      }
      
      // Load preferences
      if (user.preferences) {
        if (user.preferences.notifications) {
          setNotifications(user.preferences.notifications);
        }
        if (user.preferences.privacy) {
          setPrivacy(user.preferences.privacy);
        }
        if (user.preferences.theme) {
          setTheme(user.preferences.theme);
        }
        if (user.preferences.measurementUnit) {
          setMeasurementUnit(user.preferences.measurementUnit);
        }
      }
    }
  }, [user]);

  // Calculate BMR, TDEE, and BMI whenever physical stats change
  useEffect(() => {
    if (physicalStats.height > 0 && physicalStats.weight > 0 && physicalStats.age > 0) {
      console.log("Calculating health metrics from physical stats:", physicalStats);
      
      // Calculate BMR using Mifflin-St Jeor Equation
      let bmr = 0;
      if (physicalStats.gender === 'male') {
        bmr = 10 * physicalStats.weight + 6.25 * physicalStats.height - 5 * physicalStats.age + 5;
      } else {
        bmr = 10 * physicalStats.weight + 6.25 * physicalStats.height - 5 * physicalStats.age - 161;
      }

      // Activity multipliers for TDEE calculation
      const activityMultipliers = {
        sedentary: 1.2,     // Little to no exercise
        light: 1.375,       // Light exercise 1-3 days per week
        moderate: 1.55,     // Moderate exercise 3-5 days per week
        active: 1.725,      // Hard exercise 6-7 days per week
        veryActive: 1.9     // Very hard exercise and physical job
      };

      const multiplier = activityMultipliers[physicalStats.activityLevel as keyof typeof activityMultipliers] || 1.55;
      const tdee = bmr * multiplier;
      
      // Calculate BMI
      const heightInMeters = physicalStats.height / 100;
      const bmi = physicalStats.weight / (heightInMeters * heightInMeters);

      setHealthMetrics({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        bmi: parseFloat(bmi.toFixed(1))
      });
      
      console.log("New health metrics calculated:", { bmr: Math.round(bmr), tdee: Math.round(tdee), bmi: parseFloat(bmi.toFixed(1)) });
    }
  }, [physicalStats]);

  // Settings that could be stored in user preferences
  const [notifications, setNotifications] = useState({
    email: true,
    app: true,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    shareProgress: true,
    publicProfile: false
  });

  const [theme, setTheme] = useState('system');
  const [measurementUnit, setMeasurementUnit] = useState('metric');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Redirect if user is not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPrivacy(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handlePhysicalStatsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPhysicalStats(prev => ({
      ...prev,
      [name]: name === 'height' || name === 'weight' || name === 'age' 
        ? parseFloat(value) || 0 
        : value
    }));
    
    // Clear validation error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newUnit = e.target.value;
    
    // Convert height and weight if unit system changes
    if (newUnit !== measurementUnit) {
      if (newUnit === 'imperial') {
        // Convert from metric to imperial
        setPhysicalStats(prev => ({
          ...prev,
          height: Math.round(prev.height * 0.393701), // cm to inches
          weight: Math.round(prev.weight * 2.20462)  // kg to lbs
        }));
      } else {
        // Convert from imperial to metric
        setPhysicalStats(prev => ({
          ...prev,
          height: Math.round(prev.height * 2.54), // inches to cm
          weight: Math.round(prev.weight * 0.453592) // lbs to kg
        }));
      }
    }
    
    setMeasurementUnit(newUnit);
  };

  // Validate the body metrics form
  const validateBodyMetricsForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!physicalStats.height || physicalStats.height <= 0) {
      newErrors.height = 'Height is required and must be greater than 0';
    }
    
    if (!physicalStats.weight || physicalStats.weight <= 0) {
      newErrors.weight = 'Weight is required and must be greater than 0';
    }
    
    if (!physicalStats.age || physicalStats.age <= 0 || physicalStats.age > 120) {
      newErrors.age = 'Age is required and must be between 1 and 120';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFormData = () => {
    const errors: Record<string, string> = {};
    
    if (!physicalStats.height || physicalStats.height <= 0) {
      errors.height = "Please enter a valid height";
    }
    
    if (!physicalStats.weight || physicalStats.weight <= 0) {
      errors.weight = "Please enter a valid weight";
    }
    
    if (!physicalStats.age || physicalStats.age <= 0 || physicalStats.age > 120) {
      errors.age = "Please enter a valid age (1-120)";
    }
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSaveProfile = async () => {
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
    try {
      // Call your API to save profile data
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fitnessGoal: profileData.fitnessGoal,
          dietaryPreferences: profileData.dietaryPreferences
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      
      // Update the user context with the new data
      const data = await response.json();
      
      setMessage({
        type: 'success',
        text: 'Profile updated successfully!'
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: (error as Error).message || 'Failed to update profile. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveSettings = async () => {
    // Validate form if we're on the bodyMetrics tab
    if (activeTab === 'bodyMetrics' && !validateBodyMetricsForm()) {
      return;
    }
  
    if (!validateFormData()) {
      return;
    }
    
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
    try {
      console.log("Saving settings with data:", {
        physicalStats,
        healthMetrics,
        measurementUnit
      });
      
      // Include physical stats and health metrics in the data being sent to the backend
      const dataToSave = {
        notifications,
        privacy,
        theme,
        measurementUnit,
        physicalStats: {
          height: physicalStats.height,
          weight: physicalStats.weight,
          age: physicalStats.age,
          gender: physicalStats.gender,
          activityLevel: physicalStats.activityLevel
        },
        healthMetrics: {
          bmr: healthMetrics.bmr,
          tdee: healthMetrics.tdee,
          bmi: healthMetrics.bmi
        }
      };
  
      // Use the context's updateSettings function instead of manually making the API call
      await updateSettings(dataToSave);
  
      setMessage({
        type: 'success',
        text: 'Settings saved successfully!'
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage({
        type: 'error',
        text: (error as Error).message || 'Failed to save settings. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
      
      // Clear success message after a few seconds
      if (message.type === 'success') {
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 3000);
      }
    }
  };

  // Content for password tab
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is edited
    if (passwordErrors[name]) {
      setPasswordErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validatePasswordForm = () => {
    const errors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      // In a real implementation, you would call your password update API
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update password');
      }

      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      setMessage({
        type: 'success',
        text: 'Password updated successfully!'
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: (error as Error).message || 'Failed to update password. Please check your current password and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-50 py-12 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
            <p className="mt-2 text-sm text-gray-600">Manage your account settings and preferences.</p>

            {/* Settings tabs */}
            <div className="mt-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`${
                    activeTab === 'profile'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-black sm`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`${
                    activeTab === 'account'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-black sm`}
                >
                  Account Preferences
                </button>
                <button
                  onClick={() => setActiveTab('bodyMetrics')}
                  className={`${
                    activeTab === 'bodyMetrics'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-black sm`}
                >
                  Body Metrics
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`${
                    activeTab === 'password'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-black sm`}
                >
                  Password
                </button>
                <button
                  onClick={() => setActiveTab('data')}
                  className={`${
                    activeTab === 'data'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-black sm`}
                >
                  Data & Privacy
                </button>
              </nav>
            </div>

            {/* Status message */}
            {message.text && (
              <div className={`mt-6 p-4 rounded-md ${
                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            {/* Body Metrics Tab */}
            {activeTab === 'bodyMetrics' && (
              <div className="mt-6 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Body Metrics</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Keep your body measurements up to date for accurate fitness recommendations.
                  </p>
                  
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="height" className="block text-sm font-medium text-black">
                        Height
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="number"
                          name="height"
                          id="height"
                          value={physicalStats.height || ''}
                          onChange={handlePhysicalStatsChange}
                          className="focus:ring-green-800 focus:border-green-800 w-full pr-12 sm:text-black bg-gray-100 rounded-md"
                          placeholder="0"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-black-500 sm:text-black sm">
                            {measurementUnit === 'metric' ? 'cm' : 'in'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="weight" className="block text-sm font-medium text-black">
                        Weight
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="number"
                          name="weight"
                          id="weight"
                          value={physicalStats.weight || ''}
                          onChange={handlePhysicalStatsChange}
                          className="focus:ring-green-500 focus:border-green-500 w-full pr-12 sm:text-black bg-gray-100 rounded-md"
                          placeholder="0"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-black-500 sm:text-black sm">
                            {measurementUnit === 'metric' ? 'kg' : 'lb'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="age" className="block text-sm font-medium text-black">
                        Age
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="age"
                          id="age"
                          value={physicalStats.age || ''}
                          onChange={handlePhysicalStatsChange}
                          className="shadow-sm focus:ring-green-500 focus:border-green-500 w-full sm:text-black bg-gray-100 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="gender" className="block text-sm font-medium text-black">
                        Gender
                      </label>
                      <div className="mt-1">
                        <select
                          id="gender"
                          name="gender"
                          value={physicalStats.gender}
                          disabled={true} // Make gender non-editable
                          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-black bg-gray-200 rounded-md cursor-not-allowed"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        <p className="mt-1 text-xs text-gray-500">Gender cannot be changed</p>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="activityLevel" className="block text-sm font-medium text-black">
                        Activity Level
                      </label>
                      <div className="mt-1">
                        <select
                          id="activityLevel"
                          name="activityLevel"
                          value={physicalStats.activityLevel}
                          onChange={handlePhysicalStatsChange}
                          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-black bg-gray-100 rounded-md"
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

                  <div className="mt-8 bg-gray-50 p-4 rounded-md">
                    <h4 className="text-base font-medium text-gray-900">Your Estimated Metrics</h4>
                    <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Basal Metabolic Rate (BMR)</p>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">{healthMetrics.bmr} calories/day</p>
                        <p className="mt-1 text-xs text-gray-500">Calories your body needs at complete rest</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Daily Energy Expenditure (TDEE)</p>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">{healthMetrics.tdee} calories/day</p>
                        <p className="mt-1 text-xs text-gray-500">Total calories burned daily with activity</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Body Mass Index (BMI)</p>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">{healthMetrics.bmi}</p>
                        <p className="mt-1 text-xs text-gray-500">Weight relative to height</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveSettings}
                      disabled={isSubmitting}
                      className={`inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Account Preferences Tab */}
            {activeTab === 'account' && (
              <div className="mt-6 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Preferences</h3>
                  
                  <div className="mt-6 space-y-6">
                    <div>
                      <h4 className="text-med font-medium text-black">Measurement Units</h4>
                      <select
                        id="units"
                        name="units"
                        value={measurementUnit}
                        onChange={handleUnitChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-100 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-black rounded-md"
                      >
                        <option value="metric">Metric (kg, cm)</option>
                        <option value="imperial">Imperial (lb, in)</option>
                      </select>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Notifications</h4>
                      <div className="mt-2 space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="email"
                              name="email"
                              type="checkbox"
                              checked={notifications.email}
                              onChange={handleNotificationChange}
                              className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="email" className="font-medium text-gray-700">Email notifications</label>
                            <p className="text-gray-500">Receive emails about your activity, reminders and progress updates</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="app"
                              name="app"
                              type="checkbox"
                              checked={notifications.app}
                              onChange={handleNotificationChange}
                              className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="app" className="font-medium text-gray-700">App notifications</label>
                            <p className="text-gray-500">Receive notifications within the app</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="marketing"
                              name="marketing"
                              type="checkbox"
                              checked={notifications.marketing}
                              onChange={handleNotificationChange}
                              className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="marketing" className="font-medium text-gray-700">Marketing emails</label>
                            <p className="text-gray-500">Receive tips, product updates and offers</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveSettings}
                      disabled={isSubmitting}
                      className={`inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div className="mt-6 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Change Password</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your password to keep your account secure.
                  </p>
                  
                  <form onSubmit={handlePasswordUpdate} className="mt-6 space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          passwordErrors.currentPassword ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                      />
                      {passwordErrors.currentPassword && (
                        <p className="mt-2 text-sm text-red-600">{passwordErrors.currentPassword}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          passwordErrors.newPassword ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                      />
                      {passwordErrors.newPassword && (
                        <p className="mt-2 text-sm text-red-600">{passwordErrors.newPassword}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`mt-1 block w-full px-3 py-2 border ${
                          passwordErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                      />
                      {passwordErrors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-600">{passwordErrors.confirmPassword}</p>
                      )}
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? 'Updating...' : 'Update Password'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'data' && (
              <div className="mt-6 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Privacy Settings</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Control how your information is used and displayed.
                  </p>
                  
                  <div className="mt-6 space-y-6">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="shareProgress"
                          name="shareProgress"
                          type="checkbox"
                          checked={privacy.shareProgress}
                          onChange={handlePrivacyChange}
                          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="shareProgress" className="font-medium text-gray-700">Share progress with AI coach</label>
                        <p className="text-gray-500">Allow our AI to access your progress data to provide better recommendations</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="publicProfile"
                          name="publicProfile"
                          type="checkbox"
                          checked={privacy.publicProfile}
                          onChange={handlePrivacyChange}
                          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="publicProfile" className="font-medium text-gray-700">Public profile</label>
                        <p className="text-gray-500">Make your profile visible to other FitMind AI users</p>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Account Actions</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-500"
                          >
                            Download your data
                          </button>
                          <p className="mt-1 text-xs text-gray-500">Get a copy of all the data we have stored about you</p>
                        </div>
                        
                        <div>
                          <button
                            type="button"
                            className="text-sm text-red-600 hover:text-red-500"
                          >
                            Delete account
                          </button>
                          <p className="mt-1 text-xs text-gray-500">Permanently delete your account and all associated data</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveSettings}
                      disabled={isSubmitting}
                      className={`inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="mt-6 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-black">Personal Information</h3>
                  <p className="mt-1 text-sm text-black">
                    Update your personal information and preferences.
                  </p>
                  
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="name" className="block text-med font-medium text-black">
                        Full Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={profileData.name}
                          disabled={true} // Make name non-editable
                          className="shadow-sm block w-full sm:text-black bg-gray-200 rounded-md cursor-not-allowed"
                        />
                        <p className="mt-1 text-xs text-gray-500">Name cannot be changed</p>
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="email" className="block text-med font-medium text-black">
                        Email Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={profileData.email}
                          disabled
                          className="bg-gray-200 text-black w-full sm:text-black rounded-md cursor-not-allowed"
                        />
                        <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="fitnessGoal" className="block text-med font-medium text-black">
                        Primary Fitness Goal
                      </label>
                      <div className="mt-1">
                        <select
                          id="fitnessGoal"
                          name="fitnessGoal"
                          value={profileData.fitnessGoal}
                          onChange={(e) => setProfileData({...profileData, fitnessGoal: e.target.value})}
                          className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-black bg-gray-100 rounded-md"
                        >
                          <option value="">Select a goal</option>
                          <option value="weightLoss">Weight Loss</option>
                          <option value="muscleGain">Muscle Gain</option>
                          <option value="endurance">Improve Endurance</option>
                          <option value="strength">Increase Strength</option>
                          <option value="flexibility">Enhance Flexibility</option>
                          <option value="generalFitness">General Fitness</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label className="block text-med font-med text-black">
                        Dietary Preferences
                      </label>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {['vegan', 'vegetarian', 'pescatarian', 'keto', 'paleo', 'glutenFree', 'dairyFree'].map(pref => (
                          <div key={pref} className="flex items-center">
                            <input
                              id={pref}
                              name="dietaryPreferences"
                              type="checkbox"
                              checked={profileData.dietaryPreferences.includes(pref)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setProfileData({
                                    ...profileData, 
                                    dietaryPreferences: [...profileData.dietaryPreferences, pref]
                                  });
                                } else {
                                  setProfileData({
                                    ...profileData, 
                                    dietaryPreferences: profileData.dietaryPreferences.filter(p => p !== pref)
                                  });
                                }
                              }}
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor={pref} className="ml-2 text-sm text-gray-700">
                              {pref.charAt(0).toUpperCase() + pref.slice(1).replace(/([A-Z])/g, ' $1')}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      disabled={isSubmitting}
                      className={`inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}