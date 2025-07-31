// src/app/profile/page.tsx - Complete updated code with section-specific editing
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
  Check,
  Lock,
  Info,
  AlertTriangle
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, updateUser } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Initialize fieldRestrictions with default values to prevent undefined errors
  const [fieldRestrictions, setFieldRestrictions] = useState({
    readonly_fields: ['name', 'email', 'age', 'gender'],
    editable_fields: [],
    restriction_reason: {
      name: 'Name cannot be changed for security reasons',
      email: 'Email cannot be changed as it is used for login',
      age: 'Age cannot be modified after account creation', 
      gender: 'Gender cannot be modified after account creation'
    }
  });

  // Loading state for field restrictions
  const [restrictionsLoading, setRestrictionsLoading] = useState(true);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fetch field restrictions when user loads
  useEffect(() => {
    if (user?.id) {
      fetchFieldRestrictions();
    }
  }, [user]);

  const fetchFieldRestrictions = async () => {
    setRestrictionsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/user/${user.id}/editable-fields`);
      if (response.ok) {
        const restrictions = await response.json();
        setFieldRestrictions(restrictions);
      } else {
        console.warn('Failed to fetch field restrictions, using defaults');
        // Keep default restrictions already set in state
      }
    } catch (error) {
      console.error('Error fetching field restrictions:', error);
      // Keep default restrictions already set in state
    } finally {
      setRestrictionsLoading(false);
    }
  };

  // Loading state
  if (loading || !user || restrictionsLoading) {
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

  const isFieldReadonly = (fieldName: string): boolean => {
    // Safe access with fallback
    return fieldRestrictions?.readonly_fields?.includes(fieldName) || false;
  };

  const getFieldRestrictionMessage = (fieldName: string): string => {
    // Safe access with fallback
    return fieldRestrictions?.restriction_reason?.[fieldName] || 'This field cannot be modified';
  };

  // UPDATED: Section-specific editing initialization
  const startEditing = (section: string) => {
    // Don't allow editing basic section if it only contains readonly fields
    if (section === 'basic') {
      setSaveMessage('Cannot edit basic information: Name, email, age, and gender are readonly fields.');
      setTimeout(() => setSaveMessage(''), 4000);
      return;
    }

    setEditingSection(section);
    
    // ONLY initialize data relevant to the section being edited
    let initialData: any = {};
    
    switch (section) {
      case 'physical':
        initialData = {
          height: user.height,
          weight: user.weight,
          activity_level: user.activity_level || user.activityLevel
        };
        break;
        
      case 'goals':
        initialData = {
          primary_goal: user.primary_goal || user.primaryGoal,
          fitness_goal: user.fitness_goal || user.fitnessGoal,
          weight_goal: user.weight_goal || user.weightGoal,
          target_weight: user.target_weight || user.targetWeight,
          goal_timeline: user.goal_timeline || user.goalTimeline
        };
        break;
        
      case 'nutrition':
        initialData = {
          dietary_preferences: user.dietary_preferences || user.dietaryPreferences || [],
          water_intake: user.water_intake || user.waterIntake,
          medical_conditions: user.medical_conditions || user.medicalConditions || [],
          other_medical_condition: user.other_medical_condition || user.otherMedicalCondition
        };
        break;
        
      case 'fitness':
        initialData = {
          preferred_workouts: user.preferred_workouts || user.preferredWorkouts || [],
          workout_frequency: user.workout_frequency || user.workoutFrequency,
          workout_duration: user.workout_duration || user.workoutDuration,
          workout_location: user.workout_location || user.workoutLocation,
          available_equipment: user.available_equipment || user.availableEquipment || [],
          fitness_level: user.fitness_level || user.fitnessLevel,
          has_trainer: user.has_trainer || user.hasTrainer
        };
        break;
        
      case 'lifestyle':
        initialData = {
          sleep_hours: user.sleep_hours || user.sleepHours,
          bedtime: user.bedtime,
          wakeup_time: user.wakeup_time || user.wakeupTime,
          sleep_issues: user.sleep_issues || user.sleepIssues || []
        };
        break;
        
      default:
        initialData = {};
    }
    
    console.log(`🔍 Editing section: ${section}, Initial data:`, initialData);
    setEditData(initialData);
    setSaveMessage('');
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setEditData({});
    setSaveMessage('');
  };

  // UPDATED: Section-specific saving
  const saveChanges = async () => {
    setSaving(true);
    try {
      // Prepare update data based on the section being edited
      let updateData: any = {};
      
      // Only include fields relevant to the current editing section
      switch (editingSection) {
        case 'physical':
          if (editData.height !== undefined && editData.height !== '') {
            updateData.height = parseFloat(editData.height) || null;
          }
          if (editData.weight !== undefined && editData.weight !== '') {
            updateData.weight = parseFloat(editData.weight) || null;
          }
          if (editData.activity_level !== undefined && editData.activity_level !== '') {
            updateData.activity_level = editData.activity_level;
          }
          break;
          
        case 'goals':
          if (editData.primary_goal !== undefined) updateData.primary_goal = editData.primary_goal;
          if (editData.fitness_goal !== undefined) updateData.fitness_goal = editData.fitness_goal;
          if (editData.weight_goal !== undefined) updateData.weight_goal = editData.weight_goal;
          if (editData.target_weight !== undefined && editData.target_weight !== '') {
            updateData.target_weight = parseFloat(editData.target_weight) || null;
          }
          if (editData.goal_timeline !== undefined) updateData.goal_timeline = editData.goal_timeline;
          break;
          
        case 'nutrition':
          if (editData.dietary_preferences !== undefined) {
            updateData.dietary_preferences = editData.dietary_preferences;
          }
          if (editData.water_intake !== undefined && editData.water_intake !== '') {
            updateData.water_intake = parseFloat(editData.water_intake) || null;
          }
          if (editData.medical_conditions !== undefined) {
            updateData.medical_conditions = editData.medical_conditions;
          }
          if (editData.other_medical_condition !== undefined) {
            updateData.other_medical_condition = editData.other_medical_condition;
          }
          break;
          
        case 'fitness':
          if (editData.preferred_workouts !== undefined) {
            updateData.preferred_workouts = editData.preferred_workouts;
          }
          if (editData.workout_frequency !== undefined && editData.workout_frequency !== '') {
            updateData.workout_frequency = parseInt(editData.workout_frequency) || null;
          }
          if (editData.workout_duration !== undefined && editData.workout_duration !== '') {
            updateData.workout_duration = parseInt(editData.workout_duration) || null;
          }
          if (editData.workout_location !== undefined) {
            updateData.workout_location = editData.workout_location;
          }
          if (editData.available_equipment !== undefined) {
            updateData.available_equipment = editData.available_equipment;
          }
          if (editData.fitness_level !== undefined) {
            updateData.fitness_level = editData.fitness_level;
          }
          if (editData.has_trainer !== undefined) {
            updateData.has_trainer = editData.has_trainer;
          }
          break;
          
        case 'lifestyle':
          if (editData.sleep_hours !== undefined && editData.sleep_hours !== '') {
            updateData.sleep_hours = parseFloat(editData.sleep_hours) || null;
          }
          if (editData.bedtime !== undefined) updateData.bedtime = editData.bedtime;
          if (editData.wakeup_time !== undefined) updateData.wakeup_time = editData.wakeup_time;
          if (editData.sleep_issues !== undefined) updateData.sleep_issues = editData.sleep_issues;
          break;
          
        default:
          console.error('Unknown section being edited:', editingSection);
          setSaveMessage('Error: Unknown section being edited');
          return;
      }

      console.log(`🔍 Saving section: ${editingSection}, Update data:`, updateData);

      // Only proceed if there's actually data to update
      if (Object.keys(updateData).length === 0) {
        setSaveMessage('No changes to save');
        setTimeout(() => setSaveMessage(''), 3000);
        return;
      }

      console.log(`🔍 Frontend sending to backend:`, updateData);

      const response = await fetch(`http://127.0.0.1:8000/update-user/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Update failed:', errorData);
        throw new Error(errorData.detail || 'Update failed');
      }

      const updatedUser = await response.json();
      console.log(`🔍 Backend returned:`, updatedUser);
      
      // Update the user in your auth context
      await updateUser(updatedUser);
      
      setEditingSection(null);
      setEditData({});
      setSaveMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      
      const errorMessage = (error as any)?.message || '';
      if (errorMessage.includes('readonly') || errorMessage.includes('Cannot update')) {
        setSaveMessage('Cannot update restricted fields: name, email, age, and gender cannot be modified.');
      } else if (errorMessage.includes('validation')) {
        setSaveMessage('Invalid data provided. Please check your inputs.');
      } else {
        setSaveMessage(`Error updating profile: ${errorMessage}`);
      }
      setTimeout(() => setSaveMessage(''), 5000);
    } finally {
      setSaving(false);
    }
  };

  const updateEditData = (field: string, value: any) => {
    // Check if field is readonly
    if (isFieldReadonly(field)) {
      setSaveMessage(`Cannot modify ${field}: ${getFieldRestrictionMessage(field)}`);
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    console.log(`🔍 Updating field: ${field} with value: ${value}`);
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  // Render edit buttons with restrictions
  const renderEditButton = (section: string) => {
    // Don't show edit button for basic section (readonly fields only)
    if (section === 'basic') {
      return (
        <div className="flex items-center space-x-2 text-gray-500">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">Readonly Fields</span>
        </div>
      );
    }

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

  // Render input fields with readonly handling
  const renderInput = (field: string, type: string = 'text', options?: string[]) => {
    const value = editData[field] || '';
    const readonly = isFieldReadonly(field);
    
    // Common readonly styling
    const readonlyClass = readonly 
      ? "bg-gray-100 text-gray-700 cursor-not-allowed border-gray-300" 
      : "bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500";
    
    if (type === 'select' && options) {
      return (
        <select
          value={value}
          onChange={(e) => updateEditData(field, e.target.value)}
          disabled={readonly}
          className={`text-lg font-semibold rounded px-2 py-1 ${readonlyClass}`}
          title={readonly ? getFieldRestrictionMessage(field) : ''}
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
          disabled={readonly}
          className={`text-lg font-semibold rounded px-2 py-1 w-24 ${readonlyClass}`}
          title={readonly ? getFieldRestrictionMessage(field) : ''}
        />
      );
    }

    if (type === 'time') {
      return (
        <input
          type="time"
          value={value}
          onChange={(e) => updateEditData(field, e.target.value)}
          disabled={readonly}
          className={`text-lg font-semibold rounded px-2 py-1 ${readonlyClass}`}
          title={readonly ? getFieldRestrictionMessage(field) : ''}
        />
      );
    }

    return (
      <input
        type={type}
        value={value}
        onChange={(e) => updateEditData(field, e.target.value)}
        disabled={readonly}
        className={`text-lg font-semibold rounded px-2 py-1 ${readonlyClass}`}
        title={readonly ? getFieldRestrictionMessage(field) : ''}
      />
    );
  };

  // UPDATED: Better field mapping for specific sections
  const renderValue = (field: string, value: any, type: string = 'text') => {
    // For basic section fields, show readonly state
    if (editingSection === 'basic' && ['name', 'email', 'age', 'gender'].includes(field)) {
      return (
        <div className="flex items-center space-x-2">
          <p className="text-lg font-semibold text-gray-700">{value || 'Not specified'}</p>
          <Lock className="w-4 h-4 text-gray-400" title={getFieldRestrictionMessage(field)} />
        </div>
      );
    }

    // Physical section fields
    if (editingSection === 'physical' && ['height', 'weight', 'activity_level'].includes(field)) {
      if (field === 'activity_level') {
        return renderInput(field, 'select', ['Sedentary', 'Lightly active', 'Moderately active', 'Very active', 'Extra active']);
      }
      return renderInput(field, 'number');
    }

    // Goals section fields
    if (editingSection === 'goals' && ['primary_goal', 'fitness_goal', 'weight_goal', 'target_weight', 'goal_timeline'].includes(field)) {
      if (field === 'primary_goal') {
        return renderInput(field, 'select', ['lose_weight', 'gain_weight', 'maintain_weight', 'build_muscle', 'improve_fitness', 'improve_health']);
      }
      if (field === 'weight_goal') {
        return renderInput(field, 'select', ['lose_weight', 'gain_weight', 'maintain_weight']);
      }
      if (field === 'target_weight') {
        return renderInput(field, 'number');
      }
      return renderInput(field);
    }

    // Fitness section fields
    if (editingSection === 'fitness') {
      if (field === 'workout_frequency') {
        return renderInput(field, 'number');
      }
      if (field === 'workout_duration') {
        return renderInput(field, 'number');
      }
      if (field === 'fitness_level') {
        return renderInput(field, 'select', ['beginner', 'intermediate', 'advanced']);
      }
      if (field === 'workout_location') {
        return renderInput(field, 'select', ['home', 'gym', 'outdoors', 'studio']);
      }
      if (field === 'has_trainer') {
        return renderInput(field, 'select', ['true', 'false']);
      }
    }

    // Lifestyle section fields
    if (editingSection === 'lifestyle') {
      if (field === 'sleep_hours') {
        return renderInput(field, 'number');
      }
      if (field === 'bedtime' || field === 'wakeup_time') {
        return renderInput(field, 'time');
      }
    }

    return <p className="text-lg font-semibold text-gray-900">{value || 'Not specified'}</p>;
  };

  const renderOverviewSection = () => (
    <div className="space-y-6">
      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-lg ${
          saveMessage.includes('Error') || saveMessage.includes('Cannot') 
            ? 'bg-red-100 text-red-700 border border-red-200' 
            : 'bg-green-100 text-green-700 border border-green-200'
        }`}>
          <div className="flex items-center space-x-2">
            {saveMessage.includes('Error') || saveMessage.includes('Cannot') ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <Check className="w-5 h-5" />
            )}
            <span>{saveMessage}</span>
          </div>
        </div>
      )}

      {/* Field Restrictions Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Profile Field Restrictions</h4>
            <p className="text-sm text-blue-700 mt-1">
              For security and data integrity, your name, email, age, and gender cannot be modified. 
              These fields were set during account creation and remain permanent.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Info Card - With readonly indicators */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 border-b-2 border-green-500 pb-2">Basic Information</h3>
          {renderEditButton('basic')}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <Lock className="w-3 h-3 text-gray-400" title={getFieldRestrictionMessage('name')} />
              </div>
              <p className="text-lg font-semibold text-gray-700">{user.name}</p>
              <p className="text-xs text-gray-500 mt-1">{getFieldRestrictionMessage('name')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="bg-green-100 p-2 rounded-full">
              <Mail className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <Lock className="w-3 h-3 text-gray-400" title={getFieldRestrictionMessage('email')} />
              </div>
              <p className="text-lg font-semibold text-gray-700">{user.email}</p>
              <p className="text-xs text-gray-500 mt-1">{getFieldRestrictionMessage('email')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="bg-purple-100 p-2 rounded-full">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-sm font-medium text-gray-500">Age</p>
                <Lock className="w-3 h-3 text-gray-400" title={getFieldRestrictionMessage('age')} />
              </div>
              <p className="text-lg font-semibold text-gray-700">{user.age || 'Not specified'}</p>
              <p className="text-xs text-gray-500 mt-1">{getFieldRestrictionMessage('age')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="bg-pink-100 p-2 rounded-full">
              <span className="w-5 h-5 text-pink-600 flex items-center justify-center text-lg font-bold">
                {user.gender === 'male' ? '♂' : user.gender === 'female' ? '♀' : '⚪'}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-sm font-medium text-gray-500">Gender</p>
                <Lock className="w-3 h-3 text-gray-400" title={getFieldRestrictionMessage('gender')} />
              </div>
              <p className="text-lg font-semibold text-gray-700">
                {user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not specified'}
              </p>
              <p className="text-xs text-gray-500 mt-1">{getFieldRestrictionMessage('gender')}</p>
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
             <p className="text-sm font-medium text-gray-500 mb-1">Height (cm)</p>
             {renderValue('height', user.height)}
           </div>
         </div>
         <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
           <div className="bg-green-100 p-2 rounded-full">
             <Weight className="w-5 h-5 text-green-600" />
           </div>
           <div className="flex-1">
             <p className="text-sm font-medium text-gray-500 mb-1">Weight (kg)</p>
             {renderValue('weight', user.weight)}
           </div>
         </div>
         <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
           <div className="bg-purple-100 p-2 rounded-full">
             <Activity className="w-5 h-5 text-purple-600" />
           </div>
           <div className="flex-1">
             <p className="text-sm font-medium text-gray-500 mb-1">Activity Level</p>
             {renderValue('activity_level', formatActivityLevel(user.activity_level || user.activityLevel || ''))}
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
             {renderValue('primary_goal', user.primary_goal || user.primaryGoal)}
           </div>
         </div>
         <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
           <div className="bg-blue-100 p-2 rounded-full">
             <Weight className="w-5 h-5 text-blue-600" />
           </div>
           <div className="flex-1">
             <p className="text-sm font-medium text-gray-500 mb-1">Weight Goal</p>
             {renderValue('weight_goal', user.weight_goal || user.weightGoal)}
           </div>
         </div>
         {(user.target_weight || user.targetWeight || editingSection === 'goals') && (
           <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
             <div className="bg-green-100 p-2 rounded-full">
               <Target className="w-5 h-5 text-green-600" />
             </div>
             <div className="flex-1">
               <p className="text-sm font-medium text-gray-500 mb-1">Target Weight (kg)</p>
               {renderValue('target_weight', user.target_weight || user.targetWeight)}
             </div>
           </div>
         )}
         {(user.goal_timeline || user.goalTimeline || editingSection === 'goals') && (
           <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
             <div className="bg-purple-100 p-2 rounded-full">
               <Calendar className="w-5 h-5 text-purple-600" />
             </div>
             <div className="flex-1">
               <p className="text-sm font-medium text-gray-500 mb-1">Goal Timeline</p>
               {renderValue('goal_timeline', user.goal_timeline || user.goalTimeline)}
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
                     checked={editData.dietary_preferences?.includes(diet) || false}
                     onChange={(e) => {
                       const current = editData.dietary_preferences || [];
                       if (e.target.checked) {
                         updateEditData('dietary_preferences', [...current, diet]);
                       } else {
                         updateEditData('dietary_preferences', current.filter(d => d !== diet));
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
             (user.dietary_preferences || user.dietaryPreferences) && (user.dietary_preferences || user.dietaryPreferences).length > 0 ? (
               <div className="flex flex-wrap gap-2">
                 {(user.dietary_preferences || user.dietaryPreferences).map((pref: string, index: number) => (
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
         
         {((user.water_intake || user.waterIntake) || editingSection === 'nutrition') && (
           <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
             <div className="bg-blue-100 p-2 rounded-full">
               <Droplets className="w-5 h-5 text-blue-600" />
             </div>
             <div className="flex-1">
               <p className="text-sm font-medium text-gray-500 mb-1">Daily Water Goal (liters)</p>
               {editingSection === 'nutrition' ? 
                 renderInput('water_intake', 'number') :
                 <p className="text-lg font-semibold text-gray-900">
                   {(user.water_intake || user.waterIntake) ? `${user.water_intake || user.waterIntake} liters` : 'Not specified'}
                 </p>
               }
             </div>
           </div>
         )}
       </div>
     </div>

     {/* Medical Conditions */}
     {((user.medical_conditions || user.medicalConditions) && (user.medical_conditions || user.medicalConditions).length > 0) || editingSection === 'nutrition' ? (
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
         <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-red-500 pb-2">Medical Considerations</h3>
         {editingSection === 'nutrition' ? (
           <div className="space-y-2">
             {['diabetes', 'hypertension', 'heart_disease', 'high_cholesterol', 'food_allergies', 'other'].map(condition => (
               <label key={condition} className="flex items-center space-x-2">
                 <input
                   type="checkbox"
                   checked={editData.medical_conditions?.includes(condition) || false}
                   onChange={(e) => {
                     const current = editData.medical_conditions || [];
                     if (e.target.checked) {
                       updateEditData('medical_conditions', [...current, condition]);
                     } else {
                       updateEditData('medical_conditions', current.filter(c => c !== condition));
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
             {(user.medical_conditions || user.medicalConditions)?.map((condition: string, index: number) => (
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
         {((user.preferred_workouts || user.preferredWorkouts) && (user.preferred_workouts || user.preferredWorkouts).length > 0) || editingSection === 'fitness' ? (
           <div>
             <p className="text-sm font-medium text-gray-500 mb-3">Preferred Workout Types</p>
             {editingSection === 'fitness' ? (
               <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                 {['cardio', 'strength_training', 'yoga', 'pilates', 'swimming', 'running', 'cycling', 'sports', 'hiking', 'dancing'].map(workout => (
                   <label key={workout} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                     <input
                       type="checkbox"
                       checked={editData.preferred_workouts?.includes(workout) || false}
                       onChange={(e) => {
                         const current = editData.preferred_workouts || [];
                         if (e.target.checked) {
                           updateEditData('preferred_workouts', [...current, workout]);
                         } else {
                           updateEditData('preferred_workouts', current.filter(w => w !== workout));
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
                 {(user.preferred_workouts || user.preferredWorkouts)?.map((workout: string, index: number) => (
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
           {((user.workout_frequency || user.workoutFrequency) || editingSection === 'fitness') && (
             <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
               <div className="bg-green-100 p-2 rounded-full">
                 <Calendar className="w-5 h-5 text-green-600" />
               </div>
               <div className="flex-1">
                 <p className="text-sm font-medium text-gray-500 mb-1">Frequency (days/week)</p>
                 {editingSection === 'fitness' ? 
                   <input
                     type="number"
                     value={editData.workout_frequency || ''}
                     onChange={(e) => updateEditData('workout_frequency', parseInt(e.target.value) || '')}
                     className="text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-green-500"
                     min="1"
                     max="7"
                   /> :
                   <p className="text-lg font-semibold text-gray-900">
                     {(user.workout_frequency || user.workoutFrequency) ? `${user.workout_frequency || user.workoutFrequency} days/week` : 'Not specified'}
                   </p>
                 }
               </div>
             </div>
           )}
           
           {((user.workout_duration || user.workoutDuration) || editingSection === 'fitness') && (
             <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
               <div className="bg-purple-100 p-2 rounded-full">
                 <Clock className="w-5 h-5 text-purple-600" />
               </div>
               <div className="flex-1">
                 <p className="text-sm font-medium text-gray-500 mb-1">Duration (minutes)</p>
                 {editingSection === 'fitness' ? 
                   <input
                     type="number"
                     value={editData.workout_duration || ''}
                     onChange={(e) => updateEditData('workout_duration', parseInt(e.target.value) || '')}
                     className="text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-green-500"
                     min="5"
                     max="300"
                   /> :
                   <p className="text-lg font-semibold text-gray-900">
                     {(user.workout_duration || user.workoutDuration) ? `${user.workout_duration || user.workoutDuration} minutes` : 'Not specified'}
                   </p>
                 }
               </div>
             </div>
           )}
           
           {((user.fitness_level || user.fitnessLevel) || editingSection === 'fitness') && (
             <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
               <div className="bg-red-100 p-2 rounded-full">
                 <BarChart3 className="w-5 h-5 text-red-600" />
               </div>
               <div className="flex-1">
                 <p className="text-sm font-medium text-gray-500 mb-1">Fitness Level</p>
                 {editingSection === 'fitness' ? 
                   <select
                     value={editData.fitness_level || ''}
                     onChange={(e) => updateEditData('fitness_level', e.target.value)}
                     className="text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                   >
                     <option value="">Select...</option>
                     <option value="beginner">Beginner</option>
                     <option value="intermediate">Intermediate</option>
                     <option value="advanced">Advanced</option>
                   </select> :
                   <p className="text-lg font-semibold text-gray-900">
                     {(user.fitness_level || user.fitnessLevel) ? 
                       (user.fitness_level || user.fitnessLevel).charAt(0).toUpperCase() + (user.fitness_level || user.fitnessLevel).slice(1) 
                       : 'Not specified'}
                   </p>
                 }
               </div>
             </div>
           )}
           
           {((user.workout_location || user.workoutLocation) || editingSection === 'fitness') && (
             <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
               <div className="bg-blue-100 p-2 rounded-full">
                 <MapPin className="w-5 h-5 text-blue-600" />
               </div>
               <div className="flex-1">
                 <p className="text-sm font-medium text-gray-500 mb-1">Workout Location</p>
                 {editingSection === 'fitness' ? 
                   <select
                     value={editData.workout_location || ''}
                     onChange={(e) => updateEditData('workout_location', e.target.value)}
                     className="text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                   >
                     <option value="">Select...</option>
                     <option value="home">Home</option>
                     <option value="gym">Gym</option>
                     <option value="outdoors">Outdoors</option>
                     <option value="studio">Studio</option>
                   </select> :
                   <p className="text-lg font-semibold text-gray-900">
                     {(user.workout_location || user.workoutLocation) ? 
                       (user.workout_location || user.workoutLocation).charAt(0).toUpperCase() + (user.workout_location || user.workoutLocation).slice(1) 
                       : 'Not specified'}
                   </p>
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
                   checked={editData.available_equipment?.includes(equipment) || false}
                   onChange={(e) => {
                     const current = editData.available_equipment || [];
                     if (e.target.checked) {
                       // If "none" is selected, clear all others
                       if (equipment === 'none') {
                         updateEditData('available_equipment', ['none']);
                       } else {
                         // If any other equipment is selected, remove "none"
                         const filtered = current.filter(eq => eq !== 'none');
                         updateEditData('available_equipment', [...filtered, equipment]);
                       }
                     } else {
                       updateEditData('available_equipment', current.filter(eq => eq !== equipment));
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
           {(user.available_equipment || user.availableEquipment) && (user.available_equipment || user.availableEquipment).length > 0 ? (
             <div className="flex flex-wrap gap-2">
               {(user.available_equipment || user.availableEquipment).map((equipment: string, index: number) => (
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
               value={editData.has_trainer !== undefined ? editData.has_trainer.toString() : ''}
               onChange={(e) => updateEditData('has_trainer', e.target.value === 'true')}
               className="text-lg font-semibold text-gray-900 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
             >
               <option value="">Select...</option>
               <option value="true">Yes</option>
               <option value="false">No</option>
             </select> :
             <p className="text-lg font-semibold text-gray-900">
               {(user.has_trainer !== undefined || user.hasTrainer !== undefined) ? 
                 ((user.has_trainer || user.hasTrainer) ? 'Yes' : 'No') : 'Not specified'}
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
         {((user.sleep_hours || user.sleepHours) || editingSection === 'lifestyle') && (
           <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
             <div className="bg-blue-100 p-2 rounded-full">
               <Clock className="w-5 h-5 text-blue-600" />
             </div>
             <div className="flex-1">
               <p className="text-sm font-medium text-gray-500 mb-1">Sleep Duration (hours)</p>
               {editingSection === 'lifestyle' ? 
                 renderInput('sleep_hours', 'number') :
                 <p className="text-lg font-semibold text-gray-900">
                   {(user.sleep_hours || user.sleepHours) ? `${user.sleep_hours || user.sleepHours} hours` : 'Not specified'}
                 </p>
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
         
         {((user.wakeup_time || user.wakeupTime) || editingSection === 'lifestyle') && (
           <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
             <div className="bg-yellow-100 p-2 rounded-full">
               <span className="w-5 h-5 text-yellow-600 flex items-center justify-center text-lg">☀️</span>
             </div>
             <div className="flex-1">
               <p className="text-sm font-medium text-gray-500 mb-1">Wake Up Time</p>
               {editingSection === 'lifestyle' ? 
                 renderInput('wakeup_time', 'time') :
                 <p className="text-lg font-semibold text-gray-900">{user.wakeup_time || user.wakeupTime || 'Not specified'}</p>
               }
             </div>
           </div>
         )}
       </div>
       
       {((user.sleep_issues || user.sleepIssues) && (user.sleep_issues || user.sleepIssues).length > 0) || editingSection === 'lifestyle' ? (
         <div className="mt-6">
           <p className="text-sm font-medium text-gray-500 mb-3">Sleep Issues</p>
           {editingSection === 'lifestyle' ? (
             <div className="space-y-2">
               {['insomnia', 'sleep_apnea', 'restless_sleep', 'frequent_waking', 'difficulty_falling_asleep'].map(issue => (
                 <label key={issue} className="flex items-center space-x-2">
                   <input
                     type="checkbox"
                     checked={editData.sleep_issues?.includes(issue) || false}
                     onChange={(e) => {
                       const current = editData.sleep_issues || [];
                       if (e.target.checked) {
                         updateEditData('sleep_issues', [...current, issue]);
                       } else {
                         updateEditData('sleep_issues', current.filter(i => i !== issue));
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
               {(user.sleep_issues || user.sleepIssues)?.map((issue: string, index: number) => (
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
               {user?.name?.charAt(0) || 'U'}
             </div>
             <div>
               <h1 className="text-3xl font-bold text-gray-900">{user?.name || 'User'}'s Profile</h1>
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