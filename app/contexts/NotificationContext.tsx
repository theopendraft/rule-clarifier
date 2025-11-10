'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'CHANGE';
  isRead: boolean;
  entityType?: string;
  entityId?: string;
  createdAt: string;
  updatedAt: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (notificationIds: string[]) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const { isAuthenticated, userRole, userId } = useAuth();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const fetchNotifications = async () => {
    if (!isAuthenticated || !userId) return;
    
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`/api/notifications?userId=${userId}&limit=50`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          setNotifications(Array.isArray(data) ? data : []);
          setFetchError(false);
        } catch (jsonError) {
          setNotifications([]);
          setFetchError(true);
        }
      } else {
        setNotifications([]);
        setFetchError(true);
      }
    } catch (error: any) {
      if (error?.name !== 'AbortError') {
        setFetchError(true);
      }
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationIds: string[]) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notificationIds,
          isRead: true,
        }),
      });

      if (response.ok) {
        setNotifications(prev => 
          prev.map(notification => 
            notificationIds.includes(notification.id)
              ? { ...notification, isRead: true }
              : notification
          )
        );
      } else {
        console.error('Failed to mark notifications as read:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.isRead).map(n => n.id);
    if (unreadIds.length > 0) {
      await markAsRead(unreadIds);
    }
  };

  const addNotification = async (notification: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      });

      if (response.ok) {
        const text = await response.text();
        try {
          const newNotification = JSON.parse(text);
          setNotifications(prev => [newNotification, ...prev]);
        } catch (jsonError) {
          console.error('Invalid JSON response when adding notification:', text);
        }
      } else {
        console.error('Failed to add notification:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications?id=${notificationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const clearAllNotifications = async () => {
    if (!isAuthenticated || !userId) return;
    
    try {
      const response = await fetch(`/api/notifications?userId=${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  // Fetch notifications when authenticated
  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthenticated && userId) {
      fetchNotifications();
    } else {
      setNotifications([]);
    }
  }, [isAuthenticated, userId]);

  // Auto-refresh notifications every 30 seconds (only if no errors)
  useEffect(() => {
    if (typeof window === 'undefined' || !isAuthenticated || !userId || fetchError) return;

    const interval = setInterval(() => {
      if (!loading && !fetchError) {
        fetchNotifications();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated, userId, loading, fetchError]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        addNotification,
        deleteNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
