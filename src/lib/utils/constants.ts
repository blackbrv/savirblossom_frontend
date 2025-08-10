import {
  Flower2,
  Headset,
  LucideProps,
  PartyPopper,
  Truck,
} from "lucide-react";
import React from "react";
import { StaticImageData } from "next/image";
import GalleryLayout01 from "@/assets/gallery-layout-01.png";

import FlowerCols01 from "@/assets/flower-cols-01.png";
import FlowerCols02 from "@/assets/flower-cols-02.png";
import FlowerCols03 from "@/assets/flower-cols-03.png";
import FlowerCols04 from "@/assets/flower-cols-04.png";

import FloweerBouquetList01 from "@/assets/flower-bouquet-list-01.png";

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

interface BouquetListTypes {
  id: number;
  image: string | StaticImageData;
  product_name: string;
  price: string;
  currency: string;
  is_new_arrival: boolean;
}

export const BouquetList: BouquetListTypes[] = [
  {
    id: 1,
    image: FloweerBouquetList01,
    product_name: "Bouquet 01",
    price: "25.000",
    currency: "Rp.",
    is_new_arrival: true,
  },
  {
    id: 2,
    image: FloweerBouquetList01,
    product_name: "Bouquet 01",
    price: "25.000",
    currency: "Rp.",
    is_new_arrival: true,
  },
  {
    id: 3,
    image: FloweerBouquetList01,
    product_name: "Bouquet 01",
    price: "25.000",
    currency: "Rp.",
    is_new_arrival: true,
  },
  {
    id: 4,
    image: FloweerBouquetList01,
    product_name: "Bouquet 01",
    price: "25.000",
    currency: "Rp.",
    is_new_arrival: true,
  },
  {
    id: 5,
    image: FloweerBouquetList01,
    product_name: "Bouquet 01",
    price: "25.000",
    currency: "Rp.",
    is_new_arrival: true,
  },
  {
    id: 6,
    image: FloweerBouquetList01,
    product_name: "Bouquet 01",
    price: "25.000",
    currency: "Rp.",
    is_new_arrival: true,
  },
];

interface WhatOurCustomerSayProps {
  id: number;
  name: string;
  comments: string;
  star_rating: 0 | 1 | 2 | 3 | 4 | 5;
}

export const WhatOurCustomerSay: WhatOurCustomerSayProps[] = [
  {
    id: 1,
    name: "Jane D.",
    comments:
      "The bouquet I ordered was absolutely stunning and even more beautiful than the pictures online. The flowers were incredibly fresh and lasted for over a week. Thank you for making my friend's birthday so special!",
    star_rating: 5,
  },
  {
    id: 2,
    name: "Jane D.",
    comments:
      "The bouquet I ordered was absolutely stunning and even more beautiful than the pictures online. The flowers were incredibly fresh and lasted for over a week. Thank you for making my friend's birthday so special!",
    star_rating: 5,
  },
  {
    id: 3,
    name: "Jane D.",
    comments:
      "The bouquet I ordered was absolutely stunning and even more beautiful than the pictures online. The flowers were incredibly fresh and lasted for over a week. Thank you for making my friend's birthday so special!",
    star_rating: 5,
  },
  {
    id: 4,
    name: "Jane D.",
    comments:
      "The bouquet I ordered was absolutely stunning and even more beautiful than the pictures online. The flowers were incredibly fresh and lasted for over a week. Thank you for making my friend's birthday so special!",
    star_rating: 5,
  },
];

interface LatestBlogsProps {
  id: number;
  title: string;
  image: StaticImageData | string;
  description: string;
  href: string;
  categories: string;
  estimated_read_time: string;
}

export const LatestBlogs: LatestBlogsProps[] = [
  {
    id: 1,
    title: "The Peony Power: A Guide to the Season's Most Beautiful Bloom",
    image: GalleryLayout01,
    description:
      "Discover the secrets to keeping your peonies looking fresh and vibrant. From the best time to buy them to simple tips for arranging, this guide will help you enjoy the king of flowers to its fullest.",
    href: "#",
    categories: "Flower Care",
    estimated_read_time: "3 min read",
  },

  {
    id: 2,
    title: "A Rainbow of Roses: Exploring the Meaning Behind Each Color",
    image: GalleryLayout01,
    description:
      "Did you know every rose color carries a unique message? Uncover the hidden language of roses, and learn how to choose the perfect bouquet to convey your deepest feelings.",
    href: "#",
    categories: "Gifting",
    estimated_read_time: "4 min read",
  },
  {
    id: 3,
    title: "DIY Your Way to a Beautiful Centerpiece",
    image: GalleryLayout01,
    description:
      "Want to bring a professional touch to your home decor? Follow our simple, step-by-step guide to creating stunning floral centerpieces that will impress all your guests.",
    href: "#",
    categories: "DIY",
    estimated_read_time: "2 min read",
  },
  {
    id: 4,
    title: "The Story of Sunflowers: From Field to Vase",
    image: GalleryLayout01,
    description:
      "Take a journey with us as we follow the lifecycle of the majestic sunflower. Learn about our commitment to sourcing, and discover how these happy flowers make their way from the field to your vase.",
    href: "#",
    categories: "Our Story",
    estimated_read_time: "5 min read",
  },
];
