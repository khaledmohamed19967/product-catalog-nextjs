"use client";

import { Trash2 } from "lucide-react";
import { Button, type ButtonSize, type ButtonVariant } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/cn";
import { useDeleteProduct } from "../hooks/use-delete-product";
import type { Product } from "../types/product";
import { DeleteProductDialog } from "./delete-product-dialog";

export interface DeleteProductButtonProps {
  product: Product;
  onDeleted?: (productId: number) => void;
  redirectToListing?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  label?: string;
  iconOnly?: boolean;
}

export function DeleteProductButton({
  product,
  onDeleted,
  redirectToListing = false,
  variant = "danger",
  size = "sm",
  className,
  label = "Delete",
  iconOnly = false,
}: DeleteProductButtonProps) {
  const { open, isDeleting, openDialog, closeDialog, confirmDelete } = useDeleteProduct({
    product,
    onDeleted,
    redirectToListing,
  });

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        className={cn(iconOnly && "px-2", className)}
        onClick={openDialog}
        disabled={isDeleting}
        aria-label={`Delete ${product.title}`}
      >
        <Trash2 className="size-3.5" aria-hidden />
        {iconOnly ? <span className="sr-only">{label}</span> : label}
      </Button>

      <DeleteProductDialog
        product={product}
        open={open}
        isDeleting={isDeleting}
        onClose={closeDialog}
        onConfirm={() => {
          void confirmDelete();
        }}
      />
    </>
  );
}
