# Implementation Plan — SEO / AEO / GEO

**Audited:** 2026-09-02 against the live codebase. Every finding below was verified, not assumed.

**Model legend:** `Opus` = judgement / cross-file / accuracy-critical · `Sonnet` = bounded, spec'd edits · `Gemini` = mechanical, template-driven.

**Sequencing principle:** fix what suppresses indexing → make the site discoverable → then add content. Publishing content onto broken plumbing wastes the content.

---

## ⚠ Phase 0 — Indexing posture (do this first, not last)

Current draft debt: **39 `TODO(owner)` markers · 24 `draft`/`imageDraft` flags · 13 placeholder blocks.**

The gating question is *"should search engines and LLMs see this yet?"* — and it comes before any optimisation work. For GEO the stakes are asymmetric: a retracted page is fixable, but a model that has ingested "founded 3 months ago" or an invented portfolio caption can't be issued a correction.

**Blocking question for the owner/team: is the site deployed anywhere public right now?**

| Task | Model |
|---|---|
| Confirm deployment status + whether anything is already indexed (`site:` search) | **Opus** |
| If live: `noindex` on draft-heavy routes (gallery projects, about) until content is real | **Sonnet** |
| Decide the launch gate: `grep -rn "TODO(owner)" app/` returns nothing → indexing allowed | **Opus** |

---

## Phase 1 — Fix what is actively suppressing indexing

### 1.1 Canonical inheritance bug ← highest priority 🔴 · **Opus**

`app/layout.tsx:57` hardcodes:
```ts
alternates: { canonical: "https://sscarpentryandrenovations.com" }
```

App Router metadata is **inherited down the tree**. Only `app/services/[slug]/page.tsx:48` overrides it. So `/about`, `/contact`, `/gallery` and every `/gallery/[slug]` currently declare themselves duplicates of the homepage — telling Google not to index them separately.

Next already auto-generates a correct per-route canonical from `metadataBase`, so the root value overrides correct behaviour with wrong behaviour.

- [ ] Delete `alternates.canonical` from the root layout
- [ ] Verify each route resolves to its own canonical (view source, not assumption)
- [ ] Add explicit `alternates.canonical` only where genuine duplication exists (filtered gallery views, query params)

### 1.2 Homepage is a client component · **Opus**

`app/page.tsx:1` is `"use client"` — the only page that cannot export `metadata`, and the whole homepage ships as client JS (LCP cost on the most important page).

- [ ] Split: keep interactive islands (`QuoteForm`, FAQ accordion, scroll progress, lightbox) as client components
- [ ] Make the page shell a server component
- [ ] Add `export const metadata` with homepage-specific title/description/OG
- [ ] Confirm no hydration regressions

### 1.3 Consolidate the business entity · **Opus**

`HomeAndConstructionBusiness` is emitted **four times** — `layout.tsx`, `about/page.tsx`, `contact/page.tsx`, `gallery/[slug]/page.tsx` — with `AggregateRating` twice. Four copies of one business is a conflicting entity signal, and entity consistency is what GEO/AI summaries rely on.

- [ ] One canonical entity in `layout.tsx` with a stable `@id` (e.g. `https://…/#business`)
- [ ] Other pages reference it (`{"@id": "…#business"}`) instead of redefining it
- [ ] Page-specific types (`AboutPage`, `ContactPage`, `CreativeWork`) stay, linked via `mainEntity`/`about`
- [ ] Extract JSON-LD builders into `app/lib/schema.ts` so there is one source

### 1.4 Small structural fixes · **Sonnet**

- [ ] `/gallery` has **no `<h1>`** — add one
- [ ] Centralise the 12 hardcoded absolute URLs (11 in `layout.tsx`, 1 in `gallery/[slug]`) into `COMPANY.siteUrl`; prefer relative paths since `metadataBase` is set
- [ ] Audit heading hierarchy per page (single h1, no skipped levels)

---

## Phase 2 — Discoverability

Sitemap and robots are one job, generated from the same source of truth as the routes so they cannot drift.

| Task | Model |
|---|---|
| `app/sitemap.ts` generated from `SERVICES`, `PROJECTS` + static routes, with `lastModified` | **Sonnet** |
| `app/robots.ts` → allow, and point to the sitemap | **Sonnet** |
| Exclude any `noindex` routes from the sitemap (never list a page you're blocking) | **Sonnet** |
| Submit to Google Search Console + Bing Webmaster once content is real | **Opus** |

- [ ] `sitemap.ts` covers `/`, `/about`, `/contact`, `/gallery`, `/gallery/[slug]`, `/services/[slug]`, `/guides/*`
- [ ] `robots.ts` references the sitemap URL
- [ ] Verify `/sitemap.xml` and `/robots.txt` resolve in a production build

---

## Phase 3 — Structured data (AEO)

### 3.1 FAQPage schema — biggest AEO gap · **Sonnet**

**There is currently no `FAQPage` markup anywhere**, despite FAQ content and a `ServiceFaq` component existing. This is the highest-leverage AEO addition available.

- [ ] Emit `FAQPage` from `ServiceFaq` so every service page gets it automatically
- [ ] Same for the legal-basements guide (its FAQs are the answer-engine target)
- [ ] Only mark up FAQs actually visible on the page
- [ ] Validate in Google Rich Results Test

### 3.2 Other types · **Gemini** (mechanical, once §1.3 lands)

- [ ] `BreadcrumbList` on service, gallery and guide pages
- [ ] `Article` on the guide, with `dateModified` wired to its `lastReviewed`
- [ ] `ImageObject` on gallery projects
- [ ] `Service` entries linked to the business `@id`

### 3.3 `aggregateRating` — set expectations · **Opus**

Verified against [Google's review snippet docs](https://developers.google.com/search/docs/appearance/structured-data/review-snippet): when the entity controls the reviews about itself, `LocalBusiness`/`Organization` pages are **ineligible for the star rich result**. Self-hosted Google reviews are explicitly named.

- [ ] Keep the markup — it still feeds AI Overviews and local summaries (the GEO argument)
- [ ] **Do not** promise the client stars in search results
- [ ] Keep the figure truthful and in sync with `COMPANY.reviewCount` (now 4, previously hardcoded 3)

---

## Phase 4 — Metadata audit, all pages · **Gemini**

Current state: all routes have metadata **except** the homepage (blocked by §1.2).

Per route, verify:
- [ ] Unique title ≤ ~60 chars, unique description ≤ ~155
- [ ] Own canonical (post-§1.1)
- [ ] OG + Twitter tags, correct image dimensions
- [ ] `/gallery` and `/contact` OG images exist (currently only root-level OG assets)
- [ ] No placeholder text leaking into metadata
- [ ] `lang="en"` — consider `en-CA`

---

## Phase 5 — Content (the actual wins)

| Task | Model | Notes |
|---|---|---|
| Legal basements guide | **Opus** | Research done — see `LEGAL_BASEMENTS_RESEARCH.md`. **Blocked** on re-verifying figures against the 2024 Code Compendium |
| Service page depth | **Gemini** | Off the existing template |
| Gallery project write-ups | **Gemini** | Blocked on owner photos/facts |
| Internal linking pass | **Sonnet** | Nothing currently links guide ↔ service ↔ gallery |

**On "freshness" — a caution.** Don't let this become date-bumping; that's a tactic search engines discount and it corrodes trust. Real freshness here is the guide's `lastReviewed`, genuine because Ontario code and Ottawa zoning actually change. Tie it to the re-check cadence from the research doc: **zoning quarterly** while the 25 appeals resolve, **Building Code annually**.

---

## Phase 6 — Core Web Vitals · **Sonnet**

- [ ] Remove `unoptimized` (5 uses: `SiteNav`, `SiteFooter`, `page.tsx` ×2, `services/[slug]`) and add proper `sizes`
- [ ] Hero video: `preload="none"`/poster, and confirm it isn't the LCP element
- [ ] Measure before/after with Lighthouse on **mobile** — the friction guide's rule is phone first
- [ ] Re-check after §1.2 (the client→server split should be the biggest single win)

> **Environment note:** optimized images do **not** load under `next dev` on this machine — every `/_next/image` request stalls on the Windows-mounted drive. They work correctly in a production build. Verify image work with `npm run build && npx next start`, never with `next dev`.

---

## Phase 7 — Off-site: Google Business Profile 🔴 · **Opus** (owner-executed)

**Not a code task, and the highest-value item in this document.** For a local contractor the map pack beats every on-page item for commercial queries. The owner has admin access.

- [ ] **Fix the category/service mismatch.** The GBP currently advertises *interior decorating, interior finishing, remodelling, drywall repair* — nothing about kitchens, bathrooms, flooring, tiling, TV walls or legal basements
- [ ] Align GBP services with the four site service lines
- [ ] Confirm NAP matches `company.ts` exactly (name, address, both phones)
- [ ] Publish real hours (still an open `opening-hours` blocker — removed from JSON-LD rather than guessed)
- [ ] Add real project photos to the profile
- [ ] Set up a review request routine — 4 reviews is thin; this is the cheapest trust lever
- [ ] Verify the site's NAP, GBP, and JSON-LD agree (entity consistency drives both local SEO and GEO)

---

## Phase 8 — GEO specifics

Most of GEO is the same work as good SEO. What genuinely differs:

- [ ] **Sourced citations.** The basements guide cites ottawa.ca and ontario.ca directly, with a visible `lastReviewed`. That is the strongest differentiator available — we caught contractor blogs publishing wrong egress dimensions, and an accurate cited page is what an answer engine quotes instead
- [ ] **Answer-first formatting.** Lead each section with a direct 1–2 sentence answer, then the detail
- [ ] **Entity consistency** across site, GBP and schema (§1.3, §7)
- [ ] **Never publish an unsourced regulatory figure** — a wrong code number under a contractor's name destroys the expertise the page exists to demonstrate
- [ ] Optional, low-cost, unproven: `llms.txt`. Cheap to add; don't build a strategy on it

---

## Open questions

1. **Is the site deployed publicly yet?** Gates Phase 0 entirely.
2. Is the domain `sscarpentryandrenovations.com` confirmed? 12 hardcoded references assume it, while the email moved to Gmail.
3. Google Search Console access — set up, and under whose account?
4. Is anyone committed to the review-request routine? It outperforms most of Phases 1–6 combined.

## Suggested execution order

**0 → 1 → 2 → 3 → 4 → 6**, with **7 (GBP) running in parallel from day one** since it's owner-executed and unblocked, and **5 (content)** starting as soon as Phase 1 lands.

Phase 1 is the gate: it is the difference between pages that can rank and pages telling Google to ignore them.
