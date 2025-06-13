// src/app/chat/ChatPageClient.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
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
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 bg-gray-50 flex justify-center items-center">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <ChatInterface />
    </div>
  );
}