import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/AnimatedIllustration";
import { AnimatedIllustration } from "@/components/AnimatedIllustration";

export const metadata: Metadata = {
  title: "About the Home Bakery",
  description:
    "The Sue Patisserie story: home-baking roots, a strict no-premixes philosophy, and a kitchen that treats cleanliness as a love language.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <AnimatedIllustration
        kind="stand"
        className="absolute top-10 right-6 hidden h-28 w-24 text-cocoa/15 lg:block"
      />
      <header className="max-w-2xl">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">
          Our roots
        </p>
        <h1 className="font-display mt-3 text-5xl text-cocoa md:text-6xl">
          Baked at home.
          <span className="italic text-rose"> Held to a patisserie standard.</span>
        </h1>
      </header>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/atelier.jpg"
              alt="Home kitchen counter with baking tools at Sue Patisserie"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-script text-4xl text-cocoa">once upon a mixing bowl</p>
          <p className="mt-4 text-base leading-relaxed text-cocoa/75">
            Sue Patisserie began the way the best bakeries do — in a home kitchen,
            with a stubborn belief that eggless cake could still taste like a
            celebration. Orders were for friends, then friends of friends, then
            people who DM’d a moodboard at midnight.
          </p>
          <p className="mt-4 text-base leading-relaxed text-cocoa/75">
            The atelier is still a home. That is the point. You can taste the
            unhurried mixing, the overnight ganache, the fact that someone washed
            the bowls twice because they would serve this to their own family.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "No premixes. Ever.",
            copy: "If it comes as a powder labelled “cake mix”, it does not enter this kitchen. Sponges are creamed from Amul butter, flour, cocoa, fruit, and patience.",
          },
          {
            title: "Cleanliness as care",
            copy: "Sanitised tools, covered cooling racks, dated labels, and a hair-tied, jewellery-off ritual before every bake. Fancy flavour is useless without trust.",
          },
          {
            title: "Ingredients with names",
            copy: "Amul butter. Fresh cream. Premium chocolates. Real fruit. Filter coffee. That is the pantry — short, expensive-in-the-right-places, honest.",
          },
        ].map((block, index) => (
          <Reveal key={block.title} delay={index * 0.08}>
            <article className="h-full rounded-3xl bg-foam p-6 ring-1 ring-cocoa/8">
              <h2 className="font-display text-2xl text-cocoa">{block.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-cocoa/70">{block.copy}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 overflow-hidden rounded-[2rem]">
        <div className="relative min-h-[280px]">
          <Image
            src="/images/ingredients.jpg"
            alt="Butter, chocolate, and baking ingredients arranged on a linen cloth"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-cocoa/35" />
          <p className="font-display absolute inset-x-8 bottom-8 max-w-xl text-3xl text-foam md:text-4xl">
            We would rather turn an order down than rush a crumb.
          </p>
        </div>
      </Reveal>

      <div className="mt-16 flex justify-center">
        <AnimatedIllustration kind="kids" className="h-28 w-40 text-cocoa/25" />
      </div>
    </div>
  );
}
