"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export type IllustrationKind =
  | "whisk"
  | "cream"
  | "stand"
  | "pastry"
  | "cookie"
  | "kids"
  | "gift";

interface AnimatedIllustrationProps {
  kind: IllustrationKind;
  className?: string;
  delay?: number;
  amplitude?: number;
}

function Whisk() {
  return (
    <svg viewBox="0 0 80 120" fill="none" aria-hidden="true" className="h-full w-full">
      <path
        d="M38 8c0 18-6 28-6 48 0 14 6 22 8 36"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M32 56c-10 8-16 22-10 34 6 12 22 16 30 6 8-10 4-26-6-34"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M28 72c8 4 18 4 26-2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M30 84c8 3 16 3 22-1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M42 96v16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Cream() {
  return (
    <svg viewBox="0 0 90 90" fill="none" aria-hidden="true" className="h-full w-full">
      <path
        d="M20 58c4-18 14-28 26-32 8-2 18 2 22 12 8 18-2 32-18 36-16 4-32-2-30-16Z"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path d="M34 40c6-8 16-10 24-4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="48" cy="36" r="3" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function Stand() {
  return (
    <svg viewBox="0 0 100 110" fill="none" aria-hidden="true" className="h-full w-full">
      <ellipse cx="50" cy="38" rx="28" ry="10" stroke="currentColor" strokeWidth="1.8" />
      <path d="M22 38c2 10 12 16 28 16s26-6 28-16" stroke="currentColor" strokeWidth="1.8" />
      <path d="M50 54v28" stroke="currentColor" strokeWidth="2.2" />
      <path d="M28 92c8-6 14-8 22-8s14 2 22 8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M24 96h52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="28" r="8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function Pastry() {
  return (
    <svg viewBox="0 0 90 70" fill="none" aria-hidden="true" className="h-full w-full">
      <path
        d="M12 42c8-22 58-22 66 0 2 8-6 16-18 18H30C18 58 10 50 12 42Z"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="currentColor"
        fillOpacity="0.07"
      />
      <path d="M22 40c10-6 36-6 46 0" stroke="currentColor" strokeWidth="1.4" />
      <path d="M28 28c4-8 12-12 18-12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function Cookie() {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className="h-full w-full">
      <circle cx="40" cy="40" r="26" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="32" cy="34" r="3" fill="currentColor" opacity="0.55" />
      <circle cx="48" cy="30" r="2.4" fill="currentColor" opacity="0.55" />
      <circle cx="46" cy="46" r="3.2" fill="currentColor" opacity="0.55" />
      <circle cx="30" cy="48" r="2" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

function Kids() {
  return (
    <svg viewBox="0 0 160 110" fill="none" aria-hidden="true" className="h-full w-full">
      <circle cx="48" cy="28" r="12" stroke="currentColor" strokeWidth="1.7" />
      <path d="M36 52c2 18 22 18 24 0" stroke="currentColor" strokeWidth="1.7" />
      <path d="M40 70c-8 14-4 28 8 28" stroke="currentColor" strokeWidth="1.7" />
      <path d="M56 70c8 14 4 28-6 28" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="108" cy="30" r="12" stroke="currentColor" strokeWidth="1.7" />
      <path d="M96 54c2 18 22 18 24 0" stroke="currentColor" strokeWidth="1.7" />
      <path d="M100 72c-6 14-2 26 8 26" stroke="currentColor" strokeWidth="1.7" />
      <path d="M116 72c8 14 4 26-6 26" stroke="currentColor" strokeWidth="1.7" />
      <ellipse cx="78" cy="62" rx="16" ry="10" stroke="currentColor" strokeWidth="1.7" />
      <path d="M70 58c4-6 12-6 16 0" stroke="currentColor" strokeWidth="1.4" />
      <path d="M62 44c6 6 10 8 16 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M98 46c-6 6-10 8-16 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function Gift() {
  return (
    <svg viewBox="0 0 120 110" fill="none" aria-hidden="true" className="h-full w-full">
      <circle cx="42" cy="26" r="12" stroke="currentColor" strokeWidth="1.7" />
      <path d="M30 50c2 20 22 20 24 0" stroke="currentColor" strokeWidth="1.7" />
      <path d="M34 70c-6 16 0 28 10 28" stroke="currentColor" strokeWidth="1.7" />
      <path d="M50 70c8 16 4 28-8 28" stroke="currentColor" strokeWidth="1.7" />
      <path d="M54 48c10 4 18 2 28-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="88" cy="36" r="10" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="86" cy="34" r="2" fill="currentColor" />
      <circle cx="92" cy="38" r="1.6" fill="currentColor" />
      <path d="M78 44c4 6 14 8 18 2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

const ILLUSTRATIONS: Record<IllustrationKind, () => ReactNode> = {
  whisk: Whisk,
  cream: Cream,
  stand: Stand,
  pastry: Pastry,
  cookie: Cookie,
  kids: Kids,
  gift: Gift,
};

export function AnimatedIllustration({
  kind,
  className = "",
  delay = 0,
  amplitude = 10,
}: AnimatedIllustrationProps) {
  const Graphic = ILLUSTRATIONS[kind];

  return (
    <motion.div
      className={`pointer-events-none text-cocoa/25 ${className}`}
      initial={{ opacity: 0, y: amplitude }}
      animate={{
        opacity: 1,
        y: [0, -amplitude, 0],
        rotate: [0, 3, -2, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        y: {
          duration: 6 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        rotate: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
      aria-hidden="true"
    >
      <Graphic />
    </motion.div>
  );
}

interface RevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
}

export function Reveal({ children, delay = 0, className, ...rest }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
