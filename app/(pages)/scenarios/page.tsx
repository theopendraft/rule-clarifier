'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Menu, Search, LogOut, BookOpen, FileText } from 'lucide-react';

export default function ScenariosPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const menuItems = [
    { label: 'GR&SR', id: 'grsr' },
    { label: 'Manuals', id: 'manuals' },
    { label: 'Circulars', id: 'circulars' },
    { label: 'Scenarios', id: 'scenarios' },
    { label: 'JPO', id: 'jpo' },
    { label: 'Admin?', id: 'admin' },
    { label: 'Change log', id: 'changelog' },
  ];

  const handleMenuClick = (id: string) => {
    if (id === 'grsr') router.push('/rules');
    else if (id === 'manuals') router.push('/manuals');
    else if (id === 'circulars') router.push('/circulars');
    else if (id === 'scenarios') router.push('/scenarios');
    else if (id === 'jpo') router.push('/jpo');
    else if (id === 'admin') router.push('/admin');
    else if (id === 'changelog') router.push('/changelog');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-50 border-b border-blue-700">
        <div className="flex items-center justify-between px-4 py-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M12 2L2 7v10c0 5.5 3.8 10.7 10 12 6.2-1.3 10-6.5 10-12V7l-10-5z" fill="#1e40af" stroke="#1e40af" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-wide">Rail Rules</h1>
              <p className="text-xs text-blue-200">Indian Railways</p>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-blue-700 ml-2">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {showSearch ? (
              <div className="flex items-center gap-2 bg-blue-700 rounded-lg px-3 py-2">
                <Search className="h-4 w-4 text-blue-200" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-white placeholder-blue-200 w-48"
                  autoFocus
                />
                <Button variant="ghost" size="icon" onClick={() => { setShowSearch(false); setSearchQuery(''); }} className="h-6 w-6 text-white hover:bg-blue-600">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)} className="text-white hover:bg-blue-700">
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowSearch(!showSearch)} className="md:hidden text-white hover:bg-blue-700">
              <Search className="h-5 w-5" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-blue-700">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[280px] sm:w-[350px] bg-white">
                <SheetHeader>
                  <SheetTitle className="text-lg font-semibold text-blue-900">Menu</SheetTitle>
                  <SheetDescription className="text-sm text-slate-600">Navigate through different sections</SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <button key={item.id} onClick={() => handleMenuClick(item.id)} className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-900 transition-colors font-medium">
                        {item.label}
                      </button>
                    ))}
                  </nav>
                  <Separator className="my-6" />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors font-medium flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {showSearch && (
          <div className="md:hidden px-4 pb-3">
            <div className="flex items-center gap-2 bg-blue-700 rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-blue-200" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="bg-transparent border-none outline-none text-white placeholder-blue-200 flex-1" />
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-md border border-slate-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-3">Scenarios</Badge>
                <h1 className="text-3xl text-blue-900 mb-2">Railway Scenarios</h1>
                <p className="text-slate-600">Practical scenarios and case studies for railway operations</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-slate-900 mb-3">Coming Soon</h3>
                    <p className="text-slate-700 leading-relaxed">
                      Railway Scenarios section is under development. This section will contain practical scenarios, 
                      case studies, and real-world examples to help understand the application of railway rules and regulations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
