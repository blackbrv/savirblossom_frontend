import {
  Flower2,
  Headset,
  LucideProps,
  PartyPopper,
  Truck,
} from "lucide-react";
import React from "react";
import { StaticImageData } from "next/image";
import FlowerCols01 from "@/assets/flower-cols-01.png";
import FlowerCols02 from "@/assets/flower-cols-02.png";
import FlowerCols03 from "@/assets/flower-cols-03.png";
import FlowerCols04 from "@/assets/flower-cols-04.png";

interface NavbarListItemProps {
  label: string;
  href: string;
}

export const NavbarListItem: NavbarListItemProps[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Shop", href: "/shop" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact us", href: "/contact-us" },
];

interface OurSupportsProps {
  title: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
}

export const OurSupports: OurSupportsProps[] = [
  {
    title: "Free Shipping",
    description: "On all orders over RP. 100k",
    icon: Truck,
  },
  {
    title: "Fresh Flower",
    description: "We provide 100% fresh flowers",
    icon: Flower2,
  },
  {
    title: "Support 24/7",
    description: "Support for 24 hours per day",
    icon: Headset,
  },
  {
    title: "Occasions",
    description: "Perfect for any occasions",
    icon: PartyPopper,
  },
];

interface HomeGridContentProps {
  subTitle: string;
  title: string;
  image: StaticImageData;
}

export const HomeGridContent: HomeGridContentProps[] = [
  {
    subTitle: "Always New",
    title: "New Arrivals",
    image: FlowerCols01,
  },
  {
    subTitle: "Gift for you",
    title: "Birthday Gifts",
    image: FlowerCols02,
  },
  {
    subTitle: "Fresh room",
    title: "Room Flower",
    image: FlowerCols03,
  },
  {
    subTitle: "Always New",
    title: "New Arrivals",
    image: FlowerCols04,
  },
];
