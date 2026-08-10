"use client";

import { useRef } from "react";
import type { Category, Product } from "@/lib/types";

type Props = {
  categories: Category[];
  products?: Product[];
  activeId?: number | null;
  onSelect?: (id: number | null) => void;
};

export function CategoryGrid({ categories, products = [], activeId = null, onSelect }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(dx: number) {
    trackRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  }

  function countFor(id: number | null) {
    if (!products.length) return null;
    if (id == null) return products.length;
    return products.filter((p) => p.categoryId === id).length;
  }

  return (
    <div className="category-carousel">
      <button
        type="button"
        className="category-carousel-arrow"
        onClick={() => scrollBy(-220)}
        aria-label="Scroll categories left"
      >
        ‹
      </button>
      <div className="category-carousel-track" ref={trackRef} role="list">
        <button
          type="button"
          className={`category-pill${activeId == null ? " active" : ""}`}
          onClick={() => onSelect?.(null)}
          role="listitem"
        >
          <span aria-hidden>✨</span>
          <span>All</span>
          {countFor(null) != null ? (
            <span className="category-pill-count">{countFor(null)}</span>
          ) : null}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`category-pill${activeId === cat.id ? " active" : ""}`}
            onClick={() => onSelect?.(cat.id)}
            role="listitem"
          >
            <span aria-hidden>{cat.emoji}</span>
            <span>{cat.name}</span>
            {countFor(cat.id) != null ? (
              <span className="category-pill-count">{countFor(cat.id)}</span>
            ) : null}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="category-carousel-arrow"
        onClick={() => scrollBy(220)}
        aria-label="Scroll categories right"
      >
        ›
      </button>
    </div>
  );
}
