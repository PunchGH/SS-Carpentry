/**
 * PLACEHOLDER REGISTRY
 *
 * Every invented value on the site is declared here. Nothing may be invented
 * inline in a component — a placeholder that isn't in this file is a bug.
 *
 * Rules (see IMPLEMENTATION_PLAN_FRONTEND.md → Placeholder policy):
 *   1. Anything we don't have from the owner is a placeholder, not a guess.
 *   2. Every placeholder renders a visible <DraftTag /> so it can't ship unnoticed.
 *   3. Launch gate: `grep -rn "TODO(owner)" app/` must return nothing.
 *   4. ZERO STOCK HUMANS POLICY: No stock photograph may stand in for a real
 *      person, a real project, or a real credential. Text may be drafted;
 *      people and proof may not.
 *
 * Draft tags are visible everywhere by default. To hide them (e.g. a client
 * preview where the tags would distract), set NEXT_PUBLIC_HIDE_DRAFT_TAGS=1.
 * Hiding them does NOT make the content real — the launch gate still applies.
 */

export type DraftItem = {
  id: string;
  /** What the owner has to tell us before this becomes real. */
  needs: string;
  /** Where it shows up. */
  where: string;
  /** Matches the priority key in OWNER_QUESTIONS.md */
  priority: "blocks-launch" | "blocks-content" | "improves-conversion";
};

/**
 * TODO(owner): every entry below is unanswered. Tracked in OWNER_QUESTIONS.md.
 */
export const DRAFT_INVENTORY: DraftItem[] = [
  {
    id: "price-bands",
    needs: "Real price range per service, minimum job size, what drives cost up/down",
    where: "Service pages — price band block",
    priority: "blocks-content",
  },
  {
    id: "service-photos",
    needs: "Photography for bathrooms, TV walls / lighting panels, flooring & tiling, finished basements",
    where: "Service page heroes and galleries, home page craft cards",
    priority: "blocks-content",
  },
  {
    id: "warranty-terms",
    needs: "Warranty length, what it covers, what happens after handover",
    where: "Service pages — guarantee block",
    priority: "blocks-content",
  },
  {
    id: "insurance-figures",
    needs: "Liability coverage amount, WSIB clearance status, business/HST number",
    where: "Footer trust strip, FAQ, About page credentials",
    priority: "blocks-launch",
  },
  {
    id: "payment-schedule",
    needs: "Deposit percentage and milestone payment schedule",
    where: "Service pages — how quotes work",
    priority: "blocks-content",
  },
  {
    id: "permit-responsibility",
    needs: "Who pulls permits for legal basements, and which licensed trades are brought in",
    where: "Legal Basements service page",
    priority: "blocks-content",
  },
  {
    id: "project-details",
    needs: "For each real project: neighbourhood, property type, scope, duration, date",
    where: "Portfolio captions, service page galleries, /gallery case studies",
    priority: "blocks-content",
  },
  {
    id: "lead-destination",
    needs: "Where quote form submissions should be delivered — the form currently discards them",
    where: "Quote form",
    priority: "blocks-launch",
  },
  {
    id: "service-timelines",
    needs: "Typical turnaround and on-site build timelines for kitchens, bathrooms, TV walls, flooring/tiling, and basement permits/construction",
    where: "Service pages — FAQs and process steps",
    priority: "blocks-content",
  },
  {
    id: "licensed-trades",
    needs: "Confirmation on electrical (ESA/ECRA) and plumbing arrangements across all services — in-house vs licensed trade partners",
    where: "Service pages — What's included, Legal Basements, FAQs, About page",
    priority: "blocks-launch",
  },
  {
    id: "material-supply-exclusions",
    needs: "Standard policy on homeowner-supplied vs contractor-sourced materials (fixtures, tile, flooring, TV mounts, appliances) and disposal fees",
    where: "Service pages — What's included / Not included",
    priority: "blocks-content",
  },
  {
    id: "review-dates",
    needs:
      "Review dates (month/year) for the three original Google reviews, plus a direct permalink to Ron Hunt's review. Ron Hunt's date is known (2026-09-01).",
    where: "Home page reviews section, Reviews data",
    priority: "improves-conversion",
  },
  {
    id: "opening-hours",
    needs:
      "Weekly opening hours copied verbatim from the Google Business Profile. Removed from JSON-LD rather than guessed — the old value (Mon-Sat 08:00-18:00) contradicted companyinfo.md's 'Opens 9 AM'.",
    where: "layout.tsx JSON-LD, contact page",
    priority: "blocks-launch",
  },
  {
    id: "founding-year",
    needs: "Exact founding year / total years of trade experience in Ottawa",
    where: "About page — hero and history",
    priority: "blocks-launch",
  },
  {
    id: "owner-bio",
    needs: "Owner background story, apprenticeship/trade history, and philosophy in his own words",
    where: "About page — founder section",
    priority: "blocks-content",
  },
  {
    id: "owner-portrait",
    needs: "Real high-resolution portrait or on-site photo of the owner working",
    where: "About page and home page atelier section",
    priority: "blocks-launch",
  },
  {
    id: "team-roster",
    needs: "Crew details — solo master craftsman model vs names and roles of core site crew",
    where: "About page — team section",
    priority: "blocks-content",
  },
  {
    id: "credentials",
    needs: "Registered legal business name, HST number, active WSIB clearance #, and liability policy certificate",
    where: "About page — verification strip, footer",
    priority: "blocks-launch",
  },
];

export const DRAFT_TAGS_HIDDEN = process.env.NEXT_PUBLIC_HIDE_DRAFT_TAGS === "1";
