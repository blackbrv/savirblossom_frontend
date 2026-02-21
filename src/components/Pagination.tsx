import { ArrowLeft, ArrowRight } from "phosphor-react";
import { Button } from "./ui/button";
import React from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  pages?: number;
  onPageChange?: (pageToGo: number) => void;
  onNext?: (e: React.MouseEvent<HTMLButtonElement>) => void; //Next callback
  onPrev?: (e: React.MouseEvent<HTMLButtonElement>) => void; //Previous callback
  onNumber?: (e: React.MouseEvent<HTMLButtonElement>, pageToGo: number) => void; //Number callback
  currentPage?: number;
}

export default function Pagination({
  pages = 4,
  currentPage = 1,
  onPageChange,
  onNext,
  onPrev,
  onNumber,
}: PaginationProps) {
  const pageInRange = React.useMemo(() => {
    if (pages <= 4) return Array.from({ length: pages }, (_, i) => i + 1);

    return [1, 2, 3, "...", pages];
  }, [pages]);

  const handlePrevious = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (currentPage !== 1 && onPageChange) onPageChange?.(currentPage - 1);

      if (!onPrev) return;

      onPrev(e);
    },
    [currentPage, onPageChange, onPrev],
  );

  const handleNext = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (currentPage !== pages && onPageChange)
        onPageChange?.(currentPage + 1);

      if (!onNext) return;

      onNext(e);
    },
    [onPageChange, currentPage, pages, onNext],
  );

  const handleNumbers = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, pageToGo: number) => {
      e.preventDefault();
      if (onPageChange) onPageChange(pageToGo);
      if (!onNumber) return;

      onNumber(e, pageToGo);
    },
    [onPageChange, onNumber],
  );

  return (
    <div
      className="flex w-full items-center justify-end gap-2"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <Button
        onClick={handlePrevious}
        size={"icon"}
        className="border-grayscale-400 hover:bg-danger-500 border bg-white hover:text-white"
      >
        <ArrowLeft className="h-3 w-3" />
      </Button>
      {pageInRange.map((range, index) => {
        if (range === "...") {
          return (
            <span className="px-4" key={`dots-${index}`}>
              ...
            </span>
          );
        }
        return (
          <Button
            onClick={(e) => handleNumbers?.(e, index + 1)}
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
        onClick={handleNext}
        size={"icon"}
        className="border-grayscale-400 hover:bg-danger-500 border bg-white hover:text-white"
      >
        <ArrowRight className="h-3 w-3" />
      </Button>
    </div>
  );
}
