"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import type { Product } from "../types/product";
import { DeleteProductButton } from "./delete-product-button";

export interface ProductDetailActionsProps {
  product: Product;
}

/** Header actions for the product details page shell. */
export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/products"
        className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-surface px-4 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-surface-muted"
      >
        Back
      </Link>
      <Link
        href={`/products/${product.id}/edit`}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary-hover"
      >
        <Pencil className="size-4" aria-hidden />
        <span className="hidden sm:inline">Edit</span>
      </Link>
      <DeleteProductButton
        product={product}
        redirectToListing
        size="md"
        label="Delete"
      />
    </div>
  );
}
