"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export interface ProductPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function ProductPagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  hasPreviousPage,
  hasNextPage,
  onPrevious,
  onNext,
}: ProductPaginationProps) {
  if (totalItems === 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <nav
      className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Product pagination"
    >
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {start}–{end}
        </span>{" "}
        of <span className="font-medium text-foreground">{totalItems}</span>
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={!hasPreviousPage}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="size-4" aria-hidden />
          Previous
        </Button>
        <p className="min-w-24 text-center text-sm text-muted-foreground" aria-live="polite">
          Page{" "}
          <span className="font-medium text-foreground">
            {page} of {totalPages}
          </span>
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!hasNextPage}
          aria-label="Go to next page"
        >
          Next
          <ChevronRight className="size-4" aria-hidden />
        </Button>
      </div>
    </nav>
  );
}
