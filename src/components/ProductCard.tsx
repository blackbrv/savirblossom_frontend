import Image, { StaticImageData } from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ShoppingBasket } from "lucide-react";
import { Badge } from "./ui/badge";
import React from "react";

interface ProductCardProps {
  title: string;
  image: StaticImageData | string;
  isNewArrival?: boolean;
  onCartClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ProductCard({
  title,
  image,
  isNewArrival,
  onCartClick,
  ...rest
}: ProductCardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      className="p-3 hover:shadow-md border border-grayscale-200 flex flex-col gap-4"
      {...rest}
    >
      <CardHeader className="w-full min-h-[200px] rounded-md min-w-[300px] p-0 border border-grayscale-100 relative">
        {isNewArrival && (
          <Badge className="bg-danger-500 text-white absolute top-2 left-2 rounded-sm desktop-tablet__body-medium__medium hover:bg-danger-500">
            New
          </Badge>
        )}

        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="min-w-full h-auto object-cover rounded-md"
        />
      </CardHeader>
      <div className="flex items-center w-full justify-between">
        <div className="flex flex-col gap-1">
          <CardTitle className="font-sans" aria-label="card-title">
            {title}
          </CardTitle>
          <CardDescription className="font-sans" aria-label="card-description">
            Card Description
          </CardDescription>
        </div>

        <button
          aria-label="add-to-cart-button"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-danger-500 hover:bg-black border border-grayscale-400 hover:border-black text-grayscale-400 hover:text-white p-2 transition-all duration-300 flex flex-col items-center justify-center rounded-full hover:cursor-pointer"
          onClick={onCartClick}
        >
          <ShoppingBasket size={20} />
        </button>
      </div>
    </Card>
  );
}
