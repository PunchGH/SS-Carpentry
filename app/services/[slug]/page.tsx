import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "../../components/SiteNav";
import { SiteFooter } from "../../components/SiteFooter";
import { ServiceFaqList } from "../../components/ServiceFaq";
import { DraftTag, DraftBlock } from "../../components/DraftTag";
import { COMPANY, PRIMARY_PHONE } from "../../data/company";
import { SERVICES, getService } from "../../data/services";

const GOLD = "#e3af2b";

const eyebrow = {
  fontWeight: 300,
  fontSize: 11,
  letterSpacing: ".32em",
  textTransform: "uppercase" as const,
  color: GOLD,
  marginBottom: 20,
};

const h2 = {
  margin: "0 0 28px",
  fontFamily: "var(--font-display), serif",
  fontWeight: 300,
  fontSize: "clamp(28px, 3.6vw, 44px)",
  lineHeight: 1.12,
};

/** Every service in SERVICES gets a static page at build time. */
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: `/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <SiteNav />
      <div style={{ height: 88 }} />

      {/* ===== HERO ===== */}
      <section style={{ position: "relative", minHeight: 460, display: "flex", alignItems: "flex-end", overflow: "hidden", background: "#000" }}>
        <Image
          src={service.image}
          alt={service.alt}
          fill
          style={{ objectFit: "cover", opacity: 0.5 }}
          sizes="100vw"
          priority
          unoptimized
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,.35) 45%, rgba(0,0,0,.92) 100%)" }} />

        <div style={{ position: "relative", zIndex: 2, padding: "0 56px 64px", maxWidth: 1100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(247,245,241,.6)" }}>
            <Link href="/" style={{ color: "rgba(247,245,241,.6)" }}>Home</Link>
            <span>/</span>
            <span style={{ color: GOLD }}>{service.navLabel}</span>
          </div>
          <h1 style={{ margin: 0, fontFamily: "var(--font-display), serif", fontWeight: 300, fontSize: "clamp(38px, 6vw, 74px)", lineHeight: 1.04, letterSpacing: "-.015em" }}>
            {service.title}
          </h1>
          {service.imageDraft && <DraftTag needs="real photography for this service" />}
        </div>
      </section>

      {/* ===== INTRO + WHAT'S INCLUDED ===== */}
      <section style={{ background: "#0b0a09", padding: "110px 56px" }}>
        <div className="quote-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start", maxWidth: 1280, margin: "0 auto" }}>
          <div>
            <div style={eyebrow}>What this covers</div>
            <p style={{ margin: 0, fontWeight: 300, fontSize: 18, lineHeight: 1.8, color: "rgba(247,245,241,.8)" }}>
              {service.intro}
            </p>
            {service.contentStatus === "draft" && (
              <div style={{ marginTop: 18 }}>
                <DraftTag needs="confirmed description of this service" />
              </div>
            )}
          </div>

          <div>
            <div style={eyebrow}>Included</div>
            <ul style={{ margin: "0 0 40px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {service.whatsIncluded.map((item) => (
                <li key={item} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontWeight: 300, fontSize: 15.5, lineHeight: 1.7, color: "rgba(247,245,241,.75)" }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Friction guide Stage 7 — stating exclusions up front prevents quote disputes. */}
            <div style={eyebrow}>Not included</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {service.notIncluded.map((item) => (
                <li key={item} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ color: "rgba(247,245,241,.35)", flexShrink: 0, marginTop: 2 }}>—</span>
                  <span style={{ fontWeight: 300, fontSize: 15.5, lineHeight: 1.7, color: "rgba(247,245,241,.6)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== PRICE BAND (friction guide Stage 3) ===== */}
      <section style={{ background: "#000", padding: "100px 56px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={eyebrow}>What it costs</div>
          <h2 style={h2}>
            An honest <span style={{ fontStyle: "italic", color: GOLD }}>range</span>, before you call
          </h2>

          <DraftBlock needs="real price bands and cost drivers from the owner">
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap", marginBottom: 30 }}>
              <div>
                <div style={{ fontSize: 10.5, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(247,245,241,.5)", marginBottom: 8 }}>Starting from</div>
                <div style={{ fontFamily: "var(--font-display), serif", fontSize: 40, color: GOLD, lineHeight: 1 }}>{service.priceBand.from}</div>
              </div>
              <div>
                <div style={{ fontSize: 10.5, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(247,245,241,.5)", marginBottom: 8 }}>Most projects</div>
                <div style={{ fontFamily: "var(--font-display), serif", fontSize: 40, lineHeight: 1 }}>{service.priceBand.typical}</div>
              </div>
            </div>

            <div style={{ fontSize: 10.5, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(247,245,241,.5)", marginBottom: 14 }}>What moves the number</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12, maxWidth: 640 }}>
              {service.priceBand.drivers.map((d) => (
                <li key={d} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ color: GOLD, flexShrink: 0 }}>·</span>
                  <span style={{ fontWeight: 300, fontSize: 15.5, lineHeight: 1.7, color: "rgba(247,245,241,.7)" }}>{d}</span>
                </li>
              ))}
            </ul>
          </DraftBlock>

          <p style={{ margin: "26px 0 0", fontWeight: 300, fontSize: 15, lineHeight: 1.7, color: "rgba(247,245,241,.55)", maxWidth: 640 }}>
            Every quote is one fixed, itemised figure after an on-site visit. It only changes if you ask it to, in writing.
          </p>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section style={{ background: "#0b0a09", padding: "100px 56px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={eyebrow}>How it runs</div>
          <h2 style={h2}>From first call to final <span style={{ fontStyle: "italic", color: GOLD }}>sign-off</span></h2>

          <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 }}>
            {service.steps.map((step, i) => (
              <div key={step.title} style={{ border: "1px solid rgba(247,245,241,.1)", background: "#0f0d0b", padding: "30px 26px 32px" }}>
                <div style={{ fontFamily: "var(--font-display), serif", fontSize: 20, color: "rgba(227,175,43,.5)", marginBottom: 14 }}>
                  0{i + 1}
                </div>
                <h3 style={{ margin: "0 0 10px", fontFamily: "var(--font-display), serif", fontWeight: 400, fontSize: 22 }}>{step.title}</h3>
                <p style={{ margin: 0, fontWeight: 300, fontSize: 14.5, lineHeight: 1.7, color: "rgba(247,245,241,.6)" }}>{step.copy}</p>
              </div>
            ))}
          </div>

          {/* Friction guide Stage 6 — the response promise is the strongest differentiator. */}
          <div style={{ marginTop: 44, border: "1px solid rgba(227,175,43,.3)", background: "rgba(227,175,43,.05)", padding: "26px 30px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ width: 28, height: 1, background: GOLD }} />
            <span style={{ fontWeight: 300, fontSize: 16, color: "rgba(247,245,241,.9)" }}>
              We reply to every enquiry within one working day.
            </span>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{ background: "#000", padding: "100px 56px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={eyebrow}>Before you ask</div>
          <h2 style={h2}>{service.navLabel} questions</h2>
          <ServiceFaqList faqs={service.faqs} />
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ background: "#0b0a09", padding: "100px 56px", borderTop: "1px solid rgba(227,175,43,.25)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ ...h2, margin: "0 0 20px" }}>
            Get a free <span style={{ fontStyle: "italic", color: GOLD }}>estimate</span>
          </h2>
          <p style={{ margin: "0 0 36px", fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: "rgba(247,245,241,.66)" }}>
            Tell us about the project and we&apos;ll come back within one working day. No cost, no sales pressure.
          </p>
          <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              className="gold-btn"
              style={{ background: GOLD, color: "#0a0908", fontWeight: 500, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", padding: "20px 40px" }}
            >
              Request a quote
            </Link>
            <a
              href={PRIMARY_PHONE.href}
              className="outline-btn"
              style={{ border: "1px solid rgba(227,175,43,.5)", color: "#f7f5f1", fontWeight: 400, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", padding: "20px 40px" }}
            >
              Call {PRIMARY_PHONE.display}
            </a>
          </div>
        </div>
      </section>

      {/* ===== OTHER SERVICES ===== */}
      <section style={{ background: "#000", padding: "90px 56px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={eyebrow}>Also from {COMPANY.short}</div>
          <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="card-hover"
                style={{ border: "1px solid rgba(247,245,241,.1)", background: "#0f0d0b", padding: "28px 26px", display: "block", color: "#f7f5f1" }}
              >
                <h3 style={{ margin: "0 0 10px", fontFamily: "var(--font-display), serif", fontWeight: 400, fontSize: 22 }}>{o.title}</h3>
                <p style={{ margin: "0 0 16px", fontWeight: 300, fontSize: 14.5, lineHeight: 1.65, color: "rgba(247,245,241,.6)" }}>{o.blurb}</p>
                <span style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: GOLD }}>Learn more &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
