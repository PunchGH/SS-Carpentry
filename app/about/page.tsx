import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DraftBlock, DraftTag } from "../components/DraftTag";
import { PlaceholderImage } from "../components/PlaceholderImage";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { ABOUT_DATA } from "../data/about";
import { COMPANY, PRIMARY_PHONE } from "../data/company";
import { REVIEWS } from "../data/reviews";

import { GOLD } from "../data/theme";

export const metadata: Metadata = {
  title: "About Us & Craftsmanship | SS Carpentry & Renovations Ottawa",
  description:
    "Meet SS Carpentry & Renovations — owner-led residential renovations and custom woodwork in Ottawa. Direct communication, tidy job sites, and fixed itemized quotes.",
  openGraph: {
    title: "About Us | SS Carpentry & Renovations Ottawa",
    description:
      "Owner-led carpentry, kitchen renovations, and custom woodworking in Ottawa. Verified credentials and direct maker accountability.",
    images: ["/assets/og-image.jpg"],
  },
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

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About SS Carpentry and Renovations",
    description: ABOUT_DATA.lead,
    mainEntity: {
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY.name,
      telephone: PRIMARY_PHONE.display,
      address: {
        "@type": "PostalAddress",
        streetAddress: "3008 Travertine Way",
        addressLocality: "Ottawa",
        addressRegion: "ON",
        postalCode: "K2J 7G4",
        addressCountry: "CA",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: COMPANY.rating,
        reviewCount: COMPANY.reviewCount,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />

      <main id="main-content" style={{ background: "#0b0a09", color: "#f7f5f1", minHeight: "100vh" }}>
        {/* Hero Section */}
        <section
          className="hero-section"
          style={{
            padding: "140px 56px 60px",
            borderBottom: "1px solid rgba(247, 245, 241, 0.08)",
            background: "radial-gradient(ellipse at 50% 0%, rgba(227, 175, 43, 0.08) 0%, rgba(11, 10, 9, 0) 70%)",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "rgba(247, 245, 241, 0.5)",
                marginBottom: 20,
              }}
            >
              <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
                Home
              </Link>
              <span>/</span>
              <span style={{ color: GOLD }}>About Us</span>
            </nav>

            <div
              style={{
                fontWeight: 300,
                fontSize: 11,
                letterSpacing: ".32em",
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: 16,
              }}
            >
              About SS Carpentry &amp; Renovations
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display), serif",
                fontWeight: 300,
                fontSize: "clamp(36px, 5.5vw, 62px)",
                lineHeight: 1.05,
                margin: "0 0 24px",
                letterSpacing: "-.02em",
                maxWidth: 920,
              }}
            >
              Renovate, reimagine, <span style={{ fontStyle: "italic", color: GOLD }}>rebuild</span>.
            </h1>

            <p
              style={{
                fontWeight: 300,
                fontSize: 18,
                lineHeight: 1.75,
                maxWidth: 780,
                color: "rgba(247, 245, 241, 0.8)",
                margin: 0,
              }}
            >
              {ABOUT_DATA.lead}
            </p>
          </div>
        </section>

        {/* Founder & Hands-On Ownership Section */}
        <section style={{ padding: "80px 56px 60px" }}>
          <div className="reveal" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
                gap: 56,
                alignItems: "center",
                background: "#0f0d0b",
                border: "1px solid rgba(227, 175, 43, 0.25)",
                padding: "48px 44px",
              }}
            >
              {/* Left: Placeholder portrait (strict no-stock policy) */}
              <div>
                <PlaceholderImage
                  needs="Owner portrait — on-site working photo required"
                  height={420}
                />
                <div style={{ marginTop: 14, textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-display), serif", fontSize: 20, color: "#f7f5f1" }}>
                    Lead Carpenter &amp; Founder
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: GOLD, marginTop: 4 }}>
                    Direct On-Site Supervision
                  </div>
                </div>
              </div>

              {/* Right: Owner philosophy */}
              <div>
                <div style={{ fontSize: 10.5, letterSpacing: ".3em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>
                  The Founder&apos;s Approach
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontWeight: 300,
                    fontSize: 32,
                    lineHeight: 1.18,
                    margin: "0 0 20px",
                  }}
                >
                  Direct accountability on every single cut and joint.
                </h2>

                <DraftBlock needs="owner bio & personal trade journey">
                  {ABOUT_DATA.owner.bio.map((para, i) => (
                    <p
                      key={i}
                      style={{
                        fontSize: 15.5,
                        fontWeight: 300,
                        lineHeight: 1.75,
                        color: "rgba(247, 245, 241, 0.75)",
                        margin: "0 0 16px",
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </DraftBlock>

                {/* Quick Trust Highlights */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 16,
                    borderTop: "1px solid rgba(247, 245, 241, 0.08)",
                    paddingTop: 24,
                    marginTop: 20,
                  }}
                >
                  <div>
                    <div style={{ fontFamily: "var(--font-display), serif", fontSize: 24, color: GOLD }}>5.0 ★</div>
                    <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(247, 245, 241, 0.5)", marginTop: 4 }}>
                      Google Rating
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display), serif", fontSize: 24, color: GOLD }}>1-on-1</div>
                    <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(247, 245, 241, 0.5)", marginTop: 4 }}>
                      Single Contact
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display), serif", fontSize: 24, color: GOLD }}>Fixed</div>
                    <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(247, 245, 241, 0.5)", marginTop: 4 }}>
                      Written Quotes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verifiable Credentials & Compliance Strip (Friction Guide Stage 4) */}
        <section style={{ padding: "40px 56px 80px" }}>
          <div className="reveal" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 10.5, letterSpacing: ".28em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
                Verify before you hire
              </div>
              <h2 style={{ fontFamily: "var(--font-display), serif", fontWeight: 300, fontSize: 30, margin: 0 }}>
                Licensing, Insurance &amp; Trade Compliance
              </h2>
              <p style={{ color: "rgba(247, 245, 241, 0.65)", fontSize: 15, margin: "10px 0 0", maxWidth: 700 }}>
                Homeowners deserve transparent, checkable proof before inviting a contractor into their home.
              </p>
            </div>

            <div
              className="credentials-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(200px, 1fr))",
                gap: 20,
              }}
            >
              {Object.entries(ABOUT_DATA.credentials).map(([key, cred], idx, arr) => (
                <div
                  key={key}
                  style={{
                    background: "#0f0d0b",
                    border: "1px solid rgba(247, 245, 241, 0.1)",
                    padding: "24px 22px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gridColumn: arr.length % 4 === 1 && idx === arr.length - 1 ? "1 / -1" : undefined,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
                      {cred.label}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: "#f7f5f1", marginBottom: 6 }}>
                      {cred.value}
                      {cred.draft && <DraftTag needs={cred.needs ?? cred.label} />}
                    </div>
                  </div>
                  {cred.subtext && (
                    <div style={{ fontSize: 12, fontWeight: 300, color: "rgba(247, 245, 241, 0.5)", marginTop: 12 }}>
                      {cred.subtext}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why We Started / Our Story */}
        <section style={{ padding: "60px 56px 80px", background: "#080706", borderTop: "1px solid rgba(247, 245, 241, 0.08)" }}>
          <div className="reveal" style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ fontSize: 10.5, letterSpacing: ".3em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>
                Our Background
              </div>
              <h2 style={{ fontFamily: "var(--font-display), serif", fontWeight: 300, fontSize: 34, margin: 0 }}>
                Why We Built SS Carpentry
              </h2>
            </div>

            <DraftBlock needs="owner founding story & exact timeline">
              {ABOUT_DATA.story.paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 16,
                    fontWeight: 300,
                    lineHeight: 1.85,
                    color: "rgba(247, 245, 241, 0.8)",
                    marginBottom: 20,
                  }}
                >
                  {p}
                </p>
              ))}
            </DraftBlock>
          </div>
        </section>

        {/* Core Values Grid */}
        <section style={{ padding: "80px 56px 90px" }}>
          <div className="reveal" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 10.5, letterSpacing: ".3em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
                Operating Principles
              </div>
              <h2 style={{ fontFamily: "var(--font-display), serif", fontWeight: 300, fontSize: 32, margin: 0 }}>
                The Standards We Bring to Your Home
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 28,
              }}
            >
              {ABOUT_DATA.values.map((v) => (
                <div
                  key={v.number}
                  style={{
                    background: "#0f0d0b",
                    border: "1px solid rgba(247, 245, 241, 0.08)",
                    padding: "32px 28px",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-display), serif", fontSize: 24, color: GOLD, marginBottom: 14 }}>
                    {v.number}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display), serif",
                      fontWeight: 400,
                      fontSize: 20,
                      margin: "0 0 12px",
                      color: "#f7f5f1",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: "rgba(247, 245, 241, 0.65)",
                    }}
                  >
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team / Operating Model — full-bleed statement, not another bordered card */}
        <section
          style={{
            padding: "110px 56px",
            background: "radial-gradient(ellipse at 50% 50%, rgba(227, 175, 43, 0.1) 0%, #080706 72%)",
            borderTop: "1px solid rgba(227, 175, 43, 0.18)",
            borderBottom: "1px solid rgba(227, 175, 43, 0.18)",
            textAlign: "center",
          }}
        >
          <div className="reveal" style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ fontSize: 10.5, letterSpacing: ".3em", textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>
              {ABOUT_DATA.team.modelTitle}
            </div>
            <p
              style={{
                fontFamily: "var(--font-display), serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(24px, 3.4vw, 38px)",
                lineHeight: 1.35,
                color: "#f7f5f1",
                margin: 0,
              }}
            >
              {ABOUT_DATA.team.modelDescription}
            </p>
          </div>
        </section>

        {/* Verified Reviews Section */}
        <section style={{ padding: "80px 56px 100px", background: "#080706", borderTop: "1px solid rgba(247, 245, 241, 0.08)" }}>
          <div className="reveal" style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 44, flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ fontSize: 10.5, letterSpacing: ".26em", textTransform: "uppercase", color: GOLD, marginBottom: 6 }}>
                  Verified Client Feedback
                </div>
                <h2 style={{ fontFamily: "var(--font-display), serif", fontWeight: 300, fontSize: 32, margin: 0 }}>
                  What Homeowners Say
                </h2>
              </div>

              <a
                href={COMPANY.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="outline-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 11,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "#f7f5f1",
                  border: "1px solid rgba(227, 175, 43, 0.4)",
                  background: "rgba(227, 175, 43, 0.05)",
                  padding: "10px 20px",
                  minHeight: 44,
                  boxSizing: "border-box",
                }}
              >
                <GoogleLogo size={16} />
                <span>5.0 ★ on Google Maps &rarr;</span>
              </a>
            </div>

            <div
              className="about-reviews-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(240px, 1fr))",
                gap: 28,
              }}
            >
              {REVIEWS.map((r, idx) => (
                <div
                  key={r.name}
                  style={{
                    background: "#0f0d0b",
                    border: "1px solid rgba(247, 245, 241, 0.08)",
                    padding: "32px 28px",
                    display: "flex",
                    flexDirection: "column",
                    ...(REVIEWS.length % 3 === 1 && idx === REVIEWS.length - 1
                      ? { gridColumn: "1 / -1", maxWidth: 460, margin: "0 auto", width: "100%" }
                      : null),
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <GoogleLogo size={16} />
                      <span style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(247, 245, 241, 0.5)" }}>
                        Google Review
                      </span>
                    </div>
                    <div style={{ color: GOLD, fontSize: 12, letterSpacing: 2 }}>★★★★★</div>
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-sans), sans-serif",
                      fontSize: 14.5,
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: "rgba(247, 245, 241, 0.85)",
                      margin: "0 0 20px",
                      flex: 1,
                    }}
                  >
                    &ldquo;{r.text}&rdquo;
                  </p>

                  <div
                    style={{
                      borderTop: "1px solid rgba(247, 245, 241, 0.08)",
                      paddingTop: 16,
                      marginTop: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ position: "relative", width: 42, height: 42, borderRadius: "50%", background: "#1c1915", border: "1px solid rgba(227,175,43,.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: GOLD, fontWeight: 600, overflow: "hidden", flexShrink: 0 }}>
                        {r.avatar ? (
                          <Image
                            src={r.avatar}
                            alt={r.name}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="42px"
                          />
                        ) : (
                          r.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <div style={{ fontWeight: 400, fontSize: 14, color: "#f7f5f1" }}>{r.name}</div>
                        <div style={{ fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(247, 245, 241, 0.5)", marginTop: 2 }}>
                          {r.tag}
                        </div>
                      </div>
                    </div>
                    <a
                      href={r.reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-btn"
                      style={{ fontSize: 10.5, color: GOLD, letterSpacing: ".1em", textTransform: "uppercase" }}
                    >
                      View ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{ padding: "100px 56px", textAlign: "center", background: "#0b0a09" }}>
          <div className="reveal" style={{ maxWidth: 700, margin: "0 auto" }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: ".32em",
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: 16,
              }}
            >
              Start Your Renovation
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "clamp(30px, 4vw, 44px)",
                fontWeight: 300,
                lineHeight: 1.15,
                margin: "0 0 16px",
              }}
            >
              Work directly with the maker on your next project.
            </h2>
            <p
              style={{
                fontSize: 15.5,
                fontWeight: 300,
                lineHeight: 1.7,
                color: "rgba(247, 245, 241, 0.7)",
                margin: "0 0 32px",
              }}
            >
              We provide itemized written quotes and respond to all inquiries within one business day.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/contact"
                style={{
                  background: GOLD,
                  color: "#0a0908",
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  padding: "18px 36px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Request a quote
              </Link>
              <a
                href={PRIMARY_PHONE.href}
                style={{
                  background: "transparent",
                  color: "#f7f5f1",
                  border: "1px solid rgba(227, 175, 43, 0.4)",
                  fontWeight: 400,
                  fontSize: 12,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  padding: "18px 32px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Call {PRIMARY_PHONE.display}
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
