import { appConfig } from "@/config/app.config";
import { httpRequest } from "@/shared/lib/http";
import type {
  CreateProductPayload,
  GetProductsParams,
  MutationResult,
  Product,
  ProductCategory,
  ProductsResponse,
  UpdateProductPayload,
} from "../types/product";
import { parseProductId } from "../utils/product.utils";

const MUTATION_NOTICE =
  "DummyJSON simulated this mutation. Changes are not persisted on the server—reconcile with local state.";

function asMutationResult<T>(data: T): MutationResult<T> {
  return {
    data,
    persisted: false,
    message: MUTATION_NOTICE,
  };
}

function productsPath(suffix = ""): string {
  return `${appConfig.api.productsPath}${suffix}`;
}

export interface ProductService {
  getProducts(params?: GetProductsParams, signal?: AbortSignal): Promise<ProductsResponse>;
  /** Fetches every product using DummyJSON pagination until the full dataset is loaded. */
  getAllProducts(signal?: AbortSignal): Promise<Product[]>;
  getProductById(id: string | number, signal?: AbortSignal): Promise<Product>;
  getCategories(signal?: AbortSignal): Promise<ProductCategory[]>;
  createProduct(
    payload: CreateProductPayload,
    signal?: AbortSignal,
  ): Promise<MutationResult<Product>>;
  updateProduct(
    id: string | number,
    payload: UpdateProductPayload,
    signal?: AbortSignal,
  ): Promise<MutationResult<Product>>;
  deleteProduct(
    id: string | number,
    signal?: AbortSignal,
  ): Promise<MutationResult<Product & { isDeleted?: boolean; deletedOn?: string }>>;
}

export const productService: ProductService = {
  async getProducts(params = {}, signal) {
    const { q, category, limit, skip, select } = params;

    if (q && q.trim()) {
      return httpRequest<ProductsResponse>(productsPath("/search"), {
        searchParams: { q: q.trim(), limit, skip, select },
        signal,
      });
    }

    if (category && category.trim()) {
      return httpRequest<ProductsResponse>(
        productsPath(`/category/${encodeURIComponent(category.trim())}`),
        {
          searchParams: { limit, skip, select },
          signal,
        },
      );
    }

    return httpRequest<ProductsResponse>(productsPath(), {
      searchParams: { limit, skip, select },
      signal,
    });
  },

  async getAllProducts(signal) {
    const pageSize = appConfig.products.fetchPageSize;
    const firstPage = await productService.getProducts({ limit: pageSize, skip: 0 }, signal);
    const total = firstPage.total;

    if (!Number.isFinite(total) || total < 0) {
      throw new Error("Products API returned an invalid total count.");
    }

    if (total === 0) {
      return [];
    }

    if (firstPage.products.length === 0) {
      throw new Error(
        "Products API returned an empty first page while reporting a non-zero total.",
      );
    }

    const products = [...firstPage.products];
    const visitedSkips = new Set<number>([0]);
    const maxPages = Math.ceil(total / Math.max(pageSize, 1)) + 2;
    let pagesFetched = 1;

    while (products.length < total) {
      if (pagesFetched >= maxPages) {
        throw new Error(
          `Products pagination exceeded the expected page budget while loading ${products.length} of ${total} products.`,
        );
      }

      const skip = products.length;
      if (visitedSkips.has(skip)) {
        throw new Error(
          `Products pagination stalled at skip=${skip} after loading ${products.length} of ${total} products.`,
        );
      }
      visitedSkips.add(skip);

      const remaining = total - products.length;
      const expectedCount = Math.min(pageSize, remaining);
      const page = await productService.getProducts({ limit: pageSize, skip }, signal);
      pagesFetched += 1;

      if (page.products.length === 0) {
        throw new Error(
          `Products API returned no products at skip=${skip} before reaching total=${total} (loaded ${products.length}).`,
        );
      }

      // A short final page is expected; a short page while still incomplete is not.
      if (page.products.length < expectedCount) {
        throw new Error(
          `Products API returned a short page at skip=${skip}: got ${page.products.length}, expected ${expectedCount}.`,
        );
      }

      products.push(...page.products);

      if (products.length > total) {
        throw new Error(
          `Products pagination loaded ${products.length} items, exceeding reported total ${total}.`,
        );
      }
    }

    return products;
  },

  async getProductById(id, signal) {
    const productId = parseProductId(id);
    return httpRequest<Product>(productsPath(`/${productId}`), { signal });
  },

  async getCategories(signal) {
    return httpRequest<ProductCategory[]>(appConfig.api.categoriesPath, { signal });
  },

  async createProduct(payload, signal) {
    const data = await httpRequest<Product>(productsPath("/add"), {
      method: "POST",
      body: payload,
      signal,
    });

    return asMutationResult(data);
  },

  async updateProduct(id, payload, signal) {
    const productId = parseProductId(id);
    const data = await httpRequest<Product>(productsPath(`/${productId}`), {
      method: "PUT",
      body: payload,
      signal,
    });

    return asMutationResult(data);
  },

  async deleteProduct(id, signal) {
    const productId = parseProductId(id);
    const data = await httpRequest<Product & { isDeleted?: boolean; deletedOn?: string }>(
      productsPath(`/${productId}`),
      {
        method: "DELETE",
        signal,
      },
    );

    return asMutationResult(data);
  },
};

/** Convenience named exports for ergonomic imports. */
export const getProducts = productService.getProducts.bind(productService);
export const getAllProducts = productService.getAllProducts.bind(productService);
export const getProductById = productService.getProductById.bind(productService);
export const getCategories = productService.getCategories.bind(productService);
export const createProduct = productService.createProduct.bind(productService);
export const updateProduct = productService.updateProduct.bind(productService);
export const deleteProduct = productService.deleteProduct.bind(productService);
