"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="shell">
        <Header />
        <main className="container">{children}</main>
        <Footer />
        <ChatWidget />
      </div>
    </CartProvider>
  );
}
