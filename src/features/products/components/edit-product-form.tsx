"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useEditProduct } from "../hooks/use-edit-product";
import type { Product, ProductCategory } from "../types/product";
import { ProductForm } from "./product-form";

export interface EditProductFormProps {
  product: Product;
  categories: ProductCategory[];
}

export function EditProductForm({ product, categories }: EditProductFormProps) {
  const { form, isSubmitting, onSubmit } = useEditProduct({ product });
  const {
    register,
    formState: { errors },
  } = form;

  const categoryOptions = categories.map((category) => ({
    value: category.slug,
    label: category.name,
  }));

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
        <CardDescription>
          Update “{product.title}”. DummyJSON will simulate the update without
          permanently saving changes.
        </CardDescription>
      </CardHeader>

      <form onSubmit={onSubmit} noValidate>
        <CardContent>
          <ProductForm
            mode="edit"
            register={register}
            errors={errors}
            categoryOptions={categoryOptions}
            disabled={isSubmitting}
          />
        </CardContent>

        <CardFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Link
            href={`/products/${product.id}`}
            className="inline-flex h-10 w-full items-center justify-center rounded-md border border-border bg-surface px-4 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-surface-muted sm:w-auto"
            aria-disabled={isSubmitting || undefined}
            tabIndex={isSubmitting ? -1 : undefined}
            onClick={(event) => {
              if (isSubmitting) event.preventDefault();
            }}
          >
            Cancel
          </Link>
          <Button
            type="submit"
            className="w-full sm:w-auto"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving…" : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
