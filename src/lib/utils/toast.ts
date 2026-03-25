import { toast as baseToast } from "@/components/ui/use-toast";
import { APIError } from "@/services/api-types";

interface ToastSuccessOptions {
  title: string;
  message?: string;
}

interface ToastErrorOptions {
  error: unknown;
  fallbackMessage?: string;
}

export const toast = {
  success: ({ title, message }: ToastSuccessOptions) => {
    baseToast({
      title,
      description: message,
      variant: "success",
    });
  },

  error: ({
    error,
    fallbackMessage = "Something went wrong",
  }: ToastErrorOptions) => {
    let title = fallbackMessage;
    let message: string | undefined;

    if (error instanceof APIError) {
      title = error.body?.message || error.message || fallbackMessage;
      const fieldErrors = error.body?.errors;
      if (fieldErrors) {
        message = Object.entries(fieldErrors)
          .map(([, messages]) => messages.join(", "))
          .join("\n");
      }
    } else if (error instanceof Error) {
      message = error.message;
    }

    baseToast({
      title,
      description: message,
      variant: "destructive",
    });
  },
};
