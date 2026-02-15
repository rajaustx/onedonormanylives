"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import Link from "next/link";

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const variants = {
  primary: "bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-900/20",
  secondary:
    "border-2 border-amber-600 text-amber-700 hover:bg-amber-50 dark:border-amber-500 dark:text-amber-400 dark:hover:bg-amber-950/30",
  ghost: "text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30",
};

export function AnimatedButton({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: AnimatedButtonProps) {
  const reduceMotion = useReducedMotion();

  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2";

  const motionProps = reduceMotion
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.2 },
      };

  const combinedClassName = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.div {...motionProps}>
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={combinedClassName}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
