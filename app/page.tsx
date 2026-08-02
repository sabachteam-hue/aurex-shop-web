import Link from "next/link";
import { HomeCategories } from "@/components/HomeCategories";
import { HomeHero } from "@/components/HomeHero";
import { ProductGrid } from "@/components/ProductGrid";
import { loadFeaturedProducts } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { products, categories, source, error } = await loadFeaturedProducts(3);

  return (
    <>
      <HomeHero source={source} />

      {error ? (
        <p className="notice">
          Live catalog unavailable ({error}). Showing fallback data.
        </p>
      ) : null}

      <section className="section">
        <div className="section-head">
          <div>
            <h2>Categories</h2>
            <p>Jump into a product type</p>
          </div>
        </div>
        <HomeCategories categories={categories} />
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>Popular now</h2>
            <p>
              {source === "api" ? "From your shop inventory" : "Mock listings"}
            </p>
          </div>
          <Link href="/catalog">View all</Link>
        </div>
        <ProductGrid products={products} />
      </section>
    </>
  );
}
