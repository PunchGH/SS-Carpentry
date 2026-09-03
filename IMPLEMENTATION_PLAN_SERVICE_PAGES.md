# Implementation Plan — Service Pages Remediation

Source: `/impeccable critique` of the four service routes (2026-09-03).
Snapshot: `.impeccable/critique/2026-09-03T08-44-45Z__app-services.md`
**Score at time of critique: 19/36** (H7 n/a). 2 × P0 · 2 × P1 · 2 × P2.

**Routes:** `/services/kitchens-bathrooms`, `/services/flooring-tiling`, `/services/legal-basements` (all three render from `app/services/[slug]/page.tsx`) and `/services/tv-walls-lighting-panels` (bespoke, `app/services/tv-walls-lighting-panels/page.tsx`).

**Written for Sonnet.** Every step is bounded: named file, named symbol, stated done-condition. Where a step needs a judgement call the plan makes the call for you — do not re-open it.

**Decisions already made — do not re-litigate:**
1. **Full scope.** All 8 steps, all 30 checklist items.
2. **Embed the quote forms anyway.** The lead destination is unconfigured (`lead-destination` is `blocks-launch`), but the code is correct and only the env config is missing. Build Step 5 as written and surface the unconfigured destination as a deployment blocker in your summary. Do not patch `app/actions/sendQuoteLead.ts`.
3. **Use the plan's replacement copy** in Step 1's table. It states what is excluded without claiming who performs the work, matching the `about.ts` precedent. Do not invent arrangements the owner has not confirmed, and do not fall back to deleting the bullets wholesale.
4. **Delete the Glebe case study outright** (Step 3) — do not mark it with a `DraftTag`. The image is not of the thing its alt text claims.
5. **No warranty / WSIB / insurance block** (Step 4). Writing one means inventing a credential.

---

## Global rules

1. **Line numbers drift.** Anchor on the quoted string or symbol name and `grep -n` for it. Never edit by line number alone.
2. **Never invent a fact.** No price, timeline, duration, credential, project, or neighbourhood may be written unless already sourced in `app/data/company.ts`, `reviews.ts`, `projects.ts`, or `companyinfo.md`. If unknown: promise the document ("figure confirmed on the quote"), do not assert the number.
3. **`needs` strings are team-facing.** They may live in `title` attributes only. They must never render as visible page copy.
4. **Preserve the incumbent visual world.** Dark ground, `#e3af2b` gold via the `GOLD` import, Cormorant/Jost. This is a remediation, not a redesign. Do not restyle anything the plan does not name.
5. **Empty data renders nothing.** Every new section added below must return `null` when its array is empty. No "coming soon" states.
6. **Verify after every step:** `npx tsc --noEmit` clean, and `node /home/punch/.claude/skills/impeccable/scripts/detect.mjs --json <changed files>` returns `[]`. Run `npm run lint` once at the end — it is slow on this `/mnt/d` mount.
7. **Do not touch** `.next/`, `node_modules/`, or the Next.js banner block in `AGENTS.md`.

---

## Step 1 — Stop shipping developer notes as customer copy · **P0**

`app/data/services.ts` holds 27 `TODO(owner)` strings. 4 are source comments (leave them), 5 are dead data on the TV slug (Step 2), and **18 render as live page copy**.

Add an optional team-facing field to the `Service` type, mirroring the precedent already set in `app/data/about.ts`:

```ts
/** Team-facing only. Never rendered. What the owner still has to confirm. */
ownerNeeds?: string[];
```

Then, for each of the 18 visible strings: **delete the `TODO(owner):` text from the customer-facing value and move the question into `ownerNeeds`.** Replace the value with what is supportable today, or drop the bullet entirely. Never leave an empty string in a rendered array.

Worked replacements — use these verbatim, they are the pattern for the rest:

| Where | Currently renders | Replace with |
|---|---|---|
| `legal-basements.notIncluded` (3 items, the whole array) | "TODO(owner): who pulls the permit — you or the homeowner?" ×3 variants | Delete all three. Replace the array with: `"Permit fees and municipal application charges"`, `"Zoning verification where a minor variance is required"`, `"Regulated electrical and plumbing work, which goes to licensed trades"` — all three are supportable statements of *what is excluded*, not claims about who does it. |
| `kitchens-bathrooms.whatsIncluded` (2 items) | "TODO(owner): confirm — is plumbing rough-in…" | Delete both bullets. Add one: `"Coordination of licensed plumbing and electrical trades where the work is regulated"`. |
| any `steps[].copy` (3 items) | "…TODO(owner): confirm standard quotation turnaround and deposit schedule." | Truncate the sentence. Keep everything before the TODO. |
| any `priceBand.drivers` last item (4 items) | "TODO(owner): confirm real starting and typical costs…" | Delete the bullet. The list is 4–5 items without it. |
| FAQ answers that are **entirely** a TODO (`kitchens` ×1, `flooring` ×2, `basements` ×1) | "TODO(owner): confirm realistic timeline…" | **Delete the whole FAQ entry.** A missing question is better than a visible one with no answer. |
| FAQ answers ending in a TODO (`kitchens` ×1, `flooring` ×1) | "…TODO(owner): confirm standard guidance." | Truncate. Keep the answered part. |

**Done when:** `grep -rn "TODO(owner)" app/data/services.ts` returns only the 4 source-comment lines and any new `ownerNeeds` entries, and `grep -rn "TODO(owner)" app/ --include=*.tsx` returns nothing.

## Step 2 — Fix the two lies in the data · **P0**

1. **`legal-basements.contentStatus`** is `"complete"` (`services.ts:403`). It is the page with the most unmarked leaks. After Step 1 it is genuinely complete — **leave it `"complete"`, but only once Step 1 lands.** Do not flip it before.
2. **TV walls has two contradicting price sources.** `services.ts` declares `$0,000 / $0,000 – $00,000, draft: true`; the page publishes `$3,500 / $4,500–$9,500 / $10,000+`. The page's numbers are the ones shipping. Delete the 5 dead `TODO(owner)` strings from the `tv-walls-lighting-panels` entry's `notIncluded`, `steps`, `priceBand.drivers`, and `faqs` — nothing reads them, and they will fail the launch-gate grep forever if left.

**Done when:** the TV entry contains no `TODO(owner)` outside its image comment.

## Step 3 — Delete the fabricated case study · **P0**

`app/services/tv-walls-lighting-panels/page.tsx`, section 9 (`{/* ===== 9. GALLERY SPOTLIGHT: THE GLEBE ACOUSTIC MEDIA WALL ===== */}`, ~`:945-1088`).

It presents "The Glebe · 4 Days on Site" as a completed project with outcome bullets, over `/assets/portfolio-wardrobe.jpg` — a wardrobe — carrying `alt="The Glebe Acoustic Slat Media Wall by SS Carpentry"`. No such project exists in `app/data/projects.ts`. This violates `placeholders.ts:11-13` verbatim.

**Delete the entire section.** Do not mark it, do not soften the copy — the image is not of the thing the alt text claims.

Then fix the two dead CTAs: `/gallery?service=tv-walls-lighting-panels` (~`:976`, `:1069`) filters to zero projects and renders "No projects found in this category yet." One of them dies with the section; **point the survivor at `/gallery` with no query string.**

**Done when:** `grep -n "Glebe" app/` returns nothing, and no service page links to a `?service=` filter with zero matching projects.

## Step 4 — Put proof on the pages where money is decided · **P1**

Nothing on any service page shows a review, a finished job, or a credential. Two components' worth of data already exist and are called by no service page.

Create `app/components/ServiceProof.tsx` (server component, no `"use client"`):

- **Props:** `{ serviceSlug: string }`.
- **Reviews:** import `REVIEWS`, `formatReviewDate` from `../data/reviews`. Render up to 3 cards. Match the card treatment already used at `app/contact/page.tsx` (read it — do not invent a new card).
- **Projects:** import `getProjectsByService` from `../data/projects`. Render its result as a photo strip linking to `/gallery/[slug]`. **Returns `null` when the array is empty** — today that means only `kitchens-bathrooms` shows a strip, and that is correct.
- **Section chrome:** the `eyebrow` style object already local to `[slug]/page.tsx` — export it from there or duplicate the exact spec (11px, `.32em`, uppercase, `GOLD`).

Mount it in `app/services/[slug]/page.tsx` **between the PROCESS section and the FAQ section**, and in `tv-walls-lighting-panels/page.tsx` in the slot section 9 vacated.

**Do not** add a warranty or WSIB block. `placeholders.ts` registers `warranty-terms` as unresolved; writing one means inventing a credential. Leave it.

**Done when:** all four routes render reviews, `kitchens-bathrooms` additionally renders 2 project cards, and the other three render no project strip at all.

## Step 5 — Convert on the page, not on a different route · **P1**

`QuoteForm` is mounted on the homepage and `/contact` only. Every service page ends persuasion with a link away.

1. **Embed the form.** In `[slug]/page.tsx`, replace the CTA section's two buttons with `<QuoteForm source={`service-${service.slug}`} defaultService={service.title} />`, keeping the heading, the sub-paragraph, and the phone link beneath it. Same in `tv-walls-lighting-panels/page.tsx` with `defaultService="TV Walls & Lighting Panels"`. `defaultService` already exists as a prop and is currently passed nowhere — check `QuoteForm.tsx` actually applies it to initial state, and wire it if it does not.
2. **Add a hero CTA pair** to `[slug]/page.tsx`, under the H1. Reuse `.gold-btn` ("Request a quote" → `/contact`) and `.outline-btn` (phone). The TV page already has this — copy its treatment.
3. **Move the response promise up.** "We reply to every enquiry within one working day" currently sits in section 4 of 7. Add it as a single line directly under the hero CTAs.

**Blocked-but-ship-anyway:** `sendQuoteLead.ts:38` falls back to `COMPANY.email` when `LEAD_TO_EMAIL`/`RESEND_API_KEY` are unset, and `placeholders.ts` registers `lead-destination` as `blocks-launch`. **Do not change the action.** Note it in your summary — more forms pointing at an unconfigured funnel is a deployment blocker, not a code fix.

## Step 6 — Rejoin the canonical design system · **P2**

The homepage (`app/page.tsx`) is the design authority per `DESIGN.md:3`. Both service routes drifted.

1. **Motion — highest visible return, lowest risk.** Neither route uses a single `.reveal` class; the homepage uses 26. Add `className="reveal"` to each top-level section's inner container on both routes, and `.stagger-children` to the process grid, the materials grid, and the new proof grid. `ScrollReveal` is already mounted globally in `layout.tsx` and re-subscribes on route change — nothing else to wire.
2. **Type scale.** Replace the hand-rolled local heading styles with the canonical classes: `[slug]:92` h1 → `className="hero-h1"`, and both routes' `h2` style objects → `className="h2"`. Drop the local `clamp()` values. This resolves 4 h1 scales and 3 h2 scales down to the site's two.
3. **Nav spacer.** Both routes hardcode `<div style={{ height: 88 }} />` under a nav that drops to 74px at ≤768px. Replace both with `<div className="nav-spacer" />`.
4. **Eyebrow spine.** Add the homepage's Roman-numeral prefix to the templated route's seven eyebrows (`I / What this covers` … `VII / Also from SS`). On the TV page, set `typography.eyebrow` letter-spacing to `.32em` to match canon, and add an eyebrow to the sections that have none — at minimum the lighting section and the ESA compliance section, the two most persuasive blocks on the page.

**Do not** attempt the near-black or gold-rgba tokenization here. `DESIGN.md` records both as known project-wide debt; fixing them inside a service-page pass would spread the diff across the whole build.

## Step 7 — Mobile and accessibility · **P2/P3**

1. **Hero padding.** `[slug]:86` (`"0 56px 64px"`) and `tv-walls:191` (`"0 56px 72px"`) sit on bare inner divs. `globals.css` only overrides `section`/`footer` and `.hero-content` at ≤768px, so 56px per side survives on a 375px phone — 112px of a 375px screen. **Add `className="hero-content"` to both divs** and delete the horizontal padding from the inline style, keeping the bottom value.
2. **The one real contrast failure.** `tv-walls:282` — `rgba(247,245,241,.45)` at 11px computes to **4.12:1**, below AA. Raise to `.6`. **This is the only failing value on this surface** — `.5` at 10.5px computes to 4.97:1 and passes. Do not sweep the other low-opacity text.
3. **Touch targets.** `LightingToggle.tsx` hotspots are 26×26px and 22×22px. Raise to 44×44px, keeping the visual dot size by padding the hit area rather than scaling the mark.
4. **Cross-sell grid.** `[slug]:285` gives a 3-card grid `className="process-grid"`, which forces `repeat(2,1fr)` at ≤1024px and permanently orphans the third card. Remove the class and give it its own `repeat(3,1fr)` → `1fr` responsive rule.
5. **Heading semantics.** `tv-walls:660` has an `<h3>` with no `<h2>` in its section — promote it to `h2`.

## Step 8 — Final gate

- [ ] `npx tsc --noEmit` clean
- [ ] `node /home/punch/.claude/skills/impeccable/scripts/detect.mjs --json app/services` → `[]`
- [ ] `grep -rn "TODO(owner)" app/ --include=*.tsx` → nothing
- [ ] `grep -rn "Glebe" app/` → nothing
- [ ] `npm run lint` clean
- [ ] All four routes render at 375px with no horizontal scroll

---

## Checklist

**P0 — content truth (do first, blocks launch)**
- [ ] 1.1 Add `ownerNeeds?: string[]` to the `Service` type
- [ ] 1.2 kitchens-bathrooms: clear 7 visible TODOs (2 included, 1 excluded, 1 step, 1 driver, 2 FAQ)
- [ ] 1.3 flooring-tiling: clear 6 visible TODOs (2 lists, 1 step, 1 driver, 2 FAQ — delete the fully-TODO FAQ)
- [ ] 1.4 legal-basements: replace the entire `notIncluded` array; clear 3 more (1 step, 1 driver, 1 FAQ)
- [ ] 2.1 Leave `legal-basements.contentStatus: "complete"` — valid only after 1.4
- [ ] 2.2 Strip the 5 dead TODOs from the tv-walls entry
- [ ] 3.1 Delete the Glebe case-study section entirely
- [ ] 3.2 Repoint the surviving gallery CTA at `/gallery`

**P1 — conversion**
- [ ] 4.1 Create `ServiceProof.tsx` (reviews + `getProjectsByService`, `null` on empty)
- [ ] 4.2 Mount on `[slug]` between PROCESS and FAQ
- [ ] 4.3 Mount on tv-walls in the vacated section-9 slot
- [ ] 5.1 Embed `QuoteForm` with `source` + `defaultService` on both routes
- [ ] 5.2 Verify `defaultService` actually seeds the dropdown; wire it if not
- [ ] 5.3 Hero CTA pair on `[slug]`
- [ ] 5.4 Response promise under the hero CTAs
- [ ] 5.5 Flag the unconfigured lead destination in the summary — do not patch it

**P2 — system consistency**
- [ ] 6.1 `.reveal` on every section container, both routes
- [ ] 6.2 `.stagger-children` on process / materials / proof grids
- [ ] 6.3 `.hero-h1` and `.h2` replace hand-rolled heading styles
- [ ] 6.4 `.nav-spacer` replaces `height: 88` on both routes
- [ ] 6.5 Roman-numeral eyebrow spine on `[slug]`; `.32em` + 2 new eyebrows on tv-walls
- [ ] 7.1 `.hero-content` on both hero inner divs
- [ ] 7.2 Raise `tv-walls:282` alpha `.45` → `.6` (only this one)
- [ ] 7.3 44px hit areas on `LightingToggle` hotspots
- [ ] 7.4 Cross-sell grid off `.process-grid`
- [ ] 7.5 Promote the orphan `<h3>` at tv-walls section 6

**Gate**
- [ ] 8 All six final-gate checks pass

---

## Explicitly out of scope

- Near-black and gold-rgba tokenization (`DESIGN.md` known debt — project-wide, not a service-page change)
- Warranty / WSIB / insurance blocks (would require inventing a credential)
- A `/services` index route (nav "Services" → `/#craft` is a separate IA decision)
- Rebuilding `LightingToggle`'s CSS diagram as photography (blocked on the owner's shot list — see `TV_WALLS_SHOT_LIST.md`)
- Merging the bespoke TV route into a richer shared template (the right long-term move; a redesign, not a remediation)
