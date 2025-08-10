import Image, { StaticImageData } from "next/image";
import GalleryLayout01 from "@/assets/gallery-layout-01.png";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { HTMLAttributes } from "react";

interface BlogsCardProps {
  title?: string;
  image?: StaticImageData | string;
  description?: string;
  href?: string;
  categories?: string;
  estimatedReadTime?: string;
}

export default function BlogsCard({
  estimatedReadTime = "5 min read",
  categories = "Categories",
  title = "The Peony Power",
  image = GalleryLayout01,
  description = "Discover the secrets to keeping your peonies looking fresh and vibrant. From the best time to buy them to simple tips for arranging, this guide will help you enjoy the king of flowers to its fullest.",
  href = "#",
  ...rest
}: BlogsCardProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex gap-2 items-center justify-center p-2" {...rest}>
      <Image
        src={image}
        alt="hehe"
        className="object-cover aspect-square max-w-60 rounded-lg"
        width={400}
        height={400}
      />

      <div className="flex flex-col gap-3 justify-center">
        <div className="flex gap-2 w-max items-center">
          <Badge className="rounded-md bg-danger-500 text-white py-2 px-3 hover:bg-danger-500">
            {categories}
          </Badge>
          <p className="desktop-tablet__body-medium__semibold !font-bold">
            {estimatedReadTime}
          </p>
        </div>

        <h5 className="desktop-tablet__heading__h5 !font-bold line-clamp-1">
          {title}
        </h5>
        <p className="desktop-tablet__body-medium__medium text-grayscale-400 line-clamp-4">
          {description}
        </p>

        <Link
          href={href}
          className="desktop-tablet__body-medium__semibold flex gap-2 items-center text-danger-500 hover:underline transition-all"
        >
          Read More
          <MoveRight />
        </Link>
      </div>
    </div>
  );
}
