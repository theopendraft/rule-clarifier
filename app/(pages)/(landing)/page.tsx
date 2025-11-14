"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, BookOpen, GitCompare, GitBranch, Briefcase, FileText, Sparkles
} from "lucide-react";
import { useRouter } from "next/navigation";
import { IndexChatbot } from "@/components/index-chatbot";

export default function HomePage() {
  const router = useRouter();
  
  const featureCards = [
    { title: "GR&SR", icon: Search, href: "/grsr", gradient: "from-blue-500 to-blue-600", description: "General & Subsidiary Rules" },
    { title: "Manuals", icon: FileText, href: "/manuals", gradient: "from-green-500 to-green-600", description: "Railway Manuals" },
    { title: "Circulars", icon: GitCompare, href: "/circulars", gradient: "from-purple-500 to-purple-600", description: "Official Circulars" },
    { title: "Scenarios", icon: GitBranch, href: "/scenarios", gradient: "from-orange-500 to-orange-600", description: "Case Studies" },
    { title: "JPO", icon: Briefcase, href: "/jpo", gradient: "from-red-500 to-red-600", description: "Joint Procedure Order" },
    { title: "Change logs", icon: BookOpen, href: "/changelog", gradient: "from-indigo-500 to-indigo-600", description: "Recent Updates" },
  ];

  return (
    <div className="h-screen overflow-hidden bg-slate-900 relative">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1591084728795-1149f32d9866?q=80&w=2070&auto=format&fit=crop"
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
              <div className="lg:col-span-2 text-center lg:text-left">
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
                <IndexChatbot />
              </div>
            </div>
          </div>
        </main>

        <footer className="px-4 lg:px-8 py-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <button
              onClick={() => router.push('/login')}
              className="text-blue-300 hover:text-blue-200 text-sm transition-colors"
            >
              Are you Admin?
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
