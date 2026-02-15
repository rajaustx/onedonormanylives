"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { scrollReveal, scrollRevealLeft, scrollRevealRight } from "@/lib/animation";

const storySections = [
  {
    id: "hero",
    layout: "hero" as const,
    image: "/story/meena-organ-donor.png",
    alt: "Meena as organ donor",
    caption: "One gift. One journey. Many lives touched.",
    text: "This is a story about a gift. Not the kind you wrap. The kind that changes everything.",
  },
  // Moment of joy in recovery — top
  {
    id: "cheering",
    layout: "image-left" as const,
    image: "/story/meena-cheering-hospital.jpg",
    alt: "Celebrating recovery in the hospital",
    caption: "A moment of joy in recovery.",
    text: "Recovery has its own milestones. A smile. A celebration. The small victories that add up to going home.",
  },
  {
    id: "homecoming",
    layout: "featured" as const,
    image: "/story/homecoming-post-donor-surgery.jpg",
    alt: "Homecoming after donor surgery",
    caption: "Back home. A new chapter begins.",
    text: "Recovery. Return. The ordinary becomes extraordinary when you've given the extraordinary.",
  },
  {
    id: "honor-walk",
    layout: "image-right" as const,
    image: "/story/meena-honor-walk.jpg",
    alt: "The honor walk—hospital staff lining the corridor",
    caption: "The honor walk. A corridor of gratitude.",
    text: "Hospital staff line the hallway in loud cheer as Dr. Thankam is discharged from the hospital post the donation surgery. A tradition of respect.",
  },
  // Surgery day / surgery prep
  {
    id: "moment",
    layout: "centered" as const,
    image: "/story/meena_wheelchair1_presurgery.jpeg",
    image2: "/story/meena_wheelchair2_presurgery.jpeg",
    alt: "A quiet moment before surgery",
    alt2: "Another angle of the same moment",
    caption: "One breath before the next chapter.",
    text: "There's a stillness before everything changes. A pause. A trust that the unknown will become the beginning of something new.",
  },
  {
    id: "together",
    layout: "image-left" as const,
    image: "/story/meena_raj_presurgery.jpeg",
    alt: "Meena with her brother Raj before surgery",
    caption: "Side by side with her brother, Raj.",
    text: "Some journeys you don't walk alone. This one was shared—step by step, moment by moment—until the gift became real.",
  },
  {
    id: "care",
    layout: "image-right" as const,
    image: "/story/meena_and_careteam_presurgery.jpeg",
    alt: "Dr. Thankam in the center, flanked by friends and family before surgery",
    caption: "The donor, surrounded by loved ones.",
    text: "Dr. Thankam in the center, getting ready to donate—flanked by friends and family from near and far. The kind of support that makes the extraordinary possible.",
  },
  {
    id: "friends",
    layout: "image-left" as const,
    image: "/story/meena_and_friends_presurgery.jpeg",
    alt: "Meena with friends before surgery",
    caption: "Friends who showed up.",
    text: "Some bonds are forged in ordinary days. Others reveal themselves when the ground shifts. These faces carried hope into the room.",
    fullImage: true,
  },
  {
    id: "family",
    layout: "image-right" as const,
    image: "/story/meena_family_presurgery.jpeg",
    alt: "Meena surrounded by family before surgery",
    caption: "Family by your side when it matters most.",
    text: "Before the day that would change everything, there were quiet moments. Loved ones holding space. The kind of support that needs no words.",
  },
  // Prior to surgery day
  {
    id: "linked",
    layout: "image-left" as const,
    image: "/story/meena_and_rs.png",
    alt: "Meena and her husband RS",
    caption: "Donor and her husband, side by side.",
    text: "Some journeys you don't walk alone. Meena and RS—partners in life and in this act of generosity. Together through every step.",
  },
  {
    id: "law-firm",
    layout: "image-right" as const,
    image: "/story/meena-law-firm.jpg",
    alt: "Dr. Thankam with Dr. S.V. Joga Rao at LegalExcel Attorneys",
    caption: "LegalExcel Attorneys—Dr. S.V. Joga Rao helped secure the High Court ruling that enabled the donation.",
    text: "The donation would not have been possible without navigating the legal system. LegalExcel Attorneys, led by Dr. S.V. Joga Rao, helped Dr. Thankam secure the High Court ruling that enabled her to donate her kidney. A partnership that turned intent into action.",
    fullImage: true,
  },
  // Certificate just above mural
  {
    id: "certificate",
    layout: "closing" as const,
    image: "/story/certificate.jpg",
    alt: "Certificate honoring the gift of life",
    caption: "A gift that can never be repaid, only paid forward.",
    text: "Anonymous donation isn't about recognition. But every act of profound generosity deserves to be witnessed. This is one of many.",
  },
  // Mural last
  {
    id: "mural",
    layout: "image-left" as const,
    image: "/story/mural-created-by-colleague.jpg",
    alt: "Mural created by a colleague in tribute",
    caption: "A colleague's tribute.",
    text: "Sometimes gratitude takes shape in unexpected ways. A mural. A gesture. A way of saying that one person's courage touched many.",
    fullImage: true,
  },
];

export function StoryPageClient() {
  const reduceMotion = useReducedMotion();

  const fadeUp = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : scrollReveal;

  const slideLeft = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : scrollRevealLeft;

  const slideRight = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : scrollRevealRight;

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero: headline left, full picture right */}
      <section className="relative overflow-hidden bg-stone-50 dark:bg-stone-950">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center gap-8 px-6 py-16 md:min-h-[70vh] md:flex-row md:items-center md:justify-between md:gap-12 md:py-24">
          <ScrollReveal variants={fadeUp} className="flex-1 md:max-w-[45%]">
            <h1 className="font-serif text-4xl font-light tracking-tight text-stone-900 dark:text-stone-100 sm:text-5xl md:text-6xl">
              Gallery
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-600 dark:text-stone-400 md:text-xl">
              One gift. One journey. Many lives touched.
            </p>
          </ScrollReveal>
          <ScrollReveal variants={slideRight} className="flex flex-1 items-center justify-center md:max-w-[55%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/story/meena-organ-donor.png"
              alt="Meena – organ donor"
              className="h-auto w-full max-w-md object-contain object-center"
              loading="eager"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Narrative sections */}
      <div className="space-y-24 pb-24 md:space-y-32">
        {storySections
          .filter((s) => s.id !== "hero")
          .map((section) => {
            if (section.layout === "featured") {
              return (
                <section key={section.id} className="relative px-6">
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.25, 0.46, 0.45, 0.94] as const,
                    }}
                    className="mx-auto max-w-5xl"
                  >
                    <div className="overflow-hidden rounded-2xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.35)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={section.image}
                        alt={section.alt}
                        className="aspect-[16/10] w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-8 max-w-2xl">
                      <p className="text-lg leading-relaxed text-stone-700 dark:text-stone-300">
                        {section.text}
                      </p>
                      <p className="mt-4 text-sm italic text-stone-500 dark:text-stone-400">
                        {section.caption}
                      </p>
                    </div>
                  </motion.div>
                </section>
              );
            }

            if (section.layout === "centered") {
              const sec = section as typeof section & {
                image2?: string;
                alt2?: string;
              };
              const hasSecondImage = sec.image2;
              return (
                <section key={section.id} className="px-6">
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.25, 0.46, 0.45, 0.94] as const,
                    }}
                    className="mx-auto max-w-4xl"
                  >
                    <div
                      className={`grid gap-4 ${hasSecondImage ? "grid-cols-1 md:grid-cols-2" : ""}`}
                    >
                      <div className="overflow-hidden rounded-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={section.image}
                          alt={section.alt}
                          className="aspect-[4/3] w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      {hasSecondImage && (
                        <motion.div
                          initial={
                            reduceMotion ? false : { opacity: 0, y: 24 }
                          }
                          whileInView={
                            reduceMotion ? undefined : { opacity: 1, y: 0 }
                          }
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.7,
                            delay: 0.15,
                            ease: [0.25, 0.46, 0.45, 0.94] as const,
                          }}
                          className="overflow-hidden rounded-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)]"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={sec.image2}
                            alt={sec.alt2 || section.alt}
                            className="aspect-[4/3] w-full object-cover"
                            loading="lazy"
                          />
                        </motion.div>
                      )}
                    </div>
                    <p className="mt-8 text-center text-lg leading-relaxed text-stone-700 dark:text-stone-300">
                      {section.text}
                    </p>
                    <p className="mt-3 text-center text-sm italic text-stone-500 dark:text-stone-400">
                      {section.caption}
                    </p>
                  </motion.div>
                </section>
              );
            }

            if (section.layout === "closing") {
              return (
                <section key={section.id} className="px-6">
                  <motion.div
                    initial={
                      reduceMotion ? false : { opacity: 0, scale: 0.98 }
                    }
                    whileInView={
                      reduceMotion ? undefined : { opacity: 1, scale: 1 }
                    }
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="mx-auto max-w-2xl"
                  >
                    <div className="overflow-hidden rounded-2xl border border-stone-200/60 bg-white p-8 shadow-lg dark:border-stone-700/40 dark:bg-stone-900/50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={section.image}
                        alt={section.alt}
                        className="w-full rounded-lg object-cover"
                        loading="lazy"
                      />
                      <p className="mt-6 text-center text-base leading-relaxed text-stone-700 dark:text-stone-300">
                        {section.text}
                      </p>
                      <p className="mt-3 text-center text-sm italic text-stone-500 dark:text-stone-400">
                        {section.caption}
                      </p>
                    </div>
                  </motion.div>
                </section>
              );
            }

            const isImageLeft = section.layout === "image-left";
            const ImageVariant = isImageLeft ? slideLeft : slideRight;
            const TextVariant = isImageLeft ? slideRight : slideLeft;
            const sec = section as typeof section & { fullImage?: boolean };
            const showFullImage = sec.fullImage;

            return (
              <section
                key={section.id}
                className="mx-auto max-w-6xl px-6"
              >
                <div
                  className={`flex flex-col gap-12 md:flex-row md:items-center md:gap-16 ${
                    isImageLeft ? "" : "md:flex-row-reverse"
                  }`}
                >
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={ImageVariant}
                    className={`flex-1 ${isImageLeft ? "md:pr-4" : "md:pl-4"} ${showFullImage ? "md:min-w-[55%]" : ""}`}
                  >
                    <div
                      className={`overflow-hidden rounded-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)] ${showFullImage ? "flex min-h-[320px] items-center justify-center bg-stone-100 dark:bg-stone-900/50 md:min-h-[400px]" : ""}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={section.image}
                        alt={section.alt}
                        className={
                          showFullImage
                            ? "h-auto w-full object-contain"
                            : "aspect-[4/3] w-full object-cover"
                        }
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-4 text-sm italic text-stone-500 dark:text-stone-400">
                      {section.caption}
                    </p>
                  </motion.div>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={TextVariant}
                    className="flex-1"
                  >
                    <p className="text-lg leading-relaxed text-stone-700 dark:text-stone-300 md:text-xl">
                      {section.text}
                    </p>
                  </motion.div>
                </div>
              </section>
            );
          })}
      </div>

      {/* Closing CTA */}
      <ScrollReveal
        variants={fadeUp}
        className="border-t border-stone-200/60 bg-stone-50/50 px-6 py-20 dark:border-stone-800/60 dark:bg-stone-900/30"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-lg text-stone-600 dark:text-stone-400">
            Every story like this one starts with someone saying yes.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-amber-600 px-8 py-4 font-medium text-white transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </ScrollReveal>
    </main>
  );
}
