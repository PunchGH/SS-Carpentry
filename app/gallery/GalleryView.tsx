"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { DraftTag } from "../components/DraftTag";
import { ABOUT_DATA } from "../data/about";
import { PRIMARY_PHONE } from "../data/company";
import { PROJECTS } from "../data/projects";
import { SERVICES } from "../data/services";

import { GOLD } from "../data/theme";

function GalleryContent() {
  const searchParams = useSearchParams();
  const activeService = searchParams.get("service") || "all";

  const filteredProjects = useMemo(() => {
    if (activeService === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.serviceSlug === activeService);
  }, [activeService]);

  return (
    <div style={{ background: "#0b0a09", color: "#f7f5f1", minHeight: "100vh" }}>
      {/* Header Section */}
      <section
        className="hero-section"
        style={{
          padding: "150px 56px 60px",
          borderBottom: "1px solid rgba(247, 245, 241, 0.08)",
          background: "radial-gradient(ellipse at 50% 0%, rgba(227, 175, 43, 0.08) 0%, rgba(11, 10, 9, 0) 70%)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: ".32em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 18,
            }}
          >
            Selected Work · Ottawa
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display), serif",
              fontWeight: 300,
              fontSize: "clamp(36px, 5.5vw, 62px)",
              lineHeight: 1.05,
              margin: "0 0 24px",
              letterSpacing: "-.02em",
            }}
          >
            Recent work, fitted with <span style={{ fontStyle: "italic", color: GOLD }}>precision</span>.
          </h1>
          <p
            style={{
              fontWeight: 300,
              fontSize: 17,
              lineHeight: 1.75,
              maxWidth: 680,
              color: "rgba(247, 245, 241, 0.7)",
              margin: "0 0 40px",
            }}
          >
            A small set of real projects from around Ottawa. Click any one to see photography and, where a client
            left a review, their own words on Google.
          </p>

          {/* Service Filter */}
          <div
            aria-label="Filter gallery by service"
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              paddingTop: 10,
            }}
          >
            <Link
              href="/gallery"
              scroll={false}
              aria-current={activeService === "all" ? "page" : undefined}
              style={{
                background: activeService === "all" ? GOLD : "rgba(247, 245, 241, 0.04)",
                color: activeService === "all" ? "#0a0908" : "#f7f5f1",
                border: activeService === "all" ? `1px solid ${GOLD}` : "1px solid rgba(247, 245, 241, 0.12)",
                fontFamily: "var(--font-sans), sans-serif",
                fontWeight: activeService === "all" ? 600 : 400,
                fontSize: 12,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                padding: "10px 20px",
                minHeight: 44,
                display: "inline-flex",
                alignItems: "center",
                transition: "all 0.2s ease",
              }}
            >
              All Work ({PROJECTS.length})
            </Link>
            {SERVICES.map((s) => {
              const isSelected = activeService === s.slug;
              const count = PROJECTS.filter((p) => p.serviceSlug === s.slug).length;
              return (
                <Link
                  key={s.slug}
                  href={`/gallery?service=${encodeURIComponent(s.slug)}`}
                  scroll={false}
                  aria-current={isSelected ? "page" : undefined}
                  style={{
                    background: isSelected ? GOLD : "rgba(247, 245, 241, 0.04)",
                    color: isSelected ? "#0a0908" : "#f7f5f1",
                    border: isSelected ? `1px solid ${GOLD}` : "1px solid rgba(247, 245, 241, 0.12)",
                    fontFamily: "var(--font-sans), sans-serif",
                    fontWeight: isSelected ? 600 : 400,
                    fontSize: 12,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    padding: "10px 20px",
                    minHeight: 44,
                    display: "inline-flex",
                    alignItems: "center",
                    transition: "all 0.2s ease",
                  }}
                >
                  {s.navLabel} {count > 0 && `(${count})`}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section style={{ padding: "80px 56px 120px" }}>
        <div className="reveal" style={{ maxWidth: 1200, margin: "0 auto" }}>
          {filteredProjects.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 24px",
                border: "1px dashed rgba(247, 245, 241, 0.15)",
                background: "rgba(247, 245, 241, 0.02)",
              }}
            >
              <h2 style={{ fontFamily: "var(--font-display), serif", fontSize: 26, fontWeight: 300, margin: "0 0 12px" }}>
                No projects found in this category yet
              </h2>
              <p style={{ color: "rgba(247, 245, 241, 0.6)", fontSize: 15, margin: "0 0 24px" }}>
                We are constantly adding new project case studies across the Greater Ottawa Area.
              </p>
              <Link
                href="/gallery"
                scroll={false}
                style={{
                  background: GOLD,
                  color: "#0a0908",
                  border: "none",
                  padding: "12px 28px",
                  fontSize: 12,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  minHeight: 44,
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                View all projects
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(360px, 100%), 1fr))",
                gap: 36,
              }}
            >
              {filteredProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/gallery/${p.slug}`}
                  className="card-hover"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "#0f0d0b",
                    border: "1px solid rgba(247, 245, 241, 0.1)",
                    overflow: "hidden",
                    textDecoration: "none",
                    color: "inherit",
                    position: "relative",
                  }}
                >
                  {/* Image Container */}
                  <div style={{ position: "relative", width: "100%", height: 260, overflow: "hidden" }}>
                    <Image
                      src={p.heroImage}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(15,13,11,0.95) 100%)",
                      }}
                    />

                    {/* Top Location / Type Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        background: "rgba(10, 9, 8, 0.8)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(227, 175, 43, 0.3)",
                        padding: "4px 10px",
                        fontSize: 10,
                        letterSpacing: ".16em",
                        textTransform: "uppercase",
                        color: GOLD,
                      }}
                    >
                      <span>{p.neighbourhood}</span>
                      <span style={{ opacity: 0.5 }}>·</span>
                      <span>{p.propertyType}</span>
                    </div>

                    {(p.draft || p.imageDraft) && (
                      <div style={{ position: "absolute", top: 16, right: 16 }}>
                        <DraftTag
                          needs={
                            p.imageDraft
                              ? "Confirm these photos are from this specific job, and confirm remaining project facts"
                              : "owner project confirmation"
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: "26px 28px 30px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-display), serif",
                        fontSize: 24,
                        fontWeight: 300,
                        lineHeight: 1.2,
                        margin: "0 0 14px",
                      }}
                    >
                      {p.title}
                    </h2>

                    <p
                      style={{
                        fontSize: 14.5,
                        fontWeight: 300,
                        lineHeight: 1.65,
                        color: "rgba(247, 245, 241, 0.65)",
                        margin: "0 0 20px",
                        flex: 1,
                      }}
                    >
                      {p.summary}
                    </p>

                    {/* Scope Items */}
                    <div
                      style={{
                        borderTop: "1px solid rgba(247, 245, 241, 0.08)",
                        paddingTop: 16,
                        marginBottom: 20,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          letterSpacing: ".2em",
                          textTransform: "uppercase",
                          color: "rgba(247, 245, 241, 0.5)",
                          marginBottom: 8,
                        }}
                      >
                        Key Scope
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px" }}>
                        {p.scope.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            style={{
                              fontSize: 12,
                              fontWeight: 300,
                              color: "rgba(247, 245, 241, 0.85)",
                              background: "rgba(247, 245, 241, 0.05)",
                              padding: "3px 8px",
                              borderRadius: 2,
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Fact Strip & Action */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: "1px solid rgba(247, 245, 241, 0.08)",
                        paddingTop: 16,
                        marginTop: "auto",
                      }}
                    >
                      <div style={{ fontSize: 11, color: "rgba(247, 245, 241, 0.5)", letterSpacing: ".06em" }}>
                        <span>{p.completed}</span>
                        <span style={{ margin: "0 6px", color: GOLD }}>·</span>
                        <span>{p.duration}</span>
                      </div>

                      <span
                        className="text-btn"
                        style={{
                          fontSize: 11,
                          letterSpacing: ".14em",
                          textTransform: "uppercase",
                          color: GOLD,
                          fontWeight: 500,
                        }}
                      >
                        Case Study &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Areas Served Strip (Local SEO Stage 2) */}
      <section
        style={{
          background: "#080706",
          borderTop: "1px solid rgba(247, 245, 241, 0.08)",
          borderBottom: "1px solid rgba(247, 245, 241, 0.08)",
          padding: "50px 56px",
        }}
      >
        <div className="reveal" style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: ".28em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 16,
            }}
          >
            Areas Served Across Ottawa
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px 18px",
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            {ABOUT_DATA.serviceAreas.map((n) => (
              <span
                key={n}
                style={{
                  fontSize: 13,
                  fontWeight: 300,
                  color: "rgba(247, 245, 241, 0.65)",
                  letterSpacing: ".04em",
                }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: "120px 56px", textAlign: "center", background: "#0b0a09" }}>
        <div className="reveal" style={{ maxWidth: 720, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: ".32em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 16,
            }}
          >
            Start Your Project
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: 300,
              lineHeight: 1.15,
              margin: "0 0 20px",
            }}
          >
            Have a project in mind for your home?
          </h2>
          <p
            style={{
              fontSize: 16,
              fontWeight: 300,
              lineHeight: 1.7,
              color: "rgba(247, 245, 241, 0.7)",
              margin: "0 0 36px",
            }}
          >
            Request a free on-site consultation. We measure carefully, provide a fixed written quote, and reply within
            one business day.
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
                transition: "all 0.2s ease",
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
                transition: "all 0.2s ease",
              }}
            >
              Call {PRIMARY_PHONE.display}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export function GalleryView() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", background: "#0b0a09", padding: "160px 56px", textAlign: "center", color: "#f7f5f1" }}>
          Loading projects gallery...
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}
