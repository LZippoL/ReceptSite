import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isGuest: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  isGuestWarningOpen: boolean;
  openGuestWarning: () => void;
  closeGuestWarning: () => void;
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUpWithEmail: (email: string, password: string, name?: string) => Promise<{ error: AuthError | null; user: User | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | Error | null }>;
  signInWithApple: () => Promise<{ error: AuthError | Error | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth modal control
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Guest warning modal control (shown when saving a recipe without an account)
  const [isGuestWarningOpen, setIsGuestWarningOpen] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch((err) => {
      console.warn('Failed to get supabase session:', err);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openGuestWarning = () => {
    setIsGuestWarningOpen(true);
  };

  const closeGuestWarning = () => {
    setIsGuestWarningOpen(false);
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (!error && data.session) {
        setSession(data.session);
        setUser(data.user);
        setIsAuthModalOpen(false);
      }
      return { error };
    } catch (err: any) {
      return { error: err as AuthError };
    }
  };

  const signUpWithEmail = async (email: string, password: string, name?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name || email.split('@')[0],
          },
        },
      });
      if (!error && data.session) {
        setSession(data.session);
        setUser(data.user);
        setIsAuthModalOpen(false);
      }
      return { error, user: data.user };
    } catch (err: any) {
      return { error: err as AuthError, user: null };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const redirectUrl = window.location.origin + window.location.pathname;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });
      return { error };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signInWithApple = async () => {
    try {
      const redirectUrl = window.location.origin + window.location.pathname;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: redirectUrl,
        },
      });
      return { error };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setUser(null);
        setSession(null);
      }
      return { error };
    } catch (err: any) {
      return { error: err as AuthError };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isGuest: !user,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        isGuestWarningOpen,
        openGuestWarning,
        closeGuestWarning,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signInWithApple,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
