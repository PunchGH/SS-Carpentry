import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "../../components/SiteNav";
import { SiteFooter } from "../../components/SiteFooter";
import { ServiceFaqList } from "../../components/ServiceFaq";
import { COMPANY, PRIMARY_PHONE } from "../../data/company";
import {
  LEGAL_BASEMENT_META,
  LEGAL_BASEMENT_CLAIMS,
  CORE_FEASIBILITY_FACTORS,
  COMMON_BLOCKERS,
  COST_DRIVERS,
  LEGAL_BASEMENT_FAQS,
} from "../../data/guides/legal-basement";
import { LegalBasementChecker } from "./LegalBasementChecker";

import { GOLD } from "../../data/theme";

export const metadata: Metadata = {
  title: "Ottawa Legal Basement Apartment Guide: Requirements, Zoning & Code",
  description:
    "Verified Ontario Building Code (O. Reg. 163/24) thresholds, City of Ottawa dual zoning rules (By-laws 2008-250 & 2026-50), egress sizes, and interactive qualification checker.",
  alternates: {
    canonical: "/guides/legal-basement-ottawa",
  },
  openGraph: {
    title: "Ottawa Legal Basement Apartment Guide | SS Carpentry and Renovations",
    description:
      "Can your basement become a legal secondary dwelling unit? Sourced building code dimensions, dual by-law zoning rules, and self-qualification checker.",
    url: "/guides/legal-basement-ottawa",
    type: "article",
    siteName: COMPANY.name,
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 800,
        type: "image/jpeg",
        alt: "Ottawa Legal Basement Apartment Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ottawa Legal Basement Apartment Guide | SS Carpentry",
    description:
      "Verified ceiling heights, egress windows, fire separation, and Ottawa zoning by-law rules for secondary suites.",
    images: ["/assets/og-image.jpg"],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://sscarpentryandrenovations.com/guides/legal-basement-ottawa#article",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://sscarpentryandrenovations.com/#website",
        name: COMPANY.name,
        url: "https://sscarpentryandrenovations.com",
      },
      headline: "Ottawa Legal Basement Apartment Guide: Requirements, Zoning & Building Code",
      description:
        "Comprehensive regulatory breakdown of Ontario Building Code and City of Ottawa requirements for legal secondary dwelling units.",
      datePublished: "2026-09-02",
      dateModified: LEGAL_BASEMENT_META.lastReviewed,
      mainEntityOfPage: "https://sscarpentryandrenovations.com/guides/legal-basement-ottawa",
      author: {
        "@type": "Organization",
        name: COMPANY.name,
        url: "https://sscarpentryandrenovations.com",
      },
      publisher: {
        "@type": "Organization",
        name: COMPANY.name,
        logo: {
          "@type": "ImageObject",
          url: "https://sscarpentryandrenovations.com/assets/ss-logo-cropped.png",
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://sscarpentryandrenovations.com/guides/legal-basement-ottawa#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://sscarpentryandrenovations.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Guides",
          item: "https://sscarpentryandrenovations.com/guides/legal-basement-ottawa",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Ottawa Legal Basement Apartment Guide",
          item: "https://sscarpentryandrenovations.com/guides/legal-basement-ottawa",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://sscarpentryandrenovations.com/guides/legal-basement-ottawa#faq",
      mainEntity: LEGAL_BASEMENT_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ],
};

const h2Style = {
  margin: "0 0 24px",
  fontFamily: "var(--font-display), serif",
  fontWeight: 300,
  fontSize: "clamp(30px, 4.2vw, 48px)",
  lineHeight: 1.1,
};

export default function LegalBasementGuidePage() {
  return (
    <div style={{ width: "100%", overflowX: "hidden", background: "#000" }}>
      {/* Structural JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <SiteNav />
      <div style={{ height: 88 }} />

      {/* ===== HERO & ABOVE THE FOLD ===== */}
      <header
        style={{
          background: "linear-gradient(180deg, #0b0a09 0%, #000 100%)",
          padding: "clamp(56px, 8vw, 96px) clamp(20px, 5vw, 56px) 64px",
          borderBottom: "1px solid rgba(227, 175, 43, 0.16)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 11,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "rgba(247, 245, 241, 0.55)",
              marginBottom: 24,
            }}
          >
            <Link href="/" style={{ color: "rgba(247, 245, 241, 0.55)" }}>
              Home
            </Link>
            <span>/</span>
            <span>Guides</span>
            <span>/</span>
            <span style={{ color: GOLD }}>Ottawa Legal Basement Apartment Guide</span>
          </nav>

          {/* Eyebrow #1 (Eyebrow restraint: 1 of max 3 on page) */}
          <div
            style={{
              fontSize: 11,
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 16,
              fontWeight: 400,
            }}
          >
            Regulatory Guide &amp; Technical Breakdown
          </div>

          <h1
            style={{
              margin: "0 0 24px",
              fontFamily: "var(--font-display), serif",
              fontWeight: 300,
              fontSize: "clamp(36px, 5.8vw, 76px)",
              lineHeight: 1.05,
              letterSpacing: "-.015em",
              maxWidth: 1050,
            }}
          >
            Ottawa Legal Basement Apartment Guide:{" "}
            <span style={{ fontStyle: "italic", color: GOLD }}>Code, Zoning &amp; Feasibility</span>
          </h1>

          <p
            style={{
              margin: "0 0 36px",
              fontWeight: 300,
              fontSize: "clamp(16px, 1.8vw, 19px)",
              lineHeight: 1.7,
              color: "rgba(247, 245, 241, 0.8)",
              maxWidth: 860,
            }}
          >
            A legal secondary dwelling unit is an asset; an unpermitted suite is an insurable and
            legal liability. This guide cites the mandatory 2024 Ontario Building Code (O. Reg.
            163/24) and the City of Ottawa dual by-law zoning condition (By-laws 2008-250 and
            2026-50) so homeowners can evaluate feasibility with primary sources before investing in
            architectural drawings.
          </p>

          {/* Prominent Disclaimer Box (Above the Fold) */}
          <div
            style={{
              background: "#0f0d0b",
              border: "1px solid rgba(227, 175, 43, 0.4)",
              padding: "20px 24px",
              marginBottom: 44,
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              maxWidth: 960,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "rgba(227, 175, 43, 0.15)",
                border: "1px solid rgba(227, 175, 43, 0.5)",
                color: GOLD,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              !
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginBottom: 6,
                  fontWeight: 500,
                }}
              >
                Official Regulatory Notice · Last Reviewed: {LEGAL_BASEMENT_META.lastReviewed}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: "rgba(247, 245, 241, 0.8)",
                }}
              >
                {LEGAL_BASEMENT_META.disclaimer} Applications deemed complete on or after March 11,
                2026 are subject to the City of Ottawa dual by-law rule, where the most restrictive
                provisions from both By-law 2008-250 and By-law 2026-50 apply. Official zoning
                inquiries: {LEGAL_BASEMENT_META.authorities.ottawaDio.phone} (
                {LEGAL_BASEMENT_META.authorities.ottawaDio.email}).
              </p>
            </div>
          </div>

          {/* Short Answer Summary Box (The 5 Core Factors) */}
          <div
            style={{
              background: "#0b0a09",
              border: "1px solid rgba(247, 245, 241, 0.12)",
              padding: "clamp(24px, 3.5vw, 36px)",
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  color: "rgba(247, 245, 241, 0.55)",
                  marginBottom: 6,
                }}
              >
                Executive Summary
              </div>
              <h2
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display), serif",
                  fontWeight: 300,
                  fontSize: "clamp(24px, 3vw, 32px)",
                  color: "#f7f5f1",
                }}
              >
                The 5 Core Factors That Decide Legal Feasibility
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                gap: 20,
              }}
            >
              {CORE_FEASIBILITY_FACTORS.map((factor) => (
                <div
                  key={factor.num}
                  style={{
                    background: "#0f0d0b",
                    border: "1px solid rgba(247, 245, 241, 0.08)",
                    padding: "20px 18px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display), serif",
                        fontSize: 14,
                        color: "rgba(227, 175, 43, 0.6)",
                      }}
                    >
                      {factor.num}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "rgba(247, 245, 241, 0.4)",
                      }}
                    >
                      {factor.citation}
                    </span>
                  </div>
                  <h3
                    style={{
                      margin: "0 0 4px",
                      fontFamily: "var(--font-display), serif",
                      fontWeight: 400,
                      fontSize: 19,
                      color: "#f7f5f1",
                    }}
                  >
                    {factor.title}
                  </h3>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: GOLD,
                      marginBottom: 10,
                    }}
                  >
                    {factor.stat}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      fontWeight: 300,
                      lineHeight: 1.55,
                      color: "rgba(247, 245, 241, 0.6)",
                    }}
                  >
                    {factor.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ===== INTERACTIVE QUALIFICATION CHECKER ISLAND ===== */}
      <section
        id="checker"
        style={{
          background: "#000",
          padding: "clamp(64px, 8vw, 100px) clamp(20px, 5vw, 56px)",
          borderBottom: "1px solid rgba(247, 245, 241, 0.1)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ ...h2Style, margin: "0 0 16px" }}>
              Check Your Basement’s <span style={{ fontStyle: "italic", color: GOLD }}>Qualification</span>
            </h2>
            <p
              style={{
                margin: "0 auto",
                fontWeight: 300,
                fontSize: 16.5,
                lineHeight: 1.7,
                color: "rgba(247, 245, 241, 0.7)",
                maxWidth: 680,
              }}
            >
              Answer 6 targeted structural and zoning questions. No email or contact details
              required. You receive an immediate technical feasibility outcome.
            </p>
          </div>

          <LegalBasementChecker />
        </div>
      </section>

      {/* ===== 6 DEEP REQUIREMENT SECTIONS ===== */}
      <section
        id="requirements"
        style={{
          background: "#0b0a09",
          padding: "clamp(72px, 9vw, 112px) clamp(20px, 5vw, 56px)",
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          {/* Eyebrow #2 (Eyebrow restraint: 2 of max 3 on page) */}
          <div
            style={{
              fontSize: 11,
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 16,
              fontWeight: 400,
            }}
          >
            Statutory Code Analysis
          </div>

          <h2 style={h2Style}>
            The 6 Legal Requirements: <span style={{ fontStyle: "italic", color: GOLD }}>Code Standards &amp; Ottawa Rules</span>
          </h2>

          <p
            style={{
              margin: "0 0 56px",
              fontWeight: 300,
              fontSize: 17,
              lineHeight: 1.75,
              color: "rgba(247, 245, 241, 0.75)",
              maxWidth: 820,
            }}
          >
            Every secondary dwelling unit in Ontario must comply with the 2024 Ontario Building Code
            (O. Reg. 163/24), which became mandatory for all permit applications on April 1, 2025.
            Below are the exact statutory dimensions, compliance alternatives, and municipal
            stipulations enforced by the City of Ottawa.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
            {/* REQUIREMENT 1: CEILING HEIGHT */}
            <article
              id="ceiling-height"
              style={{
                background: "#0f0d0b",
                border: "1px solid rgba(247, 245, 241, 0.1)",
                padding: "clamp(24px, 4vw, 40px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: 18,
                    color: "rgba(227, 175, 43, 0.6)",
                  }}
                >
                  Section 01
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: GOLD,
                    background: "rgba(227, 175, 43, 0.08)",
                    border: "1px solid rgba(227, 175, 43, 0.3)",
                    padding: "4px 10px",
                  }}
                >
                  OBC Div B, Table 11.5.1.1.C., CA 102
                </span>
              </div>

              <h3
                style={{
                  margin: "0 0 18px",
                  fontFamily: "var(--font-display), serif",
                  fontWeight: 400,
                  fontSize: "clamp(24px, 3vw, 32px)",
                  color: "#f7f5f1",
                }}
              >
                1. Ceiling Height: The 1.95 m (6&apos; 4¾&quot;) Rule
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 28,
                  marginBottom: 24,
                }}
              >
                <div>
                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: 13,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: GOLD,
                      fontWeight: 500,
                    }}
                  >
                    Statutory Rule &amp; Dimensions
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(247, 245, 241, 0.75)",
                    }}
                  >
                    The Ontario Building Code requires a minimum clear ceiling height of{" "}
                    <strong style={{ color: "#f7f5f1" }}>1.95 m (6&apos; 4¾&quot;)</strong> across the
                    entire required floor area of the basement second unit, including the continuous
                    route of travel to the exit door. By comparison, second units located in an attic
                    require ≥50% of the required floor area at{" "}
                    <strong style={{ color: "#f7f5f1" }}>2.03 m (6&apos; 8&quot;)</strong>, and areas
                    under 1.4 m (4&apos; 7&quot;) cannot be counted.
                  </p>
                </div>

                <div>
                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: 13,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: GOLD,
                      fontWeight: 500,
                    }}
                  >
                    Bulkheads, Ducts &amp; Structural Beams
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(247, 245, 241, 0.75)",
                    }}
                  >
                    Headroom is measured to the lowest obstruction. If main supply trunk lines,
                    plumbing drains, or steel structural beams drop below 1.95 m, they cannot cross
                    required exit routes or primary living areas without specific compliance
                    alternatives. Re-routing ducts into wide flat plenums or joist bays is a standard
                    carpentry solution.
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "#0b0a09",
                  borderLeft: `2px solid ${GOLD}`,
                  padding: "14px 18px",
                  fontSize: 13.5,
                  fontWeight: 300,
                  color: "rgba(247, 245, 241, 0.7)",
                }}
              >
                <strong style={{ color: "#f7f5f1" }}>When the ceiling is too low:</strong> If the
                foundation slab does not provide 1.95 m, the concrete floor must be lowered via
                bench-footing or underpinning foundation footings. This is major structural work that
                fundamentally changes project scope.{" "}
                <a
                  href="https://www.ontario.ca/page/add-second-unit-your-house"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: GOLD, textDecoration: "underline" }}
                >
                  Verify Ontario Guidance &rarr;
                </a>
              </div>
            </article>

            {/* REQUIREMENT 2: EGRESS WINDOWS */}
            <article
              id="egress-windows"
              style={{
                background: "#0f0d0b",
                border: "1px solid rgba(247, 245, 241, 0.1)",
                padding: "clamp(24px, 4vw, 40px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: 18,
                    color: "rgba(227, 175, 43, 0.6)",
                  }}
                >
                  Section 02
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: GOLD,
                    background: "rgba(227, 175, 43, 0.08)",
                    border: "1px solid rgba(227, 175, 43, 0.3)",
                    padding: "4px 10px",
                  }}
                >
                  OBC Div B, Table 11.5.1.1.C., CA 136
                </span>
              </div>

              <h3
                style={{
                  margin: "0 0 18px",
                  fontFamily: "var(--font-display), serif",
                  fontWeight: 400,
                  fontSize: "clamp(24px, 3vw, 32px)",
                  color: "#f7f5f1",
                }}
              >
                2. Bedroom Egress Windows: Clear Opening &amp; Well Drainage
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 28,
                  marginBottom: 24,
                }}
              >
                <div>
                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: 13,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: GOLD,
                      fontWeight: 500,
                    }}
                  >
                    Minimum Dimensions
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(247, 245, 241, 0.75)",
                    }}
                  >
                    Every basement bedroom must provide an emergency escape window with a clear
                    unobstructed open area of at least{" "}
                    <strong style={{ color: "#f7f5f1" }}>0.38 m² (4.1 sq ft)</strong>. No individual
                    openable dimension (width or height) can be less than{" "}
                    <strong style={{ color: "#f7f5f1" }}>460 mm (18&quot;)</strong>, and the sill
                    height cannot exceed{" "}
                    <strong style={{ color: "#f7f5f1" }}>900 mm (2&apos; 11&quot;)</strong> above the
                    finished floor. Upper-floor second units require height ≥1,060 mm (3&apos; 6&quot;)
                    and width ≥560 mm (1&apos; 10&quot;).
                  </p>
                </div>

                <div>
                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: 13,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: GOLD,
                      fontWeight: 500,
                    }}
                  >
                    Window Wells &amp; Weeping Tile Connection
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(247, 245, 241, 0.75)",
                    }}
                  >
                    If the window opens into an exterior window well, the well must provide at least
                    550 mm (1&apos; 10&quot;) of horizontal clearance in front of the fully open window.
                    The well must contain clean crushed gravel and a vertical drain pipe tied directly
                    into the home&apos;s perimeter foundation drainage (weeping tile) to prevent Ottawa
                    freeze-thaw water pooling.
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "#0b0a09",
                  borderLeft: `2px solid ${GOLD}`,
                  padding: "14px 18px",
                  fontSize: 13.5,
                  fontWeight: 300,
                  color: "rgba(247, 245, 241, 0.7)",
                }}
              >
                <strong style={{ color: "#f7f5f1" }}>Natural Light (Glazing):</strong> In addition to
                emergency egress, Article 9.7.2.3 (Compliance Alternative 107) requires unobstructed
                glazing area of at least 5% of floor area in living and dining rooms, and 2.5% in
                bedrooms. Kitchens, bathrooms, and laundry rooms do not require natural light glazing.
              </div>
            </article>

            {/* REQUIREMENT 3: FIRE SEPARATION */}
            <article
              id="fire-separation"
              style={{
                background: "#0f0d0b",
                border: "1px solid rgba(247, 245, 241, 0.1)",
                padding: "clamp(24px, 4vw, 40px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: 18,
                    color: "rgba(227, 175, 43, 0.6)",
                  }}
                >
                  Section 03
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: GOLD,
                    background: "rgba(227, 175, 43, 0.08)",
                    border: "1px solid rgba(227, 175, 43, 0.3)",
                    padding: "4px 10px",
                  }}
                >
                  OBC Div B, Table 11.5.1.1.C., CA 147, 152, 153
                </span>
              </div>

              <h3
                style={{
                  margin: "0 0 18px",
                  fontFamily: "var(--font-display), serif",
                  fontWeight: 400,
                  fontSize: "clamp(24px, 3vw, 32px)",
                  color: "#f7f5f1",
                }}
              >
                3. Fire Separation: 30 Minutes vs 15 Minutes with Alarms
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 28,
                  marginBottom: 24,
                }}
              >
                <div>
                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: 13,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: GOLD,
                      fontWeight: 500,
                    }}
                  >
                    The Baseline Fire Separation
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(247, 245, 241, 0.75)",
                    }}
                  >
                    The Building Code requires a continuous{" "}
                    <strong style={{ color: "#f7f5f1" }}>30-minute fire separation</strong> between the
                    primary dwelling and the secondary suite, as well as between either suite and any
                    common shared spaces (such as a shared mechanical room, laundry, or entrance
                    vestibule). Doors in these assemblies must be 20-minute fire-rated with automatic
                    closers.
                  </p>
                </div>

                <div>
                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: 13,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: GOLD,
                      fontWeight: 500,
                    }}
                  >
                    Reduced 15-Minute Rating Alternative
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(247, 245, 241, 0.75)",
                    }}
                  >
                    Under Compliance Alternatives 147 and 152, the required fire separation rating can
                    be reduced to{" "}
                    <strong style={{ color: "#f7f5f1" }}>15 minutes</strong> if the whole house is
                    protected with interconnected smoke alarms. A standard compliant assembly cited by
                    the province uses 38×89 mm wood studs, 13 mm drywall on both sides, and mineral
                    fibre insulation tightly fitted between framing members.
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "#0b0a09",
                  borderLeft: `2px solid ${GOLD}`,
                  padding: "14px 18px",
                  fontSize: 13.5,
                  fontWeight: 300,
                  color: "rgba(247, 245, 241, 0.7)",
                }}
              >
                <strong style={{ color: "#f7f5f1" }}>Acoustic Decoupling:</strong> While fire separation
                protects life safety, airborne and impact sound transmission requires dedicated acoustic
                treatment. Resilient channels and dense mineral wool insulation (Roxul Safe&apos;n&apos;Sound)
                in ceiling joist cavities prevent everyday household footfall and vocal transfer.
              </div>
            </article>

            {/* REQUIREMENT 4: ALARMS & ELECTRICAL */}
            <article
              id="alarms-electrical"
              style={{
                background: "#0f0d0b",
                border: "1px solid rgba(247, 245, 241, 0.1)",
                padding: "clamp(24px, 4vw, 40px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: 18,
                    color: "rgba(227, 175, 43, 0.6)",
                  }}
                >
                  Section 04
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: GOLD,
                    background: "rgba(227, 175, 43, 0.08)",
                    border: "1px solid rgba(227, 175, 43, 0.3)",
                    padding: "4px 10px",
                  }}
                >
                  CAN/ULC S531 &amp; ESA Mandatory
                </span>
              </div>

              <h3
                style={{
                  margin: "0 0 18px",
                  fontFamily: "var(--font-display), serif",
                  fontWeight: 400,
                  fontSize: "clamp(24px, 3vw, 32px)",
                  color: "#f7f5f1",
                }}
              >
                4. Interconnected Alarms &amp; Electrical Safety (ESA)
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 28,
                  marginBottom: 24,
                }}
              >
                <div>
                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: 13,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: GOLD,
                      fontWeight: 500,
                    }}
                  >
                    CAN/ULC S531 Strobe Smoke Alarms
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(247, 245, 241, 0.75)",
                    }}
                  >
                    Smoke alarms must comply with CAN/ULC S531 and include visual flashing-light strobe
                    activation (Subsection 9.10.19). They must be hardwired and interconnected across the
                    entire home: installed on every storey, outside sleeping quarters, in each bedroom of
                    the secondary unit, and in common shared corridors. If one sounds, all alarms sound.
                  </p>
                </div>

                <div>
                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: 13,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: GOLD,
                      fontWeight: 500,
                    }}
                  >
                    Carbon Monoxide &amp; Mandatory ESA Inspection
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(247, 245, 241, 0.75)",
                    }}
                  >
                    Carbon monoxide alarms (Articles 9.33.4.1 &amp; 9.33.4.2) are mandatory if the home has
                    a fuel-burning appliance (gas furnace, water heater) or attached garage.
                    Additionally, secondary suite wiring requires a separate electrical permit and a
                    mandatory inspection certificate from the Electrical Safety Authority (ESA:{" "}
                    {LEGAL_BASEMENT_META.authorities.esa.displayPhone}).
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "#0b0a09",
                  borderLeft: `2px solid ${GOLD}`,
                  padding: "14px 18px",
                  fontSize: 13.5,
                  fontWeight: 300,
                  color: "rgba(247, 245, 241, 0.7)",
                }}
              >
                <strong style={{ color: "#f7f5f1" }}>Arc-Fault Protection:</strong> Under the Ontario
                Electrical Safety Code, branch circuits supplying bedroom receptacles require Arc-Fault
                Circuit Interrupters (AFCI). The City building inspector will not issue final occupancy
                without an official ESA Certificate of Inspection.
              </div>
            </article>

            {/* REQUIREMENT 5: OTTAWA ZONING */}
            <article
              id="ottawa-zoning"
              style={{
                background: "#0f0d0b",
                border: "1px solid rgba(247, 245, 241, 0.1)",
                padding: "clamp(24px, 4vw, 40px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: 18,
                    color: "rgba(227, 175, 43, 0.6)",
                  }}
                >
                  Section 05
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: GOLD,
                    background: "rgba(227, 175, 43, 0.08)",
                    border: "1px solid rgba(227, 175, 43, 0.3)",
                    padding: "4px 10px",
                  }}
                >
                  By-law 2026-50 &amp; 2008-250 Dual Compliance
                </span>
              </div>

              <h3
                style={{
                  margin: "0 0 18px",
                  fontFamily: "var(--font-display), serif",
                  fontWeight: 400,
                  fontSize: "clamp(24px, 3vw, 32px)",
                  color: "#f7f5f1",
                }}
              >
                5. Ottawa Zoning &amp; The Dual By-law Reality
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 28,
                  marginBottom: 24,
                }}
              >
                <div>
                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: 13,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: GOLD,
                      fontWeight: 500,
                    }}
                  >
                    The Dual By-law Condition
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(247, 245, 241, 0.75)",
                    }}
                  >
                    Ottawa City Council enacted comprehensive Zoning By-law 2026-50 on March 11, 2026.
                    Under municipal transition provisions, all permit applications deemed complete on or
                    after March 11, 2026 must comply with{" "}
                    <strong style={{ color: "#f7f5f1" }}>
                      BOTH By-law 2008-250 AND By-law 2026-50
                    </strong>{" "}
                    with &quot;the most restrictive provisions from both by-laws applying.&quot;
                    Twenty-five appeals remain active before the Ontario Land Tribunal (OLT).
                  </p>
                </div>

                <div>
                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: 13,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: GOLD,
                      fontWeight: 500,
                    }}
                  >
                    Permitted Units, Parking &amp; Zones
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(247, 245, 241, 0.75)",
                    }}
                  >
                    By-law 2026-50 establishes new Neighbourhood Zones N1 through N6. On municipal
                    servicing, lots are permitted up to{" "}
                    <strong style={{ color: "#f7f5f1" }}>two additional dwelling units</strong> (e.g. two
                    interior suites, or one interior suite plus a coach house). On private septic, lots
                    are limited to <strong style={{ color: "#f7f5f1" }}>one additional unit</strong>. No
                    additional motor vehicle parking space is required; tandem parking in the existing
                    driveway is permitted (front-yard parking is banned).
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "#0b0a09",
                  borderLeft: `2px solid ${GOLD}`,
                  padding: "14px 18px",
                  fontSize: 13.5,
                  fontWeight: 300,
                  color: "rgba(247, 245, 241, 0.7)",
                }}
              >
                <strong style={{ color: "#f7f5f1" }}>Why This Matters:</strong> Because provisions under
                appeal remain fluid, never trust generalized online claims about what your lot allows.
                Our feasibility check references the City&apos;s active zoning map and the July 7, 2026 Council
                memo before any design work begins.
              </div>
            </article>

            {/* REQUIREMENT 6: PERMITS & INSPECTIONS */}
            <article
              id="permits-inspections"
              style={{
                background: "#0f0d0b",
                border: "1px solid rgba(247, 245, 241, 0.1)",
                padding: "clamp(24px, 4vw, 40px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: 18,
                    color: "rgba(227, 175, 43, 0.6)",
                  }}
                >
                  Section 06
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: GOLD,
                    background: "rgba(227, 175, 43, 0.08)",
                    border: "1px solid rgba(227, 175, 43, 0.3)",
                    padding: "4px 10px",
                  }}
                >
                  15-Day Target &amp; BCIN Requirements
                </span>
              </div>

              <h3
                style={{
                  margin: "0 0 18px",
                  fontFamily: "var(--font-display), serif",
                  fontWeight: 400,
                  fontSize: "clamp(24px, 3vw, 32px)",
                  color: "#f7f5f1",
                }}
              >
                6. Building Permits, BCIN Designers &amp; City Inspections
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 28,
                  marginBottom: 24,
                }}
              >
                <div>
                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: 13,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: GOLD,
                      fontWeight: 500,
                    }}
                  >
                    When a BCIN Designer Is Mandatory
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(247, 245, 241, 0.75)",
                    }}
                  >
                    Where two additional dwelling units are added within a principal building, drawings
                    must be prepared by a designer registered with a Building Code Identification Number
                    (BCIN). A homeowner may take design responsibility for only one ADU where no other
                    exists, or for a detached coach house. Applications are filed online via My
                    ServiceOttawa.
                  </p>
                </div>

                <div>
                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: 13,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: GOLD,
                      fontWeight: 500,
                    }}
                  >
                    15-Day First Review &amp; 48-Hour Notice
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(247, 245, 241, 0.75)",
                    }}
                  >
                    The City of Ottawa operates under a Council-approved enhanced service level target of{" "}
                    <strong style={{ color: "#f7f5f1" }}>15 business days</strong> for first review of
                    complete secondary dwelling unit permit applications. During construction, required
                    inspections (framing, rough-in plumbing, insulation, final occupancy) must be booked
                    at least <strong style={{ color: "#f7f5f1" }}>48 hours in advance</strong>, with
                    stamped City drawings on site.
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "#0b0a09",
                  borderLeft: `2px solid ${GOLD}`,
                  padding: "14px 18px",
                  fontSize: 13.5,
                  fontWeight: 300,
                  color: "rgba(247, 245, 241, 0.7)",
                }}
              >
                <strong style={{ color: "#f7f5f1" }}>Financial &amp; Legal Notices:</strong> The Municipal
                Property Assessment Corporation (MPAC) may reassess your home&apos;s property taxes upon
                creation of an ADU. Rental receipts represent taxable income under the federal Income Tax
                Act, and homeowners must notify their property insurance provider before tenant occupancy.
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== COMMON BLOCKERS SECTION ===== */}
      <section
        id="blockers"
        style={{
          background: "#000",
          padding: "clamp(72px, 9vw, 108px) clamp(20px, 5vw, 56px)",
          borderBottom: "1px solid rgba(247, 245, 241, 0.1)",
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <h2 style={h2Style}>
            Common Blockers: <span style={{ fontStyle: "italic", color: GOLD }}>What Can Be Fixed vs. What Stops a Build</span>
          </h2>

          <p
            style={{
              margin: "0 0 44px",
              fontWeight: 300,
              fontSize: 16.5,
              lineHeight: 1.75,
              color: "rgba(247, 245, 241, 0.75)",
              maxWidth: 820,
            }}
          >
            Not every basement in Ottawa can legally or economically become an apartment. Distinguishing
            between straightforward trade modifications and severe structural barriers protects your capital.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {COMMON_BLOCKERS.map((b) => (
              <div
                key={b.title}
                style={{
                  background: "#0f0d0b",
                  border: "1px solid rgba(247, 245, 241, 0.1)",
                  padding: "26px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10.5,
                        letterSpacing: ".16em",
                        textTransform: "uppercase",
                        color: GOLD,
                      }}
                    >
                      {b.category}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: ".1em",
                        textTransform: "uppercase",
                        color: "rgba(247, 245, 241, 0.4)",
                      }}
                    >
                      {b.codeRef}
                    </span>
                  </div>

                  <h3
                    style={{
                      margin: "0 0 10px",
                      fontFamily: "var(--font-display), serif",
                      fontWeight: 400,
                      fontSize: 21,
                      color: "#f7f5f1",
                    }}
                  >
                    {b.title}
                  </h3>

                  <p
                    style={{
                      margin: "0 0 18px",
                      fontWeight: 300,
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: "rgba(247, 245, 241, 0.65)",
                    }}
                  >
                    {b.description}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: 14,
                    borderTop: "1px solid rgba(247, 245, 241, 0.08)",
                    fontSize: 12.5,
                    fontWeight: 400,
                    color: b.canBeFixed.includes("costly") ? "#f87171" : GOLD,
                    letterSpacing: ".06em",
                  }}
                >
                  Feasibility: {b.canBeFixed}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COST DRIVERS SECTION ===== */}
      <section
        id="cost-drivers"
        style={{
          background: "#0b0a09",
          padding: "clamp(72px, 9vw, 108px) clamp(20px, 5vw, 56px)",
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <h2 style={h2Style}>
            What Actually Moves the <span style={{ fontStyle: "italic", color: GOLD }}>Budget</span>
          </h2>

          <p
            style={{
              margin: "0 0 36px",
              fontWeight: 300,
              fontSize: 16.5,
              lineHeight: 1.75,
              color: "rgba(247, 245, 241, 0.75)",
              maxWidth: 780,
            }}
          >
            We do not publish speculative project totals because every Ottawa foundation, mechanical
            layout, and electrical service starts in a different condition. Instead, we break down the
            concrete technical drivers that determine your quote.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
              marginBottom: 44,
            }}
          >
            {COST_DRIVERS.map((cd) => (
              <div
                key={cd.driver}
                style={{
                  background: "#0f0d0b",
                  border: "1px solid rgba(247, 245, 241, 0.1)",
                  padding: "24px 22px",
                }}
              >
                <div
                  style={{
                    fontSize: 10.5,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: GOLD,
                    marginBottom: 8,
                  }}
                >
                  {cd.impact}
                </div>
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontFamily: "var(--font-display), serif",
                    fontWeight: 400,
                    fontSize: 20,
                    color: "#f7f5f1",
                  }}
                >
                  {cd.driver}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 300,
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "rgba(247, 245, 241, 0.65)",
                  }}
                >
                  {cd.details}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#000",
              border: "1px solid rgba(227, 175, 43, 0.3)",
              padding: "28px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: 22,
                  color: "#f7f5f1",
                  marginBottom: 6,
                }}
              >
                View our service breakdown and starting price band
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 300,
                  color: "rgba(247, 245, 241, 0.6)",
                }}
              >
                See what is included, what is excluded, and how our on-site feasibility check operates.
              </p>
            </div>

            <Link
              href="/services/legal-basements"
              className="gold-btn"
              style={{
                background: GOLD,
                color: "#0a0908",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                padding: "16px 28px",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              Legal Basements Service &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PROCESS & TIMELINE ===== */}
      <section
        id="process-timeline"
        style={{
          background: "#000",
          padding: "clamp(72px, 9vw, 108px) clamp(20px, 5vw, 56px)",
          borderBottom: "1px solid rgba(247, 245, 241, 0.1)",
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <h2 style={h2Style}>
            Permit Workflow &amp; <span style={{ fontStyle: "italic", color: GOLD }}>Timeline</span>
          </h2>

          <p
            style={{
              margin: "0 0 44px",
              fontWeight: 300,
              fontSize: 16.5,
              lineHeight: 1.75,
              color: "rgba(247, 245, 241, 0.75)",
              maxWidth: 780,
            }}
          >
            A legal secondary suite in Ottawa follows a strictly sequenced statutory review and
            inspection path. Nothing is concealed behind drywall until the City building inspector has
            signed off.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            <div
              style={{
                background: "#0f0d0b",
                border: "1px solid rgba(247, 245, 241, 0.1)",
                padding: "26px 22px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: 20,
                  color: "rgba(227, 175, 43, 0.6)",
                  marginBottom: 10,
                }}
              >
                01
              </div>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontFamily: "var(--font-display), serif",
                  fontSize: 21,
                  fontWeight: 400,
                }}
              >
                Feasibility &amp; Zoning Check
              </h3>
              <p
                style={{
                  margin: 0,
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "rgba(247, 245, 241, 0.65)",
                }}
              >
                On-site laser measurement of joists, beams, and duct bulkheads against the 1.95 m (6&apos;
                4¾&quot;) threshold. Dual by-law check under By-laws 2008-250 and 2026-50.
              </p>
            </div>

            <div
              style={{
                background: "#0f0d0b",
                border: "1px solid rgba(247, 245, 241, 0.1)",
                padding: "26px 22px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: 20,
                  color: "rgba(227, 175, 43, 0.6)",
                  marginBottom: 10,
                }}
              >
                02
              </div>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontFamily: "var(--font-display), serif",
                  fontSize: 21,
                  fontWeight: 400,
                }}
              >
                Drawings &amp; 15-Day Permit Review
              </h3>
              <p
                style={{
                  margin: 0,
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "rgba(247, 245, 241, 0.65)",
                }}
              >
                Architectural floor plans, egress details, and HVAC design submitted to City of Ottawa.
                Reviewed under the Council-approved 15-business-day enhanced service target.
              </p>
            </div>

            <div
              style={{
                background: "#0f0d0b",
                border: "1px solid rgba(247, 245, 241, 0.1)",
                padding: "26px 22px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: 20,
                  color: "rgba(227, 175, 43, 0.6)",
                  marginBottom: 10,
                }}
              >
                03
              </div>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontFamily: "var(--font-display), serif",
                  fontSize: 21,
                  fontWeight: 400,
                }}
              >
                Structural &amp; Trade Rough-Ins
              </h3>
              <p
                style={{
                  margin: 0,
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "rgba(247, 245, 241, 0.65)",
                }}
              >
                Concrete cutting for egress windows, framing, electrical rough-in, and plumbing drains.
                Inspected by City building officials (48-hr notice) and ESA inspector.
              </p>
            </div>

            <div
              style={{
                background: "#0f0d0b",
                border: "1px solid rgba(247, 245, 241, 0.1)",
                padding: "26px 22px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: 20,
                  color: "rgba(227, 175, 43, 0.6)",
                  marginBottom: 10,
                }}
              >
                04
              </div>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontFamily: "var(--font-display), serif",
                  fontSize: 21,
                  fontWeight: 400,
                }}
              >
                Fire Separation &amp; Final Occupancy
              </h3>
              <p
                style={{
                  margin: 0,
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "rgba(247, 245, 241, 0.65)",
                }}
              >
                Fire-rated drywall, interconnected CAN/ULC S531 alarms, finishes, and final City
                occupancy sign-off. Suite is legally compliant and ready for tenancy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FREQUENTLY ASKED QUESTIONS ===== */}
      <section
        id="faq"
        style={{
          background: "#0b0a09",
          padding: "clamp(72px, 9vw, 112px) clamp(20px, 5vw, 56px)",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          {/* Eyebrow #3 (Eyebrow restraint: 3 of max 3 on page) */}
          <div
            style={{
              fontSize: 11,
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 16,
              fontWeight: 400,
            }}
          >
            Questions &amp; Answers
          </div>

          <h2 style={h2Style}>
            Ottawa Legal Basements: <span style={{ fontStyle: "italic", color: GOLD }}>Frequently Asked Questions</span>
          </h2>

          <p
            style={{
              margin: "0 0 40px",
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.7,
              color: "rgba(247, 245, 241, 0.65)",
            }}
          >
            Direct, cited answers to common technical and municipal questions.
          </p>

          <ServiceFaqList faqs={LEGAL_BASEMENT_FAQS} />
        </div>
      </section>

      {/* ===== SOURCED CLAIMS DIRECTORY TABLE ===== */}
      <section
        id="sources"
        style={{
          background: "#000",
          padding: "clamp(72px, 9vw, 112px) clamp(20px, 5vw, 56px)",
          borderTop: "1px solid rgba(247, 245, 241, 0.12)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={h2Style}>
              Sourced Claims <span style={{ fontStyle: "italic", color: GOLD }}>Directory</span>
            </h2>
            <p
              style={{
                margin: 0,
                fontWeight: 300,
                fontSize: 15.5,
                lineHeight: 1.7,
                color: "rgba(247, 245, 241, 0.7)",
                maxWidth: 820,
              }}
            >
              Under our verified research standards, no regulatory figure is published from memory.
              Every assertion on this page links to an official provincial statute or municipal
              document retrieved on {LEGAL_BASEMENT_META.lastReviewed}.
            </p>
          </div>

          <div
            style={{
              overflowX: "auto",
              border: "1px solid rgba(247, 245, 241, 0.12)",
              background: "#0f0d0b",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: 13.5,
                fontWeight: 300,
                minWidth: 800,
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid rgba(227, 175, 43, 0.25)",
                    background: "#0b0a09",
                  }}
                >
                  <th
                    style={{
                      padding: "16px 18px",
                      fontSize: 11,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: GOLD,
                      width: "16%",
                    }}
                  >
                    Claim ID &amp; Ref
                  </th>
                  <th
                    style={{
                      padding: "16px 18px",
                      fontSize: 11,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: GOLD,
                      width: "48%",
                    }}
                  >
                    Verified Regulatory Assertion
                  </th>
                  <th
                    style={{
                      padding: "16px 18px",
                      fontSize: 11,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: GOLD,
                      width: "24%",
                    }}
                  >
                    Primary Source
                  </th>
                  <th
                    style={{
                      padding: "16px 18px",
                      fontSize: 11,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: GOLD,
                      width: "12%",
                    }}
                  >
                    Retrieved
                  </th>
                </tr>
              </thead>
              <tbody>
                {LEGAL_BASEMENT_CLAIMS.map((claim, idx) => (
                  <tr
                    key={claim.id}
                    style={{
                      borderBottom: "1px solid rgba(247, 245, 241, 0.08)",
                      background: idx % 2 === 0 ? "transparent" : "rgba(247, 245, 241, 0.015)",
                    }}
                  >
                    <td style={{ padding: "16px 18px", verticalAlign: "top" }}>
                      <div style={{ color: "#f7f5f1", fontWeight: 400, marginBottom: 4 }}>
                        {claim.id}
                      </div>
                      {claim.codeReference && (
                        <div
                          style={{
                            fontSize: 11,
                            color: "rgba(227, 175, 43, 0.8)",
                            lineHeight: 1.4,
                          }}
                        >
                          {claim.codeReference}
                        </div>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "16px 18px",
                        lineHeight: 1.6,
                        color: "rgba(247, 245, 241, 0.85)",
                        verticalAlign: "top",
                      }}
                    >
                      {claim.statement}
                    </td>
                    <td style={{ padding: "16px 18px", verticalAlign: "top" }}>
                      <a
                        href={claim.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: GOLD,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          lineHeight: 1.4,
                        }}
                      >
                        <span>{claim.source}</span>
                        <span style={{ fontSize: 11 }}>&rarr;</span>
                      </a>
                    </td>
                    <td
                      style={{
                        padding: "16px 18px",
                        color: "rgba(247, 245, 241, 0.5)",
                        verticalAlign: "top",
                        whiteSpace: "nowrap",
                        fontSize: 12,
                      }}
                    >
                      {claim.retrieved}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== CALL TO ACTION ===== */}
      <section
        style={{
          background: "#0b0a09",
          padding: "clamp(80px, 10vw, 120px) clamp(20px, 5vw, 56px)",
          borderTop: "1px solid rgba(227, 175, 43, 0.25)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <h2
            style={{
              margin: "0 0 20px",
              fontFamily: "var(--font-display), serif",
              fontWeight: 300,
              fontSize: "clamp(32px, 5vw, 54px)",
              lineHeight: 1.1,
            }}
          >
            Start with an On-Site <span style={{ fontStyle: "italic", color: GOLD }}>Feasibility Check</span>
          </h2>

          <p
            style={{
              margin: "0 auto 40px",
              fontWeight: 300,
              fontSize: 17,
              lineHeight: 1.75,
              color: "rgba(247, 245, 241, 0.75)",
              maxWidth: 680,
            }}
          >
            Before committing to architectural design contracts, we verify your exact ceiling heights,
            structural beam paths, egress window options, and Ottawa dual zoning eligibility on site.
          </p>

          <div
            style={{
              display: "flex",
              gap: 18,
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Link
              href="/services/legal-basements"
              className="gold-btn"
              style={{
                background: GOLD,
                color: "#0a0908",
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                padding: "18px 36px",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              Explore Legal Basements
            </Link>

            <Link
              href="/contact"
              className="outline-btn"
              style={{
                border: "1px solid rgba(227, 175, 43, 0.55)",
                color: "#f7f5f1",
                fontWeight: 400,
                fontSize: 12,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                padding: "18px 34px",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              Request a Quote
            </Link>

            <a
              href={PRIMARY_PHONE.href}
              style={{
                color: GOLD,
                fontSize: 13,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 16px",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={GOLD}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call {PRIMARY_PHONE.display}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
