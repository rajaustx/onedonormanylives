"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  splitBy?: "words" | "chars" | "lines";
}

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export function AnimatedText({
  text,
  className,
  as: Component = "p",
  delay = 0,
  stagger: staggerDelay = 0.08,
  splitBy = "words",
}: AnimatedTextProps) {
  const reduceMotion = useReducedMotion();
  const MotionComponent = motion[Component];

  if (reduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  if (splitBy === "words") {
    const words = text.split(" ");
    return (
      <MotionComponent
        className={className}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: staggerDelay } } }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            custom={i}
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {word}
          </motion.span>
        ))}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {text}
    </MotionComponent>
  );
}
