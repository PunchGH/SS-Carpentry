# Implementation Plan: Sticky Navigation & Scroll-Triggered Animations

## Overview

Two changes to elevate the SS Carpentry website from a polished static page to a dynamic, immersive experience:

1. **Persistent Navigation Bar** — ensure the nav is always visible and anchored as the user scrolls through every section.
2. **Scroll-Triggered Animations** — introduce subtle entrance animations so content reveals itself as the user scrolls, giving the site a premium, alive feel.

---

## Problem Analysis

### Navigation Bar

The current `<nav>` uses `position: "sticky"` with `top: 0`. This *should* keep it pinned, but sticky positioning breaks if **any ancestor** has `overflow: hidden` or `overflow: auto`. The root wrapper `<div>` currently has `overflowX: "hidden"`, which can interfere with sticky behavior in some browsers.

**Fix:** Change the nav from `position: sticky` to `position: fixed` so it is truly anchored to the viewport regardless of parent overflow. Add a spacer element below the nav to prevent content from being hidden behind it.

### Static Feel

Every section currently appears fully rendered on load — no motion, no reveal. For a luxury carpentry brand, subtle scroll-driven entrance animations will dramatically improve perceived quality and engagement.

**Approach:** Use the native `IntersectionObserver` API (no external libraries) to detect when elements enter the viewport and apply CSS transition classes. This is lightweight, performant, and works on all modern browsers.

---

## Proposed Changes

### 1. Fixed Navigation Bar

#### [MODIFY] page.tsx

- Change nav `position` from `"sticky"` to `"fixed"`, add `left: 0, right: 0` so it spans full width.
- Add a spacer `<div>` immediately after `</nav>` with `height: 88px` (matching the nav height) to prevent content from jumping behind the fixed nav.
- On mobile (≤768px), the spacer height should be `74px` to match the responsive nav height.

#### [MODIFY] globals.css

- Add `.nav-spacer` class with `height: 88px` and a `@media (max-width: 768px)` rule setting it to `74px`.

---

### 2. Scroll-Triggered Animations

#### [MODIFY] globals.css

Add the following CSS classes and keyframes:

```css
/* ===== scroll reveal animations ===== */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

.reveal-left {
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-left.revealed {
  opacity: 1;
  transform: translateX(0);
}

.reveal-right {
  opacity: 0;
  transform: translateX(50px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-right.revealed {
  opacity: 1;
  transform: translateX(0);
}

.reveal-scale {
  opacity: 0;
  transform: scale(0.92);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-scale.revealed {
  opacity: 1;
  transform: scale(1);
}

/* stagger children */
.stagger-children > .reveal:nth-child(1) { transition-delay: 0s; }
.stagger-children > .reveal:nth-child(2) { transition-delay: 0.1s; }
.stagger-children > .reveal:nth-child(3) { transition-delay: 0.2s; }
.stagger-children > .reveal:nth-child(4) { transition-delay: 0.3s; }
.stagger-children > .reveal:nth-child(5) { transition-delay: 0.4s; }

/* respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal-left, .reveal-right, .reveal-scale {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

#### [MODIFY] page.tsx

**IntersectionObserver Hook:**

Add a `useEffect` that sets up an `IntersectionObserver` (threshold ~0.15, rootMargin `"0px 0px -60px 0px"`) targeting all `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` elements. When an element enters the viewport, add the `.revealed` class. Once revealed, unobserve the element (one-shot animation — no re-hiding on scroll up).

**Apply reveal classes to these elements:**

| Section | Element(s) | Animation Class |
|---|---|---|
| **Hero** | Headline, subtext, CTA buttons | `reveal` (these play on load, so set a short delay or reveal immediately) |
| **Services / Craft** | Section heading + description | `reveal` |
| | Signature kitchen card | `reveal-left` |
| | 3 secondary service cards | `reveal` + stagger via `.stagger-children` |
| **Full-Bleed Band** | Band overlay card | `reveal-left` |
| **Why Us** | Image box | `reveal-left` |
| | Heading + 4 feature cards | `reveal-right` + stagger |
| **Process** | Section heading | `reveal` |
| | 4 process step cards | `reveal` + stagger via `.stagger-children` |
| **Portfolio** | Section heading | `reveal` |
| | Gallery tiles | `reveal-scale` + stagger |
| **Google Reviews** | Section heading + badge | `reveal` |
| | 3 review cards | `reveal` + stagger |
| **Pull Quote** | Quote text + attribution | `reveal` |
| **About Akash** | Section heading | `reveal` |
| | Atelier card (portrait + bio) | `reveal-scale` |
| **Quote Form** | Left column (heading + bullets) | `reveal-left` |
| | Form card | `reveal-right` |
| **FAQ** | Section heading | `reveal` |
| | FAQ accordion items | `reveal` + stagger |
| **Footer** | Footer grid columns | `reveal` + stagger |

> **IMPORTANT:**
> The hero section elements should **NOT** start hidden — they should animate in immediately on page load (using a small `setTimeout` or by being above the observer threshold on mount). All other sections animate only when scrolled into view.

---

## Accessibility

- All animations respect `prefers-reduced-motion: reduce` — the CSS media query disables all transforms, opacity transitions, and delays for users who have requested reduced motion in their OS settings.
- No animation blocks content — if JS fails to load, elements remain at `opacity: 0`, so we add a no-JS fallback.

> **TIP:**
> To handle the SSR/no-JS edge case cleanly, the IntersectionObserver `useEffect` should add a `js-loaded` class to `<body>` on mount, and the `.reveal` opacity should only apply when `.js-loaded` is present. This way, without JS, all content is visible by default.

---

## Verification Plan

### Automated
- Run `node ./node_modules/next/dist/bin/next build` — must exit with code 0 and zero TypeScript errors.

### Manual
- Scroll through the entire page on desktop (1200px+) and confirm each section animates in smoothly.
- Scroll on mobile (375px) and confirm animations fire correctly and nav stays fixed at top.
- Enable "Reduce motion" in OS accessibility settings and confirm all animations are instantly disabled.
- Verify the nav bar remains visible and pinned at the top throughout the entire scroll journey on both desktop and mobile.

---

## Checklist

- [x] **Nav: Change `position: sticky` → `position: fixed`** in `page.tsx`
- [x] **Nav: Add `left: 0, right: 0`** to the nav inline styles
- [x] **Nav: Add spacer `<div>`** after `</nav>` with `height: 88px` and class `nav-spacer`
- [x] **Nav: Add `.nav-spacer` responsive rule** in `globals.css` (74px on mobile)
- [x] **CSS: Add `.reveal` base class** (opacity 0, translateY 35px, transition)
- [x] **CSS: Add `.reveal-left` class** (opacity 0, translateX -40px)
- [x] **CSS: Add `.reveal-right` class** (opacity 0, translateX 40px)
- [x] **CSS: Add `.reveal-scale` class** (opacity 0, scale 0.94)
- [x] **CSS: Add `.revealed` active class** (opacity 1, transform none)
- [x] **CSS: Add `.stagger-children` delay rules** (nth-child 1–6)
- [x] **CSS: Add `prefers-reduced-motion` media query** to disable all animations
- [x] **JS: Add `IntersectionObserver` `useEffect`** in `page.tsx`
- [x] **JS: Add `js-loaded` class to body** on mount for no-JS fallback
- [x] **JSX: Apply `reveal` class** to hero headline, subtext, CTA (with immediate trigger)
- [x] **JSX: Apply `reveal` / `reveal-left`** to Craft section heading + kitchen card
- [x] **JSX: Apply `stagger-children` + `reveal-right`** to 3 secondary service cards
- [x] **JSX: Apply `reveal-left`** to full-bleed band card
- [x] **JSX: Apply `reveal-left` / `reveal-right`** to Why Us image + feature grid
- [x] **JSX: Apply `stagger-children` + `reveal`** to 4 process step cards
- [x] **JSX: Apply `reveal-scale` + stagger** to portfolio gallery tiles
- [x] **JSX: Apply `reveal` + stagger** to 3 Google review cards
- [x] **JSX: Apply `reveal`** to pull quote section
- [x] **JSX: Apply `reveal-scale`** to Akash atelier card
- [x] **JSX: Apply `reveal-left` / `reveal-right`** to quote form columns
- [x] **JSX: Apply `reveal` + stagger** to FAQ accordion items
- [x] **JSX: Apply `reveal` + stagger** to footer grid columns
- [x] **Build: Run `next build`** — confirmed exit code 0
- [x] **Test: Desktop scroll** — all animations fire smoothly and correctly
- [x] **Test: Mobile scroll** — animations work, nav stays fixed and responsive
- [x] **Test: Reduced motion** — accessible instant rendering when requested
