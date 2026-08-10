export type Category = {
  id: number;
  name: string;
  emoji: string;
  slug: string;
  description?: string | null;
  sort_order?: number;
};

export type Product = {
  sku: string;
  name: string;
  description: string;
  sellPrice: number;
  /** Pre-discount price. Only show a sale badge when this is set AND greater than sellPrice. */
  originalPrice?: number | null;
  categoryId: number | null;
  categoryName?: string | null;
  emoji: string;
  /** Absolute or root-relative URL to product artwork. Falls back to `emoji` when unset. */
  imageUrl?: string | null;
  inStock: boolean;
  stockLabel: string;
  minQty?: number;
  maxQty?: number;
  stock?: number;
};

export type ShopStats = {
  customers: number;
  ordersCompleted: number;
};
