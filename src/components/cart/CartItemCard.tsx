"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { CartItem } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { priceFormatter } from "@/lib/utils";
import { BentoLayout } from "../ui/BentoLayout";
import { toast } from "../ui/use-toast";

interface CartItemCardProps {
  item: CartItem;
  index?: number;
  isSelected: boolean;
  onSelectChange: (id: number, selected: boolean) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onDelete: (id: number) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export function CartItemCard({
  item,
  index = 0,
  isSelected,
  onSelectChange,
  onUpdateQuantity,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}: CartItemCardProps) {
  const bouquet = item.bouquet;
  const price = bouquet?.price ?? 0;
  const subtotal = Number(price) * item.quantity;
  const mainImage = bouquet?.galleries?.[0]?.src;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <BentoLayout
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-once={true}
      className="flex items-center gap-4 rounded-lg bg-white p-4"
    >
      <Checkbox
        checked={isSelected}
        onCheckedChange={(checked) => onSelectChange(item.id, checked === true)}
        className="shrink-0"
      />

      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={bouquet?.name ?? "Product"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <h3 className="line-clamp-1 font-medium text-gray-900">
          {bouquet?.name ?? "Unknown Product"}
        </h3>
        <p className="text-sm text-gray-500">
          {priceFormatter(Number(price))} / item
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(-1)}
          disabled={item.quantity <= 1 || isUpdating}
        >
          <Minus size={14} />
        </Button>

        <span className="w-8 text-center font-medium">{item.quantity}</span>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(1)}
          disabled={isUpdating}
        >
          <Plus size={14} />
        </Button>
      </div>

      <div className="flex min-w-[100px] flex-col items-end gap-1">
        <span className="font-semibold text-gray-900">
          {priceFormatter(subtotal)}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={() => onDelete(item.id)}
          disabled={isDeleting}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </BentoLayout>
  );
}
