const TICKER_ITEMS = [
  { icon: "⚡", name: "SuperGrok", price: "$7.19", tag: "LIVE", tagClass: "live" },
  { icon: "🤖", name: "ChatGPT Plus", price: "$4.00", tag: "HOT", tagClass: "hot" },
  { icon: "🎵", name: "Spotify Premium", price: "$11.00", tag: "NEW", tagClass: "new" },
];

export function PriceTickerCard() {
  return (
    <div className="ticker-card" aria-label="Live prices">
      {TICKER_ITEMS.map((item) => (
        <div className="ticker-row" key={item.name}>
          <div className="ticker-icon" aria-hidden>
            {item.icon}
          </div>
          <div className="ticker-info">
            <strong>{item.name}</strong>
            <div className="price">{item.price}</div>
          </div>
          <span className={`ticker-tag ${item.tagClass}`}>{item.tag}</span>
        </div>
      ))}
      <div className="ticker-meta-row">
        <div className="ticker-meta">
          <strong>Tracked Delivery</strong>
          <span className="ok">✓ Active</span>
        </div>
        <div className="ticker-meta">
          <strong>Warranty</strong>
          <span className="ok">✓ As listed</span>
        </div>
      </div>
    </div>
  );
}
