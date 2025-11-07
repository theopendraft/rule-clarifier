import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { getOrCreateUserId } from '../../../../lib/user-id';

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

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Rail Rules assistant. Ask me anything about railway regulations, chapters, or safety procedures.',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initUserId = async () => {
      const id = await getOrCreateUserId();
      setUserId(id);
    };
    initUserId();
  }, []);

  useEffect(() => {
    if (isExpanded && userId) {
      fetchHistory();
    }
  }, [isExpanded, userId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchHistory = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_RAG_API_URL}/api/chat/history/${userId}?page=1&pageSize=50`);
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

        setMessages(prev => [...prev, ...historyMessages]);
      }
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !userId) return;

    const query = inputValue;
    setInputValue('');
    setIsExpanded(true); // Expand on send

    const userMessage: Message = {
      id: Date.now().toString(),
      text: query,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_RAG_API_URL}/api/chat`, {
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
      <div className="fixed inset-0 bg-white z-40 flex flex-col">
        {/* Expanded Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Rail Rules Assistant</h3>
              <p className="text-xs text-blue-200">Online</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(false)}
            className="text-white hover:bg-blue-700"
          >
            <Minimize2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Expanded Messages */}
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
                  <p className="text-sm">{message.text}</p>
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

        {/* Expanded Input */}
        <div className="border-t border-slate-200 p-4 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
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
    <div className="sticky bottom-0 border-t border-slate-200 bg-white shadow-lg z-40">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Bot Icon */}
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="h-6 w-6 text-blue-600" />
          </div>

          {/* Input Field */}
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about railway rules, chapters, or regulations..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm disabled:opacity-50"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Expand Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsExpanded(true)}
            className="border-slate-300"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick suggestions */}
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {['Chapter info', 'Safety rules', 'Emergency procedures'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputValue(suggestion)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-xs text-slate-700 whitespace-nowrap transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
