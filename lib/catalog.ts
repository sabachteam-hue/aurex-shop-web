import { api, getApiBaseUrl } from "@/lib/api";
import {
  categories as mockCategories,
  getProductBySku as getMockProduct,
  products as mockProducts,
  searchProducts as searchMockProducts,
} from "@/lib/mock-data";
import type { Category, Product, ShopStats } from "@/lib/types";

export type CatalogSource = "api" | "mock";

export async function loadCategories(): Promise<{
  categories: Category[];
  source: CatalogSource;
  error?: string;
}> {
  if (!getApiBaseUrl()) {
    return { categories: mockCategories, source: "mock" };
  }
  try {
    const categories = await api.getCategories();
    return { categories, source: "api" };
  } catch (err) {
    return {
      categories: mockCategories,
      source: "mock",
      error: err instanceof Error ? err.message : "Failed to load categories",
    };
  }
}

export async function loadProducts(opts?: {
  categoryId?: number | null;
  q?: string;
}): Promise<{
  products: Product[];
  source: CatalogSource;
  error?: string;
}> {
  if (!getApiBaseUrl()) {
    return {
      products: searchMockProducts(opts?.q || "", opts?.categoryId),
      source: "mock",
    };
  }
  try {
    const products = await api.getProducts(opts);
    return { products, source: "api" };
  } catch (err) {
    return {
      products: searchMockProducts(opts?.q || "", opts?.categoryId),
      source: "mock",
      error: err instanceof Error ? err.message : "Failed to load products",
    };
  }
}

export async function loadProduct(sku: string): Promise<{
  product: Product | null;
  source: CatalogSource;
  error?: string;
}> {
  if (!getApiBaseUrl()) {
    return { product: getMockProduct(sku) || null, source: "mock" };
  }
  try {
    const product = await api.getProduct(sku);
    return { product, source: "api" };
  } catch (err) {
    const status = (err as { status?: number }).status;
    if (status === 404) {
      return { product: null, source: "api" };
    }
    return {
      product: getMockProduct(sku) || null,
      source: "mock",
      error: err instanceof Error ? err.message : "Failed to load product",
    };
  }
}

/** Featured home products: first N from live or mock catalog. */
export async function loadFeaturedProducts(limit = 3): Promise<{
  products: Product[];
  categories: Category[];
  source: CatalogSource;
  error?: string;
}> {
  const [catResult, prodResult] = await Promise.all([
    loadCategories(),
    loadProducts(),
  ]);
  return {
    categories: catResult.categories,
    products: prodResult.products.slice(0, limit),
    source: prodResult.source,
    error: prodResult.error || catResult.error,
  };
}

/**
 * Live customer/order counts for the hero. Intentionally has no mock
 * fallback — if the API is unset or the endpoint fails, callers should omit
 * the stats section rather than show a hardcoded or zeroed-out number.
 */
export async function loadStats(): Promise<ShopStats | null> {
  if (!getApiBaseUrl()) return null;
  try {
    return await api.getStats();
  } catch {
    return null;
  }
}

export { mockProducts };
