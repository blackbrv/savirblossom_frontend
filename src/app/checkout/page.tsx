"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCartContext } from "@/contexts/CartContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useCheckout } from "@/services/cart";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { Skeleton } from "@/components/ui/skeleton";

interface CheckoutFormData {
  shipping_address: string;
  notes?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, isLoading: isCartLoading } = useCartContext();
  const { canAccess, isLoading: isAuthLoading } = useAuthGuard();
  const checkoutMutation = useCheckout();

  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (data: CheckoutFormData) => {
    setError(undefined);

    try {
      await checkoutMutation.mutateAsync(data);
      router.push("/?checkout=success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to place order. Please try again.",
      );
    }
  };

  if (isAuthLoading || isCartLoading) {
    return (
      <main className="container mx-auto min-h-screen px-4 py-8">
        <h1 className="desktop-tablet__heading__h2 mb-8">Checkout</h1>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-80 w-full" />
          </div>
        </div>
      </main>
    );
  }

  if (!canAccess) {
    return null;
  }

  if (items.length === 0) {
    return (
      <main className="container mx-auto min-h-screen px-4 py-8">
        <h1 className="desktop-tablet__heading__h2 mb-8">Checkout</h1>
        <EmptyCart />
      </main>
    );
  }

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="desktop-tablet__heading__h2 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CheckoutForm
          onSubmit={handleSubmit}
          isSubmitting={checkoutMutation.isPending}
          error={error}
        />

        <OrderSummary items={items} totalPrice={totalPrice} />
      </div>
    </main>
  );
}
