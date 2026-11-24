"use client";

import { Button } from "@/shared/components/ui/button";
import { Modal } from "@/shared/components/ui/modal";
import type { Product } from "../types/product";

export interface DeleteProductDialogProps {
  product: Product;
  open: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteProductDialog({
  product,
  open,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteProductDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Product?"
      description="This action cannot be undone."
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={onConfirm}
            isLoading={isDeleting}
            disabled={isDeleting}
            aria-label={`Delete product ${product.title}`}
          >
            {isDeleting ? "Deleting…" : "Delete Product"}
          </Button>
        </>
      }
    >
      <p className="text-sm text-muted-foreground">
        Are you sure you want to delete{" "}
        <span className="font-medium text-foreground">{product.title}</span>? The
        product will be removed from the current session view, but DummyJSON will
        not permanently delete it on the server.
      </p>
    </Modal>
  );
}
