"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "@/lib/cart";
import { buildTelegramLink, buildWhatsAppLink } from "@/lib/config";

function buildOrderMessage(
  lines: { product: { name: string; sellPrice: number }; quantity: number }[],
  total: number,
): string {
  const itemLines = lines.map(
    (l) => `• ${l.product.name} × ${l.quantity} — ${(l.product.sellPrice * l.quantity).toFixed(2)} USDT`,
  );
  return [
    "Hi! I'd like to order:",
    "",
    ...itemLines,
    "",
    `Total: ${total.toFixed(2)} USDT`,
  ].join("\n");
}

export default function CartPage() {
  const { lines, totalUsdt, setQuantity, remove, clear } = useCart();

  const message = useMemo(() => buildOrderMessage(lines, totalUsdt), [lines, totalUsdt]);
  const whatsappHref = buildWhatsAppLink(message);
  const telegramHref = buildTelegramLink(message);
  const canCheckout = Boolean(whatsappHref || telegramHref);

  return (
    <section className="section" style={{ marginTop: 20 }}>
      <div className="panel">
        <h1>Cart</h1>
        <p className="notice">
          Cart is stored in this browser only. Checkout sends your order details to us via
          WhatsApp/Telegram — we&rsquo;ll confirm payment and delivery there.
        </p>

        {!lines.length ? (
          <div className="empty">
            <p>Your cart is empty.</p>
            <Link className="btn btn-primary" href="/catalog">
              Browse catalog
            </Link>
          </div>
        ) : (
          <div className="stack">
            {lines.map((line) => (
              <div className="cart-line" key={line.product.sku}>
                <div style={{ display: "flex", gap: 12 }}>
                  {line.product.imageUrl ? (
                    <Image
                      src={line.product.imageUrl}
                      alt={line.product.name}
                      width={48}
                      height={48}
                      className="cart-line-thumb"
                    />
                  ) : (
                    <span className="cart-line-emoji" aria-hidden>
                      {line.product.emoji}
                    </span>
                  )}
                  <div>
                    <strong>{line.product.name}</strong>
                    <div className="muted">
                      {line.product.sellPrice.toFixed(2)} USDT each
                    </div>
                    <div className="qty-row" style={{ marginTop: 8 }}>
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          setQuantity(line.product.sku, line.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span>{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() =>
                          setQuantity(line.product.sku, line.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost"
                        style={{ minHeight: 34, padding: "0 10px" }}
                        onClick={() => remove(line.product.sku)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="price">
                  {(line.product.sellPrice * line.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <strong>Total</strong>
              <span className="price">{totalUsdt.toFixed(2)} USDT</span>
            </div>

            {canCheckout ? (
              <div className="stack" style={{ gap: 8 }}>
                {whatsappHref ? (
                  <a
                    className="btn btn-primary btn-block"
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Checkout via WhatsApp
                  </a>
                ) : null}
                {telegramHref ? (
                  <a
                    className="btn btn-primary btn-block"
                    href={telegramHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Checkout via Telegram
                  </a>
                ) : null}
              </div>
            ) : (
              <button type="button" className="btn btn-primary btn-block" disabled>
                Checkout unavailable — contact support
              </button>
            )}
            <button type="button" className="btn btn-ghost btn-block" onClick={clear}>
              Clear cart
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
