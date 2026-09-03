---
target: CTA / Contact page
total_score: 19
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 3
target_identity: "file:/mnt/d/Prototype/SS Carpentry/app/contact/page.tsx"
target_fingerprint: "sha256:502963c89a048d4d43e9be46c560addb050c00948d1af9af4c91bae8226eb1c3"
target_path: /mnt/d/Prototype/SS Carpentry/app/contact/page.tsx
timestamp: 2026-09-03T01-54-29Z
slug: app-contact-page-tsx
---
# Critique — /contact (CTA page, mode: Persuade)

Method: dual-agent (A: design review · B: deterministic evidence). No browser automation; static evidence substituted. Detector: exit 0, zero findings on this surface.

## Design Health Score — 19/40 (all 10 scored)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 1 | Status shown after submit is FALSE when RESEND_API_KEY unset |
| 2 | Match system / real world | 2 | "Stage 4 Contractor Vetting" internal label shipped (contact/page.tsx:392) |
| 3 | User control and freedom | 1 | Success destroys the form; no edit, no undo, email never echoed |
| 4 | Consistency and standards | 1 | Four button weights across four files for one action |
| 5 | Error prevention | 1 | No inline validation, no aria-invalid, no autoComplete |
| 6 | Recognition rather than recall | 3 | Persistent visible labels bound with htmlFor — properly done |
| 7 | Flexibility and efficiency | 3 | Tappable phone/email cards above the form — correct call |
| 8 | Aesthetic and minimalist design | 3 | Lock emoji is the only emoji in a Cormorant/Jost system |
| 9 | Error recovery | 1 | Error banner at top of form; phone user submits at bottom, sees nothing |
| 10 | Help and documentation | 3 | "What Happens After You Contact Us" is real and specific |

## Priority issues
- [P0] Form reports success when the lead was discarded. sendQuoteLead.ts:119-136 (no API key -> console.log -> success:true "recorded"); :85-87 -> :106 (Resend rejection only console.error'd, falls through to "has been sent!"); :77/:98 sender is onboarding@resend.dev (sandbox, cannot deliver to arbitrary recipients, so every customer auto-reply fails silently). placeholders.ts still flags lead-destination as blocks-launch. Also :42-55 interpolates name/details unescaped into HTML; :62 emits href="tel:tel:+1..." (double scheme).
- [P0] Primary CTA renders raw markup: QuoteForm.tsx:313 has the entity inside a JSX string literal, so the button reads "Request a Quote &rarr;" on screen. page.tsx:605 and SiteFooter.tsx:50 do it correctly.
- [P1] No keyboard focus indicator: zero :focus/:focus-visible rules in globals.css (515 lines); QuoteForm.tsx:27 sets outline:"none" on all five fields (:218,236,251,266,288). WCAG 2.4.7 AA failed globally.
- [P1] /contact asserts as fact what /about marks unverified: contact/page.tsx:397-402 ($2M CGL, WSIB, ESA/ECRA) unmarked while about.ts:91-108 marks them draft and placeholders.ts flags blocks-launch. DraftTag imported at :3, never rendered. Hours at :294-296 and JSON-LD :103-110 reintroduce the exact value layout.tsx deliberately removed (contradicts companyinfo.md "Opens 9 AM").
- [P1] Real horizontal overflow at 360px: minmax(340px,1fr) at contact/page.tsx:311 vs 320px available; masked by overflow-x:hidden.
- [P2] Zero reviews and no star rating on the page. Decision point supported by one 11px line and a lock emoji, while four real Google reviews sit two routes away.
- [P2] Page ends on twelve grey neighbourhood names — no final CTA, no phone. Peak-end violation; every other page ends on a CTA.
- [P2] Contrast: ::placeholder rgba(247,245,241,0.32) = 2.67:1 (globals.css:34) fails AA badly on every form field.
- [P3] Six service options (QuoteForm.tsx:9-16) vs five specified; "Custom Carpentry & Millwork" has no service page.
- [P3] Alternate phone at equal weight contradicts the "one point of contact, not a switchboard" pitch.
- [P3] No aria-live on pending state; no aria-invalid/aria-describedby; success swaps the subtree so focus falls to body, unannounced.

## Note
Form fields have no name attribute, but this does NOT break delivery: QuoteForm.tsx:63-70 builds FormData manually from controlled state. It does mean the form is dead without JavaScript and gets no browser autofill.

## Positive
The h1 "We reply within one working day." is the best strategic decision in the project. Fastest paths (tappable phone/email) placed above the form. Field discipline held: four fields plus one optional, no budget question, visible bound labels, honeypot, values preserved on failure.
