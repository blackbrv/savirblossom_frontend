"use client";

import React, { createContext, useCallback } from "react";

import type { CartItem, Order } from "@/types";
import type { SingleResponse } from "@/services/api-types";
import {
  useCart,
  useAddToCart,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
  useCheckout,
} from "@/services/cart";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isRemoving: boolean;
  isCheckingOut: boolean;
  addToCart: (bouquetId: number, quantity: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: (
    shippingAddress: string,
    notes?: string,
  ) => Promise<SingleResponse<Order>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function CartProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useCart();
  const addMutation = useAddToCart();
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();
  const clearMutation = useClearCart();
  const checkoutMutation = useCheckout();

  const items: CartItem[] = data?.data?.items ?? [];
  const itemCount: number = data?.data?.total_quantity ?? 0;
  const totalPrice: number = data?.data?.total_price ?? 0;

  const addToCart = useCallback(
    async (bouquetId: number, quantity: number) => {
      await addMutation.mutateAsync({ bouquet_id: bouquetId, quantity });
    },
    [addMutation],
  );

  const updateQuantity = useCallback(
    async (itemId: number, quantity: number) => {
      await updateMutation.mutateAsync({ id: itemId, quantity });
    },
    [updateMutation],
  );

  const removeItem = useCallback(
    async (itemId: number) => {
      await removeMutation.mutateAsync(itemId);
    },
    [removeMutation],
  );

  const clearCart = useCallback(async () => {
    await clearMutation.mutateAsync();
  }, [clearMutation]);

  const checkout = useCallback(
    async (shippingAddress: string, notes?: string) => {
      return checkoutMutation.mutateAsync({
        shipping_address: shippingAddress,
        notes,
      });
    },
    [checkoutMutation],
  );

  const value: CartContextType = {
    items,
    itemCount,
    totalPrice,
    isLoading,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isRemoving: removeMutation.isPending,
    isCheckingOut: checkoutMutation.isPending,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCartContext() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a <CartProvider />");
  }
  return context;
}

export { CartProvider, useCartContext };
