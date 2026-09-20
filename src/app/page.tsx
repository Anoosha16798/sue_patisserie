import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { galleryShots } from "@/data/gallery";
import { menuItems } from "@/data/menu";
import { formatINR, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "100% eggless cakes in Bengaluru",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const signatures = menuItems.filter((item) => item.featured).slice(0, 3);

const heroShots = galleryShots.slice(0, 6);

export default function HomePage() {
  return (
    <div>
      <section className="relative">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-8 md:py-20 lg:gap-16">
          <div className="order-2 md:order-1">
            <p className="text-[13px] tracking-[0.18em] text-accent uppercase">
              Professional certified baker
            </p>
            <h1 className="mt-3 font-display text-[2.7rem] leading-[1.08] tracking-tight md:text-[3.6rem] lg:text-6xl">
              Feel the taste of a well-made cake.
            </h1>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted">
              100% eggless, made from scratch with Amul butter, Amul fresh cream
              and premium chocolates. No premixes. Birthday, wedding, baby
              shower, jungle, gold — tell us the story.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/menu"
                className="rounded-full bg-invert px-7 py-3.5 text-[13px] tracking-[0.08em] text-on-invert"
              >
                Order now
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-[13px]"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full border border-line text-[10px]">
                  ▶
                </span>
                See the lookbook
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="photo relative aspect-[4/5] md:aspect-[5/6]">
              <Image
                src="/images/real-gold-side.jpg"
                alt="Gold-dusted chocolate cake from Sue Patisserie"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-6 md:px-8">
        <div className="grid gap-6 rounded-[1.5rem] bg-bg2 px-6 py-8 md:grid-cols-3 md:px-10 md:py-10">
          {[
            ["100% eggless", "Every sponge, cream and biscuit — no eggs, ever."],
            ["Scratch, not mix", "Amul butter, fresh cream, premium chocolate."],
            ["Your theme", "Birthday, wedding, baby shower, gym, jungle, gold."],
          ].map(([title, copy]) => (
            <div key={title}>
              <p className="font-display text-2xl">{title}</p>
              <p className="mt-2 text-[15px] text-muted">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[13px] tracking-[0.16em] text-accent uppercase">Lookbook</p>
            <h2 className="mt-1 font-display text-4xl md:text-5xl">Featured cakes</h2>
          </div>
          <Link href="/gallery" className="text-[13px]">
            Full gallery →
          </Link>
        </div>
        <div className="gallery-mosaic">
          {heroShots.map((shot) => (
            <Link
              key={shot.src + shot.title}
              href={shot.href}
              className={`photo group relative min-h-[180px] ${shot.span ? `span-${shot.span}` : ""}`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent p-4 text-[14px] text-white">
                {shot.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-invert text-on-invert">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
          <h2 className="text-center font-display text-4xl md:text-5xl">Popular cakes</h2>
          <ul className="mt-10 grid items-stretch gap-5 sm:grid-cols-3">
            {signatures.map((item, index) => (
              <li key={item.id} className={index === 1 ? "sm:-translate-y-3" : ""}>
                <Link
                  href={`/menu/${item.id}`}
                  className="card-soft group flex h-full flex-col p-4 text-fg"
                >
                  <div className="photo relative aspect-square">
                    <Image
                      src={item.images[0] ?? "/images/hero.jpg"}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-center font-display text-2xl">{item.name}</p>
                  <p className="mt-1 text-center text-[15px] text-muted">
                    {item.priceWhipped !== null ? `from ${formatINR(item.priceWhipped)}` : "On request"}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <div className="photo relative aspect-[4/5] md:aspect-[5/6]">
          <Image
            src="/images/real-pineapple.jpg"
            alt="Pineapple cake slice from Sue Patisserie"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-[13px] tracking-[0.16em] text-accent uppercase">
            About / professional certified baker
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
            Cakes that look considered, and taste even better.
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted">
            Sue is a professional certified baker in Bengaluru. Every cake is
            made to order, 100% eggless, from scratch — Amul butter, fresh cream,
            premium chocolate. You choose whipped cream or buttercream, then the
            theme.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex rounded-full bg-invert px-6 py-3 text-[13px] text-on-invert"
          >
            Learn more
          </Link>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl rounded-[1.75rem] bg-invert px-6 py-14 text-center text-on-invert md:px-12 md:py-16">
          <h2 className="font-display text-4xl md:text-5xl">A date, a flavour, a cake.</h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-on-invert/75">
            Share the occasion and frosting. We confirm availability — 48-hour
            notice is preferred.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-bg px-8 py-3.5 text-[13px] text-fg"
          >
            Get started
          </Link>
        </div>
      </section>
    </div>
  );
}
