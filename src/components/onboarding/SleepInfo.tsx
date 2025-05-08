// components/onboarding/SleepInfo.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { UserData } from '../../../types/onboarding.types';
import styles from '../../app/styles/onboarding.module.css';

interface SleepInfoProps {
  userData: UserData;
  onNext: (data: Partial<UserData>) => void;
}

interface SleepIssue {
  id: string;
  label: string;
}

const formatTimeDisplay = (time24h: string): string => {
  if (!time24h) return '';
  
  const [hours, minutes] = time24h.split(':');
  const hour = parseInt(hours, 10);
  const mins = parseInt(minutes, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  
  // Only show minutes if they're not zero
  return mins === 0 ? `${hour12} ${period}` : `${hour12}:${minutes.padStart(2, '0')} ${period}`;
};

const SleepInfo: React.FC<SleepInfoProps> = ({ userData, onNext }) => {
  const [sleepHours, setSleepHours] = useState<number>(userData.sleepHours ? Number(userData.sleepHours) : 7);
  const [bedtime, setBedtime] = useState<string>(userData.bedtime || '23:00');
  const [wakeTime, setWakeTime] = useState<string>(userData.wakeTime || '');
  const [selectedIssues, setSelectedIssues] = useState<string[]>(userData.sleepIssues || []);
  
  // Calculate wake time based on bedtime and sleep hours
  useEffect(() => {
    if (bedtime) {
      const [bedHours, bedMinutes] = bedtime.split(':').map(Number);
      
      // Convert bedtime to total minutes
      let bedtimeInMinutes = bedHours * 60 + bedMinutes;
      
      // Calculate wake time by adding sleep hours (converted to minutes)
      let wakeTimeInMinutes = bedtimeInMinutes + Math.round(sleepHours * 60);
      
      // Adjust if we go beyond 24 hours (next day)
      if (wakeTimeInMinutes >= 24 * 60) {
        wakeTimeInMinutes -= 24 * 60; // Subtract 24 hours in minutes
      }
      
      // Convert back to hours and minutes
      const wakeHours = Math.floor(wakeTimeInMinutes / 60);
      const wakeMinutes = wakeTimeInMinutes % 60;
      
      // Format as HH:MM
      const formattedWakeTime = `${wakeHours.toString().padStart(2, '0')}:${wakeMinutes.toString().padStart(2, '0')}`;
      setWakeTime(formattedWakeTime);
    }
  }, [bedtime, sleepHours]);
  
  const sleepIssues: SleepIssue[] = [
    { id: 'trouble_falling_asleep', label: 'Trouble falling asleep' },
    { id: 'waking_during_night', label: 'Waking up during the night' },
    { id: 'waking_too_early', label: 'Waking up too early' },
    { id: 'feeling_tired', label: 'Feeling tired after sleep' },
    { id: 'snoring', label: 'Snoring' },
    { id: 'sleep_apnea', label: 'Sleep apnea' },
    { id: 'none', label: 'None' }
  ];
  
  const handleSleepHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSleepHours(Number(e.target.value));
  };
  
  const handleIssueToggle = (issueId: string) => {
    if (issueId === 'none') {
      // If "None" is selected, clear all other selections
      setSelectedIssues(selectedIssues.includes('none') ? [] : ['none']);
    } else {
      // If any other issue is selected, remove "None" if it exists
      let issues = selectedIssues.filter(id => id !== 'none');
      
      // Toggle the selected issue
      if (issues.includes(issueId)) {
        issues = issues.filter(id => id !== issueId);
      } else {
        issues.push(issueId);
      }
      
      setSelectedIssues(issues);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onNext({
      sleepHours,
      bedtime,
      wakeTime,
      sleepIssues: selectedIssues
    });
  };
  
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Tell us about your sleep</h1>
      <p className={styles.formSubtitle}>
        Sleep is a crucial part of your health and fitness journey
      </p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            How many hours do you sleep per night?
          </label>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="3"
              max="12"
              step="0.5"
              value={sleepHours}
              onChange={handleSleepHoursChange}
              className={styles.slider}
            />
            <div className={styles.sliderValue}>{sleepHours} hours</div>
            <div className={styles.sliderLabels}>
              <span>3h</span>
              <span>12h</span>
            </div>
          </div>
        </div>
        
        <div className={styles.timeLabels}>
          <div className={styles.timeLabel}>Bedtime</div>
          <div className={styles.timeLabel}>Wake up time</div>
        </div>
        
        <div className={styles.timeCards}>
          <div className={styles.timeCard} onClick={() => {
            const input = document.createElement('input');
            input.type = 'time';
            input.value = bedtime;
            input.onchange = (e) => setBedtime((e.target as HTMLInputElement).value);
            input.click();
          }}>
            <span className={styles.timeIcon}>🌙</span>
            <span className={styles.timeValue}>{formatTimeDisplay(bedtime)}</span>
            <input
              type="time"
              value={bedtime}
              onChange={(e) => setBedtime(e.target.value)}
              style={{display: 'none'}}
            />
          </div>
          
          <div className={styles.timeCard}>
            <span className={styles.timeIcon}>☀️</span>
            <span className={styles.timeValue}>{formatTimeDisplay(wakeTime)}</span>
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Do you experience any sleep issues?</label>
          <p className={styles.subLabel}>Select all that apply</p>
          <div className={styles.checkboxList}>
            {sleepIssues.map((issue) => (
              <div key={issue.id} className={styles.checkboxItem}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedIssues.includes(issue.id)}
                    onChange={() => handleIssueToggle(issue.id)}
                    className={styles.checkboxInput}
                  />
                  <span>{issue.label}</span>
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

export default SleepInfo;