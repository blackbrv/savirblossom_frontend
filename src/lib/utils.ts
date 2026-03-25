import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type PriceFormatterOptions = {
  locale?: string;
  currency?: string;
};

export const priceFormatter = (
  value: number,
  { locale = "id-ID", currency = "IDR" }: PriceFormatterOptions = {},
) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 3,
    trailingZeroDisplay: "stripIfInteger",
  });

  const finalValue = formatter.format(value);

  return finalValue;
};

interface ScrollToTopOptions {
  targetY?: number;
  behavior?: ScrollBehavior;
  tolerance?: number;
  onComplete?: () => void;
}

export function scrollToTop({
  targetY = 0,
  behavior = "smooth",
  tolerance = 5,
  onComplete,
}: ScrollToTopOptions = {}) {
  window.scrollTo({ top: targetY, behavior });

  if (onComplete) {
    const waitForScrollToFinish = () => {
      const currentY = window.pageYOffset;

      if (Math.abs(currentY - targetY) <= tolerance) {
        onComplete();
      } else {
        requestAnimationFrame(waitForScrollToFinish);
      }
    };

    requestAnimationFrame(waitForScrollToFinish);
  }
}
