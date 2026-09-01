# Questions for the Owner

Everything the site currently invents, guesses, or leaves blank. Each item says **why it's needed** and **where it appears**, so you can work through it on one call.

Until an answer arrives, the site runs a marked placeholder (`TODO(owner):` in the code). **The site cannot launch with placeholders still in it** — invented prices, warranty terms and insurance figures are claims a real business gets held to.

**Priority key:** 🔴 blocks launch · 🟠 blocks real content · 🟡 improves conversion

---

## 1. Lead capture 🔴 — most urgent

> **The quote form currently goes nowhere.** It shows "Thank you" and discards the submission. Any enquiry sent today is lost silently.

- [ ] Where should form submissions go — an email inbox, a phone notification, a CRM?
- [ ] Is `ssrenovations.ottawa@gmail.com` the right destination, or a different address?
- [ ] Who checks it, and how quickly?
- [ ] Should enquiries also fire a text/WhatsApp alert?

## 2. Legal & insurance 🔴

Needed before we can put a single trust claim on the page. The friction guide rates vetting as the highest-value stage — these are exactly the proofs buyers look for and most contractor sites omit.

- [ ] Registered legal business name (vs. operating name)
- [ ] Business number / HST number
- [ ] WSIB clearance — active? Clearance number?
- [ ] Liability insurance — provider and coverage amount (e.g. "$2M liability")
- [ ] Any memberships or certifications: RenoMark, BBB, Tarion, trade tickets
- [ ] The site currently claims "fully insured" in the FAQ — **is that accurate right now?**

## 3. Pricing 🟠

We're building price bands with placeholder numbers. They need real ones before launch.

- [ ] Typical price range, per service: Kitchens & Bathrooms · TV Walls & Lighting Panels · Flooring & Tiling · Legal Basements
- [ ] Minimum project size worth quoting
- [ ] What pushes a job's cost up or down (this becomes the "what drives cost" explainer)
- [ ] Is the free estimate genuinely free and unconditional? Any travel radius limit?
- [ ] Deposit percentage and payment schedule
- [ ] Any financing or payment plans offered?
- [ ] **Or:** does he prefer no prices published at all? (Legitimate choice — some contractors hide prices deliberately to filter out unrealistic budgets. His call.)

## 4. Photos & real projects 🟠 — the critical path

Three of the four services have no matching photography. This blocks more than anything else on the list.

- [ ] Photos for: bathrooms · TV walls / lighting panels · flooring & tiling · finished basements
- [ ] Before/after pairs — far more persuasive than finished shots alone
- [ ] For each real project: neighbourhood, property type, scope, how long it took, roughly when
- [ ] Is he OK naming neighbourhoods publicly? (Not street addresses — just "Barrhaven", "Kanata")
- [ ] Are the current portfolio photos his own work? Any stock images to remove?
- [ ] Permission from clients to publish their project photos
- [ ] Is the owner's portrait approved for use? (Name stays off — role label only)

## 5. Process & guarantees 🟠

- [ ] Confirm the 4 published steps are how he actually works: visit → drawings & quote → build/fit → walkthrough
- [ ] Is "we reply within one working day" accurate? **Worth protecting** — homeowners routinely report contacting five contractors and hearing back from none. It's the strongest differentiator on the site and it costs one sentence.
- [ ] Warranty: how long, and what does it cover?
- [ ] What happens if something goes wrong after handover?
- [ ] Does he use a written contract? Which kind?
- [ ] **Subcontracting — accuracy check.** The site says "no subcontracting". Legal basements and renovations need licensed electrical (ESA/ECRA) and plumbing work. Is that in-house, or are licensed trades brought in? The claim needs to match reality.
- [ ] Realistic project timelines and on-site build duration per service (typical bathroom vs full kitchen, TV wall 2–4 days, flooring/tiling, basement permits & construction)
- [ ] Standard guidance for clients living on-site during active kitchen or bathroom renovations

## 6. Service specifics 🟠

For the four new service pages:

- [ ] **Legal basements:** does he handle permits, or does the homeowner? Who carries permit application costs and submits drawings to the City of Ottawa? Who handles the preliminary zoning check? Egress windows, ceiling height, fire separation — what's included?
- [ ] **Kitchens & bathrooms:** cabinetry built in-house or supplied? Who handles plumbing rough-ins/fixtures? Who handles electrical (ESA/ECRA licensed electrician)? Are plumbing fixtures, tiles, and vanities supplied by homeowner or contractor?
- [ ] **TV walls & lighting panels:** who does high-voltage electrical outlets? Are TV wall mounts and smart LED controllers supplied by homeowner or contractor? Which standard lighting controllers/dimmers are offered?
- [ ] **Flooring & tiling:** does he supply materials, or fit client-supplied? What is the policy on disposal fees and appliance disconnection/reconnection? Recommended adhesive and grout curing times?
- [ ] Anything he does **not** do, so we don't attract the wrong enquiries

## 7. Business details 🟡

- [ ] Confirm real business hours (site currently claims Mon–Sat, 8am–6pm)
- [ ] Founding year — the site says "founded 3 months ago", which reads as inexperience. How long has he actually been doing this work, including before the company existed?
- [ ] Service area — which neighbourhoods, and how far will he travel?
- [ ] Which of the two numbers is primary? Who answers each?
- [ ] WhatsApp — available? Same number?
- [ ] Keep the domain `sscarpentryandrenovations.com`? (Email is now Gmail — a matching domain email would look more established)
- [ ] Team size, and what roles to show without names

## 8. Marketing 🟡

- [ ] Instagram / Facebook to link?
- [ ] Google Business Profile access — needed to pull reviews automatically as new ones arrive
- [ ] Dates (approximate month/year) for the 3 Google reviews — needed to display dated reviews (friction guide Stage 4)
- [ ] Logo source file (SVG or transparent PNG) — the current one has a baked-in black background, which shows as a black square on light backgrounds
- [ ] Google Analytics wanted?

---

## Answer tracker

| # | Topic | Priority | Status |
|---|---|---|---|
| 1 | Lead capture destination | 🔴 | ☐ |
| 2 | Legal & insurance | 🔴 | ☐ |
| 3 | Pricing | 🟠 | ☐ |
| 4 | Photos & real projects | 🟠 | ☐ |
| 5 | Process & guarantees | 🟠 | ☐ |
| 6 | Service specifics | 🟠 | ☐ |
| 7 | Business details | 🟡 | ☐ |
| 8 | Marketing | 🟡 | ☐ |

**Launch gate:** all 🔴 and 🟠 answered, and `grep -rn "TODO(owner)" app/` returns nothing.
