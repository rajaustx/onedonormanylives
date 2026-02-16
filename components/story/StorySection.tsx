"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { scrollRevealLeft, scrollRevealRight } from "@/lib/animation";

interface StorySectionProps {
  title: string;
  body: string;
  image?: {
    src: string;
    alt: string;
  };
  alignment: "left" | "right";
  spacious?: boolean;
  children?: React.ReactNode;
}

export function StorySection({ title, body, image, alignment, spacious, children }: StorySectionProps) {
  const textVariants = alignment === "left" ? scrollRevealLeft : scrollRevealRight;
  const imageVariants = alignment === "left" ? scrollRevealRight : scrollRevealLeft;

  return (
    <section className={spacious ? "py-28 md:py-40" : "py-20 md:py-28"}>
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div
          className={`flex flex-col gap-12 md:gap-16 lg:flex-row lg:items-center lg:gap-20 ${
            alignment === "right" ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="flex-1 lg:min-w-0">
            <ScrollReveal variants={textVariants} className="max-w-xl">
              <h2 className="font-serif text-2xl font-medium text-stone-900 dark:text-stone-100 sm:text-3xl md:text-4xl">
                {title}
              </h2>
              <div className="mt-6 space-y-4 text-stone-600 dark:text-stone-400">
                {body.split("\n\n").map((para, i) => (
                  <p key={i} className="max-w-prose leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              {children}
            </ScrollReveal>
          </div>
          {image && (
            <div className="flex-1 lg:min-w-0">
              <ScrollReveal variants={imageVariants}>
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-stone-200/40 dark:ring-stone-700/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
