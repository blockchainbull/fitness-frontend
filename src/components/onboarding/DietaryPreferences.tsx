// components/onboarding/DietaryPreferences.tsx
"use client"

import React, { useState } from 'react';
import { UserData } from '../../../types/onboarding.types';
import styles from '../../app/styles/onboarding.module.css';

interface DietaryPreferencesProps {
  userData: UserData;
  onNext: (data: Partial<UserData>) => void;
}

interface DietType {
  id: string;
  label: string;
}

interface WaterIntake {
  id: string;
  label: string;
}

interface MedicalCondition {
  id: string;
  label: string;
}

const DietaryPreferences: React.FC<DietaryPreferencesProps> = ({ userData, onNext }) => {
  const [selectedDiet, setSelectedDiet] = useState<string>(userData.dietType || '');
  const [selectedWaterIntake, setSelectedWaterIntake] = useState<string>(userData.waterIntake || '');
  const [selectedConditions, setSelectedConditions] = useState<string[]>(userData.medicalConditions || []);
  
  const dietTypes: DietType[] = [
    { id: 'omnivore', label: 'Omnivore (meat and plants)' },
    { id: 'vegetarian', label: 'Vegetarian (no meat)' },
    { id: 'vegan', label: 'Vegan (no animal products)' },
    { id: 'pescatarian', label: 'Pescatarian (fish but no meat)' },
    { id: 'keto', label: 'Keto (low-carb, high-fat)' },
    { id: 'paleo', label: 'Paleo (whole foods)' },
  ];
  
  const waterIntakes: WaterIntake[] = [
    { id: 'low', label: 'Low (0-2 cups per day)' },
    { id: 'moderate', label: 'Moderate (3-5 cups per day)' },
    { id: 'adequate', label: 'Adequate (6-8 cups per day)' },
    { id: 'high', label: 'High (8+ cups per day)' },
  ];
  
  const medicalConditions: MedicalCondition[] = [
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'hypertension', label: 'Hypertension' },
    { id: 'heart_disease', label: 'Heart Disease' },
    { id: 'arthritis', label: 'Arthritis' },
    { id: 'asthma', label: 'Asthma' },
    { id: 'thyroid', label: 'Thyroid Conditions' },
    { id: 'none', label: 'None of the above' },
  ];
  
  const handleDietSelect = (dietId: string) => {
    setSelectedDiet(dietId);
  };
  
  const handleWaterIntakeSelect = (intakeId: string) => {
    setSelectedWaterIntake(intakeId);
  };
  
  const handleConditionToggle = (conditionId: string) => {
    if (conditionId === 'none') {
      // If "None" is selected, clear all other selections
      setSelectedConditions(selectedConditions.includes('none') ? [] : ['none']);
    } else {
      // If any other condition is selected, remove "None" if it exists
      let conditions = selectedConditions.filter(id => id !== 'none');
      
      // Toggle the selected condition
      if (conditions.includes(conditionId)) {
        conditions = conditions.filter(id => id !== conditionId);
      } else {
        conditions.push(conditionId);
      }
      
      setSelectedConditions(conditions);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onNext({
      dietType: selectedDiet,
      waterIntake: selectedWaterIntake,
      medicalConditions: selectedConditions,
    });
  };
  
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Dietary Preferences & Health</h1>
      <p className={styles.formSubtitle}>
        Help us understand your dietary habits and health needs
      </p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>What best describes your diet?</label>
          <div className={styles.optionsList}>
            {dietTypes.map((diet) => (
              <div
                key={diet.id}
                className={`${styles.optionItem} ${selectedDiet === diet.id ? styles.optionItemSelected : ''}`}
                onClick={() => handleDietSelect(diet.id)}
              >
                {diet.label}
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>What is your typical water intake?</label>
          <div className={styles.optionsList}>
            {waterIntakes.map((intake) => (
              <div
                key={intake.id}
                className={`${styles.optionItem} ${selectedWaterIntake === intake.id ? styles.optionItemSelected : ''}`}
                onClick={() => handleWaterIntakeSelect(intake.id)}
              >
                {intake.label}
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Do you have any pre-existing medical conditions? (Select all that apply)</label>
          <div className={styles.checkboxList}>
            {medicalConditions.map((condition) => (
              <div
                key={condition.id}
                className={styles.checkboxItem}
              >
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedConditions.includes(condition.id)}
                    onChange={() => handleConditionToggle(condition.id)}
                    className={styles.checkboxInput}
                  />
                  <span>{condition.label}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <button type="submit" className={styles.continueButton}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default DietaryPreferences;