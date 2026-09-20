"use client";

import { AnimatedIllustration } from "@/components/AnimatedIllustration";

export function FloatingScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <AnimatedIllustration kind="whisk" className="absolute top-16 left-[3%] h-24 w-16 md:h-32 md:w-20" delay={0.2} />
      <AnimatedIllustration kind="whip" className="absolute top-24 right-[5%] h-20 w-20 md:h-28 md:w-28" delay={0.8} amplitude={14} />
      <AnimatedIllustration kind="stand" className="absolute bottom-20 left-[7%] hidden h-28 w-24 sm:block" delay={0.4} />
      <AnimatedIllustration kind="cake" className="absolute right-[10%] bottom-28 h-16 w-16 md:h-24 md:w-24" delay={1.1} />
      <AnimatedIllustration kind="cookie" className="absolute top-[46%] left-[16%] h-14 w-14" delay={0.6} amplitude={8} />
      <AnimatedIllustration kind="knife" className="absolute top-[58%] right-[22%] h-8 w-24" delay={0.9} />
      <AnimatedIllustration kind="brownie" className="absolute top-12 left-[38%] hidden h-14 w-14 md:block" delay={1.3} />
      <AnimatedIllustration kind="kids" className="absolute bottom-8 right-[38%] hidden h-20 w-28 lg:block" delay={0.5} />
      <AnimatedIllustration kind="gift" className="absolute top-[34%] right-[8%] hidden h-16 w-16 md:block" delay={1.4} />
    </div>
  );
}
