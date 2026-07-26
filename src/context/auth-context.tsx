"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type User } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  signup: (email: string, password: string, name: string, role?: string, firstName?: string, lastName?: string, gender?: string) => Promise<void>;
  login: (email: string, password: string, role?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: { displayName?: string; email?: string; preferredLanguage?: string }) => Promise<void>;
  credits?: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount: verify JWT cookie with server → restore session
  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.uid) setUser(data as User);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const signup = async (email: string, password: string, name: string, role?: string, firstName?: string, lastName?: string, gender?: string) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, name, role, firstName, lastName, gender }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed.");
    setUser(data as User);
  };

  const login = async (email: string, password: string, role?: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed.");
    setUser(data as User);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  const updateProfile = async (updateData: { displayName?: string; email?: string; preferredLanguage?: string }) => {
    const res = await fetch("/api/auth/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updateData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Update failed.");
    
    // Merge existing metadata with updated profile
    setUser(prev => prev ? ({ ...prev, ...data, metadata: prev.metadata }) : null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isConfigured: true, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
