"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/cn";

export interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function ProductSearch({ value, onChange, onClear }: ProductSearchProps) {
  return (
    <div className="flex w-full min-w-0 flex-1 flex-col gap-1.5">
      <label htmlFor="product-search" className="text-sm font-medium text-foreground">
        Search products
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          id="product-search"
          name="product-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by title…"
          autoComplete="off"
          className={cn(
            "h-10 w-full rounded-md border border-input bg-surface py-2 pr-10 pl-9 text-sm text-foreground shadow-xs",
            "placeholder:text-muted-foreground",
            "transition-[border-color,box-shadow]",
            "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20",
          )}
        />
        {value ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-1/2 right-1 h-8 -translate-y-1/2 px-2"
            onClick={onClear}
            aria-label="Clear search"
          >
            <X className="size-4" aria-hidden />
          </Button>
        ) : null}
      </div>
    </div>
  );
}
