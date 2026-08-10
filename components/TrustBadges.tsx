const BADGES = [
  { icon: "📦", label: "Tracked Delivery" },
  { icon: "🛡️", label: "Secure Checkout" },
  { icon: "✅", label: "Warranty Shown" },
  { icon: "🎧", label: "24/7 Support" },
];

export function TrustBadges() {
  return (
    <div className="trust-badges" role="list" aria-label="Why shop with us">
      {BADGES.map((b) => (
        <span className="pill-badge trust-badge" role="listitem" key={b.label}>
          <span aria-hidden>{b.icon}</span> {b.label}
        </span>
      ))}
    </div>
  );
}
