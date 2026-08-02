"use client";

import { useRouter } from "next/navigation";
import { CategoryGrid } from "@/components/CategoryGrid";
import type { Category } from "@/lib/types";

export function HomeCategories({ categories }: { categories: Category[] }) {
  const router = useRouter();

  return (
    <CategoryGrid
      categories={categories}
      onSelect={(id) => {
        if (id == null) {
          router.push("/catalog");
          return;
        }
        router.push(`/catalog?category=${id}`);
      }}
    />
  );
}
