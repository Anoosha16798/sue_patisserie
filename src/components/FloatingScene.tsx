"use client";

import { AnimatedIllustration } from "@/components/AnimatedIllustration";

export function FloatingScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <AnimatedIllustration
        kind="whisk"
        className="absolute top-16 left-[4%] h-24 w-16 md:h-32 md:w-20"
        delay={0.2}
      />
      <AnimatedIllustration
        kind="cream"
        className="absolute top-28 right-[6%] h-20 w-20 md:h-28 md:w-28"
        delay={0.8}
        amplitude={14}
      />
      <AnimatedIllustration
        kind="stand"
        className="absolute bottom-24 left-[8%] hidden h-28 w-24 sm:block"
        delay={0.4}
      />
      <AnimatedIllustration
        kind="pastry"
        className="absolute right-[12%] bottom-32 h-16 w-20 md:h-20 md:w-24"
        delay={1.1}
      />
      <AnimatedIllustration
        kind="cookie"
        className="absolute top-[48%] left-[18%] h-14 w-14 opacity-80"
        delay={0.6}
        amplitude={8}
      />
    </div>
  );
}
