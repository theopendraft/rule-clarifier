'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Train, Menu, Search, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const router = useRouter();
  const { userRole, userDepartment, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/users");
  };

  const menuItems = [
    { label: 'GR&SR', href: '/grsr' },
    { label: 'Manuals', href: '/manuals' },
    { label: 'Circulars', href: '/circulars' },
    { label: 'Scenarios', href: '/scenarios' },
    { label: 'JPO', href: '/jpo' },
    ...(userRole === 'admin' ? [{ label: 'Upload Files', href: '/upload' }] : []),
    { label: 'Admin?', href: '/login' },
    { label: 'Change Log', href: '/changelog' },
  ];

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.action) {
      item.action();
    } else {
      router.push(item.href);
    }
  };
  
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-50 border-b border-blue-700" suppressHydrationWarning>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/users')}>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Train className="w-6 h-6 text-blue-900" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-wide">Rail Rules</h1>
            <p className="text-xs text-blue-200">Indian Railways</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleMenuClick(item)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700">
            <Search className="h-5 w-5" />
          </Button>
          {userRole === 'admin' && (
            <>
              <div className="hidden lg:block text-xs text-blue-200 mr-2">
                {userDepartment === 'engineering' && 'Engineering Dept'}
                {userDepartment === 'safety' && 'Safety Dept'}
                {userDepartment === 'snt' && 'S&T Dept'}
                {userDepartment === 'admin' && 'Admin'}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden lg:flex text-white hover:bg-blue-700">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-blue-700">
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
                      key={item.label}
                      onClick={() => handleMenuClick(item)}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-900 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                  {userRole === 'admin' && (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  )}
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
      </div>
    </header>
  );
}
