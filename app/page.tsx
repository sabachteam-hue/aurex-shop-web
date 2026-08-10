import { FAQSection } from "@/components/FAQSection";
import { HomeCatalogSection } from "@/components/HomeCatalogSection";
import { HomeHero } from "@/components/HomeHero";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustBadges } from "@/components/TrustBadges";
import { loadFeaturedProducts, loadStats } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [{ products, categories, source, error }, stats] = await Promise.all([
    loadFeaturedProducts(24),
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

      <HomeCatalogSection categories={categories} products={products} />

      <HowItWorks />
      <FAQSection />
    </>
  );
}
