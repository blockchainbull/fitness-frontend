// src/app/api/user/settings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production';

export async function PUT(req: NextRequest) {
  try {    
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
    console.log(`Processing settings update for user ${decoded.id}`);
    
    try {
      // Parse request body
      const body = await req.json();
      const { 
        notifications, 
        privacy, 
        theme, 
        measurementUnit,
        physicalStats,
        healthMetrics 
      } = body;
      
      console.log('Request data:', {
        measurementUnit,
        physicalStats,
        healthMetrics
      });

      // Validate required data
      if (!physicalStats || !physicalStats.height || !physicalStats.weight || !physicalStats.age) {
        return NextResponse.json(
          { success: false, message: 'Missing required physical stats' },
          { status: 400 }
        );
      }

      // Create update data object with proper structure
      const updateData: any = {};
      
      // Only include fields that are provided in the request
      if (notifications || privacy || theme || measurementUnit) {
        updateData.preferences = {};
        
        if (notifications) updateData.preferences.notifications = notifications;
        if (privacy) updateData.preferences.privacy = privacy;
        if (theme) updateData.preferences.theme = theme;
        if (measurementUnit) updateData.preferences.measurementUnit = measurementUnit;
      }
      
      if (physicalStats) {
        updateData.physicalStats = {
          height: physicalStats.height,
          weight: physicalStats.weight,
          age: physicalStats.age,
          gender: physicalStats.gender || 'male', // Provide default if missing
          activityLevel: physicalStats.activityLevel || 'moderate', // Provide default if missing
        };
      }
      
      if (healthMetrics) {
        updateData.healthMetrics = {
          bmr: healthMetrics.bmr || 0,
          tdee: healthMetrics.tdee || 0,
          bmi: healthMetrics.bmi || 0,
          // Add any other health metrics if needed
        };
      }
      
      console.log('Updating user with data:', updateData);

      // Find and update user
      const updatedUser = await prisma.user.update({
        where: {
          id: decoded.id,
        },
        data: updateData,
      });
      
      if (!updatedUser) {
        console.error(`User not found with ID: ${decoded.id}`);
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        );
      }

      console.log(`User ${decoded.id} updated successfully`);
      
      // Return updated user data
      return NextResponse.json({
        success: true,
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          preferences: updatedUser.preferences,
          physicalStats: updatedUser.physicalStats,
          healthMetrics: updatedUser.healthMetrics,
          fitnessGoal: updatedUser.fitnessGoal,
          dietaryPreferences: updatedUser.dietaryPreferences,
        },
      });
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { success: false, message: 'Invalid request data', error: (parseError as Error).message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Update settings error:', error);
    
    // Check if error is due to invalid token
    if ((error as Error).name === 'JsonWebTokenError') {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Check for Prisma-specific errors
    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}