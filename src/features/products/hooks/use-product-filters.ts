"use client";

import { useEffect, useState } from "react";
import { appConfig } from "@/config/app.config";
import type { Product } from "../types/product";
import {
  ALL_CATEGORIES_VALUE,
  DEFAULT_PRODUCT_FILTERS,
  type ProductFilterState,
  type ProductSortOption,
} from "../types/product-listing";
import {
  applyProductFilters,
  extractCategoryOptions,
  hasActiveProductFilters,
} from "../utils/product-listing.utils";

export function useProductFilters(products: Product[]) {
  const [searchInput, setSearchInput] = useState(DEFAULT_PRODUCT_FILTERS.search);
  const [filters, setFilters] = useState<ProductFilterState>(DEFAULT_PRODUCT_FILTERS);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setFilters((current) => {
        if (current.search === searchInput) return current;
        return {
          ...current,
          search: searchInput,
          page: 1,
        };
      });
    }, appConfig.products.searchDebounceMs);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  const categoryOptions = extractCategoryOptions(products);
  const result = applyProductFilters(
    products,
    filters,
    filters.page,
    appConfig.products.pageSize,
  );

  // Keep pagination in range after deletions shrink the filtered set.
  if (result.page !== filters.page) {
    setFilters((current) =>
      current.page === result.page ? current : { ...current, page: result.page },
    );
  }

  function setCategory(category: string) {
    setFilters((current) => ({
      ...current,
      category: category || ALL_CATEGORIES_VALUE,
      page: 1,
    }));
  }

  function setSort(sort: ProductSortOption) {
    setFilters((current) => ({
      ...current,
      sort,
      page: 1,
    }));
  }

  function setPage(page: number) {
    setFilters((current) => ({
      ...current,
      page,
    }));
  }

  function clearSearch() {
    setSearchInput("");
    setFilters((current) => ({
      ...current,
      search: "",
      page: 1,
    }));
  }

  function resetFilters() {
    setSearchInput("");
    setFilters(DEFAULT_PRODUCT_FILTERS);
  }

  return {
    searchInput,
    setSearchInput,
    filters,
    categoryOptions,
    result,
    hasActiveFilters: hasActiveProductFilters(filters),
    setCategory,
    setSort,
    setPage,
    clearSearch,
    resetFilters,
  };
}
