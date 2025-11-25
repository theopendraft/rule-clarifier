'use client';

import { usePathname } from 'next/navigation';
import { Chatbot } from './ui/chatbot';

export function ChatbotWrapper() {
  const pathname = usePathname();
  
  if (pathname === '/' || pathname === '/login' || pathname === '/loading' || pathname.startsWith('/_admin') || pathname === '/upload' || pathname === '/upload-rules' || pathname.startsWith('/manuals/') || pathname.startsWith('/circulars/')) return null;
  
  return <Chatbot />;
}
