const STEPS = [
  {
    title: "Select",
    body: "Browse the catalog and add the products or services you need to your cart.",
  },
  {
    title: "Pay",
    body: "Check out securely — no account required for a WhatsApp/Telegram order.",
  },
  {
    title: "Get access",
    body: "Receive your product or access details as soon as your order is confirmed.",
  },
];

export function HowItWorks() {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <h2>How it works</h2>
          <p>From browsing to delivery in three steps</p>
        </div>
      </div>
      <div className="how-it-works-grid">
        {STEPS.map((step, i) => (
          <div className="panel how-it-works-card" key={step.title}>
            <div className="how-it-works-step">{i + 1}</div>
            <h3>{step.title}</h3>
            <p className="muted">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
