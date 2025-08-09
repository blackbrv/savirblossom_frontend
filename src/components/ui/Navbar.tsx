"use client";

import { NavbarListItem } from "@/lib/utils/constants";
import SavirBlossomLogo from "@/assets/savir-blossom-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, UserRound } from "lucide-react";
import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type NavbarProps = {
  className?: string;
};

const UserActionButtonWrapper = ({
  className,
  children,
  ...rest
}: {
  className?: string;
  children: React.ReactNode;
} & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "flex min-w-5 min-h-5 hover:text-white items-center justify-center text-black  bg-black/10 hover:bg-black transition-all rounded-full p-2 hover:cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default function Navbar({ className }: NavbarProps) {
  return (
    <nav
      className={cn(
        "flex gap-2 items-center  bg-white px-10 py-4 container mx-auto min-w-full justify-between h-max fixed top-0 z-50 transition-all duration-300",
        className,
      )}
    >
      <Link
        href={"/"}
        aria-label="Home"
        data-aos="fade-right"
        data-aos-once="true"
      >
        <Image
          src={SavirBlossomLogo}
          className="filter invert h-14 w-auto"
          alt="savirblossom-dark-logo"
        />
      </Link>

      <div
        className="w-max gap-4 items-center flex"
        data-aos="fade-left"
        data-aos-once="true"
      >
        {NavbarListItem.map((nav, index) => (
          <Link
            href={nav.href}
            key={index}
            className="desktop-tablet__body-large__medium flex p-1 items-center text-black hover:text-danger-500"
          >
            {nav.label}
          </Link>
        ))}

        <UserActionButtonWrapper onClick={() => console.log("Search bar fn")}>
          <Search size={20} />
        </UserActionButtonWrapper>

        <UserActionButtonWrapper
          onClick={() => console.log("Go to Sopping page")}
        >
          <ShoppingCart size={20} />
        </UserActionButtonWrapper>

        <UserActionButtonWrapper
          onClick={() => console.log("User Action to login or regis")}
        >
          <UserRound size={20} />
        </UserActionButtonWrapper>
      </div>
    </nav>
  );
}
