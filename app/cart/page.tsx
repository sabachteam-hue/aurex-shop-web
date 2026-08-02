"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { lines, totalUsdt, setQuantity, remove, clear } = useCart();

  return (
    <section className="section" style={{ marginTop: 20 }}>
      <div className="panel">
        <h1>Cart</h1>
        <p className="notice">
          Cart is stored in this browser only. Checkout API is not connected in Phase 1.
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
                <div>
                  <strong>
                    {line.product.emoji} {line.product.name}
                  </strong>
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

            <button type="button" className="btn btn-primary btn-block" disabled>
              Checkout (coming in Phase 2)
            </button>
            <button type="button" className="btn btn-ghost btn-block" onClick={clear}>
              Clear cart
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
