import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Pencil, Star, Tag } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import type { Product } from "../types/product";
import { humanizeCategory } from "../utils/product-listing.utils";
import { getProductGalleryImages } from "../utils/product-detail.utils";
import {
  formatDiscountPercentage,
  formatProductPrice,
  formatProductRating,
  getDiscountedPrice,
  getProductAvailabilityLabel,
  getProductReviewCount,
} from "../utils/product.utils";
import { DeleteProductButton } from "./delete-product-button";
import { ProductBreadcrumbs } from "./product-breadcrumbs";
import { ProductGallery } from "./product-gallery";

export interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const galleryImages = getProductGalleryImages(product);
  const reviewCount = getProductReviewCount(product);
  const availability = getProductAvailabilityLabel(product);
  const inStock = product.stock > 0;
  const hasDiscount = product.discountPercentage > 0;
  const discountedPrice = getDiscountedPrice(product);

  return (
    <article className="space-y-6">
      <ProductBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.title },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        <ProductGallery images={galleryImages} alt={product.title} />

        <div className="space-y-6">
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="neutral">{humanizeCategory(product.category)}</Badge>
              {product.brand ? <Badge variant="primary">{product.brand}</Badge> : null}
              {hasDiscount ? (
                <Badge variant="warning">{formatDiscountPercentage(product.discountPercentage)}</Badge>
              ) : null}
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {product.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                <Star className="size-4 fill-warning text-warning" aria-hidden />
                <span className="sr-only">Rating</span>
                {formatProductRating(product.rating)}
              </span>
              <span aria-hidden>·</span>
              <span>
                {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
              </span>
            </div>
          </header>

          <div className="space-y-1">
            <div className="flex flex-wrap items-baseline gap-3">
              <p className="text-3xl font-semibold tracking-tight text-foreground">
                {formatProductPrice(hasDiscount ? discountedPrice : product.price)}
              </p>
              {hasDiscount ? (
                <p className="text-base text-muted-foreground line-through">
                  {formatProductPrice(product.price)}
                </p>
              ) : null}
            </div>
            {hasDiscount ? (
              <p className="text-sm text-warning">
                Includes {formatDiscountPercentage(product.discountPercentage)}
              </p>
            ) : null}
          </div>

          <section aria-labelledby="product-description-heading" className="space-y-2">
            <h2 id="product-description-heading" className="text-sm font-semibold text-foreground">
              Description
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description?.trim() || "No description provided."}
            </p>
          </section>

          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <DetailStat
              label="Availability"
              value={availability}
              badge={
                <Badge variant={inStock ? "success" : "danger"}>
                  {inStock ? "In stock" : "Out of stock"}
                </Badge>
              }
            />
            <DetailStat label="Stock" value={`${product.stock} units`} />
            {product.sku ? <DetailStat label="SKU" value={product.sku} /> : null}
            {hasDiscount ? (
              <DetailStat
                label="Discount"
                value={formatDiscountPercentage(product.discountPercentage)}
                icon={<Tag className="size-3.5" aria-hidden />}
              />
            ) : null}
          </dl>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link
              href="/products"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-surface-muted"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to products
            </Link>
            <Link
              href={`/products/${product.id}/edit`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary-hover"
            >
              <Pencil className="size-4" aria-hidden />
              Edit product
            </Link>
            <DeleteProductButton
              product={product}
              redirectToListing
              size="md"
              className="sm:ml-0"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function DetailStat({
  label,
  value,
  badge,
  icon,
}: {
  label: string;
  value: string;
  badge?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <Card className="shadow-none">
      <CardContent className="space-y-1.5 p-4">
        <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </dt>
        <dd className="flex flex-wrap items-center gap-2 text-sm font-medium text-foreground">
          {icon}
          <span>{value}</span>
          {badge}
        </dd>
      </CardContent>
    </Card>
  );
}
