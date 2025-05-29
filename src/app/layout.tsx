// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { OnboardingProvider } from '@/context/OnboardingContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FitMind AI - Your Personal Nutrition & Fitness Coach',
  description: 'AI-powered nutrition and fitness coaching tailored to your unique needs and goals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <AuthProvider>
          <OnboardingProvider>
            {children}
          </OnboardingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}