# Implementation Plan — About Us Page (`/about`)

**Goal:** A dedicated About page that carries the friction guide's Stage 4 proof (the highest-weighted stage, 24 pts), built now with placeholders that are **unmistakably** placeholders.

---

## ⚠ Fix first — three existing problems this page inherits

The current `#atelier` section on the home page has issues that must not be carried into `/about`:

1. **`/assets/owner-portrait.jpg` is a stock photo of a person, labelled "The Owner", with no placeholder marking.** It depicts a specific real human who is not the owner, on the content whose entire job is proving the business is real. This is the worst placeholder on the site — a buyer who reverse-image-searches it has found a reason to eliminate him. **Replace with a marked placeholder immediately** (§2), not another stock portrait.
2. **Fabricated first-person quote** (`page.tsx` ~line 738): *"Every cut and joint is a reflection of my personal name on the work."* — in quotation marks, attributed to the owner, said by nobody. Remove or get a real quote.
3. **"Founded 3 months ago"** appears in body copy and as a stat tile. It's hardcoded relative time that silently rots, and it advertises inexperience. Replace with a founding year once known.

---

## 1. The name constraint — worth a decision

The owner doesn't want his name published. That's fine, but note the cost honestly: Stage 4 lists *"named team members with real faces"* as core vetting proof, and for an owner-led business the owner's name and face **is** the strongest trust asset. A nameless About page has to work harder.

**Three options — his call:**
- **A.** First name only ("Run by Akash, owner and lead carpenter") — most trust, least exposure
- **B.** Face, no name ("the owner") — current approach
- **C.** Neither — then compensate with hard verifiables: founding year, business/HST number, WSIB clearance, liability figure, licensed trade partners

Whichever he picks, **C's facts should be on the page regardless.** They're checkable, which is what Stage 4 actually rewards.

## 2. Placeholder images — the mechanism

**New component: `app/components/PlaceholderImage.tsx`**

The rule: a placeholder image must **never render a photograph.** It renders a marked block instead, so it can't be mistaken for real work or a real person.

Spec:
- Dashed red-tinted border + diagonal hatch background (match `DraftBlock`'s palette so it reads as the same system)
- Centred label: `PLACEHOLDER IMAGE`
- Second line: what's needed — e.g. *"Owner portrait — real photo required"*
- Fills the same box as the real `<Image>` would (same aspect ratio) so swapping in the real photo causes no layout shift
- Respects `NEXT_PUBLIC_HIDE_DRAFT_TAGS` **only** by hiding the label — never by substituting a stock photo
- Takes `needs` + `aspect` props

**Policy addition to `placeholders.ts` header:** *No stock photograph may stand in for a real person, a real project, or a real credential. Text may be drafted; people and proof may not.*

## 3. Data — `app/data/about.ts`

Mirror `services.ts`: typed, every unknown carries `draft: true`.

| Field | Status | Blocks |
|---|---|---|
| `foundedYear` | unknown | launch |
| `story` (2–3 paras) | unknown | content |
| `ownerBio` | unknown | content |
| `ownerPortrait` | **stock — must become placeholder** | launch |
| `team[]` (role, photo, bio) | unknown | content |
| `credentials` (business #, HST, WSIB, liability, ESA/ECRA) | unknown | launch |
| `values[]` | draftable | — |
| `serviceArea[]` | known | — |

Add matching `DRAFT_INVENTORY` entries: `founding-year`, `owner-bio`, `owner-portrait`, `team-roster`, `credentials`.

## 4. Page structure — `app/about/page.tsx`

Server component + `export const metadata`.

1. **Hero** — one-line positioning + slogan. Real content, no placeholder needed.
2. **Story** — how and why the business started. `DraftBlock` until supplied.
3. **Owner-led approach** — the differentiator, written name-free (or not, per §1). Portrait via `PlaceholderImage`.
4. **Team** — cards with `PlaceholderImage` + role. If it's a one-person business, say so plainly; "small team, on purpose" is a genuine selling point, not a weakness to paper over.
5. **Credentials & insurance strip** — Stage 4's checkable facts. `DraftBlock` until real. Ontario equivalents, not the guide's UK schemes (no TrustMark/FMB).
6. **How we work** — 3-line summary + link to the process section / service pages.
7. **Reviews** — reuse existing review cards from `data/reviews.ts`.
8. **CTA** → `/contact`, with the tappable phone.

## 5. Wiring

- `SiteNav` — "About us" currently points to `/#atelier`; repoint to `/about`.
- `SiteFooter` — same.
- Home `#atelier` section: keep as a teaser, add "More about us →" to `/about`. Don't duplicate the full story in both places.
- Keep the `/#atelier` anchor alive so existing links don't break.

## 6. SEO

- Metadata + OG for `/about`
- `AboutPage` JSON-LD; add `foundingDate` to the existing `HomeAndConstructionBusiness` block once known
- Sitemap entry

---

## Questions

1. **Founding year?** Needed for both the page and JSON-LD `foundingDate`. Also settles the "3 months" problem.
2. **One-person business, or is there a crew?** Changes the whole team section — and "just me, on every job" is a strong story if told deliberately.
3. **Which name option** — A, B, or C from §1?
4. **Credentials:** business/HST number, WSIB clearance status, liability coverage amount, and whether electrical/plumbing go to licensed trades. These are `blocks-launch` already; the About page is where they belong.
5. **Any real photos of him working?** Even a phone photo of him on site beats a marked placeholder, and beats stock outright.

## Suggestions

- **A "why we started" paragraph in his own words** outperforms polished agency copy on this page. Record him talking for two minutes and transcribe it — that's the whole section.
- **Don't hide being new.** A new business with a 5.0 rating and an owner on every job is a *good* story. "Founded 3 months ago" phrased as a weakness is the problem, not the fact.
- **Photos of work-in-progress** (dust sheets down, tidy site) prove the "tidy site, daily" claim better than the claim does.
- Once real photos land, drop `unoptimized` from these `<Image>` calls.

---

## Checklist

**Fix inherited problems**
- [ ] Stock owner portrait replaced with `PlaceholderImage`
- [ ] Fabricated first-person quote removed
- [ ] "Founded 3 months ago" removed from copy + stat tile

**Placeholder machinery**
- [ ] `PlaceholderImage` component built
- [ ] Never renders a photo, even with tags hidden
- [ ] Same aspect ratio as the real image (no layout shift)
- [ ] No-stock-people policy added to `placeholders.ts` header
- [ ] `DRAFT_INVENTORY` entries added
- [ ] `OWNER_QUESTIONS.md` updated

**Data**
- [ ] `app/data/about.ts` created, typed, draft flags set

**Page**
- [ ] `app/about/page.tsx` + metadata
- [ ] Hero
- [ ] Story (DraftBlock)
- [ ] Owner-led section, name handling per §1
- [ ] Team section
- [ ] Credentials strip (DraftBlock)
- [ ] How we work + links
- [ ] Reviews reused from `data/reviews.ts`
- [ ] CTA → `/contact` + tappable phone

**Wiring**
- [ ] Nav "About us" → `/about`
- [ ] Footer link
- [ ] Home teaser + "More about us"
- [ ] `/#atelier` anchor still works

**SEO**
- [ ] Metadata + OG
- [ ] `AboutPage` JSON-LD, `foundingDate` when known
- [ ] Sitemap entry

**Verify**
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` passes
- [ ] Every placeholder image visibly reads as a placeholder
- [ ] No stock human presented as a real person, anywhere on the site
- [ ] Mobile pass
- [ ] `grep -rn "TODO(owner)" app/` — launch gate
