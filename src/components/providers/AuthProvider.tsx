"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";

interface AuthUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
  isDemo?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ success: false }),
  signOut: async () => {},
});

const DEMO_STORAGE_KEY = "nuevincent_admin_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || "Admin",
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Local demo mode check
      const stored = localStorage.getItem(DEMO_STORAGE_KEY);
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (isFirebaseConfigured && auth) {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, pass);
        setUser({
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: cred.user.displayName || "Admin",
        });
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || "Failed to sign in" };
      }
    } else {
      // Demo / development fallback authentication
      if (email.trim().length > 3 && pass.length >= 6) {
        const demoUser: AuthUser = {
          uid: "admin-demo-id",
          email: email.trim(),
          displayName: "NUEVINCENT Admin",
          isDemo: true,
        };
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoUser));
        setUser(demoUser);
        return { success: true };
      } else {
        return { success: false, error: "Please enter a valid email and a password of at least 6 characters." };
      }
    }
  };

  const signOut = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        console.error("Sign out error:", err);
      }
    }
    localStorage.removeItem(DEMO_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
