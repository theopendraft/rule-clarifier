'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  userRole: 'admin' | 'user' | null;
  userId: string | null;
  login: (email: string, password: string) => boolean;
  loginAsAdmin: () => boolean;
  loginAsUser: () => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for authentication status
    const checkAuthStatus = () => {
      try {
        const authStatus = localStorage.getItem('isAuthenticated');
        const role = localStorage.getItem('userRole') as 'admin' | 'user' | null;
        const id = localStorage.getItem('userId');
        if (authStatus === 'true' && role) {
          setIsAuthenticated(true);
          setUserRole(role);
          setUserId(id);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (email: string, password: string) => {
    let role: 'admin' | 'user' | null = null;
    let id: string | null = null;
    
    if (email === 'admin@railway.com' && password === 'admin123') {
      role = 'admin';
      id = 'cmflolqqc00006vyvs484vwgq'; // Actual admin user ID from database
    } else if (email === 'user@railway.com' && password === 'user123') {
      role = 'user';
      id = 'cmflrpvxe00016vubloi2s4tb'; // Actual user ID from database
    }
    
    if (role && id) {
      setIsAuthenticated(true);
      setUserRole(role);
      setUserId(id);
      try {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', role);
        localStorage.setItem('userId', id);
      } catch (error) {
        console.error('Error saving auth status:', error);
      }
      return true;
    }
    return false;
  };

  const loginAsAdmin = () => {
    setIsAuthenticated(true);
    setUserRole('admin');
    setUserId('cmflolqqc00006vyvs484vwgq');
    try {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userId', 'cmflolqqc00006vyvs484vwgq');
    } catch (error) {
      console.error('Error saving auth status:', error);
    }
    return true;
  };

  const loginAsUser = () => {
    setIsAuthenticated(true);
    setUserRole('user');
    setUserId('cmflrpvxe00016vubloi2s4tb');
    try {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('userId', 'cmflrpvxe00016vubloi2s4tb');
    } catch (error) {
      console.error('Error saving auth status:', error);
    }
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null);
    try {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
    } catch (error) {
      console.error('Error removing auth status:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, userRole, userId, login, loginAsAdmin, loginAsUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};