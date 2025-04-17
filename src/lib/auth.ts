// src/lib/auth.ts
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (user: { id: string; email: string; name: string }): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Use in route handlers to get logged in user
export const getUserFromToken = () => {
  const token = cookies().get('token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    return decoded; // { id, email, name }
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
};
