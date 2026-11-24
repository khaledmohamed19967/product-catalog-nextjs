"use client";

import { Select } from "@/shared/components/ui/select";
import {
  ALL_CATEGORIES_VALUE,
  type ProductCategoryOption,
} from "../types/product-listing";

export interface ProductFiltersProps {
  category: string;
  options: ProductCategoryOption[];
  onCategoryChange: (category: string) => void;
}

export function ProductFilters({
  category,
  options,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="w-full min-w-0 sm:max-w-56">
      <Select
        id="product-category"
        name="product-category"
        label="Category"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        placeholder="Select category"
        options={[
          { value: ALL_CATEGORIES_VALUE, label: "All categories" },
          ...options,
        ]}
      />
    </div>
  );
}
