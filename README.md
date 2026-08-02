# AurexBot Web (storefront + Telegram Mini App)

Isolated Next.js frontend. Phase 2A connects the **read-only product catalog** to FastAPI `/api/web/*`.

## Requirements

- Node.js 20+
- npm 10+

## Local setup

```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Staging FastAPI base URL (no trailing slash). Empty = mock catalog. |

Backend CORS must allow your Vercel / localhost origin via `CORS_ORIGINS` on the API host.

Do **not** point this at the production Railway API until staging tests pass and you explicitly approve.

### Catalog API (Phase 2A)

- `GET /api/web/categories`
- `GET /api/web/products?category_id=&q=`
- `GET /api/web/products/{sku}`

No login, checkout, wallet, or payments in this phase.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Serve production build |

## Structure

- `app/` — routes (home, catalog, product, cart, auth, dashboard)
- `components/` — header, menu, search, product UI, shell
- `lib/api.ts` — API client stub (no live calls yet)
- `lib/mock-data.ts` — sample catalog for UI development
- `lib/cart.tsx` — client-side cart state

## Telegram Mini App

Layout uses a mobile-first shell with safe-area padding so the same UI can load inside Telegram WebView later. Mini App auth is **not** wired in Phase 1.

## Safety

This folder is additive. It does not change the Telegram bot, admin panel, PayFast, or Railway startup.
