// src/app/chat/ChatPageClient.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/ChatInterface';
import Spinner from '@/components/Spinner';
import { useAuth } from '@/context/AuthContext';

export default function ChatPageClient() {
  const { user, loading } = useAuth();
  const [showUI, setShowUI] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Redirect to login if user is not logged in
        router.push('/login');
      } else {
        setShowUI(true);
      }
    }
  }, [loading, user, router]);

  // If still loading or user is null and being redirected, show spinner
  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-50 py-12">
          <div className="flex justify-center items-center h-96">
            <Spinner />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Your AI Fitness Coach
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Ask me anything about nutrition, workouts, or health goals. I'm here to provide personalized guidance based on your needs.
          </p>
          <ChatInterface />
        </div>
      </div>
      <Footer />
    </div>
  );
}