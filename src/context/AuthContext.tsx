import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import { 
  userService, 
  UserProfileRecord, 
  generateFriendlyId, 
  isUserMutedActive 
} from '../services/userService';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfileRecord | null;
  friendlyId: string | null;
  isBanned: boolean;
  isMuted: boolean;
  loading: boolean;
  isGuest: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  isGuestWarningOpen: boolean;
  openGuestWarning: () => void;
  closeGuestWarning: () => void;
  refreshUserProfile: () => Promise<void>;
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
  const [userProfile, setUserProfile] = useState<UserProfileRecord | null>(null);
  const [loading, setLoading] = useState(true);

  // Keep a stable ref to user so effects and callbacks never trigger loops
  const userRef = useRef<User | null>(null);
  userRef.current = user;

  const lastRefreshTimeRef = useRef<number>(0);

  // Auth modal control
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Guest warning modal control (shown when saving a recipe without an account)
  const [isGuestWarningOpen, setIsGuestWarningOpen] = useState(false);

  const syncUserProfile = useCallback(async (currUser: User | null) => {
    if (!currUser) {
      setUserProfile(null);
      return;
    }
    try {
      const profile = await userService.syncUser({
        id: currUser.id,
        email: currUser.email,
        user_metadata: currUser.user_metadata,
        created_at: currUser.created_at,
      });
      setUserProfile(prev => {
        if (!prev) return profile;
        if (
          prev.id !== profile.id ||
          prev.isBanned !== profile.isBanned ||
          prev.isMuted !== profile.isMuted ||
          prev.mutedUntil !== profile.mutedUntil ||
          prev.displayName !== profile.displayName
        ) {
          return profile;
        }
        return prev;
      });
    } catch (err) {
      console.warn('Failed to sync user profile:', err);
      // Fallback local representation
      setUserProfile({
        id: currUser.id,
        friendlyId: generateFriendlyId(currUser.id),
        email: currUser.email || '',
        displayName: currUser.user_metadata?.full_name || currUser.email?.split('@')[0] || 'Кулінар',
        createdAt: currUser.created_at || new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        isBanned: false,
        isMuted: false,
      });
    }
  }, []);

  const refreshUserProfile = useCallback(async () => {
    const curr = userRef.current;
    if (!curr) return;
    try {
      const fresh = await userService.getById(curr.id, false);
      if (fresh) {
        setUserProfile(prev => {
          if (
            prev?.isBanned !== fresh.isBanned ||
            prev?.isMuted !== fresh.isMuted ||
            prev?.mutedUntil !== fresh.mutedUntil ||
            prev?.banReason !== fresh.banReason ||
            prev?.displayName !== fresh.displayName
          ) {
            return fresh;
          }
          return prev;
        });
      }
    } catch (err) {
      console.warn('Failed to refresh user profile:', err);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      const currUser = session?.user ?? null;
      userRef.current = currUser;
      setUser(currUser);
      if (currUser) {
        syncUserProfile(currUser);
      }
      setLoading(false);
    }).catch((err) => {
      console.warn('Failed to get supabase session:', err);
      setLoading(false);
    });

    // 2. Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      const currUser = session?.user ?? null;
      const prevId = userRef.current?.id;
      userRef.current = currUser;
      setUser(currUser);
      if (currUser) {
        if (currUser.id !== prevId) {
          syncUserProfile(currUser);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    // 3. Realtime channel to listen for instant admin ban / mute updates
    const channel = supabase
      .channel('users-moderation-realtime')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'recipes', filter: 'id=eq.__SYSTEM_USERS__' },
        (payload) => {
          const row = payload.new as any;
          if (row?.description) {
            try {
              const list = JSON.parse(row.description) as UserProfileRecord[];
              userService.updateMemoryCache(list);
              const currId = userRef.current?.id;
              if (currId) {
                const myProfile = list.find((u) => u.id === currId);
                if (myProfile) {
                  setUserProfile(prev => {
                    if (
                      prev?.isBanned !== myProfile.isBanned ||
                      prev?.isMuted !== myProfile.isMuted ||
                      prev?.mutedUntil !== myProfile.mutedUntil ||
                      prev?.banReason !== myProfile.banReason
                    ) {
                      return myProfile;
                    }
                    return prev;
                  });
                }
              }
            } catch (e) {
              console.warn('Realtime parse error:', e);
            }
          }
        }
      )
      .subscribe();

    // 4. Throttled tab focus listener (max once every 30 seconds)
    const onTabFocus = () => {
      const now = Date.now();
      if (now - lastRefreshTimeRef.current > 30_000) {
        lastRefreshTimeRef.current = now;
        refreshUserProfile();
      }
    };
    window.addEventListener('focus', onTabFocus);
    document.addEventListener('visibilitychange', onTabFocus);

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(channel);
      window.removeEventListener('focus', onTabFocus);
      document.removeEventListener('visibilitychange', onTabFocus);
    };
  }, [syncUserProfile, refreshUserProfile]);

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
        await syncUserProfile(data.user);
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
        if (data.user) {
          await syncUserProfile(data.user);
        }
        setIsAuthModalOpen(false);
      }
      return { error, user: data.user };
    } catch (err: any) {
      return { error: err as AuthError, user: null };
    }
  };

  const getOAuthRedirectUrl = () => {
    const base = window.location.origin + (import.meta.env.BASE_URL || '/');
    return base.endsWith('/') ? base : `${base}/`;
  };

  const signInWithGoogle = async () => {
    try {
      const redirectUrl = getOAuthRedirectUrl();
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
      const redirectUrl = getOAuthRedirectUrl();
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
        setUserProfile(null);
      }
      return { error };
    } catch (err: any) {
      return { error: err as AuthError };
    }
  };

  const friendlyId = user ? (userProfile?.friendlyId || generateFriendlyId(user.id)) : null;
  const isBanned = Boolean(userProfile?.isBanned);
  const isMuted = isUserMutedActive(userProfile);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        userProfile,
        friendlyId,
        isBanned,
        isMuted,
        loading,
        isGuest: !user,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        isGuestWarningOpen,
        openGuestWarning,
        closeGuestWarning,
        refreshUserProfile,
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
