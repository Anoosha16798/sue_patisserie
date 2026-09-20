import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuCatalog } from "@/components/MenuCatalog";
import { AnimatedIllustration } from "@/components/AnimatedIllustration";

export const metadata: Metadata = {
  title: "Menu — Cakes, Teacakes & Jars",
  description:
    "Browse Sue Patisserie’s 100% eggless menu. Signature cakes list whipped cream and buttercream prices. Teacakes, cupcakes, cookies, brownies, and cheesecake jars.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <AnimatedIllustration
        kind="whisk"
        className="absolute top-8 right-4 h-20 w-14 text-cocoa/15"
      />
      <header className="mb-10 max-w-2xl">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">The cabinet</p>
        <h1 className="font-display mt-3 text-5xl text-cocoa md:text-6xl">Menu</h1>
        <p className="mt-4 text-base leading-relaxed text-cocoa/70">
          Every cake shows two finishes: whipped cream frosting and buttercream
          frosting. Tap a card for photos and the four things that actually go
          into it. Quick bites are priced per pack, loaf, square, or jar.
        </p>
      </header>
      <Suspense fallback={<p className="text-cocoa/50">Warming the oven…</p>}>
        <MenuCatalog />
      </Suspense>
    </div>
  );
}
