import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the baker",
  description:
    "Meet Sue, a professional certified baker in Bengaluru. 100% eggless cakes made from scratch with Amul butter, Amul fresh cream and premium chocolates. No premixes.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Sue Patisserie",
    description: "Professional certified baker for eggless celebration cakes in Bengaluru.",
    images: [{ url: "/images/chef.jpg", alt: "Professional certified baker at Sue Patisserie" }],
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-20">
      <p className="text-[13px] tracking-[0.16em] text-accent uppercase">
        Professional certified baker
      </p>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">About Sue</h1>
      <div className="mt-10 grid items-center gap-10 md:grid-cols-[minmax(0,280px)_1fr] lg:grid-cols-[minmax(0,340px)_1fr]">
        <div className="photo relative mx-auto aspect-[3/4] w-full max-w-[340px]">
          <Image
            src="/images/chef.jpg"
            alt="Sue, professional certified baker at Sue Patisserie"
            fill
            sizes="(max-width: 768px) 80vw, 340px"
            className="object-cover object-top"
            priority
          />
        </div>
        <div className="max-w-xl text-[16px] leading-relaxed text-muted">
          <p>
            Sue is a professional certified baker in Bengaluru. Every cake,
            brownie, biscuit and jar is made to order — 100% eggless, from
            scratch, with the care a celebration deserves.
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
