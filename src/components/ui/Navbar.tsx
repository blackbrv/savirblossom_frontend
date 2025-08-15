"use client";

import { NavbarListItem } from "@/lib/utils/constants";
import SavirBlossomLogo from "@/assets/savir-blossom-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, UserRound } from "lucide-react";
import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import useScrollListener from "@/lib/utils/useScrollListener";
import { Input } from "./input";
import { Button } from "./button";

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
        "focus-visible:ring-danger-500 z-10 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-black/10 p-2 text-black transition-all duration-300 hover:cursor-pointer hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

interface SearchbarProps {
  isScroll?: boolean;
  onSearchClick?: (searchValue: string) => void;
}

const SearchBar = ({ isScroll, onSearchClick }: SearchbarProps) => {
  const [showSearchbar, setShowSearchbar] = React.useState(false);
  const [search, setSearch] = React.useState("");

  return (
    <div
      className={cn(
        "flex h-max w-max transform items-center rounded-full transition-all duration-300",
        showSearchbar && "gap-2",
      )}
    >
      <UserActionButtonWrapper
        onClick={(e) => {
          e.preventDefault();
          setShowSearchbar(!showSearchbar);
        }}
        className={cn(
          "h-max w-max",
          isScroll && "hover:bg-danger-500 bg-white/50 text-white",
          showSearchbar
            ? isScroll
              ? "bg-danger-500 text-white"
              : "bg-primary text-white"
            : "",
        )}
      >
        <Search size={20} />
      </UserActionButtonWrapper>

      <div
        className={cn(
          "flex items-center gap-2 transition-all duration-300 ease-in-out",
          !showSearchbar && "max-w-0 opacity-0",
          showSearchbar && "max-w-[300px] opacity-100",
        )}
      >
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className={cn(
            "border-primary h-8 flex-1",
            isScroll &&
              "desktop-tablet__body-medium__medium ring-offset-primary border-white/50 text-white placeholder:text-white/50 focus-visible:border-white/80",
          )}
          placeholder="Search Bouquet"
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            onSearchClick?.(search);
          }}
          className={cn(
            "hover:bg-danger-500 desktop-tablet__body-medium__medium h-8 bg-black text-white hover:text-white",
            isScroll && "bg-white text-black",
          )}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default function Navbar({ className }: NavbarProps) {
  const { isScroll } = useScrollListener();

  return (
    <nav
      className={cn(
        "relative top-0 z-50 container mx-auto flex h-max min-w-full items-center justify-between gap-2 px-10 py-4 transition-all duration-300",
        isScroll && "bg-primary fixed",
        className,
      )}
    >
      <Link
        href={"/"}
        className={cn(
          "focus-visible:ring-danger-500 rounded-md ring-offset-white transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          isScroll && "ring-offset-black",
        )}
        aria-label="Home"
        data-aos="fade-right"
        data-aos-once="true"
      >
        <Image
          src={SavirBlossomLogo}
          className={cn(
            "h-14 w-auto invert filter",
            isScroll && "invert-0 filter",
          )}
          alt="savirblossom-dark-logo"
        />
      </Link>

      <div
        className="flex w-max items-center gap-4"
        data-aos="fade-left"
        data-aos-once="true"
      >
        {NavbarListItem.map((nav, index) => (
          <Link
            href={nav.href}
            key={index}
            className={cn(
              "desktop-tablet__body-large__medium hover:text-danger-500 focus-visible:ring-danger-500 flex items-center rounded-md p-1 text-black transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
              isScroll && "text-white",
            )}
          >
            {nav.label}
          </Link>
        ))}

        <SearchBar
          isScroll={isScroll}
          onSearchClick={(val) => console.log(val)}
        />

        <UserActionButtonWrapper
          onClick={() => console.log("Go to Sopping page")}
          className={cn(
            isScroll && "hover:bg-danger-500 bg-white/50 text-white",
          )}
        >
          <ShoppingCart size={20} />
        </UserActionButtonWrapper>

        <UserActionButtonWrapper
          onClick={() => console.log("User Action to login or regis")}
          className={cn(
            isScroll && "hover:bg-danger-500 bg-white/50 text-white",
          )}
        >
          <UserRound size={20} />
        </UserActionButtonWrapper>
      </div>
    </nav>
  );
}
