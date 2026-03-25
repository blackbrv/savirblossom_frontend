import { APIError, APIErrorResponse } from "./api-types";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const TOKEN_COOKIE_NAME = "auth_token";

export function getAuthToken(): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === TOKEN_COOKIE_NAME) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

export function setAuthToken(token: string): void {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

export function removeAuthToken(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${TOKEN_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...options,
  });

  if (!res.ok) {
    let errorBody: APIErrorResponse | undefined;
    try {
      errorBody = await res.json();
    } catch {
      // Fallback to plain text if JSON parsing fails
    }

    throw new APIError(
      errorBody?.message || `HTTP Error ${res.status}`,
      res.status,
      errorBody,
    );
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export async function authApi<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const token = getAuthToken();

  if (!token) {
    throw new APIError("Unauthorized", 401);
  }

  const headers = new Headers(options?.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${BASE_URL}${path}`, {
    headers,
    ...options,
  });

  if (!res.ok) {
    let errorBody: APIErrorResponse | undefined;
    try {
      errorBody = await res.json();
    } catch {
      // Fallback to plain text if JSON parsing fails
    }

    throw new APIError(
      errorBody?.message || `HTTP Error ${res.status}`,
      res.status,
      errorBody,
    );
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}
