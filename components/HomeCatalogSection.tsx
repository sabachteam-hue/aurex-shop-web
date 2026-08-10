"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FlashDealsBar } from "@/components/FlashDealsBar";
import { ProductGrid } from "@/components/ProductGrid";
import type { Category, Product } from "@/lib/types";

type PriceRange = "all" | "under5" | "5to15" | "over15";
type PlatformFilter = "all" | "web" | "desktop" | "mobile" | "multi";

function inPriceRange(price: number, range: PriceRange): boolean {
  switch (range) {
    case "under5":
      return price < 5;
    case "5to15":
      return price >= 5 && price <= 15;
    case "over15":
      return price > 15;
    default:
      return true;
  }
}

export function HomeCatalogSection({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [platform, setPlatform] = useState<PlatformFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (categoryId != null && p.categoryId !== categoryId) return false;
      if (!inPriceRange(p.sellPrice, priceRange)) return false;
      if (platform !== "all" && p.platform && p.platform !== platform) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [products, query, categoryId, priceRange, platform]);

  return (
    <section className="section" style={{ marginTop: 8 }}>
      <div className="section-head" style={{ display: "block", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.9rem" }}>Premium Digital Products</h2>
        <p>Top tools · Low prices · Warranty terms shown</p>
      </div>

      <div style={{ maxWidth: 560, margin: "18px auto 22px" }}>
        <div className="search-bar">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for premium tools…"
            aria-label="Search for premium tools"
          />
        </div>
      </div>

      <FlashDealsBar />

      <CategoryGrid
        categories={categories}
        products={products}
        activeId={categoryId}
        onSelect={setCategoryId}
      />

      <div className="filter-dropdown-row">
        <div className="filter-dropdown">
          <label htmlFor="home-pricing">Pricing:</label>
          <select
            id="home-pricing"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value as PriceRange)}
          >
            <option value="all">All</option>
            <option value="under5">Under $5</option>
            <option value="5to15">$5 - $15</option>
            <option value="over15">Over $15</option>
          </select>
        </div>
        <div className="filter-dropdown">
          <label htmlFor="home-platform">Platform:</label>
          <select
            id="home-platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value as PlatformFilter)}
          >
            <option value="all">All</option>
            <option value="web">Web App</option>
            <option value="desktop">Desktop</option>
            <option value="mobile">Mobile</option>
            <option value="multi">Multi-Platform</option>
          </select>
        </div>
        <Link href="/catalog" style={{ marginLeft: "auto", alignSelf: "center" }}>
          View all →
        </Link>
      </div>

      <ProductGrid products={filtered} />
    </section>
  );
}
