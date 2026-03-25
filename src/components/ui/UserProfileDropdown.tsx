"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, UserRound } from "lucide-react";

import { useAuthContext } from "@/contexts/AuthContext";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface UserProfileDropdownProps {
  isScroll?: boolean;
}

export function UserProfileDropdown({ isScroll }: UserProfileDropdownProps) {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthContext();
  const [open, setOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
    setOpen(false);
  };

  const triggerClass = cn(
    "relative z-10 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-black/10 p-2 text-black transition-all duration-300 hover:cursor-pointer hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-danger-500 focus-visible:outline-none",
    isScroll && "bg-white/50 text-white hover:bg-danger-500",
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={triggerClass}>
          {isAuthenticated &&
          user?.profile_picture &&
          user?.profile_picture !== null ? (
            <Image
              src={user.profile_picture}
              alt={user.username}
              width={20}
              height={20}
              className="h-5 w-5 rounded-full object-cover"
            />
          ) : (
            <UserRound size={20} />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="w-64 bg-white p-2"
      >
        {isAuthenticated ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-2 py-1">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                {user?.profile_picture ? (
                  <Image
                    src={user.profile_picture}
                    alt={user.username}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <UserRound size={20} />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{user?.username}</span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>
            </div>

            <div className="my-1 h-px bg-gray-200" />

            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-red-500 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="px-2 py-1 text-sm text-gray-500">
              Sign in to access your account
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                router.push("/login");
                setOpen(false);
              }}
            >
              Login
            </Button>
            <Button
              className="hover:bg-danger-500 text-white"
              onClick={() => {
                router.push("/register");
                setOpen(false);
              }}
            >
              Register
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
