"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect if user prefers reduced motion.
 * Returns true when animations should be minimized or disabled.
 */
export function useReducedMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return reduceMotion;
}
