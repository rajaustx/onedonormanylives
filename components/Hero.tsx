"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { useContactModal } from "@/components/contact/ContactModalContext";
import { PLEDGE_CTA, SHARE_STORY_CTA } from "@/lib/cta";

const textVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const imageVariants = {
  hidden: { opacity: 1, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { openContactModal } = useContactModal();

  const textMotion = reduceMotion
    ? { initial: false, animate: { opacity: 1, x: 0 } }
    : { initial: "hidden", animate: "visible", variants: textVariants };

  const imageMotion = reduceMotion
    ? { initial: false, animate: { opacity: 1, x: 0 } }
    : { initial: "hidden", animate: "visible", variants: imageVariants };

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden bg-gradient-to-br from-stone-100 via-amber-50/50 to-stone-200/80 dark:from-stone-900 dark:via-amber-950/20 dark:to-stone-800">
      <div className="mx-auto flex min-h-0 flex-1 flex-col overflow-hidden px-6">
        <div className="flex min-h-0 flex-1 flex-col items-center gap-4 pt-2 pb-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:pt-2 lg:pb-8">
          {/* Left: Text content */}
          <div className="flex flex-1 flex-col items-center text-center lg:max-w-[55%] lg:items-start lg:text-left">
            <motion.div
              {...textMotion}
              className="flex flex-col gap-3"
            >
              <h1 className="font-serif text-3xl font-light tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl md:text-5xl">
                <span className="block">What Can One Donor Do?</span>
                <span className="mt-2 block font-medium text-amber-700 dark:text-amber-400">
                  Change Many Lives.
                </span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
                A single anonymous kidney donation sparked a chain of hope.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
                Now we&apos;re inviting the world to continue it.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
                This movement begins now.
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:text-base">
                Most organ donations happen after death. Dr. Thankam chose to donate while living — an extraordinary act that&apos;s inspiring thousands more people to pledge after life.
              </p>
              <div className="hidden flex-col items-center gap-4 lg:flex">
                <div className="flex flex-col items-center gap-1">
                  <AnimatedButton onClick={openContactModal} variant="primary">
                    {SHARE_STORY_CTA.label}
                  </AnimatedButton>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    Share your story or message of gratitude
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-500">
                    Part of a growing nationwide donor movement
                  </p>
                </div>
                <AnimatedButton href={PLEDGE_CTA.href} variant="ghost">
                  {PLEDGE_CTA.label}
                </AnimatedButton>
              </div>
            </motion.div>
          </div>

          {/* Right: Image - 340x408 actual dimensions */}
          <motion.div
            {...imageMotion}
            className="relative flex min-h-0 w-full shrink flex-col items-center justify-start lg:w-[40%] lg:max-w-none"
          >
            <div className="relative aspect-[5/6] w-full max-w-[320px] overflow-hidden rounded-full sm:max-w-[380px] lg:max-w-[360px] [box-shadow:0_0_40px_rgba(0,0,0,0.08),0_0_80px_rgba(180,83,9,0.15),0_8px_32px_rgba(0,0,0,0.12)] dark:[box-shadow:0_0_50px_rgba(0,0,0,0.2),0_0_100px_rgba(180,83,9,0.12),0_8px_40px_rgba(0,0,0,0.3)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/meena-hero-highres.webp"
                alt="Dr. Thankam Subramonian, first anonymous kidney donor in Karnataka"
                width={340}
                height={408}
                className="h-full w-full object-cover object-center"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="mt-3 w-full max-w-[320px] text-center sm:max-w-[380px] lg:max-w-[360px]">
              <p className="font-serif text-lg font-medium text-stone-800 dark:text-stone-200">
                Dr. Thankam Subramonian
              </p>
              <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                First anonymous kidney donor in Karnataka
              </p>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-500">
                Her living donation sparked a movement that continues to grow.
              </p>
            </div>
          </motion.div>

          {/* CTA below hero image on mobile only */}
          <div className="flex flex-col items-center gap-4 lg:hidden">
            <div className="flex flex-col items-center gap-1">
              <AnimatedButton onClick={openContactModal} variant="primary">
                {SHARE_STORY_CTA.label}
              </AnimatedButton>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Share your story or message of gratitude
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-500">
                Part of a growing nationwide donor movement
              </p>
            </div>
            <AnimatedButton href={PLEDGE_CTA.href} variant="ghost">
              {PLEDGE_CTA.label}
            </AnimatedButton>
          </div>
        </div>

        {/* Scroll indicator - hidden on mobile */}
        <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 md:flex">
          <motion.div
            animate={reduceMotion ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <svg
              className="h-8 w-6 text-stone-500 dark:text-stone-400"
              viewBox="0 0 24 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {/* Mouse body */}
              <rect x="4" y="2" width="16" height="28" rx="8" />
              {/* Scroll wheel */}
              <line x1="12" y1="10" x2="12" y2="14" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
