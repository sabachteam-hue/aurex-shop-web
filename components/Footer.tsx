import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { BRAND_NAME } from "@/lib/mock-data";
import { TELEGRAM_USERNAME, WHATSAPP_NUMBER } from "@/lib/config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand" style={{ marginBottom: 8 }}>
            <BrandLogo size={30} />
            {BRAND_NAME}
          </div>
          <p className="muted" style={{ maxWidth: "32ch" }}>
            Premium digital products, delivered fast, with real support behind every order.
          </p>
        </div>

        <div className="footer-links">
          <span className="footer-links-title">Shop</span>
          <Link href="/catalog">Catalog</Link>
          <Link href="/cart">Cart</Link>
        </div>

        <div className="footer-links">
          <span className="footer-links-title">Support</span>
          {WHATSAPP_NUMBER ? (
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          ) : null}
          {TELEGRAM_USERNAME ? (
            <a href={`https://t.me/${TELEGRAM_USERNAME}`} target="_blank" rel="noreferrer">
              Telegram
            </a>
          ) : null}
          {!WHATSAPP_NUMBER && !TELEGRAM_USERNAME ? (
            <span className="muted">Contact links coming soon</span>
          ) : null}
        </div>
      </div>
      <div className="container footer-bottom">
        <span className="muted">© {year} {BRAND_NAME}. All rights reserved.</span>
      </div>
    </footer>
  );
}
