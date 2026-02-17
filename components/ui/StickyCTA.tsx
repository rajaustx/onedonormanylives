"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import Link from "next/link";

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

  const linkClass =
    "font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded";

  return (
    <motion.div
      style={reduceMotion ? undefined : { opacity, y }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200/80 bg-white/95 backdrop-blur-md dark:border-stone-700/50 dark:bg-stone-950/95 md:left-auto md:right-6 md:bottom-6 md:max-w-max md:rounded-xl md:border md:border-stone-200/80 md:shadow-xl md:shadow-stone-900/20 dark:md:shadow-stone-950/50"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-2 gap-y-1 px-6 py-4 md:flex-nowrap md:gap-2 md:px-5 md:py-3">
        <span className="text-sm font-medium text-stone-700 dark:text-stone-300 sm:text-base md:text-base">
          {text}
        </span>
        <Link href={ctaHref} className={linkClass}>
          {ctaLabel}
        </Link>
      </div>
    </motion.div>
  );
}
