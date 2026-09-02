import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DraftTag } from "../../components/DraftTag";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteNav } from "../../components/SiteNav";
import { COMPANY, PRIMARY_PHONE } from "../../data/company";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectReview,
  getProjectService,
  PROJECTS,
} from "../../data/projects";
import { ProjectImageGrid } from "./ProjectImageGrid";

const GOLD = "#e3af2b";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | SS Carpentry & Renovations",
    };
  }

  return {
    title: `${project.title} (${project.neighbourhood}) | SS Carpentry & Renovations Ottawa`,
    description: project.summary,
    openGraph: {
      title: `${project.title} in ${project.neighbourhood} | SS Carpentry Ottawa`,
      description: project.summary,
      images: [project.heroImage],
    },
  };
}

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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const review = getProjectReview(project);
  const service = getProjectService(project);

  // Next / Previous navigation calculation
  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  // Structured Data (JSON-LD) for Local Project
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    image: project.images.map((img) => `https://sscarpentryandrenovations.com${img.src}`),
    locationCreated: {
      "@type": "Place",
      name: `${project.neighbourhood}, Ottawa, ON`,
    },
    creator: {
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
        {/* Top Breadcrumb & Hero */}
        <div
          style={{
            padding: "135px 56px 40px",
            borderBottom: "1px solid rgba(247, 245, 241, 0.08)",
            background: "radial-gradient(ellipse at 50% 0%, rgba(227, 175, 43, 0.08) 0%, rgba(11, 10, 9, 0) 70%)",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            {/* Breadcrumb Navigation */}
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
                marginBottom: 24,
              }}
            >
              <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
                Home
              </Link>
              <span>/</span>
              <Link href="/gallery" style={{ color: "inherit", textDecoration: "none" }}>
                Gallery
              </Link>
              <span>/</span>
              <span style={{ color: GOLD }}>{project.neighbourhood}</span>
            </nav>

            {/* Eyebrow & Project Title */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
              <span
                style={{
                  fontWeight: 300,
                  fontSize: 11,
                  letterSpacing: ".28em",
                  textTransform: "uppercase",
                  color: GOLD,
                }}
              >
                {service ? service.navLabel : "Carpentry & Renovation"}
              </span>
              {project.draft && <DraftTag needs="owner project facts" />}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display), serif",
                fontWeight: 300,
                fontSize: "clamp(34px, 5vw, 56px)",
                lineHeight: 1.08,
                margin: "0 0 24px",
                letterSpacing: "-.02em",
                maxWidth: 900,
              }}
            >
              {project.title}
            </h1>

            <p
              style={{
                fontWeight: 300,
                fontSize: 18,
                lineHeight: 1.7,
                maxWidth: 780,
                color: "rgba(247, 245, 241, 0.78)",
                margin: "0 0 36px",
              }}
            >
              {project.summary}
            </p>

            {/* Fact Strip (Above the Fold) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16,
                padding: "24px 28px",
                background: "rgba(247, 245, 241, 0.03)",
                border: "1px solid rgba(227, 175, 43, 0.25)",
              }}
            >
              <div>
                <div style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: GOLD, marginBottom: 4 }}>
                  Neighbourhood
                </div>
                <div style={{ fontSize: 15, fontWeight: 400, color: "#f7f5f1" }}>{project.neighbourhood}, Ottawa</div>
              </div>

              <div>
                <div style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: GOLD, marginBottom: 4 }}>
                  Property Era / Type
                </div>
                <div style={{ fontSize: 15, fontWeight: 400, color: "#f7f5f1" }}>{project.propertyType}</div>
              </div>

              <div>
                <div style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: GOLD, marginBottom: 4 }}>
                  Build Duration
                </div>
                <div style={{ fontSize: 15, fontWeight: 400, color: "#f7f5f1" }}>{project.duration}</div>
              </div>

              <div>
                <div style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: GOLD, marginBottom: 4 }}>
                  Completion Date
                </div>
                <div style={{ fontSize: 15, fontWeight: 400, color: "#f7f5f1" }}>{project.completed}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Content & Scope */}
        <section style={{ padding: "60px 56px 40px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48 }}>
              {/* Left Column: Story & Narrative */}
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontWeight: 300,
                    fontSize: 28,
                    marginBottom: 20,
                  }}
                >
                  Project Overview &amp; Execution
                </h2>
                {project.description.map((paragraph, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: 16,
                      fontWeight: 300,
                      lineHeight: 1.8,
                      color: "rgba(247, 245, 241, 0.72)",
                      marginBottom: 18,
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Right Column: Key Scope */}
              <div>
                <div
                  style={{
                    background: "#0f0d0b",
                    border: "1px solid rgba(247, 245, 241, 0.1)",
                    padding: "32px 32px 36px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display), serif",
                      fontWeight: 300,
                      fontSize: 22,
                      margin: "0 0 18px",
                      color: "#f7f5f1",
                    }}
                  >
                    Scope of Work
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                    {project.scope.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: 14.5,
                          fontWeight: 300,
                          lineHeight: 1.6,
                          color: "rgba(247, 245, 241, 0.8)",
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  {service && (
                    <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(247, 245, 241, 0.08)" }}>
                      <div style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
                        Service Category
                      </div>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-btn"
                        style={{
                          fontSize: 13,
                          letterSpacing: ".1em",
                          textTransform: "uppercase",
                          color: "#f7f5f1",
                          borderBottom: "1px solid rgba(227,175,43,.4)",
                          paddingBottom: 2,
                        }}
                      >
                        Explore {service.title} Service &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photography Grid with Lightbox Integration */}
        <section style={{ padding: "40px 56px 80px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: GOLD, marginBottom: 8 }}>
                  Project Photography
                </div>
                <h2 style={{ fontFamily: "var(--font-display), serif", fontWeight: 300, fontSize: 32, margin: 0 }}>
                  Craftsmanship Details
                </h2>
              </div>
              <span style={{ fontSize: 12, color: "rgba(247, 245, 241, 0.5)", letterSpacing: ".08em" }}>
                Click any image to enlarge
              </span>
            </div>

            <ProjectImageGrid images={project.images} />
          </div>
        </section>

        {/* Attached Google Review (Stage 4 Proof) */}
        {review && (
          <section style={{ padding: "60px 56px", background: "#0f0d0b", borderTop: "1px solid rgba(247, 245, 241, 0.08)" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <div
                style={{
                  border: "1px solid rgba(227, 175, 43, 0.3)",
                  background: "rgba(227, 175, 43, 0.03)",
                  padding: "40px 44px",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <GoogleLogo size={22} />
                    <span style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: GOLD }}>
                      Verified Client Review
                    </span>
                  </div>
                  <div style={{ color: GOLD, letterSpacing: 2 }}>★★★★★</div>
                </div>

                <p
                  style={{
                    fontSize: 16.5,
                    fontFamily: "var(--font-sans), sans-serif",
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: "rgba(247, 245, 241, 0.9)",
                    margin: "0 0 24px",
                  }}
                >
                  &ldquo;{review.text}&rdquo;
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(247, 245, 241, 0.08)",
                    paddingTop: 16,
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 15, color: "#f7f5f1" }}>{review.name}</div>
                    <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(247, 245, 241, 0.5)", marginTop: 2 }}>
                      {review.tag}
                    </div>
                  </div>

                  <a
                    href={review.reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-btn"
                    style={{
                      fontSize: 11,
                      color: GOLD,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      borderBottom: "1px solid rgba(227, 175, 43, 0.4)",
                      paddingBottom: 2,
                    }}
                  >
                    View Original on Google Maps ↗
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Next / Previous Project Navigation */}
        <section
          style={{
            padding: "50px 56px",
            borderTop: "1px solid rgba(247, 245, 241, 0.08)",
            borderBottom: "1px solid rgba(247, 245, 241, 0.08)",
            background: "#080706",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <Link
              href={`/gallery/${prevProject.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: GOLD }}>
                &larr; Previous Project
              </span>
              <span style={{ fontSize: 15, fontWeight: 400, color: "#f7f5f1" }}>{prevProject.title}</span>
            </Link>

            <Link
              href="/gallery"
              style={{
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "rgba(247, 245, 241, 0.6)",
                textDecoration: "none",
                padding: "8px 16px",
                border: "1px solid rgba(247, 245, 241, 0.12)",
              }}
            >
              All Projects ({allProjects.length})
            </Link>

            <Link
              href={`/gallery/${nextProject.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: GOLD }}>
                Next Project &rarr;
              </span>
              <span style={{ fontSize: 15, fontWeight: 400, color: "#f7f5f1" }}>{nextProject.title}</span>
            </Link>
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{ padding: "100px 56px", textAlign: "center", background: "#0b0a09" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: ".32em",
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: 16,
              }}
            >
              Discuss Your Renovation
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
              Ready to start your {project.neighbourhood} project?
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
              We provide fixed itemized written quotes and respond to all inquiries within one business day.
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
