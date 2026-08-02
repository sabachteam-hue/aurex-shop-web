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
  categoryId: number | null;
  categoryName?: string | null;
  emoji: string;
  inStock: boolean;
  stockLabel: string;
  minQty?: number;
  maxQty?: number;
  stock?: number;
};
