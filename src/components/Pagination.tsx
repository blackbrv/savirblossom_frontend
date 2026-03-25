import { ArrowLeft, ArrowRight } from "phosphor-react";
import { Button } from "./ui/button";
import React from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  lastPage?: number;
  onPageChange?: (pageToGo: number) => void;
  onNext?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPrev?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onNumber?: (e: React.MouseEvent<HTMLButtonElement>, pageToGo: number) => void;
  currentPage?: number;
}

export default function Pagination({
  lastPage = 1,
  currentPage = 1,
  onPageChange,
  onNext,
  onPrev,
  onNumber,
}: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const pageInRange = React.useMemo(() => {
    if (lastPage <= 5) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", lastPage];
    }

    if (currentPage >= lastPage - 2) {
      return [1, "...", lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      lastPage,
    ];
  }, [lastPage, currentPage]);

  const handlePrevious = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!isFirstPage && onPageChange) {
        onPageChange(currentPage - 1);
      }
      onPrev?.(e);
    },
    [currentPage, isFirstPage, onPageChange, onPrev],
  );

  const handleNext = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!isLastPage && onPageChange) {
        onPageChange(currentPage + 1);
      }
      onNext?.(e);
    },
    [currentPage, isLastPage, onPageChange, onNext],
  );

  const handleNumbers = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, pageToGo: number) => {
      e.preventDefault();
      if (pageToGo !== currentPage && onPageChange) {
        onPageChange(pageToGo);
      }
      onNumber?.(e, pageToGo);
    },
    [currentPage, onPageChange, onNumber],
  );

  return (
    <div
      className="flex w-full items-center justify-end gap-2"
      data-aos="fade-up"
      data-aos-once={true}
    >
      <Button
        onClick={handlePrevious}
        disabled={isFirstPage}
        size={"icon"}
        className={cn(
          "border-grayscale-400 border bg-white hover:text-white",
          isFirstPage
            ? "cursor-not-allowed opacity-50 hover:bg-white hover:text-black"
            : "hover:bg-danger-500 hover:border-danger-500",
        )}
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
        const isActive = currentPage === range;
        return (
          <Button
            onClick={(e) => handleNumbers(e, range as number)}
            key={`page-${range}`}
            size={"icon"}
            className={cn(
              "border-grayscale-400 border bg-white",
              isActive
                ? "bg-danger-500 border-danger-500 hover:bg-danger-500 text-white"
                : "hover:bg-danger-500 hover:border-danger-500 hover:text-white",
            )}
          >
            <span>{range}</span>
          </Button>
        );
      })}
      <Button
        onClick={handleNext}
        disabled={isLastPage}
        size={"icon"}
        className={cn(
          "border-grayscale-400 border bg-white hover:text-white",
          isLastPage
            ? "cursor-not-allowed opacity-50 hover:bg-white hover:text-black"
            : "hover:bg-danger-500 hover:border-danger-500",
        )}
      >
        <ArrowRight className="h-3 w-3" />
      </Button>
    </div>
  );
}
