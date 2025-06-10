// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, fitnessGoal, dietaryPreferences } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    // For now, this would need to be connected to your backend
    // You can implement registration logic here
    return NextResponse.json({
      success: true,
      user: {
        id: Date.now().toString(), // Temporary ID
        name,
        email,
        fitnessGoal,
        dietaryPreferences
      },
      message: 'Registration successful'
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Registration failed' },
      { status: 500 }
    );
  }
}