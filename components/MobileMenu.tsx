"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  return (
    <div
      className={`mobile-menu${open ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      onClick={onClose}
    >
      <div className="mobile-panel" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <BrandLogo size={32} />
          <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
            SMF Shop
          </strong>
        </div>
        <Link href="/" onClick={onClose}>
          Home
        </Link>
        <Link href="/catalog" onClick={onClose}>
          Catalog
        </Link>
        <Link href="/cart" onClick={onClose}>
          Cart
        </Link>
        <button type="button" className="linkish" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
