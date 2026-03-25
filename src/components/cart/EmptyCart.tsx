"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BentoLayout } from "@/components/ui/BentoLayout";

export function EmptyCart() {
  return (
    <BentoLayout
      className="flex flex-col items-center justify-center py-12"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <ShoppingCart size={40} className="text-gray-400" />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-900">
        Your cart is empty
      </h2>
      <p className="mt-2 text-center text-gray-500">
        Looks like you haven&apos;t added anything to your cart yet.
      </p>

      <Button asChild className="bg-danger-500 text-white">
        <Link href="/shop" className="mt-6">
          Shop Now
        </Link>
      </Button>
    </BentoLayout>
  );
}
