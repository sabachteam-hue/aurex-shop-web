import Link from "next/link";
import { FAQSection } from "@/components/FAQSection";
import { HomeCategories } from "@/components/HomeCategories";
import { HomeHero } from "@/components/HomeHero";
import { HowItWorks } from "@/components/HowItWorks";
import { ProductGrid } from "@/components/ProductGrid";
import { TrustBadges } from "@/components/TrustBadges";
import { loadFeaturedProducts, loadStats } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [{ products, categories, source, error }, stats] = await Promise.all([
    loadFeaturedProducts(3),
    loadStats(),
  ]);

  if (error) {
    console.error("Home page catalog load failed:", error);
  }

  return (
    <>
      <HomeHero source={source} stats={stats} />

      <TrustBadges />

      {error ? (
        <p className="notice">
          We&rsquo;re updating our catalog — check back in a moment. Showing sample listings for now.
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

      <HowItWorks />
      <FAQSection />
    </>
  );
}
