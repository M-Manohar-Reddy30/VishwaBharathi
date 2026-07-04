"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getMe } from "../api/auth.api";
import {
  getToken,
  removeToken,
} from "../utils/token";

import type { Admin } from "../types/auth.types";

interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [admin, setAdmin] =
    useState<Admin | null>(null);

  const [loading, setLoading] =
    useState(true);

  async function refresh() {
    try {
      const me = await getMe();

      setAdmin(me);
    } catch {
      removeToken();

      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    removeToken();

    setAdmin(null);
  }

  useEffect(() => {
    if (!getToken()) {
      setLoading(false);

      return;
    }

    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        refresh,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside AuthProvider."
    );
  }

  return context;
}