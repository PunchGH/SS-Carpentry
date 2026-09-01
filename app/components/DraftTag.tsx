import { DRAFT_TAGS_HIDDEN } from "../data/placeholders";

/**
 * Marks content the owner hasn't confirmed yet, so a placeholder can never be
 * mistaken for a real claim. Visible by default in every environment —
 * set NEXT_PUBLIC_HIDE_DRAFT_TAGS=1 to suppress for a clean client preview.
 */
export function DraftTag({ needs }: { needs: string }) {
  if (DRAFT_TAGS_HIDDEN) return null;

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
        border: "1px solid rgba(255,138,138,.55)",
        background: "rgba(255,72,72,.12)",
        color: "#ff9d9d",
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
 */
export function DraftBlock({ needs, children }: { needs: string; children: React.ReactNode }) {
  if (DRAFT_TAGS_HIDDEN) return <>{children}</>;

  return (
    <div
      style={{
        position: "relative",
        border: "1px dashed rgba(255,138,138,.4)",
        background: "rgba(255,72,72,.04)",
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
          color: "#ff9d9d",
          marginBottom: 12,
        }}
      >
        Placeholder — {needs}
      </div>
      {children}
    </div>
  );
}
