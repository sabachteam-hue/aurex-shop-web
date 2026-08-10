"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { loadProduct, type CatalogSource } from "@/lib/catalog";
import type { Product } from "@/lib/types";

function ProductDetailSkeleton() {
  return (
    <section className="section detail-layout" style={{ marginTop: 20 }} aria-busy="true">
      <div className="panel">
        <div className="skeleton-block skeleton-image" style={{ height: 240, marginBottom: 16 }} />
        <div className="skeleton-block skeleton-line" style={{ width: "60%", height: 28 }} />
        <div className="skeleton-block skeleton-line" style={{ width: "40%" }} />
        <div className="skeleton-block skeleton-line" style={{ width: "90%" }} />
        <div className="skeleton-block skeleton-line" style={{ width: "80%" }} />
      </div>
      <aside className="panel stack">
        <div className="skeleton-block skeleton-line" style={{ width: "50%", height: 32 }} />
        <div className="skeleton-block skeleton-btn" style={{ width: "100%" }} />
        <div className="skeleton-block skeleton-btn" style={{ width: "100%" }} />
      </aside>
    </section>
  );
}

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
      if (result.error) {
        console.error("Failed to load product:", result.error);
      }
      setNotFound(!result.product);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [sku]);

  if (loading) {
    return <ProductDetailSkeleton />;
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

  const discount =
    product.originalPrice && product.originalPrice > product.sellPrice
      ? Math.round((1 - product.sellPrice / product.originalPrice) * 100)
      : null;

  return (
    <section className="section detail-layout" style={{ marginTop: 20 }}>
      <div className="panel">
        {error ? (
          <p className="notice">
            We&rsquo;re updating this listing — some details may be out of date.
          </p>
        ) : (
          <p className="notice">
            {source === "api"
              ? "Live product from the shop API."
              : "Mock product detail — set NEXT_PUBLIC_API_BASE_URL for live data."}
          </p>
        )}

        {product.imageUrl ? (
          <div className="product-detail-image">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={640}
              height={360}
              className="product-detail-image-el"
              priority
            />
          </div>
        ) : (
          <div
            className="product-emoji"
            style={{ width: 72, height: 72, fontSize: "2rem" }}
          >
            {product.emoji}
          </div>
        )}

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
        {discount ? (
          <span className="pill-badge discount" style={{ width: "fit-content" }}>
            Sale −{discount}%
          </span>
        ) : null}
        <div className="price-row">
          <div className="price" style={{ fontSize: "1.8rem" }}>
            {product.sellPrice.toFixed(2)} USDT
          </div>
          {discount ? (
            <div className="price-original">{product.originalPrice!.toFixed(2)} USDT</div>
          ) : null}
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
