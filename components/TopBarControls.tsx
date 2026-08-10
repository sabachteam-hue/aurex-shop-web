"use client";

import { useEffect, useRef, useState } from "react";

const CURRENCIES = [
  { code: "USD", label: "USD ($)" },
  { code: "PKR", label: "PKR (Rs.)" },
  { code: "EUR", label: "EUR (€)" },
  { code: "GBP", label: "GBP (£)" },
  { code: "INR", label: "INR (₹)" },
];

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "hi", label: "हिंदी", flag: "🇮🇳" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

function useOutsideClose(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);
  return ref;
}

function CurrencyMenu() {
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const ref = useOutsideClose(() => setOpen(false));

  return (
    <div className="dropdown" ref={ref}>
      <button
        type="button"
        className="dropdown-trigger currency-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span aria-hidden>💵</span>
        {currency.label}
        <span className="chevron" aria-hidden>▾</span>
      </button>
      {open ? (
        <div className="dropdown-panel" role="listbox">
          {CURRENCIES.map((c) => (
            <button
              type="button"
              key={c.code}
              className={`dropdown-item${c.code === currency.code ? " active" : ""}`}
              onClick={() => {
                setCurrency(c);
                setOpen(false);
              }}
              role="option"
              aria-selected={c.code === currency.code}
            >
              {c.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(LANGUAGES[0]);
  const ref = useOutsideClose(() => setOpen(false));

  return (
    <div className="dropdown" ref={ref}>
      <button
        type="button"
        className="dropdown-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span aria-hidden>{lang.flag}</span>
        {lang.label}
        <span className="chevron" aria-hidden>▾</span>
      </button>
      {open ? (
        <div className="dropdown-panel" role="listbox">
          {LANGUAGES.map((l) => (
            <button
              type="button"
              key={l.code}
              className={`dropdown-item${l.code === lang.code ? " active" : ""}`}
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
              role="option"
              aria-selected={l.code === lang.code}
            >
              <span aria-hidden>{l.flag}</span> {l.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("theme-light", light);
  }, [light]);

  return (
    <button
      type="button"
      className="icon-btn theme-toggle"
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      onClick={() => setLight((v) => !v)}
    >
      {light ? "☀️" : "🌙"}
    </button>
  );
}

export function TopBarControls() {
  return (
    <div className="topbar-controls">
      <CurrencyMenu />
      <LanguageMenu />
      <ThemeToggle />
      <span className="pill-badge trusted-badge">
        <span aria-hidden>🛡️</span> Trusted
      </span>
    </div>
  );
}
