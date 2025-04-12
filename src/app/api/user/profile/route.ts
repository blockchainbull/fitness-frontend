// src/app/api/user/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req: NextRequest) {
  try {
    // Connect to database
    await dbConnect();
    
    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authorized, no token' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & { id: string };
    
    // Find user by id
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Return user data
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        fitnessGoal: user.fitnessGoal,
        dietaryPreferences: user.dietaryPreferences,
      },
    });
  } catch (error) {
    console.error('Profile error:', error);
    
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
    const { name, fitnessGoal, dietaryPreferences } = await req.json();

    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { name, fitnessGoal, dietaryPreferences },
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
        fitnessGoal: updatedUser.fitnessGoal,
        dietaryPreferences: updatedUser.dietaryPreferences,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    
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