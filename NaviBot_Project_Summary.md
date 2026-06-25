# NaviBot Web Development Project — Full Summary

## Overview

NaviBot is a pre-seed German robotics startup building autonomous 6-wheel sidewalk delivery robots for supermarket chains. The website at **navibot.de** is the company's public-facing landing page — its primary purpose is to convert two types of visitors: supermarket chain decision-makers who might run a pilot, and investors who might fund the pre-seed round. It was built from scratch using **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**, and is hosted under the domain `navibot.de`, based in Dresden with a Munich 2026 pilot launch target.

---

## Project Background

The project originated as a marketing and outreach website for the NaviBot startup concept — autonomous grocery delivery robots for German cities, competing in the same space as Starship Technologies and Serve Robotics but targeting the German supermarket market (Edeka, Rewe, Penny, Netto, Kaufland). The website was first drafted in standard HTML/CSS/JS and was later converted entirely to a **Next.js** app with a proper component structure, TypeScript, and Framer Motion animations, all within a single Claude Code session.

The founder — Sagar Katariya, based in Dresden — is building this solo at the pre-seed stage while simultaneously conducting hardware research for the actual robot (the CAD design sessions in the project workspace). The website needed to look credible and professional enough to approach German supermarket chains and attract angel/VC investment, while truthfully representing early-stage status (Gen 1 prototype under development).

---

## Technology Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` syntax) |
| Animations | Framer Motion 12 |
| Fonts | Space Grotesk (headings), Inter (body) via `next/font/google` |
| API | Next.js Route Handler (`/api/contact`) |
| Email (planned) | Resend / SendGrid (not yet wired; console.log stub in place) |
| Deployment target | navibot.de |

The project structure is a standard Next.js App Router setup:

```
navibot/
├── src/
│   ├── app/
│   │   ├── layout.tsx       ← root layout, fonts, metadata, ScrollProgress
│   │   ├── page.tsx         ← page composition (assembles all sections)
│   │   ├── globals.css      ← Tailwind + custom CSS variables + animations
│   │   └── api/contact/
│   │       └── route.ts     ← POST handler for the contact form
│   └── components/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── HowItWorks.tsx
│       ├── WhyNavibot.tsx
│       ├── Technology.tsx
│       ├── Stats.tsx
│       ├── Team.tsx
│       ├── Testimonials.tsx
│       ├── CtaStrip.tsx
│       ├── PressStrip.tsx
│       ├── Contact.tsx
│       ├── Footer.tsx
│       └── ScrollProgress.tsx
```

---

## Design System

The site uses a **blue-dominant light theme** with section-by-section accent color variety to prevent visual monotony across the long single-page layout. Each section has its own background color and accent:

| Section | Background | Accent |
|---|---|---|
| Hero | `#F0F6FF` (blue-50 gradient) | Blue (`#2563EB`) |
| How It Works | `#F5F3FF` (violet-50) | Violet |
| Why Navibot | `#FFF7ED` (orange-50) | Orange |
| Technology | `#ECFDF5` (emerald-50) | Emerald |
| Stats | White | Blue-to-violet gradient |
| Team | `#FFF1F2` (rose-50) | Rose |
| CTA Strip | Blue-to-violet-to-purple gradient | White text |
| Contact | `#EFF6FF` (blue-50) | Blue |
| Footer | White | Blue |

Custom CSS variables in `globals.css` define the color palette (`--color-navy`, `--color-amber`, etc.), plus three custom animations: `float` (robot hover), `glow-pulse` (status LED), and `status-ping` (live delivery indicator). A `.map-grid` utility class creates a subtle city-map grid overlay in the hero. A `scroll-progress` fixed bar at the top tracks page scroll position.

Typography uses **Space Grotesk** for all headings, labels, and buttons (applied inline via `style={{ fontFamily: "var(--font-space-grotesk)" }}`), and **Inter** for body copy (set as the default body font).

---

## Component-by-Component Breakdown

### ScrollProgress
A one-component file that uses Framer Motion's `useScroll` and `useSpring` to render a 2px fixed blue progress bar at the very top of the viewport. It's mounted in the root layout so it persists across all pages.

### Navbar
Fixed, transparent on load, transitions to a frosted white (`bg-white/95 backdrop-blur-md`) with a subtle shadow after 24px of scroll. Contains the Navibot logo (inline SVG robot icon), desktop nav links (How It Works, For Retailers, Technology, Team, Contact), a ghost "For Investors" link, and a "Book a Pilot" CTA button. On mobile, a hamburger button opens an animated `AnimatePresence` dropdown with staggered link entrances.

### Hero
Full-viewport section with a blue gradient background, city map grid overlay, and two radial blur blobs for depth. Left side has a live "Robot #02 · Delivering · Dresden Neustadt" status pill (animated green ping dot), the main H1 ("Autonomous Grocery Delivery for German Cities"), a subtitle paragraph, two CTA buttons (Book a Pilot Meeting, Download Pitch Deck), and a mini stats bar (10 kg payload, <30 min delivery, IP65). Right side has a fully hand-coded SVG illustration of the NaviBot delivery robot with a floating animation — complete with lid, body panels, camera array, status display strip, branding area, wheel axle, and three wheels with hub detail. Two animated spinning ring decorations sit behind it. All elements animate in with staggered `fadeUp` Framer Motion variants.

### HowItWorks
Violet-tinted section explaining the 4-step delivery flow: customer orders → staff picks and packs → robot collects → delivered in <30 min. Each step is a card with a step number badge, icon, title, description, and a small technical detail footnote. Cards animate in with staggered `whileInView` triggers. Header uses `useInView` directly for finer control.

### WhyNavibot
Orange-accented section (`id="retailers"`) targeting supermarket chains. Six benefit cards in a 3-column grid: no drivers, sub-30-min delivery, multi-chain fleet sharing, flat pricing, REST API integration, zero-emission. Cards lift on hover (`whileHover: { y: -4 }`). Below the grid is a full-width orange CTA banner ("Ready to run a pilot in your catchment area?") with a white "Book a Pilot Meeting" button.

### Technology
Emerald-accented section with a 5-column grid split: left 2 columns show a robot spec table (7 specs: drive config, payload, radius, delivery time, IP rating, autonomy level, navigation sensors), right 3 columns show 3 capability cards (autonomous navigation, fleet management software, in-house hardware). The spec table has a header/footer in emerald-50 with a note that specs are subject to change for the Gen 1 prototype.

### Stats
White section with 4 animated count-up stats: `<30 min` delivery, `~10 kg` payload, `3 km` radius, `0 drivers`. The `CountUp` component uses `requestAnimationFrame` with a cubic ease-out curve, and resets to 0 and re-animates each time the section scrolls into view (`once: false`). Stats are displayed with a blue-to-violet gradient fill applied via inline `WebkitBackgroundClip`.

### Team
Rose-accented section with a single founder card for Sagar Katariya. The card has a circular profile photo (`/sagar.jpg.jpeg`), name, "Founder" title in rose, a description paragraph, and a LinkedIn link. The card lifts 6px on hover.

### Testimonials
A carousel component with 3 placeholder testimonials (Priya Mehta, James Okafor, Sara Lindqvist — fictional retailers). Has a metric badge, blockquote, and author row. Prev/next arrow buttons and dot indicators. NOTE: These are placeholder testimonials, not real ones, as NaviBot has not yet launched. This section is NOT currently mounted in page.tsx and should be replaced with real quotes before going live.

### CtaStrip
A high-contrast blue-to-violet-to-purple gradient section with two side-by-side cards — one for supermarket chains ("Run a pilot in your catchment area") and one for investors ("Pre-seed round open" — EXIST Forschungstransfer applicant). Both cards have frosted glass styling (`bg-white/10 backdrop-blur-sm`).

### PressStrip
A lightweight strip showing e-commerce platform integrations (Shopify, WooCommerce, Magento, etc.) and press mentions (TechCrunch, Forbes, Product Hunt, YCombinator). Currently placeholder data — NOT mounted in page.tsx. Should be removed or replaced with real coverage before launch.

### Contact
The most complex interactive component. A 5-column grid with contact info on the left (email, location, pilot launch city) and a controlled form on the right. Form fields: Full Name, Email, Organisation, Enquiry type (dropdown: pilot / investor / press / other), Message. Submits via `fetch` to `/api/contact`. Displays animated success/error state banners inline. The submit button shows a spinning loader while the request is in flight.

### Footer
White footer with 5 columns: brand/logo/description/social icons, and three nav columns (Solution, Company, Contact). Bottom bar shows copyright and pilot launch info. Social icons (Twitter/X and LinkedIn) are inline SVGs currently linking to `#` placeholder.

### api/contact/route.ts
A Next.js App Router POST handler. Validates that name, email, and message are present and that email is a valid format. Currently logs to console and returns `{ success: true }` — email delivery (Resend or SendGrid) is stubbed out with a comment indicating where to wire it in.

---

## Key Design Decisions Made During Development

**Single-page layout:** All sections are anchor-linked on one page rather than using multiple routes. This suits the pre-launch marketing context — keeping visitors on one page maximises conversion to the contact form.

**Section color variety:** Each section has a distinct pastel background and matching accent color. This was a deliberate decision to maintain visual interest across a long scroll, avoiding the flat monotone look common to many SaaS landing pages.

**SVG robot illustration instead of photo:** Since no physical robot exists yet, a hand-crafted inline SVG serves as the hero visual. It's animated (floating), reasonably detailed (camera array, status display, wheels with hubs), and loads instantly with no external image dependency.

**`once: false` on all `whileInView` animations:** All section animations re-trigger when scrolled back into view, not just on first load. This gives the page a lively feel as users scroll up and down.

**Font injection via `style` prop:** Space Grotesk is applied to headings and interactive elements using inline `style={{ fontFamily: "var(--font-space-grotesk)" }}` rather than Tailwind classes, because Tailwind v4's `@theme` font variable system requires explicit registration which was simpler to bypass this way.

**No dark mode:** The entire site is light-only. Given the B2B target audience (supermarket procurement teams), a clean professional light theme was prioritised.

---

## What Still Needs Work

1. **Email delivery** — the `/api/contact` handler needs Resend or SendGrid wired in with an API key in `.env.local`
2. **Testimonials** — the three testimonials are placeholder/fictional; they should be removed or replaced with real quotes before launch
3. **PressStrip** — currently shows TechCrunch/Forbes/YCombinator as placeholder press mentions; should be removed until NaviBot has actual coverage
4. **Pitch deck download** — the "Download Pitch Deck" button on the hero links to `#contact` instead of an actual PDF
5. **Social links** — Twitter/X and LinkedIn in the footer link to `#` placeholder
6. **Stats.tsx TypeScript issue** — there is a duplicate `style` prop on the count-up number `div` (lines 64–65) which should be merged into one object
7. **Team photo** — `sagar.jpg.jpeg` must exist in the `/public` directory for the team section image to load

---

## Running the Project Locally

```bash
cd navibot
npm install
npm run dev
# Open http://localhost:3000
```

## Building for Production

```bash
npm run build
npm run start
```

## Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^12.40.0",
    "next": "16.2.7",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.7",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```
