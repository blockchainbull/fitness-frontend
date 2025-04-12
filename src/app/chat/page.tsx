// src/app/chat/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/ChatInterface';

export const metadata = {
  title: 'AI Coach Chat - FitMind AI',
  description: 'Chat with your personal AI nutrition and fitness coach',
};

export default function ChatPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Your AI Fitness Coach</h1>
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