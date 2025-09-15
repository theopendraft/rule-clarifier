'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, Settings, Train, AlertTriangle, Clock, LogOut, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

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
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
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
  
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="bg-gradient-to-br from-slate-800 to-slate-600 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Train className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">Railway Portal</h1>
              <p className="text-sm text-slate-500 font-medium">Rules Management System</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-2">
            <Link href={userRole === 'user' ? "/users" : "/"}>
              <Button
                variant={(pathname === "/" || pathname === "/users") ? "default" : "ghost"}
                size="sm"
                className="font-medium px-4 py-2 rounded-lg transition-all duration-200"
              >
                Home
              </Button>
            </Link>
            {userRole === 'admin' && (
              <Link href="/admin">
                <Button
                  variant={pathname === "/admin" ? "default" : "ghost"}
                  size="sm"
                  className="font-medium px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Admin
                </Button>
              </Link>
            )}
            <Link href="/manuals">
              <Button
                variant={pathname === "/manuals" ? "default" : "ghost"}
                size="sm"
                className="font-medium px-4 py-2 rounded-lg transition-all duration-200"
              >
                Manuals
              </Button>
            </Link>
            <Link href="/circulars">
              <Button
                variant={pathname === "/circulars" ? "default" : "ghost"}
                size="sm"
                className="font-medium px-4 py-2 rounded-lg transition-all duration-200"
              >
                Circulars
              </Button>
            </Link>
            {userRole === 'user' ? (
              <Link href="/changelog">
                <Button
                  variant={pathname === "/changelog" ? "default" : "ghost"}
                  size="sm"
                  className="font-medium px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Changelog
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/upload">
                  <Button
                    variant={pathname === "/upload" ? "default" : "ghost"}
                    size="sm"
                    className="font-medium px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    Upload Files
                  </Button>
                </Link>
                <Link href="/changelog">
                  <Button
                    variant={pathname === "/changelog" ? "default" : "ghost"}
                    size="sm"
                    className="font-medium px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    Change Log
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search rules (e.g., 4.01, timing...)"
              className="pl-10 w-72 bg-slate-50/80 border-slate-200 focus:bg-white focus:border-slate-300 transition-all duration-200 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Bell className="h-5 w-5 text-slate-600" />
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white px-1.5 py-0.5 text-xs rounded-full border-2 border-white">
                  {recentChanges.length}
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 shadow-xl border-slate-200 rounded-xl" align="end">
              <Card className="border-0 shadow-none">
                <CardHeader className="pb-3 px-4 pt-4">
                  <CardTitle className="text-sm font-semibold text-slate-800">Notifications</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-64 overflow-y-auto">
                    {recentChanges.length > 0 ? recentChanges.map((change) => (
                      <div key={change.id} className="flex items-start space-x-3 p-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/80 transition-colors">
                        <div className={`p-2 rounded-lg ${
                          change.action === "CREATE" ? "bg-green-50 text-green-600" :
                          change.action === "UPDATE" ? "bg-amber-50 text-amber-600" :
                          change.action === "DELETE" ? "bg-red-50 text-red-600" :
                          "bg-blue-50 text-blue-600"
                        }`}>
                          {change.action === "DELETE" ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : change.action === "UPDATE" ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <Bell className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-800 font-medium leading-tight">
                            {change.action} {change.entityType.toLowerCase().replace('_', ' ')}
                            {change.reason && ` - ${change.reason}`}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(change.createdAt).toLocaleDateString()} by {change.user.name || change.user.email}
                          </p>
                        </div>
                      </div>
                    )) : (
                      <div className="p-4 text-center text-slate-500">
                        <p className="text-sm">No recent changes</p>
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
          
          <Button variant="ghost" size="sm" onClick={handleSettings} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <Settings className="h-5 w-5 text-slate-600" />
          </Button>
          
          <Button variant="ghost" size="sm" onClick={handleLogout} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <LogOut className="h-5 w-5 text-slate-600" />
          </Button>
          
          <Button variant="ghost" size="sm" className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <Menu className="h-5 w-5 text-slate-600" />
          </Button>
        </div>
      </div>
    </header>
  );
}