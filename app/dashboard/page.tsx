import Link from "next/link";

const mockOrders = [
  {
    code: "SMM-DEMO01",
    product: "Canva Pro 3 Years",
    amount: 0.4,
    status: "completed",
  },
  {
    code: "SMM-DEMO02",
    product: "Gemini 18M Links",
    amount: 2.5,
    status: "processing",
  },
];

export default function DashboardPage() {
  return (
    <section className="section" style={{ marginTop: 20 }}>
      <div className="stack">
        <div className="panel">
          <h1>Dashboard</h1>
          <p className="notice">
            Elegant dark dashboard preview. Wallet, orders, and reseller pricing will
            load from the staging API in a later phase.
          </p>
          <div className="stat-row">
            <div className="stat">
              <span className="muted">Wallet</span>
              <strong>12.50 USDT</strong>
            </div>
            <div className="stat">
              <span className="muted">Orders</span>
              <strong>2</strong>
            </div>
            <div className="stat">
              <span className="muted">Reseller tier</span>
              <strong>Standard</strong>
            </div>
            <div className="stat">
              <span className="muted">Coupons</span>
              <strong>0</strong>
            </div>
          </div>
        </div>

        <div className="panel">
          <h2>Order history</h2>
          <div className="stack">
            {mockOrders.map((order) => (
              <div className="cart-line" key={order.code}>
                <div>
                  <strong>{order.code}</strong>
                  <div className="muted">{order.product}</div>
                  <div className="muted">Status: {order.status}</div>
                </div>
                <div className="price">{order.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="hero-actions" style={{ marginTop: 16 }}>
            <Link className="btn btn-primary" href="/catalog">
              Shop again
            </Link>
            <Link className="btn btn-ghost" href="/login">
              Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
