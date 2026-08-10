"use client";

import Link from "next/link";
import { FadeIn } from "@/components/Motion";
import { PriceTickerCard } from "@/components/PriceTickerCard";
import { TELEGRAM_USERNAME, WHATSAPP_NUMBER } from "@/lib/config";
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
    <section className="marketing-hero">
      <FadeIn>
        <span className="marketing-eyebrow">Premium Digital Marketplace</span>
        <h1 className="marketing-heading">
          Unlock Premium Access.
          <br />
          <span className="grad">Intelligence Without Limits.</span>
        </h1>
        <p>
          AI tools, SaaS subscriptions and premium accounts at unbeatable prices.
          {source === "api"
            ? " Showing live catalog data."
            : " Using sample data until the API URL is configured."}{" "}
          Secure checkout, with warranty terms shown on every listing.
        </p>
        <div className="marketing-actions">
          <Link className="btn btn-primary" href="/catalog">
            Explore Products →
          </Link>
          {contactHref ? (
            <a className="btn btn-whatsapp" href={contactHref} target="_blank" rel="noreferrer">
              <span aria-hidden>💬</span> WhatsApp Order
            </a>
          ) : null}
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

      <FadeIn delay={0.1}>
        <PriceTickerCard />
      </FadeIn>
    </section>
  );
}
