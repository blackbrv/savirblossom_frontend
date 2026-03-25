"use client";

import { listPathName, NavbarListItem } from "@/lib/utils/constants";
import SavirBlossomLogo from "@/assets/savir-blossom-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import React, { HTMLAttributes } from "react";
import { cn, priceFormatter } from "@/lib/utils";
import useScrollListener from "@/lib/utils/useScrollListener";
import { Input } from "./input";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import { useCartContext } from "@/contexts/CartContext";
import { UserProfileDropdown } from "./UserProfileDropdown";
import useDebounce from "@/lib/utils/useDebounce";
import { useBouquets } from "@/services/bouquet";
import { Spinner } from "phosphor-react";

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
        "focus-visible:ring-danger-500 relative z-10 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-black/10 p-2 text-black transition-all duration-300 hover:cursor-pointer hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
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
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useBouquets({
    search: debouncedSearch.length >= 2 ? debouncedSearch : undefined,
    perPage: 5,
  });

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const shouldShowDropdown =
    search.length >= 2 && (isLoading || (data?.data?.length ?? 0) > 0);

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "relative flex h-max w-max transform items-center rounded-full transition-all duration-300",
        showSearchbar && "gap-2",
      )}
    >
      <UserActionButtonWrapper
        onClick={(e) => {
          e.preventDefault();
          setShowSearchbar(!showSearchbar);
          if (!showSearchbar) {
            setSearch("");
          }
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className={cn(
          "flex items-center gap-2 transition-all duration-300 ease-in-out",
          !showSearchbar && "max-w-0 opacity-0",
          showSearchbar && "max-w-[300px] opacity-100",
        )}
      >
        <div className="relative">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onFocus={() => {}}
            className={cn(
              "border-primary h-8 flex-1",
              isScroll &&
                "desktop-tablet__body-medium__medium ring-offset-primary border-white/50 text-white placeholder:text-white/50 focus-visible:border-white/80",
            )}
            placeholder="Search Bouquet"
          />
          {shouldShowDropdown && (
            <div className="border-grayscale-200 absolute top-full left-0 z-50 mt-2 w-[300px] overflow-hidden rounded-lg border bg-white shadow-lg">
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <Spinner
                    size={24}
                    className="text-grayscale-400 animate-spin"
                  />
                </div>
              ) : data?.data && data.data.length > 0 ? (
                <>
                  <div className="max-h-[300px] overflow-y-auto">
                    {data.data.map((bouquet) => (
                      <Link
                        key={bouquet.id}
                        href={`/shop/bouquet/${bouquet.id}`}
                        className="border-grayscale-100 hover:bg-grayscale-50 flex items-center justify-between border-b px-4 py-3 transition-colors"
                        onClick={() => {
                          setShowSearchbar(false);
                          setSearch("");
                        }}
                      >
                        <span className="text-primary truncate font-medium">
                          {bouquet.name}
                        </span>
                        <span className="text-danger-500 text-sm">
                          {priceFormatter(Number(bouquet.price))}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/shop?search=${encodeURIComponent(search)}`}
                    className="bg-grayscale-50 text-danger-500 hover:bg-grayscale-100 block px-4 py-3 text-center text-sm font-medium"
                    onClick={() => {
                      setShowSearchbar(false);
                      setSearch("");
                    }}
                  >
                    Show more...
                  </Link>
                </>
              ) : (
                <div className="text-grayscale-600 p-4 text-center">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
        <Button
          type={"submit"}
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
      </form>
    </div>
  );
};

export default function Navbar({ className }: NavbarProps) {
  const pathName = usePathname();
  const shouldInverted = listPathName.includes(pathName.replace("/", ""));
  const { isScroll } = useScrollListener();
  const { itemCount } = useCartContext();

  return (
    <nav
      className={cn(
        "relative top-0 z-50 container mx-auto flex h-max min-w-full items-center justify-between gap-2 px-10 py-4 transition-all duration-300",
        shouldInverted && "fixed",
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
            (isScroll || shouldInverted) && "invert-0 filter",
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
              (isScroll || shouldInverted) && "text-white",
              pathName === nav.href && "text-danger-500 font-medium",
              pathName === nav.href &&
                (isScroll || shouldInverted) &&
                "hover:text-white",
            )}
          >
            {nav.label}
          </Link>
        ))}

        <SearchBar
          isScroll={isScroll || shouldInverted}
          onSearchClick={(val) => console.log(val)}
        />

        <Link href="/cart">
          <UserActionButtonWrapper
            className={cn(
              (isScroll || shouldInverted) &&
                "hover:bg-danger-500 bg-white/50 text-white",
            )}
          >
            <ShoppingCart size={20} />
            <span className="bg-danger-500 absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          </UserActionButtonWrapper>
        </Link>

        <UserProfileDropdown isScroll={isScroll || shouldInverted} />
      </div>
    </nav>
  );
}
