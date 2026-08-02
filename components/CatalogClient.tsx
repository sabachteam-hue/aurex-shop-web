"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductGrid } from "@/components/ProductGrid";
import { SearchBar } from "@/components/SearchBar";
import { loadCategories, loadProducts, type CatalogSource } from "@/lib/catalog";
import type { Category, Product } from "@/lib/types";

export function CatalogClient() {
  const searchParams = useSearchParams();
  const initialCategory = Number(searchParams.get("category") || "") || null;
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(initialCategory);
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
        if (cat.error) setError(cat.error);
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
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [categoryId, query]);

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
          Live catalog unavailable ({error}). Showing fallback data.
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

      {loading ? (
        <div className="panel muted">Loading products…</div>
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  );
}
