import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FeaturedGrid } from "@/components/FeaturedGrid";
import { FloatingScene } from "@/components/FloatingScene";
import { MenuBoard } from "@/components/MenuBoard";
import { Reveal } from "@/components/AnimatedIllustration";
import { featuredMedia } from "@/data/menu";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "100% Eggless Custom Cakes · Full Menu",
  description:
    "Sue Patisserie menu: 100% eggless cakes with whipped cream or buttercream prices, plus teacakes, cupcakes, cookies, brownies and jars. Scratch-made with Amul butter and premium chocolate.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden px-5 pt-6 pb-14 md:px-8 md:pt-12">
        <FloatingScene />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[11px] tracking-[0.32em] text-accent uppercase">
              Bengaluru home bakery · 100% eggless
            </p>
            <h1 className="font-display mt-4 max-w-xl text-5xl leading-[0.95] md:text-7xl">
              The cake menu,
              <span className="italic text-accent"> unmissable.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              Everything is scratch-made at home with Amul butter, Amul fresh cream,
              and premium chocolates — no premixes, ever. Cakes are priced two ways:
              whipped cream frosting or buttercream frosting. Then add birthday,
              wedding, gym, baby shower or anniversary décor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#menu"
                className="rounded-full bg-invert px-6 py-3 text-xs tracking-[0.18em] text-on-invert uppercase"
              >
                Jump to menu
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-line px-6 py-3 text-xs tracking-[0.18em] uppercase"
              >
                Custom order
              </Link>
            </div>
          </div>
          <Reveal className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-2 aspect-[5/3] overflow-hidden rounded-[1.8rem]">
                <Image
                  src="/images/real-gold-side.jpg"
                  alt="Gold-dusted chocolate cake with ganache centre from Sue Patisserie"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-[1.6rem]">
                <Image
                  src="/images/real-jungle.jpg"
                  alt="Lion King jungle theme cake from Sue Patisserie"
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-[1.6rem]">
                <Image
                  src="/images/real-red-velvet.jpg"
                  alt="Red velvet birthday cake from Sue Patisserie"
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
        <p className="relative mx-auto mt-8 max-w-6xl text-xs tracking-[0.08em] text-muted">
          {siteConfig.tagline}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
        <div className="mb-6">
          <p className="text-[11px] tracking-[0.24em] text-accent uppercase">
            Featured
          </p>
          <h2 className="font-display mt-2 text-4xl italic md:text-5xl">
            Lookbook
          </h2>
        </div>
        <FeaturedGrid items={featuredMedia} />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <MenuBoard heading="One menu. Every price." />
      </section>
    </div>
  );
}
