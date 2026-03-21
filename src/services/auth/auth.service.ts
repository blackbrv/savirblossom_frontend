import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api, removeAuthToken } from "../api";
import type {
  AuthResponse,
  LoginData,
  RegisterData,
  SingleResponse,
} from "@/types";
import type { Customer } from "@/types";

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
  return useMutation({
    mutationFn: (data: LoginData) => login(data),
    ...(options?.queryKey && {
      onSuccess: () => {
        // Invalidate queries if needed
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
  return useMutation({
    mutationFn: (data: RegisterData) => register(data),
  });
}

async function logout(): Promise<void> {
  try {
    await api("/api/auth/logout", {
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
    },
  });
}

async function me(): Promise<SingleResponse<Customer>> {
  return api<SingleResponse<Customer>>("/api/auth/me", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
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
