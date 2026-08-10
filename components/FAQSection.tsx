const FAQS = [
  {
    q: "How fast is delivery?",
    a: "Most digital products are delivered instantly or within a few minutes of order confirmation. Some listings may take longer — check the product page for details.",
  },
  {
    q: "What's the warranty policy?",
    a: "Warranty length is shown on each product page. If an item stops working within that window, contact support and we'll replace or refund it.",
  },
  {
    q: "What payment methods are accepted?",
    a: "Checkout currently goes through WhatsApp/Telegram, where our team will confirm the payment method available in your region.",
  },
];

export function FAQSection() {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <h2>FAQ</h2>
          <p>Answers to common questions</p>
        </div>
      </div>
      <div className="faq-list">
        {FAQS.map((item) => (
          <details className="panel faq-item" key={item.q}>
            <summary>{item.q}</summary>
            <p className="muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
