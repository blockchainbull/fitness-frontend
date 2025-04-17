// src/app/chat/page.tsx
import ChatPageClient from './ChatPageClient';

export const metadata = {
  title: 'AI Coach Chat - FitMind AI',
  description: 'Chat with your personal AI nutrition and fitness coach',
};

export default function ChatPage() {
  return <ChatPageClient />;
}
