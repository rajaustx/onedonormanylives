"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface StoryImageProps {
  src: string;
  alt: string;
  caption?: string;
  variant?: "left" | "right" | "center" | "full";
  className?: string;
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const captionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function StoryImage({
  src,
  alt,
  caption,
  variant = "center",
  className = "",
}: StoryImageProps) {
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? { initial: false, animate: { opacity: 1, scale: 1 } }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.2 }, variants: imageVariants };

  const captionMotion = reduceMotion
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.2 }, variants: captionVariants };

  const alignClasses = {
    left: "mr-auto",
    right: "ml-auto",
    center: "mx-auto",
    full: "w-full",
  };

  const widthClasses = {
    left: "max-w-md",
    right: "max-w-md",
    center: "max-w-2xl",
    full: "w-full",
  };

  return (
    <figure className={`${alignClasses[variant]} ${widthClasses[variant]} ${className}`}>
      <motion.div
        {...motionProps}
        className="overflow-hidden rounded-lg shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-auto w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </motion.div>
      {caption && (
        <motion.figcaption
          {...captionMotion}
          className="mt-4 text-center text-sm italic text-stone-500 dark:text-stone-400 sm:text-left"
        >
          {caption}
        </motion.figcaption>
      )}
    </figure>
  );
}
