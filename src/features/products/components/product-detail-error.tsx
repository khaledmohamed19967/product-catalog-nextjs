"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErrorState } from "@/shared/components/ui/error-state";

export interface ProductDetailErrorProps {
  message: string;
}

export function ProductDetailError({ message }: ProductDetailErrorProps) {
  const router = useRouter();

  return (
    <ErrorState
      title="Unable to load product"
      message={message}
      onRetry={() => {
        router.refresh();
      }}
      action={
        <Link
          href="/products"
          className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-surface px-4 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-surface-muted"
        >
          Back to products
        </Link>
      }
    />
  );
}
