import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, tokenStorage, type AuthUser } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signin: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const toUser = (apiUser: AuthUser): User => ({
  id: String(apiUser.id),
  email: apiUser.email,
  name: [apiUser.first_name, apiUser.last_name].filter(Boolean).join(' ') || apiUser.email.split('@')[0],
  joinedDate: apiUser.created_at,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if (!tokenStorage.getAccess()) {
        setIsLoading(false);
        return;
      }
      try {
        const apiUser = await authApi.me();
        setUser(toUser(apiUser));
      } catch {
        tokenStorage.clear();
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  const signin = async (email: string, password: string): Promise<boolean> => {
    try {
      await authApi.login(email, password);
      const apiUser = await authApi.me();
      setUser(toUser(apiUser));
      return true;
    } catch (error) {
      tokenStorage.clear();
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const [first_name, ...rest] = name.trim().split(/\s+/);
      const last_name = rest.join(' ');
      await authApi.signup({
        email,
        first_name: first_name || '',
        last_name,
        password,
        password_confirm: password,
      });
      return signin(email, password);
    } catch (error) {
      return false;
    }
  };

  const signout = () => {
    setUser(null);
    tokenStorage.clear();
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signin,
    signup,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};