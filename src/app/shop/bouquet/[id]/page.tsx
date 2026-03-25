"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "phosphor-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import QuantityInput from "@/components/ui/quantity-input";
import { useBouquet } from "@/services/bouquet";
import { useAddToCart } from "@/services/cart";
import { priceFormatter } from "@/lib/utils";
import { Spinner } from "phosphor-react";
import Link from "next/link";

export default function BouquetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bouquetId = Number(params.id);

  const [quantity, setQuantity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  const { data: bouquet, isLoading, error } = useBouquet(bouquetId);
  const addToCartMutation = useAddToCart();

  const scrollToSlide = useCallback(
    (index: number) => {
      if (carouselApi) {
        carouselApi.scrollTo(index);
        setSelectedIndex(index);
      }
    },
    [carouselApi],
  );

  useEffect(() => {
    if (carouselApi) {
      const onSelect = () => {
        setSelectedIndex(carouselApi.selectedScrollSnap());
      };
      carouselApi.on("select", onSelect);
      return () => {
        carouselApi.off("select", onSelect);
      };
    }
  }, [carouselApi]);

  const handleAddToCart = async () => {
    if (!bouquet || !bouquetId) return;

    try {
      await addToCartMutation.mutateAsync({
        bouquet_id: bouquetId,
        quantity,
      });
      router.push("/cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <Spinner size={48} className="text-grayscale-400 animate-spin" />
      </div>
    );
  }

  if (error || !bouquet?.data) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4">
        <p className="text-grayscale-600 text-lg">Bouquet not found</p>
        <Link href="/shop">
          <Button variant="outline">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const bouquetData = bouquet.data;
  const images = bouquetData.galleries?.map((g) => g.src) || [];
  const hasImages = images.length > 0;

  return (
    <main className="container mx-auto min-h-screen px-10 py-8">
      <Link
        href="/shop"
        className="text-grayscale-600 hover:text-danger-500 mb-6 inline-flex items-center gap-2 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Shop</span>
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="relative">
            {hasImages ? (
              <Carousel
                setApi={setCarouselApi}
                className="w-full"
                opts={{
                  loop: true,
                }}
              >
                <CarouselContent>
                  {images.map((src, index) => (
                    <CarouselItem key={index}>
                      <div className="bg-grayscale-100 relative aspect-square w-full overflow-hidden rounded-lg">
                        <Image
                          src={src}
                          alt={`${bouquetData.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            ) : (
              <div className="bg-grayscale-100 flex aspect-square w-full items-center justify-center rounded-lg">
                <span className="text-grayscale-400">No image available</span>
              </div>
            )}
          </div>

          {hasImages && images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto py-2">
              {images.map((src, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md transition-all ${
                    selectedIndex === index
                      ? "ring-danger-500 ring-2"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            {bouquetData.category && (
              <Badge className="bg-grayscale-200 text-grayscale-700 hover:bg-grayscale-200 mb-2">
                {bouquetData.category.name}
              </Badge>
            )}
            <h1 className="text-primary text-3xl font-semibold">
              {bouquetData.name}
            </h1>
          </div>

          <div>
            <span className="text-danger-500 text-2xl font-bold">
              {priceFormatter(Number(bouquetData.price))}
            </span>
          </div>

          {bouquetData.description && (
            <p className="text-grayscale-600 leading-relaxed">
              {bouquetData.description}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <span className="text-grayscale-600 text-sm font-medium">
              Quantity
            </span>
            <QuantityInput
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={bouquetData.stock}
              stock={bouquetData.stock}
              className="max-w-[200px]"
            />
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={bouquetData.stock === 0 || addToCartMutation.isPending}
            className="bg-danger-500 hover:bg-danger-600 w-full max-w-[300px] text-white"
            size="lg"
          >
            {addToCartMutation.isPending ? (
              <Spinner size={20} className="animate-spin" />
            ) : (
              "Add to Cart"
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}
