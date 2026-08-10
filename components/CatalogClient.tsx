"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FlashDealsBar } from "@/components/FlashDealsBar";
import { ProductGrid, ProductGridSkeleton } from "@/components/ProductGrid";
import { SearchBar } from "@/components/SearchBar";
import { loadCategories, loadProducts, type CatalogSource } from "@/lib/catalog";
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

export function CatalogClient() {
  const searchParams = useSearchParams();
  const initialCategory = Number(searchParams.get("category") || "") || null;
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [categoryId, setCategoryId] = useState<number | null>(initialCategory);
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [source, setSource] = useState<CatalogSource>("mock");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cat = await loadCategories();
      if (!cancelled) {
        setCategories(cat.categories);
        if (cat.error) {
          console.error("Failed to load categories:", cat.error);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const result = await loadProducts({ categoryId, q: query });
      if (cancelled) return;
      setProducts(result.products);
      setSource(result.source);
      setError(result.error);
      if (result.error) {
        console.error("Failed to load products:", result.error);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [categoryId, query]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (inStockOnly && !p.inStock) return false;
      if (!inPriceRange(p.sellPrice, priceRange)) return false;
      if (platform !== "all" && p.platform && p.platform !== platform) return false;
      return true;
    });
  }, [products, priceRange, platform, inStockOnly]);

  return (
    <section className="section" style={{ marginTop: 20 }}>
      <div className="section-head" style={{ display: "block", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.9rem" }}>Premium Digital Products</h2>
        <p>
          {source === "api"
            ? "Live products from the shop API"
            : "Sample catalog (set NEXT_PUBLIC_API_BASE_URL for live data)"}
        </p>
      </div>

      {error ? (
        <p className="notice">
          We&rsquo;re updating our catalog — check back in a moment. Showing sample listings for now.
        </p>
      ) : null}

      <div style={{ maxWidth: 560, margin: "0 auto 22px" }}>
        <SearchBar value={query} onChange={setQuery} placeholder="Search for premium tools…" />
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
          <label htmlFor="pricing-filter">Pricing:</label>
          <select
            id="pricing-filter"
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
          <label htmlFor="platform-filter">Platform:</label>
          <select
            id="platform-filter"
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
        <button
          type="button"
          className={`chip${inStockOnly ? " active" : ""}`}
          aria-pressed={inStockOnly}
          onClick={() => setInStockOnly((v) => !v)}
          style={{ marginLeft: "auto" }}
        >
          In stock only
        </button>
      </div>

      {loading ? (
        <ProductGridSkeleton />
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </section>
  );
}
