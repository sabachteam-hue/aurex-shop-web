"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { MobileMenu } from "@/components/MobileMenu";
import { TopBarControls } from "@/components/TopBarControls";
import { useCart } from "@/lib/cart";
import { BRAND_NAME } from "@/lib/mock-data";

export function Header() {
  const { count } = useCart();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/catalog?q=${encodeURIComponent(q)}` : "/catalog");
  }

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span className="topbar-spacer" />
          <TopBarControls />
        </div>
      </div>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label={`${BRAND_NAME} home`}>
            <BrandLogo size={36} />
            SMF <span>Shop</span>
          </Link>

          <nav className="nav-desktop" aria-label="Primary">
            <Link href="/catalog">Tools</Link>
            <Link href="/catalog">Use Cases</Link>
            <Link href="/catalog">Gifts 🔥</Link>
          </nav>

          <form className="header-search" onSubmit={submitSearch} role="search">
            <span className="header-search-icon" aria-hidden>🔍</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools…"
              aria-label="Search tools"
            />
          </form>

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
