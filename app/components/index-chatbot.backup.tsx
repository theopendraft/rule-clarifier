'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Sparkles, ChevronDown, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { getOrCreateUserId } from '../../lib/user-id';
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

export function IndexChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

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

        setMessages(historyMessages);
        setShowGreeting(false); // Don't show greeting if history exists
      }
      setHasLoadedHistory(true);
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
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
      if (!hasLoadedHistory) {
        await fetchHistory();
      }
    }

    // Hide greeting when user sends first message
    setShowGreeting(false);

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
      <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
        {/* Header with Cancel Button */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 lg:px-6 py-4 lg:py-5 border-b border-white/10 shadow-lg">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20 h-8 w-8"
              onClick={() => setIsExpanded(false)}
            >
              <X className="w-5 h-5" />
            </Button>
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-xl">
              <Bot className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-base lg:text-lg font-semibold">AI Chat Assistant</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <p className="text-blue-100 text-xs lg:text-sm">Online & Ready to Help</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-0 hidden sm:flex">
              <Sparkles className="w-3 h-3 mr-1" />
              Smart AI
            </Badge>
          </div>
        </div>

        <ScrollArea className="flex-1 bg-slate-50">
          <div ref={scrollRef} className="p-4 space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 animate-in slide-in-from-bottom-2 duration-200 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Bot className="h-5 w-5 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                      : 'bg-white text-slate-900 border border-slate-200'
                  }`}
                >
                  {message.sender === 'bot' ? (
                    <>
                      <div className="text-sm prose prose-sm max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-strong:text-slate-900 prose-code:text-blue-600">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.text}
                        </ReactMarkdown>
                      </div>
                      {message.contexts && message.contexts.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-200">
                          <p className="text-xs font-semibold text-slate-500 mb-2">Sources:</p>
                          <div className="space-y-1">
                            {message.contexts.map((context, idx) => (
                              <div key={idx} className="group relative">
                                <div className="text-xs bg-blue-50 rounded px-2 py-1 border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors">
                                  <FileText className="w-3 h-3 inline-block mr-1 text-blue-600" />
                                  <span className="font-medium text-blue-700">{context.source}</span>
                                  <span className="text-slate-500 ml-2">• Score: {(context.score * 100).toFixed(0)}%</span>
                                </div>
                                <div className="absolute left-0 top-full mt-1 w-80 bg-white border border-slate-300 rounded-lg shadow-xl p-3 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none">
                                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200">
                                    <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                    <p className="text-xs font-semibold text-slate-700 truncate">{context.source}</p>
                                  </div>
                                  <div className="max-h-48 overflow-y-auto text-xs text-slate-600 leading-relaxed custom-scrollbar">
                                    {context.text}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-sm">{message.text}</p>
                  )}
                  <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start animate-in slide-in-from-bottom-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-blue-600" />
                </div>
                <div className="bg-white rounded-2xl px-4 py-3 shadow-md border border-slate-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="bg-white border-t border-slate-200 px-5 lg:px-6 py-4 lg:py-5 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <Input
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 bg-white text-slate-900 placeholder:text-slate-500 border-slate-300 rounded-xl h-12 lg:h-14 shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 w-12 lg:h-14 lg:w-14 shadow-lg shadow-blue-500/30"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-3">
              <Sparkles className="w-3 h-3" />
              Powered by advanced AI - Get instant, accurate answers
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-2xl border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20 overflow-hidden flex-1 flex flex-col lg:flex-none transition-all duration-300">
      <CardContent className="p-0 flex flex-col h-full lg:h-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 lg:px-6 py-4 lg:py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-xl">
              <Bot className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-base lg:text-lg">AI Chat Assistant</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <p className="text-blue-100 text-xs lg:text-sm">Online & Ready to Help</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-0 hidden sm:flex">
              <Sparkles className="w-3 h-3 mr-1" />
              Smart AI
            </Badge>
          </div>
        </div>

        {showGreeting && (
          <div className="bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-sm flex items-center justify-center px-5 lg:px-6 flex-1 lg:flex-none lg:h-[380px]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto shadow-lg">
                <Bot className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <div>
                <h4 className="text-white text-lg lg:text-xl mb-2">Hello! I'm your Railway Assistant</h4>
                <p className="text-slate-300 text-sm">Ask me anything about railway rules, regulations, or procedures.</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-sm px-5 lg:px-6 py-4 lg:py-5 border-t border-white/10">
          <div className="flex gap-3">
            <Input
              placeholder="Ask me anything about railway rules and regulations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1 bg-white text-slate-900 placeholder:text-slate-500 border-0 rounded-xl h-12 lg:h-14 shadow-lg focus:ring-2 focus:ring-blue-500"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 w-12 lg:h-14 lg:w-14 shadow-xl shadow-blue-500/30"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-blue-200 flex items-center gap-1 mt-3">
            <Sparkles className="w-3 h-3" />
            Powered by advanced AI - Get instant, accurate answers
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
