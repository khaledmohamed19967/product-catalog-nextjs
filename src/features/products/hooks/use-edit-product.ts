"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  productFormSchema,
  toProductFormInput,
  toUpdateProductPayload,
  type ProductFormInput,
  type ProductFormValues,
} from "../schemas/product.schema";
import { updateProduct } from "../services/product.service";
import type { Product } from "../types/product";

export interface UseEditProductOptions {
  product: Product;
}

export function useEditProduct({ product }: UseEditProductOptions) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: toProductFormInput(product),
    mode: "onSubmit",
  });

  async function onSubmit(values: ProductFormValues) {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await updateProduct(product.id, toUpdateProductPayload(values));

      toast.success("Product updated (simulated)", {
        description: `DummyJSON returned an updated response for product #${result.data.id}, but did not persist the changes. Refreshing the details page will show the original server data.`,
      });

      // Details still come from the live API, so return to the listing instead of stale details.
      router.push("/products");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update product. Please try again.";
      toast.error("Update failed", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
