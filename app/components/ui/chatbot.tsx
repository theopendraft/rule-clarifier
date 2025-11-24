'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Maximize2, Minimize2, X } from 'lucide-react';
import { Button } from './button';
import { ScrollArea } from './scroll-area';
import { getOrCreateUserId } from '../../../lib/user-id';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  contexts?: Array<{ text: string; source: string; score: number }>;
}

interface HistoryMessage {
  id: string;
  userId: string;
  query: string;
  response: string;
  contexts: Array<{ text: string; source: string; score: number }>;
  timestamp: string;
}

interface ChatbotProps {
  onExpandChange?: (expanded: boolean) => void;
}

export function Chatbot({ onExpandChange }: ChatbotProps = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initUserId = async () => {
      const id = await getOrCreateUserId();
      setUserId(id);
    };
    initUserId();
  }, []);

  useEffect(() => {
    if (isExpanded && userId && !hasLoadedHistory) {
      fetchHistory();
    }
  }, [isExpanded, userId, hasLoadedHistory]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchHistory = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`/api/chat/history/${userId}?page=1&pageSize=50`);
      const data = await response.json();

      if (data.success && data.data.messages.length > 0) {
        const historyMessages: Message[] = data.data.messages.flatMap((msg: HistoryMessage) => [
          {
            id: `${msg.id}-query`,
            text: msg.query,
            sender: 'user' as const,
            timestamp: new Date(msg.timestamp),
          },
          {
            id: `${msg.id}-response`,
            text: msg.response,
            sender: 'bot' as const,
            timestamp: new Date(msg.timestamp),
            contexts: msg.contexts,
          },
        ]);

        setMessages(historyMessages);
      } else {
        // No history, add greeting
        const greetingMessage: Message = {
          id: 'greeting',
          text: 'Hello! I\'m your Rail Rules assistant. Ask me anything about railway regulations, chapters, or safety procedures.',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages([greetingMessage]);
      }
      setHasLoadedHistory(true);
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
      // On error, still show greeting
      const greetingMessage: Message = {
        id: 'greeting',
        text: 'Hello! I\'m your Rail Rules assistant. Ask me anything about railway regulations, chapters, or safety procedures.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([greetingMessage]);
      setHasLoadedHistory(true);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !userId) return;

    const query = input;
    setInput('');
    
    // If not expanded, expand first and load history if needed
    if (!isExpanded) {
      setIsExpanded(true);
      onExpandChange?.(true);
      if (!hasLoadedHistory) {
        await fetchHistory();
      }
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: query,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, query }),
      });

      if (!response.ok) throw new Error('Chat request failed');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      let botMessageText = '';
      const botMessageId = (Date.now() + 1).toString();

      const botMessage: Message = {
        id: botMessageId,
        text: '',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.chunk) {
                botMessageText += data.chunk;
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === botMessageId ? { ...msg, text: botMessageText } : msg
                  )
                );
              }
              if (data.done) {
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === botMessageId ? { ...msg, contexts: data.contexts } : msg
                  )
                );
                break;
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isExpanded) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
        {/* Header with Cancel Button */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Rail Rules Assistant</h3>
              <p className="text-xs text-blue-200">Online</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsExpanded(false);
              onExpandChange?.(false);
            }}
            className="text-white hover:bg-blue-700 h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div ref={scrollRef} className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  {message.sender === 'bot' ? (
                    <div className="text-sm prose prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{message.text}</p>
                  )}
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t border-slate-200 p-4 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 px-6"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky bottom-0 border-t border-slate-200 bg-white shadow-lg z-30 transition-all duration-300 hover:shadow-xl" style={{ marginBottom: '0px', maxHeight: 'calc(100vh - 120px)' }}>
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 hover:bg-blue-200">
            <Bot className="h-6 w-6 text-blue-600" />
          </div>

          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about railway rules, chapters, or regulations..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm disabled:opacity-50 transition-all duration-200"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 px-4 transition-colors duration-200"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setIsExpanded(true);
              onExpandChange?.(true);
            }}
            className="border-slate-300 hover:bg-slate-50 transition-colors duration-200"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto">
          {['Chapter info', 'Safety rules', 'Emergency procedures'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-xs text-slate-700 whitespace-nowrap transition-colors duration-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
