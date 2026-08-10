"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { getCategoryById } from "@/lib/mock-data";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
};

function discountPercent(product: Product): number | null {
  if (!product.originalPrice || product.originalPrice <= product.sellPrice) return null;
  return Math.round((1 - product.sellPrice / product.originalPrice) * 100);
}

export function ProductCard({ product }: Props) {
  const { add } = useCart();
  const [noteOpen, setNoteOpen] = useState(false);
  const categoryName =
    product.categoryName ||
    (product.categoryId != null ? getCategoryById(product.categoryId)?.name : null);
  const stockClass =
    product.stockLabel === "Out of stock"
      ? "stock-out"
      : product.stockLabel === "Low stock"
        ? "stock-low"
        : "stock-ok";
  const discount = discountPercent(product);
  const accentClass = `accent-${product.accent || "violet"}`;
  const warrantyPercent = product.warrantyPercent ?? 70;

  return (
    <motion.article
      className={`product-card ${accentClass}`}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      {discount ? (
        <div className="card-badges">
          <span className="pill-badge discount">Sale −{discount}%</span>
        </div>
      ) : null}

      {product.imageUrl ? (
        <Link
          href={`/products/${encodeURIComponent(product.sku)}`}
          className="product-card-image"
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={225}
            className="product-card-image-el"
          />
        </Link>
      ) : null}

      <div className="card-top-row">
        <span
          className="card-info-btn"
          title={product.description}
          aria-label={`About ${product.name}: ${product.description}`}
        >
          i
        </span>
        {product.deliveryType !== "manual" ? (
          <span className="instant-badge">
            <span aria-hidden>⚡</span> Instant
          </span>
        ) : null}
      </div>

      <div className="product-card-top">
        {!product.imageUrl ? (
          <div className="product-emoji" aria-hidden>
            {product.emoji}
          </div>
        ) : null}
        <div>
          <h3>
            <Link href={`/products/${encodeURIComponent(product.sku)}`}>
              {product.name}
            </Link>
          </h3>
          <div className="product-meta">
            {categoryName ?? "General"} ·{" "}
            <span className={stockClass}>{product.stockLabel}</span>
          </div>
        </div>
      </div>

      <p className="card-desc">{product.description}</p>

      {product.warrantyLabel ? (
        <>
          <div className="warranty-row">
            <span aria-hidden>🛡️</span> {product.warrantyLabel}
          </div>
          <div className="warranty-bar">
            <div
              className="warranty-bar-fill"
              style={{ width: `${warrantyPercent}%` }}
            />
          </div>
        </>
      ) : null}

      {product.note ? (
        <button
          type="button"
          className="view-note-btn"
          onClick={() => setNoteOpen((v) => !v)}
        >
          <span aria-hidden>📋</span> {noteOpen ? "Hide note" : "View note"}
        </button>
      ) : null}

      {noteOpen && product.note ? (
        <p className="card-desc" style={{ marginTop: -6 }}>
          {product.note}
        </p>
      ) : null}

      <div className="card-meta-row">
        <div className="price-row" style={{ flexDirection: "column", gap: 0, alignItems: "flex-start" }}>
          <span className="price-only">Only</span>
          <span className="price-value">${product.sellPrice.toFixed(2)}</span>
          {discount ? (
            <div className="price-original">${product.originalPrice!.toFixed(2)}</div>
          ) : null}
        </div>
        {product.stock != null ? (
          <span className="stock-count">
            <span className={`stock-dot${product.inStock ? " ok" : ""}`} />
            {product.stock}
          </span>
        ) : null}
      </div>

      <div className="card-actions">
        <Link
          className="btn btn-ghost"
          href={`/products/${encodeURIComponent(product.sku)}`}
        >
          Details
        </Link>
        <button
          type="button"
          className="btn btn-accent"
          disabled={!product.inStock}
          onClick={() => add(product)}
        >
          <span aria-hidden>🛒</span> Add to Cart
        </button>
      </div>
    </motion.article>
  );
}
