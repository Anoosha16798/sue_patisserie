"use client";

import Image from "next/image";
import Link from "next/link";
import { menuCategories, menuItems } from "@/data/menu";
import { formatINR } from "@/lib/site";
import type { MenuItem } from "@/types/menu";

function isCake(item: MenuItem): boolean {
  return item.category === "signature-cakes";
}

const JUMP = [
  { href: "#basic-range", label: "Basic cakes" },
  { href: "#premium-range", label: "Premium cakes" },
  { href: "#custom-themes", label: "Custom themes" },
  { href: "#teacakes", label: "Teacakes" },
  { href: "#cupcakes-muffins", label: "Cupcakes" },
  { href: "#cookies-biscuits", label: "Biscuits" },
  { href: "#squares-jars", label: "Brownies & jars" },
] as const;

export function MenuBoard() {
  return (
    <section id="menu" className="mx-auto max-w-[820px]">
      <header className="mb-10 text-center">
        <h2 className="font-display text-[2rem] font-medium tracking-tight md:text-[2.35rem]">
          Menu
        </h2>
        <p className="mx-auto mt-4 max-w-[42rem] text-[15px] leading-relaxed text-muted">
          All items are made with Amul butter, Amul fresh cream and premium
          chocolates, with the utmost care and cleanliness. Everything is
          eggless and made from scratch at home, without premixes. Add birthday,
          wedding, gym, baby shower or anniversary décor to any cake.
        </p>
        <p className="mt-3 text-[13px] text-muted">
          Cake prices: whipped cream frosting &nbsp;·&nbsp; buttercream frosting
        </p>
      </header>

      <nav
        className="mb-12 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[12px] tracking-[0.12em] text-muted uppercase"
        aria-label="Menu sections"
      >
        {JUMP.map((link, index) => (
          <span key={link.href} className="inline-flex items-center gap-4">
            {index > 0 ? <span aria-hidden="true">·</span> : null}
            <a href={link.href} className="hover:text-fg">
              {link.label}
            </a>
          </span>
        ))}
      </nav>

      {menuCategories.map((category) => (
        <div key={category.id} className="mb-16">
          {category.subcategories.map((sub) => {
            const items = menuItems.filter((item) => item.subcategory === sub.id);
            const cakes = items.some(isCake);
            return (
              <section key={sub.id} id={sub.id} className="mb-12 scroll-mt-24">
                <div className="mb-5 border-b border-line pb-2">
                  <h3 className="font-display text-xl font-medium tracking-wide uppercase">
                    {sub.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-muted">{sub.blurb}</p>
                </div>

                {cakes ? (
                  <div className="mb-2 hidden grid-cols-[1fr_5.6rem_6.4rem] gap-2 text-[10px] tracking-[0.14em] text-muted uppercase md:grid">
                    <span />
                    <span className="text-right">Whipped cream</span>
                    <span className="text-right">Buttercream</span>
                  </div>
                ) : null}

                <ul>
                  {items.map((item) => (
                    <MenuRow key={item.id} item={item} />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      ))}
    </section>
  );
}

function MenuRow({ item }: { item: MenuItem }) {
  const dual = isCake(item) && item.priceWhipped !== null && item.priceButtercream !== null;
  const src = item.images[0] ?? "/images/hero.jpg";

  return (
    <li className="border-b border-line/70">
      <Link
        href={`/menu/${item.id}`}
        className="grid grid-cols-[52px_1fr] items-start gap-3 py-3.5 md:grid-cols-[52px_1fr_5.6rem_6.4rem] md:items-center md:gap-2"
      >
        <div className="relative mt-0.5 h-[52px] w-[52px] overflow-hidden rounded-md bg-bg2">
          <Image
            src={src}
            alt=""
            fill
            sizes="52px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 md:flex md:items-baseline">
          <div className="min-w-0">
            <p className="font-display text-[1.15rem] leading-snug font-medium">
              {item.name}
            </p>
            <p className="mt-0.5 text-[13px] leading-snug text-muted">
              {item.description}
              {item.unit ? (
                <span className="text-muted/80"> · {item.unit}</span>
              ) : null}
            </p>
          </div>
          <span className="dots hidden md:block" aria-hidden="true" />
        </div>

        {dual ? (
          <>
            <p className="hidden text-right text-[15px] tabular-nums md:block">
              {formatINR(item.priceWhipped ?? 0)}
            </p>
            <p className="hidden text-right text-[15px] tabular-nums md:block">
              {formatINR(item.priceButtercream ?? 0)}
            </p>
            <dl className="col-span-2 mt-2 grid grid-cols-2 gap-4 text-[13px] md:hidden">
              <div>
                <dt className="text-[10px] tracking-[0.12em] text-muted uppercase">
                  Whipped cream
                </dt>
                <dd className="tabular-nums">{formatINR(item.priceWhipped ?? 0)}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.12em] text-muted uppercase">
                  Buttercream
                </dt>
                <dd className="tabular-nums">{formatINR(item.priceButtercream ?? 0)}</dd>
              </div>
            </dl>
          </>
        ) : (
          <>
            <p className="hidden text-right text-[15px] tabular-nums md:col-span-2 md:block">
              {item.priceWhipped !== null ? formatINR(item.priceWhipped) : "On request"}
            </p>
            <p className="col-span-2 mt-1 text-[15px] tabular-nums md:hidden">
              {item.priceWhipped !== null ? formatINR(item.priceWhipped) : "On request"}
            </p>
          </>
        )}
      </Link>
    </li>
  );
}
