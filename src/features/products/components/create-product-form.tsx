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
import { useCreateProduct } from "../hooks/use-create-product";
import type { ProductCategory } from "../types/product";
import { ProductForm } from "./product-form";

export interface CreateProductFormProps {
  categories: ProductCategory[];
}

export function CreateProductForm({ categories }: CreateProductFormProps) {
  const { form, isSubmitting, onSubmit } = useCreateProduct();
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
        <CardTitle>Create Product</CardTitle>
        <CardDescription>
          Add a new item to the catalog. DummyJSON will simulate the create request
          without permanently saving it.
        </CardDescription>
      </CardHeader>

      <form onSubmit={onSubmit} noValidate>
        <CardContent>
          <ProductForm
            mode="create"
            register={register}
            errors={errors}
            categoryOptions={categoryOptions}
            disabled={isSubmitting}
          />
        </CardContent>

        <CardFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Link
            href="/products"
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
            {isSubmitting ? "Creating…" : "Create Product"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
