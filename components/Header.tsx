"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileMenu } from "@/components/MobileMenu";
import { useCart } from "@/lib/cart";
import { BRAND_NAME } from "@/lib/mock-data";

export function Header() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label={`${BRAND_NAME} home`}>
            <BrandLogo size={36} />
            SMF <span>Shop</span>
          </Link>

          <nav className="nav-desktop" aria-label="Primary">
            <Link href="/catalog">Catalog</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login">Log in</Link>
          </nav>

          <div className="header-actions">
            <Link href="/cart" className="icon-btn cart-btn" aria-label="Cart">
              🛒
              {count > 0 ? <span className="badge">{count}</span> : null}
            </Link>
            <button
              type="button"
              className="icon-btn menu-toggle"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
