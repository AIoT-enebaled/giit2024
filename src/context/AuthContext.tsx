import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, SignUpData, SignInData, User } from '../types/auth';

interface AuthContextType extends AuthState {
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setState(prev => ({
        ...prev,
        user: JSON.parse(storedUser),
        loading: false,
      }));
    } else {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const signUp = async (data: SignUpData) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful signup
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        password: data.password,
        createdAt: new Date(),
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      setState(prev => ({ ...prev, user: newUser, loading: false }));
      window.location.hash = '#/signin';
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred during sign up',
        loading: false,
      }));
    }
  };

  const signIn = async (data: SignInData) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      console.log('Stored User:', storedUser);
      if (storedUser && storedUser.password === data.password) {
        setState(prev => ({ ...prev, user: storedUser, loading: false }));
        window.location.hash = '#/';
      } else {
        setState(prev => ({
          ...prev,
          error: 'Invalid email or password',
          loading: false,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred during sign in',
        loading: false,
      }));
    }
  };

  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      localStorage.removeItem('user');
      setState(prev => ({ ...prev, user: null, loading: false }));
      window.location.hash = '#/';
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred during sign out',
        loading: false,
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
