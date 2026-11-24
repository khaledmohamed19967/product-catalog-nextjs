"use client";

import { Select } from "@/shared/components/ui/select";
import {
  PRODUCT_SORT_OPTIONS,
  type ProductSortOption,
} from "../types/product-listing";

export interface ProductSortProps {
  value: ProductSortOption;
  onChange: (value: ProductSortOption) => void;
}

function isProductSortOption(value: string): value is ProductSortOption {
  return PRODUCT_SORT_OPTIONS.some((option) => option.value === value);
}

export function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <div className="w-full min-w-0 sm:max-w-56">
      <Select
        id="product-sort"
        name="product-sort"
        label="Sort by"
        value={value}
        onChange={(event) => {
          const nextValue = event.target.value;
          if (isProductSortOption(nextValue)) {
            onChange(nextValue);
          }
        }}
        placeholder="Sort by"
        options={PRODUCT_SORT_OPTIONS.map((option) => ({
          value: option.value,
          label: option.label,
        }))}
      />
    </div>
  );
}
