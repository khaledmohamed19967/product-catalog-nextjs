/**
 * Central application configuration.
 * Keep environment-agnostic constants here so feature services stay lean.
 */
export const appConfig = {
  name: "Product Catalog",
  description: "Premium product management dashboard",
  api: {
    baseUrl: "https://dummyjson.com",
    productsPath: "/products",
    categoriesPath: "/products/categories",
    defaultTimeoutMs: 15_000,
  },
  /** DummyJSON mutations are simulated and do not persist server-side. */
  mutationsPersist: false,
  products: {
    pageSize: 12,
    searchDebounceMs: 300,
    fetchPageSize: 100,
  },
} as const;

export type AppConfig = typeof appConfig;
