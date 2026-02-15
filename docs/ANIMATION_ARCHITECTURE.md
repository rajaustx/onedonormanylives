# Animation System & Component Architecture

## Overview

A reusable, accessible animation system built on Framer Motion. All animations use **opacity + transform only** (GPU-friendly), respect `prefers-reduced-motion`, and follow a consistent cinematic timing curve.

---

## File Structure

```
lib/
  animation.ts       # Variants, transitions, stagger configs
  useReducedMotion.ts # Accessibility hook

components/
  ui/                 # Reusable animated primitives
    ScrollReveal.tsx
    AnimatedText.tsx
    AnimatedButton.tsx
    StickyCTA.tsx
  home/               # Page-specific components
    Header.tsx
    HeroSection.tsx
    StatsSection.tsx
    MythBustingSection.tsx
    Footer.tsx
```

---

## Animation Variants (`lib/animation.ts`)

| Variant | Use Case |
|---------|----------|
| `fadeIn`, `fadeInUp`, `fadeInDown` | Basic entrance animations |
| `scrollReveal`, `scrollRevealLeft`, `scrollRevealRight`, `scrollRevealScale` | Scroll-triggered reveals |
| `heroTitle`, `heroSubtitle`, `heroCta` | Hero section staggered entrance |
| `staggerContainer`, `staggerContainerFast` | Parent for staggered children |

**Transitions:**
- `transition` — 0.6s easeOutQuad (default for reveals)
- `transitionFast` — 0.3s (micro-interactions)
- `stagger` / `staggerFast` — Child stagger timing

---

## Components

### `ScrollReveal`
Wraps content and animates in when it enters the viewport.

```tsx
<ScrollReveal variants={scrollReveal} once amount={0.2}>
  <h2>Content</h2>
</ScrollReveal>
```

Props: `variants`, `once`, `amount`, `as`, `className`

### `AnimatedText`
Staggered word-by-word or simple fade-in text animation.

```tsx
<AnimatedText text="Hello world" splitBy="words" as="h1" />
```

### `AnimatedButton`
Buttons with hover/tap scale micro-interactions. Variants: `primary`, `secondary`, `ghost`.

### `StickyCTA`
Fixed bottom bar that fades in based on scroll progress. Uses `useScroll` + `useTransform` for scroll-linked opacity.

---

## Accessibility

- **`useReducedMotion()`** — Hook that returns `true` when user prefers reduced motion
- **Media query** — `@media (prefers-reduced-motion: reduce)` in `globals.css` disables CSS animations
- **Component behavior** — All animated components check `useReducedMotion()` and skip or simplify animations when true

---

## Usage Guidelines

1. **Prefer variants over inline** — Use `lib/animation.ts` variants for consistency
2. **GPU-friendly** — Stick to `opacity` and `transform` (x, y, scale)
3. **Viewport** — Use `whileInView` with `once: true` for scroll reveals to avoid re-animating
4. **Stagger** — Use `staggerContainer` + child variants for list reveals
5. **Sticky CTA** — Add `padding-bottom` to `main` so content isn’t hidden behind it

---

## Performance

- Lazy-load Framer Motion: components are client-only (`"use client"`)
- Static generation: pages are pre-rendered at build time
- No layout thrashing: animations use `transform` and `opacity` only
