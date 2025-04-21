'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function ChatInterface() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userId = user ? user.id : 'guest';

  // Load chat history and set default prompt if no conversation exists
  useEffect(() => {
    const fetchPreviousConversation = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/get-conversation/${userId}`);
        const data = await response.json();
        if (data.conversation) {
          const formattedMessages = data.conversation.map((msg: any) => ({
            id: msg.timestamp,
            role: msg.role,
            content: msg.content,
            timestamp: new Date(msg.timestamp),
          }));
          setMessages(formattedMessages);
        } else {
          // No previous conversation exists, set a default message
          const defaultMessage: Message = {
            id: 'default-1',
            role: 'assistant',
            content: 'Hello! How can I assist you today with your fitness and nutrition goals?',
            timestamp: new Date().toISOString(),
          };
          setMessages([defaultMessage]);
        }
      } catch (error) {
        console.error('Error fetching previous conversation:', error);
      }
    };

    fetchPreviousConversation();
  }, [userId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputMessage.trim() === '') return;


    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const data = {
        user_prompt: userMessage.content,
        agent_name: 'health_coach',
        user_id: userId,
      };

      const response = await fetch('http://127.0.0.1:8000/submit-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });


      console.log(JSON.stringify(data));
      if (!response.ok) throw new Error('Failed to get AI response');

      const responseData = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseData.response, // HTML content
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Only render the component client-side
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a placeholder with the same structure but no content during SSR
    return (
      <div className="flex flex-col bg-white rounded-lg shadow-lg h-[600px] max-w-3xl mx-auto">
        <div className="bg-green-600 text-white px-4 py-3 rounded-t-lg flex items-center">
          <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center mr-3">
            <span className="text-green-600 font-bold text-sm">AI</span>
          </div>
          <div>
            <h2 className="font-semibold">FitMind AI Coach</h2>
            <p className="text-xs opacity-80">Always here to help with your fitness and nutrition needs</p>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto"></div>
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black h-10"></div>
            <div className="rounded-full p-2 bg-gray-300 text-gray-500 h-10 w-10"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg h-[600px] max-w-3xl mx-auto">
      {/* Chat header */}
      <div className="bg-green-600 text-white px-4 py-3 rounded-t-lg flex items-center">
        <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center mr-3">
          <span className="text-green-600 font-bold text-sm">AI</span>
        </div>
        <div>
          <h2 className="font-semibold">FitMind AI Coach</h2>
          <p className="text-xs opacity-80">Always here to help with your fitness and nutrition needs</p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mb-3 ${
              message.role === 'user' ? 'ml-auto' : 'mr-auto'
            }`}
          >
            <div
              className={`p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-green-500 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.role === 'user' ? (
                message.content
              ) : (
                <div dangerouslySetInnerHTML={{ __html: message.content }} />
              )}
            </div>
            <div
              className={`text-xs text-gray-500 mt-1 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 max-w-xs">
            <div className="bg-gray-100 p-3 rounded-lg text-gray-800 rounded-bl-none flex items-center">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0ms' }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about nutrition, workouts, or health goals..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`rounded-full p-2 ${
              isLoading || inputMessage.trim() === ''
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
            disabled={isLoading || inputMessage.trim() === ''}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
