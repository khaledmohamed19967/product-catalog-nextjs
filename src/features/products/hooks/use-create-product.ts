"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  PRODUCT_FORM_DEFAULT_VALUES,
  productFormSchema,
  toCreateProductPayload,
  type ProductFormInput,
  type ProductFormValues,
} from "../schemas/product.schema";
import { createProduct } from "../services/product.service";

export function useCreateProduct() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: PRODUCT_FORM_DEFAULT_VALUES,
    mode: "onSubmit",
  });

  async function onSubmit(values: ProductFormValues) {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await createProduct(toCreateProductPayload(values));
      const createdId = result.data.id;

      toast.success("Product created (simulated)", {
        description: `DummyJSON returned product #${createdId}, but did not persist it on the server. It will not appear in the catalog after a refresh.`,
      });

      // Simulated IDs are not fetchable via getProductById, so return to the listing.
      router.push("/products");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create product. Please try again.";
      toast.error("Create failed", {
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
