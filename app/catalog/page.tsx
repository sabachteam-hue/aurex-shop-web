import { Suspense } from "react";
import { CatalogClient } from "@/components/CatalogClient";
import { ProductGridSkeleton } from "@/components/ProductGrid";

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <section className="section" style={{ marginTop: 20 }}>
          <ProductGridSkeleton />
        </section>
      }
    >
      <CatalogClient />
    </Suspense>
  );
}
