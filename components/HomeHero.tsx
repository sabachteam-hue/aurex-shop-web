"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { FadeIn } from "@/components/Motion";
import { BRAND_NAME } from "@/lib/mock-data";

type Props = {
  source: "api" | "mock";
};

export function HomeHero({ source }: Props) {
  return (
    <section className="hero">
      <FadeIn>
        <div className="hero-logo-wrap">
          <div className="hero-logo-glow" aria-hidden />
          <BrandLogo size={160} className="hero-logo" priority />
        </div>
      </FadeIn>
      <FadeIn delay={0.08}>
        <div className="hero-pills">
          <span className="pill-badge flash">Flash Deals</span>
          <span className="pill-badge discount">Member Discounts</span>
        </div>
        <h1 className="hero-brand">{BRAND_NAME}</h1>
        <p>
          Premium digital products — browse the catalog, add to cart, and check out in a
          sleek dark storefront.
          {source === "api"
            ? " Showing live catalog data."
            : " Using sample data until the API URL is configured."}
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/catalog">
            Browse catalog
          </Link>
          <Link className="btn btn-ghost" href="/signup">
            Create account
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
