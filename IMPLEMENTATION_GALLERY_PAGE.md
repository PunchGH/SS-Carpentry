# Implementation Plan — Gallery Page

**Goal:** A real gallery: an index at `/gallery`, a page per project at `/gallery/[slug]`, each with a written description, clickable images, and the proof the friction guide's Stage 1 and Stage 4 demand.

**Model legend:** `Opus` = architecture/judgement · `Sonnet` = bounded single-file edits · `Gemini` = bulk generation off a fixed template.

---

## ⚠ Read first — the content blocker

`app/data/placeholders.ts` already carries `project-details` (*"For each real project: neighbourhood, property type, scope, duration, date"*) and `service-photos` as **blocks-content**. The gallery is the page those two blockers actually land on.

Every current portfolio image is stock, and every caption (`"Walnut kitchen · Westboro"` etc.) was invented during the demo build. **Do not ship invented projects here.** Stage 4 of the guide is explicit that buyers arrive at the gallery hunting for reasons to eliminate the contractor — a fabricated project that a buyer probes on a call does more damage than an empty gallery.

**Recommendation: three real projects beat twelve invented ones.** Build the machinery now, ship it behind `DraftTag`, gate launch on real content.

**What the owner has to supply per project** (one row each — add to `OWNER_QUESTIONS.md`):
neighbourhood · property type + era · scope · duration · month/year completed · 4–8 own photos · before photos if any · permission to name the street/area.

---

## 1. Data model — `app/data/projects.ts`

Mirror the `services.ts` discipline (typed, `draft` flags, one file drives everything).

| Field | Why | Guide |
|---|---|---|
| `slug`, `title` | Route + H1 | — |
| `neighbourhood` | "Barrhaven", "Westboro" | Stage 1, 2 |
| `propertyType` | "1990s two-storey", "1970s bungalow" | Stage 1 |
| `scope[]` | "Full kitchen refit", "Heated tile floor" | Stage 1 |
| `completed` | Month + year — **dated, not "recent"** | Stage 4 |
| `duration` | "3 weeks on site" | Stage 1, 4 |
| `serviceSlug` | Links project → `/services/[slug]` | internal linking |
| `summary` | 1 sentence, card + meta description | — |
| `description` | 2–3 paragraphs: brief, problem, what we did | Stage 1 knock-on |
| `images[]` | `{ src, alt, caption }` — caption per image | indexable text |
| `heroImage` | Card + OG image | — |
| `reviewName?` | Attach the matching Google review | Stage 4 |
| `beforeImages[]?` | Before/after pairs | see §6 |
| `draft`, `imageDraft` | Renders `<DraftTag />` | placeholder policy |

**Model: Opus** (schema drives four consumers — get it right once).

Note the reviews already map to real work: Arman Sandhu → kitchen & tile, Sumeta Saroya → deck & shelving. If those are real jobs with photos, they become the first two gallery entries with a genuine review attached — the strongest possible Stage 4 unit.

## 2. `/gallery` — index page

Server component, `export const metadata`.

- Grid of project cards. **Every card shows property type · neighbourhood · scope · date + duration** — the guide's "Absent looks like: a grid of finished kitchens with no words anywhere" is the exact failure to avoid.
- Filter by service (4 service lines + All). Client component, URL-synced (`?service=`) so filtered views are linkable and indexable.
- Empty/thin state: if only 2–3 real projects exist, use a wider card with more copy rather than padding the grid with placeholders.
- Areas-served strip at the bottom (Stage 2 — names the neighbourhoods, earns local search).
- CTA to `/#quote` + tappable phone (Stage 5).

**Model: Opus** for layout/filter architecture, **Sonnet** for the card component.

## 3. `/gallery/[slug]` — project page

`generateStaticParams` + per-project `generateMetadata`. Server component; the lightbox is the only client island.

Sections in order:
1. Hero image + title
2. **Fact strip** — property type · neighbourhood · scope · duration · completed. Above the fold, scannable.
3. Description (2–3 paragraphs)
4. Image grid — click opens lightbox
5. Attached Google review, if one matches
6. "Services used" → links to the service page(s)
7. Next/previous project
8. CTA: quote + tappable phone, with the one-working-day response promise (Stage 6)

**Model: Opus** for the route/template, **Gemini** for writing the per-project body copy once the owner's facts exist.

## 4. Clicking into pictures

Two behaviours, deliberately different:

- **Gallery card → project page** (not a lightbox). A lightbox on the index would leave the page with no indexable text, which is precisely the knock-on the guide warns about.
- **Image inside a project page → lightbox** for full-size viewing.

Lightbox requirements (**Sonnet**, client component):
- Keyboard: `Esc` closes, `←/→` navigate, focus trapped while open, focus restored on close
- `aria-modal`, labelled, background scroll locked
- Swipe on touch; visible close target ≥44px
- Caption + counter ("3 / 8") visible in the overlay
- No layout shift — width/height on every image

## 5. Home page portfolio section

Currently `PORTFOLIO` is a hardcoded array in `page.tsx` (~line 196). Replace with the first 5 entries from `projects.ts`, add **"View all projects →"** to `/gallery`.

Nav (`SiteNav.tsx:56`) currently points "Portfolio" at `/#portfolio` — repoint to `/gallery`. Same in `SiteFooter`.

**Model: Sonnet.**

## 6. Suggestions (my recommendations, your call)

1. **Before/after sliders.** The highest-converting element on a remodeler gallery, and the guide's Stage 1 "match my house" instinct is strongest when the *before* looks like their house. Needs the owner's before photos — ask now, they're usually on his phone.
2. **Enable image optimization.** Existing `<Image>` calls pass `unoptimized`. That's survivable for 5 hero images; on a gallery of 40 photos it's a real mobile problem. Drop `unoptimized`, add `sizes` + `placeholder="blur"`. The guide says audit on phone first.
3. **Translate the guide to Ontario.** It's UK-written — TrustMark/FMB/JCT/£ don't apply. The Canadian equivalents worth surfacing: WSIB clearance, ESA/ECRA licensed electrical, liability coverage amount, HST/business number. Same trust function, right jurisdiction.
4. **`ImageObject` / `CreativeWork` JSON-LD** per project, plus `BreadcrumbList`. Add gallery routes to the sitemap.
5. **Don't add a price to project pages** unless the owner agrees — Stage 3 is flagged ⚠️ disputed in the guide. A per-project "project size band" is the softer version if he wants it.

## 7. Questions

1. **How many real projects with photos exist right now?** Determines whether this ships as a gallery or as three case studies.
2. Can we name neighbourhoods, or do clients need anonymising ("a two-storey in the west end")?
3. Any before photos?
4. Do the two named Google reviews correspond to projects we can show?
5. Should `/gallery` replace the home portfolio section, or stay as teaser → full gallery? (Plan assumes teaser → full.)

---

## Checklist

**Blockers**
- [ ] Owner supplies real project facts (neighbourhood, type, scope, duration, date)
- [ ] Owner supplies own photography per project
- [ ] Confirmed which projects may be named/located
- [ ] `OWNER_QUESTIONS.md` updated with the per-project row

**Data**
- [ ] `app/data/projects.ts` created, typed, with `draft` flags
- [ ] `project-details` entry in `placeholders.ts` updated to point at the gallery
- [ ] Reviews cross-linked to projects where they match

**`/gallery`**
- [ ] Index route + metadata
- [ ] Cards show type · neighbourhood · scope · date · duration
- [ ] Service filter, URL-synced
- [ ] Areas-served strip
- [ ] CTA + tappable phone

**`/gallery/[slug]`**
- [ ] Route w/ `generateStaticParams` + `generateMetadata`
- [ ] Fact strip above the fold
- [ ] Description renders
- [ ] Image grid
- [ ] Attached review where one exists
- [ ] Links to related service page
- [ ] Next/previous navigation
- [ ] CTA + response-time promise

**Lightbox**
- [ ] Opens from project-page images only
- [ ] Esc / arrows / focus trap / focus restore
- [ ] Swipe + ≥44px close target
- [ ] Caption + counter
- [ ] No layout shift

**Integration**
- [ ] Home portfolio reads from `projects.ts`
- [ ] "View all projects" → `/gallery`
- [ ] Nav + footer "Portfolio" → `/gallery`

**SEO**
- [ ] Per-project metadata + OG images
- [ ] `ImageObject` / `BreadcrumbList` JSON-LD
- [ ] Sitemap includes gallery routes

**Verify**
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` passes with all gallery routes
- [ ] Mobile audit first, desktop second (guide's rule)
- [ ] Lightbox keyboard-only pass
- [ ] `grep -rn "TODO(owner)" app/` — launch gate
- [ ] Every visible caption is true, or `DraftTag`-marked
