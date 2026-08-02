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
      {products.map((product, index) => (
        <StaggerItem key={product.sku}>
          <ProductCard
            product={product}
            badge={index === 0 ? "flash" : index === 1 ? "discount" : undefined}
          />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
