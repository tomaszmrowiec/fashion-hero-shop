# FashionHero Shop

Educational e-commerce starter built for the **AI Product Heroes** workshops. Inspired by Allbirds design patterns — clean, sustainable, mobile-first. Students use this as a base to learn product development with AI tools.

## Tech Stack

- **Next.js 16** — App Router, React 19, TypeScript strict
- **Tailwind CSS v4** — oklch design tokens, custom color palette
- **shadcn/ui** — Radix primitives
- **Lucide React** — icons

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run lint
```

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero carousel, category rows, product carousels |
| `/collections/[slug]` | Product listing with sidebar filters (category, seller) |
| `/products/[slug]` | Product detail — gallery, color/size picker, add to cart |
| `/checkout` | **Version A** — standard checkout (shipping form + order summary) |
| `/checkout/bpf` | **Version B** — same as A + Buyer Protection Fee (2.5%) A/B test |
| `/potwierdzenie` | Order confirmation (Polish) |
| `/wishlist` | Saved items |
| `/about` | About page |

## A/B Checkout Test

The shop includes a behavioral A/B test for a **Buyer Protection Fee (Ochrona zakupu)**:

- **Version A** `/checkout` — standard order summary (subtotal + shipping + total)
- **Version B** `/checkout/bpf` — adds a highlighted 2.5% protection fee line with shield icon and one-line benefit description

**Routing:** When a user clicks CHECKOUT in the cart drawer, they are randomly assigned to Version A or B (50/50, stored in `localStorage("ab_checkout")`). The assignment is stable per session.

**Emergency override:** Both checkout pages show a floating `🧪 Wersja A/B` badge (bottom-right corner). Click it to manually switch between variants — useful for demos and testing.

**Demo mode:** Visiting `/checkout/bpf` with an empty cart shows a sample order (dress, 189 PLN + 12 PLN shipping + 4.73 PLN BPF = 205.73 PLN) so the feature is immediately visible from a shared link.

### Price calculation (Version B)

```
subtotal = sum(item.price × qty)
shipping = subtotal >= 299 ? 0 : 19.90
bpf      = subtotal × 0.025
total    = subtotal + shipping + bpf
```

## Key Components

| File | Purpose |
|------|---------|
| `src/components/cart-provider.tsx` | Cart state — items, add/remove, open/close |
| `src/components/cart-drawer.tsx` | Slide-out cart with A/B routing on CHECKOUT |
| `src/components/ab-badge.tsx` | Floating A/B variant switcher badge |
| `src/components/shell.tsx` | Global layout — header, footer, providers; minimal mode for `/potwierdzenie` |
| `src/data/products.ts` | Hardcoded product catalog (swap for real API) |
| `src/types/index.ts` | `Product`, `CartItem`, `ProductColor` interfaces |

## Design Tokens

Warm, natural palette defined in `src/app/globals.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-charcoal` | `#212121` | Primary text, buttons |
| `--color-cream` | `#ece9e2` | Page background |
| `--color-cream-light` | `#f5f4f1` | Section backgrounds |
| `--color-warm-gray` | `#6b6b6b` | Secondary text |
| `--color-muted` | `#e0dad0` | Borders, highlights |

## Data

Products are hardcoded in `src/data/products.ts`. Each product has:
- Name, slug, price (PLN), category, collections
- Multiple color variants (with optional product images)
- Size array, rating, seller ID
- Badge (`new`, `bestseller`, `sale`)

To connect a real backend, replace `getProduct()` / `getProductsByCollection()` in `src/data/products.ts` with API calls.

## Workshop Context

Built as part of **Wojtek's AI Product Heroes** program. The BPF checkout is an example of a behavioral test feature: build the hypothesis → ship the variant → measure whether users accept the fee or abandon.
