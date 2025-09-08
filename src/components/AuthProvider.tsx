import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  role: 'farmer' | 'veterinarian' | 'government';
  phone?: string;
  district?: string;
  state?: string;
  license_number?: string;
  department?: string;
  farm_name?: string;
  preferred_language: 'english' | 'tamil';
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrCreateProfile = async (supaUser: User) => {
    setLoading(true);
    // Try to fetch existing profile first
    const { data: existing } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', supaUser.id)
      .maybeSingle();

    if (existing) {
      setProfile(existing as UserProfile);
      setLoading(false);
      return;
    }

    // Create a minimal profile from user metadata if missing
    const meta = (supaUser.user_metadata || {}) as Record<string, any>;
    const insertPayload = {
      user_id: supaUser.id,
      full_name: (meta.full_name as string) || supaUser.email || 'New User',
      role: (meta.role as 'farmer' | 'veterinarian' | 'government') || 'farmer',
      preferred_language: (meta.preferred_language as 'english' | 'tamil') || 'tamil',
    };

    const { data: inserted } = await supabase
      .from('user_profiles')
      .insert(insertPayload)
      .select('*')
      .single();

    setProfile(inserted as UserProfile);
    setLoading(false);
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          // Defer Supabase calls to avoid deadlocks
          setTimeout(() => {
            fetchOrCreateProfile(session.user!);
          }, 0);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchOrCreateProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.full_name,
          role: userData.role,
          preferred_language: userData.preferred_language || 'tamil'
        }
      }
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};