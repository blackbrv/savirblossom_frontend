"use client";

import { useCallback, useState } from "react";

import { APIError } from "@/services/api-types";

interface UseApiErrorReturn {
  error: APIError | null;
  isError: boolean;
  errorMessage: string;
  errorStatus: number | null;
  errorFields: Record<string, string[]> | null;
  handleError: (error: unknown) => void;
  clearError: () => void;
}

export function useApiError(): UseApiErrorReturn {
  const [error, setError] = useState<APIError | null>(null);

  const handleError = useCallback((err: unknown) => {
    if (err instanceof APIError) {
      setError(err);
    } else if (err instanceof Error) {
      setError(new APIError(err.message, 500));
    } else {
      setError(new APIError("An unexpected error occurred", 500));
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    isError: error !== null,
    errorMessage: error?.message ?? "",
    errorStatus: error?.status ?? null,
    errorFields: error?.body?.errors ?? null,
    handleError,
    clearError,
  };
}
