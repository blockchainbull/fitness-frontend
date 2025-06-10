import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies(); // Add await here
    const userId = cookieStore.get('userId')?.value;
    
    if (!userId) {
      return NextResponse.json({ isLoggedIn: false });
    }

    // Get user profile from backend
    const backendResponse = await fetch(`http://localhost:8000/api/user/profile/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!backendResponse.ok) {
      // Clear invalid cookies
      const response = NextResponse.json({ isLoggedIn: false });
      response.cookies.delete('userId');
      response.cookies.delete('userEmail');
      response.cookies.delete('isLoggedIn');
      return response;
    }

    const result = await backendResponse.json();
    
    return NextResponse.json({
      isLoggedIn: true,
      user: result.user
    });

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ isLoggedIn: false });
  }
}