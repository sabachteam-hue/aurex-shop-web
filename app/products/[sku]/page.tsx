"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { loadProduct, type CatalogSource } from "@/lib/catalog";
import type { Product } from "@/lib/types";

export default function ProductDetailPage() {
  const params = useParams<{ sku: string }>();
  const sku = String(params.sku || "");
  const { add } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [source, setSource] = useState<CatalogSource>("mock");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const result = await loadProduct(sku);
      if (cancelled) return;
      setProduct(result.product);
      setSource(result.source);
      setError(result.error);
      setNotFound(!result.product);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [sku]);

  if (loading) {
    return (
      <section className="section" style={{ marginTop: 20 }}>
        <div className="panel muted">Loading product…</div>
      </section>
    );
  }

  if (notFound || !product) {
    return (
      <section className="section" style={{ marginTop: 20 }}>
        <div className="panel">
          <h1>Product not found</h1>
          <p className="muted">This SKU is not in the catalog.</p>
          <Link className="btn btn-primary" href="/catalog">
            Back to catalog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section detail-layout" style={{ marginTop: 20 }}>
      <div className="panel">
        {error ? (
          <p className="notice">
            Live product unavailable ({error}). Showing fallback data.
          </p>
        ) : (
          <p className="notice">
            {source === "api"
              ? "Live product from the shop API. Checkout is not connected yet."
              : "Mock product detail — set NEXT_PUBLIC_API_BASE_URL for live data."}
          </p>
        )}
        <div
          className="product-emoji"
          style={{ width: 72, height: 72, fontSize: "2rem" }}
        >
          {product.emoji}
        </div>
        <h1 style={{ marginBottom: 8 }}>{product.name}</h1>
        <p className="muted">
          {product.categoryName || "General"} · SKU {product.sku} ·{" "}
          <span
            className={
              product.inStock
                ? product.stockLabel === "Low stock"
                  ? "stock-low"
                  : "stock-ok"
                : "stock-out"
            }
          >
            {product.stockLabel}
          </span>
        </p>
        <p style={{ lineHeight: 1.6 }}>{product.description || "No description."}</p>
      </div>

      <aside className="panel stack">
        <div className="price" style={{ fontSize: "1.8rem" }}>
          {product.sellPrice.toFixed(2)} USDT
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block"
          disabled={!product.inStock}
          onClick={() => add(product)}
        >
          Add to cart
        </button>
        <Link className="btn btn-ghost btn-block" href="/cart">
          View cart
        </Link>
        <Link className="btn btn-ghost btn-block" href="/catalog">
          More products
        </Link>
      </aside>
    </section>
  );
}
