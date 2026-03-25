"use client";

import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePasswordReset, usePasswordConfirm } from "@/services/auth";

interface EmailFormData {
  email: string;
}

interface PasswordFormData {
  password: string;
  password_confirmation: string;
}

function EmailResetForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({
    defaultValues: {
      email: "",
    },
  });

  const passwordResetMutation = usePasswordReset();
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data: EmailFormData) => {
    try {
      await passwordResetMutation.mutateAsync(data);
      setSuccessMessage("Password reset email sent! Check your inbox.");
    } catch (error) {
      setError("email", {
        type: "manual",
        message:
          error instanceof Error ? error.message : "Failed to send email",
      });
    }
  };

  return (
    <>
      {successMessage && (
        <div className="rounded-md bg-green-100 p-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Email</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="Enter your email"
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value ?? ""}
                disabled={isSubmitting}
                className="focus:ring-danger-500 w-full rounded-md bg-gray-100 outline-none focus:ring-2"
              />
            )}
          />
          {errors.email && (
            <p className="text-danger-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant={"outline"}
          disabled={isSubmitting}
          className="border-danger-500 text-danger-500 hover:bg-danger-500 hover:text-white"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </>
  );
}

function PasswordResetForm({ token, email }: { token: string; email: string }) {
  const router = useRouter();
  const passwordConfirmMutation = usePasswordConfirm();

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: PasswordFormData) => {
    try {
      await passwordConfirmMutation.mutateAsync({
        email,
        token,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });
      router.push("/login");
    } catch (error) {
      setError("password", {
        type: "manual",
        message:
          error instanceof Error ? error.message : "Failed to reset password",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-700">New Password</label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              placeholder="Enter your new password"
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value ?? ""}
              disabled={isSubmitting}
              className="focus:ring-danger-500 w-full rounded-md bg-gray-100 outline-none focus:ring-2"
            />
          )}
        />
        {errors.password && (
          <p className="text-danger-500 text-xs">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-700">Confirm Password</label>
        <Controller
          name="password_confirmation"
          control={control}
          rules={{
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              placeholder="Confirm your new password"
              onChange={field.onChange}
              onBlur={field.onBlur}
              value={field.value ?? ""}
              disabled={isSubmitting}
              className="focus:ring-danger-500 w-full rounded-md bg-gray-100 outline-none focus:ring-2"
            />
          )}
        />
        {errors.password_confirmation && (
          <p className="text-danger-500 text-xs">
            {errors.password_confirmation.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant={"outline"}
        disabled={isSubmitting}
        className="border-danger-500 text-danger-500 hover:bg-danger-500 hover:text-white"
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const hasToken = !!token && !!email;

  return (
    <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white p-8 shadow-xl">
      <h1 className="desktop-tablet__heading__h2 text-danger-500 !font-bold capitalize">
        Reset Password
      </h1>

      {hasToken ? (
        <PasswordResetForm token={token!} email={email!} />
      ) : (
        <EmailResetForm />
      )}

      <p className="text-center text-sm text-gray-700">
        Remember your password?{" "}
        <Link
          href="/login"
          className="text-danger-500 focus-visible:ring-danger-500 underline-offset-4 transition-all duration-300 hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="container mx-auto flex min-h-screen w-full flex-col items-center justify-center p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordContent />
      </Suspense>
    </main>
  );
}
