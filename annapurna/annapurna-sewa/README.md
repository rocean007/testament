# Annapurna Sewa — TypeScript React + Node.js

Work Permit Renewal & Flight Ticket Booking service. Converted from a single HTML file into a typed, modular React + Express project.

## Project Structure

```
annapurna-sewa/
├── index.html                  # Vite entry point (SEO meta, fonts, FA icons, JSON-LD)
├── vite.config.ts              # Vite config (dev proxy → Express on :4000)
├── tsconfig.json               # React/browser TypeScript config
├── tsconfig.node.json          # Node/Vite TypeScript config
├── package.json
│
├── src/
│   ├── main.tsx                # ReactDOM.createRoot entry
│   ├── styles.css              # All CSS from original HTML (unchanged)
│   ├── App.tsx                 # Root component — wires all state & children
│   │
│   ├── types/
│   │   └── index.ts            # Airport, Country, FlightFormData, FeeResult
│   │
│   ├── data/
│   │   └── index.ts            # AIRPORTS[], COUNTRIES[], FEE_STRUCTURE, WHATSAPP_NUMBER
│   │
│   ├── utils/
│   │   └── index.ts            # debounce, throttle, openWhatsApp, searchAirports,
│   │                           #   isValidAirport, sanitizeInput, calculateAgeFromDate
│   │
│   ├── hooks/
│   │   └── index.ts            # useScrollProgress, useInView, useNotification,
│   │                           #   useRateLimiter, useAirportSearch
│   │
│   └── components/
│       ├── App.tsx             # Root — orchestrates modals, notifications, rate limits
│       ├── Header.tsx          # Sticky header, scroll-aware background
│       ├── NoticeBar.tsx       # Collapsible सूचना bar
│       ├── CountryMarquee.tsx  # Animated country flag scroll
│       ├── Calculator.tsx      # Fee calculator popup (age / birthdate tabs)
│       ├── AirportInput.tsx    # Reusable autocomplete airport field
│       ├── FlightModal.tsx     # Full flight booking modal + validation
│       ├── ServiceCards.tsx    # Work permit + flight booking cards
│       ├── FaqSection.tsx      # Category FAQ + inline card FAQs
│       ├── StatsSection.tsx    # Animated counter stats with IntersectionObserver
│       ├── Footer.tsx          # Footer + floating WhatsApp button
│       ├── WelcomeAnimation.tsx# Plane intro animation (desktop only)
│       └── Notification.tsx    # Toast notification component
│
├── server/
│   ├── index.ts                # Express server (API + static serving in production)
│   └── tsconfig.json           # Server-specific TS config (CommonJS output)
│
└── public/
    └── assets/                 # Copy your original assets here:
        ├── aspl.jpg            #   Logo image
        ├── favicon.png         #   Favicon
        ├── image.png           #   Plane image (welcome animation)
        └── that.webp           #   Background image
```

## Setup

```bash
# Install dependencies
npm install

# Copy your assets into public/assets/
cp /path/to/original/assets/* public/assets/

# Development (Vite on :3000, proxies /api → Express on :4000)
npm run dev          # React frontend
npm run server       # Express backend (separate terminal)

# Production build
npm run build        # Compiles React → dist/
npm start            # Serves dist/ + API from Express
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/fee?age=35` | Work permit fee lookup by age |
| POST | `/api/contact` | Contact/inquiry submission |

## What Changed From Original HTML

| Original | TypeScript Version |
|----------|--------------------|
| Single 2500-line HTML file | 15 focused components |
| Country marquee initialized **twice** (duplicate code) | Single `CountryMarquee` component |
| Airport search scattered across 4 event listeners | `useAirportSearch` hook |
| Rate limiter state in a plain object | `useRateLimiter` hook |
| Scroll progress + header state in 2 separate listeners | `useScrollProgress` hook |
| All 37 airports inline in script tag | `src/data/index.ts` |
| Fee structure hardcoded in 2 functions | `FEE_STRUCTURE` constant |
| Notification show/hide with raw DOM | `useNotification` hook + `<Notification />` |
| Stats counter duplicated scroll logic | `useCountUp` hook inside `StatsSection` |
| WhatsApp URL builder repeated 3× | Single `openWhatsApp()` utility |
| Input sanitizer duplicated | Single `sanitizeInput()` utility |
