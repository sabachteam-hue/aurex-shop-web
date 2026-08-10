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
  /** Platform tag for the Platform filter — "web" | "desktop" | "mobile" | "multi". */
  platform?: "web" | "desktop" | "mobile" | "multi";
  /** Short delivery note shown in the "VIEW NOTE" popover on the product card. */
  note?: string;
  /** Warranty label, e.g. "2 months replacement". Drives the warranty progress bar. */
  warrantyLabel?: string;
  /** 0–100. How much of the warranty bar to fill (cosmetic, defaults to 70). */
  warrantyPercent?: number;
  /** "instant" shows a lightning Instant badge, "manual" shows nothing. */
  deliveryType?: "instant" | "manual";
  /** Accent color key used for the card's price/button theme. */
  accent?: "violet" | "teal" | "green" | "rose";
};

export type ShopStats = {
  customers: number;
  ordersCompleted: number;
};
