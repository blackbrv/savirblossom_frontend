import { ArrowLeft, ArrowRight } from "phosphor-react";
import { Button } from "./ui/button";
import React from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  pages?: number;
  onNext?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPrev?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onNumber?: (e: React.MouseEvent<HTMLButtonElement>, pages: number) => void;
  currentPage?: number;
}

export default function Pagination({
  pages = 4,
  currentPage,
  onPrev,
  onNext,
  onNumber,
}: PaginationProps) {
  const pageInRange = React.useMemo(() => {
    if (pages <= 4) return Array.from({ length: pages }, (_, i) => i + 1);

    return [1, 2, 3, "...", pages];
  }, [pages]);

  return (
    <div className="flex w-full items-center justify-end gap-2">
      <Button
        data-aos="fade-up"
        onClick={onPrev}
        size={"icon"}
        className="border-grayscale-400 hover:bg-danger-500 border bg-white hover:text-white"
      >
        <ArrowLeft className="h-3 w-3" />
      </Button>
      {pageInRange.map((range, index) => {
        if (range === "...") {
          return (
            <span data-aos="fade-up" className="px-4" key={`dots-${index}`}>
              ...
            </span>
          );
        }
        return (
          <Button
            onClick={(e) => onNumber?.(e, index + 1)}
            data-aos="fade-up"
            key={index}
            size={"icon"}
            className={cn(
              "border-grayscale-400 hover:bg-danger-500 border bg-white hover:text-white",
              currentPage === index + 1 &&
                "bg-danger-500 border-danger-500 text-white",
            )}
          >
            <span>{index + 1}</span>
          </Button>
        );
      })}
      <Button
        onClick={onNext}
        size={"icon"}
        data-aos="fade-up"
        className="border-grayscale-400 hover:bg-danger-500 border bg-white hover:text-white"
      >
        <ArrowRight className="h-3 w-3" />
      </Button>
    </div>
  );
}
