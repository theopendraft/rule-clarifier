'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, User, X } from 'lucide-react';
import { Button } from './button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const query = input;
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-10 sm:bottom-24 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] sm:w-full max-w-3xl h-[60vh] sm:h-[700px] bg-white rounded-lg shadow-2xl border border-slate-200 flex flex-col z-50 rounded-full">
          {/* Header */}
          {/* <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 sm:p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base font-semibold">Railway Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-orange-700 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div> */}

          {/* Messages */}
          {/* <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 mt-4 sm:mt-8">
                <MessageCircle className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-2 text-orange-500" />
                <p className="text-xs sm:text-sm">Ask me anything about railway rules</p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex gap-2 max-w-[85%] sm:max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' ? 'bg-orange-500' : 'bg-slate-300'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    ) : (
                      <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-slate-700" />
                    )}
                  </div>
                  <div
                    className={`px-3 py-2 sm:px-4 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-orange-500 text-white'
                        : 'bg-white text-slate-800 border border-slate-200'
                    }`}
                  >
                    <p className="text-xs sm:text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div> */}
          <iframe
              src="https://widget.aladdyn.io/01a98303-32bd-4e33-af59-3b6531028ae0"
              className="w-full h-full border-0 rounded-lg"
              title="Chatbot Preview"
              allow="microphone; clipboard-read; clipboard-write"
            />

        </div>
      )}

      {/* Floating Search Bar */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-[calc(100%-2rem)] sm:w-full max-w-3xl">
        {/* Toggle button: opens/closes the chatbot. No input required. */}
        <div className="flex items-center justify-center">
          <Button
            onClick={() => setIsOpen((s) => !s)}
            aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full h-16 w-16 flex items-center justify-center shadow-lg"
          >
            {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-12 w-12" />}
          </Button>
        </div>


         {/* <div className="bg-white rounded-full shadow-2xl border-2 border-orange-200 flex items-center px-4 sm:px-6 py-3 sm:py-4 hover:shadow-3xl transition-all hover:border-orange-300">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            onFocus={() => setIsOpen(true)}
            placeholder="Ask about railway rules..."
            className="flex-1 outline-none text-slate-700 placeholder-slate-400 text-sm sm:text-base"
          />
          <Button
            onClick={handleSend}
            className="bg-orange-500 hover:bg-orange-600 rounded-full h-9 w-9 sm:h-10 sm:w-10 p-0 ml-2 sm:ml-3 flex-shrink-0"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div> */}
      </div>
    </>
  );
}
