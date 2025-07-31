// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';



interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  bmi?: number;
  bmr?: number;
  tdee?: number;
  activityLevel?: string;
  fitnessGoal?: string;
  primaryGoal?: string;
  weightGoal?: string;
  targetWeight?: number;
  dietaryPreferences?: string[];
  medicalConditions?: string[];
  preferredWorkouts?: string[];
  workoutFrequency?: number;
  workoutDuration?: number;
  fitnessLevel?: string;
  workoutLocation?: string;
  availableEquipment?: string[];
  hasTrainer?: boolean;
  waterIntake?: number;
  sleepHours?: number;
  bedtime?: string;
  wakeupTime?: string;
  sleepIssues?: string[];
  otherMedicalCondition?: string;
  goalTimeline?: string;
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  register: (userData: RegisterData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
  fitnessGoal?: string;
  dietaryPreferences?: string[];
};

type UpdateSettingsData = {
  physicalStats?: {
    height: number;
    weight: number;
    age: number;
    gender: string;
    activityLevel: string;
  };
  healthMetrics?: {
    bmr: number;
    tdee: number;
    bmi: number;
  };
  preferences?: {
    notifications: {
      email: boolean;
      app: boolean;
      marketing: boolean;
    };
    privacy: {
      shareProgress: boolean;
      publicProfile: boolean;
    };
    theme: string;
    measurementUnit: string;
  };
};




const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        console.log('🔍 Checking if user is logged in...');
        
        // First try to get user from localStorage (fallback)
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          console.log('✅ User loaded from localStorage:', userData.name);
          setLoading(false);
          return;
        }

        // Try to fetch from your API endpoint
        const res = await fetch('/api/user/profile');
        const data = await res.json();
  
        if (data.success) {
          console.log('✅ User auto-logged in:', data.user.name);
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          console.log('ℹ️ No valid session found');
        }
      } catch (error) {
        console.error('❌ Failed to fetch user profile:', error);
        
        // If API fails, still check localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          console.log('✅ User loaded from localStorage (API failed):', userData.name);
        }
      } finally {
        setLoading(false);
      }
    };
  
    checkUserLoggedIn();
  }, []);
  
  // Register user
  const register = async (userData: RegisterData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔐 Attempting login for:', email);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log('❌ Login failed:', data.error || data.message);
        throw new Error(data.error || data.message || 'Invalid credentials');
      }

      console.log('✅ Login successful for:', data.user.name);
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect to dashboard after successful login
      window.location.href = '/dashboard';
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    setLoading(true);
    try {
      console.log('🚪 Logging out user');
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      localStorage.removeItem('user');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear local state
      setUser(null);
      localStorage.removeItem('user');
      window.location.href = '/login';
    } finally {
      setLoading(false);
    }
  };

  // Update user function for profile editing
  const updateUser = async (userData: Partial<User>) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    setLoading(true);
    setError(null);

    try {
      console.log('🔄 Updating user with:', userData);
      
      // If userData contains the full updated user object (from backend response)
      if (userData.id && userData.name && userData.email) {
        // This is a complete user object from backend
        setUser(userData as User);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('✅ User state updated with complete object');
        return;
      }
      
      // Otherwise, make API call to update partial data
      const response = await fetch(`http://127.0.0.1:8000/update-user/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Backend update failed');
      }

      const updatedUser = await response.json();
      console.log('✅ Received updated user from backend:', updatedUser);
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

    } catch (error) {
      console.error('❌ Failed to update user:', error);
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};