"use client";

import Link from "next/link";

import { BentoLayout } from "@/components/ui/BentoLayout";
import { Button } from "@/components/ui/button";
import { priceFormatter } from "@/lib/utils";

interface CartSummaryProps {
  itemCount: number;
  totalPrice: number;
  isEmpty?: boolean;
}

export function CartSummary({
  itemCount,
  totalPrice,
  isEmpty = false,
}: CartSummaryProps) {
  return (
    <div data-aos="fade-left" data-aos-once={true}>
      <BentoLayout className="sticky top-24">
        <h2 className="desktop-tablet__heading__h2 mb-4 font-semibold">
          Cart Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Total Items</span>
            <span className="font-medium">{itemCount}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">{priceFormatter(totalPrice)}</span>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between text-lg font-semibold text-gray-900">
              <span>Total</span>
              <span>{priceFormatter(totalPrice)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/checkout" className="block">
            <Button
              className="bg-danger-500 hover:bg-danger-600 w-full"
              disabled={isEmpty}
              size="lg"
            >
              Proceed to Checkout
            </Button>
          </Link>
        </div>

        <p className="mt-3 text-center text-xs text-gray-500">
          Shipping and taxes calculated at checkout
        </p>
      </BentoLayout>
    </div>
  );
}
