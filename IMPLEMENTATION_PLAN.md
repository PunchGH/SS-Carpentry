# Implementation Plan — Company Info Update

**Scope:** Front-end only. Update the site to the client's confirmed business info: new service lines, two phone numbers, new email, new slogan, new logo. No routing/CMS/backend work in this pass.

**Files touched:** `app/page.tsx`, `app/layout.tsx`. Assets in `public/assets/`.

**Rule:** All business facts live in the `COMPANY` constant. Never hardcode a phone/email/slogan inline — reference the constant so the next change is one edit.

---

## 1. Data layer — `app/page.tsx` (top of file)

Replace the current `COMPANY` object (line ~18). Note `phone`/`phoneHref` become an **array** — every usage site must be updated (see §3).

```ts
const COMPANY = {
  name: "SS Carpentry and Renovations",
  short: "SS Carpentry",
  suffix: "& Renovations",
  slogan: "Renovate, reimagine, rebuild",
  address: "3008 Travertine Way, Ottawa, ON K2J 7G4, Canada",
  phones: [
    { display: "647-939-0241", href: "tel:+16479390241" },
    { display: "437-288-5105", href: "tel:+14372885105" },
  ],
  email: "ssrenovations.ottawa@gmail.com",
  rating: 5.0,
  reviewCount: 3,
};
```

Remove the now-unused `type` field. Old email `info@sscarpentryandrenovations.com` and old single phone must not survive anywhere (grep to confirm).

## 2. Service lines — replaces `CRAFT_ITEMS` (line ~198)

The craft section is already a **2×2 grid of exactly 4 items**, so this is a 1:1 swap — no layout change needed. Old set (bespoke kitchens / staircases & joinery / fitted wardrobes / full renovations) is retired.

| # | Title | Image (see §5) |
|---|---|---|
| 1 | Kitchens & Bathrooms | `craft-kitchen.jpg` (keep) |
| 2 | TV Walls & Lighting Panels | needs new photo |
| 3 | Flooring & Tiling | needs new photo |
| 4 | Legal Basements | needs new photo |

Write fresh `badge` / `copy` / `alt` for each in the existing voice (plain, confident, ~25 words, no invented credentials or timelines). Keep the section heading "Four disciplines, one standard of precision" — still accurate.

## 3. Copy + markup edits — `app/page.tsx`

| Location | Change |
|---|---|
| Nav (~444) | Keep "Request a quote". Add a second click-to-call CTA — **"Call for a free estimate"** using `phones[0]` |
| Hero eyebrow (~480) | Add the slogan above the H1 as the gold eyebrow line |
| Hero subhead (484) | Rewrite — currently "kitchens, custom staircases, tailored wardrobes"; must reflect the 4 new service lines |
| Stat bar (493–505) | Keep 5.0★/3 reviews and "fixed written quote". Consider swapping one tile to "Free estimates" |
| Contact band (~844–856) | Render **both** numbers, each click-to-call, labelled "Free estimate". Update email |
| Form `<select>` (908–914) | Replace all 5 options with the 4 new service lines + "Not sure yet" |
| FAQ (~380, ~388) | Answers reference wardrobe/kitchen timelines and "carpentry" insurance — rewrite for new service mix |
| Footer tagline (978) | "Bespoke carpentry and renovations…" → new positioning + slogan |
| Footer contact (993–995) | Both numbers + new email |
| Footer assurance (1002) | **Delete "FOUNDED 3 MONTHS AGO"** — ages badly, reads as inexperience |
| Portfolio labels (263–269) | Labels name staircases/wardrobes/decks — see §5 blocker |
| Reviews (175–196) | **Do not edit review text or names.** These are real Google reviews. Tag lines may stay as-is |

Mobile: add a sticky click-to-call bar at the bottom of the viewport (`<980px`) — highest-value front-end add for a contractor site.

## 4. SEO / structured data — `app/layout.tsx`

- `description`, `openGraph`, `twitter`: rewrite around the 4 service lines. Drop staircases/wardrobes/joinery language.
- `keywords` (32–47): replace `custom staircases Ottawa`, `fitted wardrobes Ottawa`, `Kanata bespoke joinery`, `millwork Ottawa` with bathroom renovation / TV feature wall / flooring & tiling / legal basement / basement conversion Ottawa terms.
- `title.default`: reflect broader renovation scope, not just carpentry.
- JSON-LD (113–167): `telephone` → both numbers (array), `email` → new address, add `slogan`, replace `description`, add `hasOfferCatalog` listing the 4 services.
- Leave `metadataBase` / domain as-is (see §6).

## 5. Assets

Logo is **already in place** — `ss-logo-cropped.png`, `ss-mark-tight.png`, `logo-favicon.png`, `app/icon.png`, `public/icon.png` are all the same new 1024×1024 file. Remaining work:

- **Nav @64px renders the full lockup** — the baked-in "CARPENTRY & RENOVATIONS" wordmark is illegible at that size. Crop a mark-only variant (house + SS monogram) for nav and favicon; keep the full lockup for the footer @160px.
- **Logo has an opaque black background.** Fine on this dark site, but the favicon and OG card will show a black square on light backgrounds. Produce a transparent-background variant.
- ~15% dead padding on all sides — crop it so the mark renders at its true optical size.

**Blocker — photography.** Three of four service tiles and most portfolio tiles now show work that doesn't match their label. Until the client supplies real photos:
- Reuse existing images as placeholders, each marked with a `TODO:` comment naming the shot needed.
- Do **not** invent project labels/neighbourhoods for work not pictured. Confirm with the client which portfolio entries are real jobs before shipping.

## 6. Decisions needed from client

1. Domain stays `sscarpentryandrenovations.com`? (Email moved to Gmail — confirm the site domain and add a matching business email later.)
2. Which portfolio projects are real and photographable?
3. Business hours (JSON-LD currently claims Mon–Sat 08:00–18:00 — verify).
4. Does "Carpentry" stay the lead word in the H1 now that services are broader?

## 7. Out of scope (next phase)

Multi-page routing (`/services/[slug]`, `/portfolio`, `/about`, `/contact`), real form submission, CMS, analytics.

---

## Checklist

**Data**
- [ ] Rewrite `COMPANY` constant with slogan, `phones[]`, new email
- [ ] Delete unused `type` field
- [ ] `grep` for old email + old single phone — zero results

**Services**
- [ ] Replace `CRAFT_ITEMS` with the 4 new service lines
- [ ] Write badge/copy/alt for each
- [ ] Update form `<select>` options

**Copy**
- [ ] Hero: slogan eyebrow + rewritten subhead
- [ ] Nav: "Call for a free estimate" click-to-call CTA
- [ ] Contact band: both numbers + new email
- [ ] Footer: tagline, both numbers, new email
- [ ] Footer: remove "FOUNDED 3 MONTHS AGO"
- [ ] FAQ: rewrite the two service-specific answers
- [ ] Portfolio labels resolved (real or generic)
- [ ] Reviews left untouched

**Mobile**
- [ ] Sticky click-to-call bar `<980px`

**SEO**
- [ ] `metadata` description / OG / Twitter rewritten
- [ ] `keywords` swapped to new service terms
- [ ] JSON-LD: both phones, new email, slogan, `hasOfferCatalog`

**Assets**
- [ ] Mark-only logo crop for nav + favicon
- [ ] Transparent-background logo variant
- [ ] `TODO:` comments on every placeholder photo

**Verify**
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` passes
- [ ] Both phone links dial correctly on mobile viewport
- [ ] Desktop + mobile screenshot review
