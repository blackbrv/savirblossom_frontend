"use client";

import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuthContext } from "@/contexts/AuthContext";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading: isAuthLoading } = useAuthContext();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      router.push("/");
    } catch (error) {
      setError("email", {
        type: "manual",
        message: error instanceof Error ? error.message : "Login failed",
      });
      setError("password", {
        type: "manual",
        message: "",
      });
    }
  };

  return (
    <main className="container mx-auto flex min-h-screen w-full flex-col items-center justify-center p-6">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="desktop-tablet__heading__h2 text-danger-500 !font-bold capitalize">
          Login
        </h1>

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
                  disabled={isSubmitting || isAuthLoading}
                  className="focus:ring-danger-500 w-full rounded-md bg-gray-100 outline-none focus:ring-2"
                />
              )}
            />
            {errors.email && (
              <p className="text-danger-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Password</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  placeholder="Enter your password"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value ?? ""}
                  disabled={isSubmitting || isAuthLoading}
                />
              )}
            />
            {errors.password && (
              <p className="text-danger-500 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>

          <Link
            href="/reset-password"
            className="text-danger-500 focus-visible:ring-danger-500 self-end text-sm underline-offset-4 transition-all duration-300 hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Forgot password?
          </Link>

          <Button
            type="submit"
            variant={"outline"}
            disabled={isSubmitting || isAuthLoading}
            className="border-danger-500 text-danger-500 hover:bg-danger-500 hover:text-white"
          >
            {isSubmitting || isAuthLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-danger-500 focus-visible:ring-danger-500 underline-offset-4 transition-all duration-300 hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
