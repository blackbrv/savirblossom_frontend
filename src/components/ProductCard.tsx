import Image, { StaticImageData } from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ShoppingBasket } from "lucide-react";
import { Badge } from "./ui/badge";
import React from "react";

interface ProductCardProps {
  title: string;
  image: StaticImageData | string;
  price?: string;
  isNewArrival?: boolean;
  isOnCart?: boolean;
  disableClick?: boolean;
  onCartClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ProductCard({
  title,
  image,
  price,
  isOnCart = false,
  isNewArrival,
  disableClick = false,
  onCartClick,
  ...rest
}: ProductCardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      className="border-grayscale-200 flex flex-col gap-4 border p-3 hover:shadow-md"
      {...rest}
    >
      <CardHeader className="border-grayscale-100 relative min-h-[200px] w-full min-w-[300px] rounded-md border p-0">
        {isNewArrival && (
          <Badge className="bg-danger-500 desktop-tablet__body-medium__medium hover:bg-danger-500 absolute top-2 left-2 rounded-sm text-white">
            New
          </Badge>
        )}

        {isOnCart && (
          <Badge className="desktop-tablet__body-medium__medium absolute top-2 right-2 rounded-sm bg-black text-white hover:bg-black">
            Already on cart
          </Badge>
        )}

        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="h-[300px] min-w-full rounded-md object-cover"
        />
      </CardHeader>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle className="font-sans" aria-label="card-title">
            {title}
          </CardTitle>
          <CardDescription
            className="text-grayscale-600 font-sans"
            aria-label="card-description"
          >
            {price}
          </CardDescription>
        </div>

        <button
          disabled={disableClick}
          aria-label="add-to-cart-button"
          className="focus-visible:ring-danger-500 border-grayscale-400 text-grayscale-400 disabled:bg-grayscale-100 disabled:hover:border-grayscale-400 disabled:hover:bg-grayscale-200 disabled:hover:text-grayscale-400 flex flex-col items-center justify-center rounded-full border p-2 transition-all duration-300 hover:cursor-pointer hover:border-black hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:hover:cursor-not-allowed"
          onClick={onCartClick}
        >
          <ShoppingBasket size={20} />
        </button>
      </div>
    </Card>
  );
}
