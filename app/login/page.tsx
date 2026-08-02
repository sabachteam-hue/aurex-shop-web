"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(
      "Login UI only — website auth API is not connected in Phase 1.",
    );
  }

  return (
    <section className="section" style={{ marginTop: 20 }}>
      <div className="panel" style={{ maxWidth: 460, margin: "0 auto" }}>
        <h1>Log in</h1>
        <p className="muted">
          Website accounts will connect to the staging API in Phase 2. Telegram Mini
          App auth will use initData separately.
        </p>
        {message ? <p className="notice">{message}</p> : null}
        <form className="form-grid" onSubmit={onSubmit}>
          <label>
            Email
            <input type="email" name="email" required placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" name="password" required placeholder="••••••••" />
          </label>
          <button type="submit" className="btn btn-primary btn-block">
            Log in
          </button>
        </form>
        <p className="muted" style={{ marginTop: 16 }}>
          No account? <Link href="/signup">Sign up</Link>
        </p>
      </div>
    </section>
  );
}
