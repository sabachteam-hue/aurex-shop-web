/**
 * Phase 1 mock catalog — kept as offline fallback when API base URL is unset
 * or the staging API is unreachable.
 */

import type { Category, Product } from "@/lib/types";

export type { Category, Product };

export const BRAND_NAME = "SMF Shop";

export const categories: Category[] = [
  { id: 1, name: "Design", emoji: "🎨", slug: "design" },
  { id: 2, name: "AI Tools", emoji: "🤖", slug: "ai-tools" },
  { id: 3, name: "Streaming", emoji: "🎬", slug: "streaming" },
  { id: 4, name: "Productivity", emoji: "⚡", slug: "productivity" },
];

export const products: Product[] = [
  {
    sku: "CANVA-PRO-3Y",
    name: "Canva Pro 3 Years",
    description:
      "Full Canva Pro access for design teams. Instant delivery after payment. Mock listing for storefront UI only.",
    sellPrice: 0.4,
    categoryId: 1,
    emoji: "🖤",
    inStock: true,
    stockLabel: "In stock",
  },
  {
    sku: "CAPCUT-PRO-1M",
    name: "CapCut Pro Team 1M",
    description:
      "CapCut Pro team plan. Sample product used while the live catalog API is not connected.",
    sellPrice: 1.2,
    categoryId: 3,
    emoji: "🖤",
    inStock: true,
    stockLabel: "In stock",
  },
  {
    sku: "GEMINI-18M",
    name: "Gemini 18M Links",
    description:
      "Gemini access links pack. Placeholder copy for Phase 1 mock catalog.",
    sellPrice: 2.5,
    categoryId: 2,
    emoji: "🛴",
    inStock: true,
    stockLabel: "In stock",
  },
  {
    sku: "CHATGPT-PLUS",
    name: "ChatGPT Plus 1 Month",
    description:
      "Monthly Plus access. UI-only mock — no live order is created from this page.",
    sellPrice: 5.0,
    categoryId: 2,
    emoji: "✨",
    inStock: false,
    stockLabel: "Out of stock",
  },
  {
    sku: "NOTION-AI",
    name: "Notion AI Workspace",
    description:
      "Productivity workspace sample card for catalog layout and search demos.",
    sellPrice: 3.25,
    categoryId: 4,
    emoji: "📝",
    inStock: true,
    stockLabel: "Low stock",
  },
  {
    sku: "NETFLIX-4K",
    name: "Netflix 4K Shared",
    description:
      "Streaming category sample. Prices and stock are hardcoded mocks.",
    sellPrice: 1.8,
    categoryId: 3,
    emoji: "🍿",
    inStock: true,
    stockLabel: "In stock",
  },
];

export function getProductBySku(sku: string): Product | undefined {
  return products.find((p) => p.sku.toLowerCase() === sku.toLowerCase());
}

export function getCategoryById(id: number): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function searchProducts(
  query: string,
  categoryId?: number | null,
): Product[] {
  const q = query.trim().toLowerCase();
  return products.filter((p) => {
    if (categoryId != null && p.categoryId !== categoryId) return false;
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });
}
