"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const SITE_URL = "https://onedonormanylives.com";
const STORY_URL = `${SITE_URL}/one-donors-story`;

const shareSubject = "One Donor's Story — Dr. Thankam Subramonian";
const shareBody = `Thought you might find this story inspiring.

Dr. Thankam Subramonian became Karnataka's first anonymous, non-directed living kidney donor in February 2026. Her 12-year journey—from a talk in 2014 to surgery in 2026—shows how one person can change lives and inspire a movement.

Read her full story: ${STORY_URL}

— One Donor Many Lives`;

export function ShareFloatingCTA() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  const mailtoUrl = `mailto:?subject=${encodeURIComponent(shareSubject)}&body=${encodeURIComponent(shareBody)}`;

  return (
    <motion.a
      href={mailtoUrl}
      style={reduceMotion ? undefined : { opacity }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-stone-200/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md transition-colors hover:bg-amber-50 hover:border-amber-300/60 dark:border-stone-700/50 dark:bg-stone-950/95 dark:hover:bg-amber-950/30 dark:hover:border-amber-700/40"
      aria-label="Share this story via email"
    >
      <svg
        className="h-5 w-5 text-amber-600 dark:text-amber-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
      <span className="font-medium text-stone-800 dark:text-stone-200">Share</span>
    </motion.a>
  );
}
