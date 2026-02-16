"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { heroTitle, heroSubtitle } from "@/lib/animation";

export function StoryHero() {
  const reduceMotion = useReducedMotion();

  const titleVariants = reduceMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : heroTitle;
  const subtitleVariants = reduceMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : heroSubtitle;

  return (
    <section className="relative flex min-h-[90vh] items-end overflow-hidden">
      {/* Full-bleed portrait */}
      <div className="absolute inset-0">
        <img
          src="/story/meena-cheering-hospital.jpg"
          alt=""
          className="h-full w-full object-cover object-[40%_center]"
        />
        {/* Gradient overlay for text legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent"
          aria-hidden
        />
      </div>

      {/* Headline overlay */}
      <div className="relative z-10 w-full px-6 pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-4xl">
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="font-serif text-4xl font-light tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            One donor&apos;s story
          </motion.h1>
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 max-w-2xl text-xl text-stone-200 sm:text-2xl"
          >
            How one decision traveled 12 years and changed countless lives.
          </motion.p>
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 text-sm font-medium text-stone-300"
          >
            Dr. Thankam Subramonian
            <br />
            First anonymous kidney donor in Karnataka
          </motion.p>
        </div>
      </div>
    </section>
  );
}
