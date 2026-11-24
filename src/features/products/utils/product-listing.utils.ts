import type { Product } from "../types/product";
import type {
  PaginatedProducts,
  ProductCategoryOption,
  ProductFilterState,
  ProductSortOption,
} from "../types/product-listing";
import { ALL_CATEGORIES_VALUE } from "../types/product-listing";

export function humanizeCategory(category: string): string {
  return category
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/** Build unique category options from loaded product data (never hardcoded). */
export function extractCategoryOptions(products: Product[]): ProductCategoryOption[] {
  const unique = new Set<string>();

  for (const product of products) {
    const category = product.category?.trim();
    if (category) unique.add(category);
  }

  return Array.from(unique)
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({
      value,
      label: humanizeCategory(value),
    }));
}

export function filterProductsByTitle(products: Product[], search: string): Product[] {
  const query = search.trim().toLowerCase();
  if (!query) return products;

  return products.filter((product) => product.title.toLowerCase().includes(query));
}

export function filterProductsByCategory(products: Product[], category: string): Product[] {
  if (!category || category === ALL_CATEGORIES_VALUE) return products;
  return products.filter((product) => product.category === category);
}

export function sortProducts(products: Product[], sort: ProductSortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "rating-asc":
      return sorted.sort((a, b) => a.rating - b.rating);
    default: {
      const _exhaustive: never = sort;
      return _exhaustive;
    }
  }
}

export function paginateProducts<T>(
  items: T[],
  page: number,
  pageSize: number,
): PaginatedProducts<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    totalItems,
    totalPages,
    page: safePage,
    pageSize,
    hasPreviousPage: safePage > 1,
    hasNextPage: safePage < totalPages && totalItems > 0,
  };
}

export function applyProductFilters(
  products: Product[],
  filters: Pick<ProductFilterState, "search" | "category" | "sort">,
  page: number,
  pageSize: number,
): PaginatedProducts<Product> {
  const filtered = filterProductsByCategory(
    filterProductsByTitle(products, filters.search),
    filters.category,
  );
  const sorted = sortProducts(filtered, filters.sort);
  return paginateProducts(sorted, page, pageSize);
}

export function hasActiveProductFilters(
  filters: Pick<ProductFilterState, "search" | "category" | "sort">,
): boolean {
  return (
    filters.search.trim().length > 0 ||
    filters.category !== ALL_CATEGORIES_VALUE ||
    filters.sort !== "price-asc"
  );
}

export function getProductImageSrc(product: Product): string | null {
  const thumbnail = product.thumbnail?.trim();
  if (thumbnail) return thumbnail;

  const firstImage = product.images.find((image) => image.trim().length > 0);
  return firstImage ?? null;
}
