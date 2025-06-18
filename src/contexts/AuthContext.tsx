
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('auth-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check against registered users in localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registered-users') || '[]');
    const foundUser = registeredUsers.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        avatar: foundUser.avatar
      };
      setUser(userData);
      localStorage.setItem('auth-user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    // Default admin credentials
    if (email === 'admin@mun-c.com' && password === 'admin123') {
      const userData = {
        id: '1',
        name: 'Admin User',
        email: 'admin@mun-c.com',
        avatar: '/placeholder-user.jpg'
      };
      setUser(userData);
      localStorage.setItem('auth-user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const registeredUsers = JSON.parse(localStorage.getItem('registered-users') || '[]');
    const existingUser = registeredUsers.find((u: any) => u.email === email);
    
    if (existingUser || email === 'admin@mun-c.com') {
      setIsLoading(false);
      return false; // User already exists
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In real app, this should be hashed
      avatar: '/placeholder-user.jpg',
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    registeredUsers.push(newUser);
    localStorage.setItem('registered-users', JSON.stringify(registeredUsers));
    
    // Auto-login the new user
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar
    };
    setUser(userData);
    localStorage.setItem('auth-user', JSON.stringify(userData));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
