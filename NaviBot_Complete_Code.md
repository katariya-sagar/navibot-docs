# NaviBot Website — Complete Source Code

All files from `C:\Users\sagar katariya\navibot\src\`

---

## package.json

```json
{
  "name": "navibot",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
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

---

## src/app/layout.tsx

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Navibot — Autonomous Grocery Delivery Robots for German Cities",
  description:
    "Navibot operates fleets of 6-wheel autonomous sidewalk robots for supermarket chains — delivering groceries to doorsteps in under 30 minutes, without drivers, 24/7. Based in Dresden, launching Munich 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-blue-50 text-slate-900">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
```

---

## src/app/globals.css

```css
@import "tailwindcss";

@theme {
  --color-navy: #F0F6FF;
  --color-navy-light: #EFF6FF;
  --color-navy-card: #FFFFFF;
  --color-navy-lighter: #93C5FD;
  --color-navy-border: #DBEAFE;
  --color-amber: #2563EB;
  --color-amber-light: #3B82F6;
  --color-amber-dark: #1D4ED8;
  --font-heading: var(--font-space-grotesk);
  --font-body: var(--font-inter);
  --animate-float: float 5s ease-in-out infinite;
  --animate-glow-pulse: glow-pulse 3s ease-in-out infinite;
  --animate-status-ping: status-ping 2s ease-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

@keyframes status-ping {
  0% { transform: scale(1); opacity: 1; }
  70% { transform: scale(2.2); opacity: 0; }
  100% { transform: scale(2.2); opacity: 0; }
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #F0F6FF;
  color: #0F172A;
}

.map-grid {
  background-image:
    linear-gradient(rgba(37, 99, 235, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.06) 1px, transparent 1px),
    linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px);
  background-size: 100px 100px, 100px 100px, 25px 25px, 25px 25px;
}

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #2563EB, #3B82F6);
  transform-origin: left;
  z-index: 100;
}

.text-gradient {
  background: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(219, 234, 254, 0.8);
}

.blue-glow {
  box-shadow: 0 0 40px rgba(37, 99, 235, 0.12), 0 0 80px rgba(37, 99, 235, 0.06);
}

.section-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(219, 234, 254, 0.8), transparent);
}
```

---

## src/app/page.tsx

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyNavibot from "@/components/WhyNavibot";
import Technology from "@/components/Technology";
import Team from "@/components/Team";
import CtaStrip from "@/components/CtaStrip";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhyNavibot />
      <Technology />
      <Team />
      <CtaStrip />
      <Contact />
      <Footer />
    </main>
  );
}
```

---

## src/app/api/contact/route.ts

```ts
import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  // Wire Resend / SendGrid here when ready.
  console.log("[contact form]", {
    name: name.trim(),
    email: email.trim(),
    company: body.company?.trim(),
    message: message.trim(),
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
```

---

## src/components/ScrollProgress.tsx

```tsx
"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
}
```

---

## src/components/Navbar.tsx

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#retailers", label: "For Retailers" },
  { href: "#technology", label: "Technology" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm shadow-blue-100/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                <rect x="4" y="7" width="12" height="9" rx="2" fill="white"/>
                <rect x="7" y="4" width="6" height="5" rx="1.5" fill="white"/>
                <circle cx="8" cy="6" r="1" fill="#2563EB"/>
                <circle cx="12" cy="6" r="1" fill="#2563EB"/>
                <circle cx="6" cy="17" r="1.5" fill="white"/>
                <circle cx="10" cy="17" r="1.5" fill="white"/>
                <circle cx="14" cy="17" r="1.5" fill="white"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Navi<span className="text-blue-600">bot</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 font-medium">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">
              For Investors
              <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link href="#contact"
              className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm shadow-blue-200"
              style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Book a Pilot
            </Link>
            <button className="lg:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors"
              onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="lg:hidden border-t border-blue-100 py-5 flex flex-col gap-4 overflow-hidden bg-white/95"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={link.href}
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
                    onClick={() => setMenuOpen(false)}>{link.label}</Link>
                </motion.div>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                <Link href="#contact" onClick={() => setMenuOpen(false)}
                  className="text-sm text-slate-500 hover:text-slate-800 text-center py-2.5 border border-blue-200 rounded-full transition-colors">
                  For Investors
                </Link>
                <Link href="#contact" onClick={() => setMenuOpen(false)}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center py-2.5 rounded-full transition-colors"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  Book a Pilot
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
```

---

## src/components/Hero.tsx

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function DeliveryRobot() {
  return (
    <svg viewBox="0 0 280 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-sm mx-auto animate-float"
      aria-label="Navibot autonomous delivery robot">

      <ellipse cx="140" cy="252" rx="88" ry="8" fill="#2563EB" fillOpacity="0.12"/>

      <rect x="48" y="28" width="184" height="18" rx="6" fill="#1D4ED8"/>
      <rect x="48" y="40" width="184" height="4" fill="#1E3A8A"/>
      <line x1="48" y1="44" x2="232" y2="44" stroke="#93C5FD" strokeWidth="0.75" strokeOpacity="0.6"/>

      <rect x="40" y="44" width="200" height="148" rx="10" fill="#2563EB"/>
      <rect x="40" y="44" width="200" height="148" rx="10" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>

      <rect x="52" y="56" width="176" height="80" rx="7" fill="#1D4ED8"/>

      <rect x="62" y="64" width="156" height="32" rx="5" fill="#1E3A8A"/>
      <rect x="62" y="64" width="156" height="32" rx="5" stroke="#3B82F6" strokeWidth="1"/>
      {[82, 120, 158, 196].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy={80} r={9} fill="#1D4ED8"/>
          <circle cx={cx} cy={80} r={6} fill="#1E3A8A"/>
          <circle cx={cx} cy={80} r={3.5} fill="#BFDBFE" fillOpacity={i === 1 ? 1 : 0.6}/>
          <circle cx={cx - 1.5} cy={78} r={1} fill="white" fillOpacity="0.7"/>
        </g>
      ))}

      <rect x="62" y="104" width="156" height="24" rx="4" fill="#1E3A8A"/>
      <rect x="68" y="108" width="8" height="16" rx="2" fill="#93C5FD" fillOpacity="0.9"/>
      <rect x="80" y="110" width="60" height="4" rx="1.5" fill="white" fillOpacity="0.3"/>
      <rect x="80" y="118" width="40" height="3" rx="1.5" fill="white" fillOpacity="0.15"/>
      <circle cx="204" cy="116" r="5" fill="#22c55e"/>
      <circle cx="204" cy="116" r="5" fill="#22c55e" fillOpacity="0.3" className="animate-glow-pulse"/>

      <rect x="52" y="144" width="176" height="36" rx="5" fill="#1E3A8A"/>
      <rect x="52" y="144" width="5" height="36" rx="2" fill="#93C5FD"/>
      <rect x="223" y="144" width="5" height="36" rx="2" fill="#93C5FD"/>
      <rect x="80" y="153" width="60" height="7" rx="2" fill="#BFDBFE" fillOpacity="0.8"/>
      <rect x="80" y="164" width="40" height="5" rx="2" fill="white" fillOpacity="0.2"/>

      <rect x="44" y="192" width="192" height="12" rx="4" fill="#1E3A8A"/>

      <ellipse cx="76" cy="220" rx="22" ry="22" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="2"/>
      <ellipse cx="76" cy="220" rx="13" ry="13" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.6"/>
      <circle cx="76" cy="220" r="4" fill="#BFDBFE" fillOpacity="0.8"/>

      <ellipse cx="140" cy="220" rx="22" ry="22" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="2"/>
      <ellipse cx="140" cy="220" rx="13" ry="13" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5" strokeOpacity="0.9"/>
      <circle cx="140" cy="220" r="4" fill="#BFDBFE"/>

      <ellipse cx="204" cy="220" rx="22" ry="22" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="2"/>
      <ellipse cx="204" cy="220" rx="13" ry="13" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1" strokeOpacity="0.6"/>
      <circle cx="204" cy="220" r="4" fill="#BFDBFE" fillOpacity="0.8"/>

      <ellipse cx="140" cy="245" rx="70" ry="6" fill="#2563EB" fillOpacity="0.08"/>
    </svg>
  );
}

function StatusPill() {
  return (
    <div className="inline-flex items-center gap-2.5 bg-white border border-blue-200 backdrop-blur-sm rounded-full pl-3 pr-4 py-2 shadow-sm shadow-blue-100">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400"/>
      </span>
      <span className="text-slate-500 text-xs font-medium tracking-wide">
        Robot #02 · Delivering · <span className="text-slate-700">Dresden Neustadt</span>
      </span>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 lg:pt-20 overflow-hidden bg-gradient-to-br from-navy via-blue-50 to-navy-light">
      <div className="absolute inset-0 map-grid pointer-events-none"/>
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent to-navy/60 pointer-events-none"/>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl pointer-events-none"/>
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"/>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
              <StatusPill/>
            </motion.div>

            <div className="flex flex-col gap-5">
              <motion.h1
                className="text-5xl lg:text-6xl xl:text-[3.85rem] font-bold text-slate-900 leading-[1.06] tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
              >
                Autonomous Grocery
                <br/>Delivery for{" "}
                <span className="text-blue-600">German Cities</span>
              </motion.h1>
              <motion.p
                className="text-lg text-slate-500 leading-relaxed max-w-[500px]"
                variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
              >
                Navibot operates fleets of 6-wheel autonomous robots for supermarket chains —
                delivering groceries to doorsteps in under 30 minutes, without drivers,
                without dark stores, around the clock.
              </motion.p>
            </div>

            <motion.div className="flex flex-wrap gap-3 pt-1" variants={fadeUp} initial="hidden" animate="visible" custom={0.5}>
              <Link href="#contact"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0"
                style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Book a Pilot Meeting
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
              <Link href="#contact"
                className="inline-flex items-center gap-2 border border-blue-200 hover:border-blue-600/40 text-slate-600 hover:text-slate-900 font-semibold text-base px-7 py-3.5 rounded-full transition-all duration-200 hover:bg-white hover:-translate-y-0.5 active:translate-y-0 bg-white/60"
                style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Download Pitch Deck
                <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-2 pt-1 border-t border-blue-200/60"
              variants={fadeUp} initial="hidden" animate="visible" custom={0.65}
            >
              {[
                { label: "Payload", value: "~10 kg" },
                { label: "Delivery time", value: "< 30 min" },
                { label: "Waterproofing", value: "IP65" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 pt-3">
                  <span className="text-blue-600 text-sm font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>{s.value}</span>
                  <span className="text-slate-400 text-xs">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative flex items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-blue-600/6 rounded-full blur-3xl scale-75 pointer-events-none"/>
            <div className="absolute w-80 h-80 rounded-full border border-amber/12 animate-spin" style={{ animationDuration: "20s" }}/>
            <div className="absolute w-64 h-64 rounded-full border border-amber/8" style={{ animation: "spin 15s linear infinite reverse" }}/>
            <DeliveryRobot/>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-slate-400 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-amber/50 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
```

---

## src/components/HowItWorks.tsx

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Customer places an order",
    description: "The customer orders groceries through the supermarket's existing app or website. No new platform. No change to your checkout flow.",
    detail: "Integrates with your existing e-commerce and WMS via REST API.",
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>),
  },
  {
    number: "02",
    title: "Staff picks and packs",
    description: "Your store team receives the order on a standard picking terminal. They pick, pack, and place the bag at the designated robot bay near the store entrance.",
    detail: "No disruption to your existing in-store operations.",
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>),
  },
  {
    number: "03",
    title: "Robot collects from the store",
    description: "A Navibot robot navigates autonomously to the collection bay. The hatch opens, the order is loaded, and the robot locks and begins routing to the delivery address.",
    detail: "99% autonomous operation. Remote operator oversight at all times.",
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>),
  },
  {
    number: "04",
    title: "Delivered in under 30 minutes",
    description: "The robot travels along the pavement to the customer's address. The customer unlocks the hatch via the app, takes their groceries, and the robot returns to the fleet.",
    detail: "Customer receives real-time tracking throughout the delivery.",
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>),
  },
];

export default function HowItWorks() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: false, margin: "-80px" });

  return (
    <section id="how-it-works" className="py-24 lg:py-32" style={{ backgroundColor: '#F5F3FF' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="mb-16 max-w-2xl"
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-violet-600 text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>How It Works</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5 leading-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            From order to doorstep
            <br/><span className="text-violet-600">in under 30 minutes.</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
            Navibot fits into your existing workflow. No dark stores, no app replacement,
            no changes to how your customers shop.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="flex gap-5 bg-white border border-violet-100 rounded-2xl p-7 hover:border-violet-400/40 hover:shadow-lg hover:shadow-violet-100/60 transition-all duration-300 group"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -2 }}
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 group-hover:border-violet-400/30 flex items-center justify-center transition-colors duration-300">
                <span className="text-lg font-bold text-violet-600" style={{ fontFamily: "var(--font-space-grotesk)" }}>{step.number}</span>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-violet-400 group-hover:text-violet-600 transition-colors duration-300">{step.icon}</span>
                  <h3 className="text-base font-bold text-slate-800" style={{ fontFamily: "var(--font-space-grotesk)" }}>{step.title}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                <p className="text-xs text-violet-500 font-medium border-t border-violet-100 pt-2.5 mt-0.5">{step.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## src/components/WhyNavibot.tsx

```tsx
"use client";

import { motion } from "framer-motion";

const BENEFITS = [
  { title: "No drivers. No driver costs.", description: "Navibot replaces last-mile driver logistics entirely. Every delivery runs on electricity, not human labour — giving you a fixed, predictable cost per delivery regardless of traffic, time of day, or demand spikes.", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>) },
  { title: "Sub-30-minute delivery, reliably", description: "Same-day is the standard in German grocery e-commerce. Navibot makes sub-30-minute delivery economically viable for the first time — without the cost structure of a dark store or courier fleet.", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>) },
  { title: "Serve multiple chains from one fleet", description: "One Navibot fleet operates across multiple supermarket chains simultaneously. Higher robot utilisation means lower cost per delivery for every partner — a model no single-retailer captive fleet can match.", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>) },
  { title: "Flat pricing, no surge costs", description: "Robots do not take weekends, bank holidays, or sick days. Navibot delivers around the clock at the same per-delivery rate — no surge pricing, no peak-hour premiums.", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>) },
  { title: "Integrates with your existing stack", description: "Navibot connects to your WMS, ERP, or ordering platform via REST API. No rip-and-replace. Your fulfilment operations stay exactly as they are — we add the last-mile layer on top.", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>) },
  { title: "Zero-emission last-mile delivery", description: "Every Navibot robot runs on an electric battery. No exhaust, no noise, no road congestion. A sustainable last-mile option that aligns with German retail's decarbonisation commitments.", icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>) },
];

export default function WhyNavibot() {
  return (
    <section id="retailers" className="py-24 lg:py-32" style={{ backgroundColor: '#FFF7ED' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div className="text-center mb-16 max-w-2xl mx-auto" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <p className="text-orange-500 text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>For Supermarket Chains</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            A better model for{" "}<span className="text-orange-500">grocery last-mile.</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Built for Edeka, Rewe, Penny, Netto, Kaufland — and any independent operator who wants to offer fast home delivery without building a courier operation.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BENEFITS.map((b, i) => (
            <motion.div key={b.title} className="flex flex-col gap-4 bg-white border border-orange-100 rounded-2xl p-7 hover:border-orange-400/40 hover:shadow-lg hover:shadow-orange-100/60 transition-all duration-300 group cursor-default"
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <motion.div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-400 group-hover:text-orange-500 group-hover:border-orange-300 transition-all duration-300" whileHover={{ scale: 1.05 }}>
                {b.icon}
              </motion.div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-slate-800 group-hover:text-orange-500 transition-colors duration-300" style={{ fontFamily: "var(--font-space-grotesk)" }}>{b.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{b.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl px-8 py-6"
          style={{ backgroundColor: '#F97316' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <div>
            <p className="text-white font-semibold mb-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>Ready to run a pilot in your catchment area?</p>
            <p className="text-white/80 text-sm">We are launching in Munich in 2026. Pilot slots are limited — reach out early.</p>
          </div>
          <motion.a href="#contact" className="shrink-0 inline-flex items-center gap-2 bg-white text-orange-500 font-bold text-sm px-6 py-3 rounded-full transition-colors duration-200 whitespace-nowrap hover:bg-orange-50"
            style={{ fontFamily: "var(--font-space-grotesk)" }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            Book a Pilot Meeting
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## src/components/Technology.tsx

```tsx
"use client";

import { motion } from "framer-motion";

const SPECS = [
  { label: "Drive configuration", value: "6-wheel, all-terrain" },
  { label: "Payload capacity", value: "~10 kg / 3 grocery bags" },
  { label: "Delivery radius", value: "Up to 3 km" },
  { label: "Average delivery time", value: "25 – 30 min" },
  { label: "Ingress protection", value: "IP65 (weatherproof)" },
  { label: "Autonomy level", value: "Level 4 sidewalk" },
  { label: "Navigation", value: "Camera + radar + GNSS fusion" },
];

const CAPABILITIES = [
  { title: "Autonomous navigation", description: "Multi-sensor fusion across cameras, radar, and GNSS enables safe pavement navigation — detecting pedestrians, cyclists, and obstacles in real time.", icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>) },
  { title: "Fleet management software", description: "Real-time fleet telemetry, route optimisation, and remote operator oversight — all on a single dashboard accessible from any browser.", icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/></svg>) },
  { title: "In-house hardware", description: "We design and manufacture our own robot platform. No dependency on third-party robot vendors — full control over cost, performance, and the improvement roadmap.", icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>) },
];

export default function Technology() {
  return (
    <section id="technology" className="py-24 lg:py-32" style={{ backgroundColor: '#ECFDF5' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div className="mb-16 max-w-2xl" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <p className="text-emerald-600 text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>Technology</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Built from the ground up.<br/><span className="text-emerald-600">Hardware and software.</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
            Navibot is a vertical hardware-software company. We control the full stack — from robot mechanics to fleet orchestration to the retailer API.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          <motion.div className="lg:col-span-2 bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm"
            initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <div className="px-6 py-4 border-b border-emerald-100 bg-emerald-50">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: "var(--font-space-grotesk)" }}>Robot Specifications</p>
            </div>
            <div className="divide-y divide-emerald-50">
              {SPECS.map((s, i) => (
                <motion.div key={s.label} className="flex items-center justify-between px-6 py-3.5 gap-4 hover:bg-emerald-50/60 transition-colors duration-200"
                  initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                  <span className="text-slate-500 text-sm">{s.label}</span>
                  <span className="text-slate-800 text-sm font-semibold text-right" style={{ fontFamily: "var(--font-space-grotesk)" }}>{s.value}</span>
                </motion.div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-emerald-100 bg-emerald-50">
              <p className="text-emerald-600/80 text-xs">Gen 1 prototype under development. Specifications subject to change.</p>
            </div>
          </motion.div>

          <div className="lg:col-span-3 flex flex-col gap-4">
            {CAPABILITIES.map((c, i) => (
              <motion.div key={c.title} className="flex gap-5 bg-white border border-emerald-100 rounded-2xl p-6 hover:border-emerald-500/30 hover:shadow-md hover:shadow-emerald-100/60 transition-all duration-300 group"
                initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }} whileHover={{ y: -3, transition: { duration: 0.2 } }}>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 group-hover:border-emerald-400/30 flex items-center justify-center text-emerald-500 group-hover:text-emerald-600 transition-all duration-300 shrink-0">
                  {c.icon}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-600 transition-colors duration-300" style={{ fontFamily: "var(--font-space-grotesk)" }}>{c.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{c.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## src/components/Stats.tsx

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { prefix: "<", numeric: 30, suffix: " min", label: "Doorstep delivery time", sublabel: "store to customer" },
  { prefix: "~", numeric: 10, suffix: " kg", label: "Payload capacity", sublabel: "per robot, per trip" },
  { prefix: "", numeric: 3, suffix: " km", label: "Delivery radius", sublabel: "per dispatch" },
  { prefix: "", numeric: 0, suffix: " drivers", label: "Labour cost per delivery", sublabel: "fully autonomous last-mile" },
];

function CountUp({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  useEffect(() => {
    if (!inView) { setCount(0); return; }
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 bg-white border-y border-blue-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p className="text-center text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-12"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ duration: 0.5 }}>
          Navibot robot specs
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label}
              className={`flex flex-col items-center text-center gap-2 ${i < STATS.length - 1 ? "lg:border-r lg:border-blue-100" : ""}`}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: i * 0.1 + 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <div className="text-5xl lg:text-6xl font-bold leading-none"
                style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "var(--font-space-grotesk)" }}>
                {stat.prefix}<CountUp target={stat.numeric}/>{stat.suffix}
              </div>
              <p className="text-sm font-semibold text-slate-700 mt-1">{stat.label}</p>
              <p className="text-xs text-slate-400">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## src/components/Team.tsx

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Team() {
  return (
    <section id="team" className="py-24 lg:py-32" style={{ backgroundColor: '#FFF1F2' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div className="text-center mb-14 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <p className="text-rose-500 text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>The Founder</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Built by someone who{" "}<span className="text-rose-500">gives a damn.</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Navibot is founded on the belief that autonomous delivery should work for independent retailers — not just the giants.
          </p>
        </motion.div>

        <motion.div className="max-w-sm mx-auto"
          initial={{ opacity: 0, y: 32, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <motion.div className="flex flex-col items-center text-center gap-5 bg-white border border-rose-100 rounded-2xl p-8 hover:border-rose-400/30 hover:shadow-xl hover:shadow-rose-100/60 transition-all duration-300 group"
            whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
            <motion.div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-rose-200 group-hover:ring-rose-400/60 shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.04 }} transition={{ duration: 0.25 }}>
              <Image src="/sagar.jpg.jpeg" alt="Sagar Katariya" width={400} height={400} className="w-full h-full object-cover object-top"/>
            </motion.div>
            <div className="flex flex-col gap-1">
              <p className="text-slate-900 text-base font-bold" style={{ fontFamily: "var(--font-space-grotesk)" }}>Sagar Katariya</p>
              <p className="text-rose-500 text-sm font-medium">Founder</p>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Leading product vision, retail partnerships, and go-to-market strategy for Navibot&apos;s autonomous delivery platform in Germany.
            </p>
            <motion.a href="https://www.linkedin.com/in/sagar-katariya-aviation"
              className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors text-xs"
              aria-label="Sagar Katariya on LinkedIn" whileHover={{ scale: 1.05 }}>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## src/components/CtaStrip.tsx

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CtaStrip() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #7C3AED 100%)' }}>
      <div className="absolute inset-0 map-grid pointer-events-none opacity-20"/>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"/>
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"/>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 flex flex-col gap-5 hover:bg-white/15 transition-all duration-300 group"
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>For Supermarket Chains</p>
              <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>Run a pilot in your catchment area</h3>
              <p className="text-white/80 text-sm leading-relaxed">We are launching in Munich in 2026. We&apos;re onboarding a small number of retail partners for our first pilot cohort. Pilot slots are limited.</p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="w-fit">
              <Link href="#contact" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold text-sm px-6 py-3 rounded-full hover:bg-blue-50 transition-colors" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Book a Meeting
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 flex flex-col gap-5 hover:bg-white/15 transition-all duration-300 group"
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>For Investors</p>
              <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>Pre-seed round open</h3>
              <p className="text-white/80 text-sm leading-relaxed">We are raising our pre-seed round to fund prototype completion, regulatory approval, and the Munich pilot launch. EXIST Forschungstransfer applicant.</p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="w-fit">
              <Link href="#contact" className="inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 font-bold text-sm px-6 py-3 rounded-full transition-all" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Request Pitch Deck
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

---

## src/components/Contact.tsx

```tsx
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";

type FormStatus = "idle" | "loading" | "success" | "error";
type Enquiry = "pilot" | "investor" | "press" | "other";
interface FormFields { name: string; email: string; organisation: string; enquiry: Enquiry; message: string; }

const EMPTY: FormFields = { name: "", email: "", organisation: "", enquiry: "pilot", message: "" };
const ENQUIRY_OPTIONS: { value: Enquiry; label: string }[] = [
  { value: "pilot", label: "Retail pilot enquiry" },
  { value: "investor", label: "Investor / pitch deck request" },
  { value: "press", label: "Press / media" },
  { value: "other", label: "Other" },
];

const CONTACT_INFO = [
  { label: "Email", value: "hello@navibot.de", icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>) },
  { label: "Location", value: "Dresden, Germany", icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>) },
  { label: "Pilot launch", value: "Munich, Germany · 2026", icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>) },
];

export default function Contact() {
  const [fields, setFields] = useState<FormFields>(EMPTY);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fields) });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error ?? "Something went wrong."); }
      setStatus("success");
      setFields(EMPTY);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputClass = "w-full bg-white border border-blue-100 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none focus:border-blue-600/50 focus:ring-2 focus:ring-blue-600/10 transition-all duration-200";

  return (
    <section id="contact" className="py-24 lg:py-32 bg-blue-50 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"/>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div className="text-center mb-14 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>Get in Touch</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Let&apos;s talk about{" "}<span className="text-blue-600">your catchment area.</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Whether you&apos;re a supermarket chain exploring last-mile options or an investor interested in the German autonomous delivery market — reach out.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <motion.div className="lg:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>
            {CONTACT_INFO.map((item, i) => (
              <motion.div key={item.label} className="flex items-start gap-4"
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="w-10 h-10 rounded-xl bg-white border border-blue-100 flex items-center justify-center text-blue-600/70 shrink-0 mt-0.5 shadow-sm">{item.icon}</div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">{item.label}</span>
                  <span className="text-slate-700 text-sm font-medium">{item.value}</span>
                </div>
              </motion.div>
            ))}
            <div className="mt-2 bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
              <p className="text-slate-500 text-sm leading-relaxed">We respond to all retail and investor enquiries within one business day. For pilot discussions we can arrange a video call at your convenience.</p>
            </div>
          </motion.div>

          <motion.form onSubmit={handleSubmit}
            className="lg:col-span-3 bg-white border border-blue-100 rounded-2xl p-8 flex flex-col gap-5 shadow-sm"
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Full Name <span className="text-blue-600">*</span></label>
                <input type="text" name="name" value={fields.name} onChange={handleChange} placeholder="Your name" required className={inputClass}/>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email <span className="text-blue-600">*</span></label>
                <input type="email" name="email" value={fields.email} onChange={handleChange} placeholder="you@company.de" required className={inputClass}/>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Organisation / Company</label>
              <input type="text" name="organisation" value={fields.organisation} onChange={handleChange} placeholder="Edeka Nord GmbH, Munich Ventures, …" className={inputClass}/>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Enquiry type <span className="text-blue-600">*</span></label>
              <select name="enquiry" value={fields.enquiry} onChange={handleChange} required className={inputClass}>
                {ENQUIRY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Message <span className="text-blue-600">*</span></label>
              <textarea name="message" value={fields.message} onChange={handleChange}
                placeholder="Tell us about your location, fleet size interest, or investment thesis…"
                required rows={4} className={`${inputClass} resize-none`}/>
            </div>

            {status === "error" && (
              <motion.div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p className="text-red-600 text-sm">{errorMsg}</p>
              </motion.div>
            )}
            {status === "success" && (
              <motion.div className="flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-xl px-4 py-3" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p className="text-green-700 text-sm">Message sent — we&apos;ll be in touch within one business day.</p>
              </motion.div>
            )}

            <motion.button type="submit" disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/40 text-white font-bold text-base px-6 py-3.5 rounded-full transition-colors duration-200 shadow-lg shadow-blue-200 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-space-grotesk)" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              {status === "loading" ? (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Sending…</>
              ) : "Send Message →"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
```

---

## src/components/Footer.tsx

```tsx
import Link from "next/link";

const FOOTER_LINKS = {
  Solution: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "For Retailers", href: "#retailers" },
    { label: "Technology", href: "#technology" },
    { label: "Robot Specs", href: "#technology" },
  ],
  Company: [
    { label: "Team", href: "#team" },
    { label: "About", href: "#" },
    { label: "Investors", href: "#contact" },
    { label: "EXIST Grant", href: "#contact" },
  ],
  Contact: [
    { label: "Book a Pilot", href: "#contact" },
    { label: "Request Pitch Deck", href: "#contact" },
    { label: "hello@navibot.de", href: "mailto:hello@navibot.de" },
    { label: "Privacy Policy", href: "#" },
  ],
};

const SOCIAL = [
  { label: "Twitter / X", href: "#", icon: (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>) },
  { label: "LinkedIn", href: "#", icon: (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>) },
];

export default function Footer() {
  return (
    <footer className="border-t border-blue-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm shadow-blue-200">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <rect x="7" y="2" width="10" height="9" rx="2.5" fill="white"/>
                  <circle cx="9.5" cy="5.5" r="1.5" fill="#2563EB"/>
                  <circle cx="14.5" cy="5.5" r="1.5" fill="#2563EB"/>
                  <path d="M12 11v2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <rect x="3" y="13" width="18" height="9" rx="2.5" fill="white"/>
                  <rect x="1" y="15" width="2" height="5" rx="1" fill="white"/>
                  <rect x="21" y="15" width="2" height="5" rx="1" fill="white"/>
                  <circle cx="12" cy="17.5" r="2.5" fill="#2563EB"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Navi<span className="text-blue-600">Bot</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Autonomous sidewalk delivery robots for supermarket chains in Germany. No drivers. No dark stores. Groceries at the doorstep in under 30 minutes.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-600/10 hover:text-blue-600 text-slate-400 flex items-center justify-center transition-all duration-200 border border-blue-100">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest" style={{ fontFamily: "var(--font-space-grotesk)" }}>{category}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-slate-500 hover:text-blue-600 transition-colors duration-200">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-400 text-xs">© {new Date().getFullYear()} Navibot GmbH · Dresden, Germany</p>
          <p className="text-slate-500 text-xs">Pilot launch: Munich 2026 · hello@navibot.de</p>
        </div>
      </div>
    </footer>
  );
}
```

---

*End of NaviBot_Complete_Code.md*
*Project: navibot.de | Founder: Sagar Katariya | Location: Dresden, Germany*
