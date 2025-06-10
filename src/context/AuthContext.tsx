// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  register: (userData: RegisterData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profileData: UpdateProfileData) => Promise<void>;
  updateSettings: (settingsData: UpdateSettingsData) => Promise<void>;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
  fitnessGoal?: string;
  dietaryPreferences?: string[];
};

type UpdateProfileData = {
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
        // Check if user is already logged in using cookies
        const res = await fetch('/api/user/profile');
        const data = await res.json();
  
        if (data.success) {
          console.log('✅ User auto-logged in:', data.user.name);
          setUser(data.user);
        } else {
          console.log('ℹ️ No valid session found');
        }
      } catch (error) {
        console.error('❌ Failed to fetch user profile:', error);
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
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (profileData: UpdateProfileData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      setUser(prevUser => prevUser ? { ...prevUser, ...data.user } : data.user);
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update settings
  const updateSettings = async (settingsData: UpdateSettingsData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update settings');
      }

      setUser(prevUser => prevUser ? { ...prevUser, ...data.user } : data.user);
    } catch (error) {
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
        updateProfile,
        updateSettings,
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