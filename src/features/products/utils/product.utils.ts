import type { Product, ProductCategory, ProductRating } from "../types/product";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatProductPrice(price: number): string {
  return currencyFormatter.format(price);
}

export function formatProductRating(rating: ProductRating): string {
  return rating.toFixed(2);
}

export function getProductAvailabilityLabel(product: Product): string {
  if (product.stock <= 0) return "Out of stock";
  return product.availabilityStatus || "In Stock";
}

export function getDiscountedPrice(product: Product): number {
  if (!product.discountPercentage) return product.price;
  return Number((product.price * (1 - product.discountPercentage / 100)).toFixed(2));
}

export function sortCategoriesByName(categories: ProductCategory[]): ProductCategory[] {
  return [...categories].sort((a, b) => a.name.localeCompare(b.name));
}

export function isValidProductId(id: unknown): id is number {
  return typeof id === "number" && Number.isInteger(id) && id > 0;
}

export function parseProductId(value: string | number): number {
  const parsed = typeof value === "number" ? value : Number(value);

  if (!isValidProductId(parsed)) {
    throw new Error(`Invalid product id: ${String(value)}`);
  }

  return parsed;
}

/** Returns a valid product id or null without throwing. */
export function tryParseProductId(value: string | number): number | null {
  const parsed = typeof value === "number" ? value : Number(value);
  return isValidProductId(parsed) ? parsed : null;
}

export function formatDiscountPercentage(discountPercentage: number): string {
  return `${discountPercentage.toFixed(discountPercentage % 1 === 0 ? 0 : 2)}% off`;
}

export function getProductReviewCount(product: Product): number {
  return product.reviews?.length ?? 0;
}

/**
 * Merge a simulated mutation response into an existing product list.
 * Useful because DummyJSON does not persist create/update/delete.
 */
export function upsertLocalProduct(products: Product[], product: Product): Product[] {
  const index = products.findIndex((item) => item.id === product.id);
  if (index === -1) {
    return [product, ...products];
  }

  const next = [...products];
  next[index] = { ...next[index], ...product };
  return next;
}

export function removeLocalProduct(products: Product[], id: number): Product[] {
  return products.filter((product) => product.id !== id);
}
