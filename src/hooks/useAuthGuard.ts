"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/contexts/AuthContext";
import { getAuthToken } from "@/services/api";

interface UseAuthGuardOptions {
  redirectTo?: string;
}

export function useAuthGuard(options?: UseAuthGuardOptions) {
  const router = useRouter();
  const { isAuthenticated, isLoading, isInitialized } = useAuthContext();
  const redirectTo = options?.redirectTo ?? "/login";

  useEffect(() => {
    if (isInitialized && !isLoading && !isAuthenticated) {
      const currentPath = window.location.pathname;
      router.push(`${redirectTo}?redirect=${currentPath}`);
    }
  }, [isInitialized, isLoading, isAuthenticated, redirectTo, router]);

  return {
    isAuthenticated,
    isLoading,
    isInitialized,
    canAccess: isAuthenticated && !isLoading && isInitialized,
  };
}

export function useAuthCheck() {
  const { isAuthenticated, isLoading, isInitialized } = useAuthContext();
  const hasToken = !!getAuthToken();

  return {
    isAuthenticated,
    isLoading,
    isInitialized,
    hasToken,
    canAccess: isAuthenticated && !isLoading && isInitialized,
  };
}
