"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { getCategoryById } from "@/lib/mock-data";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
  badge?: "flash" | "discount" | null;
};

function resolveBadge(product: Product, badge?: Props["badge"]) {
  if (badge) return badge;
  if (product.stockLabel === "Low stock") return "flash" as const;
  if (product.sellPrice > 0 && product.sellPrice < 1) return "discount" as const;
  return null;
}

export function ProductCard({ product, badge }: Props) {
  const { add } = useCart();
  const categoryName =
    product.categoryName ||
    (product.categoryId != null ? getCategoryById(product.categoryId)?.name : null);
  const stockClass =
    product.stockLabel === "Out of stock"
      ? "stock-out"
      : product.stockLabel === "Low stock"
        ? "stock-low"
        : "stock-ok";
  const showBadge = resolveBadge(product, badge);

  return (
    <motion.article
      className="product-card"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      {showBadge ? (
        <div className="card-badges">
          <span className={`pill-badge ${showBadge}`}>
            {showBadge === "flash" ? "Flash Deal" : "Discount"}
          </span>
        </div>
      ) : null}
      <div className="product-card-top">
        <div className="product-emoji" aria-hidden>
          {product.emoji}
        </div>
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
      <div className="price">{product.sellPrice.toFixed(2)} USDT</div>
      <div className="card-actions">
        <Link
          className="btn btn-ghost"
          href={`/products/${encodeURIComponent(product.sku)}`}
        >
          Details
        </Link>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!product.inStock}
          onClick={() => add(product)}
        >
          Add
        </button>
      </div>
    </motion.article>
  );
}
