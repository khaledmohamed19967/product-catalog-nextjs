import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { ProductListing } from "@/features/products/components/product-listing";
import { ProductListSkeleton } from "@/features/products/components/product-list-skeleton";
import { getAllProducts } from "@/features/products/services/product.service";
import type { Product } from "@/features/products/types/product";
import { AppShell } from "@/shared/components/layout/app-shell";
import { PageContainer } from "@/shared/components/layout/page-container";

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductsPage() {
  return (
    <AppShell
      title="Products"
      description="Browse, search, and manage your catalog."
      actions={
        <Link
          href="/products/new"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary-hover"
        >
          <Plus className="size-4" aria-hidden />
          <span className="hidden sm:inline">Add product</span>
          <span className="sm:hidden">Add</span>
        </Link>
      }
    >
      <PageContainer>
        <Suspense
          fallback={
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-surface p-4 shadow-xs">
                <div className="grid gap-4 lg:grid-cols-[1fr_14rem_14rem]">
                  <div className="h-16 animate-pulse rounded-md bg-border/60" />
                  <div className="h-16 animate-pulse rounded-md bg-border/60" />
                  <div className="h-16 animate-pulse rounded-md bg-border/60" />
                </div>
              </div>
              <ProductListSkeleton />
            </div>
          }
        >
          <ProductsPageContent />
        </Suspense>
      </PageContainer>
    </AppShell>
  );
}

async function ProductsPageContent() {
  let initialProducts: Product[] = [];
  let initialError: string | null = null;

  try {
    initialProducts = await getAllProducts();
  } catch (caught) {
    initialError =
      caught instanceof Error
        ? caught.message
        : "Failed to load products. Please try again.";
  }

  return (
    <ProductListing
      initialProducts={initialProducts}
      initialError={initialError}
    />
  );
}
