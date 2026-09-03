# DESIGN.md — SS Carpentry and Renovations

Recorded from the shipped build, not from planning documents. `app/page.tsx` is the
undocumented design authority this system was reverse-derived from; other routes
(`/about`, `/contact`, `/gallery`, `/gallery/[slug]`, `/services/[slug]`,
`/services/tv-walls-lighting-panels`, `/guides/legal-basement-ottawa`) were audited
against it and partially reconciled in the session that produced this file. Where a
route still diverges from the rules below, that is a known gap, not a second system.

World: a dark, owner-led carpentry atelier — near-black grounds, a single warm gold
accent, a serif/sans pairing borrowed from print editorial, soft ambient shadows
(never hard offset), sharp rectangular edges except true circles (avatars, node
markers). No stock photography of people; unconfirmed content is marked, not fudged.

## Color

- **Accent — single-sourced.** `export const GOLD = "#e3af2b"` in `app/data/theme.ts`
  is the one brand accent token and is imported (`import { GOLD } from "../data/theme"`)
  by 9 files. Used for: links, focus rings, CTA fills, borders on interactive
  surfaces, italic accent words in headlines, hover states (`#f2c34a` is GOLD's
  fixed hover-lightened value, used consistently but not itself tokenized).
- **Foreground.** Body text and headings run on `#f7f5f1` (near-white) at full or
  reduced opacity (`rgba(247,245,241,.4–.9)`) for hierarchy — this opacity-ladder-on-one-value
  approach is the actual text-color system; there is no second neutral text hue.
- **Background near-blacks — NOT tokenized (real debt).** The dark ground is not one
  value. At minimum `#000`, `#0a0908`, `#0b0a09`, `#0f0d0b`, `#080706`, `#0c0a08`,
  `#0c0a09`, `#0f0e0c`, `#0d0c0a`, `#0d0b09`, plus several 3–6-digit near-black
  outliers (`#080808`, `#060505`, `#060504`, `#050404`, `#040404`, `#030303`,
  `#030302`) appear across `app/`. These read as visually interchangeable "black" but
  are not a shared token — a future pass should collapse them to a small ramp
  (e.g. base / raised / sunken) in `theme.ts`. Document this as unresolved, not solved.
- **Draft/placeholder color state.** `DraftTag`, `DraftBlock`, and `PlaceholderImage`
  render in brand gold by default — this is a stance ("a placeholder is a promise not
  yet kept," not an error), governed by `app/data/placeholders.ts`. Setting
  `NEXT_PUBLIC_DRAFT_TAGS_LOUD=1` swaps the palette to a red family
  (`#ff9d9d` / `rgba(255,72,72,*)`) for an internal review pass only; this red state is
  never customer-facing by default. `NEXT_PUBLIC_HIDE_DRAFT_TAGS=1` removes the
  markers entirely for a clean client preview. Do not read the red variant as a
  second system accent — it is a review-mode-only override of one component family.

## Typography

- **Two families, loaded via `next/font/google` in `app/layout.tsx`:**
  - `--font-display`: Cormorant Garamond (weights 300/400/500/600, incl. italic) —
    serif, used for all headings and the pull-quote/section-title voice.
  - `--font-sans`: Jost (weights 200/300/400/500) — used for body copy, labels,
    buttons, nav, and all numerals.
  - **Named rule: numerals never render in the display serif.** Stat-bar figures use
    `--font-sans` deliberately — in Cormorant Garamond the numeral "1" and capital "I"
    are near-identical strokes; Jost's "1" carries a flag and foot serif so it reads
    unambiguously as a digit (`app/page.tsx:342-345`).
  - **Named rule: one italic gold accent word per headline.** Primary headings mark
    exactly one word `fontStyle: "italic", color: GOLD` (hero, craft, portfolio, CTA,
    about, process headings — 10 instances in `page.tsx` alone). This is the
    homepage's signature rhetorical device, not a one-off.
- **Fluid display sizes (CSS `clamp()`, `app/globals.css`):** `.hero-h1`
  `clamp(34px,6.5vw,92px)`, `.h2-xl` `clamp(38px,6.5vw,100px)`, `.h2`
  `clamp(28px,4vw,56px)`, `.pull-quote` `clamp(24px,4vw,48px)`. These four are the
  closest thing to a real type scale in the build.
- **Type scale is not fully collapsed (real debt).** Below the fluid classes, body
  and label sizes are set as raw inline `fontSize` numbers per instance. `page.tsx`
  alone uses at least 20 distinct values (8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20,
  23, 24, 25, 26, 28, 32, 34, 56), several used only once or twice. There is a rough
  intent — 9–11px for uppercase labels, 14–17px for body/UI, 24px+ for sub-headings —
  but it is a tendency observed in the code, not an enforced scale. Do not treat these
  as fixed tokens; a future pass should collapse them to a named ramp.
- **Uppercase label voice.** Small (9–13px) uppercase labels — eyebrows, badges,
  buttons, nav links, stat captions — carry wide letter-spacing, almost always
  `0.1em`–`0.32em` (`.22em` and `.18em` are the most common values). This
  wide-tracked-uppercase-small-label is a real, pervasive convention; the specific
  tracking value is not fixed to one number.

## The eyebrow / section-spine pattern (named rule, homepage-canonical)

`page.tsx` defines a shared `eyebrow` style object (11px, `.32em` tracking, uppercase,
GOLD) and uses it as a Roman-numeral section spine: `"I / Our craft"`,
`"II / ..."`, etc., preceding every major section heading. This is the one canonical
kicker style in the system — single size, single weight, single color, tied to a
numbered section sequence. **Where other routes reproduce their own eyebrow instead of
importing this pattern, they have drifted from it** — the About page audit found three
different eyebrow sizes on one page and no Roman-numeral spine at all. That drift is a
defect to fix toward the homepage's version, not a second valid eyebrow style.

## Buttons and interactive states

- `.gold-btn` — solid GOLD fill, dark text (`#0a0908`), the primary CTA. Hover
  brightens to `#f2c34a`; active state scales to `0.96` and darkens
  (`filter: brightness(0.88)`). Minimum 44px touch target on nav/CTA instances.
- `.outline-btn` — bordered, transparent, fills to GOLD with dark text on hover.
- `.text-btn` — text-only link buttons; hover reduces opacity to `0.8` and shifts to
  the hover-gold; active drops to `0.65` opacity.
- `.nav-links a` — underline grows from 0 to 100% width on hover (bottom border, not
  text-decoration).
- `.card-hover` / `.gallery-tile` / `.service-row` — border brightens to
  `rgba(227,175,43,.55)` on hover; active scales to `0.985`.
- Global `:focus-visible` — 2px solid GOLD outline, 2px offset. Added once, applies
  site-wide.
- Shadows are consistently soft and ambient (`0 10–24px 24–64px rgba(0,0,0,0.5–0.9)`,
  large blur, low/no hard offset) — glow and depth, never a neobrutalist hard-offset
  box shadow. This is a real, consistent house convention, not an accident.

## Shape

- Circles (`borderRadius: "50%"`) are used only for true round elements — avatars,
  the timeline node markers, icon badges (18 occurrences).
- Everything else is sharp-edged. The only non-zero, non-circular radii in the build
  are small utility values (2px, 4px, 1px) on draft-tag chips — not a system rounded-corner
  scale, just incidental softening on two small components.

## Motion

- `ScrollReveal` (`app/components/ScrollReveal.tsx`) mounts once in the root layout,
  adds `js-loaded` to `<body>`, and drives one `IntersectionObserver` over
  `.reveal / .reveal-left / .reveal-right / .reveal-scale` (defined in
  `app/globals.css`). It re-subscribes on every `usePathname()` change so client-side
  navigation between routes still reveals correctly, not just full page loads.
- Reveal transitions are `0.85s cubic-bezier(0.16, 1, 0.3, 1)` on opacity + transform
  (translateY 35px / translateX ±40px / scale 0.94 → resting state). `.stagger-children`
  applies incremental delay (0.05s–0.55s) to up to 6 direct children.
- `.hero-reveal` elements reveal on a fixed 60ms timeout on mount rather than waiting
  for intersection — hero content is always above the fold, so it doesn't need the
  observer.
- `prefers-reduced-motion: reduce` is respected globally: reveal states and the
  timeline fill transition collapse to no transition, opacity 1, no transform.

## Layout and breakpoints

- Two real breakpoints: `1024px` and `768px`, plus one narrow cleanup query at `520px`
  for two-column stat/footer grids. All defined in `app/globals.css`.
- **`!important` usage is heavy in the responsive overrides (real debt).** Nearly
  every property inside the `1024px`/`768px`/`520px` media queries is flagged
  `!important` to beat inline `style={{}}` specificity, because the build is
  inline-style-first and only falls back to CSS classes for hover/responsive states
  CSS can express and inline styles cannot. This works but is fragile — a future pass
  should move more of the responsive logic off `!important` overrides.
- Fixed nav is 88px tall (74px on mobile, tracked via `--nav-height` custom property
  and `.nav-spacer`). `.hero-section` exists specifically to add extra top padding
  (104px on mobile) so hero content clears the fixed nav plus breathing room — the
  generic 80px mobile section padding is not enough on its own.
- Mobile nav is a full-height drawer (`SiteNav.tsx`) triggered by a 44×44px hamburger
  button, locks body scroll while open, closes on link click or viewport growth past
  the breakpoint.
- **Spacing is not strictly on a 4px grid (real debt).** Gap/padding values observed
  include off-grid numbers (7px, 18px, 22px, 26px, 52px) alongside grid-aligned ones
  (8, 12, 16, 20, 24, 28, 40, 48). Treat spacing as "roughly even, mostly multiples of
  4" rather than a strict token scale.

## Accessibility

- `:focus-visible` ring is global (see Buttons section).
- WCAG AA contrast fixes have been applied to several previously-failing text colors
  in this session's audit pass — this is a partial remediation, not a guarantee every
  low-opacity text instance in the codebase passes AA. (E.g., the About page audit
  flagged one remaining `rgba(247,245,241,.45)` at 10.5px failing AA; verify
  opacity-reduced text against its background before shipping new instances.)
- 44px minimum touch targets are applied on key interactive elements (nav CTAs,
  hamburger, mobile drawer links/buttons) — not exhaustively audited across every
  clickable element site-wide.
- `prefers-reduced-motion` is respected (see Motion).

## Draft/placeholder system

- `app/components/DraftTag.tsx` (`DraftTag`, `DraftBlock`) and
  `app/components/PlaceholderImage.tsx` mark content the business owner hasn't
  confirmed. Governed centrally by `app/data/placeholders.ts`
  (`DRAFT_TAGS_HIDDEN`, `DRAFT_TAGS_LOUD` flags read from env vars).
- The `needs` prop is team-facing only — carried in the `title` attribute for hover,
  never rendered as visible page copy. (One prior instance leaked internal jargon
  onto the About page's visible copy — that was a defect, not a pattern to repeat;
  keep all `needs` text out of rendered children.)
- `PlaceholderImage` enforces "no stock photography of people" as a durable content
  policy, not just an unfinished-page marker — the default caption states this
  explicitly.

## Data-driven content (source of truth)

`app/data/company.ts`, `about.ts`, `services.ts`, `projects.ts`, `reviews.ts`,
`theme.ts`, `placeholders.ts`, and `guides/` hold all business facts, copy, and the
one color token. Components read from these files; they must not hardcode duplicate
facts (phone numbers, ratings, service descriptions, credentials) inline. Where a
route defines fields on a data object that no component actually renders (observed on
`about.ts`: `title`/`foundingYear`/`team`/`serviceAreas` are unused), that is content
debt to either wire up or remove — not evidence the field is part of the system.

## Known, unresolved debt (do not treat as solved)

1. Background near-blacks are not tokenized — 17+ distinct near-black hex values in
   active use, no shared ramp in `theme.ts`.
2. Type scale is not fully collapsed — 20+ distinct raw `fontSize` values in
   `page.tsx` alone, beyond the four fluid `clamp()` classes.
3. `!important` usage in `globals.css` responsive overrides is heavy, driven by an
   inline-style-first component pattern that CSS media queries have to fight.
4. Spacing is not strictly on a 4px grid across the build.
5. Route-level drift from the homepage's canonical eyebrow/section-spine pattern
   exists on at least the About page (three eyebrow sizes, no Roman-numeral spine) —
   flagged here as a reconciliation target, not a valid alternate style.

---

*No sidecar file accompanies this DESIGN.md — the operating skill spec normally
consulted for sidecar format (`reference/document.md`) was not present in this
repository at the time of writing; this file was produced directly from the task's
explicit direction and the audited source.*
