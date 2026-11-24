import { cache } from "react";
import { ApiError } from "@/shared/lib/http";
import { getProductById } from "../services/product.service";
import type { Product } from "../types/product";
import { getProductImageSrc } from "./product-listing.utils";
import { tryParseProductId } from "./product.utils";

export type ProductDetailLoadResult =
  | { status: "ok"; product: Product }
  | { status: "not_found" }
  | { status: "error"; message: string };

/** Deduplicate product fetches between generateMetadata and the page. */
export const loadProductByIdCached = cache(async (id: string): Promise<Product> => {
  return getProductById(id);
});

export async function loadProductDetail(id: string): Promise<ProductDetailLoadResult> {
  if (tryParseProductId(id) === null) {
    return { status: "not_found" };
  }

  try {
    const product = await loadProductByIdCached(id);
    return { status: "ok", product };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { status: "not_found" };
    }

    const message =
      error instanceof Error
        ? error.message
        : "Failed to load this product. Please try again.";

    return { status: "error", message };
  }
}

/** Unique gallery sources with thumbnail first when present. */
export function getProductGalleryImages(product: Product): string[] {
  const images: string[] = [];
  const seen = new Set<string>();

  const push = (src: string | null | undefined) => {
    const value = src?.trim();
    if (!value || seen.has(value)) return;
    seen.add(value);
    images.push(value);
  };

  push(getProductImageSrc(product));
  for (const image of product.images ?? []) {
    push(image);
  }

  return images;
}

export function truncateMetaDescription(description: string, maxLength = 160): string {
  const normalized = description.trim().replace(/\s+/g, " ");
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}
