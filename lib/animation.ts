/**
 * Reusable Animation System
 * -------------------------
 * GPU-friendly (opacity + transform only), respects prefers-reduced-motion,
 * and provides consistent cinematic motion across the site.
 */

import type { Variants } from "framer-motion";

/** Check if user prefers reduced motion (accessibility) */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/** Base transition: smooth, cinematic timing */
export const transition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94] as const, // easeOutQuad
};

/** Faster transition for micro-interactions */
export const transitionFast = {
  duration: 0.3,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

/** Stagger delay for sequential reveals */
export const stagger = {
  staggerChildren: 0.12,
  delayChildren: 0.08,
};

/** Stagger for faster sequences */
export const staggerFast = {
  staggerChildren: 0.06,
  delayChildren: 0.04,
};

// ─── Fade variants ───────────────────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

// ─── Scroll reveal variants (for use with whileInView) ────────────────────────

export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...transition },
  },
};

export const scrollRevealLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...transition },
  },
};

export const scrollRevealRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...transition },
  },
};

export const scrollRevealScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...transition },
  },
};

// ─── Stagger container variants ───────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { ...stagger },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { ...staggerFast },
  },
};

// ─── Hero / entrance variants ────────────────────────────────────────────────

export const heroTitle: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const heroSubtitle: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const heroCta: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Reduced motion overrides ────────────────────────────────────────────────

/** Returns variants with animations disabled when user prefers reduced motion */
export const withReducedMotion = (variants: Variants): Variants => {
  return {
    ...variants,
    visible: {
      ...variants.visible,
      transition: { duration: 0.01 },
    },
  };
};
