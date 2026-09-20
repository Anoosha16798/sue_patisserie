import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FeaturedGrid } from "@/components/FeaturedGrid";
import { FloatingScene } from "@/components/FloatingScene";
import { Reveal } from "@/components/AnimatedIllustration";
import { featuredMedia } from "@/data/menu";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "100% Eggless Custom Cakes",
  description:
    "Sue Patisserie crafts 100% eggless, scratch-made cakes with Amul butter, fresh cream, and premium chocolates. Fully customizable whipped cream or buttercream finishes.",
  alternates: { canonical: "/" },
};

const pillars = [
  {
    title: "100% eggless",
    copy: "Every sponge, cookie, and jar is egg-free — without tasting like a compromise.",
  },
  {
    title: "Scratch-made",
    copy: "No premixes, no boxed bases. Batter is mixed to order in a home atelier.",
  },
  {
    title: "Premium pantry",
    copy: "Amul butter, fresh cream, and fine chocolates — the short list we actually use.",
  },
  {
    title: "Customisable",
    copy: "Whipped cream or buttercream, florals, jungle themes, gold dust, half-cakes.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden px-5 pt-8 pb-20 md:px-8 md:pt-16">
        <FloatingScene />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] tracking-[0.32em] text-gold uppercase">
              Bengaluru home bakery
            </p>
            <h1 className="font-display mt-4 max-w-xl text-5xl leading-[1.05] text-cocoa md:text-7xl">
              Cakes that feel couture.
              <span className="italic text-rose"> Taste homemade.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-cocoa/70 md:text-lg">
              {siteConfig.name} is 100% eggless, scratch-made, and wildly
              customizable. We bake with Amul butter, fresh cream, and premium
              chocolates — then finish in whipped cream or buttercream, your call.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="rounded-full bg-cocoa px-6 py-3 text-xs tracking-[0.18em] text-foam uppercase"
              >
                Browse the menu
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-cocoa/20 px-6 py-3 text-xs tracking-[0.18em] text-cocoa uppercase"
              >
                Plan a custom cake
              </Link>
            </div>
          </div>
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] shadow-[0_30px_80px_-40px_rgba(59,36,24,0.8)]">
              <Image
                src="/images/hero.jpg"
                alt="Layered celebration cake with elegant frosting from Sue Patisserie"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 max-w-[220px] rounded-3xl border border-cocoa/10 bg-foam/95 p-4 shadow-lg md:-left-10">
              <p className="font-script text-3xl text-cocoa">no premixes</p>
              <p className="mt-1 text-xs leading-relaxed text-cocoa/60">
                Just butter, cream, chocolate, fruit, and time.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.08}>
              <article className="h-full rounded-3xl border border-cocoa/8 bg-foam p-5">
                <p className="text-[10px] tracking-[0.2em] text-gold uppercase">
                  0{index + 1}
                </p>
                <h2 className="font-display mt-3 text-2xl text-cocoa">{pillar.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-cocoa/65">{pillar.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.24em] text-gold uppercase">
              Featured products
            </p>
            <h2 className="font-display mt-2 text-4xl text-cocoa md:text-5xl">
              A bento of pretty things
            </h2>
          </div>
          <Link href="/menu" className="text-sm text-cocoa/70 underline decoration-gold/50">
            Full menu
          </Link>
        </div>
        <FeaturedGrid items={featuredMedia} />
      </section>

      <section className="relative mx-auto max-w-6xl overflow-hidden px-5 pb-24 md:px-8">
        <div className="grid overflow-hidden rounded-[2rem] bg-cocoa text-foam md:grid-cols-2">
          <div className="relative min-h-[280px]">
            <Image
              src="/images/atelier.jpg"
              alt="Warm home kitchen atelier where Sue Patisserie bakes"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-80"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="font-script text-4xl text-gold">from a home kitchen</p>
            <h2 className="font-display mt-2 text-3xl md:text-4xl">
              Luxury that still smells like Sunday baking.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foam/75">
              We obsess over cleanliness, ingredient lists, and whether the crumb
              sings. If you can dream a theme, we can frost it — with 48 hours’
              notice when we can, and a little more for sculpted florals.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex text-xs tracking-[0.18em] text-gold uppercase"
            >
              Read the story →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
