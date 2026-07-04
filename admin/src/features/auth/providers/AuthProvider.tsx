"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getMe,
  login as loginApi,
  logout as logoutApi,
} from "../api/auth.api";

import type {
  Admin,
  LoginRequest,
} from "../types/auth.types";

interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  isAuthenticated: boolean;

  login(
    payload: LoginRequest
  ): Promise<void>;

  logout(): void;

  refresh(): Promise<void>;
}

export const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({
  children,
}: Props) {
  const [admin, setAdmin] =
    useState<Admin | null>(null);

  const [loading, setLoading] =
    useState(true);

  const refresh = useCallback(async () => {
    try {
      const me = await getMe();

      setAdmin(me);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function login(payload: LoginRequest) {
    await loginApi(payload);

    await refresh();
  }

  function logout() {
    logoutApi();

    setAdmin(null);
  }

  const value = useMemo(
    () => ({
      admin,

      loading,

      isAuthenticated:
        admin !== null,

      login,

      logout,

      refresh,
    }),
    [admin, loading, refresh]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}