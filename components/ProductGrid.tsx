"use client";

import { ProductCard } from "@/components/ProductCard";
import { Stagger, StaggerItem } from "@/components/Motion";
import type { Product } from "@/lib/types";

type Props = {
  products: Product[];
  emptyLabel?: string;
};

export function ProductGrid({
  products,
  emptyLabel = "No products match your search.",
}: Props) {
  if (!products.length) {
    return <div className="empty panel">{emptyLabel}</div>;
  }

  return (
    <Stagger className="product-grid">
      {products.map((product) => (
        <StaggerItem key={product.sku}>
          <ProductCard product={product} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Skeleton placeholders shown while the catalog is loading, same grid shape as ProductGrid. */
export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="product-grid" aria-hidden aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div className="product-card skeleton-card" key={i}>
          <div className="skeleton-block skeleton-image" />
          <div className="product-card-top">
            <div className="skeleton-block skeleton-emoji" />
            <div style={{ flex: 1 }}>
              <div className="skeleton-block skeleton-line" style={{ width: "70%" }} />
              <div className="skeleton-block skeleton-line" style={{ width: "45%" }} />
            </div>
          </div>
          <div className="skeleton-block skeleton-line" style={{ width: "35%", height: 22 }} />
          <div className="card-actions">
            <div className="skeleton-block skeleton-btn" />
            <div className="skeleton-block skeleton-btn" />
          </div>
        </div>
      ))}
    </div>
  );
}
