import { z } from "zod";
import type { CreateProductPayload, Product, UpdateProductPayload } from "../types/product";

/**
 * Form validation schema for create/edit product flows.
 * HTML inputs are strings; numeric fields are parsed during validation.
 */
export const productFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .refine((value) => !Number.isNaN(Number(value)), {
      message: "Price must be a number",
    })
    .refine((value) => Number(value) > 0, {
      message: "Price must be greater than 0",
    })
    .transform((value) => Number(value)),
  category: z.string().trim().min(1, "Category is required"),
  brand: z.string().trim().optional().or(z.literal("")),
  thumbnail: z
    .string()
    .trim()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
  rating: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .superRefine((value, context) => {
      if (!value) return;

      const parsed = Number(value);
      if (Number.isNaN(parsed)) {
        context.addIssue({
          code: "custom",
          message: "Rating must be a number",
        });
        return;
      }

      if (parsed < 0 || parsed > 5) {
        context.addIssue({
          code: "custom",
          message: "Rating must be between 0 and 5",
        });
      }
    })
    .transform((value) => (value ? Number(value) : undefined)),
});

export type ProductFormInput = z.input<typeof productFormSchema>;
export type ProductFormValues = z.output<typeof productFormSchema>;

export const PRODUCT_FORM_DEFAULT_VALUES: ProductFormInput = {
  title: "",
  description: "",
  price: "",
  category: "",
  brand: "",
  thumbnail: "",
  rating: "",
};

/** Prefill form inputs from a loaded product. Missing optional fields become empty strings. */
export function toProductFormInput(product: Product): ProductFormInput {
  return {
    title: product.title?.trim() ?? "",
    description: product.description?.trim() ?? "",
    price: Number.isFinite(product.price) ? String(product.price) : "",
    category: product.category?.trim() ?? "",
    brand: product.brand?.trim() ?? "",
    thumbnail: product.thumbnail?.trim() ?? "",
    rating: Number.isFinite(product.rating) ? String(product.rating) : "",
  };
}

/** Normalize optional empty strings before sending to the API. */
export function toCreateProductPayload(values: ProductFormValues): CreateProductPayload {
  const brand = values.brand?.trim();
  const thumbnail = values.thumbnail?.trim();

  return {
    title: values.title.trim(),
    description: values.description.trim(),
    price: values.price,
    category: values.category.trim(),
    ...(brand ? { brand } : {}),
    ...(thumbnail ? { thumbnail } : {}),
    ...(values.rating !== undefined ? { rating: values.rating } : {}),
  };
}

/** Same normalized fields as create; typed for DummyJSON update simulation. */
export function toUpdateProductPayload(values: ProductFormValues): UpdateProductPayload {
  return toCreateProductPayload(values);
}
