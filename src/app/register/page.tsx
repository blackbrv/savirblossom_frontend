"use client";

import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/AuthContext";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isLoading: isAuthLoading } = useAuthContext();

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      router.push("/login");
    } catch (error) {
      setError("email", {
        type: "manual",
        message: error instanceof Error ? error.message : "Registration failed",
      });
    }
  };

  return (
    <main className="container mx-auto flex min-h-screen w-full flex-col items-center justify-center p-6">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="desktop-tablet__heading__h2 text-danger-500 !font-bold capitalize">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Username</label>
            <Controller
              name="username"
              control={control}
              rules={{
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter your username"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value ?? ""}
                  disabled={isSubmitting || isAuthLoading}
                  className="focus:ring-danger-500 w-full rounded-md bg-gray-100 outline-none focus:ring-2"
                />
              )}
            />
            {errors.username && (
              <p className="text-danger-500 text-xs">
                {errors.username.message}
              </p>
            )}
          </div>

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
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value ?? ""}
                  disabled={isSubmitting || isAuthLoading}
                  className="focus:ring-danger-500 w-full rounded-md bg-gray-100 outline-none focus:ring-2"
                />
              )}
            />
            {errors.password && (
              <p className="text-danger-500 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Confirm Password</label>
            <Controller
              name="password_confirmation"
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Confirm your password"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value ?? ""}
                  disabled={isSubmitting || isAuthLoading}
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
            disabled={isSubmitting || isAuthLoading}
            className="border-danger-500 text-danger-500 hover:bg-danger-500 hover:text-white"
          >
            {isSubmitting || isAuthLoading ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-danger-500 focus-visible:ring-danger-500 underline-offset-4 transition-all duration-300 hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
