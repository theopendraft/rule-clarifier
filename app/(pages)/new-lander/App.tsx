import { useState } from 'react';
import { MessageCircle, Book, Shield, Settings, Users, AlertTriangle, GraduationCap, Send, Bot, Sparkles } from 'lucide-react';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { ScrollArea } from './components/ui/scroll-area';
import { Badge } from './components/ui/badge';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const navigationSections = [
  { id: 1, title: 'Rules & Regulations', icon: Book, gradient: 'from-blue-500 to-blue-600' },
  { id: 2, title: 'Safety Guidelines', icon: Shield, gradient: 'from-green-500 to-green-600' },
  { id: 3, title: 'Operations Manual', icon: Settings, gradient: 'from-purple-500 to-purple-600' },
  { id: 4, title: 'Staff Directory', icon: Users, gradient: 'from-orange-500 to-orange-600' },
  { id: 5, title: 'Emergency Protocols', icon: AlertTriangle, gradient: 'from-red-500 to-red-600' },
  { id: 6, title: 'Training Materials', icon: GraduationCap, gradient: 'from-indigo-500 to-indigo-600' },
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Southern Railways assistant. Ask me anything about railway rules, regulations, or procedures.",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "I understand your question about railway procedures. Let me help you find the relevant information in our rules repository.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleNavigationClick = (section: typeof navigationSections[0]) => {
    console.log('Navigate to:', section.title);
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-900 relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1693680204133-5711f0a74465?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0cmFpbiUyMHJhaWx3YXl8ZW58MXx8fHwxNzYzMDIzODcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Railway background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Compact Header */}
        <header className="px-4 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white text-base lg:text-lg">Southern Railways</h1>
                <p className="text-blue-200 text-xs">Rules Repository</p>
              </div>
            </div>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </header>

        {/* Main Content - Centered */}
        <main className="flex-1 flex items-center justify-center px-4 lg:px-8 pb-8">
          <div className="max-w-7xl w-full">
            <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-center">
              {/* Hero Content - Left Side */}
              <div className="lg:col-span-2 text-center lg:text-left space-y-4">
                <div className="space-y-3">
                  <h2 className="text-white text-3xl lg:text-5xl xl:text-6xl leading-tight">
                    Railway Rules
                    <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      Made Simple
                    </span>
                  </h2>
                  <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
                    Chat with our AI assistant or browse comprehensive railway regulations and safety guidelines.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 py-4">
                  <div className="text-center lg:text-left">
                    <p className="text-white text-xl lg:text-2xl">5,964</p>
                    <p className="text-slate-400 text-xs">Rules</p>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-white text-xl lg:text-2xl">24</p>
                    <p className="text-slate-400 text-xs">Categories</p>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-white text-xl lg:text-2xl">24/7</p>
                    <p className="text-slate-400 text-xs">Support</p>
                  </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 lg:gap-3">
                  {navigationSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <Card
                        key={section.id}
                        className="bg-white/5 backdrop-blur-lg border border-white/10 cursor-pointer hover:bg-white/10 hover:scale-105 transition-all duration-200 overflow-hidden group"
                        onClick={() => handleNavigationClick(section)}
                      >
                        <CardContent className="p-3 lg:p-4 flex items-center gap-3">
                          <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg flex-shrink-0`}>
                            <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                          </div>
                          <h4 className="text-white text-xs lg:text-sm flex-1 text-left">
                            {section.title}
                          </h4>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* AI Chat Interface - Right Side (Highlighted) */}
              <div className="lg:col-span-3">
                <Card className="bg-white/10 backdrop-blur-2xl border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Chat Header */}
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

                    {/* Chat Messages */}
                    <div className="bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-sm h-[300px] lg:h-[380px]">
                      <ScrollArea className="h-full px-5 lg:px-6 py-5 lg:py-6">
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              {message.sender === 'bot' && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-3 flex-shrink-0 shadow-lg">
                                  <Bot className="w-4 h-4 text-white" />
                                </div>
                              )}
                              <div
                                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-lg ${
                                  message.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-sm'
                                    : 'bg-white text-slate-800 rounded-bl-sm'
                                }`}
                              >
                                <p className="text-sm leading-relaxed">{message.text}</p>
                                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Chat Input */}
                    <div className="bg-white/10 backdrop-blur-sm px-5 lg:px-6 py-4 lg:py-5 border-t border-white/10">
                      <div className="flex gap-3">
                        <Input
                          placeholder="Ask me anything about railway rules and regulations..."
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="flex-1 bg-white text-slate-900 placeholder:text-slate-500 border-0 rounded-xl h-12 lg:h-14 shadow-lg"
                        />
                        <Button
                          onClick={handleSendMessage}
                          size="icon"
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
