"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductGrid, ProductGridSkeleton } from "@/components/ProductGrid";
import { SearchBar } from "@/components/SearchBar";
import { loadCategories, loadProducts, type CatalogSource } from "@/lib/catalog";
import type { Category, Product } from "@/lib/types";

type PriceRange = "all" | "under5" | "5to15" | "over15";

const PRICE_RANGES: { id: PriceRange; label: string }[] = [
  { id: "all", label: "Any price" },
  { id: "under5", label: "Under $5" },
  { id: "5to15", label: "$5 – $15" },
  { id: "over15", label: "Over $15" },
];

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
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(initialCategory);
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
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
      return true;
    });
  }, [products, priceRange, inStockOnly]);

  return (
    <section className="section" style={{ marginTop: 20 }}>
      <div className="section-head">
        <div>
          <h2>Catalog</h2>
          <p>
            {source === "api"
              ? "Live products from the shop API"
              : "Sample catalog (set NEXT_PUBLIC_API_BASE_URL for live data)"}
          </p>
        </div>
      </div>

      {error ? (
        <p className="notice">
          We&rsquo;re updating our catalog — check back in a moment. Showing sample listings for now.
        </p>
      ) : null}

      <SearchBar value={query} onChange={setQuery} />

      <div style={{ marginBottom: 16 }}>
        <CategoryGrid
          categories={categories}
          activeId={categoryId}
          onSelect={setCategoryId}
        />
      </div>

      <div className="filter-row">
        <div className="filter-group" role="group" aria-label="Filter by price">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.id}
              type="button"
              className={`chip${priceRange === range.id ? " active" : ""}`}
              onClick={() => setPriceRange(range.id)}
            >
              {range.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`chip${inStockOnly ? " active" : ""}`}
          aria-pressed={inStockOnly}
          onClick={() => setInStockOnly((v) => !v)}
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
