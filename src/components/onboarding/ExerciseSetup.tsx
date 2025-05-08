// components/onboarding/ExerciseSetup.tsx
"use client"

import React, { useState } from 'react';
import { UserData } from '../../../types/onboarding.types';
import styles from '../../app/styles/onboarding.module.css';

interface ExerciseSetupProps {
  userData: UserData;
  onNext: (data: Partial<UserData>) => void;
}

interface WorkoutLocation {
  id: string;
  label: string;
  icon: string;
}

interface Equipment {
  id: string;
  label: string;
}

const ExerciseSetup: React.FC<ExerciseSetupProps> = ({ userData, onNext }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>(userData.workoutLocation || '');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(userData.workoutEquipment || []);
  
  const workoutLocations: WorkoutLocation[] = [
    { id: 'home', label: 'At Home', icon: '🏠' },
    { id: 'gym', label: 'At the Gym', icon: '🏋️' },
    { id: 'outdoors', label: 'Outdoors', icon: '🌳' },
    { id: 'mixed', label: 'Mix of Locations', icon: '🔄' },
  ];
  
  const equipmentOptions: Equipment[] = [
    { id: 'none', label: 'No Equipment' },
    { id: 'dumbbells', label: 'Dumbbells' },
    { id: 'resistance_bands', label: 'Resistance Bands' },
    { id: 'kettlebells', label: 'Kettlebells' },
    { id: 'barbell', label: 'Barbell' },
    { id: 'pull_up_bar', label: 'Pull-up Bar' },
    { id: 'bench', label: 'Bench' },
    { id: 'yoga_mat', label: 'Yoga Mat' },
    { id: 'cardio_machine', label: 'Cardio Machine' },
    { id: 'full_gym', label: 'Full Gym Access' },
  ];
  
  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
  };
  
  const handleEquipmentToggle = (equipmentId: string) => {
    if (equipmentId === 'none') {
      // If "None" is selected, clear all other selections
      setSelectedEquipment(selectedEquipment.includes('none') ? [] : ['none']);
    } else if (equipmentId === 'full_gym') {
      // If "Full Gym Access" is selected, include several standard pieces of equipment
      const gymEquipment = ['dumbbells', 'bench', 'barbell', 'kettlebells', 'cardio_machine', 'full_gym'];
      setSelectedEquipment(selectedEquipment.includes('full_gym') ? [] : gymEquipment);
    } else {
      // If any other equipment is selected, remove "None" if it exists
      let equipment = selectedEquipment.filter(id => id !== 'none');
      
      // Toggle the selected equipment
      if (equipment.includes(equipmentId)) {
        equipment = equipment.filter(id => id !== equipmentId);
      } else {
        equipment.push(equipmentId);
      }
      
      setSelectedEquipment(equipment);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onNext({
      workoutLocation: selectedLocation,
      workoutEquipment: selectedEquipment,
    });
  };
  
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Your Exercise Setup</h1>
      <p className={styles.formSubtitle}>
        Tell us about your exercise environment and available equipment
      </p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Where do you usually workout?</label>
          <div className={styles.locationList}>
            {workoutLocations.map((location) => (
              <div
                key={location.id}
                className={`${styles.locationItem} ${selectedLocation === location.id ? styles.locationItemSelected : ''}`}
                onClick={() => handleLocationSelect(location.id)}
              >
                <span className={styles.locationIcon}>{location.icon}</span>
                <span className={styles.locationLabel}>{location.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>What equipment do you have access to? (Select all that apply)</label>
          <div className={styles.checkboxList}>
            {equipmentOptions.map((equipment) => (
              <div
                key={equipment.id}
                className={styles.checkboxItem}
              >
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedEquipment.includes(equipment.id)}
                    onChange={() => handleEquipmentToggle(equipment.id)}
                    className={styles.checkboxInput}
                  />
                  <span>{equipment.label}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <button type="submit" className={styles.continueButton}>
          Complete Setup
        </button>
      </form>
    </div>
  );
};

export default ExerciseSetup;