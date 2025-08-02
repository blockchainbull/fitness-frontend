import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'health_ai_user',
  password: 'health_ai_password',
  host: 'localhost',
  port: 5432,
  database: 'health_ai_db',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Transform web data to match the unified format that Flutter uses
      const onboardingData = {
        basicInfo: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password || 'web_default_password',
          gender: req.body.gender,
          age: req.body.age,
          height: req.body.height,
          weight: req.body.weight,
          activityLevel: req.body.activityLevel,
          bmi: req.body.bmi,
          bmr: req.body.bmr,
          tdee: req.body.tdee,
        },
        // Add period cycle data for female users
        ...(req.body.gender === 'Female' && {
          periodCycle: {
            hasPeriods: req.body.hasPeriods,
            lastPeriodDate: req.body.lastPeriodDate,
            cycleLength: req.body.cycleLength,
            cycleLengthRegular: req.body.cycleLengthRegular,
            pregnancyStatus: req.body.pregnancyStatus,
            trackingPreference: req.body.trackingPreference,
          }
        }),
        primaryGoal: req.body.primaryGoal,
        weightGoal: {
          weightGoal: req.body.weightGoal,
          targetWeight: req.body.targetWeight,
          timeline: req.body.goalTimeline,
        },
        sleepInfo: {
          sleepHours: req.body.sleepHours,
          bedtime: req.body.bedtime,
          wakeupTime: req.body.wakeupTime,
          sleepIssues: req.body.sleepIssues || [],
        },
        dietaryPreferences: {
          dietaryPreferences: req.body.dietaryPreferences || [],
          waterIntake: req.body.waterIntake,
          medicalConditions: req.body.medicalConditions || [],
          otherCondition: req.body.otherCondition,
        },
        workoutPreferences: {
          workoutTypes: req.body.workoutTypes || [],
          frequency: req.body.workoutFrequency,
          duration: req.body.workoutDuration,
        },
        exerciseSetup: {
          workoutLocation: req.body.workoutLocation,
          equipment: req.body.equipment || [],
          fitnessLevel: req.body.fitnessLevel,
          hasTrainer: req.body.hasTrainer,
        },
      };

      console.log('🚀 Web onboarding data being sent to unified backend:');
      console.log(`📧 Email: ${onboardingData.basicInfo.email}`);
      console.log(`⚧ Gender: ${onboardingData.basicInfo.gender}`);
      if (onboardingData.periodCycle) {
        console.log('🌸 Period cycle data:', onboardingData.periodCycle);
      }

      // Call the unified backend endpoint
      const response = await fetch('http://localhost:8000/api/health/onboarding/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(onboardingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to complete onboarding');
      }

      const result = await response.json();
      
      res.status(201).json({ 
        success: true, 
        userId: result.userId,
        message: 'Onboarding completed successfully' 
      });

    } catch (error) {
      console.error('Web onboarding error:', error);
      res.status(500).json({ 
        message: 'Failed to complete onboarding'
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}