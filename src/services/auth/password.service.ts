import { useMutation } from "@tanstack/react-query";

import { api } from "../api";
import type {
  MessageResponse,
  PasswordConfirmData,
  PasswordResetData,
  PasswordSetupData,
} from "@/types";

async function passwordSetup(
  data: PasswordSetupData,
): Promise<MessageResponse> {
  return api<MessageResponse>("/api/auth/password/setup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function usePasswordSetup() {
  return useMutation({
    mutationFn: passwordSetup,
  });
}

async function passwordReset(
  data: PasswordResetData,
): Promise<MessageResponse> {
  return api<MessageResponse>("/api/auth/password/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function usePasswordReset() {
  return useMutation({
    mutationFn: passwordReset,
  });
}

async function passwordConfirm(
  data: PasswordConfirmData,
): Promise<import("@/types").AuthResponse> {
  return api("/api/auth/password/confirm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function usePasswordConfirm() {
  return useMutation({
    mutationFn: passwordConfirm,
  });
}
