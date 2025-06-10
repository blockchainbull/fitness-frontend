// src/app/api/auth/logout/route.ts - Logout and clear cookies
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
    
    // Clear all auth cookies
    response.cookies.delete('userId');
    response.cookies.delete('userEmail');
    response.cookies.delete('isLoggedIn');
    
    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}