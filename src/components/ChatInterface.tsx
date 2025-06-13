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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'; // Max height of ~4 lines
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputMessage]);

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

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
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
      return <p className="text-white whitespace-pre-wrap">{content}</p>;
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
      <div className="flex-1 flex flex-col bg-white">
        <div className="bg-green-600 text-white px-6 py-4 flex items-center shadow-md">
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center mr-4">
            <span className="text-green-600 font-bold">AI</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg">FitMind AI Coach</h2>
            <p className="text-sm opacity-80">Always here to help with your fitness and nutrition needs</p>
          </div>
        </div>
        <div className="flex-1 bg-gray-50"></div>
        <div className="border-t border-gray-200 p-6 bg-white">
          <div className="flex items-end space-x-3">
            <div className="flex-1 min-h-[48px] border border-gray-300 rounded-2xl px-4 py-3 bg-gray-100"></div>
            <div className="rounded-full p-3 bg-gray-300 text-gray-500 h-12 w-12 flex items-center justify-center"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat header - fixed */}
      <div className="bg-green-600 text-white px-6 py-4 flex items-center shadow-md flex-shrink-0">
        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center mr-4">
          <span className="text-green-600 font-bold">AI</span>
        </div>
        <div>
          <h2 className="font-semibold text-lg">FitMind AI Coach</h2>
          <p className="text-sm opacity-80">Always here to help with your fitness and nutrition needs</p>
        </div>
      </div>

      {/* Chat messages - scrollable area */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-6 space-y-4">
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
                    ? 'max-w-xs md:max-w-md lg:max-w-lg bg-green-500 text-white rounded-2xl rounded-br-md'
                    : 'max-w-md md:max-w-lg lg:max-w-2xl bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-200'
                } px-4 py-3`}
              >
                {renderMessageContent(message.content, message.role)}
                
                {/* Message timestamp */}
                <div
                  className={`text-xs ${
                    message.role === 'user' ? 'text-green-100' : 'text-gray-500'
                  } mt-2 text-right`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-200">
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
      </div>

      {/* Chat input - fixed at bottom */}
      <div className="border-t border-gray-200 p-6 bg-white flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about nutrition, workouts, or health goals..."
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black resize-none overflow-hidden min-h-[48px] max-h-[120px]"
              disabled={isLoading}
              rows={1}
            />
          </div>
          <button
            type="submit"
            className={`rounded-full p-3 flex-shrink-0 ${
              isLoading || inputMessage.trim() === ''
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            } transition-colors h-12 w-12 flex items-center justify-center`}
            disabled={isLoading || inputMessage.trim() === ''}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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