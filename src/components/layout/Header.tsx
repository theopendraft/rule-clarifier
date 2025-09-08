import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, Settings, Train } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const location = useLocation();
  
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rules (e.g., 4.01, timing...)"
              className="pl-10 w-64"
            />
          </div>
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground px-1.5 py-0.5 text-xs">
              3
            </Badge>
          </Button>
          
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}