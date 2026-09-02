# Implementation Plan — Legal Basements Guide Page

**Route:** `/guides/legal-basement-ottawa`
**Job:** Answer *"can my basement legally become an apartment in Ottawa?"* — capture pre-sales search, prove expertise, pre-qualify the buyer, funnel to `/services/legal-basements`.

**Model legend:** `Opus` = accuracy/judgement · `Sonnet` = bounded UI work · `Gemini` = boilerplate/bulk.

---

## ⚠ The one rule: no unsourced numbers

This page publishes regulatory claims under a contractor's name. A wrong egress dimension or ceiling height is worse than no page — it proves he *doesn't* know the code, and homeowners may act on it.

**Every specific figure must carry a citation.** No number from model memory. Where something varies by property or zone, say "depends — this is what the feasibility visit checks" rather than guessing.

Note the existing service page already avoids numbers deliberately ("minimum height requirements apply"). The guide can't be that vague, which is exactly why the research pass gates everything else.

## 1. Research pass — do this first · **Opus**

Primary sources only:
- City of Ottawa — secondary dwelling unit / coach house pages, permit process, inspections
- City of Ottawa Zoning By-law 2008-250 — where suites are permitted, parking, unit size
- Ontario Building Code (O. Reg. 332/12) — Part 9: ceiling heights, egress windows, fire separation, alarms
- Ontario Fire Code retrofit provisions where they apply to existing dwellings
- ESA — licensed electrical requirements

Output → `app/data/guides/legal-basement.ts`:

```ts
type Claim = { id, statement, source, url, retrieved };  // no statement without a source
```

Rules:
- Cite section numbers where they exist
- Anything ambiguous → "confirm with the City" phrasing, never a confident guess
- Record a `lastReviewed` date; codes change on cycles
- Flag which claims need re-checking annually

## 2. Page structure · **Sonnet** (layout) / **Opus** (the code content)

1. **H1 + short answer box** — the 4–6 factors that decide it, above the fold
2. **Self-qualification checker** (§3)
3. **Requirement sections** — one each: ceiling height · egress · fire separation · alarms · zoning & permitted use · permits and inspections. Each: what the rule is, why it exists, what it means in practice, cited.
4. **Common blockers** — what most often disqualifies a basement, and what can be fixed vs not
5. **What it costs** — cost *drivers* only; link to the service page price band (still `draft: true`)
6. **Process & timeline** — link to the service page steps, don't duplicate
7. **FAQ** — reuse `ServiceFaq` component
8. **CTA** → `/services/legal-basements` primary, `/contact` secondary, tappable phone
9. **Sources + last-reviewed date + disclaimer** — "guidance, not a code ruling; the City has final say"

## 3. Self-qualification checker · **Sonnet** (UI) / **Opus** (logic + wording)

5–6 questions: ceiling height band · existing window well · detached/semi/row · zoning known? · separate entrance possible? · age of home.

Hard constraints:
- **Never outputs a legal determination.** Three results only: *Looks promising* / *Worth a look* / *Unlikely without major work* — each ending in "book a feasibility visit."
- **Do not gate the result behind an email.** Friction guide Stage 5 — that's the move that kills trust. Show the result, *then* offer the CTA.
- Client component, no backend, no PII stored
- Keyboard accessible, works without JS gracefully (progressive enhancement or a plain fallback)

## 4. SEO · **Gemini**

- Metadata + OG
- `FAQPage` + `Article` JSON-LD; `BreadcrumbList`
- `/guides/` added to sitemap
- Internal links **both ways**: service page → guide ("not sure if yours qualifies?"), guide → service page
- Link from home craft card + nav (consider a "Guides" nav entry once there's more than one)

## 5. Model routing

| Task | Model | Why |
|---|---|---|
| Research pass + citations | **Opus** | Accuracy is the whole asset; hallucinated code is the failure mode |
| Requirement section copy | **Opus** | Must not drift from sources |
| Checker logic + result wording | **Opus** | Liability-sensitive phrasing |
| Page layout, sections, checker UI | **Sonnet** | Bounded, visual, spec'd |
| Metadata, JSON-LD, sitemap, internal links | **Gemini** | Mechanical |

---

## Checklist

**Research (blocks everything)**
- [ ] Ottawa secondary dwelling unit rules sourced
- [ ] Zoning By-law 2008-250 checked for permitted zones/parking
- [ ] OBC Part 9 — ceiling height, egress, fire separation, alarms
- [ ] ESA electrical requirement confirmed
- [ ] `legal-basement.ts` written; every claim has source + URL + date
- [ ] `lastReviewed` set; annual re-check flagged

**Page**
- [ ] Route + metadata
- [ ] Short answer box above the fold
- [ ] Six requirement sections, each cited
- [ ] Common blockers section
- [ ] Cost drivers (links to service page)
- [ ] FAQ via `ServiceFaq`
- [ ] CTAs + tappable phone
- [ ] Sources list, last-reviewed date, disclaimer rendered

**Checker**
- [ ] 5–6 questions
- [ ] Three non-determinative outcomes
- [ ] Result **not** gated behind email
- [ ] No PII stored
- [ ] Keyboard accessible

**SEO**
- [ ] FAQPage + Article + Breadcrumb JSON-LD
- [ ] Sitemap entry
- [ ] Two-way internal links with the service page

**Verify**
- [ ] `npx tsc --noEmit` clean · `npm run build` passes
- [ ] Every number on the page traces to a citation
- [ ] Disclaimer visible without scrolling to the footer
- [ ] Mobile pass
- [ ] `grep -rn "TODO(owner)" app/`

**Open**
- [ ] Does he have a completed, permitted suite to feature? (one real example > the whole guide)
