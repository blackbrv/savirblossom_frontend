"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <main className="container mx-auto flex min-h-screen w-full flex-col items-center justify-center p-6">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="desktop-tablet__heading__h2 text-danger-500 !font-bold capitalize">
          Register
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Username</label>
            <Input
              type="text"
              placeholder="Enter your username"
              className="focus:ring-danger-500 w-full rounded-md bg-gray-100 outline-none focus:ring-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="focus:ring-danger-500 w-full rounded-md bg-gray-100 outline-none focus:ring-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="focus:ring-danger-500 w-full rounded-md bg-gray-100 outline-none focus:ring-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm your password"
              className="focus:ring-danger-500 w-full rounded-md bg-gray-100 outline-none focus:ring-2"
            />
          </div>

          <Button
            type="submit"
            variant={"outline"}
            className="border-danger-500 text-danger-500 hover:bg-danger-500 hover:text-white"
          >
            Register
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
