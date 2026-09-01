# Implementation Plan — Front-End Update (Phase 2)

**Scope:** UI/UX changes + the site's first multi-page routing. Company-info changes live in `IMPLEMENTATION_PLAN.md` — do that one first, since both touch the same constants.

**Current state:** everything is one `"use client"` component, `app/page.tsx` (~1014 lines). That's the main constraint driving §A below.

---

## Model routing

| Model | Use for | Tasks here |
|---|---|---|
| **Opus** | Architecture, judgment, anything ambiguous or trust-related | §A routing design, §F frictions strategy, owner-name/trust tension, final review |
| **Sonnet** | Single-file UI work with visual judgment | §C timeline, §B stat tiles, card equalisation, responsive CSS, screenshot checks |
| **Gemini** | High-volume mechanical work off a fixed spec | 4 service pages from an approved template, name find/replace, metadata/keyword expansion, copy first drafts |

**Rule:** whoever writes it, the orchestrator verifies — `tsc`, `build`, and real screenshots. Never accept a self-reported pass.

---

## A. Service pages + "Our craft" section — *Opus designs, Gemini fills*

**Architectural prerequisite.** `page.tsx` is a client component, so its data constants can't be imported by server components. Before building pages:

1. Move `CRAFT_ITEMS` (→ rename `SERVICES`), `COMPANY`, `REVIEWS`, `FAQS` into `app/data/` (plain TS, no `"use client"`).
2. Give each service a `slug`, `title`, `blurb`, `image`, plus page-only fields: `intro`, `whatsIncluded[]`, `process[]`, `faqs[]`, `seo{title,description}`.
3. Build **one** dynamic route `app/services/[slug]/page.tsx` with `generateStaticParams` + `generateMetadata` — server component, so each page gets real per-page SEO. Not 4 hand-written routes.
4. Shared `ServicePageLayout` = hero, body, gallery, FAQ, quote CTA. Nav/footer extracted to shared components so they appear on every page.

**Card changes (home page):**
- Already `repeat(2, 1fr)`; add `gridAutoRows: 1fr` so rows match, and cap each `blurb` at ~110 characters so cards are visually identical.
- CTA text → **"Learn more"** on all four. Delete the per-item `cta` field (item 1 currently says "Request consultation").
- CTA becomes a `<Link href={/services/${slug}}>`, not `onClick={scrollToForm}`.
- Whole card clickable; keep the visible "Learn more →" affordance.

**Content per page** — see §F, these pages are where the friction gaps get fixed.

### ✅ §A is BUILT. Handoff for the remaining service pages — read this before editing.

The architecture, the route, the shared components and one worked example page are done and verified. **Do not rebuild any of it.** The only remaining work is filling content.

**What exists:**

| File | What it is |
|---|---|
| `app/data/services.ts` | The four services. **This is the only file you edit for content.** |
| `app/data/company.ts` | Business facts. Never duplicate these inline. |
| `app/data/reviews.ts` | Real reviews — never edit the wording. |
| `app/data/placeholders.ts` | Registry of everything the owner still owes us. |
| `app/services/[slug]/page.tsx` | Renders every service page. **Do not add per-service routes.** |
| `app/components/SiteNav.tsx`, `SiteFooter.tsx` | Shared chrome, already on every page. |
| `app/components/ServiceFaq.tsx` | The FAQ accordion. |
| `app/components/DraftTag.tsx` | `<DraftTag>` / `<DraftBlock>` placeholder markers. |

**Your task:** three services — `kitchens-bathrooms`, `tv-walls-lighting-panels`, `flooring-tiling` — are `contentStatus: "draft"` and full of `TODO(owner):` strings. Rewrite them to match the depth of `legal-basements`, which is the worked example.

**Rules:**
1. **Only edit `app/data/services.ts`.** Adding a service to the array creates its page automatically. If you find yourself editing the route file, stop — you've misread the task.
2. **Never invent a fact.** Prices, warranty terms, timelines, who does the electrical, insurance — all unknown. Leave the `TODO(owner):` text in place and keep `draft: true`. A placeholder is correct; a plausible guess is a defect.
3. **You may write** general craft/process copy that is true of any competent renovator, in the existing voice: plain, concrete, no superlatives, no "we pride ourselves".
4. **`blurb` ≤ 110 characters** — longer text breaks the equal-height card grid.
5. **No owner's name** anywhere. Refer to "the owner" or "our lead carpenter". The one exception is the review text in `reviews.ts`, which stays verbatim.
6. **Canadian spelling and context** — CAD, Ontario Building Code, WSIB. Never UK bodies (TrustMark, FMB, JCT).
7. `notIncluded` is not padding — stating exclusions up front is what prevents quote disputes (friction guide Stage 7).
8. Flip `contentStatus` to `"complete"` only when a page has no `TODO(owner):` left.

**When done:** `npx tsc --noEmit`, then `npm run build`, and confirm all four routes still prerender. Then screenshot each page at 1440px and 390px.

## B. Hero stat tiles — *Sonnet*

- **The "1" reads as capital I.** It's Cormorant Garamond, a display serif. Fix: render the three stat numerals in Jost (sans) instead. Screenshot-compare before/after — if `5.0` loses too much elegance, fall back to spelling it "One".
- **Google reviews tile:** small text `3 Google 5.0★ reviews` → **`3 five-star Google reviews`**. Put the real Google logo inline — the `GoogleLogo` component already exists at `page.tsx:31`, reuse it, don't draw a new one.
- Keep the tile order; check the tile row still fits at 390px wide.

## C. "How it works" → timeline — *Sonnet*

Replace the 4-card grid (`page.tsx:606–630`) with a timeline:
- **Desktop:** horizontal, connecting gold rule through the step markers, 4 nodes.
- **Mobile:** vertical, rule down the left, nodes stacked — do not just shrink the horizontal one.
- Keep existing `PROCESS` icons + `01–04` numbering; reuse the gold circular icon treatment already used in "Why SS".
- Animate the rule drawing in on scroll using the existing `reveal` / `stagger-children` classes — no new animation library.

## D. "Why SS" — *no change this phase* ✅ decided

Leave the section exactly as it is. Do not restyle, reword, or re-grid it. Once §C becomes a timeline this will be the only 4-up card grid on the page — that is accepted and intentional for now.

## E. Owner's name — *Gemini mechanical, Opus judges the two edge cases*

Remove "Akash" from the site; the owner may still be referenced by role. 20 occurrences across 20 lines — 14 in `page.tsx`, 6 in `layout.tsx`. 19 get changed; `page.tsx:188` is the kept exception.

Straight replacements → "the owner" / "our lead carpenter" / "Owner & Lead Carpenter": lines 242, 388, 442 (nav "About Akash" → "About us"), 519, 752, 774 (alt text), 782, 793, 823, 827, 937, 987, 1009; `layout.tsx` 31, 41, 48, 49, 81, 147.

**Two exceptions — not part of the find/replace:**
1. **Review text at line 188 contains "Akash".** ✅ **Decided: keep verbatim.** It is the customer's own published wording and we link to the original on Google. Leave the string untouched — the name appearing here is an accepted exception, not a miss.
2. **`akash-owner.jpg`** — rename the file, keep the photo. A face with a role but no name is still strong proof (§F Stage 4); an empty section is not.

## F. `websitefrictions.md` audit — *Opus*

✅ **Decided: adapt everything to Canada/Ontario.** The guide is UK-specific — do **not** copy its accreditations across, TrustMark/FMB/JCT don't exist here. Use Ontario equivalents throughout: WSIB clearance, liability cover with a stated amount, HST number, RenoMark/BBB, Tarion where applicable, Ontario Building Code for permits. All prices in CAD. Canadian spelling and date formats.

| Stage (weight) | Status now | Fix |
|---|---|---|
| 4 — Vetting (24) | **Partial.** Reviews have names + live Google links ✅, real address ✅, own photos ✅. Missing: review dates, insurance amount, business number, project dates | Add dates to reviews; state liability cover + WSIB in a footer trust strip; keep the owner photo (§E) |
| 3 — Budget (15) | **Absent.** No pricing signal at all | ✅ Build price bands + a cost-factors explainer per service page, using **clearly-marked placeholder numbers** (see Placeholder policy). Owner confirms real figures before launch |
| 5 — First contact (14) | **Good.** 4-field form ✅, no budget demand ✅, "what happens next" ✅. Missing: tappable phone in header, WhatsApp | Header call button + mobile sticky call bar (already in Plan 1); add WhatsApp |
| 6 — Response (12) | **Strong.** Process section + "within one working day" ✅ | Make the response promise more prominent — it's the single best differentiator per the guide |
| 7 — Quotes (10) | **Absent** | "How our quotes are structured" block on service pages: what's included, what's excluded, how variations work |
| 2 — Feasibility (9) | **Absent** | Highest-value content win: **Legal Basements** is literally a permits/Ontario Building Code/egress topic. Write it properly and it earns search traffic the other pages won't |
| 1 — Daydream (6) | **Absent.** Portfolio labels are `"Walnut kitchen · Westboro"` only | Each project needs: property type, neighbourhood, scope, duration, date |
| 8 — Commitment (10) | **Absent** | Payment schedule, warranty terms, dispute route. Guide's benchmark: 10–15% deposit normal, 40–50% upfront is a red flag |

**Tension to resolve (Opus):** the guide's strongest evidence says named team members with real faces drive vetting trust — directly against the owner's wish (§E). The role-without-name compromise is the recommendation, but the client should hear the tradeoff rather than have it decided silently.

---

## Placeholder policy

Build with placeholders so layout work isn't blocked on the owner — but **no invented fact may ship silently**. Every placeholder must be:

1. Sourced from a single `app/data/placeholders.ts`, never inlined at the point of use.
2. Wrapped in a `PLACEHOLDER` marker + `// TODO(owner):` comment naming exactly what's needed.
3. Findable in one command: `grep -rn "TODO(owner)" app/`.
4. Visually flagged in dev — render a small "draft" tag on placeholder content when `NODE_ENV !== "production"`, so nobody forgets what's real.

**Launch gate:** the site does not go live until `grep -rn "TODO(owner)" app/` returns nothing. Placeholder prices, warranty terms, insurance figures and project dates are claims a real business would be held to — they are for layout only.

## Decided

- ✅ "Why SS" — unchanged this phase (§D)
- ✅ Owner name stays in the Google review as an exception (§E)
- ✅ All guidance adapted to Canada/Ontario, not UK (§F)
- ✅ Architecture refactor before service pages (§A)
- ✅ Legal Basements gets real permits/code content (§F Stage 2)
- ✅ Price bands built now with placeholder figures, owner confirms later
- ✅ Photos, project details, warranty and trust figures all use marked placeholders

## Still open — tracked in `OWNER_QUESTIONS.md`

Everything unresolved is now a question for the owner rather than a design decision. See `OWNER_QUESTIONS.md` for the full list, ordered by what blocks launch.

---

## Checklist

**A · Architecture + service pages** — Opus, done
- [x] Constants moved to `app/data/`, `page.tsx` still builds
- [x] `SERVICES` extended with slug + page fields
- [x] `app/services/[slug]/page.tsx` with `generateStaticParams` + `generateMetadata`
- [x] Shared nav + footer extracted, used by home and service pages
- [x] 4 pages live and prerendered, each reachable from its card
- [x] Cards: `gridAutoRows: 1fr`, blurbs capped, all say "Learn more" (verified: all 4 render at 534px)
- [x] Card CTA is a `<Link>`, whole card clickable
- [x] Worked example page written (`legal-basements`)
- [ ] Remaining 3 pages filled — **Gemini**, see handoff in §A

**B · Stat tiles** — Sonnet, done
- [x] Numerals in Jost (sans) — "1" no longer reads as "I" (verified: screenshot comparison, digit now shows a flag + foot serif)
- [x] "3 five-star Google reviews" + inline `GoogleLogo`
- [x] Row checked at 390px — stacks to single column, still legible

**C · Timeline** — Sonnet, done
- [x] Horizontal desktop timeline with connecting gold rule through node centres (`.timeline-track` / `.timeline-track-fill`, exact alignment via `calc(12.5% - 10.5px)` — see derivation comment in `globals.css`)
- [x] Vertical mobile variant — genuinely restructured (row layout, rule on left edge), not a shrunk horizontal version
- [x] Scroll-triggered line fill via existing `reveal`/`IntersectionObserver` system, `prefers-reduced-motion` respected
- [x] Existing `PROCESS` icons and `01–04` numbering kept; node treatment matches "Why SS" circles

**D · Why SS**
- [x] No change this phase — leave section untouched

**E · Owner name** — done, Gemini pass + Opus correction
- [x] Portrait renamed `akash-owner.jpg` → `owner-portrait.jpg`, photo retained — Opus
- [x] Review text confirmed as the kept exception, documented in `app/data/reviews.ts` — Opus
- [x] Nav "About Akash" → "About us" — Opus
- [x] Remaining `page.tsx` body occurrences replaced with role references — Gemini
- [x] `layout.tsx` metadata/JSON-LD occurrences replaced — Gemini (folded into §Meta below)
- [x] `grep -rn Akash app/` → exactly one hit confirmed independently, `app/data/reviews.ts`
- [x] **Fixed post-Gemini:** the atelier portrait's name-slot label had been mechanically replaced
      "Akash" → "Lead Carpenter", directly duplicating the role line right below it
      ("Lead Carpenter" / "OWNER & LEAD CARPENTER"). Grep passed; the visual didn't. Changed to
      "The Owner". This is why a self-reported pass gets re-verified against real output, not just
      the command exit code — Opus

**Meta · SEO/JSON-LD for new services** — done, Gemini pass + Opus correction
- [x] `metadata.title` / `description` / OG / Twitter rewritten for the four real services — Gemini
- [x] `keywords` swapped to kitchen/bathroom/TV-wall/basement/flooring terms — Gemini
- [x] JSON-LD `description`, `telephone` (from `COMPANY.phones[0]`), `email` (from `COMPANY`) — Gemini
- [x] JSON-LD `hasOfferCatalog` added, one `Offer` per `/services/[slug]` route — Gemini
- [x] **Fixed post-Gemini:** `keywords` still had `"Kanata bespoke joinery"` — a leftover from the
      old service list the task explicitly said to remove. Changed to `"Kanata home renovations"` — Opus
- [x] **Fixed post-Gemini:** JSON-LD `founder: { "@type": "Person", name: "Owner", ... }` — a
      schema.org Person node with the literal string "Owner" as its name. Locally consistent with
      "no Akash", but invalid/nonsensical structured data. Removed the `founder` field rather than
      publish a fake name — Opus

**F · Frictions**
- [ ] Review dates added
- [ ] Trust strip: insurance + WSIB + business number
- [ ] Response-time promise made prominent
- [ ] Quote-structure block on service pages
- [ ] Price bands + cost-factors explainer per service
- [ ] Legal Basements permits/code content written
- [ ] Portfolio captions: type, area, scope, duration, date
- [ ] Commitment terms published
- [ ] WhatsApp + header call button

**Placeholders**
- [ ] All placeholder data centralised in `app/data/placeholders.ts`
- [ ] Every one carries a `TODO(owner):` naming what's needed
- [ ] Dev-only "draft" tag renders on placeholder content
- [ ] `OWNER_QUESTIONS.md` updated as answers come back

**Verify**
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` passes, 4 service routes prerendered
- [ ] Screenshots: home + one service page, desktop & mobile
- [ ] Every nav/footer/card link resolves — no dead hrefs
- [ ] **Launch gate:** `grep -rn "TODO(owner)" app/` returns nothing
