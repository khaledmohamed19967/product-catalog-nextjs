export type {
  CreateProductPayload,
  GetProductsParams,
  MutationResult,
  Product,
  ProductCategory,
  ProductDimensions,
  ProductMeta,
  ProductRating,
  ProductReview,
  ProductsResponse,
  UpdateProductPayload,
} from "./types/product";

export type {
  PaginatedProducts,
  ProductCategoryOption,
  ProductFilterState,
  ProductSortOption,
} from "./types/product-listing";

export {
  ALL_CATEGORIES_VALUE,
  DEFAULT_PRODUCT_FILTERS,
  PRODUCT_SORT_OPTIONS,
} from "./types/product-listing";

export {
  PRODUCT_FORM_DEFAULT_VALUES,
  productFormSchema,
  toCreateProductPayload,
  toProductFormInput,
  toUpdateProductPayload,
  type ProductFormInput,
  type ProductFormValues,
} from "./schemas/product.schema";

export {
  createProduct,
  deleteProduct,
  getAllProducts,
  getCategories,
  getProductById,
  getProducts,
  productService,
  updateProduct,
  type ProductService,
} from "./services/product.service";

export {
  formatDiscountPercentage,
  formatProductPrice,
  formatProductRating,
  getDiscountedPrice,
  getProductAvailabilityLabel,
  getProductReviewCount,
  isValidProductId,
  parseProductId,
  removeLocalProduct,
  sortCategoriesByName,
  tryParseProductId,
  upsertLocalProduct,
} from "./utils/product.utils";

export {
  applyProductFilters,
  extractCategoryOptions,
  filterProductsByCategory,
  filterProductsByTitle,
  getProductImageSrc,
  hasActiveProductFilters,
  humanizeCategory,
  paginateProducts,
  sortProducts,
} from "./utils/product-listing.utils";

export {
  getProductGalleryImages,
  loadProductByIdCached,
  loadProductDetail,
  truncateMetaDescription,
  type ProductDetailLoadResult,
} from "./utils/product-detail.utils";

export { ProductListing } from "./components/product-listing";
export { ProductListSkeleton } from "./components/product-list-skeleton";
export { ProductDetail } from "./components/product-detail";
export { ProductDetailSkeleton } from "./components/product-detail-skeleton";
export { ProductDetailError } from "./components/product-detail-error";
export { ProductGallery } from "./components/product-gallery";
export { ProductBreadcrumbs } from "./components/product-breadcrumbs";
export { ProductForm } from "./components/product-form";
export { CreateProductForm } from "./components/create-product-form";
export { EditProductForm } from "./components/edit-product-form";
export { DeleteProductDialog } from "./components/delete-product-dialog";
export { DeleteProductButton } from "./components/delete-product-button";
export { ProductDetailActions } from "./components/product-detail-actions";
export { useCreateProduct } from "./hooks/use-create-product";
export { useEditProduct } from "./hooks/use-edit-product";
export { useDeleteProduct } from "./hooks/use-delete-product";
