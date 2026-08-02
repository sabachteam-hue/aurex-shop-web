import { Suspense } from "react";
import { CatalogClient } from "@/components/CatalogClient";

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <section className="section" style={{ marginTop: 20 }}>
          <div className="panel muted">Loading catalog…</div>
        </section>
      }
    >
      <CatalogClient />
    </Suspense>
  );
}
