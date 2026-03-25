"use client";

import { CheckCircle, XCircle } from "phosphor-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Toast,
  ToastClose,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, variant, ...props }) => {
        const isSuccess = variant === "success";
        const isError = variant === "destructive";

        return (
          <Toast
            key={id}
            {...props}
            className={cn(
              isSuccess ? "border-l-4 border-l-[#006367]" : undefined,
              "p-4",
            )}
          >
            <div className="flex items-start gap-4">
              {isSuccess && (
                <CheckCircle
                  className="h-5 w-5 shrink-0 text-[#006367]"
                  weight="fill"
                />
              )}
              {isError && (
                <XCircle
                  className="text-danger-500 h-5 w-5 shrink-0"
                  weight="fill"
                />
              )}
              <div className="flex flex-col gap-1">
                {title && <p className="text-sm font-semibold">{title}</p>}
                {description && (
                  <p className="text-sm text-gray-600">{description}</p>
                )}
              </div>
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
