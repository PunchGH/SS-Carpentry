# Implementation Plan — Contact / CTA Page (`/contact`)

**Goal:** A dedicated contact page carrying every way to reach the business, with a form that actually delivers.

---

## ⚠ Blocker — the form currently discards every lead

`app/page.tsx:293`:

```ts
const submit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
```

It shows "Thank you" and sends nothing. `lead-destination` is already flagged **blocks-launch** in `placeholders.ts`.

This matters more than any layout work here. Stage 6 of the friction guide is the site's strongest angle — homeowners contact five builders and hear back from none. A contact page that fakes success makes the business *the thing the guide warns about*, while the buyer sits waiting for a call that was never triggered. **Do not ship `/contact` until delivery works.**

**Needed from owner:** the destination inbox (see §2).

---

## 1. Route + structure

`app/contact/page.tsx` — server component with `export const metadata`. Form is the only client island.

Section order (mobile-first — the guide says audit on phone):
1. **H1 + response promise** — "We reply within one working day." Above the fold.

2. **Direct contact row** — both phones (tappable), email, hours. Fastest paths first, before the form.
3. **Form** (§3)
4. **What happens next** — the 4 steps: reply → site visit → itemised quote → decide. No obligation.
5. **Service area** — neighbourhoods served (Stage 2) + map link (`COMPANY.googleMapsUrl`).
6. **Trust strip** — 5.0★ / 3 Google reviews, insurance line, business details.

Pull all facts from `app/data/company.ts`. Never hardcode a phone or email.

## 2. Making the form deliver (do this first)

**Recommended:** Next.js **Server Action** + [Resend](https://resend.com) — API key stays server-side, no client secret, no third-party form host.

Zero-backend alternative if the owner prefers: Web3Forms or Formspree (paste an endpoint, done).

Requirements either way:
- Env var `RESEND_API_KEY` + `LEAD_TO_EMAIL` in `.env.local`, `.env.example` committed, **real key never committed**
- Email subject: `New quote request — {name}, {service}`
- Body includes every field + timestamp + source page
- **Auto-reply to the customer** restating the one-working-day promise (Stage 6 — costs one sentence, differentiates against documented industry silence)
- Honeypot field + basic rate limit; add Cloudflare Turnstile only if spam appears
- On failure: **show the phone number and email as fallback.** Never a dead end.

> Note: this step touches secrets and server code. Worth a careful review pass rather than a fast generation pass.

## 3. Form spec (friction guide Stage 5)

**Five fields maximum.** Currently four — keep it that way.

| Field | Required | Notes |
|---|---|---|
| Name | ✓ | |
| Email | ✓ | validated |
| Phone | — | optional; many prefer a call back |
| Service | ✓ | the 4 service lines from `services.ts` + "Not sure yet" |
| Detail | — | textarea |

- **Do not ask for budget.** The guide flags demanding budget before trust exists as friction, and Stage 3 is ⚠️ disputed.
- Inline validation, `aria-invalid`, errors announced, labels tied to inputs
- Submit disabled + "Sending…" while in flight; never double-submit
- Success state: confirmation + what happens next + when + the phone number
- Preserve entered values if submission fails

## 4. Reuse — extract the form

The same form lives on the home page (`#quote`) and `/contact`. Extract to `app/components/QuoteForm.tsx`, take a `source` prop (`"home" | "contact"`) so the lead email says where it came from.

**Keep the home-page form.** Replacing a working inline conversion point with a link to another page costs conversions.

## 5. Wiring it up

- `SiteNav` — the "Request a quote" CTA currently points to `/#quote`. Point it at `/contact`; keep the tappable phone beside it (Stage 5: phone in the header on every page).
- `SiteFooter` — add a Contact link.
- Service pages + gallery project pages — CTAs to `/contact`.
- Keep `/#quote` working; do not break existing anchors.

## 6. SEO

- Metadata + OG for `/contact`
- `ContactPage` JSON-LD with both `telephone` entries and `email`
- Add `/contact` to sitemap
- `format-detection: telephone=yes` is already set in `layout.tsx`

---

## Questions

1. **Where do leads go?** Which inbox — `ssrenovations.ottawa@gmail.com`, or somewhere monitored faster? Blocks launch.
2. **WhatsApp or SMS?** The guide calls WhatsApp the UK trade default; in Ontario plain **SMS** is more common. An `sms:` link on the primary number is one line — which does he actually use?
3. **Business hours?** `layout.tsx` JSON-LD claims Mon–Sat 08:00–18:00, unverified. A contact page displays hours, so this needs confirming.
4. **Response promise wording** — "within one working day" is on the site already. Is that a commitment he'll hold? It's the strongest line on the page, and the only one a buyer can catch him failing.

## Suggestions

- **Photo upload** — letting someone attach 2–3 photos of the space produces far better first quotes for a contractor. Adds storage + validation; propose as phase 2.
- **Preferred callback window** — a "morning / afternoon / evening" radio beats a full booking calendar for a business this size.
- **Track submissions.** Without conversion tracking there's no way to tell a broken form from a quiet week — which is exactly how the current silent failure survived.

---

## Checklist

**Blocker**
- [ ] Lead destination confirmed by owner
- [ ] Delivery implemented and **test lead received in the real inbox**
- [ ] `lead-destination` cleared from `placeholders.ts`

**Delivery**
- [ ] Server action (or form host) wired
- [ ] `.env.example` committed; real key uncommitted
- [ ] Auto-reply to customer
- [ ] Honeypot + rate limit
- [ ] Failure path shows phone + email fallback
- [ ] Values preserved on failure

**Page**
- [ ] `app/contact/page.tsx` + metadata
- [ ] H1 + response promise above the fold
- [ ] Both phones tappable, email, hours
- [ ] What-happens-next steps
- [ ] Service area + map link
- [ ] Trust strip
- [ ] All facts from `company.ts`

**Form**
- [ ] Extracted to `components/QuoteForm.tsx` with `source` prop
- [ ] Home `#quote` still works
- [ ] ≤5 fields, no budget field
- [ ] Inline validation + a11y attributes
- [ ] In-flight state, no double-submit
- [ ] Success state states what happens next + when

**Wiring**
- [ ] Nav CTA → `/contact`, phone still in header
- [ ] Footer contact link
- [ ] Service + gallery CTAs → `/contact`
- [ ] `/#quote` anchors unbroken

**SEO**
- [ ] Metadata + OG
- [ ] `ContactPage` JSON-LD (both phones)
- [ ] Sitemap entry

**Verify**
- [ ] `npx tsc --noEmit` clean
- [ ] `npm run build` passes
- [ ] Real submission arrives in the inbox
- [ ] Failure path tested (kill the key, confirm fallback shows)
- [ ] Mobile pass: tap both phones, submit the form
- [ ] Keyboard-only pass
