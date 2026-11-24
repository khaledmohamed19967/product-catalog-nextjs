"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteProduct } from "../services/product.service";
import type { Product } from "../types/product";

export interface UseDeleteProductOptions {
  product: Product;
  /** Called after a successful simulated delete (e.g. local list removal). */
  onDeleted?: (productId: number) => void;
  /** When true, navigate to the products listing after success. */
  redirectToListing?: boolean;
}

export function useDeleteProduct({
  product,
  onDeleted,
  redirectToListing = false,
}: UseDeleteProductOptions) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function openDialog() {
    if (isDeleting) return;
    setOpen(true);
  }

  function closeDialog() {
    if (isDeleting) return;
    setOpen(false);
  }

  async function confirmDelete() {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      const result = await deleteProduct(product.id);

      toast.success("Product deleted (simulated)", {
        description: `DummyJSON returned a delete response for “${result.data.title}”, but did not permanently remove it from the server. A refresh may restore it.`,
      });

      setOpen(false);
      onDeleted?.(product.id);

      if (redirectToListing) {
        router.push("/products");
        router.refresh();
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete product. Please try again.";
      toast.error("Delete failed", {
        description: message,
      });
    } finally {
      setIsDeleting(false);
    }
  }

  return {
    open,
    isDeleting,
    openDialog,
    closeDialog,
    confirmDelete,
  };
}
