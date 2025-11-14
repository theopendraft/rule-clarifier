'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Train, Menu, Search, LogOut, Bell } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const router = useRouter();
  const { userRole, userDepartment, logout } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0)
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchUnreadCount()
    const interval = setInterval(fetchUnreadCount, 30000)
    return () => clearInterval(interval)
  }, [userRole])

  const fetchUnreadCount = async () => {
    // Only fetch notifications for regular users, not admins
    if (userRole === 'admin') {
      setUnreadCount(0)
      setNotifications([])
      return
    }
    
    try {
      const response = await fetch('/api/change-logs?entityType=MANUAL&unreadOnly=true')
      if (response.ok) {
        const data = await response.json()
        setUnreadCount(data.length)
        // Fetch manual details for each notification
        const notificationsWithDetails = await Promise.all(
          data.map(async (notif: any) => {
            try {
              const manualRes = await fetch(`/api/manuals/get?id=${notif.entityId}`)
              if (manualRes.ok) {
                const manual = await manualRes.json()
                return { ...notif, manualTitle: manual.title, manualCode: manual.code }
              }
            } catch (err) {
              console.error('Error fetching manual:', err)
            }
            return notif
          })
        )
        setNotifications(notificationsWithDetails)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/manuals?search=${encodeURIComponent(searchQuery)}`)
      setShowSearch(false)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    const currentRole = userRole;
    logout();
    toast.success("Logged out successfully");
    if (currentRole === 'admin') {
      router.push("/users");
    } else {
      router.push("/users");
    }
  };

  const menuItems = [
    { label: 'GR&SR', href: '/grsr' },
    { label: 'Manuals', href: '/manuals' },
    { label: 'Circulars', href: '/circulars' },
    { label: 'Scenarios', href: '/scenarios' },
    { label: 'JPO', href: '/jpo' },
    ...(userRole === 'admin' ? [{ label: 'Upload Files', href: '/upload' }] : []),
    { label: 'Admin?', href: '/login' },
    { label: 'Last Correction', href: '/changelog' },
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
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
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
              suppressHydrationWarning
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-blue-700"
            onClick={() => setShowSearch(!showSearch)}
            suppressHydrationWarning
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-blue-700 relative"
            onClick={() => setShowNotifications(!showNotifications)}
            suppressHydrationWarning
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>
          {userRole === 'admin' && (
            <>
              <div className="hidden lg:block text-xs text-blue-200 mr-2">
                {userDepartment === 'engineering' && 'Engineering Dept'}
                {userDepartment === 'safety' && 'Safety Dept'}
                {userDepartment === 'snt' && 'S&T Dept'}
                {userDepartment === 'admin' && 'Admin'}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden lg:flex text-white hover:bg-blue-700" suppressHydrationWarning>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-blue-700" suppressHydrationWarning>
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
                      suppressHydrationWarning
                    >
                      {item.label}
                    </button>
                  ))}
                  {userRole === 'admin' && (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors flex items-center gap-2"
                      suppressHydrationWarning
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

      {/* Search Dropdown */}
      {showSearch && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-40">
          <div className="max-w-2xl mx-auto flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search manuals, circulars..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              suppressHydrationWarning
            />
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700" suppressHydrationWarning>
              Search
            </Button>
          </div>
        </div>
      )}

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute top-full right-0 bg-white shadow-lg border border-gray-200 rounded-lg mt-2 w-80 max-h-96 overflow-y-auto z-40 mr-4">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <p className="text-xs text-gray-500">{unreadCount} unread</p>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No new notifications
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-l-4 border-yellow-400"
                  onClick={() => {
                    router.push(`/manuals/${notif.entityId}`)
                    setShowNotifications(false)
                  }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-900">{notif.manualTitle || 'Manual Updated'}</p>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">{notif.action}</span>
                  </div>
                  {notif.manualCode && (
                    <p className="text-xs text-gray-500 mb-1">{notif.manualCode}</p>
                  )}
                  <p className="text-xs text-gray-700 mt-1 font-medium">Changes: {notif.reason || 'Content updated'}</p>
                  {notif.user && (
                    <p className="text-xs text-gray-600 mt-1">By: {notif.user.name || notif.user.email}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.createdAt).toLocaleString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </header>
  );
}
