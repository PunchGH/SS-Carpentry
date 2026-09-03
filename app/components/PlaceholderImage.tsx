import type { CSSProperties } from "react";
import { DRAFT_TAGS_HIDDEN, DRAFT_TAGS_LOUD } from "../data/placeholders";

type PlaceholderImageProps = {
  /** Team-facing only. Carried in `title`, never rendered as page copy. */
  needs: string;
  /** Customer-facing. Defaults to a line that owns the no-stock-photos position. */
  caption?: string;
  aspectRatio?: string; // e.g. "4/3", "16/9", "3/4"
  height?: number | string;
  width?: number | string;
  style?: CSSProperties;
  className?: string;
};

const DEFAULT_CAPTION = "We don't use stock photos of people. Real site photos go up as jobs finish.";

/**
 * Renders a clearly marked placeholder block for images the owner has not yet supplied.
 * POLICY: No stock photograph may stand in for a real person, a real project, or a real credential.
 *
 * Styled in brand gold, not red — this is a stance the business is taking
 * (real photos only), not an error state. Set NEXT_PUBLIC_DRAFT_TAGS_LOUD=1
 * for the red internal review-pass version.
 */
export function PlaceholderImage({
  needs,
  caption = DEFAULT_CAPTION,
  aspectRatio,
  height,
  width,
  style,
  className,
}: PlaceholderImageProps) {
  const accent = DRAFT_TAGS_LOUD ? "#ff9d9d" : "#e3af2b";
  const borderColor = DRAFT_TAGS_LOUD ? "rgba(255, 110, 110, 0.45)" : "rgba(227, 175, 43, 0.45)";
  const stripeColor = DRAFT_TAGS_LOUD ? "rgba(255, 72, 72, 0.04)" : "rgba(227, 175, 43, 0.05)";
  const stripeColorStrong = DRAFT_TAGS_LOUD ? "rgba(255, 72, 72, 0.08)" : "rgba(227, 175, 43, 0.09)";

  return (
    <div
      className={className}
      title={`Placeholder — ${needs}`}
      style={{
        position: "relative",
        width: width || "100%",
        height: height || (aspectRatio ? undefined : "100%"),
        aspectRatio: aspectRatio,
        border: `1.5px dashed ${borderColor}`,
        background: `repeating-linear-gradient(45deg, ${stripeColor}, ${stripeColor} 12px, ${stripeColorStrong} 12px, ${stripeColorStrong} 24px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        textAlign: "center",
        boxSizing: "border-box",
        overflow: "hidden",
        ...style,
      }}
    >
      {!DRAFT_TAGS_HIDDEN && (
        <div style={{ maxWidth: 280, pointerEvents: "none" }}>
          {/* Icon */}
          <div
            style={{
              width: 38,
              height: 38,
              margin: "0 auto 12px",
              borderRadius: "50%",
              background: DRAFT_TAGS_LOUD ? "rgba(255, 72, 72, 0.15)" : "rgba(227, 175, 43, 0.15)",
              border: `1px solid ${borderColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: accent,
              fontSize: 16,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>

          <div
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: accent,
              marginBottom: 6,
            }}
          >
            Placeholder Photo
          </div>

          <div
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 12,
              fontWeight: 300,
              lineHeight: 1.45,
              color: "rgba(247, 245, 241, 0.7)",
            }}
          >
            {caption}
          </div>
        </div>
      )}
    </div>
  );
}
