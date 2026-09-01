"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import { COMPANY } from "./data/company";
import { SERVICES } from "./data/services";
import { REVIEWS } from "./data/reviews";

const GOLD = "#e3af2b";
const GOLD_LIGHT = "#f2c34a";

const eyebrow: CSSProperties = {
  fontWeight: 300,
  fontSize: 11,
  letterSpacing: ".32em",
  textTransform: "uppercase",
  color: GOLD,
  marginBottom: 22,
};

function GoogleLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

function PinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

/* Why SS Icons */
function PriceIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function CraftIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m14.7 6.3 3 3-9.4 9.4H5.3v-3z" />
      <path d="m16.5 4.5 3 3" />
      <path d="m19 2-3 3" />
      <path d="M2 22h20" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function TidyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" />
      <path d="m4.93 4.93 2.83 2.83" />
      <path d="M2 12h4" />
      <path d="m4.93 19.07 2.83-2.83" />
      <path d="M12 22v-4" />
      <path d="m19.07 19.07-2.83-2.83" />
      <path d="M22 12h-4" />
      <path d="m19.07 4.93-2.83 2.83" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

/* Process Icons */
function VisitIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function BlueprintIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
      <path d="m9 3 12 12" />
    </svg>
  );
}

function WorkshopIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20" />
      <path d="M5 20V8l7-5 7 5v12" />
      <path d="M9 20v-6h6v6" />
      <line x1="12" y1="3" x2="12" y2="8" />
    </svg>
  );
}

function HandoverIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m11 17 2 2 4-4" />
      <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

const WHY_US = [
  {
    icon: <PriceIcon />,
    title: "A fixed written price",
    copy: "The figure we quote is the figure you pay. It only moves if you ask it to, in writing.",
  },
  {
    icon: <CraftIcon />,
    title: "Direct owner craft",
    copy: "The owner personally oversees and fits every build, ensuring meticulous quality from cut to finish.",
  },
  {
    icon: <ContactIcon />,
    title: "One point of contact",
    copy: "You get a direct phone number and fast answers, not a receptionist or switchboard.",
  },
  {
    icon: <TidyIcon />,
    title: "A tidy site, daily",
    copy: "Dust sheets down, floors protected, everything swept before we leave. You still live here.",
  },
];

const PROCESS = [
  { icon: <VisitIcon />, title: "The visit", copy: "We come to you, look at the space properly, and listen before we suggest anything." },
  { icon: <BlueprintIcon />, title: "Drawings & quote", copy: "You get drawings, material samples and one itemised price with nothing hidden underneath it." },
  { icon: <WorkshopIcon />, title: "Workshop & fit", copy: "We build off site where we can, then fit it in the fewest days your home can manage." },
  { icon: <HandoverIcon />, title: "Walk it with us", copy: "We go through every edge and hinge together, put anything right, then hand it over." },
];

const PORTFOLIO = [
  { label: "Walnut kitchen · Westboro", image: "/assets/portfolio-kitchen.jpg", big: true },
  { label: "Custom staircase · Rockcliffe Park", image: "/assets/portfolio-staircase.jpg" },
  { label: "Fitted wardrobe · The Glebe", image: "/assets/portfolio-wardrobe.jpg" },
  { label: "Deck & walnut shelving · Barrhaven", image: "/assets/portfolio-deck.jpg" },
  { label: "Full renovation · Kanata", image: "/assets/portfolio-renovation.jpg" },
];

function GoldButton({ children, onClick, style }: { children: ReactNode; onClick?: () => void; style?: CSSProperties }) {
  return (
    <button
      onClick={onClick}
      className="gold-btn"
      style={{
        cursor: "pointer",
        background: GOLD,
        color: "#0a0908",
        border: "none",
        fontFamily: "var(--font-sans), sans-serif",
        fontWeight: 500,
        fontSize: 12,
        letterSpacing: ".22em",
        textTransform: "uppercase",
        padding: "20px 40px",
        transition: "all .25s ease",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [faqOpen, setFaqOpen] = useState<boolean[]>(Array(5).fill(false));
  const [form, setForm] = useState({ name: "", email: "", ptype: "", msg: "" });
  const [submitted, setSubmitted] = useState(false);
  const quoteRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.classList.add("js-loaded");

    // Scroll progress indicator
    let queued = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, window.scrollY / h) : 0;
      setProgress(p * 100);
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    // Scroll-triggered reveal animations observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );
    revealElements.forEach((el) => observer.observe(el));

    // Smoothly reveal hero elements right on page load
    const timer = setTimeout(() => {
      document.querySelectorAll(".hero-reveal").forEach((el) => {
        el.classList.add("revealed");
        observer.unobserve(el);
      });
    }, 60);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToForm = () => {
    quoteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleFaq = (i: number) =>
    setFaqOpen((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const stars = "★".repeat(Math.round(COMPANY.rating));

  const FAQS = [
    {
      q: "What does bespoke actually cost?",
      a: "It depends on the room and the materials, so we will not pretend there is a price list. What we will do is give you one fixed, itemised figure after the visit, and stick to it.",
    },
    {
      q: "How long will the work take?",
      a: "A fitted wardrobe is usually a week on site. A kitchen runs three to five weeks. A full renovation is measured in months, and we give you the honest timeline at the quote stage with direct owner oversight from day one.",
    },
    {
      q: "Can we live in the house while you work?",
      a: "Most of our clients do. We build off site wherever possible, protect floors and doorways, and sweep up before we leave each day.",
    },
    {
      q: "Are you insured and licensed in Ottawa?",
      a: "Yes — fully insured for carpentry and renovation work across Ottawa and surrounding areas. If something is not right, the owner personally comes back to make it perfect.",
    },
    {
      q: "Do you work with our designer or architect?",
      a: "Happily. We build to architectural drawings and 3D renderings all the time, and we flag anything that will not work in practice before it becomes an issue on site.",
    },
  ];

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {/* progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 80, pointerEvents: "none" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: GOLD, transition: "width .12s linear" }} />
      </div>

      <SiteNav />
      <div className="nav-spacer" />

      {/* ===== HERO (Higher / Video Background / Top-Left Elements) ===== */}
      <section style={{ position: "relative", minHeight: "calc(96vh - 88px)", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden", background: "#000" }}>
        {/* Video Background (Lighter & More Visible) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            opacity: 0.88,
            filter: "brightness(0.92) contrast(1.05)",
          }}
        >
          <source src="/assets/vecteezy_large-bedroom-with-wooden-design_2016901.mp4" type="video/mp4" />
        </video>

        {/* Ambient Overlays (Softened for Video Clarity) */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(130% 90% at 50% 35%, rgba(0,0,0,.10) 0%, rgba(0,0,0,.45) 65%, rgba(0,0,0,.82) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.05) 30%, rgba(0,0,0,.25) 60%, rgba(0,0,0,.85) 100%)" }} />

        {/* Hero Content (Positioned Top-Left, Brought Down with Balanced Spacing) */}
        <div className="hero-content" style={{ position: "relative", zIndex: 2, padding: "75px 56px 40px", maxWidth: 1120 }}>
          <h1 className="hero-h1 reveal hero-reveal" style={{ margin: 0, fontFamily: "var(--font-display), serif", fontWeight: 300, lineHeight: 1.02, letterSpacing: "-.015em", maxWidth: 1040, textShadow: "0 4px 28px rgba(0,0,0,0.85), 0 1px 6px rgba(0,0,0,0.9)" }}>
            Craftsmanship you<br />can run your <span style={{ fontStyle: "italic", color: GOLD }}>hand</span> along.
          </h1>
          <p className="reveal hero-reveal" style={{ margin: "26px 0 0", fontWeight: 300, fontSize: 19, lineHeight: 1.7, maxWidth: 540, color: "rgba(247,245,241,.9)", textShadow: "0 2px 14px rgba(0,0,0,0.9)", transitionDelay: "0.12s" }}>
            Hand-built kitchens, custom staircases, tailored wardrobes and whole-home renovations in Ottawa crafted with owner-led precision.
          </p>
          <div className="reveal hero-reveal" style={{ display: "flex", alignItems: "center", gap: 26, marginTop: 38, flexWrap: "wrap", transitionDelay: "0.22s" }}>
            <GoldButton onClick={scrollToForm}>Request a quote</GoldButton>
            <a href="#portfolio" style={{ fontWeight: 300, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: "#f7f5f1", paddingBottom: 5, borderBottom: "1px solid rgba(227,175,43,.5)", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>View recent work</a>
          </div>
        </div>

        {/* Stat Bar (3 Items, Pinned to Bottom)
            Numerals render in Jost (sans), not the display serif — in Cormorant
            Garamond the numeral "1" and capital "I" are nearly identical strokes.
            Jost's "1" has a flag and foot serif, so it reads unambiguously as a digit. */}
        <div style={{ position: "relative", zIndex: 2, marginTop: "auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "1px solid rgba(227,175,43,.25)", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)", transitionDelay: "0.3s" }} className="statbar reveal hero-reveal">
          <div style={{ padding: "26px 40px", borderRight: "1px solid rgba(247,245,241,.1)" }}>
            <div style={{ fontFamily: "var(--font-sans), sans-serif", fontWeight: 500, fontSize: 34, lineHeight: 1, color: GOLD }}>{COMPANY.rating.toFixed(1)}<span style={{ color: GOLD, fontSize: 20 }}> {stars}</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 300, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(247,245,241,.65)", marginTop: 10 }}>
              <GoogleLogo size={13} />
              <span>{COMPANY.reviewCount} five-star Google reviews</span>
            </div>
          </div>
          <div style={{ padding: "26px 40px", borderRight: "1px solid rgba(247,245,241,.1)" }}>
            <div style={{ fontFamily: "var(--font-sans), sans-serif", fontWeight: 500, fontSize: 34, lineHeight: 1 }}>100%</div>
            <div style={{ fontWeight: 300, fontSize: 10, letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(247,245,241,.65)", marginTop: 10 }}>Direct owner oversight &amp; craft</div>
          </div>
          <div style={{ padding: "26px 40px" }}>
            <div style={{ fontFamily: "var(--font-sans), sans-serif", fontWeight: 500, fontSize: 34, lineHeight: 1 }}>1</div>
            <div style={{ fontWeight: 300, fontSize: 10, letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(247,245,241,.65)", marginTop: 10 }}>Fixed, itemised written quote</div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES / CRAFT (2x2 Uniform Grid) ===== */}
      <section id="craft" style={{ background: "#0b0a09", padding: "160px 56px 140px" }}>
        <div className="reveal" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 48, marginBottom: 72, flexWrap: "wrap" }}>
          <div>
            <div style={eyebrow}>I / Our craft</div>
            <h2 className="h2" style={{ margin: 0, fontFamily: "var(--font-display), serif", fontWeight: 300, lineHeight: 1.08, maxWidth: 640 }}>
              Four disciplines, one standard of <span style={{ fontStyle: "italic", color: GOLD }}>precision</span>
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: 380, fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: "rgba(247,245,241,.62)" }}>
            Everything is carefully measured, built, and fitted under the owner&apos;s direct supervision. No subcontracting, no compromises.
          </p>
        </div>

        {/* gridAutoRows: 1fr keeps all four cards identical in height across both rows */}
        <div className="craft-grid stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridAutoRows: "1fr", gap: 28 }}>
          {SERVICES.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="card-hover reveal"
              style={{ border: "1px solid rgba(247,245,241,.1)", background: "#0f0d0b", display: "flex", flexDirection: "column", overflow: "hidden", color: "#f7f5f1" }}
            >
              <div style={{ position: "relative", height: 290, width: "100%", overflow: "hidden" }}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                  sizes="(max-width: 980px) 100vw, 50vw"
                  unoptimized
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(15,13,11,0.92) 100%)" }} />
              </div>
              <div style={{ padding: "32px 36px 36px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ fontWeight: 300, fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>{item.badge}</div>
                <h3 style={{ margin: "0 0 14px", fontFamily: "var(--font-display), serif", fontWeight: 300, fontSize: 32, lineHeight: 1.15 }}>
                  {item.title}
                </h3>
                <p style={{ margin: "0 0 24px", fontWeight: 300, fontSize: 15, lineHeight: 1.7, color: "rgba(247,245,241,.65)", flex: 1 }}>
                  {item.blurb}
                </p>
                <span className="text-btn" style={{ display: "inline-block", fontWeight: 400, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: GOLD, borderBottom: "1px solid rgba(227,175,43,.45)", paddingBottom: 4, width: "fit-content" }}>
                  Learn more &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== SECTION 3: FULL-BLEED PHOTO BANNER (Centered Text Overlay) ===== */}
      <section style={{ position: "relative", background: "#000" }}>
        <div className="band-container" style={{ position: "relative", height: 580, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <Image
            src="/assets/fullbleed-kitchen.jpg"
            alt="Hand-finished kitchen at dusk in Westboro"
            fill
            style={{ objectFit: "cover", filter: "brightness(0.72) contrast(1.08)" }}
            sizes="100vw"
            unoptimized
          />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 100%)" }} />
          
          <div className="reveal" style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 840, padding: "0 32px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <span style={{ width: 32, height: 1, background: GOLD }} />
              <span style={{ fontWeight: 300, fontSize: 11, letterSpacing: ".32em", textTransform: "uppercase", color: GOLD }}>Westboro &middot; Walnut &amp; Stone</span>
              <span style={{ width: 32, height: 1, background: GOLD }} />
            </div>
            <h2 style={{ margin: "0 auto 20px", fontFamily: "var(--font-display), serif", fontWeight: 300, fontSize: "clamp(30px, 4.5vw, 56px)", lineHeight: 1.15, color: "#f7f5f1", textShadow: "0 4px 24px rgba(0,0,0,0.9)" }}>
              Crafted in the workshop.<br />Fitted with <span style={{ fontStyle: "italic", color: GOLD }}>millimetre</span> precision.
            </h2>
            <p style={{ margin: "0 auto", fontWeight: 300, fontSize: 17, lineHeight: 1.7, color: "rgba(247,245,241,.8)", maxWidth: 580, textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
              Built to look stunning and function flawlessly for decades in Ottawa homes.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: WHY US (Full-width Grid with Custom Icons) ===== */}
      <section style={{ background: "#000", padding: "140px 56px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 70 }}>
            <div style={eyebrow}>II / Why SS</div>
            <h2 className="h2" style={{ margin: "0 auto", fontFamily: "var(--font-display), serif", fontWeight: 300, lineHeight: 1.08, maxWidth: 660 }}>
              The difference is what you never have to <span style={{ fontStyle: "italic", color: GOLD }}>chase</span>
            </h2>
          </div>
          <div className="why-subgrid stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 28 }}>
            {WHY_US.map((w) => (
              <div key={w.title} className="card-hover reveal" style={{ border: "1px solid rgba(247,245,241,.1)", background: "#0c0a08", padding: "40px 30px 36px", display: "flex", flexDirection: "column" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(227,175,43,.08)", border: "1px solid rgba(227,175,43,.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 26 }}>
                  {w.icon}
                </div>
                <div style={{ fontFamily: "var(--font-display), serif", fontWeight: 400, fontSize: 24, marginBottom: 12, lineHeight: 1.25 }}>{w.title}</div>
                <p style={{ margin: 0, fontWeight: 300, fontSize: 14.5, lineHeight: 1.7, color: "rgba(247,245,241,.62)" }}>{w.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS — TIMELINE ===== */}
      <section id="process" style={{ background: "#0b0a09", padding: "130px 56px" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 90 }}>
          <div style={eyebrow}>III / How it works</div>
          <h2 className="h2" style={{ margin: "0 auto", fontFamily: "var(--font-display), serif", fontWeight: 300, lineHeight: 1.08, maxWidth: 700 }}>
            From first conversation to final <span style={{ fontStyle: "italic", color: GOLD }}>polish</span>
          </h2>
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          {/* Connecting rule — sits behind the nodes, fills in on scroll */}
          <div className="timeline-track reveal">
            <span className="timeline-track-fill" />
          </div>

          <div className="timeline-items stagger-children">
            {PROCESS.map((p, idx) => (
              <div key={p.title} className="timeline-item reveal">
                <div className="timeline-node">{p.icon}</div>
                <div className="timeline-body">
                  <span className="timeline-index">0{idx + 1}</span>
                  <h3 style={{ margin: "0 0 10px", fontFamily: "var(--font-display), serif", fontWeight: 400, fontSize: 23 }}>{p.title}</h3>
                  <p style={{ margin: 0, fontWeight: 300, fontSize: 14.5, lineHeight: 1.7, color: "rgba(247,245,241,.6)" }}>{p.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section id="portfolio" style={{ background: "#000", padding: "150px 56px 130px" }}>
        <div className="reveal" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40, marginBottom: 60, flexWrap: "wrap" }}>
          <div>
            <div style={eyebrow}>IV / Portfolio</div>
            <h2 className="h2-xl" style={{ margin: 0, fontFamily: "var(--font-display), serif", fontWeight: 300, lineHeight: 0.98, letterSpacing: "-.02em" }}>
              Recent <span style={{ fontStyle: "italic", color: GOLD }}>work</span>
            </h2>
          </div>
          <a href="#quote" className="outline-btn" style={{ fontWeight: 400, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "#f7f5f1", border: "1px solid rgba(227,175,43,.5)", padding: "17px 30px" }}>
            Request a quote
          </a>
        </div>

        <div className="portfolio-grid stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridAutoRows: 280, gap: 22 }}>
          {PORTFOLIO.map((p) => (
            <div key={p.label} className="gallery-tile reveal-scale" style={{ gridRow: p.big ? "span 2" : undefined, position: "relative", border: "1px solid rgba(247,245,241,.1)", overflow: "hidden" }}>
              <Image
                src={p.image}
                alt={p.label}
                fill
                style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                sizes="(max-width: 980px) 100vw, 33vw"
                unoptimized
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.85) 100%)" }} />
              <div style={{ position: "absolute", left: 24, bottom: 22, fontWeight: 300, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "#f7f5f1", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                {p.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS (GOOGLE REVIEWS - Readable Sans-Serif Font & Enlarged Avatars) ===== */}
      <section style={{ background: "#0b0a09", padding: "104px 56px 116px" }}>
        <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, marginBottom: 64, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <GoogleLogo size={28} />
            <div>
              <div style={{ fontWeight: 400, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", color: GOLD }}>V / Verified Google Reviews</div>
              <div style={{ fontWeight: 300, fontSize: 14, color: "rgba(247,245,241,.7)", marginTop: 2 }}>Real feedback from Ottawa homeowners</div>
            </div>
          </div>
          <a
            href={COMPANY.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid rgba(227,175,43,.4)",
              background: "rgba(227,175,43,.06)",
              padding: "10px 20px",
              color: "#f7f5f1",
              fontSize: 12,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              transition: "all 0.25s ease",
            }}
            className="outline-btn"
          >
            <GoogleLogo size={16} />
            <span>5.0 ★ on Google Maps &rarr;</span>
          </a>
        </div>

        <div className="reviews-grid stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
          {REVIEWS.map((r) => (
            <div key={r.name} className="card-hover reveal" style={{ border: "1px solid rgba(247,245,241,.1)", background: "#0f0d0b", padding: "36px 32px", display: "flex", flexDirection: "column", position: "relative" }}>
              {/* Google Verified Badge */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <GoogleLogo size={18} />
                  <span style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(247,245,241,.6)" }}>Google Review</span>
                </div>
                <div style={{ color: GOLD, fontSize: 13, letterSpacing: 2 }}>★★★★★</div>
              </div>

              {/* Review Text - Clean Readable Sans-Serif Font */}
              <p style={{ margin: "0 0 28px", fontFamily: "var(--font-sans), sans-serif", fontWeight: 300, fontSize: 15.5, lineHeight: 1.75, color: "rgba(247,245,241,.88)", flex: 1 }}>
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Reviewer Profile - Enlarged Initial Avatar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", borderTop: "1px solid rgba(247,245,241,.08)", paddingTop: 18, flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#1c1915", border: "1.5px solid rgba(227,175,43,.45)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, color: GOLD, fontWeight: 600, boxShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 400, fontSize: 15, color: "#f7f5f1" }}>{r.name}</div>
                    <div style={{ fontWeight: 300, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(247,245,241,.45)", marginTop: 2 }}>{r.tag}</div>
                  </div>
                </div>

                <a
                  href={r.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-btn"
                  style={{ fontSize: 11, color: GOLD, letterSpacing: ".1em", textTransform: "uppercase", borderBottom: "1px solid rgba(227,175,43,.4)", paddingBottom: 2 }}
                >
                  View on Google ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PULL QUOTE ===== */}
      <section style={{ background: "#000", padding: "160px 56px 150px" }}>
        <div className="reveal" style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
          <span style={{ display: "block", width: 64, height: 1, background: GOLD, margin: "0 auto 42px" }} />
          <p className="pull-quote" style={{ margin: 0, fontFamily: "var(--font-display), serif", fontWeight: 300, lineHeight: 1.32, letterSpacing: "-.01em", color: "#f7f5f1" }}>
            There is no such thing as a small <span style={{ fontStyle: "italic", color: GOLD }}>detail</span>. There is only the one someone will notice every morning for twenty years.
          </p>
          <div style={{ marginTop: 40, fontWeight: 300, fontSize: 10.5, letterSpacing: ".32em", textTransform: "uppercase", color: "rgba(247,245,241,.5)" }}>
            &mdash; Owner &amp; Lead Craftsman, {COMPANY.short}
          </div>
        </div>
      </section>

      {/* ===== ABOUT THE OWNER / THE ATELIER ===== */}
      <section id="atelier" style={{ background: "#080706", padding: "130px 56px", borderTop: "1px solid rgba(247,245,241,.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal" style={{ maxWidth: 660, marginBottom: 54 }}>
            <div style={eyebrow}>VI / The atelier &amp; founder</div>
            <h2 className="h2" style={{ margin: "0 0 20px", fontFamily: "var(--font-display), serif", fontWeight: 300, lineHeight: 1.08 }}>
              Craftsmanship led by the <span style={{ fontStyle: "italic", color: GOLD }}>maker</span>
            </h2>
            <p style={{ margin: 0, fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: "rgba(247,245,241,.65)" }}>
              Founded 3 months ago in Ottawa with a clear standard: no sales reps, no layers of bureaucracy, and no subcontracted labor.
            </p>
          </div>

          <div className="craft-grid atelier-card reveal-scale" style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 52, alignItems: "center", border: "1px solid rgba(227,175,43,.2)", background: "#0c0a08", padding: "40px" }}>
            <div className="atelier-portrait" style={{ position: "relative", height: 420, border: "1px solid rgba(247,245,241,.1)", overflow: "hidden" }}>
              <Image
                src="/assets/owner-portrait.jpg"
                alt="Owner and Master Craftsman"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 980px) 100vw, 360px"
                unoptimized
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.85) 100%)" }} />
              <div style={{ position: "absolute", bottom: 18, left: 20 }}>
                <div style={{ fontFamily: "var(--font-display), serif", fontWeight: 400, fontSize: 24, color: "#f7f5f1" }}>The Owner</div>
                <div style={{ fontWeight: 300, fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", color: GOLD, marginTop: 4 }}>Owner &amp; Lead Carpenter</div>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 300, fontSize: 10.5, letterSpacing: ".3em", textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>Direct Owner Involvement</div>
              <h3 style={{ margin: "0 0 20px", fontFamily: "var(--font-display), serif", fontWeight: 300, fontSize: 34, lineHeight: 1.2 }}>
                &ldquo;Every cut and joint is a reflection of my personal name on the work.&rdquo;
              </h3>
              <p style={{ margin: "0 0 20px", fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: "rgba(247,245,241,.7)" }}>
                When you hire SS Carpentry and Renovations, you work directly with the owner from the initial on-site consultation to the final handover. Whether it&apos;s crafting custom walnut floating shelves, designing bespoke cabinetry, or executing a comprehensive home renovation, you receive direct communication, honest timelines, and uncompromising craftsmanship.
              </p>
              <div className="statbar atelier-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, borderTop: "1px solid rgba(247,245,241,.1)", paddingTop: 24, marginTop: 28 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-display), serif", fontSize: 26, color: GOLD }}>5.0 ★</div>
                  <div style={{ fontSize: 10.5, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(247,245,241,.5)", marginTop: 4 }}>Flawless Rating</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display), serif", fontSize: 26, color: GOLD }}>3 Months</div>
                  <div style={{ fontSize: 10.5, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(247,245,241,.5)", marginTop: 4 }}>Ottawa Established</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display), serif", fontSize: 26, color: GOLD }}>1-on-1</div>
                  <div style={{ fontSize: 10.5, letterSpacing: ".15em", textTransform: "uppercase", color: "rgba(247,245,241,.5)", marginTop: 4 }}>Owner Dedicated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUOTE FORM (with Google Maps & Contact Icons) ===== */}
      <section id="quote" ref={quoteRef} style={{ background: "#0b0a09", padding: "130px 56px", borderTop: "1px solid rgba(227,175,43,.25)" }}>
        <div className="quote-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 88, alignItems: "start", maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal-left">
            <div style={eyebrow}>VII / Request a quote</div>
            <h2 className="h2" style={{ margin: "0 0 26px", fontFamily: "var(--font-display), serif", fontWeight: 300, lineHeight: 1.04 }}>
              Tell us what you have in <span style={{ fontStyle: "italic", color: GOLD }}>mind</span>.
            </h2>
            <p style={{ margin: "0 0 36px", fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: "rgba(247,245,241,.66)", maxWidth: 440 }}>
              Send us the basics and the owner will personally review your project and get back within one working day. No cost, and zero sales pressure.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[
                "Direct reply from our lead carpenter within one working day",
                "Drawings and samples before you commit",
                "One fixed, itemised price",
              ].map((line) => (
                <div key={line} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ width: 22, height: 1, background: GOLD }} />
                  <span style={{ fontWeight: 300, fontSize: 15, color: "rgba(247,245,241,.85)" }}>{line}</span>
                </div>
              ))}
            </div>

            {/* Contact Details with Icons */}
            <div style={{ marginTop: 38, borderTop: "1px solid rgba(247,245,241,.14)", paddingTop: 26, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ marginTop: 2, flexShrink: 0 }}>
                  <PinIcon size={18} />
                </div>
                <span style={{ fontWeight: 300, fontSize: 14.5, color: "rgba(247,245,241,.85)", lineHeight: 1.5 }}>{COMPANY.address}</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ marginTop: 2, flexShrink: 0 }}>
                  <PhoneIcon size={18} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {COMPANY.phones.map((p) => (
                    <a key={p.href} href={p.href} style={{ fontWeight: 300, fontSize: 14.5, color: "rgba(247,245,241,.85)" }}>
                      {p.display}
                    </a>
                  ))}
                  <span style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: GOLD }}>
                    Call for a free estimate
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flexShrink: 0 }}>
                  <MailIcon size={18} />
                </div>
                <a href={`mailto:${COMPANY.email}`} style={{ fontWeight: 300, fontSize: 14.5, color: "rgba(247,245,241,.85)" }}>{COMPANY.email}</a>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div style={{ marginTop: 32, overflow: "hidden", border: "1px solid rgba(227,175,43,.3)", borderRadius: 2 }}>
              <iframe
                title="SS Carpentry Location Map"
                src="https://maps.google.com/maps?q=3008%20Travertine%20Way,%20Ottawa,%20ON%20K2J%207G4,%20Canada&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="220"
                style={{
                  border: 0,
                  display: "block",
                  filter: "invert(92%) hue-rotate(180deg) brightness(85%) contrast(110%)",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={submit} className="quote-form-card reveal-right" style={{ background: "#000", border: "1px solid rgba(247,245,241,.14)", padding: "44px 40px" }}>
              <div style={{ marginBottom: 26 }}>
                <label style={{ display: "block", fontWeight: 300, fontSize: 10, letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(247,245,241,.5)", marginBottom: 11 }}>Your name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your full name"
                  style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(247,245,241,.24)", color: "#f7f5f1", fontSize: 16, fontWeight: 300, padding: "12px 2px", outline: "none" }}
                />
              </div>
              <div style={{ marginBottom: 26 }}>
                <label style={{ display: "block", fontWeight: 300, fontSize: 10, letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(247,245,241,.5)", marginBottom: 11 }}>Email</label>
                <input
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  type="email"
                  placeholder="you@email.com"
                  style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(247,245,241,.24)", color: "#f7f5f1", fontSize: 16, fontWeight: 300, padding: "12px 2px", outline: "none" }}
                />
              </div>
              <div style={{ marginBottom: 26 }}>
                <label style={{ display: "block", fontWeight: 300, fontSize: 10, letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(247,245,241,.5)", marginBottom: 11 }}>What are you planning?</label>
                <select
                  value={form.ptype}
                  onChange={(e) => setForm((f) => ({ ...f, ptype: e.target.value }))}
                  style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(247,245,241,.24)", color: "#f7f5f1", fontSize: 16, fontWeight: 300, padding: "12px 2px", outline: "none" }}
                >
                  <option value="" style={{ background: "#000" }}>Select one</option>
                  <option value="kitchen" style={{ background: "#000" }}>Bespoke kitchen</option>
                  <option value="joinery" style={{ background: "#000" }}>Staircase or custom joinery</option>
                  <option value="wardrobes" style={{ background: "#000" }}>Fitted wardrobes</option>
                  <option value="renovation" style={{ background: "#000" }}>Full renovation</option>
                  <option value="deck" style={{ background: "#000" }}>Deck &amp; custom shelving</option>
                  <option value="unsure" style={{ background: "#000" }}>Not sure yet</option>
                </select>
              </div>
              <div style={{ marginBottom: 34 }}>
                <label style={{ display: "block", fontWeight: 300, fontSize: 10, letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(247,245,241,.5)", marginBottom: 11 }}>A little detail</label>
                <textarea
                  value={form.msg}
                  onChange={(e) => setForm((f) => ({ ...f, msg: e.target.value }))}
                  rows={4}
                  placeholder="The room, roughly when you would like to start, materials or ideas you already have in mind."
                  style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(247,245,241,.24)", color: "#f7f5f1", fontSize: 16, fontWeight: 300, padding: "12px 2px", outline: "none", resize: "vertical" }}
                />
              </div>
              <button type="submit" className="gold-btn" style={{ width: "100%", cursor: "pointer", background: GOLD, color: "#0a0908", border: "none", fontFamily: "var(--font-sans), sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", padding: 21 }}>
                Request my quote
              </button>
              <p style={{ margin: "20px 0 0", textAlign: "center", fontWeight: 300, fontSize: 12, color: "rgba(247,245,241,.4)" }}>Your details are used only for this quote and nothing else.</p>
            </form>
          ) : (
            <div style={{ background: "#000", border: "1px solid rgba(227,175,43,.55)", padding: "70px 44px", textAlign: "center", minHeight: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 64, height: 64, border: `1px solid ${GOLD}`, color: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 30 }}>&#10003;</div>
              <h3 style={{ margin: "0 0 16px", fontFamily: "var(--font-display), serif", fontWeight: 300, fontSize: 38 }}>Thank you.</h3>
              <p style={{ margin: 0, fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: "rgba(247,245,241,.66)", maxWidth: 340 }}>
                We have received your project details. The owner will review them and reach out within one working day.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{ background: "#000", padding: "130px 56px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={eyebrow}>VIII / Common Questions</div>
            <h2 style={{ margin: 0, fontFamily: "var(--font-display), serif", fontWeight: 300, fontSize: 56, lineHeight: 1.08 }}>The questions we hear most</h2>
          </div>
          <div className="stagger-children" style={{ borderTop: "1px solid rgba(247,245,241,.14)" }}>
            {FAQS.map((f, i) => (
              <div key={f.q} className="reveal">
                <div onClick={() => toggleFaq(i)} style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "30px 4px", borderBottom: "1px solid rgba(247,245,241,.14)" }}>
                  <span style={{ fontFamily: "var(--font-display), serif", fontWeight: 400, fontSize: 25 }}>{f.q}</span>
                  <span style={{ fontFamily: "var(--font-display), serif", fontSize: 28, color: GOLD, lineHeight: 1 }}>{faqOpen[i] ? "−" : "+"}</span>
                </div>
                {faqOpen[i] && (
                  <div style={{ padding: "4px 4px 30px", borderBottom: "1px solid rgba(247,245,241,.14)" }}>
                    <p style={{ margin: 0, fontWeight: 300, fontSize: 16, lineHeight: 1.8, color: "rgba(247,245,241,.66)", maxWidth: 680 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="reveal" style={{ textAlign: "center", marginTop: 60 }}>
            <GoldButton onClick={scrollToForm} style={{ padding: "21px 46px" }}>Request a quote</GoldButton>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
