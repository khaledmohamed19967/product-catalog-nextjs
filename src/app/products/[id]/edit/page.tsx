import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditProductForm } from "@/features/products/components/edit-product-form";
import { ProductDetailError } from "@/features/products/components/product-detail-error";
import { getCategories } from "@/features/products/services/product.service";
import type { ProductCategory } from "@/features/products/types/product";
import {
  loadProductDetail,
  truncateMetaDescription,
} from "@/features/products/utils/product-detail.utils";
import { AppShell } from "@/shared/components/layout/app-shell";
import { PageContainer } from "@/shared/components/layout/page-container";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

/** Allow blocking product lookup so `notFound()` can run before a streamed 200 shell. */
export const instant = false;

export async function generateMetadata({
  params,
}: EditProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await loadProductDetail(id);

  if (result.status === "not_found") {
    return {
      title: "Page not found",
      description: "The product you requested could not be found.",
    };
  }

  if (result.status === "error") {
    return {
      title: "Edit Product",
      description: "Update an existing catalog product.",
    };
  }

  return {
    title: `Edit ${result.product.title}`,
    description: truncateMetaDescription(
      `Edit ${result.product.title}. ${result.product.description || ""}`.trim(),
    ),
  };
}

/**
 * Same blocking existence check as the details page so Cache Components cannot
 * commit HTTP 200 before `notFound()` runs. Proxy enforces the status code.
 */
export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const result = await loadProductDetail(id);

  if (result.status === "not_found") {
    notFound();
  }

  if (result.status === "error") {
    return (
      <AppShell
        title="Edit Product"
        description="Something went wrong while loading this product."
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
          <ProductDetailError message={result.message} />
        </PageContainer>
      </AppShell>
    );
  }

  const { product } = result;
  let categories: ProductCategory[] = [];

  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  return (
    <AppShell
      title="Edit Product"
      description={product.title}
      actions={
        <Link
          href={`/products/${product.id}`}
          className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-surface px-4 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-surface-muted"
        >
          Back to details
        </Link>
      }
    >
      <PageContainer>
        <EditProductForm product={product} categories={categories} />
      </PageContainer>
    </AppShell>
  );
}
