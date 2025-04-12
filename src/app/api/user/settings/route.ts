// src/app/api/user/settings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production';

export async function PUT(req: NextRequest) {
  try {
    // Connect to database
    await dbConnect();
    
    // Get token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authorized, no token' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & { id: string };
    
    // Parse request body
    const { 
      notifications, 
      privacy, 
      theme, 
      measurementUnit,
      physicalStats 
    } = await req.json();

    // Find and update user - we need to update the User model to include these fields
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { 
        preferences: {
          notifications,
          privacy,
          theme,
          measurementUnit
        },
        physicalStats: {
          height: physicalStats.height,
          weight: physicalStats.weight,
          age: physicalStats.age,
          gender: physicalStats.gender,
          activityLevel: physicalStats.activityLevel
        }
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Return updated user data
    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        preferences: updatedUser.preferences,
        physicalStats: updatedUser.physicalStats,
        fitnessGoal: updatedUser.fitnessGoal,
        dietaryPreferences: updatedUser.dietaryPreferences,
      },
    });
  } catch (error) {
    console.error('Update settings error:', error);
    
    // Check if error is due to invalid token
    if ((error as Error).name === 'JsonWebTokenError') {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}