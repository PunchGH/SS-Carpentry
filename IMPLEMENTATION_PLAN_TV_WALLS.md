# Implementation Plan — TV Walls & Millwork Positioning

**Route:** upgrade `/services/tv-walls-lighting-panels` into a showcase page + fix the site-wide positioning.
**Job:** This is the custom-millwork work that makes "**Carpentry**" in the business name honest. Right now it's the third bullet on a generic reno lineup.

**Model legend:** `Opus` = judgement · `Sonnet` = bounded UI · `Gemini` = boilerplate/bulk.

---

## ⚠ Blocked on photography — and that's the whole plan

Legal Basements ships on writing. **This page cannot.** A TV wall page without photos is worthless — the product *is* the look. `service-photos` is already `blocks-content` in `placeholders.ts`, and the current image (`craft-*.jpg`) doesn't depict this work at all.

**So the first deliverable isn't a page, it's a shot list.** Send it to the owner today — this is the cheapest, highest-return thing on the entire project, and the photos are probably already on his phone.

### Shot list (send to owner) · **Opus** to draft, plain-language

Per completed TV wall, ideally 6–8 shots:
- Wide, straight on, room lights up
- Same frame, **lights dimmed / LED on** — the on/off pair is the single most persuasive image
- Detail: panel edges, mitres, fluting/slat spacing, seams
- Detail: how the TV sits — recessed, flush, floating
- Cable management — no visible wires is the selling point, show it
- Materials close-up: veneer, stone, paint finish
- One in-progress framing shot (proves he built it, not bought it)
- Any before shot of the blank wall

Also worth capturing: which room, what materials, roughly how long it took.

## 1. Positioning fix (site-wide) · **Opus**

The name says Carpentry; the four service lines read as general reno. Millwork is the differentiator and it's invisible.

- Home hero subhead + `#craft` intro: name custom millwork explicitly
- Craft card for TV walls: lead on *custom-built*, not "TV mounting" — the difference between him and a handyman
- `layout.tsx` metadata + JSON-LD description: add millwork/feature-wall language
- Keep it truthful: this is a claim about *what he builds*, not a credential

## 2. Service page upgrade · **Sonnet** (layout) / **Gemini** (copy off template)

Existing `Service` type already supports most of this. Additions:

1. **Photo-led hero** — full-bleed finished wall, not a text hero
2. **Before / after pair** if a before exists
3. **Lighting on/off toggle or slider** — the standout interaction; small client island (**Sonnet**)
4. **Materials & finishes** — slat, fluted, veneer, stone, painted MDF; what suits what
5. **Lighting integration** — LED channel, dimming, driver/transformer location, switching
6. **The details people don't think about** — cable routing, receptacle relocation, soundbar provision, mount weight, heat clearance
7. **Electrical honesty** — any new circuits/receptacles go to licensed electrical (ESA). `licensed-trades` is already `blocks-launch`; resolve it here
8. **Gallery cross-link** — TV walls are the most photogenic work; feature them in `/gallery`

## 3. Gallery integration · **Sonnet**

TV walls should be over-represented in `/gallery` relative to their share of revenue — they photograph best and they differentiate hardest. Tag projects by service so the gallery filter surfaces them.

## 4. Model routing

| Task | Model | Why |
|---|---|---|
| Shot list for owner | **Opus** | Needs to be genuinely useful to a non-photographer |
| Positioning rewrite (site-wide) | **Opus** | Brand judgement, touches several files |
| Lighting on/off interaction | **Sonnet** | Self-contained client component |
| Page layout + sections | **Sonnet** | Bounded, spec'd |
| Materials/finishes/FAQ copy | **Gemini** | Template-driven, once positioning is set |
| Metadata, JSON-LD, sitemap | **Gemini** | Mechanical |

---

## Checklist

**Unblock (do first)**
- [ ] Shot list drafted and sent to owner
- [ ] Photos received for ≥1 completed TV wall
- [ ] On/off lighting pair captured
- [ ] `service-photos` updated in `placeholders.ts`
- [ ] `imageDraft` flipped to false once real

**Positioning**
- [ ] Home hero + craft intro name custom millwork
- [ ] TV walls craft card leads on custom-built
- [ ] `layout.tsx` metadata + JSON-LD updated

**Service page**
- [ ] Photo-led hero
- [ ] Before/after if available
- [ ] Lighting on/off interaction
- [ ] Materials & finishes section
- [ ] Lighting integration section
- [ ] Cable management / practical details
- [ ] Licensed electrical stated (`licensed-trades` resolved)
- [ ] Gallery cross-links

**Gallery**
- [ ] TV wall projects tagged and featured

**Verify**
- [ ] `npx tsc --noEmit` clean · `npm run build` passes
- [ ] No placeholder image left presenting as real work
- [ ] Mobile pass — photos are the page, check load weight
- [ ] Image optimization on (drop `unoptimized`)
- [ ] `grep -rn "TODO(owner)" app/`
