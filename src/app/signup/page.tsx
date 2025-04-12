// src/app/signup/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, user, loading, error: authError } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    fitnessGoal: searchParams.get('plan') || '',
    dietaryPreferences: [] as string[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState('');

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push('/chat');
    }
  }, [user, router]);

  const fitnessGoals = [
    { id: 'weightLoss', label: 'Weight Loss' },
    { id: 'muscleGain', label: 'Muscle Gain' },
    { id: 'endurance', label: 'Improve Endurance' },
    { id: 'strength', label: 'Increase Strength' },
    { id: 'flexibility', label: 'Enhance Flexibility' },
    { id: 'generalFitness', label: 'General Fitness' }
  ];

  const dietaryPreferences = [
    { id: 'vegan', label: 'Vegan' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'pescatarian', label: 'Pescatarian' },
    { id: 'keto', label: 'Keto' },
    { id: 'paleo', label: 'Paleo' },
    { id: 'glutenFree', label: 'Gluten-Free' },
    { id: 'dairyFree', label: 'Dairy-Free' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDietaryPreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    setFormData(prev => {
      const updatedPreferences = checked
        ? [...prev.dietaryPreferences, value]
        : prev.dietaryPreferences.filter(pref => pref !== value);
      
      return {
        ...prev,
        dietaryPreferences: updatedPreferences
      };
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.fitnessGoal) {
      newErrors.fitnessGoal = 'Please select a fitness goal';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setGeneralError('');
    
    try {
      // Prepare data for registration
      await register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        fitnessGoal: formData.fitnessGoal,
        dietaryPreferences: formData.dietaryPreferences
      });
      
      // Redirect will happen automatically due to the useEffect
    } catch (error) {
      setGeneralError((error as Error).message || 'An error occurred during registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="bg-white shadow rounded-lg p-6 md:p-8">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
              Get Started with FitMind AI
            </h1>
            
            {(generalError || authError) && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                {generalError || authError}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md shadow-sm ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md shadow-sm ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md shadow-sm ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md shadow-sm ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700 mb-1">
                  What is your primary fitness goal?
                </label>
                <select
                  id="fitnessGoal"
                  name="fitnessGoal"
                  value={formData.fitnessGoal}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md shadow-sm ${
                    errors.fitnessGoal ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                >
                  <option value="">Select a goal</option>
                  {fitnessGoals.map(goal => (
                    <option key={goal.id} value={goal.id}>{goal.label}</option>
                  ))}
                </select>
                {errors.fitnessGoal && (
                  <p className="mt-1 text-sm text-red-600">{errors.fitnessGoal}</p>
                )}
              </div>
              
              <div className="mb-8">
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have any dietary preferences? (Optional)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {dietaryPreferences.map(pref => (
                    <div key={pref.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={pref.id}
                        name="dietaryPreferences"
                        value={pref.id}
                        checked={formData.dietaryPreferences.includes(pref.id)}
                        onChange={handleDietaryPreferenceChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor={pref.id} className="ml-2 text-sm text-gray-700">
                        {pref.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className={`w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                    (isSubmitting || loading) ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting || loading ? 'Creating your account...' : 'Create Free Account'}
                </button>
                
                <p className="mt-4 text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-green-600 hover:text-green-500">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}