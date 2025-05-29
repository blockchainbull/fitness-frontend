"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Calendar, Ruler, Weight, Eye, EyeOff } from 'lucide-react';
import { useOnboarding } from '@/context/OnboardingContext';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
  activityLevel: string;
}

interface HealthMetrics {
  bmi: number;
  bmr: number;
  tdee: number;
}

interface UserData {
  id?: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  activityLevel: string;
  bmi: number;
  bmr: number;
  tdee: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BasicInfoPageProps {
  userData?: Partial<UserData>;
  onNext?: (data: Partial<UserData>) => void;
  onBack?: () => void;
  showBackButton?: boolean;
}

const BasicInfoPage: React.FC<BasicInfoPageProps> = ({ 
  userData = {},
  onNext,
  onBack,
  showBackButton = true
}) => {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();
  
  const [formData, setFormData] = useState<FormData>({
    name: userData.name || '',
    email: userData.email || '',
    password: '',
    confirmPassword: '',
    gender: userData.gender || '',
    age: userData.age?.toString() || '',
    height: userData.height?.toString() || '',
    weight: userData.weight?.toString() || '',
    activityLevel: userData.activityLevel || ''
  });

  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>({
    bmi: userData.bmi || 0,
    bmr: userData.bmr || 0,
    tdee: userData.tdee || 0
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    gender?: string;
    age?: string;
    height?: string;
    weight?: string;
    activityLevel?: string;
  }>({});

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const activityLevels: string[] = [
    'Sedentary (little or no exercise)',
    'Lightly active (light exercise 1-3 days/week)',
    'Moderately active (moderate exercise 3-5 days/week)',
    'Very active (hard exercise 6-7 days/week)',
    'Extra active (very hard exercise & physical job)'
  ];

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const calculateHealthMetrics = (): void => {
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);
    const age = parseInt(formData.age);
    const gender = formData.gender;

    let bmi = 0;
    let bmr = 0;
    let tdee = 0;

    // Calculate BMI
    if (height && weight && height > 0) {
      const heightInMeters = height / 100;
      bmi = weight / (heightInMeters * heightInMeters);
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    if (height && weight && age && gender) {
      if (gender === 'Male' || gender === 'male') {
        bmr = Math.round(10 * weight + 6.25 * height - 5 * age + 5);
      } else if (gender === 'Female' || gender === 'female') {
        bmr = Math.round(10 * weight + 6.25 * height - 5 * age - 161);
      }
    }

    // Calculate TDEE
    if (bmr > 0 && formData.activityLevel) {
      let activityMultiplier = 1.2; // Default to sedentary
      
      if (formData.activityLevel.includes('Sedentary')) {
        activityMultiplier = 1.2;
      } else if (formData.activityLevel.includes('Lightly active')) {
        activityMultiplier = 1.375;
      } else if (formData.activityLevel.includes('Moderately active')) {
        activityMultiplier = 1.55;
      } else if (formData.activityLevel.includes('Very active')) {
        activityMultiplier = 1.725;
      } else if (formData.activityLevel.includes('Extra active')) {
        activityMultiplier = 1.9;
      }
      
      tdee = Math.round(bmr * activityMultiplier);
    }

    setHealthMetrics({ bmi, bmr, tdee });
  };

  useEffect(() => {
    calculateHealthMetrics();
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: any = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else {
      const age = Number(formData.age);
      if (isNaN(age) || age < 16 || age > 120) {
        newErrors.age = 'Age must be between 16 and 120';
      }
    }
    
    if (!formData.height) {
      newErrors.height = 'Height is required';
    } else {
      const height = Number(formData.height);
      if (isNaN(height) || height < 100 || height > 250) {
        newErrors.height = 'Height must be between 100cm and 250cm';
      }
    }
    
    if (!formData.weight) {
      newErrors.weight = 'Weight is required';
    } else {
      const weight = Number(formData.weight);
      if (isNaN(weight) || weight < 30 || weight > 300) {
        newErrors.weight = 'Weight must be between 30kg and 300kg';
      }
    }
    
    if (!formData.activityLevel) {
      newErrors.activityLevel = 'Activity level is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    if (validateForm()) {
      const updatedUserData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        age: parseInt(formData.age),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        activityLevel: formData.activityLevel,
        bmi: healthMetrics.bmi,
        bmr: healthMetrics.bmr,
        tdee: healthMetrics.tdee
      };

      console.log('User data:', updatedUserData);

      // Save to context
      updateOnboardingData('basicInfo', updatedUserData);

      // Call the onNext function if provided (for reusability)
      if (onNext) {
        onNext(updatedUserData);
      } else {
        // Default navigation behavior
        router.push('/onboarding/primary-health-goal');
      }
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
          <div className="bg-blue-500 h-2 rounded-full w-1/7"></div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Let's get to know you
          </h1>
          <p className="text-gray-600">
            We need some basic information to personalize your experience.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black bg-gray-50"
              />
            </div>
            {errors.name && <span className="text-red-500 text-sm mt-1 block">{errors.name}</span>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black bg-gray-50"
              />
            </div>
            {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email}</span>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password (min 6 characters)"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black bg-gray-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <span className="text-red-500 text-sm mt-1 block">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black bg-gray-50"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && <span className="text-red-500 text-sm mt-1 block">{errors.confirmPassword}</span>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleInputChange('gender', 'Male')}
                className={`p-4 rounded-lg border-2 flex items-center justify-center space-x-2 transition-all ${
                  formData.gender === 'Male'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">♂</span>
                <span className="font-semibold">Male</span>
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('gender', 'Female')}
                className={`p-4 rounded-lg border-2 flex items-center justify-center space-x-2 transition-all ${
                  formData.gender === 'Female'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">♀</span>
                <span className="font-semibold">Female</span>
              </button>
            </div>
            {errors.gender && <span className="text-red-500 text-sm mt-1 block">{errors.gender}</span>}
          </div>

          {/* Age, Height, Weight */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Age
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  placeholder="0"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black bg-gray-50"
                  min="16"
                  max="120"
                />
              </div>
              {errors.age && <span className="text-red-500 text-sm mt-1 block">{errors.age}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Height (cm)
              </label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  placeholder="0"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black bg-gray-50"
                  min="100"
                  max="250"
                />
              </div>
              {errors.height && <span className="text-red-500 text-sm mt-1 block">{errors.height}</span>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Weight (kg)
              </label>
              <div className="relative">
                <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  placeholder="0"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black bg-gray-50"
                  min="30"
                  max="300"
                  step="0.1"
                />
              </div>
              {errors.weight && <span className="text-red-500 text-sm mt-1 block">{errors.weight}</span>}
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Activity Level
            </label>
            <select
              value={formData.activityLevel}
              onChange={(e) => handleInputChange('activityLevel', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
            >
              <option value="">Select your activity level</option>
              {activityLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.activityLevel && <span className="text-red-500 text-sm mt-1 block">{errors.activityLevel}</span>}
          </div>

          {/* Next Button */}
          <div className="mt-8 flex justify-end">
            <button 
              type="submit"
              className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicInfoPage;