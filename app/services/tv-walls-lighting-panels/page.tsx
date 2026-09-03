import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "../../components/SiteNav";
import { SiteFooter } from "../../components/SiteFooter";
import { ServiceFaqList } from "../../components/ServiceFaq";
import { DraftTag, DraftBlock } from "../../components/DraftTag";
import { COMPANY, PRIMARY_PHONE } from "../../data/company";
import { SERVICES } from "../../data/services";
import { LightingToggle } from "./LightingToggle";
import { QuoteForm } from "../../components/QuoteForm";
import { ServiceProof } from "../../components/ServiceProof";

import { GOLD } from "../../data/theme";

export const metadata: Metadata = {
  title: "Architectural TV Feature Walls & Custom Millwork | Ottawa | SS Carpentry",
  description:
    "Custom TV feature walls, acoustic wood slat panelling, bookmatched stone veneers, and concealed 2700K architectural backlighting in Ottawa. 100% hidden wires.",
  alternates: { canonical: "/services/tv-walls-lighting-panels" },
  openGraph: {
    title: "Architectural TV Feature Walls & Custom Millwork | Ottawa",
    description:
      "Precision-crafted media feature walls in Ottawa. Acoustic wood slats, floating credenzas, concealed LED backlighting, and structural internal blocking with zero visible cables.",
    url: "/services/tv-walls-lighting-panels",
    type: "website",
    images: [
      {
        url: "/assets/portfolio-wardrobe.jpg",
        width: 1200,
        height: 630,
        alt: "Custom acoustic wood slat TV feature wall in Ottawa",
      },
    ],
  },
};

const typography = {
  h2: {
    margin: "0 0 24px",
    fontFamily: "var(--font-display), serif",
    fontWeight: 300,
    lineHeight: 1.1,
    letterSpacing: "-0.01em",
  },
  eyebrow: {
    fontFamily: "var(--font-sans), sans-serif",
    fontWeight: 400,
    fontSize: 11,
    letterSpacing: ".32em",
    textTransform: "uppercase" as const,
    color: GOLD,
    marginBottom: 16,
  },
};

const MATERIALS = [
  {
    title: "Acoustic Wood Slats",
    subtitle: "Natural White Oak & American Walnut",
    description:
      "Hand-finished solid timber slats adhered to 9mm high-density recycled PET acoustic felt. Significantly dampens room flutter echo (NRC 0.85) while introducing rich, rhythmic architectural texture.",
    tags: ["White Oak", "Walnut", "PET Acoustic Felt", "NRC 0.85"],
  },
  {
    title: "Architectural Fluting & Reeded Panels",
    subtitle: "Precision Half-Round & Scalloped Profiles",
    description:
      "Deeply contoured linear fluting that creates continuous light-and-shadow dynamics as daylight shifts. Available in clear-finished hardwoods or custom painted satin finishes.",
    tags: ["Reeded Detail", "Hardwood Core", "Dimensional Relief"],
  },
  {
    title: "Bookmatched Natural Hardwood Veneers",
    subtitle: "Quarter-Sawn Oak, Walnut & Exotic Species",
    description:
      "Sequenced architectural veneer leaves hand-matched for continuous grain flow across wall surfaces, hidden touch-latch media doors, and flush storage returns.",
    tags: ["Continuous Grain", "Hand-Selected", "Satin Clear Coat"],
  },
  {
    title: "Porcelain & Sintered Stone Slabs",
    subtitle: "Zero-Porosity Ultra-Compact Surfaces",
    description:
      "Seamless large-format porcelain and sintered stone (Dekton/Neolith style) resistant to scratches, UV, and direct radiant heat. Engineered for integrated electric fireplace surrounds.",
    tags: ["Heat Safe", "Fireplace Ready", "Zero Porosity"],
  },
  {
    title: "Custom Satin Lacquered MDF",
    subtitle: "Multi-Coat Furniture Finish in Any Custom Tone",
    description:
      "Cabinet-grade moisture-resistant MDF pre-sprayed with durable polyurethane lacquer. Scribed tight to walls and ceilings with invisible hairline joints.",
    tags: ["Benjamin Moore Tones", "Ultra-Matte / Satin", "Seamless Joints"],
  },
];

const ENGINEERING_DETAILS = [
  {
    number: "01",
    title: "Structural Timber Internal Blocking",
    copy: "We open the wall cavity during framing to install structural 2x6 framing and 3/4″ Baltic birch plywood reinforcement lagged directly into house studs. Rated for displays up to 100″+ and heavy articulating cantilever mounts.",
  },
  {
    number: "02",
    title: "Segregated Low & High-Voltage Chases",
    copy: "Dual separate in-wall conduit pathways isolate 120V power from HDMI 2.1, eARC audio, and fiber lines. Wide-radius flexible chases allow future cable upgrades without ever cutting drywall.",
  },
  {
    number: "03",
    title: "Floating Console & Magnetic Access",
    copy: "Wall-hung credenzas with 45° mitred waterfall corners and concealed heavy-duty German brackets (Häfele). Includes integrated cable brush pass-throughs and a magnetic access panel for low-voltage transformers.",
  },
  {
    number: "04",
    title: "Acoustic Niches & Thermal Clearance",
    copy: "Recessed soundbar niches tailored to the exact millimetre of your audio hardware, plus calculated convective airflow channels to keep gaming consoles, receivers, and electric fireplaces operating cool.",
  },
];

const TV_WALL_FAQS = [
  {
    q: "Will all power cables, HDMI lines, and equipment cords be 100% invisible?",
    a: "Yes. Eliminating wires is the defining standard of our feature walls. We install dual in-wall conduit pathways inside the stud cavity to route all signal and power connections between the television and floating credenza. Nothing hangs down, and no plastic surface wire-tracks are ever used.",
  },
  {
    q: "Can your feature walls safely carry large screens (77″, 85″, to 98″+)?",
    a: "Yes. We never anchor heavy hardware into hollow drywall. During framing rough-in, we open the cavity and lag structural 2x6 timber backing and 3/4-inch Baltic birch plywood directly into your home's structural studs. This internal reinforcement comfortably supports displays exceeding 200 lbs and heavy full-motion pull-out mounts.",
  },
  {
    q: "Who handles the high-voltage 120V electrical outlet relocations?",
    a: "All high-voltage 120V receptacle moves, new branch circuits, and recessed clock-boxes are installed under Electrical Safety Authority (ESA) permits by certified licensed electrical contractors (ECRA/ESA). Ontario Electrical Safety Code strictly prohibits running flexible TV power cords inside enclosed wall cavities; we ensure all work is fully compliant and insurable.",
  },
  {
    q: "How is the concealed 2700K LED accent lighting controlled?",
    a: "Our architectural LED channel extrusions run on dedicated 24V Class-2 power drivers safely housed in an accessible, ventilated compartment. We can wire the lighting directly to a Lutron Caséta smart in-wall dimmer, integrate with your home automation system, or supply an architectural wireless RF dimmer remote.",
  },
  {
    q: "Can you incorporate an electric fireplace and recessed soundbar?",
    a: "Yes. Recessed linear electric fireplaces (Dimplex, Modern Flames, Napoleon) and custom soundbar niches (Sonos Arc, Bose) are planned into the initial shop drawings. We engineer specific thermal clearances, intake vents, and heat-resistant backing materials like porcelain or sintered stone.",
  },
  {
    q: "How long does on-site installation take in our home?",
    a: "Because all panels, acoustic slat modules, and floating consoles are custom-fabricated and pre-finished in our Ottawa workshop, on-site installation is remarkably quick and clean. Most projects are completed in 3 to 5 business days from initial framing to final lighting tuning.",
  },
  {
    q: "What happens if I upgrade my TV or AV gear in five years?",
    a: "We install smooth, wide-diameter conduit chases with pre-installed pull strings behind the millwork. Pulling a new HDMI 2.1 or optical cable between your television and media credenza takes five minutes without disturbing your millwork.",
  },
];

export default function TvWallsServicePage() {
  const otherServices = SERVICES.filter((s) => s.slug !== "tv-walls-lighting-panels");

  return (
    <div id="main-content" style={{ width: "100%", overflowX: "hidden", background: "#000", color: "#f7f5f1" }}>
      <SiteNav />
      <div className="nav-spacer" />

      {/* ===== 1. PHOTO-LED HERO ===== */}
      <section
        style={{
          position: "relative",
          minHeight: "78vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <Image
          src="/assets/portfolio-wardrobe.jpg"
          alt="Custom architectural acoustic slat TV feature wall in Ottawa"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.38 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        <div
          className="hero-content reveal"
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 0 72px",
          }}
        >
          {/* Breadcrumbs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
              fontSize: 11,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "rgba(247,245,241,.6)",
            }}
          >
            <Link href="/" style={{ color: "rgba(247,245,241,.6)" }}>
              Home
            </Link>
            <span>/</span>
            <Link href="/#craft" style={{ color: "rgba(247,245,241,.6)" }}>
              Services
            </Link>
            <span>/</span>
            <span style={{ color: GOLD }}>TV Walls &amp; Millwork Panels</span>
          </div>

          <h1
            className="hero-h1"
            style={{
              margin: "0 0 18px",
              fontFamily: "var(--font-display), serif",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-.015em",
              maxWidth: 960,
            }}
          >
            Architectural TV Feature Walls &amp; Custom Millwork
          </h1>

          <p
            style={{
              margin: "0 0 34px",
              fontWeight: 300,
              fontSize: "clamp(16px, 1.8vw, 20px)",
              lineHeight: 1.6,
              color: "rgba(247, 245, 241, 0.8)",
              maxWidth: 680,
            }}
          >
            Precision-crafted acoustic slat walls, bookmatched surfaces, and concealed 2700K backlighting — built with zero visible wires.
          </p>

          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", marginBottom: 28 }}>
            <Link
              href="/contact"
              className="gold-btn"
              style={{
                background: GOLD,
                color: "#0a0908",
                fontWeight: 500,
                fontSize: 11.5,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                padding: "18px 36px",
                display: "inline-block",
              }}
            >
              Request a quote
            </Link>
            <a
              href="#materials"
              className="outline-btn"
              style={{
                border: "1px solid rgba(247,245,241,.3)",
                color: "#f7f5f1",
                fontWeight: 400,
                fontSize: 11.5,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                padding: "18px 32px",
                display: "inline-block",
              }}
            >
              Explore materials
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <DraftTag needs="owner's on/off photography pair per shot list" />
            <span style={{ fontSize: 11, color: "rgba(247,245,241,.6)", letterSpacing: ".1em" }}>
              Awaiting owner portfolio photography
            </span>
          </div>
        </div>
      </section>

      {/* ===== 2. INTERACTIVE LIGHTING TRANSFORMATION ===== */}
      <section style={{ background: "#0b0a09", padding: "110px 56px", borderBottom: "1px solid rgba(247,245,241,.08)" }}>
        <div className="reveal" style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ maxWidth: 840, marginBottom: 48 }}>
            <div style={typography.eyebrow}>Lighting Experience</div>
            <h2 className="h2" style={typography.h2}>
              The evening <span style={{ fontStyle: "italic", color: GOLD }}>transformation</span>: concealed 2700K lighting
            </h2>
            <p
              style={{
                margin: 0,
                fontWeight: 300,
                fontSize: 17,
                lineHeight: 1.75,
                color: "rgba(247, 245, 241, 0.75)",
              }}
            >
              In daytime, our millwork enriches the living room with natural oak grain, stone texture, and acoustic calm. When evening arrives, concealed architectural LED backlighting turns the entire wall into an atmospheric centerpiece with zero harsh glare.
            </p>
          </div>

          <LightingToggle />
        </div>
      </section>

      {/* ===== 3. MATERIALS & FINISHES ===== */}
      <section id="materials" style={{ background: "#000", padding: "110px 56px" }}>
        <div className="reveal" style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={typography.eyebrow}>Architectural Surfaces</div>
          <h2 className="h2" style={{ ...typography.h2, maxWidth: 800 }}>
            Curated materials, built for <span style={{ fontStyle: "italic", color: GOLD }}>acoustic warmth</span> and longevity
          </h2>
          <p
            style={{
              margin: "0 0 56px",
              fontWeight: 300,
              fontSize: 17,
              lineHeight: 1.75,
              color: "rgba(247, 245, 241, 0.7)",
              maxWidth: 720,
            }}
          >
            Every home has unique acoustics, light exposure, and architectural style. We work with five proven surface systems, custom-milled and fitted to your room dimensions.
          </p>

          <div
            className="stagger-children"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 28,
            }}
          >
            {MATERIALS.map((mat, i) => (
              <div
                key={mat.title}
                style={{
                  background: "#0a0908",
                  border: "1px solid rgba(247, 245, 241, 0.1)",
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "border-color 0.3s ease",
                }}
                className="card-hover reveal"
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display), serif",
                      fontSize: 16,
                      color: "rgba(227, 175, 43, 0.6)",
                      marginBottom: 16,
                      letterSpacing: ".08em",
                    }}
                  >
                    0{i + 1}
                  </div>
                  <h3
                    style={{
                      margin: "0 0 6px",
                      fontFamily: "var(--font-display), serif",
                      fontSize: 24,
                      fontWeight: 400,
                      color: "#f7f5f1",
                    }}
                  >
                    {mat.title}
                  </h3>
                  <div
                    style={{
                      fontSize: 12,
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                      color: GOLD,
                      marginBottom: 16,
                      fontWeight: 400,
                    }}
                  >
                    {mat.subtitle}
                  </div>
                  <p
                    style={{
                      margin: "0 0 24px",
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(247, 245, 241, 0.66)",
                    }}
                  >
                    {mat.description}
                  </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 16, borderTop: "1px solid rgba(247,245,241,.07)" }}>
                  {mat.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 10.5,
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: "rgba(247, 245, 241, 0.6)",
                        background: "rgba(247, 245, 241, 0.05)",
                        padding: "4px 10px",
                        border: "1px solid rgba(247, 245, 241, 0.1)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. CONCEALED LIGHTING ENGINEERING ===== */}
      <section style={{ background: "#0b0a09", padding: "100px 56px", borderTop: "1px solid rgba(247,245,241,.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: 64,
              alignItems: "center",
            }}
            className="quote-grid reveal"
          >
            <div>
              <h2 className="h2" style={typography.h2}>
                Concealed lighting engineering: <span style={{ fontStyle: "italic", color: GOLD }}>zero diode spotting</span>
              </h2>
              <p
                style={{
                  margin: "0 0 28px",
                  fontWeight: 300,
                  fontSize: 16.5,
                  lineHeight: 1.8,
                  color: "rgba(247, 245, 241, 0.75)",
                }}
              >
                Cheap LED strip tape pasted behind furniture produces visible dots, harsh reflections, and failing adhesive. Architectural lighting requires purposeful mechanical engineering:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ borderLeft: `2px solid ${GOLD}`, paddingLeft: 20 }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 500, color: "#f7f5f1" }}>
                    45° &amp; Recessed Aluminum Extrusions
                  </h3>
                  <p style={{ margin: 0, fontSize: 14.5, fontWeight: 300, lineHeight: 1.65, color: "rgba(247, 245, 241, 0.65)" }}>
                    Heavy-gauge aluminum channels act as passive heat sinks for maximum diode lifespan, topped with frosted opal silicone diffusers that blend individual diodes into a continuous, seamless blade of light.
                  </p>
                </div>

                <div style={{ borderLeft: "2px solid rgba(227, 175, 43, 0.4)", paddingLeft: 20 }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 500, color: "#f7f5f1" }}>
                    Concealed 24V Driver Service Bay
                  </h3>
                  <p style={{ margin: 0, fontSize: 14.5, fontWeight: 300, lineHeight: 1.65, color: "rgba(247, 245, 241, 0.65)" }}>
                    Low-voltage Class-2 power transformers are housed in a ventilated, magnetically accessible bay inside the lower credenza. They are never buried inaccessible behind closed drywall.
                  </p>
                </div>

                <div style={{ borderLeft: "2px solid rgba(227, 175, 43, 0.4)", paddingLeft: 20 }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 500, color: "#f7f5f1" }}>
                    Smart Dimmer &amp; Scene Integration
                  </h3>
                  <p style={{ margin: 0, fontSize: 14.5, fontWeight: 300, lineHeight: 1.65, color: "rgba(247, 245, 241, 0.65)" }}>
                    Smooth 0.1% to 100% dimming with zero audible hum or high-frequency flicker. Ready for Lutron Caséta, Control4, Philips Hue, or architectural wall keypads.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Callout Card */}
            <div
              style={{
                background: "#060505",
                border: "1px solid rgba(227, 175, 43, 0.3)",
                padding: "44px 38px",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: ".24em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginBottom: 14,
                }}
              >
                Lighting Calibration Standards
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: 32,
                  fontWeight: 300,
                  lineHeight: 1.2,
                  marginBottom: 24,
                  color: "#f7f5f1",
                }}
              >
                2700K Warm White &middot; 90+ CRI True Colour
              </div>
              <p
                style={{
                  margin: "0 0 28px",
                  fontSize: 15,
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "rgba(247, 245, 241, 0.65)",
                }}
              >
                We calibrate all backlighting to 2700K — matching classic residential tungsten warmth — with a Colour Rendering Index (CRI) above 90 so natural wood grain and stone veining appear rich and authentic, never washed out.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, borderTop: "1px solid rgba(247,245,241,.1)", paddingTop: 20 }}>
                <div>
                  <div style={{ fontSize: 24, fontFamily: "var(--font-display), serif", color: GOLD }}>50,000 hrs</div>
                  <div style={{ fontSize: 11, color: "rgba(247,245,241,.5)", letterSpacing: ".12em", textTransform: "uppercase" }}>Diode Lifespan</div>
                </div>
                <div>
                  <div style={{ fontSize: 24, fontFamily: "var(--font-display), serif", color: GOLD }}>24V Class-2</div>
                  <div style={{ fontSize: 11, color: "rgba(247,245,241,.5)", letterSpacing: ".12em", textTransform: "uppercase" }}>Low-Voltage Safe</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. THE INVISIBLE DETAILS (ENGINEERING & CABLE MANAGEMENT) ===== */}
      <section style={{ background: "#000", padding: "110px 56px" }}>
        <div className="reveal" style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 className="h2" style={typography.h2}>
            The invisible details: <span style={{ fontStyle: "italic", color: GOLD }}>precision carpentry</span> inside the wall
          </h2>
          <p
            style={{
              margin: "0 0 60px",
              fontWeight: 300,
              fontSize: 17,
              lineHeight: 1.75,
              color: "rgba(247, 245, 241, 0.7)",
              maxWidth: 760,
            }}
          >
            What makes a TV wall exceptional isn&apos;t just the surface you see — it&apos;s the structural engineering and hidden conduit routing behind it that ensures safety, silence, and effortless cable pulls for decades.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 28,
            }}
          >
            {ENGINEERING_DETAILS.map((eng) => (
              <div
                key={eng.number}
                style={{
                  background: "#0b0a09",
                  border: "1px solid rgba(247, 245, 241, 0.1)",
                  padding: "36px 30px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: 22,
                    color: GOLD,
                    marginBottom: 16,
                  }}
                >
                  {eng.number}
                </div>
                <h3
                  style={{
                    margin: "0 0 12px",
                    fontFamily: "var(--font-display), serif",
                    fontSize: 21,
                    fontWeight: 400,
                    lineHeight: 1.25,
                    color: "#f7f5f1",
                  }}
                >
                  {eng.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 300,
                    fontSize: 14.5,
                    lineHeight: 1.7,
                    color: "rgba(247, 245, 241, 0.65)",
                  }}
                >
                  {eng.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. ELECTRICAL HONESTY & ESA COMPLIANCE ===== */}
      <section style={{ background: "#0b0a09", padding: "80px 56px", borderTop: "1px solid rgba(227,175,43,.2)", borderBottom: "1px solid rgba(227,175,43,.2)" }}>
        <div className="reveal" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 32,
              background: "rgba(227, 175, 43, 0.04)",
              border: "1px solid rgba(227, 175, 43, 0.35)",
              padding: "36px 40px",
            }}
            className="quote-grid"
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(227, 175, 43, 0.15)",
                border: `1px solid ${GOLD}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: GOLD,
                fontSize: 20,
              }}
            >
              ✓
            </div>
            <div>
              <div style={typography.eyebrow}>Electrical Safety &amp; Code Compliance</div>
              <h2
                style={{
                  margin: "0 0 12px",
                  fontFamily: "var(--font-display), serif",
                  fontSize: 24,
                  fontWeight: 400,
                  color: "#f7f5f1",
                }}
              >
                100% Certified Electrical: ESA Permits by Licensed Contractors
              </h2>
              <p
                style={{
                  margin: 0,
                  fontWeight: 300,
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "rgba(247, 245, 241, 0.8)",
                }}
              >
                In Ontario, running flexible television power cords or extension cords inside enclosed wall cavities is an illegal fire hazard. All 120V high-voltage outlet relocations, recessed clock-boxes, and dedicated circuit extensions are performed exclusively under Electrical Safety Authority (ESA) permits by certified licensed electrical contractors (ECRA/ESA). Your home remains fully code-compliant, safe, and insured.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. PRICE BAND & COST DRIVERS ===== */}
      <section style={{ background: "#000", padding: "110px 56px" }}>
        <div className="reveal" style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={typography.eyebrow}>Transparent Investment</div>
          <h2 className="h2" style={typography.h2}>
            An honest <span style={{ fontStyle: "italic", color: GOLD }}>cost guide</span> before you call
          </h2>

          <DraftBlock needs="real price bands and cost drivers from the owner">
            <div style={{ display: "flex", gap: 54, flexWrap: "wrap", marginBottom: 36 }}>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: "rgba(247,245,241,.5)",
                    marginBottom: 8,
                  }}
                >
                  Starting from
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: 44,
                    color: GOLD,
                    lineHeight: 1,
                  }}
                >
                  $3,500
                </div>
                <div style={{ fontSize: 13, color: "rgba(247,245,241,.5)", marginTop: 6 }}>
                  Standard accent slat wall + TV mounting
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: "rgba(247,245,241,.5)",
                    marginBottom: 8,
                  }}
                >
                  Most projects
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: 44,
                    lineHeight: 1,
                    color: "#f7f5f1",
                  }}
                >
                  $4,500 – $9,500
                </div>
                <div style={{ fontSize: 13, color: "rgba(247,245,241,.5)", marginTop: 6 }}>
                  Full-width acoustic wall, floating credenza &amp; 2700K LED
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: "rgba(247,245,241,.5)",
                    marginBottom: 8,
                  }}
                >
                  Architectural suites
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: 44,
                    lineHeight: 1,
                    color: "#f7f5f1",
                  }}
                >
                  $10,000+
                </div>
                <div style={{ fontSize: 13, color: "rgba(247,245,241,.5)", marginTop: 6 }}>
                  Integrated electric fireplace &amp; bookmatched stone
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: 11,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "rgba(247,245,241,.5)",
                marginBottom: 16,
              }}
            >
              Primary factors that shape your quote
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              {[
                "Wall span width & ceiling height (8ft standard vs 10–12ft vaulted/two-storey)",
                "Surface selection (painted MDF vs natural white oak slats vs sintered stone slabs)",
                "Floating media credenza configuration (soft-close drawers vs flip-down acoustic doors)",
                "Number of independent LED lighting zones, drivers, and smart dimmer controllers",
                "Framing and thermal flue provisions for recessed linear electric fireplaces",
              ].map((driver) => (
                <div
                  key={driver}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: GOLD, flexShrink: 0, marginTop: 1 }}>·</span>
                  <span
                    style={{
                      fontWeight: 300,
                      fontSize: 14.5,
                      lineHeight: 1.6,
                      color: "rgba(247,245,241,.75)",
                    }}
                  >
                    {driver}
                  </span>
                </div>
              ))}
            </div>
          </DraftBlock>

          <p
            style={{
              margin: "32px 0 0",
              fontWeight: 300,
              fontSize: 15,
              lineHeight: 1.75,
              color: "rgba(247, 245, 241, 0.6)",
              maxWidth: 680,
            }}
          >
            Every quote from SS Carpentry is fixed and itemized following an in-home measurement. There are no surprise change orders or hidden trade fees.
          </p>
        </div>
      </section>

      {/* ===== 8. THE 4-STEP PROCESS ===== */}
      <section style={{ background: "#0b0a09", padding: "100px 56px" }}>
        <div className="reveal" style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 className="h2" style={typography.h2}>
            From measurement to <span style={{ fontStyle: "italic", color: GOLD }}>first movie night</span>
          </h2>

          <div
            className="stagger-children"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 24,
              marginTop: 48,
            }}
          >
            {[
              {
                step: "01",
                title: "In-Home AV & Architecture Audit",
                text: "We inspect your wall framing, record screen model and audio gear, evaluate room lighting, and present hardwood and stone material samples in your actual room.",
              },
              {
                step: "02",
                title: "Elevation Drawing & Fixed Quote",
                text: "You receive a precise architectural elevation detailing slat spacing, TV placement, floating console proportions, conduit pathways, and a guaranteed fixed cost.",
              },
              {
                step: "03",
                title: "Shop Fabrication & On-Site Rough-In",
                text: "Components are precision-machined in our workshop. On site, we set up dust protection, install solid 2x6 timber backing, run conduits, and coordinate ESA electrical.",
              },
              {
                step: "04",
                title: "Panelling, Screen Fit & Lighting Handover",
                text: "Wall panels are scribed tight, the display is flush-mounted, cables are pulled through chases, and lighting dimmers are calibrated. We leave the room spotless.",
              },
            ].map((p) => (
              <div
                key={p.step}
                className="reveal"
                style={{
                  background: "#0f0d0b",
                  border: "1px solid rgba(247, 245, 241, 0.1)",
                  padding: "32px 26px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: 22,
                    color: "rgba(227, 175, 43, 0.65)",
                    marginBottom: 14,
                  }}
                >
                  {p.step}
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
                  {p.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 300,
                    fontSize: 14.5,
                    lineHeight: 1.65,
                    color: "rgba(247, 245, 241, 0.65)",
                  }}
                >
                  {p.text}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 44,
              border: "1px solid rgba(227,175,43,.35)",
              background: "rgba(227,175,43,.05)",
              padding: "24px 30px",
              display: "flex",
              alignItems: "center",
              gap: 18,
              flexWrap: "wrap",
            }}
          >
            <span style={{ width: 28, height: 1, background: GOLD }} />
            <span style={{ fontWeight: 300, fontSize: 16, color: "rgba(247,245,241,.9)" }}>
              1-Day Response Promise: We reply to every TV wall and millwork enquiry within one working day.
            </span>
          </div>
        </div>
      </section>

      {/* ===== 9. PROOF ===== */}
      <ServiceProof serviceSlug="tv-walls-lighting-panels" eyebrow="Client Proof" />

      {/* ===== 10. FREQUENTLY ASKED QUESTIONS ===== */}
      <section style={{ background: "#0b0a09", padding: "110px 56px" }}>
        <div className="reveal" style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 className="h2" style={typography.h2}>Frequently asked questions</h2>
          <p
            style={{
              margin: "0 0 40px",
              fontWeight: 300,
              fontSize: 16.5,
              lineHeight: 1.75,
              color: "rgba(247, 245, 241, 0.7)",
            }}
          >
            Practical answers to the engineering, permit, and installation questions Ottawa homeowners ask before hiring us.
          </p>

          <ServiceFaqList faqs={TV_WALL_FAQS} />
        </div>
      </section>

      {/* ===== 11. FINAL ESTIMATE CTA ===== */}
      <section
        style={{
          background: "#000",
          padding: "110px 56px",
          borderTop: "1px solid rgba(227,175,43,.25)",
        }}
      >
        <div className="reveal" style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h2 className="h2" style={{ ...typography.h2, margin: "0 0 20px" }}>
            Ready to design your <span style={{ fontStyle: "italic", color: GOLD }}>feature wall</span>?
          </h2>
          <p
            style={{
              margin: "0 0 36px",
              fontWeight: 300,
              fontSize: 17,
              lineHeight: 1.75,
              color: "rgba(247, 245, 241, 0.7)",
            }}
          >
            Send us your wall dimensions, room photos, or inspiration ideas. We&apos;ll get back to you within one working day with an honest estimate.
          </p>
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "left" }}>
            <QuoteForm source="service-tv-walls-lighting-panels" defaultService="TV Walls & Lighting Panels" />
          </div>
          <p style={{ margin: "28px 0 0", fontWeight: 300, fontSize: 14, color: "rgba(247,245,241,.55)" }}>
            Prefer to talk it through? Call{" "}
            <a href={PRIMARY_PHONE.href} style={{ color: GOLD, textDecoration: "underline" }}>
              {PRIMARY_PHONE.display}
            </a>
            .
          </p>
        </div>
      </section>

      {/* ===== 12. OTHER SERVICES ===== */}
      <section style={{ background: "#0b0a09", padding: "90px 56px", borderTop: "1px solid rgba(247,245,241,.08)" }}>
        <div className="reveal" style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={typography.eyebrow}>Also from {COMPANY.short}</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {otherServices.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="card-hover"
                style={{
                  border: "1px solid rgba(247,245,241,.1)",
                  background: "#0f0d0b",
                  padding: "28px 26px",
                  display: "block",
                  color: "#f7f5f1",
                }}
              >
                <h3 style={{ margin: "0 0 10px", fontFamily: "var(--font-display), serif", fontWeight: 400, fontSize: 22 }}>
                  {o.title}
                </h3>
                <p style={{ margin: "0 0 16px", fontWeight: 300, fontSize: 14.5, lineHeight: 1.65, color: "rgba(247,245,241,.6)" }}>
                  {o.blurb}
                </p>
                <span style={{ fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: GOLD }}>
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
