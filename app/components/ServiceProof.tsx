import Image from "next/image";
import Link from "next/link";
import { REVIEWS, formatReviewDate } from "../data/reviews";
import { getProjectsByService } from "../data/projects";
import { DraftTag } from "./DraftTag";

import { GOLD } from "../data/theme";

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
  lineHeight: 1.12,
};

/** Same truncation and card treatment as the review strip on /contact. */
function truncate(text: string, max = 220) {
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

/**
 * Reviews and finished work, mounted between PROCESS and FAQ on every
 * service page. Reviews always render — REVIEWS is never empty. The project
 * strip renders nothing when this service has no completed projects yet,
 * rather than a "coming soon" placeholder.
 */
export function ServiceProof({ serviceSlug, eyebrow: label }: { serviceSlug: string; eyebrow: string }) {
  const reviews = REVIEWS.slice(0, 3);
  const projects = getProjectsByService(serviceSlug);

  return (
    <section style={{ background: "#0b0a09", padding: "100px 56px" }}>
      <div className="reveal" style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={eyebrow}>{label}</div>
        <h2 className="h2" style={h2}>
          What clients <span style={{ fontStyle: "italic", color: GOLD }}>say</span>
        </h2>

        <div
          className="reviews-grid stagger-children"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            marginBottom: projects.length ? 64 : 0,
          }}
        >
          {reviews.map((r) => (
            <div
              key={r.name}
              className="card-hover reveal"
              style={{ background: "#0f0d0b", border: "1px solid rgba(247,245,241,.08)", padding: "26px 28px" }}
            >
              <p style={{ margin: "0 0 14px", fontSize: 14.5, fontWeight: 300, lineHeight: 1.7, color: "rgba(247,245,241,.85)" }}>
                &ldquo;{truncate(r.text)}&rdquo;
              </p>
              <div style={{ fontSize: 12, color: "rgba(247,245,241,.5)" }}>
                &mdash; {r.name}, {r.tag}
                {r.date && (
                  <>
                    {" "}&middot; <time dateTime={r.date}>{formatReviewDate(r.date)}</time>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {projects.length > 0 && (
          <div>
            <div style={{ ...eyebrow, marginBottom: 24 }}>Recent work</div>
            <div
              className="stagger-children"
              style={{ display: "grid", gridTemplateColumns: `repeat(${projects.length}, 1fr)`, gap: 24 }}
            >
              {projects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/gallery/${p.slug}`}
                  className="card-hover reveal"
                  style={{
                    display: "block",
                    position: "relative",
                    background: "#0f0d0b",
                    border: "1px solid rgba(247,245,241,.1)",
                    overflow: "hidden",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: 220 }}>
                    <Image
                      src={p.heroImage}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(15,13,11,0.9) 100%)",
                      }}
                    />
                    {p.imageDraft && (
                      <div style={{ position: "absolute", top: 14, right: 14 }}>
                        <DraftTag needs="Confirm these photos are from this specific job, not reference imagery" />
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "20px 22px 24px" }}>
                    <h3 style={{ margin: "0 0 6px", fontFamily: "var(--font-display), serif", fontWeight: 400, fontSize: 19 }}>
                      {p.title}
                    </h3>
                    <div style={{ fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", color: GOLD }}>
                      {p.neighbourhood} &middot; See project &rarr;
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
