import { useMutation } from "@tanstack/react-query";

import { api } from "../api";
import type {
  MessageResponse,
  PasswordConfirmData,
  PasswordResetData,
  PasswordSetupData,
} from "@/types";
import { toast } from "@/lib/utils/toast";

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
    onSuccess: () => {
      toast.success({
        title: "Password setup email sent",
        message: "Please check your email to set up your password",
      });
    },
    onError: (error) => {
      toast.error({
        error,
        fallbackMessage: "Failed to send password setup email",
      });
    },
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
    onSuccess: () => {
      toast.success({
        title: "Reset email sent",
        message: "Please check your email to reset your password",
      });
    },
    onError: (error) => {
      toast.error({ error, fallbackMessage: "Failed to send reset email" });
    },
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
    onSuccess: () => {
      toast.success({
        title: "Password reset successful",
        message: "Your password has been reset successfully",
      });
    },
    onError: (error) => {
      toast.error({ error, fallbackMessage: "Failed to reset password" });
    },
  });
}
