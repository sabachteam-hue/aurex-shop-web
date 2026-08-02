"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function SignupPage() {
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(
      "Signup UI only — no user is created until the staging auth API exists.",
    );
  }

  return (
    <section className="section" style={{ marginTop: 20 }}>
      <div className="panel" style={{ maxWidth: 460, margin: "0 auto" }}>
        <h1>Sign up</h1>
        <p className="muted">
          Create a website account later against staging. Existing Telegram customers
          will be able to link accounts in a later phase.
        </p>
        {message ? <p className="notice">{message}</p> : null}
        <form className="form-grid" onSubmit={onSubmit}>
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" name="email" required placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              minLength={8}
              placeholder="At least 8 characters"
            />
          </label>
          <button type="submit" className="btn btn-primary btn-block">
            Create account
          </button>
        </form>
        <p className="muted" style={{ marginTop: 16 }}>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
    </section>
  );
}
