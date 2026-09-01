import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "../data/company";
import { SERVICES } from "../data/services";
import { DraftTag } from "./DraftTag";

const GOLD = "#e3af2b";

const headingStyle = {
  fontWeight: 300,
  fontSize: 10,
  letterSpacing: ".26em",
  textTransform: "uppercase" as const,
  color: GOLD,
  marginBottom: 20,
};

const linkStyle = { color: "rgba(247,245,241,.7)" };

export function SiteFooter() {
  return (
    <footer style={{ background: "#000", borderTop: "1px solid rgba(227,175,43,.2)", padding: "74px 56px 44px" }}>
      <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
        <div>
          <Image
            src="/assets/ss-logo-cropped.png"
            alt={COMPANY.name}
            width={160}
            height={160}
            style={{ width: 160, height: "auto", display: "block", marginBottom: 22 }}
            unoptimized
          />
          <div style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic", fontSize: 19, color: GOLD, marginBottom: 14 }}>
            {COMPANY.slogan}
          </div>
          <p style={{ margin: 0, fontWeight: 300, fontSize: 15, lineHeight: 1.75, color: "rgba(247,245,241,.55)", maxWidth: 310 }}>
            Kitchens, bathrooms, feature walls, flooring and legal basements for Ottawa homes where the details matter.
          </p>
        </div>

        <div>
          <div style={headingStyle}>Services</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontWeight: 300, fontSize: 15 }}>
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} style={linkStyle}>
                {s.navLabel}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div style={headingStyle}>Contact</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontWeight: 300, fontSize: 15, color: "rgba(247,245,241,.7)" }}>
            {COMPANY.phones.map((p) => (
              <a key={p.href} href={p.href} style={linkStyle}>
                {p.display}
              </a>
            ))}
            <a href={`mailto:${COMPANY.email}`} style={linkStyle}>{COMPANY.email}</a>
            <span>{COMPANY.address}</span>
          </div>
        </div>

        <div>
          <div style={headingStyle}>Assurance</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontWeight: 300, fontSize: 13, letterSpacing: ".1em", color: "rgba(247,245,241,.55)" }}>
            <span>{COMPANY.rating.toFixed(1)}&#9733; ON GOOGLE ({COMPANY.reviewCount} REVIEWS)</span>
            <span>SERVING OTTAWA, ON</span>
            {/* TODO(owner): liability coverage amount, WSIB clearance, HST/business number.
                Friction guide Stage 4 (vetting) is the highest-weighted stage — these are
                the proofs buyers look for and most contractor sites omit. */}
            <span style={{ display: "inline-flex", alignItems: "center", flexWrap: "wrap" }}>
              INSURED &amp; WSIB
              <DraftTag needs="liability coverage amount, WSIB clearance, business number" />
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, borderTop: "1px solid rgba(247,245,241,.1)", paddingTop: 28, fontWeight: 300, fontSize: 12, color: "rgba(247,245,241,.4)" }}>
        <span>&copy; {new Date().getFullYear()} {COMPANY.name}</span>
        <span style={{ letterSpacing: ".22em", textTransform: "uppercase" }}>Ottawa, ON</span>
      </div>
    </footer>
  );
}
