import type { Metadata, Viewport } from "next";
import { Figtree, Syne } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { BRAND_NAME } from "@/lib/mock-data";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: BRAND_NAME,
    template: `%s · ${BRAND_NAME}`,
  },
  description: "SMF Shop — premium digital products storefront and Telegram Mini App.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#09051A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${figtree.variable}`}>
      <body
        style={
          {
            ["--font-display" as string]: "var(--font-display-loaded), Syne, sans-serif",
            ["--font-body" as string]: "var(--font-body-loaded), Figtree, sans-serif",
          } as React.CSSProperties
        }
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
