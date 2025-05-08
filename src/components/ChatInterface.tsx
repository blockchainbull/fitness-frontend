// src/components/ChatInterface.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
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
        console.log("Fetching conversation for user:", userId);
        const response = await fetch(`http://127.0.0.1:8000/get-conversation/${userId}`);
        const data = await response.json();
        
        if (data.conversation && data.conversation.length > 0) {
          const formattedMessages = data.conversation.map((msg: any) => ({
            id: msg.timestamp || Date.now().toString(),
            role: msg.role || 'assistant',
            content: msg.content || '',
            timestamp: msg.timestamp || new Date().toISOString(),
          }));
          setMessages(formattedMessages);
        } else {
          // No previous conversation exists, set a default message
          const defaultMessage: Message = {
            id: 'default-1',
            role: 'assistant',
            content: `Hello ${user?.name || 'there'}! How can I assist you today with your fitness and nutrition goals?`,
            timestamp: new Date().toISOString(),
          };
          setMessages([defaultMessage]);
        }
      } catch (error) {
        console.error('Error fetching previous conversation:', error);
        // Still show default message on error
        const defaultMessage: Message = {
          id: 'default-1',
          role: 'assistant',
          content: 'Hello! How can I assist you today with your fitness and nutrition goals?',
          timestamp: new Date().toISOString(),
        };
        setMessages([defaultMessage]);
      }
    };
  
    fetchPreviousConversation();
  }, [userId, user]);

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

  // Process and enhance the HTML content
  const processHtmlContent = (html: string) => {
    // This function adds additional CSS classes to elements within the HTML
    let processedHtml = html;
    
    // Add styling for headings
    processedHtml = processedHtml.replace(/<h1>/g, '<h1 class="text-xl font-bold mb-2">');
    processedHtml = processedHtml.replace(/<h2>/g, '<h2 class="text-lg font-bold mb-2">');
    processedHtml = processedHtml.replace(/<h3>/g, '<h3 class="text-base font-bold mb-2">');
    
    // Add styling for paragraphs
    processedHtml = processedHtml.replace(/<p>/g, '<p class="mb-2">');
    
    // Add styling for lists
    processedHtml = processedHtml.replace(/<ul>/g, '<ul class="list-disc pl-5 mb-2 space-y-1">');
    processedHtml = processedHtml.replace(/<ol>/g, '<ol class="list-decimal pl-5 mb-2 space-y-1">');
    
    // Add styling for list items
    processedHtml = processedHtml.replace(/<li>/g, '<li class="mb-1">');
    
    // Add styling for strong/bold text
    processedHtml = processedHtml.replace(/<strong>/g, '<strong class="font-bold">');
    
    return processedHtml;
  };

  // Safely render HTML content
  const renderMessageContent = (content: string, role: string) => {
    if (role === 'user') {
      return <p className="text-white">{content}</p>;
    }
    
    // Process assistant's HTML content to add styling
    const enhancedContent = processHtmlContent(content);
    return (
      <div 
        className="ai-response text-gray-800 text-left" 
        dangerouslySetInnerHTML={{ __html: enhancedContent }} 
      />
    );
  };

  // Add global styles for the chat interface
  useEffect(() => {
    // Add styles to make the chat more like the screenshots
    const style = document.createElement('style');
    style.innerHTML = `
      .ai-response h1, .ai-response h2, .ai-response h3 { 
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      .ai-response ul, .ai-response ol {
        padding-left: 1.25rem;
        margin-bottom: 0.5rem;
      }
      .ai-response ul {
        list-style-type: disc;
      }
      .ai-response ol {
        list-style-type: decimal;
      }
      .ai-response li {
        margin-bottom: 0.25rem;
      }
      .ai-response p {
        margin-bottom: 0.5rem;
      }
      .ai-response strong {
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format time from ISO string
  const formatTime = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return '';
    }
  };

  // Only render the component client-side
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
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
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`${
                  message.role === 'user' 
                    ? 'max-w-xs md:max-w-sm bg-green-500 text-white rounded-lg rounded-br-none'
                    : 'max-w-md md:max-w-lg bg-gray-100 text-gray-800 rounded-lg rounded-bl-none'
                } px-4 py-3`}
              >
                {renderMessageContent(message.content, message.role)}
                
                {/* Message timestamp - inside bubble for cleaner look */}
                <div
                  className={`text-xs ${
                    message.role === 'user' ? 'text-green-100' : 'text-gray-500'
                  } mt-1 text-right`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start mt-4">
            <div className="bg-gray-100 px-4 py-3 rounded-lg rounded-bl-none">
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
        
        {/* Auto-scroll anchor */}
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