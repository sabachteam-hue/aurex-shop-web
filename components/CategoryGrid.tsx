"use client";

import type { Category } from "@/lib/types";

type Props = {
  categories: Category[];
  activeId?: number | null;
  onSelect?: (id: number | null) => void;
};

export function CategoryGrid({ categories, activeId = null, onSelect }: Props) {
  return (
    <div className="category-grid" role="list">
      <button
        type="button"
        className={`category-chip${activeId == null ? " active" : ""}`}
        onClick={() => onSelect?.(null)}
        role="listitem"
      >
        <span className="emoji">🛍️</span>
        <span>All</span>
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={`category-chip${activeId === cat.id ? " active" : ""}`}
          onClick={() => onSelect?.(cat.id)}
          role="listitem"
        >
          <span className="emoji">{cat.emoji}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}
