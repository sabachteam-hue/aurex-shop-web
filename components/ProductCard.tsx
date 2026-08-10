"use client";

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

  return (
    <motion.article
      className="product-card"
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

      <div className="price-row">
        <div className="price">{product.sellPrice.toFixed(2)} USDT</div>
        {discount ? (
          <div className="price-original">{product.originalPrice!.toFixed(2)} USDT</div>
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
