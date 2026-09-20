import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/AnimatedIllustration";
import { AnimatedIllustration } from "@/components/AnimatedIllustration";

export const metadata: Metadata = {
  title: "About the Home Bakery",
  description:
    "Sue Patisserie: home-baking roots, a no-premixes kitchen, Amul butter and premium chocolate, and cleanliness as a love language.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <AnimatedIllustration
        kind="stand"
        className="absolute top-10 right-6 hidden h-28 w-24 lg:block"
      />
      <header className="max-w-2xl">
        <p className="text-[11px] tracking-[0.28em] text-accent uppercase">Our roots</p>
        <h1 className="font-display mt-3 text-5xl md:text-6xl">
          Baked at home.
          <span className="italic text-accent"> Held to a patisserie standard.</span>
        </h1>
      </header>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/real-half-baby.jpg"
              alt="Custom baby shower half-cake from Sue Patisserie"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-script text-4xl">once upon a mixing bowl</p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            All items are made with premium ingredients — Amul butter, Amul fresh
            cream, premium chocolates — with utmost care and cleanliness. Everything
            is eggless and made from scratch at home, without premixes.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Order your favourite cake, then add birthday, wedding, gym, baby shower
            or anniversary décor. We would rather turn an order down than rush a crumb.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "No premixes. Ever.",
            copy: "If it comes as a powder labelled cake mix, it does not enter this kitchen.",
          },
          {
            title: "Cleanliness as care",
            copy: "Sanitised tools, covered racks, dated labels — fancy flavour is useless without trust.",
          },
          {
            title: "Named ingredients",
            copy: "Amul butter. Fresh cream. Premium chocolates. Real fruit. Filter coffee.",
          },
        ].map((block) => (
          <article key={block.title} className="rounded-3xl border border-line bg-card p-6">
            <h2 className="font-display text-2xl">{block.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{block.copy}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
