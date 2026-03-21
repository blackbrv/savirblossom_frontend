import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api, authApi, removeAuthToken } from "../api";
import type { AuthResponse, LoginData, RegisterData, Customer } from "@/types";
import { toast } from "@/lib/utils/toast";

interface MeResponse {
  customer: Customer;
}

async function login(data: LoginData): Promise<AuthResponse> {
  return api<AuthResponse>("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function useLogin(options?: { queryKey?: string[] }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth:me"] });
      queryClient.invalidateQueries({ queryKey: ["cart:list"] });
      toast.success({
        title: "Login successful",
        message: "Welcome back!",
      });
    },
    onError: (error) => {
      toast.error({ error, fallbackMessage: "Login failed" });
    },
    ...(options?.queryKey && {
      onSuccess: () => {
        // Additional query invalidation if needed
      },
    }),
  });
}

async function register(data: RegisterData): Promise<AuthResponse> {
  return api<AuthResponse>("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth:me"] });
      queryClient.invalidateQueries({ queryKey: ["cart:list"] });
      toast.success({
        title: "Registration successful",
        message: "Your account has been created successfully",
      });
    },
    onError: (error) => {
      toast.error({ error, fallbackMessage: "Registration failed" });
    },
  });
}

async function logout(): Promise<void> {
  try {
    await authApi("/api/auth/logout", {
      method: "POST",
    });
  } finally {
    removeAuthToken();
  }
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      toast.success({
        title: "Logged out",
        message: "You have been logged out successfully",
      });
    },
    onError: (error) => {
      toast.error({ error, fallbackMessage: "Logout failed" });
    },
  });
}

async function me(): Promise<MeResponse> {
  return authApi<MeResponse>("/api/auth/me", {
    method: "GET",
  });
}

export function useMe(options?: { queryKey?: string[]; enabled?: boolean }) {
  return useQuery({
    queryKey: options?.queryKey ?? ["auth:me"],
    queryFn: me,
    enabled: options?.enabled ?? true,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

async function googleRedirect(): Promise<{ url: string }> {
  return api<{ url: string }>("/api/auth/google/redirect", {
    method: "GET",
  });
}

export function useGoogleRedirect() {
  return useMutation({
    mutationFn: googleRedirect,
  });
}

async function googleCallback(token: string): Promise<AuthResponse> {
  return api<AuthResponse>("/api/auth/google/callback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ token }),
  });
}

export function useGoogleCallback() {
  return useMutation({
    mutationFn: googleCallback,
  });
}
