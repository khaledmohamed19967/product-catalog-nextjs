import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CreateProductForm } from "@/features/products/components/create-product-form";
import { getCategories } from "@/features/products/services/product.service";
import type { ProductCategory } from "@/features/products/types/product";
import { AppShell } from "@/shared/components/layout/app-shell";
import { PageContainer } from "@/shared/components/layout/page-container";
import { LoadingState } from "@/shared/components/ui/loading-state";

export const metadata: Metadata = {
  title: "Create Product",
  description: "Add a new product to the catalog.",
};

export default function NewProductPage() {
  return (
    <AppShell
      title="Create Product"
      description="Add a new item to your product catalog."
      actions={
        <Link
          href="/products"
          className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-surface px-4 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-surface-muted"
        >
          Back to products
        </Link>
      }
    >
      <PageContainer>
        <Suspense
          fallback={
            <div className="mx-auto w-full max-w-3xl">
              <LoadingState label="Loading create product form" rows={6} />
            </div>
          }
        >
          <NewProductPageContent />
        </Suspense>
      </PageContainer>
    </AppShell>
  );
}

async function NewProductPageContent() {
  let categories: ProductCategory[] = [];

  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  return <CreateProductForm categories={categories} />;
}
