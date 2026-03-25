"use client";

import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  stock?: number;
  className?: string;
}

export function QuantityInput({
  value,
  onChange,
  min = 1,
  max,
  stock,
  className,
}: QuantityInputProps) {
  const handleIncrement = () => {
    const newValue = value + 1;
    if (!max || newValue <= max) {
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = value - 1;
    if (newValue >= min) {
      onChange(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value, 10);
    if (!isNaN(inputValue)) {
      if (inputValue < min) {
        onChange(min);
      } else if (max && inputValue > max) {
        onChange(max);
      } else {
        onChange(inputValue);
      }
    }
  };

  const canIncrement = !max || value < max;
  const canDecrement = value > min;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="border-grayscale-200 relative flex w-full items-center rounded-md border p-1">
        <Input
          type="number"
          value={value}
          onChange={handleInputChange}
          className="[appearance:textfield] pr-14 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <div className="absolute right-2 flex flex-col gap-0.5">
          <button
            type="button"
            onClick={handleIncrement}
            disabled={!canIncrement}
            className={cn(
              "flex h-5 w-6 items-center justify-center rounded transition-colors",
              canIncrement
                ? "hover:bg-grayscale-200 text-grayscale-600"
                : "text-grayscale-300 cursor-not-allowed",
            )}
            aria-label="Increment quantity"
          >
            <ChevronUp size={16} />
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            disabled={!canDecrement}
            className={cn(
              "flex h-5 w-6 items-center justify-center rounded transition-colors",
              canDecrement
                ? "hover:bg-grayscale-200 text-grayscale-600"
                : "text-grayscale-300 cursor-not-allowed",
            )}
            aria-label="Decrement quantity"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
      {stock !== undefined && (
        <span
          className={cn(
            "text-sm",
            stock > 0 ? "text-grayscale-600" : "text-danger-500",
          )}
        >
          {stock > 0 ? `${stock} available in stock` : "Out of stock"}
        </span>
      )}
    </div>
  );
}

export default QuantityInput;
