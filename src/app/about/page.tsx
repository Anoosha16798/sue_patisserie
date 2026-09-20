import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the baker",
  description:
    "Meet the baker behind Sue Patisserie, a Bengaluru home bakery. 100% eggless cakes made from scratch with Amul butter, Amul fresh cream and premium chocolates. No premixes.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Sue Patisserie",
    description: "A home atelier for eggless celebration cakes in Bengaluru.",
    images: [{ url: "/images/chef.jpg", alt: "Pastry chef at Sue Patisserie" }],
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-20">
      <p className="font-script text-4xl text-accent">the baker</p>
      <h1 className="font-display text-4xl italic md:text-5xl">About Sue</h1>
      <div className="mt-10 grid items-center gap-10 md:grid-cols-[minmax(0,280px)_1fr] lg:grid-cols-[minmax(0,340px)_1fr]">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[340px] overflow-hidden rounded-sm bg-bg2">
          <Image
            src="/images/chef.jpg"
            alt="Pastry chef of Sue Patisserie in the home kitchen"
            fill
            sizes="(max-width: 768px) 80vw, 340px"
            className="object-cover object-top"
            priority
          />
        </div>
        <div className="max-w-xl text-[16px] leading-relaxed text-muted">
          <p>
            Sue Patisserie is a home bakery in Bengaluru. Every cake, brownie,
            biscuit and jar is made to order — 100% eggless, from scratch, with
            the same care you would want for your own table.
          </p>
          <p className="mt-4">
            We cook with Amul butter, Amul fresh cream and premium chocolates.
            No premixes, no boxed sponges. You choose whipped cream or
            buttercream, then add birthday, wedding, gym, baby shower or
            anniversary décor.
          </p>
          <p className="mt-4">
            Forty-eight hours’ notice is a kindness. Themes take a little
            longer. WhatsApp{" "}
            <a href={siteConfig.phoneHref} className="text-fg underline decoration-accent">
              {siteConfig.phoneDisplay}
            </a>{" "}
            if the date is close.
          </p>
        </div>
      </div>
    </div>
  );
}
