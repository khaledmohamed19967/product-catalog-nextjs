"use client";

import Link from "next/link";
import { PackageOpen, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { ErrorState } from "@/shared/components/ui/error-state";
import { useProductFilters } from "../hooks/use-product-filters";
import { useProducts } from "../hooks/use-products";
import type { Product } from "../types/product";
import { ProductFilters } from "./product-filters";
import { ProductGrid } from "./product-grid";
import { ProductListSkeleton } from "./product-list-skeleton";
import { ProductPagination } from "./product-pagination";
import { ProductSearch } from "./product-search";
import { ProductSort } from "./product-sort";

export interface ProductListingProps {
  initialProducts: Product[];
  initialError: string | null;
}

export function ProductListing({
  initialProducts,
  initialError,
}: ProductListingProps) {
  const { products, error, isLoading, retry, removeProduct } = useProducts({
    initialProducts,
    initialError,
  });

  const {
    searchInput,
    setSearchInput,
    filters,
    categoryOptions,
    result,
    hasActiveFilters,
    setCategory,
    setSort,
    setPage,
    clearSearch,
    resetFilters,
  } = useProductFilters(products);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <ListingToolbarSkeleton />
        <ProductListSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load products"
        message={error}
        onRetry={() => {
          void retry();
        }}
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products available"
        description="The catalog is empty right now. Add a product or refresh to check again."
        icon={<PackageOpen className="size-5" aria-hidden />}
        action={
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button type="button" variant="outline" onClick={() => void retry()}>
              <RotateCcw className="size-4" aria-hidden />
              Refresh
            </Button>
            <Link
              href="/products/new"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary-hover"
            >
              <Plus className="size-4" aria-hidden />
              Add product
            </Link>
          </div>
        }
      />
    );
  }

  const showFilteredEmpty = result.totalItems === 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{products.length}</span>{" "}
          products loaded
          {hasActiveFilters ? (
            <>
              {" "}
              ·{" "}
              <span className="font-medium text-foreground">{result.totalItems}</span>{" "}
              match current filters
            </>
          ) : null}
        </p>
      </div>

      <section
        aria-label="Product filters"
        className="rounded-lg border border-border bg-surface p-4 shadow-xs"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <ProductSearch
            value={searchInput}
            onChange={setSearchInput}
            onClear={clearSearch}
          />
          <ProductFilters
            category={filters.category}
            options={categoryOptions}
            onCategoryChange={setCategory}
          />
          <ProductSort value={filters.sort} onChange={setSort} />
        </div>
      </section>

      {showFilteredEmpty ? (
        <EmptyState
          title="No matching products"
          description="Try a different title search, category, or sort combination."
          action={
            <Button type="button" variant="outline" onClick={resetFilters}>
              Reset filters
            </Button>
          }
        />
      ) : (
        <>
          <ProductGrid products={result.items} onDeleted={removeProduct} />
          <ProductPagination
            page={result.page}
            totalPages={result.totalPages}
            totalItems={result.totalItems}
            pageSize={result.pageSize}
            hasPreviousPage={result.hasPreviousPage}
            hasNextPage={result.hasNextPage}
            onPrevious={() => setPage(result.page - 1)}
            onNext={() => setPage(result.page + 1)}
          />
        </>
      )}
    </div>
  );
}

function ListingToolbarSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-xs">
      <div className="grid gap-4 lg:grid-cols-[1fr_14rem_14rem]">
        <div className="h-16 rounded-md bg-border/60" />
        <div className="h-16 rounded-md bg-border/60" />
        <div className="h-16 rounded-md bg-border/60" />
      </div>
    </div>
  );
}
