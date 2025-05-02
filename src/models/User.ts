// src/models/User.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  fitnessGoal?: string;
  dietaryPreferences?: string[];
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
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // Don't return password in queries by default
    },
    fitnessGoal: {
      type: String,
      enum: ['weightLoss', 'muscleGain', 'endurance', 'strength', 'flexibility', 'generalFitness'],
    },
    dietaryPreferences: {
      type: [String],
      enum: ['vegan', 'vegetarian', 'pescatarian', 'keto', 'paleo', 'glutenFree', 'dairyFree'],
    },
    physicalStats: {
      height: Number,
      weight: Number,
      age: Number,
      gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'male'
      },
      activityLevel: {
        type: String,
        enum: ['sedentary', 'light', 'moderate', 'active', 'veryActive'],
        default: 'moderate'
      }
    },
    healthMetrics: {
      bmr: Number,  // Basal Metabolic Rate
      tdee: Number, // Total Daily Energy Expenditure
      bmi: Number   // Body Mass Index
    },
    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        app: { type: Boolean, default: true },
        marketing: { type: Boolean, default: false }
      },
      privacy: {
        shareProgress: { type: Boolean, default: true },
        publicProfile: { type: Boolean, default: false }
      },
      theme: {
        type: String,
        enum: ['system', 'light', 'dark'],
        default: 'system'
      },
      measurementUnit: {
        type: String,
        enum: ['metric', 'imperial'],
        default: 'metric'
      }
    }
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Avoid OverwriteModelError when model is redefined in development
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;