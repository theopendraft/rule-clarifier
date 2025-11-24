'use client';

import { usePathname } from 'next/navigation';
import { Chatbot } from './ui/chatbot';

export function ChatbotWrapper() {
  const pathname = usePathname();
  
  if (pathname === '/' || pathname === '/login' || pathname.startsWith('/_admin')) return null;
  
  return <Chatbot />;
}
