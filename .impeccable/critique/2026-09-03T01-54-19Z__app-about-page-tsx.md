---
target: About us page
total_score: 16
max_score: 32
na_heuristics: 9,10
p0_count: 0
p1_count: 3
target_identity: "file:/mnt/d/Prototype/SS Carpentry/app/about/page.tsx"
target_fingerprint: "sha256:690d1f1f320d603f4b99e94362505f1463ff9bd3ce417cd0bf5251a1ae0b8fec"
target_path: /mnt/d/Prototype/SS Carpentry/app/about/page.tsx
timestamp: 2026-09-03T01-54-19Z
slug: app-about-page-tsx
---
# Critique — /about (mode: Persuade)

Method: dual-agent (A: design review · B: deterministic evidence). No browser automation available; static evidence substituted. Detector: exit 0, zero findings on this surface.

## Design Health Score — 16/32 (h9, h10 n/a)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | Nav has no active/current-page state |
| 2 | Match system / real world | 2 | "Stage 4 Vetting & Proof" internal label shipped (about/page.tsx:261) |
| 3 | User control and freedom | 3 | Nav links display:none on mobile, no replacement |
| 4 | Consistency and standards | 1 | Three eyebrow sizes; paddings 140/80/40/60/80/80/100, no interval |
| 5 | Error prevention | 2 | DraftTag marks values while claims render as fact |
| 6 | Recognition rather than recall | 3 | Scannable, explicit labels |
| 7 | Flexibility and efficiency | 1 | No anchors, no skip-link, no in-page nav |
| 8 | Aesthetic and minimalist design | 2 | Six red alarm elements on a confidence page |
| 9 | Error recovery | n/a | No error states on a static trust page |
| 10 | Help and documentation | n/a | The page is the documentation |

## Design specificity
Category-interchangeable. The 7-section stack (hero/founder/credentials/story/values/reviews/CTA) maps 1:1 onto a law firm. Three auto-fit grids of bordered #0f0d0b boxes. Drops the homepage's italic-gold accent word after the h1; never uses the Roman-numeral section spine; entire reveal/motion layer inert (js-loaded set only at page.tsx:231).

## Priority issues
- [P1] Most visually dominant element is a red dashed hatch block that prints an internal build note including the owner's name (about/page.tsx:173 -> PlaceholderImage.tsx:104). Plan :19 records he doesn't want his name published; reviews.ts:4-8 documents the one approved exception, which this is not.
- [P1] Two grids orphan a card: 5 credentials into 4 columns (about/page.tsx:271-277), 4 reviews into 3 (:436-441). Homepage documented and solved this at page.tsx:644-646; fix was lost.
- [P1] licensedTrades set draft:false (about.ts:103-108) while placeholders.ts flags licensed-trades as blocks-launch.
- [P2] Contrast: cream @0.45 = 4.23:1 at 10.5px (about/page.tsx:504) fails AA.
- [P3] "Stage 4 Vetting & Proof" internal jargon shipped to customers (:261).
- [P3] about.ts defines title/foundingYear/team/serviceAreas — none referenced anywhere in app/. The best sentence on the page (about.ts:112-114) renders nowhere.

## Persona red flags
Returning visitor: no anchors/skip-link; scrolls past red blocks to find PLACEHOLDER on exactly the credentials he came for; /contact then states the same claims as fact.
Keyboard/SR user: zero :focus rules in 515 lines of globals.css; no skip link (layout.tsx:213).

## Positive
placeholders.ts + PlaceholderImage is a real design position (cannot render a photo even with tags suppressed). Credential vocabulary correctly localised to Ontario (WSIB/ESA/ECRA/HST/CGL). Reviews link to originals on Google.
