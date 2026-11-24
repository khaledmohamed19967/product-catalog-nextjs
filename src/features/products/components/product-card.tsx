"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, Pencil, Star } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import type { Product } from "../types/product";
import {
  formatProductPrice,
  formatProductRating,
} from "../utils/product.utils";
import {
  getProductImageSrc,
  humanizeCategory,
} from "../utils/product-listing.utils";
import { DeleteProductButton } from "./delete-product-button";

export interface ProductCardProps {
  product: Product;
  onDeleted?: (productId: number) => void;
}

export function ProductCard({ product, onDeleted }: ProductCardProps) {
  const imageSrc = getProductImageSrc(product);
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(imageSrc) && !imageFailed;

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
        {showImage && imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image available
          </div>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="neutral" className="max-w-full truncate">
            {humanizeCategory(product.category)}
          </Badge>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-foreground">
            <Star className="size-3.5 fill-warning text-warning" aria-hidden />
            <span className="sr-only">Rating</span>
            {formatProductRating(product.rating)}
          </span>
        </div>

        <div className="space-y-1.5">
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
            <Link
              href={`/products/${product.id}`}
              className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {product.title}
            </Link>
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.description || "No description provided."}
          </p>
        </div>

        <p className="mt-auto text-lg font-semibold tracking-tight text-foreground">
          {formatProductPrice(product.price)}
        </p>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Link
              href={`/products/${product.id}`}
              className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-3 text-xs font-medium text-foreground shadow-xs transition-colors hover:bg-surface-muted"
            >
              <Eye className="size-3.5" aria-hidden />
              View
            </Link>
            <Link
              href={`/products/${product.id}/edit`}
              className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary-hover"
            >
              <Pencil className="size-3.5" aria-hidden />
              Edit
            </Link>
          </div>
          <DeleteProductButton
            product={product}
            onDeleted={onDeleted}
            variant="outline"
            size="sm"
            className="w-full border-danger/30 text-danger hover:bg-danger-muted hover:text-danger"
          />
        </div>
      </CardContent>
    </Card>
  );
}
