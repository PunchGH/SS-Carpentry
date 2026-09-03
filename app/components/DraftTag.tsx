import { DRAFT_TAGS_HIDDEN, DRAFT_TAGS_LOUD } from "../data/placeholders";

const LOUD = { border: "rgba(255,138,138,.55)", bg: "rgba(255,72,72,.12)", text: "#ff9d9d" };
const QUIET = { border: "rgba(227,175,43,.55)", bg: "rgba(227,175,43,.12)", text: "#e3af2b" };

/**
 * Marks content the owner hasn't confirmed yet, so a placeholder can never be
 * mistaken for a real claim. Visible by default in every environment —
 * set NEXT_PUBLIC_HIDE_DRAFT_TAGS=1 to suppress for a clean client preview.
 *
 * Renders in brand gold — a placeholder isn't an error, it's a promise not
 * yet kept. Set NEXT_PUBLIC_DRAFT_TAGS_LOUD=1 for the red review-pass version.
 */
export function DraftTag({ needs }: { needs: string }) {
  if (DRAFT_TAGS_HIDDEN) return null;
  const c = DRAFT_TAGS_LOUD ? LOUD : QUIET;

  return (
    <span
      title={`Placeholder — ${needs}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        verticalAlign: "middle",
        marginLeft: 8,
        padding: "3px 8px",
        border: `1px solid ${c.border}`,
        background: c.bg,
        color: c.text,
        fontFamily: "var(--font-sans), sans-serif",
        fontWeight: 500,
        fontSize: 9,
        letterSpacing: ".18em",
        textTransform: "uppercase",
        borderRadius: 2,
        whiteSpace: "nowrap",
      }}
    >
      Placeholder
    </span>
  );
}

/**
 * Block-level variant for whole sections of unconfirmed content.
 *
 * `needs` is a note to us, not copy for the customer: it names what the owner
 * still has to supply and has previously leaked internal detail onto the live
 * page. It is carried in `title` so the team can hover for it, and never
 * rendered as visible text.
 */
export function DraftBlock({ needs, children }: { needs: string; children: React.ReactNode }) {
  if (DRAFT_TAGS_HIDDEN) return <>{children}</>;
  const c = DRAFT_TAGS_LOUD ? LOUD : QUIET;

  return (
    <div
      title={`Placeholder — ${needs}`}
      style={{
        position: "relative",
        border: `1px dashed ${DRAFT_TAGS_LOUD ? "rgba(255,138,138,.4)" : "rgba(227,175,43,.4)"}`,
        background: DRAFT_TAGS_LOUD ? "rgba(255,72,72,.04)" : "rgba(227,175,43,.04)",
        padding: "20px 20px 18px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontWeight: 500,
          fontSize: 9,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: c.text,
          marginBottom: 12,
        }}
      >
        Placeholder
      </div>
      {children}
    </div>
  );
}
