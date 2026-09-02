import Image from "next/image";
import Link from "next/link";
import { COMPANY, PRIMARY_PHONE } from "../data/company";

const GOLD = "#e3af2b";

const linkStyle = {
  color: "rgba(247,245,241,.75)",
  fontWeight: 300,
  fontSize: 12,
  letterSpacing: ".18em",
  textTransform: "uppercase" as const,
};

/**
 * Shared across the home page and every service page.
 *
 * Anchors are absolute (`/#craft`) so they work from a service page too —
 * a bare `#craft` would look for the section on the current page and do nothing.
 */
export function SiteNav() {
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
      <Link href="/" style={{ display: "flex", alignItems: "center" }}>
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
        <Link href="/#craft" style={linkStyle}>Services</Link>
        <Link href="/#process" style={linkStyle}>Process</Link>
        <Link href="/gallery" style={linkStyle}>Gallery</Link>
        <Link href="/about" style={linkStyle}>About us</Link>
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
            transition: "all .25s ease",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Free estimate
        </a>

        <Link
          href="/#quote"
          className="gold-btn"
          style={{
            background: GOLD,
            color: "#0a0908",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            padding: "14px 26px",
            transition: "background .25s",
          }}
        >
          Request a quote
        </Link>
      </div>
    </nav>
  );
}
