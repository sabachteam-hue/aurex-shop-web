"use client";

import { useEffect, useState } from "react";

function getMsUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

function splitTime(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return {
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
  };
}

export function FlashDealsBar() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    setRemaining(getMsUntilMidnight());
    const interval = setInterval(() => {
      setRemaining((prev) => (prev == null ? getMsUntilMidnight() : prev - 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const time = splitTime(remaining ?? 0);

  return (
    <div className="flash-bar" role="status" aria-label="Flash deals countdown">
      <span className="flash-bar-label">
        <span aria-hidden>🔥</span> FLASH DEALS — Limited Time Offers
      </span>
      <div className="flash-bar-timer" aria-hidden={remaining == null}>
        <div className="flash-bar-unit">
          <strong>{time.h}</strong>
          <span>H</span>
        </div>
        <span className="flash-bar-sep">:</span>
        <div className="flash-bar-unit">
          <strong>{time.m}</strong>
          <span>M</span>
        </div>
        <span className="flash-bar-sep">:</span>
        <div className="flash-bar-unit">
          <strong>{time.s}</strong>
          <span>S</span>
        </div>
      </div>
      <span aria-hidden>🔥</span>
    </div>
  );
}
