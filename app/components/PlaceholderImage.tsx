import type { CSSProperties } from "react";
import { DRAFT_TAGS_HIDDEN } from "../data/placeholders";

type PlaceholderImageProps = {
  needs: string;
  aspectRatio?: string; // e.g. "4/3", "16/9", "3/4"
  height?: number | string;
  width?: number | string;
  style?: CSSProperties;
  className?: string;
};

/**
 * Renders a clearly marked placeholder block for images the owner has not yet supplied.
 * POLICY: No stock photograph may stand in for a real person, a real project, or a real credential.
 */
export function PlaceholderImage({
  needs,
  aspectRatio,
  height,
  width,
  style,
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: width || "100%",
        height: height || (aspectRatio ? undefined : "100%"),
        aspectRatio: aspectRatio,
        border: "1.5px dashed rgba(255, 110, 110, 0.45)",
        background:
          "repeating-linear-gradient(45deg, rgba(255, 72, 72, 0.04), rgba(255, 72, 72, 0.04) 12px, rgba(255, 72, 72, 0.08) 12px, rgba(255, 72, 72, 0.08) 24px)",
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
              background: "rgba(255, 72, 72, 0.15)",
              border: "1px solid rgba(255, 110, 110, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ff9d9d",
              fontSize: 16,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff9d9d"
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
              color: "#ff9d9d",
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
            {needs}
          </div>
        </div>
      )}
    </div>
  );
}
