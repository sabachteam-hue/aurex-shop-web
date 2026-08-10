/**
 * Storefront API client — Phase 2A: read-only catalog only.
 *
 * Set NEXT_PUBLIC_API_BASE_URL to the staging FastAPI host
 * (e.g. https://your-staging.up.railway.app). Do not point at production
 * until staging tests pass.
 */

import type { Category, Product, ShopStats } from "@/lib/types";

const API_BASE =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL) || "";

export function getApiBaseUrl(): string {
  return API_BASE.replace(/\/$/, "");
}

export type ApiError = {
  message: string;
  status?: number;
};

type ApiCategory = {
  id: number;
  name: string;
  emoji: string;
  slug: string;
  description?: string | null;
  sort_order?: number;
};

type ApiProduct = {
  id?: number;
  sku: string;
  name: string;
  description?: string | null;
  sell_price: number;
  original_price?: number | null;
  category_id: number | null;
  category?: string | null;
  emoji?: string | null;
  image_url?: string | null;
  min_qty?: number;
  max_qty?: number;
  stock?: number;
  in_stock?: boolean;
  stock_label?: string;
};

type ApiStats = {
  customers?: number;
  orders_completed?: number;
};

function mapCategory(row: ApiCategory): Category {
  return {
    id: row.id,
    name: row.name,
    emoji: row.emoji || "📦",
    slug: row.slug,
    description: row.description ?? null,
    sort_order: row.sort_order,
  };
}

function mapProduct(row: ApiProduct): Product {
  const originalPrice =
    row.original_price != null ? Number(row.original_price) : null;
  return {
    sku: row.sku,
    name: row.name,
    description: row.description || "",
    sellPrice: Number(row.sell_price || 0),
    originalPrice:
      originalPrice != null && originalPrice > Number(row.sell_price || 0)
        ? originalPrice
        : null,
    categoryId: row.category_id,
    categoryName: row.category ?? null,
    emoji: row.emoji || "🛍️",
    imageUrl: row.image_url || null,
    inStock: Boolean(row.in_stock),
    stockLabel: row.stock_label || (row.in_stock ? "In stock" : "Out of stock"),
    minQty: row.min_qty,
    maxQty: row.max_qty,
    stock: row.stock,
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getApiBaseUrl();
  if (!base) {
    throw Object.assign(new Error("NEXT_PUBLIC_API_BASE_URL is not set"), {
      status: 0,
    }) as Error & ApiError;
  }

  const response = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
    // Catalog is public read-only; always fresh enough for storefront.
    cache: "no-store",
  });

  if (!response.ok) {
    const message = `API ${response.status} for ${path}`;
    throw Object.assign(new Error(message), {
      message,
      status: response.status,
    }) as Error & ApiError;
  }

  return (await response.json()) as T;
}

export const api = {
  getApiBaseUrl,

  async getCategories(): Promise<Category[]> {
    const rows = await request<ApiCategory[]>("/api/web/categories");
    return rows.map(mapCategory);
  },

  async getProducts(opts?: {
    categoryId?: number | null;
    q?: string;
  }): Promise<Product[]> {
    const params = new URLSearchParams();
    if (opts?.categoryId != null) {
      params.set("category_id", String(opts.categoryId));
    }
    if (opts?.q?.trim()) {
      params.set("q", opts.q.trim());
    }
    const qs = params.toString();
    const rows = await request<ApiProduct[]>(
      `/api/web/products${qs ? `?${qs}` : ""}`,
    );
    return rows.map(mapProduct);
  },

  async getProduct(sku: string): Promise<Product> {
    const row = await request<ApiProduct>(
      `/api/web/products/${encodeURIComponent(sku)}`,
    );
    return mapProduct(row);
  },

  /** Optional. Callers should treat a failure here as "hide the stats row", not an error banner. */
  async getStats(): Promise<ShopStats> {
    const row = await request<ApiStats>("/api/web/stats");
    return {
      customers: Number(row.customers || 0),
      ordersCompleted: Number(row.orders_completed || 0),
    };
  },
};
