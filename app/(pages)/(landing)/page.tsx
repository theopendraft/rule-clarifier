"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, BookOpen, GitCompare, GitBranch, Briefcase, FileText,
  Shield, Sparkles, Send, Bot, ChevronUp, ChevronDown
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const featureCards = [
    { title: "GR&SR", icon: Search, href: "/grsr", gradient: "from-blue-500 to-blue-600", description: "General & Subsidiary Rules" },
    { title: "Manuals", icon: FileText, href: "/manuals", gradient: "from-green-500 to-green-600", description: "Railway Manuals" },
    { title: "Circulars", icon: GitCompare, href: "/circulars", gradient: "from-purple-500 to-purple-600", description: "Official Circulars" },
    { title: "Scenarios", icon: GitBranch, href: "/scenarios", gradient: "from-orange-500 to-orange-600", description: "Case Studies" },
    { title: "JPO", icon: Briefcase, href: "/jpo", gradient: "from-red-500 to-red-600", description: "Joint Procedure Order" },
    { title: "Recent correction", icon: BookOpen, href: "/changelog", gradient: "from-indigo-500 to-indigo-600", description: "Recent Updates" },
  ];

  return (
    <div className="h-screen overflow-hidden bg-slate-900 relative">
      <div className="absolute inset-0">
        <img 
          src="/landing page.jpg"
          alt="Indian Railway background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95"></div>
      </div>
      
      <div className="relative z-10 h-screen flex flex-col overflow-hidden">
        <header className="px-4 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl" />
              <div>
                <h1 className="text-white text-base lg:text-lg font-semibold">Southern Railway</h1>
                <div className="text-white text-xs lg:text-sm">Compendium of railways rules</div>
              </div>
            </div> 
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </header>

        <main className="h-full flex items-center justify-center px-4 lg:px-8 overflow-y-auto">
          <div className="max-w-7xl w-full h-full">
            <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch h-full lg:items-center lg:h-full">
              <div className={`lg:col-span-2 text-center lg:text-left ${isExpanded ? 'hidden' : ''}`}>
                <div className="grid grid-cols-2 gap-4">
                  {featureCards.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Card
                        key={item.title}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 cursor-pointer hover:bg-white/15 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden group"
                        onClick={() => router.push(item.href)}
                      >
                        <CardContent className="p-4 lg:p-5">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl flex-shrink-0`}>
                              <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white text-sm lg:text-base font-semibold mb-1">
                                {item.title}
                              </h4>
                              <p className="text-blue-200/80 text-xs lg:text-sm">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-3 flex flex-col h-full lg:h-auto">
                <Card className={`bg-white/10 backdrop-blur-2xl border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20 overflow-hidden flex-1 flex flex-col lg:flex-none ${isExpanded ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
                  <CardContent className="p-0 flex flex-col h-full lg:h-auto">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 lg:px-6 py-4 lg:py-5 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="lg:hidden text-white hover:bg-white/20 h-8 w-8"
                          onClick={() => setIsExpanded(!isExpanded)}
                        >
                          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                        </Button>
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

                    <div className="bg-white/10 backdrop-blur-sm px-5 lg:px-6 py-4 lg:py-5 border-t border-white/10">
                      <div className="flex gap-3">
                        <Input
                          placeholder="Ask me anything about railway rules and regulations..."
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="flex-1 bg-white text-slate-900 placeholder:text-slate-500 border-0 rounded-xl h-12 lg:h-14 shadow-lg"
                        />
                        <Button
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
