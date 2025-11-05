import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface RailRulesHeaderProps {
  onAdminAccess: () => void;
}

export function RailRulesHeader({ onAdminAccess }: RailRulesHeaderProps) {
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
    if (id === 'admin') {
      onAdminAccess();
    } else {
      console.log(`Navigate to: ${id}`);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-50 border-b border-blue-700">
      <div className="flex items-center justify-between px-4 py-4">
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
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[280px] sm:w-[350px] bg-white">
            <SheetHeader>
              <SheetTitle className="text-lg font-semibold text-blue-900">Menu</SheetTitle>
              <SheetDescription className="text-sm text-slate-600">
                Navigate through different sections and features
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-900 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              <Separator className="my-6" />
              <div className="px-4 py-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-slate-600">Version 2.0.1</p>
                <p className="text-xs text-slate-500 mt-1">Last updated: Nov 2025</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
