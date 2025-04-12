// src/app/demo/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DemoPage() {
  const router = useRouter();
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const demoPrompts = [
    {
      id: 'workout',
      title: 'Workout Plan',
      description: 'Get a personalized workout plan based on your goals and available equipment.',
      prompt: 'I want to build muscle but only have dumbbells at home. Can you suggest a workout plan?'
    },
    {
      id: 'nutrition',
      title: 'Nutrition Advice',
      description: 'Receive nutrition recommendations tailored to your dietary preferences and goals.',
      prompt: 'I\'m trying to lose weight but still maintain energy for my workouts. What should I eat?'
    },
    {
      id: 'habits',
      title: 'Healthy Habits',
      description: 'Learn how to build sustainable health habits that fit into your lifestyle.',
      prompt: 'I struggle with consistency in my fitness routine. How can I build better habits?'
    },
    {
      id: 'recovery',
      title: 'Recovery Tips',
      description: 'Discover optimal recovery strategies to maximize your fitness results.',
      prompt: 'I often feel sore and tired after workouts. What are the best recovery methods?'
    }
  ];

  const handlePromptSelect = (promptId: string) => {
    setSelectedPrompt(promptId);
  };

  const handleStartDemo = () => {
    if (selectedPrompt) {
      const selectedPromptObj = demoPrompts.find(p => p.id === selectedPrompt);
      if (selectedPromptObj) {
        // In a real application, you might want to pass this via URL params or context
        // For demo purposes, we'll just navigate to the chat page
        // You could extend this by storing the selected prompt in localStorage or a state management solution
        localStorage.setItem('demoPrompt', selectedPromptObj.prompt);
        router.push('/chat');
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">Try FitMind AI Demo</h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Select a topic below to see how our AI coach can help with your fitness and nutrition goals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {demoPrompts.map((prompt) => (
              <div 
                key={prompt.id}
                onClick={() => handlePromptSelect(prompt.id)}
                className={`border rounded-lg p-6 cursor-pointer transition-all ${
                  selectedPrompt === prompt.id 
                    ? 'border-green-500 bg-green-50 shadow-md' 
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{prompt.title}</h3>
                <p className="text-gray-600 mb-3">{prompt.description}</p>
                <div className="bg-white p-3 rounded border border-gray-200 text-sm text-gray-700">
                  "{prompt.prompt}"
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={handleStartDemo}
              disabled={!selectedPrompt}
              className={`px-6 py-3 rounded-md shadow-sm text-white font-medium ${
                selectedPrompt 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Start Demo
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}