import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

const pool = new Pool({
  user: 'health_ai_user',
  password: 'health_ai_password',
  host: 'localhost',
  port: 5432,
  database: 'health_ai_db',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      const {
        // Basic Info
        name, email, gender, age, height, weight, activityLevel, bmi, bmr, tdee,
        // Goals
        primaryGoal, weightGoal, targetWeight, goalTimeline,
        // Sleep
        sleepHours, bedtime, wakeupTime, sleepIssues,
        // Dietary
        dietaryPreferences, waterIntake, medicalConditions, otherCondition,
        // Workout
        workoutTypes, workoutFrequency, workoutDuration,
        // Exercise Setup
        workoutLocation, fitnessLevel, hasTrainer, equipment
      } = req.body;

      const userId = uuidv4();

      // 1. Insert user
      await client.query(
        `INSERT INTO users (id, name, email, gender, age, height, weight, activity_level, bmi, bmr, tdee) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [userId, name, email, gender, age, height, weight, activityLevel, bmi, bmr, tdee]
      );

      // 2. Insert user goals
      await client.query(
        `INSERT INTO user_goals (id, user_id, primary_goal, weight_goal, target_weight, goal_timeline) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [uuidv4(), userId, primaryGoal, weightGoal, targetWeight, goalTimeline]
      );

      // 3. Insert sleep info
      const sleepId = uuidv4();
      await client.query(
        `INSERT INTO sleep_info (id, user_id, sleep_hours, bedtime, wakeup_time) 
         VALUES ($1, $2, $3, $4, $5)`,
        [sleepId, userId, sleepHours, bedtime, wakeupTime]
      );

      // 4. Insert sleep issues
      for (const issue of sleepIssues) {
        await client.query(
          `INSERT INTO sleep_issues (id, sleep_id, issue) VALUES ($1, $2, $3)`,
          [uuidv4(), sleepId, issue]
        );
      }

      // 5. Insert dietary preferences
      for (const preference of dietaryPreferences) {
        await client.query(
          `INSERT INTO dietary_preferences (id, user_id, preference, water_intake) 
           VALUES ($1, $2, $3, $4)`,
          [uuidv4(), userId, preference, waterIntake]
        );
      }

      // 6. Insert medical conditions
      for (const condition of medicalConditions) {
        const conditionText = condition === 'other' ? otherCondition : condition;
        await client.query(
          `INSERT INTO medical_conditions (id, user_id, condition, other_condition) 
           VALUES ($1, $2, $3, $4)`,
          [uuidv4(), userId, conditionText, condition === 'other' ? otherCondition : null]
        );
      }

      // 7. Insert workout preferences
      for (const workoutType of workoutTypes) {
        await client.query(
          `INSERT INTO workout_preferences (id, user_id, workout_type, workout_frequency, workout_duration) 
           VALUES ($1, $2, $3, $4, $5)`,
          [uuidv4(), userId, workoutType, workoutFrequency, workoutDuration]
        );
      }

      // 8. Insert exercise setup
      const exerciseId = uuidv4();
      await client.query(
        `INSERT INTO exercise_setup (id, user_id, workout_location, fitness_level, has_trainer) 
         VALUES ($1, $2, $3, $4, $5)`,
        [exerciseId, userId, workoutLocation, fitnessLevel, hasTrainer]
      );

      // 9. Insert equipment
      for (const equipmentItem of equipment) {
        await client.query(
          `INSERT INTO equipment (id, exercise_id, equipment_name) VALUES ($1, $2, $3)`,
          [uuidv4(), exerciseId, equipmentItem]
        );
      }

      await client.query('COMMIT');
      
      res.status(201).json({ 
        success: true, 
        userId,
        message: 'Onboarding completed successfully' 
      });

    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Database error:', error);
      res.status(500).json({ message: 'Failed to complete onboarding' });
    } finally {
      client.release();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}