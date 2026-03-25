"use client";

import Image from "next/image";

import { BentoLayout } from "@/components/ui/BentoLayout";
import { CartItem } from "@/types";
import { priceFormatter } from "@/lib/utils";

interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
}

export function OrderSummary({ items, totalPrice }: OrderSummaryProps) {
  return (
    <div data-aos="fade-right" data-aos-once={true}>
      <BentoLayout className="sticky top-24">
        <h2 className="desktop-tablet__heading__h2 mb-4 font-semibold">
          Order Summary
        </h2>

        <div className="space-y-4">
          {items.map((item) => {
            const bouquet = item.bouquet;
            const price = bouquet?.price ?? 0;
            const subtotal = Number(price) * item.quantity;
            const mainImage = bouquet?.galleries?.[0]?.src;

            return (
              <div
                key={item.id}
                className="flex items-center gap-3 border-b pb-3 last:border-b-0 last:pb-0"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-gray-100">
                  {mainImage ? (
                    <Image
                      src={mainImage}
                      alt={bouquet?.name ?? "Product"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col">
                  <h4 className="line-clamp-1 text-sm font-medium text-gray-900">
                    {bouquet?.name ?? "Unknown Product"}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {item.quantity} x {priceFormatter(Number(price))}
                  </p>
                </div>

                <span className="text-sm font-medium text-gray-900">
                  {priceFormatter(subtotal)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between text-lg font-semibold text-gray-900">
            <span>Total</span>
            <span>{priceFormatter(totalPrice)}</span>
          </div>
        </div>
      </BentoLayout>
    </div>
  );
}
