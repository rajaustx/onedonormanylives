"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { AnimatedButton } from "./AnimatedButton";

interface StickyCTAProps {
  text: string;
  ctaLabel: string;
  ctaHref: string;
}

export function StickyCTA({ text, ctaLabel, ctaHref }: StickyCTAProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const y = useTransform(scrollYProgress, [0.15, 0.25], [20, 0]);

  return (
    <motion.div
      style={reduceMotion ? undefined : { opacity, y }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200/80 bg-white/95 backdrop-blur-md dark:border-stone-700/50 dark:bg-stone-950/95"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <p className="text-sm font-medium text-stone-700 dark:text-stone-300 sm:text-base">
          {text}
        </p>
        <AnimatedButton
          href={ctaHref}
          variant="primary"
          className="whitespace-nowrap px-3 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm bg-amber-700 hover:bg-amber-800 sm:bg-amber-600 sm:hover:bg-amber-700"
        >
          {ctaLabel}
        </AnimatedButton>
      </div>
    </motion.div>
  );
}
