// src/app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { 
  User, 
  Mail, 
  Calendar, 
  Ruler, 
  Weight, 
  Activity, 
  Target, 
  Clock, 
  Moon, 
  Utensils, 
  Dumbbell, 
  MapPin,
  Edit3,
  BarChart3,
  Heart,
  Droplets,
  Save,
  X,
  Check
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, updateUser } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Redirect if user is not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Loading state
  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-50 py-12 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const sections = [
    { id: 'overview', label: 'Overview', icon: <User className="w-5 h-5" /> },
    { id: 'physical', label: 'Physical Stats', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'goals', label: 'Goals & Progress', icon: <Target className="w-5 h-5" /> },
    { id: 'nutrition', label: 'Nutrition', icon: <Utensils className="w-5 h-5" /> },
    { id: 'fitness', label: 'Fitness', icon: <Dumbbell className="w-5 h-5" /> },
    { id: 'lifestyle', label: 'Lifestyle', icon: <Heart className="w-5 h-5" /> },
  ];

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi >= 18.5 && bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi >= 25 && bmi < 30) return { category: 'Overweight', color: 'text-orange-600' };
    if (bmi >= 30) return { category: 'Obese', color: 'text-red-600' };
    return { category: 'N/A', color: 'text-gray-500' };
  };

  const formatActivityLevel = (level: string) => {
    if (!level) return 'Not specified';
    return level.charAt(0).toUpperCase() + level.slice(1).replace(/([A-Z])/g, ' $1');
  };

  // Handle editing functions
  const startEditing = (section: string) => {
    setEditingSection(section);
    
    // Initialize edit data with current user data
    const initialData = { ...user };
    
    // Ensure arrays are properly initialized
    if (section === 'fitness') {
      initialData.preferredWorkouts = user.preferredWorkouts || [];
      initialData.availableEquipment = user.availableEquipment || [];
    }
    
    if (section === 'nutrition') {
      initialData.dietaryPreferences = user.dietaryPreferences || [];
      initialData.medicalConditions = user.medicalConditions || [];
    }
    
    if (section === 'lifestyle') {
      initialData.sleepIssues = user.sleepIssues || [];
    }
    
    setEditData(initialData);
    setSaveMessage('');
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setEditData({});
    setSaveMessage('');
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      await updateUser(editData);
      
      setEditingSection(null);
      setEditData({});
      setSaveMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveMessage('Error updating profile. Please try again.');
      setTimeout(() => setSaveMessage(''), 5000);
    } finally {
      setSaving(false);
    }
  };

  const updateEditData = (field: string, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  // Render edit buttons
  const renderEditButton = (section: string) => {
    if (editingSection === section) {
      return (
        <div className="flex items-center space-x-2">
          <button 
            onClick={saveChanges}
            disabled={saving}
            className="text-green-600 hover:text-green-700 flex items-center space-x-1 bg-green-50 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span className="font-medium">{saving ? 'Saving...' : 'Save'}</span>
          </button>
          <button 
            onClick={cancelEditing}
            className="text-gray-600 hover:text-gray-700 flex items-center space-x-1 bg-gray-50 px-3 py-2 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            <span className="font-medium">Cancel</span>
          </button>
        </div>
      );
    }

    return (
      <button 
        onClick={() => startEditing(section)}
        className="text-green-600 hover:text-green-700 flex items-center space-x-1 bg-green-50 px-3 py-2 rounded-lg transition-colors"
      >
        <Edit3 className="w-4 h-4" />
        <span className="font-medium">Edit</span>
      </button>
    );
  };

  // Render input fields
  const renderInput = (field: string, type: string = 'text', options?: string[]) => {
    const value = editData[field] || '';
    
    if (type === 'select' && options) {
      return (
        <select
          value={value}
          onChange={(e) => updateEditData(field, e.target.value)}
          className="text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select...</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    if (type === 'number') {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => updateEditData(field, parseFloat(e.target.value) || '')}
          className="text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      );
    }

    if (type === 'time') {
      return (
        <input
          type="time"
          value={value}
          onChange={(e) => updateEditData(field, e.target.value)}
          className="text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      );
    }

    return (
      <input
        type={type}
        value={value}
        onChange={(e) => updateEditData(field, e.target.value)}
        className="text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    );
  };

  const renderValue = (field: string, value: any, type: string = 'text') => {
    if (editingSection === 'basic' && ['name', 'email', 'age', 'gender'].includes(field)) {
      if (field === 'gender') {
        return renderInput(field, 'select', ['male', 'female', 'other']);
      }
      if (field === 'age') {
        return renderInput(field, 'number');
      }
      return renderInput(field, type);
    }

    if (editingSection === 'physical' && ['height', 'weight', 'activityLevel'].includes(field)) {
      if (field === 'activityLevel') {
        return renderInput(field, 'select', ['sedentary', 'lightlyActive', 'moderatelyActive', 'veryActive', 'extraActive']);
      }
      return renderInput(field, 'number');
    }

    if (editingSection === 'goals' && ['primaryGoal', 'weightGoal', 'targetWeight'].includes(field)) {
      if (field === 'primaryGoal') {
        return renderInput(field, 'select', ['lose_weight', 'gain_weight', 'maintain_weight', 'build_muscle', 'improve_fitness', 'improve_health']);
      }
      if (field === 'weightGoal') {
        return renderInput(field, 'select', ['lose_weight', 'gain_weight', 'maintain_weight']);
      }
      if (field === 'targetWeight') {
        return renderInput(field, 'number');
      }
      return renderInput(field);
    }

    return <p className="text-lg font-semibold text-gray-900">{value || 'Not specified'}</p>;
  };

  const renderOverviewSection = () => (
    <div className="space-y-6">
      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-lg ${saveMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span>{saveMessage}</span>
          </div>
        </div>
      )}

      {/* Basic Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">Basic Information</h3>
          {renderEditButton('basic')}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Full Name</p>
              {renderValue('name', user.name)}
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full">
              <Mail className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
              {renderValue('email', user.email, 'email')}
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-purple-100 p-2 rounded-full">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Age</p>
              {renderValue('age', user.age)}
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-pink-100 p-2 rounded-full">
              <span className="w-5 h-5 text-pink-600 flex items-center justify-center text-lg font-bold">
                {user.gender === 'male' ? '♂' : user.gender === 'female' ? '♀' : '⚪'}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Gender</p>
              {renderValue('gender', user.gender)}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-green-500 pb-2">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <p className="text-3xl font-bold text-blue-600 mb-2">{user.height || 0}</p>
            <p className="text-sm font-semibold text-blue-700">Height (cm)</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
            <p className="text-3xl font-bold text-green-600 mb-2">{user.weight || 0}</p>
            <p className="text-sm font-semibold text-green-700">Weight (kg)</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
            <p className="text-3xl font-bold text-purple-600 mb-2">{user.bmi?.toFixed(1) || 'N/A'}</p>
            <p className="text-sm font-semibold text-purple-700">BMI</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
            <p className="text-3xl font-bold text-orange-600 mb-2">{user.bmr || 'N/A'}</p>
            <p className="text-sm font-semibold text-orange-700">BMR</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPhysicalSection = () => (
    <div className="space-y-6">
      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-lg ${saveMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span>{saveMessage}</span>
          </div>
        </div>
      )}

      {/* Physical Measurements */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">Physical Measurements</h3>
          {renderEditButton('physical')}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full">
              <Ruler className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Height</p>
              {renderValue('height', user.height ? `${user.height} cm` : null)}
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full">
              <Weight className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Weight</p>
              {renderValue('weight', user.weight ? `${user.weight} kg` : null)}
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-purple-100 p-2 rounded-full">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Activity Level</p>
              {renderValue('activityLevel', formatActivityLevel(user.activityLevel || ''))}
            </div>
          </div>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-green-500 pb-2">Health Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {user.bmi?.toFixed(1) || 'N/A'}
            </div>
            <div className="text-sm font-semibold text-gray-600 mb-2">BMI</div>
            {user.bmi && (
              <div className={`text-sm font-semibold px-3 py-1 rounded-full ${getBmiCategory(user.bmi).color} bg-white`}>
                {getBmiCategory(user.bmi).category}
              </div>
            )}
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {user.bmr || 'N/A'}
            </div>
            <div className="text-sm font-semibold text-gray-600">BMR (cal/day)</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {user.tdee || 'N/A'}
            </div>
            <div className="text-sm font-semibold text-gray-600">TDEE (cal/day)</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGoalsSection = () => (
    <div className="space-y-6">
      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-lg ${saveMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span>{saveMessage}</span>
          </div>
        </div>
      )}

      {/* Primary Goals */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">Primary Goals</h3>
          {renderEditButton('goals')}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-red-100 p-2 rounded-full">
              <Target className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Primary Goal</p>
              {renderValue('primaryGoal', user.primaryGoal || user.fitnessGoal)}
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full">
              <Weight className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Weight Goal</p>
              {renderValue('weightGoal', user.weightGoal)}
            </div>
          </div>
          {(user.targetWeight || editingSection === 'goals') && (
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">Target Weight</p>
                {renderValue('targetWeight', user.targetWeight ? `${user.targetWeight} kg` : null)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderNutritionSection = () => (
    <div className="space-y-6">
      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-lg ${saveMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span>{saveMessage}</span>
          </div>
        </div>
      )}

      {/* Dietary Preferences */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">Dietary Preferences</h3>
          {renderEditButton('nutrition')}
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-3">Dietary Restrictions</p>
            {editingSection === 'nutrition' ? (
              <div className="space-y-2">
                {['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'keto', 'paleo', 'low_carb', 'low_fat'].map(diet => (
                  <label key={diet} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editData.dietaryPreferences?.includes(diet) || false}
                      onChange={(e) => {
                        const current = editData.dietaryPreferences || [];
                        if (e.target.checked) {
                          updateEditData('dietaryPreferences', [...current, diet]);
                        } else {
                          updateEditData('dietaryPreferences', current.filter(d => d !== diet));
                        }
                      }}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {diet.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              user.dietaryPreferences && user.dietaryPreferences.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.dietaryPreferences.map((pref, index) => (
                    <span key={index} className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-semibold border border-green-200">
                      {pref.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No dietary restrictions specified</p>
              )
            )}
          </div>
          
          {(user.waterIntake || editingSection === 'nutrition') && (
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <Droplets className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">Daily Water Goal (liters)</p>
                {renderValue('waterIntake', user.waterIntake ? `${user.waterIntake} liters` : null)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Medical Conditions */}
      {(user.medicalConditions && user.medicalConditions.length > 0) || editingSection === 'nutrition' ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-red-500 pb-2">Medical Considerations</h3>
          {editingSection === 'nutrition' ? (
            <div className="space-y-2">
              {['diabetes', 'hypertension', 'heart_disease', 'high_cholesterol', 'food_allergies', 'other'].map(condition => (
                <label key={condition} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editData.medicalConditions?.includes(condition) || false}
                    onChange={(e) => {
                      const current = editData.medicalConditions || [];
                      if (e.target.checked) {
                        updateEditData('medicalConditions', [...current, condition]);
                      } else {
                        updateEditData('medicalConditions', current.filter(c => c !== condition));
                      }
                    }}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {condition.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 mb-4">
              {user.medicalConditions?.map((condition, index) => (
                <span key={index} className="px-4 py-2 bg-red-100 text-red-800 rounded-lg text-sm font-semibold border border-red-200">
                  {condition.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );

  const renderFitnessSection = () => (
    <div className="space-y-6">
      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-lg ${saveMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span>{saveMessage}</span>
          </div>
        </div>
      )}

      {/* Workout Preferences */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">Workout Preferences</h3>
          {renderEditButton('fitness')}
        </div>
        <div className="space-y-6">
          {/* Preferred Workout Types */}
          {(user.preferredWorkouts && user.preferredWorkouts.length > 0) || editingSection === 'fitness' ? (
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">Preferred Workout Types</p>
              {editingSection === 'fitness' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['cardio', 'strength_training', 'yoga', 'pilates', 'swimming', 'running', 'cycling', 'sports', 'hiking', 'dancing'].map(workout => (
                    <label key={workout} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={editData.preferredWorkouts?.includes(workout) || false}
                        onChange={(e) => {
                          const current = editData.preferredWorkouts || [];
                          if (e.target.checked) {
                            updateEditData('preferredWorkouts', [...current, workout]);
                          } else {
                            updateEditData('preferredWorkouts', current.filter(w => w !== workout));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {workout.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user.preferredWorkouts?.map((workout, index) => (
                    <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-semibold border border-blue-200">
                      {workout.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : null}
          
          {/* Workout Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(user.workoutFrequency || editingSection === 'fitness') && (
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-green-100 p-2 rounded-full">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">Frequency (days/week)</p>
                  {editingSection === 'fitness' ? 
                    <input
                      type="number"
                      value={editData.workoutFrequency || ''}
                      onChange={(e) => updateEditData('workoutFrequency', parseInt(e.target.value) || '')}
                      className="text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-green-500"
                      min="1"
                      max="7"
                    /> :
                    <p className="text-lg font-semibold text-gray-900">{user.workoutFrequency ? `${user.workoutFrequency} days/week` : 'Not specified'}</p>
                  }
                </div>
              </div>
            )}
            
            {(user.workoutDuration || editingSection === 'fitness') && (
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">Duration (minutes)</p>
                  {editingSection === 'fitness' ? 
                    <input
                      type="number"
                      value={editData.workoutDuration || ''}
                      onChange={(e) => updateEditData('workoutDuration', parseInt(e.target.value) || '')}
                      className="text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-green-500"
                      min="5"
                      max="300"
                    /> :
                    <p className="text-lg font-semibold text-gray-900">{user.workoutDuration ? `${user.workoutDuration} minutes` : 'Not specified'}</p>
                  }
                </div>
              </div>
            )}
            
            {(user.fitnessLevel || editingSection === 'fitness') && (
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-red-100 p-2 rounded-full">
                  <BarChart3 className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">Fitness Level</p>
                  {editingSection === 'fitness' ? 
                    <select
                      value={editData.fitnessLevel || ''}
                      onChange={(e) => updateEditData('fitnessLevel', e.target.value)}
                      className="text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select...</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select> :
                    <p className="text-lg font-semibold text-gray-900">{user.fitnessLevel ? user.fitnessLevel.charAt(0).toUpperCase() + user.fitnessLevel.slice(1) : 'Not specified'}</p>
                  }
                </div>
              </div>
            )}
            
            {(user.workoutLocation || editingSection === 'fitness') && (
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">Workout Location</p>
                  {editingSection === 'fitness' ? 
                    <select
                      value={editData.workoutLocation || ''}
                      onChange={(e) => updateEditData('workoutLocation', e.target.value)}
                      className="text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select...</option>
                      <option value="home">Home</option>
                      <option value="gym">Gym</option>
                      <option value="outdoors">Outdoors</option>
                      <option value="studio">Studio</option>
                    </select> :
                    <p className="text-lg font-semibold text-gray-900">{user.workoutLocation ? user.workoutLocation.charAt(0).toUpperCase() + user.workoutLocation.slice(1) : 'Not specified'}</p>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Available Equipment Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-purple-500 pb-2">Available Equipment</h3>
        {editingSection === 'fitness' ? (
          <div>
            <p className="text-sm font-medium text-gray-500 mb-3">Select available equipment</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {[
                'dumbbells', 'barbells', 'resistance_bands', 'kettlebells', 'pull_up_bar', 
                'treadmill', 'stationary_bike', 'elliptical', 'rowing_machine', 'yoga_mat',
                'foam_roller', 'medicine_ball', 'stability_ball', 'jump_rope', 'bench',
                'squat_rack', 'cable_machine', 'smith_machine', 'none'
              ].map(equipment => (
                <label key={equipment} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={editData.availableEquipment?.includes(equipment) || false}
                    onChange={(e) => {
                      const current = editData.availableEquipment || [];
                      if (e.target.checked) {
                        // If "none" is selected, clear all others
                        if (equipment === 'none') {
                          updateEditData('availableEquipment', ['none']);
                        } else {
                          // If any other equipment is selected, remove "none"
                          const filtered = current.filter(eq => eq !== 'none');
                          updateEditData('availableEquipment', [...filtered, equipment]);
                        }
                      } else {
                        updateEditData('availableEquipment', current.filter(eq => eq !== equipment));
                      }
                    }}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {equipment.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {user.availableEquipment && user.availableEquipment.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.availableEquipment.map((equipment, index) => (
                  <span key={index} className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-semibold border border-purple-200">
                    {equipment.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No equipment specified</p>
            )}
          </div>
        )}
      </div>

      {/* Personal Trainer Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-orange-500 pb-2">Training Support</h3>
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <div className="bg-orange-100 p-2 rounded-full">
            <User className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-1">Personal Trainer</p>
            {editingSection === 'fitness' ? 
              <select
                value={editData.hasTrainer !== undefined ? editData.hasTrainer.toString() : ''}
                onChange={(e) => updateEditData('hasTrainer', e.target.value === 'true')}
                className="text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select> :
              <p className="text-lg font-semibold text-gray-900">
                {user.hasTrainer !== undefined ? (user.hasTrainer ? 'Yes' : 'No') : 'Not specified'}
              </p>
            }
          </div>
        </div>
      </div>
    </div>
  );

  const renderLifestyleSection = () => (
    <div className="space-y-6">
      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-lg ${saveMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span>{saveMessage}</span>
          </div>
        </div>
      )}

      {/* Sleep Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">Sleep Schedule</h3>
          {renderEditButton('lifestyle')}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(user.sleepHours || editingSection === 'lifestyle') && (
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">Sleep Duration (hours)</p>
                {editingSection === 'lifestyle' ? 
                  renderInput('sleepHours', 'number') :
                  <p className="text-lg font-semibold text-gray-900">{user.sleepHours ? `${user.sleepHours} hours` : 'Not specified'}</p>
                }
              </div>
            </div>
          )}
          
          {(user.bedtime || editingSection === 'lifestyle') && (
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 p-2 rounded-full">
                <Moon className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">Bedtime</p>
                {editingSection === 'lifestyle' ? 
                  renderInput('bedtime', 'time') :
                  <p className="text-lg font-semibold text-gray-900">{user.bedtime || 'Not specified'}</p>
                }
              </div>
            </div>
          )}
          
          {(user.wakeupTime || editingSection === 'lifestyle') && (
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-yellow-100 p-2 rounded-full">
                <span className="w-5 h-5 text-yellow-600 flex items-center justify-center text-lg">☀️</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">Wake Up Time</p>
                {editingSection === 'lifestyle' ? 
                  renderInput('wakeupTime', 'time') :
                  <p className="text-lg font-semibold text-gray-900">{user.wakeupTime || 'Not specified'}</p>
                }
              </div>
            </div>
          )}
        </div>
        
        {(user.sleepIssues && user.sleepIssues.length > 0) || editingSection === 'lifestyle' ? (
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-500 mb-3">Sleep Issues</p>
            {editingSection === 'lifestyle' ? (
              <div className="space-y-2">
                {['insomnia', 'sleep_apnea', 'restless_sleep', 'frequent_waking', 'difficulty_falling_asleep'].map(issue => (
                  <label key={issue} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editData.sleepIssues?.includes(issue) || false}
                      onChange={(e) => {
                        const current = editData.sleepIssues || [];
                        if (e.target.checked) {
                          updateEditData('sleepIssues', [...current, issue]);
                        } else {
                          updateEditData('sleepIssues', current.filter(i => i !== issue));
                        }
                      }}
                      className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {issue.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {user.sleepIssues?.map((issue, index) => (
                  <span key={index} className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-semibold border border-yellow-200">
                    {issue.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverviewSection();
      case 'physical':
        return renderPhysicalSection();
      case 'goals':
        return renderGoalsSection();
      case 'nutrition':
        return renderNutritionSection();
      case 'fitness':
        return renderFitnessSection();
      case 'lifestyle':
        return renderLifestyleSection();
      default:
        return renderOverviewSection();
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-16 w-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.name}'s Profile</h1>
                <p className="text-gray-600">Manage your health and fitness information</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-green-100 text-green-700 border border-green-200 shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <div className={`${
                        activeSection === section.id ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {section.icon}
                      </div>
                      <span className="font-medium">{section.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}