export type ProductSortOption =
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "rating-asc";

export interface ProductFilterState {
  search: string;
  category: string;
  sort: ProductSortOption;
  page: number;
}

export interface ProductCategoryOption {
  value: string;
  label: string;
}

export interface PaginatedProducts<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  page: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export const ALL_CATEGORIES_VALUE = "all";

export const PRODUCT_SORT_OPTIONS: ReadonlyArray<{
  value: ProductSortOption;
  label: string;
}> = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: Highest First" },
  { value: "rating-asc", label: "Rating: Lowest First" },
] as const;

export const DEFAULT_PRODUCT_FILTERS: ProductFilterState = {
  search: "",
  category: ALL_CATEGORIES_VALUE,
  sort: "price-asc",
  page: 1,
};
