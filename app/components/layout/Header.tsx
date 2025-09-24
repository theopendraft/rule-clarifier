'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, Settings, Train, AlertTriangle, Clock, LogOut, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";

interface ChangeLog {
  id: string;
  entityType: string;
  action: string;
  changes: any;
  reason?: string;
  createdAt: string;
  user: {
    name?: string;
    email: string;
  };
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, userRole } = useAuth();
  const { notifications, unreadCount, markAllAsRead, loading } = useNotifications();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentChanges, setRecentChanges] = useState<ChangeLog[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Searching for: ${searchQuery}`);
    }
  };

  const handleSettings = () => {
    toast.info("Settings panel would open here");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNotificationOpen = (open: boolean) => {
    setIsNotificationOpen(open);
    if (open && unreadCount > 0) {
      markAllAsRead();
    }
  };

  useEffect(() => {
    const fetchRecentChanges = async () => {
      try {
        const response = await fetch('/api/change-logs?limit=5');
        if (response.ok) {
          const data = await response.json();
          setRecentChanges(data);
        }
      } catch (error) {
        console.error('Error fetching recent changes:', error);
      }
    };
    fetchRecentChanges();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  const NavigationLinks = ({ isMobile = false, onClick }: { isMobile?: boolean; onClick?: () => void }) => (
    <>
      <Link href={userRole === 'user' ? "/users" : "/"} onClick={onClick}>
        <Button
          variant={(pathname === "/" || pathname === "/users") ? "default" : "ghost"}
          size="sm"
          className={`font-medium px-4 py-2 rounded-lg transition-all duration-200 ${isMobile ? 'w-full justify-start' : ''}`}
        >
          Home
        </Button>
      </Link>
      {userRole === 'admin' && (
        <Link href="/admin" onClick={onClick}>
          <Button
            variant={pathname === "/admin" ? "default" : "ghost"}
            size="sm"
            className={`font-medium px-4 py-2 rounded-lg transition-all duration-200 ${isMobile ? 'w-full justify-start' : ''}`}
          >
            Admin
          </Button>
        </Link>
      )}
      <Link href="/chapter" onClick={onClick}>
        <Button
          variant={pathname === "/chapter" || pathname.startsWith("/chapter/") ? "default" : "ghost"}
          size="sm"
          className={`font-medium px-4 py-2 rounded-lg transition-all duration-200 ${isMobile ? 'w-full justify-start' : ''}`}
        >
          Chapters
        </Button>
      </Link>
      <Link href="/manuals" onClick={onClick}>
        <Button
          variant={pathname === "/manuals" ? "default" : "ghost"}
          size="sm"
          className={`font-medium px-4 py-2 rounded-lg transition-all duration-200 ${isMobile ? 'w-full justify-start' : ''}`}
        >
          Manuals
        </Button>
      </Link>
      <Link href="/circulars" onClick={onClick}>
        <Button
          variant={pathname === "/circulars" ? "default" : "ghost"}
          size="sm"
          className={`font-medium px-4 py-2 rounded-lg transition-all duration-200 ${isMobile ? 'w-full justify-start' : ''}`}
        >
          Circulars
        </Button>
      </Link>
      {userRole === 'user' ? (
        <Link href="/changelog" onClick={onClick}>
          <Button
            variant={pathname === "/changelog" ? "default" : "ghost"}
            size="sm"
            className={`font-medium px-4 py-2 rounded-lg transition-all duration-200 ${isMobile ? 'w-full justify-start' : ''}`}
          >
            Changelog
          </Button>
        </Link>
      ) : (
        <>
          <Link href="/upload" onClick={onClick}>
            <Button
              variant={pathname === "/upload" ? "default" : "ghost"}
              size="sm"
              className={`font-medium px-4 py-2 rounded-lg transition-all duration-200 ${isMobile ? 'w-full justify-start' : ''}`}
            >
              Upload Files
            </Button>
          </Link>
          <Link href="/changelog" onClick={onClick}>
            <Button
              variant={pathname === "/changelog" ? "default" : "ghost"}
              size="sm"
              className={`font-medium px-4 py-2 rounded-lg transition-all duration-200 ${isMobile ? 'w-full justify-start' : ''}`}
            >
              Change Log
            </Button>
          </Link>
        </>
      )}
    </>
  );
  
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-4 group">
            <div className="bg-gradient-to-br from-slate-800 to-slate-600 p-2 sm:p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Train className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">Railway Portal</h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">Rules Management System</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">Railway Portal</h1>
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-2">
            <NavigationLinks />
          </nav>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search rules..."
              className="pl-10 w-48 lg:w-72 bg-slate-50/80 border-slate-200 focus:bg-white focus:border-slate-300 transition-all duration-200 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <Popover open={isNotificationOpen} onOpenChange={handleNotificationOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white px-1.5 py-0.5 text-xs rounded-full border-2 border-white">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 shadow-xl border-slate-200 rounded-xl" align="end">
              <Card className="border-0 shadow-none">
                <CardHeader className="pb-3 px-4 pt-4">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center justify-between">
                    Notifications
                    {unreadCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {unreadCount} new
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-64 overflow-y-auto">
                    {loading ? (
                      <div className="p-4 text-center text-slate-500">
                        <p className="text-sm">Loading notifications...</p>
                      </div>
                    ) : notifications.length > 0 ? notifications.map((notification) => (
                      <div key={notification.id} className={`flex items-start space-x-3 p-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/80 transition-colors ${!notification.isRead ? 'bg-blue-50/50' : ''}`}>
                        <div className={`p-2 rounded-lg ${
                          notification.type === "SUCCESS" ? "bg-green-50 text-green-600" :
                          notification.type === "WARNING" ? "bg-amber-50 text-amber-600" :
                          notification.type === "ERROR" ? "bg-red-50 text-red-600" :
                          notification.type === "CHANGE" ? "bg-blue-50 text-blue-600" :
                          "bg-slate-50 text-slate-600"
                        }`}>
                          {notification.type === "ERROR" ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : notification.type === "WARNING" ? (
                            <Clock className="h-4 w-4" />
                          ) : notification.type === "CHANGE" ? (
                            <Bell className="h-4 w-4" />
                          ) : (
                            <Bell className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-800 font-medium leading-tight">
                            {notification.title}
                          </p>
                          <p className="text-xs text-slate-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        )}
                      </div>
                    )) : (
                      <div className="p-4 text-center text-slate-500">
                        <p className="text-sm">No notifications</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 border-t border-slate-100">
                    <Button variant="outline" size="sm" className="w-full rounded-lg font-medium" onClick={() => router.push('/changelog')}>
                      View All Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
          
          <Button variant="ghost" size="sm" onClick={handleSettings} className="hidden sm:flex p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
          </Button>
          
          <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden sm:flex p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 text-slate-600" /> : <Menu className="h-5 w-5 text-slate-600" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-2">
            <NavigationLinks isMobile={true} onClick={closeMobileMenu} />
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <Button variant="ghost" size="sm" onClick={handleSettings} className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}