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
    <footer className="min-h-1/2 bg-black flex flex-col gap-4 min-w-screen px-10 pt-10">
      <section className="flex items-center justify-between container mx-auto">
        <div className="flex flex-col gap-4">
          <div
            aria-label="logo-placeholder"
            className="flex flex-col aspect-square max-h-40 w-max"
          >
            <Link href="/">
              <Image
                src={SavirBlossomLogo}
                alt="savirblossom-logo"
                className="h-full w-auto"
              />
            </Link>
          </div>

          <div className="flex gap-3 items-center justify-center">
            {NavbarListItem.map((item, index) => (
              <Link
                key={index}
                className="text-white hover:text-danger-500 transition-all duration-300 desktop-tablet__body-medium__medium"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex gap-4 items-center">
            {SocialMediaListItem.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="text-white hover:text-danger-500 transition-all duration-300"
                target="_blank"
              >
                <social.icons size={24} />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 justify-center">
          <p className="desktop-tablet__body-medium__semibold text-white ">
            Subscribe
          </p>
          <div className="flex gap-3 items-center">
            <Input
              type="email"
              placeholder="Enter your email"
              className="border-white/50 focus-visible:border-white/80 text-white placeholder:text-white/50 hover:border-white/60 ring-offset-black"
            />

            <Button className="bg-white text-danger-500 hover:bg-danger-500 hover:text-white">
              Subscribe
            </Button>
          </div>
          <p className="desktop-tablet__body-small__regular text-white">
            By subscribing you will agree with our privacy policy
          </p>
        </div>
      </section>

      <section className="flex items-center justify-between container mx-auto border-t-1 border-white/50 py-4">
        <div className="flex gap-4 items-center">
          {FooterPrivacyPolicy.map((foot, index) => (
            <Link
              key={index}
              href={foot.href}
              className="text-white underline hover:text-danger-500 desktop-tablet__body-medium__medium"
            >
              {foot.label}
            </Link>
          ))}
        </div>

        <p className="text-white desktop-tablet__body-medium__medium">
          © 2025 Savirblossom
        </p>
      </section>
    </footer>
  );
}
