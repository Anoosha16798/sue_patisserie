import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimatedIllustration } from "@/components/AnimatedIllustration";
import { galleryShots } from "@/data/gallery";
import { menuItems } from "@/data/menu";
import { formatINR, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "100% eggless cakes in Bengaluru",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const signatures = menuItems.filter((item) => item.featured).slice(0, 4);

const heroShots = galleryShots.slice(0, 6);

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 md:grid-cols-2 md:px-8 md:py-16 lg:gap-16">
          <div className="relative order-2 md:order-1">
            <p className="font-script text-3xl text-accent md:text-4xl">Bengaluru home bakery</p>
            <h1 className="mt-2 font-display text-[2.6rem] leading-[1.08] tracking-tight md:text-6xl">
              Cakes with a little theatre.
            </h1>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted">
              100% eggless, made from scratch with Amul butter, Amul fresh cream
              and premium chocolates. No premixes. Themes, florals, gold, jungle
              — tell us the story.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="rounded-full bg-invert px-6 py-3 text-[12px] tracking-[0.16em] text-on-invert uppercase"
              >
                See the menu
              </Link>
              <Link
                href="/gallery"
                className="rounded-full border border-line px-6 py-3 text-[12px] tracking-[0.16em] uppercase"
              >
                Lookbook
              </Link>
            </div>
            <div className="pointer-events-none absolute -top-6 -right-4 hidden h-16 w-16 text-accent/70 lg:block">
              <AnimatedIllustration kind="whisk" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm md:aspect-[5/6]">
              <Image
                src="/images/real-gold-side.jpg"
                alt="Gold-dusted chocolate cake from Sue Patisserie"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-center font-script text-2xl text-accent">
              chocolate, with gold
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-bg2">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-3 md:px-8 md:py-12">
          {[
            ["100% eggless", "Every sponge, cream and biscuit — no eggs, ever."],
            ["Scratch, not mix", "Amul butter, fresh cream, premium chocolate."],
            ["Your theme", "Birthday, wedding, baby shower, gym, jungle, gold."],
          ].map(([title, copy]) => (
            <div key={title} className="text-center md:text-left">
              <p className="font-display text-2xl italic">{title}</p>
              <p className="mt-2 text-[15px] text-muted">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-script text-3xl text-accent">from the atelier</p>
            <h2 className="font-display text-4xl italic md:text-5xl">Featured cakes</h2>
          </div>
          <Link href="/gallery" className="text-[12px] tracking-[0.16em] uppercase">
            Full gallery →
          </Link>
        </div>
        <div className="gallery-mosaic">
          {heroShots.map((shot) => (
            <Link
              key={shot.src + shot.title}
              href={shot.href}
              className={`group relative min-h-[180px] overflow-hidden bg-bg2 ${shot.span ? `span-${shot.span}` : ""}`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent p-3 text-[13px] text-white">
                {shot.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
        <div className="mb-8">
          <p className="font-script text-3xl text-accent">taste first</p>
          <h2 className="font-display text-4xl italic">A few signatures</h2>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {signatures.map((item) => (
            <li key={item.id}>
              <Link href={`/menu/${item.id}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-bg2">
                  <Image
                    src={item.images[0] ?? "/images/hero.jpg"}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 font-display text-xl">{item.name}</p>
                <p className="text-[13px] text-muted">
                  {item.priceWhipped !== null ? `from ${formatINR(item.priceWhipped)}` : "On request"}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Link
            href="/menu"
            className="inline-flex rounded-full border border-line px-8 py-3 text-[12px] tracking-[0.16em] uppercase"
          >
            Open the full menu
          </Link>
        </div>
      </section>
    </div>
  );
}
