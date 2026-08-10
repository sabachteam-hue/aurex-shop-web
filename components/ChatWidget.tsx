"use client";

import { useState } from "react";
import { TELEGRAM_USERNAME, WHATSAPP_NUMBER } from "@/lib/config";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const contactHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}`
    : TELEGRAM_USERNAME
      ? `https://t.me/${TELEGRAM_USERNAME}`
      : null;

  return (
    <>
      {open ? (
        <div className="chat-widget-panel" role="dialog" aria-label="SMF Shop assistant">
          <div className="chat-widget-header">
            <span>🤖 SMF Assistant</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>
          <div className="chat-widget-body">
            Hi! Ask me about any product, delivery time, or warranty — or message us
            directly for a quicker reply.
            {contactHref ? (
              <a className="btn btn-primary btn-block" href={contactHref} target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
      <button
        type="button"
        className="chat-widget-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open assistant"}
      >
        {open ? "✕" : "💬"}
      </button>
    </>
  );
}
