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
        "flex min-w-5 min-h-5 hover:text-white items-center justify-center text-black  bg-black/10 hover:bg-black transition-all rounded-full p-2 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-danger-500 duration-300 z-10",
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
        "flex rounded-full transition-all duration-300 w-max h-max items-center transform",
        showSearchbar && "gap-2",
      )}
    >
      <UserActionButtonWrapper
        onClick={(e) => {
          e.preventDefault();
          setShowSearchbar(!showSearchbar);
        }}
        className={cn(
          "w-max h-max",
          isScroll && "bg-white/50 text-white hover:bg-danger-500",
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
          "flex gap-2 items-center transition-all duration-300 ease-in-out",
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
            "h-8 flex-1 border-primary",
            isScroll &&
              "border-white/50 focus-visible:border-white/80 text-white placeholder:text-white/50 desktop-tablet__body-medium__medium ring-offset-primary",
          )}
          placeholder="Search Bouquet"
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            onSearchClick?.(search);
          }}
          className={cn(
            "bg-black text-white hover:bg-danger-500 hover:text-white desktop-tablet__body-medium__medium h-8",
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
        "flex gap-2 items-center  bg-white px-10 py-4 container mx-auto min-w-full justify-between h-max fixed top-0 z-50 transition-all duration-300",
        isScroll && "bg-primary",
        className,
      )}
    >
      <Link
        href={"/"}
        className={cn(
          "focus-visible:outline-none focus-visible:ring-2 ring-offset-white focus-visible:ring-offset-2 focus-visible:ring-danger-500 transition-all duration-300 rounded-md",
          isScroll && "ring-offset-black",
        )}
        aria-label="Home"
        data-aos="fade-right"
        data-aos-once="true"
      >
        <Image
          src={SavirBlossomLogo}
          className={cn(
            "filter invert h-14 w-auto",
            isScroll && "filter invert-0",
          )}
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
            className={cn(
              "desktop-tablet__body-large__medium flex p-1 items-center text-black hover:text-danger-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-danger-500 transition-all duration-300 rounded-md",
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
            isScroll && "bg-white/50 text-white hover:bg-danger-500",
          )}
        >
          <ShoppingCart size={20} />
        </UserActionButtonWrapper>

        <UserActionButtonWrapper
          onClick={() => console.log("User Action to login or regis")}
          className={cn(
            isScroll && "bg-white/50 text-white hover:bg-danger-500",
          )}
        >
          <UserRound size={20} />
        </UserActionButtonWrapper>
      </div>
    </nav>
  );
}
