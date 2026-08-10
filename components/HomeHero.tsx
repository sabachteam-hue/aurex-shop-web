"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { FadeIn } from "@/components/Motion";
import { TELEGRAM_USERNAME, WHATSAPP_NUMBER } from "@/lib/config";
import { BRAND_NAME } from "@/lib/mock-data";
import type { ShopStats } from "@/lib/types";

type Props = {
  source: "api" | "mock";
  stats?: ShopStats | null;
};

export function HomeHero({ source, stats }: Props) {
  const contactHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}`
    : TELEGRAM_USERNAME
      ? `https://t.me/${TELEGRAM_USERNAME}`
      : null;

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
          {contactHref ? (
            <a className="btn btn-ghost" href={contactHref} target="_blank" rel="noreferrer">
              Chat with us
            </a>
          ) : (
            <Link className="btn btn-ghost" href="/catalog">
              View all products
            </Link>
          )}
        </div>

        {stats ? (
          <div className="hero-stats">
            <div className="hero-stat">
              <strong>{stats.customers.toLocaleString()}</strong>
              <span className="muted">Customers served</span>
            </div>
            <div className="hero-stat">
              <strong>{stats.ordersCompleted.toLocaleString()}</strong>
              <span className="muted">Orders completed</span>
            </div>
          </div>
        ) : null}
      </FadeIn>
    </section>
  );
}
