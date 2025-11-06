"use client";
import { Card } from "./components/ui/card";
import { 
  FileText, 
  BookOpen, 
  FileSpreadsheet, 
  GitBranch, 
  Briefcase, 
  Clock, 
  Shield 
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  
  const navigationItems = [
    {
      title: "GR&SR",
      description: "General Rules & Subsidiary Rules",
      icon: BookOpen,
      href: "/chapter"
    },
    {
      title: "Manuals",
      description: "Operating & Safety Manuals",
      icon: FileText,
      href: "/manuals"
    },
    {
      title: "Circulars",
      description: "Latest Circulars & Notices",
      icon: FileSpreadsheet,
      href: "/circulars"
    },
    {
      title: "Scenarios",
      description: "Training Scenarios & Cases",
      icon: GitBranch,
      href: "/scenarios"
    },
    {
      title: "JPO",
      description: "Joint Procedure Orders",
      icon: Briefcase,
      href: "/jpo"
    },
    {
      title: "Change Log",
      description: "System Updates & Changes",
      icon: Clock,
      href: "/changelog"
    },
    {
      title: "Admin",
      description: "Administrative Access",
      icon: Shield,
      href: "/login"
    }
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1728110400867-a5c93f6893b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByYWlsd2F5JTIwdHJhaW58ZW58MXx8fHwxNzYyMzMyODE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)'
        }}
      >
        {/* Mobile Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-blue-900/75 to-slate-900/90 lg:hidden"></div>
        
        {/* Desktop Gradient Overlay */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent"></div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden relative z-10 min-h-screen flex flex-col">
        {/* Mobile App Header */}
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/50 border-2 border-white/20">
                <svg 
                  className="w-9 h-9 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-900"></div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-white mb-1 tracking-tight">Rail Rules</h1>
            <p className="text-blue-200/90 text-sm">Select a module to continue</p>
          </div>
        </div>

        {/* Mobile Navigation Grid */}
        <div className="flex-1 px-4 pb-6">
          <div className="max-w-md mx-auto space-y-2.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="group active:scale-[0.98] transition-all duration-200 cursor-pointer border-white/10 bg-slate-900/80 backdrop-blur-xl hover:bg-slate-900/90 shadow-lg hover:shadow-xl"
                  onClick={() => handleNavigation(item.href)}
                >
                  <div className="p-2.5 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/30">
                      <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white mb-0 text-xs font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-[11px] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <svg
                      className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Mobile Bottom Footer */}
        <div className="px-6 py-5 mt-auto">
          <div className="max-w-md mx-auto">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 px-4 py-3">
              <p className="text-white/70 text-xs text-center">
                © 2025 Rail Rules. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex relative z-10 min-h-screen">
        {/* Left Side - Content Panel */}
        <div className="w-1/2 xl:w-2/5 flex flex-col justify-center px-12 xl:px-20 py-12">
          {/* Desktop Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-xl flex items-center justify-center shadow-2xl shadow-orange-500/30">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-white mb-0">Rail Rules</h1>
                <p className="text-blue-200/80 text-sm">Railway Documentation Portal</p>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-white">Welcome Back</h2>
              <p className="text-blue-100/90 max-w-lg">
                Access comprehensive railway documentation, rules, and administrative resources. Select a module below to get started.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Grid */}
          <div className="grid grid-cols-1 gap-3 max-w-2xl">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-x-1 cursor-pointer border-white/10 bg-slate-900/80 backdrop-blur-xl hover:bg-slate-900/90"
                  onClick={() => handleNavigation(item.href)}
                >
                  <div className="p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/40">
                      <Icon className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white mb-0 group-hover:text-blue-300 transition-colors text-sm font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-[11px] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <svg
                      className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Desktop Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <p className="text-white/60">© 2025 Rail Rules. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-white/60 hover:text-white transition-colors">Help</a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">Support</a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Visual Space for background image */}
        <div className="flex-1 relative">
          {/* Optional: Add decorative elements or let the background shine */}
          <div className="absolute bottom-12 right-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 max-w-sm">
            <h3 className="text-white mb-2">System Status</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Last updated: Today, 09:30 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
