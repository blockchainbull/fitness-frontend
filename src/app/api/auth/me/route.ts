// src/app/api/auth/me/route.ts
import { getUserFromToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = getUserFromToken();

  if (!user) {
    return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json({ success: true, user });
}
