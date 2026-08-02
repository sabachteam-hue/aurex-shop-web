"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/types";

export type CartLine = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  totalUsdt: number;
  add: (product: Product, quantity?: number) => void;
  setQuantity: (sku: string, quantity: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "smf-web-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const totalUsdt = lines.reduce(
      (sum, line) => sum + line.product.sellPrice * line.quantity,
      0,
    );

    return {
      lines,
      count,
      totalUsdt,
      add(product, quantity = 1) {
        setLines((prev) => {
          const existing = prev.find((l) => l.product.sku === product.sku);
          if (existing) {
            return prev.map((l) =>
              l.product.sku === product.sku
                ? { ...l, quantity: l.quantity + quantity }
                : l,
            );
          }
          return [...prev, { product, quantity }];
        });
      },
      setQuantity(sku, quantity) {
        setLines((prev) =>
          prev
            .map((l) =>
              l.product.sku === sku ? { ...l, quantity: Math.max(0, quantity) } : l,
            )
            .filter((l) => l.quantity > 0),
        );
      },
      remove(sku) {
        setLines((prev) => prev.filter((l) => l.product.sku !== sku));
      },
      clear() {
        setLines([]);
      },
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
