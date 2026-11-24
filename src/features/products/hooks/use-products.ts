"use client";

import { useState } from "react";
import { getAllProducts } from "../services/product.service";
import type { Product } from "../types/product";
import { removeLocalProduct } from "../utils/product.utils";

export interface UseProductsOptions {
  initialProducts: Product[];
  initialError: string | null;
}

export function useProducts({ initialProducts, initialError }: UseProductsOptions) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [error, setError] = useState<string | null>(initialError);
  const [isLoading, setIsLoading] = useState(false);

  async function retry() {
    setIsLoading(true);
    try {
      const nextProducts = await getAllProducts();
      setProducts(nextProducts);
      setError(null);
    } catch (caught) {
      const message =
        caught instanceof Error
          ? caught.message
          : "Failed to load products. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  function removeProduct(productId: number) {
    setProducts((current) => removeLocalProduct(current, productId));
  }

  return {
    products,
    error,
    isLoading,
    retry,
    removeProduct,
  };
}
