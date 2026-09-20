import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sue Patisserie is a home bakery. All items are eggless, made from scratch with Amul butter, Amul fresh cream and premium chocolates. No premixes.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[820px] px-5 py-14 md:px-8 md:py-20">
      <h1 className="font-display text-3xl font-medium md:text-4xl">About</h1>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden bg-bg2">
          <Image
            src="/images/real-half-baby.jpg"
            alt="Baby shower cake from Sue Patisserie"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
        <div className="text-[15px] leading-relaxed text-muted">
          <p>
            All our items are made with premium ingredients such as Amul butter,
            Amul fresh cream, and premium chocolates, with the utmost care and
            cleanliness.
          </p>
          <p className="mt-4">
            Everything is eggless and made from scratch at home, without using
            any premixes.
          </p>
          <p className="mt-4">
            Order your favourite cakes and add any customisations you like,
            including birthday theme cakes, wedding cakes, gym theme cakes, baby
            shower cakes, anniversary cakes, and more.
          </p>
        </div>
      </div>
    </div>
  );
}
