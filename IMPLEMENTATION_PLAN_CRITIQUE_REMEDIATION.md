# Implementation Plan — Critique Remediation

Source: `/impeccable critique` of `/about`, `/gallery`, `/contact` (2026-09-03).
Snapshots: `.impeccable/critique/2026-09-03T01-54-*.md` (fingerprinted; re-run critique after to compare).

**Scores at time of critique:** `/about` 16/32 · `/gallery` 18/32 · `/contact` 19/40.
**Findings:** 2 × P0, 10 × P1, 8 × P2, ~12 × P3.

**Owner decisions already made — do not re-litigate:**
1. Start with truth & consistency. Form *delivery config* (API key, destination inbox) is deferred; the *code* must still fail honestly.
2. Placeholders get reframed in brand gold, not error-red. Red stays behind an internal flag.
3. Gallery cuts down to the real projects only.
4. Full scope — all 12 steps.

---

## Global rules (apply to every step)

1. **Line numbers in this document are as-of the critique and will drift.** Anchor on the quoted string or symbol name and `grep -n` for it. Never edit by line number alone.
2. **Never invent a fact.** No figure, date, duration, neighbourhood, hours, or credential may be written unless it is already sourced in `app/data/company.ts`, `app/data/reviews.ts`, or `companyinfo.md`. If unknown: promise the document ("certificate on request"), do not assert the number.
3. **One source of truth.** `company.ts` header says nothing there may be duplicated inline. Extend that rule: service names come from `SERVICES`, credentials from `ABOUT_DATA.credentials`, neighbourhoods from `ABOUT_DATA.serviceAreas`.
4. **`needs` strings are team-facing.** They may live in `title` attributes only. They must never render as visible page copy — that is how the owner's name leaked.
5. **Preserve the incumbent visual world.** Dark ground, `#e3af2b` gold, Cormorant/Jost. The eyebrow-above-heading pattern is the committed system in 19 of 22 sections — fix what eyebrows *say* (steps 1–2), and only reconsider the pattern in step 6/8.
6. **Verify after every step:** `npx tsc --noEmit` must stay clean, and `node "$IMPECCABLE/scripts/detect.mjs" --json <changed files>` must return `[]`. `npm run lint` is slow on this WSL/`/mnt/d` mount — run it once at the end, not per step.
7. **Do not touch** `.next/`, `node_modules/`, or the `AGENTS.md` Next.js banner block.

`$IMPECCABLE` = `/home/punch/.claude/plugins/cache/impeccable/impeccable/4.1.3/skills/impeccable`

---

## Step 0 — Already done (do not redo)

Landed before this plan was written; `npx tsc --noEmit` clean:

- **`app/data/about.ts`** — `CredentialItem` gained an optional team-facing `needs` field (documented as never-rendered). All five credentials rewritten so `value` states only what is supportable today: `hstNumber` → "Shown on every quote and invoice", `wsib` → "Clearance certificate on request", `liabilityInsurance` → "Certificate of insurance on request", `licensedTrades` → "Regulated work goes to licensed trades". Every `TODO(owner):` string removed from customer-facing `subtext` and moved into `needs`. **`licensedTrades.draft` flipped `false` → `true`** (registry flags it blocks-launch).
- **`app/components/DraftTag.tsx`** — `DraftBlock` no longer renders `Placeholder — {needs}` as visible text; it renders `Placeholder` and carries the detail in `title`.

**Still open in `about.ts`:** `foundingYear.year` is `"2024"` with a `TODO(owner)` comment, and `story`/`owner` bios are `draft: true`. Leave the values; step 1 only has to ensure they never render as unmarked fact.

---

## Step 1 — `clarify`: truth and consistency across all three

**Goal:** the site never asserts something it cannot support, and `/about` and `/contact` can never disagree again.

### 1a. `app/components/PlaceholderImage.tsx`
- Stop rendering `{needs}` as visible body copy (currently the last `<div>` in the component). This is the direct source of the owner's-name leak.
- Add an optional `caption?: string` prop for customer-facing text; default it to a safe line such as *"Photography in progress — real site photos go up as jobs finish."*
- Move `needs` to a `title` attribute on the root element.
- Keep the visible `Placeholder Photo` marker so nothing ships unnoticed. **Do not** restyle to gold here — that is step 4.

### 1b. `app/about/page.tsx`
- Portrait call site (`needs="Owner portrait — real photo of Akash / on-site working photo required"`): drop the owner's first name. `IMPLEMENTATION_PLAN_ABOUT_PAGE.md:19` records he does not want his name published; `app/data/reviews.ts:4-8` documents the *only* approved exception (a verbatim customer review). Use `needs="Owner portrait — on-site working photo required"`.
- Credential card render: change `<DraftTag needs={cred.subtext || "verification details"} />` to `needs={cred.needs ?? cred.label}`. Keep rendering `cred.subtext` — it is now customer-safe.
- Eyebrow `Stage 4 Vetting & Proof` → **`Verify before you hire`**. (Internal audit-stage jargon; a homeowner has no referent for "Stage 4".)
- Then `grep -rn "Stage [0-9]" app/` and eliminate every remaining hit in JSX.

### 1c. `app/contact/page.tsx`
- **Delete the `openingHoursSpecification` block** from the `ContactPage` JSON-LD. `app/layout.tsx` deliberately removed this exact Mon–Sat 08:00–18:00 value with a comment explaining why; it was reintroduced here. Publishing hours that conflict with the Google Business Profile damages the local listing.
- **Operating Hours card:** the only sourced record (`companyinfo.md`) says *"Closed · Opens 9 AM"* — not a full week. Replace the fabricated `Mon – Sat: 8:00 AM – 6:00 PM` with what is true: keep the card, show `Based in Ottawa (K2J 7G4)`, and state the response promise the site already makes instead of a schedule. Wrap in `DraftTag` with `needs="Weekly opening hours copied verbatim from the Google Business Profile"`.
- **Vetting callout:** delete the four hardcoded `<li>` claims and render from `ABOUT_DATA.credentials` instead, with `<DraftTag needs={cred.needs} />` on any entry where `draft` is true. This is the durable fix for the two pages disagreeing.
  - Eyebrow `Stage 4 Contractor Vetting` → **`Before we start work`**.
  - Heading `Fully Insured & WSIB In Good Standing` is itself an unverified claim → **`Insurance and clearance, in writing`**.
  - Drop "milestone schedule" from the contract line (`payment-schedule` is unconfirmed); keep "Fixed written contract before work begins".
- This makes the `DraftTag` import at the top of the file actually used.

### 1d. `app/gallery/GalleryView.tsx`
- Eyebrow `Real Projects · Ottawa Craftsmanship` → **`Selected Work · Ottawa`** (all five projects are currently `draft: true`).
- Lead paragraph promises *"Every project has a location, property type, scope, and timeline"* — true only once step 2 lands. Soften now, restore after step 2 if the surviving projects support it.

### 1e. `app/components/QuoteForm.tsx`
- Replace the hardcoded six-item `SERVICE_OPTIONS` with a derivation from `SERVICES`:
  ```ts
  import { SERVICES } from "../data/services";
  const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Not sure yet / Whole-home Renovation"];
  ```
- This removes **"Custom Carpentry & Millwork"**, which has no service page — a lead could self-select a category the site does not publish. It also fixes the form saying "TV Walls & Lighting Panels" while the service is titled "TV Walls & Custom Millwork".
- Canonical titles: `Kitchens & Bathrooms`, `TV Walls & Custom Millwork`, `Flooring & Tiling`, `Legal Basements`.

**Acceptance:** `grep -rn "TODO(owner)" app/` returns only data-file entries, never rendered copy. `grep -rn "Stage [0-9]" app/` returns nothing in JSX. `grep -rn "Akash" app/` returns only `reviews.ts`. No `openingHoursSpecification` anywhere in `app/`. `/about` and `/contact` show identical credential wording.

---

## Step 2 — `clarify`: cut the gallery to the real work

**Goal:** nothing in the gallery falls apart when a homeowner opens two tabs.

- **Fix the duplicate first:** `/assets/craft-wardrobe.jpg` is claimed as *"Hand-finished walnut floating shelves"* in Barrhaven (`app/data/projects.ts:103`) **and** *"Floating console with soft-close drawers and indirect ambient LED backlighting"* in The Glebe (`:218`). It is also `services.ts:144`. One image, three claimed objects.
- **Reduce `PROJECTS` to the two that map to named Google reviews** in `app/data/reviews.ts` (Westboro kitchen; Barrhaven deck/shelving). Each keeps only images that genuinely belong to it. Attach the matching review to the project so the case study carries the homeowner's own words with a link to the original on Google.
- **Render the `imageDraft` flag.** It is set `true` on all five projects and drawn nowhere, so nothing tells a visitor the photographs are not of these jobs.
- **Wrap the fact strip** at `app/gallery/[slug]/page.tsx` (neighbourhood / property era / duration / completion date) in `DraftBlock` while any of those four values is unconfirmed. It is currently the most credible-looking element on the page — gold border, gold labels, tabular — and 100% invented.
- **Check remaining routes** after deletion: `generateStaticParams`, prev/next wrap logic, filter counts in `GalleryView`, and any `/gallery/[slug]` link elsewhere in the app must not 404.
- If the surviving set supports it, restore the fuller lead paragraph softened in 1d.

**Acceptance:** no image file referenced by two different project descriptions. `npm run build` produces no dead gallery route. Every rendered project fact is either sourced or visibly marked.

---

## Step 3 — `harden`: make the form honest, accessible, and safe to defer

**Delivery config is deferred by owner decision — the code changes below are what make deferring safe.**

### 3a. `app/actions/sendQuoteLead.ts`
- **No API key → fail loudly.** The `else` branch currently `console.log`s the lead and returns `{ success: true, message: "Your quote request has been recorded..." }`. Return `{ success: false, error: ..., fallbackPhone: PRIMARY_PHONE.display }` naming the phone and email instead. A dead end that admits it beats a false success.
- **Treat a Resend rejection as failure.** `if (!ownerEmailRes.ok)` currently only `console.error`s and falls through to `return { success: true, message: "...has been sent!" }`. Return failure with the phone fallback.
- **Escape user input** before interpolating `name` / `email` / `phone` / `service` / `details` into `emailHtml`. Currently raw — a submission can inject markup into the owner's inbox.
- **Fix `href="tel:${PRIMARY_PHONE.href}"`** in the auto-reply: `href` is already `tel:+1…`, producing `tel:tel:+16479390241`. Use `PRIMARY_PHONE.href` as the whole value.
- **Note for the owner (do not fix in code):** `from: "…<onboarding@resend.dev>"` is Resend's sandbox sender and can only deliver to the account owner's own verified address. Every customer auto-reply will silently fail until a real sending domain is verified. Add a code comment stating this.

### 3b. `app/components/QuoteForm.tsx`
- Button label: `{isPending ? "Sending Request..." : "Request a Quote &rarr;"}` renders the **literal text `&rarr;`** — a string literal in a JSX expression is not entity-decoded. Fix to `<>Request a Quote &rarr;</>`. This is the most important button on the site and it is visibly broken. `app/page.tsx` and `SiteFooter.tsx` already do this correctly.
- Remove `outline: "none"` from `inputStyle`.
- Add per-field `aria-invalid`, `aria-describedby`, and `autoComplete` (`name`, `email`, `tel`) to all five fields. Add `name` attributes too — submission works without them (FormData is built manually from state) but the form is dead without JS and gets no browser autofill.
- Add `aria-live="polite"` / `aria-busy` so "Sending Request…" is announced.
- On error: move focus to the banner (`tabIndex={-1}` + `focus()` + `scrollIntoView`). It currently renders at the *top* of the form while a phone user submits at the bottom, so the form appears to do nothing.
- On success: `role="status"` on the container and move focus into it — the form subtree is replaced, so focus currently falls to `<body>` silently. **Echo the submitted email address** so a typo is visible.

### 3c. Global accessibility
- **Add a focus ring.** `app/globals.css` has **no `:focus` or `:focus-visible` rule in 515 lines**. Add `:focus-visible { outline: 2px solid #e3af2b; outline-offset: 2px; }`. WCAG 2.1 **2.4.7 (AA)**, currently failed site-wide.
- Add `type="button"` to the eight `<button>` elements that lack it (`GalleryView` ×3, `ProjectImageGrid`, `Lightbox` ×3, `ServiceFaq`).
- `Lightbox`: add `aria-live="polite"` to the "Photo X of Y" counter.
- **Replace the fake tablist** in `GalleryView`: `role="tablist"` / `role="tab"` / `aria-selected` with no `aria-controls`, no `role="tabpanel"`, and no arrow-key handler. A screen reader announces "tab 1 of 5, use arrow keys" and arrow keys do nothing — worse than no ARIA. Cheapest correct fix: make them `<Link href="/gallery?service=…">` with `aria-current="page"`. They become keyboard-native, right-clickable and indexable, and the client island shrinks.

**Acceptance:** keyboard-only pass through `/contact` shows a visible focus ring on every control. Submitting with the key unset shows an error with a tappable phone number, never a success screen.

---

## Step 4 — `colorize`: reframe placeholders in gold, clear the contrast failures

- **Reframe `DraftTag`, `DraftBlock`, `PlaceholderImage`** from red alarm (`#ff9d9d`, `rgba(255,72,72,…)`, red dashed hatch) to brand gold on black (`#e3af2b` at low alpha on `#0f0d0b`). Red is currently the only chromatic break in the entire palette, which makes a 420px hatched block the most visually dominant object on the trust page.
- **Rewrite the copy to own the position** rather than apologise: *"We don't use stock photos of people. Real site photos go up as jobs finish."* The refusal to fake proof is the strongest thing this business can say in a market defined by fear of being lied to.
- **Keep red behind an explicit internal flag** — e.g. a `severity="build"` prop or an env check — so the team can still get the loud version during review.
- **Fix all five WCAG AA contrast failures** (ratios computed; the palette is otherwise sound — cream at α≥0.5 passes everywhere, gold runs 9.6–10.4:1):

| Colour | Ratio | Location | Size |
|---|---|---|---|
| `::placeholder` @ 0.32 | **2.67** | `app/globals.css` | 15px, every form field |
| cream @ 0.45 | **4.23** | `app/about/page.tsx` (reviewer tag) | 10.5px |
| cream @ 0.45 | **4.23** | `app/gallery/GalleryView.tsx` ("KEY SCOPE") | 10px |
| cream @ 0.4 | **3.53** | `app/components/Lightbox.tsx` | 11px |
| cream @ 0.4 | **3.52** | `app/components/SiteFooter.tsx` | 12px |

Raising 0.4/0.45 → 0.5 and the placeholder → 0.5 clears every one. All are below the 18px large-text exemption, so 4.5:1 applies.

---

## Step 5 — `adapt`: the mobile experience

- **Build a mobile nav.** `app/globals.css` kills `.nav-links` at ≤768px and `SiteNav.tsx` has **no hamburger, drawer, toggle, or `aria-expanded`**. On a phone, Services / Process / Gallery / About are gone from every page; the only routes are the footer or the two header CTAs.
- **Fix the crushed heroes.** `globals.css` forces `padding-top: 80px !important` on every `<section>`, overriding hero padding of 140–150px. Against the fixed 74px nav that leaves **6px of clearance** on `/about`, `/gallery` and `/contact`. `/gallery/[slug]` uses a `<div>` instead of a `<section>`, escapes the `!important`, and keeps its 135px — so three of four heroes are broken by an element-name accident.
- **Fix the real 360px overflow** currently hidden by `body { overflow-x: hidden }`: `minmax(340px, 1fr)` grids in `about/page.tsx` and `contact/page.tsx`, and `minmax(360px, 1fr)` in `GalleryView.tsx`. At 360px with the forced 20px side padding only 320px is available, and a grid track will not shrink below its minimum. None of these divs carries a className, so no breakpoint can override the inline value — give them classes or make the minimum responsive.
- **Check the header itself:** at 375px, logo + two CTA pills ≈ 464px into 335px usable.
- **Raise the seven touch targets** measuring 33–41px (nav CTAs, gallery filter tabs, empty-state reset, outline buttons) to ≥44px.

---

## Step 6 — `layout`: composition and endings

- **Full-bleed hero on `/gallery/[slug]`.** `project.heroImage` exists on every project and is used only for the OG tag. The page opens with ~700px of text and a metadata table on an Experience surface — a homeowner clicked to see a kitchen. Put the image directly under the nav (`min(62vh, 620px)`, `objectFit: cover`, existing gradient scrim, h1 over its lower-left) and move the fact strip below it.
- **Editorial image grid** replacing the fixed 320px crop in `ProjectImageGrid.tsx`. You cannot see a mitre joint at 350×320 on a site selling millimetre tolerances. First image full-width at 16/9, rest 2-up at 4/3, no fixed pixel heights. Delete the per-tile "Click to expand" badge — the section header already says it, and the lightbox footer says it a third time.
- **`/contact` proof and ending.** There are zero reviews and no star rating on the page; the moment before submit is supported by one 11px line and a lock emoji. Move a compact 2-review strip beneath the submit button (or into the right rail so it survives the mobile stack). Then append a real closing section — response promise + both tap-to-call buttons — instead of ending on twelve grey neighbourhood names. Every other page ends on a CTA; the one page where the ending carries commercial weight does not.
- **Fix the two orphaned grid cards on `/about`:** 5 credentials into 4 columns, 4 reviews into 3. The homepage documented and solved this exact bug; the fix was lost. Use explicit column counts rather than `auto-fit`, so the count is designed rather than emergent.
- **Build the Team/Model section.** `ABOUT_DATA.team` contains the best sentence in the project — *"We do not run five concurrent sites with unsupervised labor. When we start your renovation, you have our focused attention until the walkthrough is signed off."* — and it renders nowhere. Make it a wide full-bleed statement, not another bordered card in another grid.
- Also unused: `ABOUT_DATA.title`, `foundingYear`, `serviceAreas`. Replace the hardcoded 12-neighbourhood arrays duplicated in `GalleryView.tsx` and `contact/page.tsx` with `ABOUT_DATA.serviceAreas`.

---

## Step 7 — `typeset`: a real type scale

- **24 distinct font sizes** are in use across these surfaces — 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5 all separately. Collapse to a scale.
- **Six near-duplicate clamps.** Page h1s that should match differ by 2px (`clamp(36px,5.5vw,62px)` vs `…64px`); two bottom-CTA h2s differ by 2px (`44` vs `46`). Transcription drift, not decisions.
- **`.h2`, `.h2-xl`, `.pull-quote` already exist** in `globals.css` and are used by *nothing* — not even the homepage, which bypasses its own scale. Either adopt them or delete them.

---

## Step 8 — `distill`: consolidate the system

- **Nine near-identical near-black grounds** — `#000`, `#0a0908`, `#0b0a09`, `#0c0a08`, `#0f0d0b`, `#14120f`, `#1c1915`, `#080706`, `#060504` — to a small token set. `globals.css` currently defines **zero** CSS custom properties for colour or spacing.
- **`const GOLD = "#e3af2b"` is redeclared in nine files.** One source.
- **Extract `GoldButton`** (never extracted from the homepage, so every page reinvented it) and **`GoogleLogo`** (copy-pasted in full four times).
- **Four CTA weights for one action** — 500, 500, 600, 600 with three different paddings and three letter-spacings. Pick one.
- **87 `!important` declarations** in `globals.css`, 80+ inside the three breakpoints — they exist only because layout is set inline, so media queries can only win by force. Reducing inline layout removes the need.
- Spacing: 14 of 50 distinct px values are off any 4px grid (`3, 5, 13, 22, 34, 42, 46, 50, 62, 74, 90, 135, 150, 230`).

---

## Step 9 — `animate`: turn the motion layer on

`document.body.classList.add("js-loaded")` runs **only in `app/page.tsx`**, and all 14 reveal rules in `globals.css` are gated on `body.js-loaded`. So ~95 lines of scroll-reveal design — `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`, `.stagger-children` — exist and are **inert on `/about`, `/gallery` and `/contact`**. The homepage breathes; the other three are static. This is the single largest reason the trio reads as a different site.

- Move the `js-loaded` wiring into the root layout (or a small shared client component) so all routes get it.
- Apply reveal classes to the three pages' sections.
- The existing `IntersectionObserver` is well built — rAF-throttled, `{ passive: true }`, `unobserve` per element, full cleanup. **Reuse it, do not rewrite it.**
- `will-change` is left on at rest on the four reveal base classes; unset it once revealed.
- The `prefers-reduced-motion` block correctly preserves the revealed end state — **keep that behaviour**.

---

## Step 10 — `optimize`

- **12.5MB stock MP4 hero** (`vecteezy_large-bedroom-with-wooden-design_2016901.mp4`) in `app/page.tsx` with no `poster` and no `preload`. Also worth raising with the owner: it is licensed stock footage of a room this business did not build, on a site that enforces a zero-stock-humans policy.
- **`og-image.png` is 594KB** while `og-image.jpg` is 145KB. `/about` and `/contact` point at the `.jpg`, `layout.tsx` at the `.png` — two different social cards for one site. Pick one.
- `unoptimized` is passed inconsistently on `next/image` (nav logo, footer logo, homepage cards) — the gallery correctly dropped it.
- **Delete `public/assets/owner-portrait.jpg`** — the stock human the About plan ordered removed. Unreferenced but still shipped and publicly fetchable.

---

## Step 11 — `document`

Write `DESIGN.md` from the *shipped result* (not from intentions), since the project has none and `app/page.tsx` has been acting as undocumented design authority. Run after steps 4, 7, 8 so it records the consolidated system rather than the drift.

---

## Step 12 — `polish`

Final pass. It will read the three critique snapshots in `.impeccable/critique/` and pick up remaining priority issues without a copy-paste.

---

## Loose ends found during the critique (owner input needed — do not guess)

- `companyinfo.md` lists **3** Google reviews; `reviews.ts` has **4**; `company.ts` says `reviewCount: 4`.
- `companyinfo.md` primary phone is `437-288-5105`; `company.ts` marks `647-939-0241` as Primary. The number on the Google Business Profile may be the one currently shown second on `/contact`.
- `companyinfo.md` email is `info@sscarpentryandrenovations.com`; `company.ts` uses `ssrenovations.ottawa@gmail.com`.
- `/contact` presents an **alternate phone at equal weight** on a site whose pitch is "one point of contact, not a receptionist or switchboard" — decide whether it belongs there.
- Weekly opening hours, verbatim from the Google Business Profile (blocks-launch).
- `about.ts` `foundingYear.year` is a guess (`"2024"`).

## Verification checklist

- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` passes, no dead gallery routes
- [ ] `npm run lint` clean (run once, at the end — slow on this mount)
- [ ] `node "$IMPECCABLE/scripts/detect.mjs" --json app/about app/gallery app/contact app/components app/page.tsx` returns `[]`
- [ ] `grep -rn "Stage [0-9]" app/` — nothing in JSX
- [ ] `grep -rn "Akash" app/` — only `reviews.ts`
- [ ] `grep -rn "openingHoursSpecification" app/` — nothing
- [ ] No image file described as two different objects
- [ ] Keyboard-only pass on `/contact`: visible focus on every control, error reachable, success announced
- [ ] 360px viewport: no horizontal overflow with `overflow-x: hidden` temporarily disabled
- [ ] Submit with `RESEND_API_KEY` unset → error with tappable phone, never a success screen
- [ ] Re-run `/impeccable critique` on all three targets and compare against the fingerprinted snapshots
