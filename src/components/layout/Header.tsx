import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, Settings, Train, AlertTriangle, Clock, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const notifications = [
  { id: 1, message: "Rule 5.12 requires review and approval", priority: "high", date: "2024-01-21" },
  { id: 2, message: "New PDF uploaded for Chapter 8 processing", priority: "medium", date: "2024-01-21" },
  { id: 3, message: "Cross-reference links need updating in Chapter 12", priority: "low", date: "2024-01-20" }
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    navigate("/login");
  };
  
  return (
    <header className="bg-background border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-lg">
              <Train className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Railway Admin Portal</h1>
              <p className="text-sm text-muted-foreground">Rules Management System</p>
            </div>
          </Link>
          
          <nav className="flex items-center space-x-1">
            <Link to="/admin">
              <Button
                variant={location.pathname === "/admin" ? "default" : "ghost"}
                size="sm"
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/admin/rules">
              <Button
                variant={location.pathname === "/admin/rules" ? "default" : "ghost"}
                size="sm"
              >
                Rules Management
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rules (e.g., 4.01, timing...)"
              className="pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground px-1.5 py-0.5 text-xs">
                  {notifications.length}
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Notifications</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 p-3 border-b border-border last:border-b-0 hover:bg-muted/50">
                        <div className={`p-1.5 rounded-full ${
                          notification.priority === "high" ? "bg-destructive/10" :
                          notification.priority === "medium" ? "bg-warning/10" :
                          "bg-primary/10"
                        }`}>
                          {notification.priority === "high" ? (
                            <AlertTriangle className="h-3 w-3 text-destructive" />
                          ) : notification.priority === "medium" ? (
                            <Clock className="h-3 w-3 text-warning" />
                          ) : (
                            <Bell className="h-3 w-3 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground font-medium leading-tight">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Notifications
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
          
          <Button variant="ghost" size="sm" onClick={handleSettings}>
            <Settings className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}