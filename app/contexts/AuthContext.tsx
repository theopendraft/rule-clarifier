'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  userRole: 'admin' | 'user' | null;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for authentication status
    const checkAuthStatus = () => {
      try {
        const authStatus = localStorage.getItem('isAuthenticated');
        const role = localStorage.getItem('userRole') as 'admin' | 'user' | null;
        if (authStatus === 'true' && role) {
          setIsAuthenticated(true);
          setUserRole(role);
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
    
    if (email === 'admin@railway.com' && password === 'admin123') {
      role = 'admin';
    } else if (email === 'user@railway.com' && password === 'user123') {
      role = 'user';
    }
    
    if (role) {
      setIsAuthenticated(true);
      setUserRole(role);
      try {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', role);
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
    try {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'admin');
    } catch (error) {
      console.error('Error saving auth status:', error);
    }
    return true;
  };

  const loginAsUser = () => {
    setIsAuthenticated(true);
    setUserRole('user');
    try {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'user');
    } catch (error) {
      console.error('Error saving auth status:', error);
    }
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    try {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
    } catch (error) {
      console.error('Error removing auth status:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, userRole, login, loginAsAdmin, loginAsUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};