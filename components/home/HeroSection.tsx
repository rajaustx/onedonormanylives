"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { heroTitle, heroSubtitle, heroCta } from "@/lib/animation";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const titleVariants = reduceMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : heroTitle;
  const subtitleVariants = reduceMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : heroSubtitle;
  const ctaVariants = reduceMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : heroCta;

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-32">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/50 via-white to-white dark:from-amber-950/10 dark:via-stone-950 dark:to-stone-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(251,191,36,0.08),transparent)]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-4xl font-light tracking-tight text-stone-900 dark:text-stone-50 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="block">What Can One Donor Do?</span>
          <span className="mt-2 block font-medium text-amber-700 dark:text-amber-400">
            Change Many Lives.
          </span>
        </motion.h1>

        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-400 sm:text-xl"
        >
          Anonymous non-directed kidney donation is when someone gives a kidney to a stranger—
          no strings attached, no expectation of thanks. It&apos;s an act of profound generosity
          that starts a chain of hope.
        </motion.p>

        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <AnimatedButton href="/gallery" variant="primary">
            View Gallery
          </AnimatedButton>
          <AnimatedButton href="/blog" variant="secondary">
            Learn More
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}
