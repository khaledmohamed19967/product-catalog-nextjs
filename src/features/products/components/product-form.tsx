"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { Select, type SelectOption } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import type { ProductFormInput } from "../schemas/product.schema";

export type ProductFormMode = "create" | "edit";

export interface ProductFormProps {
  register: UseFormRegister<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
  categoryOptions: SelectOption[];
  disabled?: boolean;
  mode?: ProductFormMode;
  idPrefix?: string;
}

export function ProductForm({
  register,
  errors,
  categoryOptions,
  disabled = false,
  mode = "create",
  idPrefix = mode === "edit" ? "edit-product" : "create-product",
}: ProductFormProps) {
  return (
    <div className="space-y-5">
      <fieldset className="space-y-4" disabled={disabled}>
        <legend className="text-sm font-semibold text-foreground">Basic information</legend>

        <Input
          id={`${idPrefix}-title`}
          label="Title"
          placeholder="Enter product title"
          autoComplete="off"
          required
          error={errors.title?.message}
          {...register("title")}
        />

        <Textarea
          id={`${idPrefix}-description`}
          label="Description"
          placeholder="Describe the product"
          required
          error={errors.description?.message}
          {...register("description")}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id={`${idPrefix}-price`}
            label="Price"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            placeholder="0.00"
            required
            error={errors.price?.message}
            {...register("price")}
          />

          <Select
            id={`${idPrefix}-category`}
            label="Category"
            placeholder="Select a category"
            required
            options={categoryOptions}
            error={errors.category?.message}
            {...register("category")}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4" disabled={disabled}>
        <legend className="text-sm font-semibold text-foreground">Optional details</legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id={`${idPrefix}-brand`}
            label="Brand"
            placeholder="Brand name"
            autoComplete="off"
            error={errors.brand?.message}
            {...register("brand")}
          />

          <Input
            id={`${idPrefix}-rating`}
            label="Rating"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            max="5"
            placeholder="0 – 5"
            hint="Optional. Must be between 0 and 5."
            error={errors.rating?.message}
            {...register("rating")}
          />
        </div>

        <Input
          id={`${idPrefix}-thumbnail`}
          label="Thumbnail URL"
          type="url"
          inputMode="url"
          placeholder="https://example.com/image.jpg"
          autoComplete="off"
          hint="Optional image URL for the product thumbnail."
          error={errors.thumbnail?.message}
          {...register("thumbnail")}
        />
      </fieldset>
    </div>
  );
}
