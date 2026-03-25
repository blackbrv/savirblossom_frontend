"use client";

import Image from "next/image";
import SavirBlossomLogo from "@/assets/savir-blossom-logo.svg";
import {
  FooterPrivacyPolicy,
  NavbarListItem,
  SocialMediaListItem,
} from "@/lib/utils/constants";
import Link from "next/link";
import { Input } from "./input";
import { Button } from "./button";

export default function Footer() {
  return (
    <footer className="flex min-h-1/2 min-w-screen flex-col gap-4 bg-black px-10 pt-10">
      <section className="container mx-auto flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <div
            aria-label="logo-placeholder"
            className="flex aspect-square max-h-40 w-max flex-col"
          >
            <Link href="/">
              <Image
                src={SavirBlossomLogo}
                alt="savirblossom-logo"
                className="h-full w-auto"
              />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3">
            {NavbarListItem.map((item, index) => (
              <Link
                key={index}
                className="hover:text-danger-500 desktop-tablet__body-medium__medium text-white transition-all duration-300"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {SocialMediaListItem.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="hover:text-danger-500 text-white transition-all duration-300"
                target="_blank"
              >
                <social.icons size={24} />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3">
          <p className="desktop-tablet__body-medium__semibold text-white">
            Subscribe
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="flex items-center gap-3"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="border-white/50 text-white ring-offset-black placeholder:text-white/50 hover:border-white/60 focus-visible:border-white/80"
            />

            <Button
              type="submit"
              className="text-danger-500 hover:bg-danger-500 bg-white hover:text-white"
            >
              Subscribe
            </Button>
          </form>
          <p className="desktop-tablet__body-small__regular text-white">
            By subscribing you will agree with our privacy policy
          </p>
        </div>
      </section>

      <section className="container mx-auto flex items-center justify-between border-t-1 border-white/50 py-4">
        <div className="flex items-center gap-4">
          {FooterPrivacyPolicy.map((foot, index) => (
            <Link
              key={index}
              href={foot.href}
              className="hover:text-danger-500 desktop-tablet__body-medium__medium text-white underline"
            >
              {foot.label}
            </Link>
          ))}
        </div>

        <p className="desktop-tablet__body-medium__medium text-white">
          © 2025 Savirblossom
        </p>
      </section>
    </footer>
  );
}
