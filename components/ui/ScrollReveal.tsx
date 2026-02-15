"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface ScrollRevealProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  as?: keyof typeof motion;
  once?: boolean;
  amount?: number;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function ScrollReveal({
  children,
  variants = defaultVariants,
  className,
  as = "div",
  once = true,
  amount = 0.2,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionComponent = motion[as] as typeof motion.div;

  const finalVariants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : variants;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={finalVariants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
