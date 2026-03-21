"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";

import type { Customer } from "@/types";
import { getAuthToken, removeAuthToken, setAuthToken } from "@/services/api";
import { useMe, useLogin, useRegister, useLogout } from "@/services/auth";

interface AuthContextType {
  user: Customer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    password_confirmation: string;
    username: string;
    phone_number?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: userData, isLoading: isLoadingUser } = useMe({
    queryKey: ["auth:me"],
    enabled: !!getAuthToken(),
  });

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  useEffect(() => {
    if (!isLoadingUser) {
      setIsInitialized(true);
    }
  }, [isLoadingUser]);

  const login = useCallback(
    async (data: { email: string; password: string }) => {
      const response = await loginMutation.mutateAsync(data);
      if (response.token) {
        setAuthToken(response.token);
      }
    },
    [loginMutation],
  );

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      password_confirmation: string;
      username: string;
      phone_number?: string;
    }) => {
      const response = await registerMutation.mutateAsync(data);
      if (response.token) {
        setAuthToken(response.token);
      }
    },
    [registerMutation],
  );

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
    removeAuthToken();
  }, [logoutMutation]);

  const value: AuthContextType = {
    user: userData?.data ?? null,
    isAuthenticated: !!userData?.data,
    isLoading: isLoadingUser,
    isInitialized,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an <AuthProvider />");
  }
  return context;
}

export { AuthProvider, useAuthContext };
