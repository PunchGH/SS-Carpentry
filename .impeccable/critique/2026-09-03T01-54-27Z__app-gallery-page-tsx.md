---
target: Gallery page
total_score: 18
max_score: 32
na_heuristics: 9,10
p0_count: 0
p1_count: 3
target_identity: "file:/mnt/d/Prototype/SS Carpentry/app/gallery/page.tsx"
target_fingerprint: "sha256:f0747712a6f9d47edc3a61bf8723561578d1bb21f54f696fd1230ddb35aa5f7e"
target_path: /mnt/d/Prototype/SS Carpentry/app/gallery/page.tsx
timestamp: 2026-09-03T01-54-27Z
slug: app-gallery-page-tsx
---
# Critique — /gallery + /gallery/[slug] (mode: Experience)

Method: dual-agent (A: design review · B: deterministic evidence). No browser automation; static evidence substituted. Detector: exit 0, zero findings on this surface.

## Design Health Score — 18/32 (h9, h10 n/a)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Grid re-render after filter is never announced |
| 2 | Match system / real world | 3 | "Case Study" / "Property Era" is marketer's language |
| 3 | User control and freedom | 3 | prev/next wraps silently at project 5 ([slug]/page.tsx:88-89) |
| 4 | Consistency and standards | 2 | Index image-led, detail page text-led: two different products |
| 5 | Error prevention | 3 | Empty-filter state well-built with recovery button |
| 6 | Recognition rather than recall | 2 | imageDraft:true on all 5 projects, rendered nowhere |
| 7 | Flexibility and efficiency | 1 | role="tablist" with no aria-controls, no tabpanel, no arrow-key handler |
| 8 | Aesthetic and minimalist design | 1 | Three instructional overlays for one obvious affordance |
| 9 | Error recovery | n/a | No failure modes on a static route |
| 10 | Help and documentation | n/a | Experience surface |

## Design specificity
Index card is the exception: authored for a contractor (neighbourhood badge, scope chips, completed + duration). Detail page is a generic B2B case study. Reveal/motion layer inert (js-loaded only at page.tsx:231).

## Priority issues
- [P1] Same photograph, two projects, two captions: /assets/craft-wardrobe.jpg at projects.ts:103 (walnut shelves, Barrhaven) and :218 (LED media console, The Glebe). Also services.ts:144. Discoverable in one minute of ordinary comparison behaviour.
- [P1] All 5 projects carry invented neighbourhoods, property eras, durations, completion dates under an eyebrow reading "Real Projects · Ottawa Craftsmanship" (GalleryView.tsx:68). Detail-page fact strip ([slug]/page.tsx:214-240) renders four invented facts with zero draft marking.
- [P1] Real horizontal overflow at 360px: minmax(360px,1fr) at GalleryView.tsx:197 vs 320px available; masked by body{overflow-x:hidden} (globals.css:15).
- [P2] No hero image on the project page ([slug]/page.tsx:127-243); heroImage used only for the OG tag at :46. First ~700px is text on an Experience surface.
- [P2] Every photo cropped to a fixed 320px box (ProjectImageGrid.tsx:26-30) — craft is never legible on a site selling millimetre tolerances.
- [P2] Tablist claims a keyboard contract it doesn't honour (GalleryView.tsx:98-153). Plain links with aria-current would work correctly.
- [P2] Contrast: cream @0.45 = 4.23:1 at 10px ("KEY SCOPE", GalleryView.tsx:305) fails AA.
- [P3] Empty state jumps h1 -> h3 (GalleryView.tsx:170).
- [P3] Header eats the first mobile screen; first photograph is below the fold. Hero crushed to 6px nav clearance by globals.css:376-382.

## Positive
Index card fact architecture answers "a house like mine, near me, recently, how long" without a click — keep this component. Lightbox is properly built: role=dialog, aria-modal, focus trap, focus restore, scroll lock, arrow keys, swipe, 44/48px targets (Lightbox.tsx:22-109,165-166). Empty state is designed, not defaulted. All images next/image with real sizes; alt text descriptive.
