"use client";

import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BentoLayout } from "@/components/ui/BentoLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CheckoutFormData {
  shipping_address: string;
  notes?: string;
}

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => Promise<void>;
  isSubmitting?: boolean;
  error?: string;
}

export function CheckoutForm({
  onSubmit,
  isSubmitting = false,
  error,
}: CheckoutFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      shipping_address: "",
      notes: "",
    },
  });

  return (
    <div data-aos="fade-left" data-aos-once={true}>
      <BentoLayout>
        <h2 className="desktop-tablet__heading__h2 mb-6 font-semibold">
          Shipping Information
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Shipping Address <span className="text-red-500">*</span>
            </label>
            <Controller
              name="shipping_address"
              control={control}
              rules={{
                required: "Shipping address is required",
              }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Enter your complete shipping address"
                  className="min-h-[120px]"
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.shipping_address && (
              <p className="text-xs text-red-500">
                {errors.shipping_address.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Notes <span className="text-gray-400">(optional)</span>
            </label>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Add any special instructions or notes for your order"
                  className="min-h-[80px]"
                  disabled={isSubmitting}
                />
              )}
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-4">
            <Button
              type="submit"
              className="bg-danger-500 hover:bg-danger-600 w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>

            <Link href="/cart">
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                disabled={isSubmitting}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Cart
              </Button>
            </Link>
          </div>
        </form>
      </BentoLayout>
    </div>
  );
}
