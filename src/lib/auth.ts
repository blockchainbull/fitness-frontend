// src/lib/auth.ts
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Generate a JWT token for a user
export const generateToken = (user: IUser): string => {
  return jwt.sign(
    { 
      id: user._id,
      email: user.email,
      name: user.name 
    },
    JWT_SECRET,
    { expiresIn: '7d' } // Token expires in 7 days
  );
};

// Authentication middleware for API routes
export const authenticateUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    
    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};

// Set token in cookies
export const setTokenCookie = (res: NextApiResponse, token: string) => {
  res.setHeader(
    'Set-Cookie',
    `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Strict`
  );
};

// Clear token from cookies (for logout)
export const clearTokenCookie = (res: NextApiResponse) => {
  res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict');
};