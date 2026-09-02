import type { Metadata } from "next";
import Link from "next/link";
import { DraftTag } from "../components/DraftTag";
import { QuoteForm } from "../components/QuoteForm";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { COMPANY, PRIMARY_PHONE } from "../data/company";

const GOLD = "#e3af2b";

export const metadata: Metadata = {
  title: "Contact & Free Quote | SS Carpentry & Renovations Ottawa",
  description:
    "Request a free quote or on-site consultation in Ottawa. We reply within one business day with fixed itemized pricing and direct owner accountability.",
  openGraph: {
    title: "Contact SS Carpentry & Renovations Ottawa",
    description:
      "Direct owner communication. Request a quote or call 647-939-0241. One business day response guaranteed.",
    images: ["/assets/og-image.jpg"],
  },
};

const NEXT_STEPS = [
  {
    step: "01",
    title: "Review & Initial Chat",
    desc: "We review your project scope and reply within 24 hours to discuss dimensions, materials, and preliminary ideas.",
  },
  {
    step: "02",
    title: "Free On-Site Measurement",
    desc: "The owner visits your home to inspect substrates, take laser measurements, and evaluate structural or trade requirements.",
  },
  {
    step: "03",
    title: "Fixed Itemized Quote",
    desc: "You receive a clear, detailed written estimate outlining exact materials, labor phases, and timelines. Zero hidden fees.",
  },
  {
    step: "04",
    title: "No-Obligation Decision",
    desc: "Review the quote on your own time. When you're ready to proceed, we lock in your start date and order materials.",
  },
];

const NEIGHBOURHOODS = [
  "Westboro",
  "Kanata",
  "Barrhaven",
  "The Glebe",
  "Rockcliffe Park",
  "Stittsville",
  "Nepean",
  "Orleans",
  "Centretown",
  "Manotick",
  "Riverside South",
  "Alta Vista",
];

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

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact SS Carpentry and Renovations",
    description: "Request a quote or speak directly with the owner for Ottawa carpentry and home renovations.",
    mainEntity: {
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY.name,
      telephone: COMPANY.phones.map((p) => p.display),
      email: COMPANY.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "3008 Travertine Way",
        addressLocality: "Ottawa",
        addressRegion: "ON",
        postalCode: "K2J 7G4",
        addressCountry: "CA",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "08:00",
          closes: "18:00",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />

      <main style={{ background: "#0b0a09", color: "#f7f5f1", minHeight: "100vh" }}>
        {/* Hero Section */}
        <section
          style={{
            padding: "140px 56px 60px",
            borderBottom: "1px solid rgba(247, 245, 241, 0.08)",
            background: "radial-gradient(ellipse at 50% 0%, rgba(227, 175, 43, 0.08) 0%, rgba(11, 10, 9, 0) 70%)",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            {/* Breadcrumbs */}
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
              <span style={{ color: GOLD }}>Contact &amp; Quote</span>
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
              Direct Communication · 1-Day Response Guaranteed
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display), serif",
                fontWeight: 300,
                fontSize: "clamp(36px, 5.5vw, 62px)",
                lineHeight: 1.05,
                margin: "0 0 24px",
                letterSpacing: "-.02em",
                maxWidth: 900,
              }}
            >
              We reply within <span style={{ fontStyle: "italic", color: GOLD }}>one working day</span>.
            </h1>

            <p
              style={{
                fontWeight: 300,
                fontSize: 18,
                lineHeight: 1.75,
                maxWidth: 760,
                color: "rgba(247, 245, 241, 0.8)",
                margin: 0,
              }}
            >
              No receptionists, call centers, or sales reps. Speak directly with the owner to discuss your Ottawa
              renovation, review ballpark estimates, and arrange a free on-site consultation.
            </p>
          </div>
        </section>

        {/* Direct Contact Cards Row (Fastest Paths First) */}
        <section style={{ padding: "40px 56px 60px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 20,
              }}
            >
              {/* Primary Phone */}
              <a
                href={COMPANY.phones[0].href}
                className="card-hover"
                style={{
                  background: "#0f0d0b",
                  border: "1px solid rgba(227, 175, 43, 0.3)",
                  padding: "26px 24px",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
                  Primary Phone
                </div>
                <div style={{ fontSize: 20, fontWeight: 500, color: "#f7f5f1", marginBottom: 6 }}>
                  {COMPANY.phones[0].display}
                </div>
                <div style={{ fontSize: 12, color: "rgba(247, 245, 241, 0.5)" }}>
                  Direct to Owner · Tap to call
                </div>
              </a>

              {/* Alternate Phone */}
              <a
                href={COMPANY.phones[1].href}
                className="card-hover"
                style={{
                  background: "#0f0d0b",
                  border: "1px solid rgba(247, 245, 241, 0.1)",
                  padding: "26px 24px",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(247,245,241,.6)", marginBottom: 8 }}>
                  Alternate Phone
                </div>
                <div style={{ fontSize: 20, fontWeight: 500, color: "#f7f5f1", marginBottom: 6 }}>
                  {COMPANY.phones[1].display}
                </div>
                <div style={{ fontSize: 12, color: "rgba(247, 245, 241, 0.5)" }}>
                  Secondary line · Tap to call
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${COMPANY.email}`}
                className="card-hover"
                style={{
                  background: "#0f0d0b",
                  border: "1px solid rgba(247, 245, 241, 0.1)",
                  padding: "26px 24px",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
                  Email Inquiry
                </div>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#f7f5f1", marginBottom: 6, wordBreak: "break-all" }}>
                  {COMPANY.email}
                </div>
                <div style={{ fontSize: 12, color: "rgba(247, 245, 241, 0.5)" }}>
                  Monitored daily · 1-day reply
                </div>
              </a>

              {/* Business Hours & Base */}
              <div
                style={{
                  background: "#0f0d0b",
                  border: "1px solid rgba(247, 245, 241, 0.1)",
                  padding: "26px 24px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(247,245,241,.6)", marginBottom: 8 }}>
                  Operating Hours
                </div>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#f7f5f1", marginBottom: 6 }}>
                  Mon – Sat: 8:00 AM – 6:00 PM
                </div>
                <div style={{ fontSize: 12, color: "rgba(247, 245, 241, 0.5)" }}>
                  Based in Ottawa (K2J 7G4)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Form & Location Section */}
        <section style={{ padding: "20px 56px 80px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: 48,
                alignItems: "start",
              }}
            >
              {/* Left Column: Quote Form */}
              <div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 10.5, letterSpacing: ".28em", textTransform: "uppercase", color: GOLD, marginBottom: 6 }}>
                    Online Quote Request
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display), serif", fontWeight: 300, fontSize: 30, margin: 0 }}>
                    Tell Us About Your Project
                  </h2>
                </div>

                <QuoteForm source="contact" />
              </div>

              {/* Right Column: Service Assurance & Google Maps Link */}
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {/* Location Card */}
                <div
                  style={{
                    background: "#0f0d0b",
                    border: "1px solid rgba(247, 245, 241, 0.1)",
                    padding: "36px 32px",
                  }}
                >
                  <div style={{ fontSize: 10.5, letterSpacing: ".28em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>
                    Workshop &amp; Service Hub
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display), serif", fontSize: 24, fontWeight: 400, margin: "0 0 14px" }}>
                    Serving Ottawa &amp; Surrounding Regions
                  </h3>
                  <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: "rgba(247, 245, 241, 0.7)", margin: "0 0 24px" }}>
                    We provide on-site estimates across the Greater Ottawa Area. All carpentry is crafted off-site where
                    possible, then installed with precision in your home.
                  </p>

                  <div style={{ borderTop: "1px solid rgba(247, 245, 241, 0.08)", paddingTop: 20, marginBottom: 24 }}>
                    <div style={{ fontSize: 11, color: "#f7f5f1", fontWeight: 500, marginBottom: 4 }}>
                      Address:
                    </div>
                    <div style={{ fontSize: 14, color: "rgba(247, 245, 241, 0.7)", fontWeight: 300 }}>
                      {COMPANY.address}
                    </div>
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
                      padding: "14px 24px",
                    }}
                  >
                    <GoogleLogo size={16} />
                    <span>View on Google Maps &rarr;</span>
                  </a>
                </div>

                {/* Vetting Proof Callout */}
                <div
                  style={{
                    background: "rgba(227, 175, 43, 0.03)",
                    border: "1px solid rgba(227, 175, 43, 0.25)",
                    padding: "32px 30px",
                  }}
                >
                  <div style={{ fontSize: 10.5, letterSpacing: ".22em", textTransform: "uppercase", color: GOLD, marginBottom: 10 }}>
                    Stage 4 Contractor Vetting
                  </div>
                  <h4 style={{ fontFamily: "var(--font-display), serif", fontSize: 20, fontWeight: 400, margin: "0 0 12px" }}>
                    Fully Insured &amp; WSIB In Good Standing
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: "rgba(247, 245, 241, 0.75)", display: "flex", flexDirection: "column", gap: 6 }}>
                    <li>$2,000,000 Commercial General Liability Policy</li>
                    <li>WSIB Ontario Workplace Safety Coverage</li>
                    <li>Specialized Electrical &amp; Plumbing via Licensed ESA/ECRA Trade Partners</li>
                    <li>Fixed written contracts with milestone schedule</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Happens Next Section */}
        <section style={{ padding: "80px 56px", background: "#080706", borderTop: "1px solid rgba(247, 245, 241, 0.08)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 10.5, letterSpacing: ".3em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>
                Clear Process
              </div>
              <h2 style={{ fontFamily: "var(--font-display), serif", fontWeight: 300, fontSize: 34, margin: "0 0 14px" }}>
                What Happens After You Contact Us
              </h2>
              <p style={{ fontSize: 16, fontWeight: 300, color: "rgba(247, 245, 241, 0.7)", maxWidth: 640, margin: "0 auto" }}>
                We believe in complete transparency from the very first interaction. No pushy sales calls, no obligation.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                gap: 24,
              }}
            >
              {NEXT_STEPS.map((s) => (
                <div
                  key={s.step}
                  style={{
                    background: "#0f0d0b",
                    border: "1px solid rgba(247, 245, 241, 0.08)",
                    padding: "32px 26px",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-display), serif", fontSize: 24, color: GOLD, marginBottom: 14 }}>
                    {s.step}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display), serif", fontSize: 19, fontWeight: 400, margin: "0 0 10px", color: "#f7f5f1" }}>
                    {s.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: 13.5, fontWeight: 300, lineHeight: 1.65, color: "rgba(247, 245, 241, 0.65)" }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Areas Served Strip */}
        <section
          style={{
            padding: "50px 56px",
            background: "#060504",
            borderTop: "1px solid rgba(247, 245, 241, 0.08)",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ fontSize: 10.5, letterSpacing: ".28em", textTransform: "uppercase", color: GOLD, marginBottom: 16 }}>
              Ottawa Service Locations
            </div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px 18px" }}>
              {NEIGHBOURHOODS.map((n) => (
                <span key={n} style={{ fontSize: 13, fontWeight: 300, color: "rgba(247, 245, 241, 0.65)" }}>
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
