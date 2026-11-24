/**
 * DummyJSON product models.
 * Shapes mirror https://dummyjson.com/products responses.
 */

/** Product rating on a 0–5 scale as returned by DummyJSON. */
export type ProductRating = number;

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: ProductRating;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  images: string[];
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductCategory {
  slug: string;
  name: string;
  url: string;
}

/** Fields accepted when creating a product (DummyJSON simulates persistence). */
export interface CreateProductPayload {
  title: string;
  price: number;
  category: string;
  rating?: ProductRating;
  description?: string;
  thumbnail?: string;
  brand?: string;
  stock?: number;
  discountPercentage?: number;
}

/** Partial update payload for DummyJSON PUT/PATCH simulation. */
export interface UpdateProductPayload {
  title?: string;
  price?: number;
  category?: string;
  rating?: ProductRating;
  description?: string;
  thumbnail?: string;
  brand?: string;
  stock?: number;
  discountPercentage?: number;
}

export interface GetProductsParams {
  limit?: number;
  skip?: number;
  select?: string;
  /** Free-text search against DummyJSON `/products/search`. */
  q?: string;
  category?: string;
}

/**
 * DummyJSON returns mutation responses without persisting them.
 * UI layers should merge `data` into local state when `persisted` is false.
 */
export interface MutationResult<T> {
  data: T;
  persisted: false;
  message: string;
}
