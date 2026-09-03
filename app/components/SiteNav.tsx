"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { COMPANY, PRIMARY_PHONE } from "../data/company";

import { GOLD } from "../data/theme";

const linkStyle = {
  color: "rgba(247,245,241,.75)",
  fontWeight: 300,
  fontSize: 12,
  letterSpacing: ".18em",
  textTransform: "uppercase" as const,
};

const NAV_LINKS = [
  { href: "/#craft", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About us" },
];

/**
 * Shared across the home page and every service page.
 *
 * Anchors are absolute (`/#craft`) so they work from a service page too —
 * a bare `#craft` would look for the section on the current page and do nothing.
 */
export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open, and close it if the
  // viewport grows back past the breakpoint the drawer exists for.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 56px",
        height: 88,
        background: "rgba(0,0,0,.88)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(227,175,43,.18)",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center" }} onClick={() => setMobileOpen(false)}>
        <Image
          src="/assets/ss-logo-cropped.png"
          alt={COMPANY.name}
          height={68}
          width={68}
          style={{ height: 64, width: "auto", objectFit: "contain", display: "block" }}
          priority
          unoptimized
        />
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 38 }} className="nav-links">
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} style={linkStyle}>
            {l.label}
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {/* Friction guide Stage 5: a tappable number in the header on every page. */}
        <a
          href={PRIMARY_PHONE.href}
          className="nav-call"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid rgba(227,175,43,.45)",
            color: "#f7f5f1",
            fontWeight: 400,
            fontSize: 11,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            padding: "13px 20px",
            minHeight: 44,
            boxSizing: "border-box",
            transition: "all .25s ease",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Free estimate
        </a>

        <Link
          href="/contact"
          className="gold-btn nav-quote-cta"
          style={{
            background: GOLD,
            color: "#0a0908",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            padding: "14px 26px",
            minHeight: 44,
            boxSizing: "border-box",
            display: "inline-flex",
            alignItems: "center",
            transition: "background .25s",
          }}
        >
          Request a quote
        </Link>

        <button
          type="button"
          className="nav-hamburger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          style={{
            display: "none",
            width: 44,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "1px solid rgba(227,175,43,.4)",
            color: "#f7f5f1",
            cursor: "pointer",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav-drawer"
        className="nav-drawer"
        hidden={!mobileOpen}
        style={{
          position: "fixed",
          top: "var(--nav-height, 88px)",
          left: 0,
          right: 0,
          bottom: 0,
          background: "#0a0908",
          borderTop: "1px solid rgba(227,175,43,.18)",
          padding: "28px 24px",
          display: mobileOpen ? "flex" : "none",
          flexDirection: "column",
          gap: 4,
          overflowY: "auto",
        }}
      >
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setMobileOpen(false)}
            style={{
              padding: "16px 4px",
              fontSize: 15,
              fontWeight: 300,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "#f7f5f1",
              borderBottom: "1px solid rgba(247,245,241,.08)",
              minHeight: 44,
              display: "flex",
              alignItems: "center",
            }}
          >
            {l.label}
          </Link>
        ))}
        <a
          href={PRIMARY_PHONE.href}
          style={{
            marginTop: 20,
            textAlign: "center",
            border: "1px solid rgba(227,175,43,.45)",
            color: "#f7f5f1",
            fontSize: 13,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            padding: "16px",
            minHeight: 44,
          }}
        >
          Call {PRIMARY_PHONE.display}
        </a>
        <Link
          href="/contact"
          onClick={() => setMobileOpen(false)}
          className="gold-btn"
          style={{
            marginTop: 12,
            textAlign: "center",
            background: GOLD,
            color: "#0a0908",
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            padding: "16px",
            minHeight: 44,
          }}
        >
          Request a quote
        </Link>
      </div>
    </nav>
  );
}
