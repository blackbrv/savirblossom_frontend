"use client";

import { useState, useEffect, useMemo } from "react";

import { useCartContext } from "@/contexts/CartContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useRemoveCartItem, useUpdateCartItem } from "@/services/cart";
import { CartItemCard } from "@/components/cart/CartItemCard";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { BentoLayout } from "@/components/ui/BentoLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartPage() {
  const { items, itemCount, totalPrice, isLoading } = useCartContext();
  const { canAccess, isLoading: isAuthLoading } = useAuthGuard();

  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();

  useEffect(() => {
    if (!isAuthLoading && !canAccess) {
      return;
    }
  }, [canAccess, isAuthLoading]);

  const allSelected = useMemo(() => {
    return items.length > 0 && selectedItems.size === items.length;
  }, [items.length, selectedItems.size]);

  const selectedTotalPrice = useMemo(() => {
    return items
      .filter((item) => selectedItems.has(item.id))
      .reduce(
        (sum, item) => sum + (item.bouquet?.price ?? 0) * item.quantity,
        0,
      );
  }, [items, selectedItems]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(items.map((item) => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (id: number, selected: boolean) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const handleUpdateQuantity = async (id: number, quantity: number) => {
    try {
      await updateMutation.mutateAsync({ id, quantity });
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await removeMutation.mutateAsync(id);
      setSelectedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  if (isAuthLoading || isLoading) {
    return (
      <main className="container mx-auto min-h-screen px-4 py-8">
        <h1 className="desktop-tablet__heading__h2 mb-8">Shopping Cart</h1>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 w-full" />
            ))}
          </div>
          <div>
            <Skeleton className="h-64 w-full" />
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
        <h1
          className="desktop-tablet__heading__h2 mb-8"
          data-aos="fade-up"
          data-aos-once={true}
        >
          Shopping Cart
        </h1>
        <EmptyCart />
      </main>
    );
  }

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="desktop-tablet__heading__h2 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <BentoLayout className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={allSelected}
                onCheckedChange={handleSelectAll}
                id="select-all"
              />
              <label
                htmlFor="select-all"
                className="cursor-pointer text-sm font-medium"
              >
                Select All ({items.length} items)
              </label>
            </div>
          </BentoLayout>

          <div className="space-y-3">
            {items.map((item, index) => (
              <CartItemCard
                key={item.id}
                item={item}
                index={index}
                isSelected={selectedItems.has(item.id)}
                onSelectChange={handleSelectItem}
                onUpdateQuantity={handleUpdateQuantity}
                onDelete={handleDeleteItem}
                isUpdating={
                  updateMutation.isPending &&
                  updateMutation.variables?.id === item.id
                }
                isDeleting={
                  removeMutation.isPending &&
                  removeMutation.variables === item.id
                }
              />
            ))}
          </div>
        </div>

        <div>
          <CartSummary
            itemCount={selectedItems.size > 0 ? selectedItems.size : itemCount}
            totalPrice={
              selectedItems.size > 0 ? selectedTotalPrice : totalPrice
            }
            isEmpty={items.length === 0}
          />
        </div>
      </div>
    </main>
  );
}
