import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/features/products/components/product-detail";
import { ProductDetailActions } from "@/features/products/components/product-detail-actions";
import { ProductDetailError } from "@/features/products/components/product-detail-error";
import {
  loadProductDetail,
  truncateMetaDescription,
} from "@/features/products/utils/product-detail.utils";
import { humanizeCategory } from "@/features/products/utils/product-listing.utils";
import { AppShell } from "@/shared/components/layout/app-shell";
import { PageContainer } from "@/shared/components/layout/page-container";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

/** Allow blocking product lookup so `notFound()` can run before a streamed 200 shell. */
export const instant = false;

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
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
      title: "Product details",
      description: "View product details in the Product Catalog.",
    };
  }

  return {
    title: result.product.title,
    description: truncateMetaDescription(
      result.product.description || `${result.product.title} product details.`,
    ),
  };
}

/**
 * Product existence is resolved before any Suspense fallback can commit the
 * response. Combined with `src/proxy.ts`, missing/invalid IDs return HTTP 404
 * under Cache Components / PPR (streaming would otherwise lock status at 200).
 */
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const result = await loadProductDetail(id);

  if (result.status === "not_found") {
    notFound();
  }

  if (result.status === "error") {
    return (
      <AppShell
        title="Product details"
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

  return (
    <AppShell
      title="Product details"
      description={[humanizeCategory(product.category), product.brand?.trim()]
        .filter(Boolean)
        .join(" · ")}
      actions={<ProductDetailActions product={product} />}
    >
      <PageContainer>
        <ProductDetail product={product} />
      </PageContainer>
    </AppShell>
  );
}
