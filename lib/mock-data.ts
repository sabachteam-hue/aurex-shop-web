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
      "Full Canva Pro access for design teams. Instant delivery after payment.",
    sellPrice: 0.4,
    originalPrice: 0.6,
    categoryId: 1,
    emoji: "🖤",
    inStock: true,
    stockLabel: "In stock",
    platform: "web",
    note: "Login-based access. 2 months replacement warranty included.",
    warrantyLabel: "2 months replacement",
    warrantyPercent: 80,
    deliveryType: "instant",
    accent: "violet",
  },
  {
    sku: "CAPCUT-PRO-1M",
    name: "CapCut Pro Team 1M",
    description: "CapCut Pro team plan, 600 credits included.",
    sellPrice: 1.2,
    categoryId: 3,
    emoji: "🖤",
    inStock: true,
    stockLabel: "In stock",
    platform: "multi",
    note: "Shared team seat. Full-term replacement if it stops working.",
    warrantyLabel: "Full-term replacement",
    warrantyPercent: 100,
    deliveryType: "instant",
    accent: "green",
  },
  {
    sku: "GEMINI-18M",
    name: "Gemini 18M Links",
    description: "Gemini access links pack, delivered instantly.",
    sellPrice: 2.5,
    originalPrice: 3.0,
    categoryId: 2,
    emoji: "🛴",
    inStock: true,
    stockLabel: "In stock",
    platform: "web",
    note: "Link-based delivery. No login shared.",
    warrantyLabel: "1 month replacement",
    warrantyPercent: 60,
    deliveryType: "instant",
    accent: "violet",
  },
  {
    sku: "CHATGPT-PLUS",
    name: "ChatGPT Plus 1 Month",
    description: "Monthly Plus access on your own or a shared account.",
    sellPrice: 5.0,
    categoryId: 2,
    emoji: "✨",
    inStock: false,
    stockLabel: "Out of stock",
    platform: "multi",
    note: "Private account option available on request.",
    warrantyLabel: "1 month replacement",
    warrantyPercent: 40,
    deliveryType: "manual",
    accent: "rose",
  },
  {
    sku: "NOTION-AI",
    name: "Notion AI Workspace",
    description: "Productivity workspace with AI features enabled.",
    sellPrice: 3.25,
    categoryId: 4,
    emoji: "📝",
    inStock: true,
    stockLabel: "Low stock",
    platform: "web",
    note: "Workspace invite sent within minutes of payment.",
    warrantyLabel: "2 weeks replacement",
    warrantyPercent: 30,
    deliveryType: "instant",
    accent: "teal",
  },
  {
    sku: "NETFLIX-4K",
    name: "Netflix 4K Shared",
    description: "Shared 4K profile, streaming category sample.",
    sellPrice: 1.8,
    categoryId: 3,
    emoji: "🍿",
    inStock: true,
    stockLabel: "In stock",
    platform: "mobile",
    note: "Shared profile — do not change account details.",
    warrantyLabel: "7 days replacement",
    warrantyPercent: 50,
    deliveryType: "instant",
    accent: "rose",
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
