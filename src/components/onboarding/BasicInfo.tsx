// components/onboarding/BasicInfo.tsx
"use client"

import React, { useState } from 'react';
import { UserData } from '../../../types/onboarding.types';
import styles from '../../app/styles/onboarding.module.css';

interface BasicInfoProps {
  userData: UserData;
  onNext: (data: Partial<UserData>) => void;
}

interface ActivityLevel {
  value: string;
  label: string;
}

const activityLevels: ActivityLevel[] = [
  { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
  { value: 'light', label: 'Lightly active (light exercise 1-3 days/week)' },
  { value: 'moderate', label: 'Moderately active (moderate exercise 3-5 days/week)' },
  { value: 'active', label: 'Very active (hard exercise 6-7 days/week)' },
  { value: 'extreme', label: 'Extremely active (very hard exercise & physical job)' },
];

const BasicInfo: React.FC<BasicInfoProps> = ({ userData, onNext }) => {
  const [formData, setFormData] = useState({
    name: userData.name || '',
    email: userData.email || '',
    gender: userData.gender || '',
    age: userData.age || '',
    height: userData.height || '',
    weight: userData.weight || '',
    activityLevel: userData.activityLevel || '',
  });
  
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    gender?: string;
    age?: string;
    height?: string;
    weight?: string;
    activityLevel?: string;
  }>({});
  
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData);
    }
  };
  
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Tell us about yourself</h1>
      <p className={styles.formSubtitle}>
        This information helps us create a personalized fitness plan for you
      </p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter your full name"
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter your email"
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Gender</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
                className={styles.radioInput}
              />
              Male
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
                className={styles.radioInput}
              />
              Female
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'other'}
                onChange={handleChange}
                className={styles.radioInput}
              />
              Other
            </label>
          </div>
          {errors.gender && <span className={styles.errorText}>{errors.gender}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <div className={styles.inputWithLabel}>
            <label htmlFor="age" className={styles.label}>Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={styles.input}
              placeholder="Years"
              min="16"
              max="120"
            />
          </div>
          {errors.age && <span className={styles.errorText}>{errors.age}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <div className={styles.inputWithLabel}>
            <label htmlFor="height" className={styles.label}>Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className={styles.input}
              placeholder="cm"
              min="100"
              max="250"
            />
          </div>
          {errors.height && <span className={styles.errorText}>{errors.height}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <div className={styles.inputWithLabel}>
            <label htmlFor="weight" className={styles.label}>Weight (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className={styles.input}
              placeholder="kg"
              min="30"
              max="300"
              step="0.1"
            />
          </div>
          {errors.weight && <span className={styles.errorText}>{errors.weight}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="activityLevel" className={styles.label}>Activity Level</label>
          <select
            id="activityLevel"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="">Select your activity level</option>
            {activityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          {errors.activityLevel && (
            <span className={styles.errorText}>{errors.activityLevel}</span>
          )}
        </div>
        
        <button type="submit" className={styles.continueButton}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default BasicInfo;