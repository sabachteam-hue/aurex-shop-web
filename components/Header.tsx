"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileMenu } from "@/components/MobileMenu";
import { useCart } from "@/lib/cart";
import { BRAND_NAME } from "@/lib/mock-data";

export function Header() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label={`${BRAND_NAME} home`}>
            <BrandLogo size={36} />
            SMF <span>Shop</span>
          </Link>

          <nav className="nav-desktop" aria-label="Primary">
            <Link href="/catalog">Catalog</Link>
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
