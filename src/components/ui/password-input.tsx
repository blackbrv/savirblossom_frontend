"use client";

import * as React from "react";
import { Eye, EyeSlash } from "phosphor-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordInputProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Input>, "type"> {
  inputClassName?: string;
}

function PasswordInput({
  className,
  inputClassName,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={cn("relative", className)}>
      <Input
        type={showPassword ? "text" : "password"}
        className={cn(
          "focus:ring-danger-500 w-full rounded-md bg-gray-100 pr-10 outline-none focus:ring-2",
          inputClassName,
        )}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-700 focus:outline-none"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeSlash size={20} weight="bold" />
        ) : (
          <Eye size={20} weight="bold" />
        )}
      </button>
    </div>
  );
}

export { PasswordInput };
