# Annapurna Sewa

Marketing site for **Annapurna Sewa**, a Kathmandu-based agency helping Nepali migrant workers renew their work permit (*Shram Swikriti*) and book international flight tickets.

Bilingual (English / Nepali), fully responsive, and built as a real Next.js app rather than a static template — every interactive piece (fee calculator, flight booking, FAQ) is a working component backed by typed data, not a mock.

## Features

- **Shram Swikriti fee calculator** — floating widget, calculates the work-permit renewal fee by age or birthdate, tiered by DoFE's official fee schedule.
- **Flight booking flow** — airport autocomplete (keyboard-accessible combobox) over 34 airports, date/passenger/trip-type validation, submits as a pre-filled WhatsApp message (this is a lead-gen funnel, not a live booking engine).
- **Bilingual content** — Nepali (Devanagari) and English content throughout, self-hosted fonts via `next/font`.
- **Accessible by default** — every interactive primitive (modals, tabs, accordions, combobox) is built on [React Aria Components](https://react-spectrum.adobe.com/react-aria/), giving correct focus-trapping, `Escape`-to-close, and ARIA wiring for free.
- **SEO** — full Open Graph/Twitter metadata, JSON-LD (`LocalBusiness`, `FAQPage`, `WebSite`) generated from the same typed data that drives the UI (so the fee schedule can never drift out of sync between the calculator and the structured data), `app/sitemap.ts` / `app/robots.ts`.
- **Respects `prefers-reduced-motion`** everywhere motion is used (scroll-reveal, count-up stats, marquee).

## Stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) (CSS-first `@theme`) |
| Accessible primitives | [react-aria-components](https://react-spectrum.adobe.com/react-aria/) |
| Validation | [Zod](https://zod.dev) |
| Icons | [lucide-react](https://lucide.dev) |
| Testing | [Vitest](https://vitest.dev) |
| Hosting | [Vercel](https://vercel.com) |

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start       # serve the production build
npm run lint         # eslint
npm run typecheck   # tsc --noEmit
npm run test          # vitest
```

## Project structure

```
app/                  # App Router: layout, page, metadata, sitemap.ts, robots.ts
components/
  layout/              # Header, floating WhatsApp button, fixed background
  notice/               # Collapsible सूचना notice bar
  calculator/            # Fee calculator widget
  marquee/                 # Destination countries marquee
  hero/, stats/, team/     # Homepage sections
  services/                 # Service cards + mini-FAQ
  faq/                       # Main tabbed FAQ section
  booking/                     # Flight booking modal + airport autocomplete
  policy/, footer/, welcome/     # Return policy, footer, splash overlay
  ui/                              # Shared primitives: Tabs, Disclosure (accordion),
                                    # Toast, Reveal (scroll-in), icons
lib/                   # Pure data + logic — no DOM, all unit-testable
  constants.ts          # Single source of truth for phone/WhatsApp/address/email
  fees.ts                 # Fee schedule + age calculation (drives calculator + JSON-LD)
  airports.ts               # Airport dataset + search
  content.ts                  # Static site copy (hero, services, team, stats, policy)
  faq-data.ts                   # FAQ content, including calculator-derived JSON-LD answers
  seo.ts                          # JSON-LD builder
  whatsapp.ts                       # wa.me URL builder
public/                # Static assets (logo, plane, background image)
```

## A note on content

All business content — Nepali/English copy, fee amounts, FAQ answers, contact details, opening hours — is transcribed verbatim from the business's existing material. `lib/constants.ts` and `lib/fees.ts` are the single source of truth for anything that appears in more than one place (phone number, WhatsApp number, fee schedule), specifically so those can't drift out of sync the way they did before this rewrite.

## Deployment

Deploys to [Vercel](https://vercel.com) with zero configuration — it auto-detects the Next.js App Router project. Push to the connected Git branch, or run:

```bash
npx vercel
```
