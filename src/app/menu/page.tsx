import type { Metadata } from "next";
import { MenuBoard } from "@/components/MenuBoard";
import { AnimatedIllustration } from "@/components/AnimatedIllustration";

export const metadata: Metadata = {
  title: "Menu — Cakes & Counter Treats",
  description:
    "Sue Patisserie café-style menu. Cakes show whipped cream and buttercream prices. Teacakes, cupcakes, cookies, brownies, cheesecakes and jars. Tap any row for photos and ingredients.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <AnimatedIllustration
        kind="cake"
        className="absolute top-6 right-6 h-16 w-16 text-fg/15"
      />
      <MenuBoard />
    </div>
  );
}
