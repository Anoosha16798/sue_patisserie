"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { menuCategories, menuItems } from "@/data/menu";
import { formatINR } from "@/lib/site";
import type { MenuItem, MenuSubcategoryId } from "@/types/menu";
import { AnimatedIllustration } from "@/components/AnimatedIllustration";

function isCake(item: MenuItem): boolean {
  return item.category === "signature-cakes";
}

interface MenuBoardProps {
  heading?: string;
}

export function MenuBoard({ heading = "The menu" }: MenuBoardProps) {
  const [filter, setFilter] = useState<"all" | MenuSubcategoryId>("all");

  const visible = useMemo(() => {
    if (filter === "all") return menuItems;
    return menuItems.filter((item) => item.subcategory === filter);
  }, [filter]);

  return (
    <section id="menu" className="relative">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-accent uppercase">
            Café-style · scan in seconds
          </p>
          <h2 className="font-display mt-2 text-4xl italic md:text-6xl">{heading}</h2>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Cakes list two finishes: whipped cream frosting and buttercream frosting.
            Counter treats are priced per pack, loaf, square or jar. Tap a row for
            photos and what’s inside.
          </p>
        </div>
        <AnimatedIllustration kind="whisk" className="h-16 w-12 text-fg/20" />
      </div>

      <div className="sticky top-[68px] z-30 -mx-5 mb-8 overflow-x-auto border-y border-line bg-bg/90 px-5 py-3 backdrop-blur md:mx-0 md:rounded-full md:border">
        <div className="flex min-w-max gap-2">
          <Chip active={filter === "all"} onClick={() => setFilter("all")}>
            All
          </Chip>
          {menuCategories.flatMap((category) =>
            category.subcategories.map((sub) => (
              <Chip
                key={sub.id}
                active={filter === sub.id}
                onClick={() => setFilter(sub.id)}
              >
                {sub.title}
              </Chip>
            )),
          )}
        </div>
      </div>

      {menuCategories.map((category) => {
        const rows = visible.filter((item) => item.category === category.id);
        if (rows.length === 0) return null;
        return (
          <div key={category.id} id={category.id} className="mb-12">
            <div className="mb-3 flex items-baseline justify-between gap-4 border-b border-line pb-2">
              <h3 className="font-display text-3xl">{category.title}</h3>
              <p className="hidden text-xs tracking-[0.16em] text-muted uppercase sm:block">
                {category.tagline}
              </p>
            </div>

            {category.id === "signature-cakes" ? (
              <div className="mb-3 hidden grid-cols-[1fr_180px] gap-4 px-2 text-[10px] tracking-[0.18em] text-muted uppercase md:grid">
                <span>Item</span>
                <span className="grid grid-cols-2 text-right">
                  <span>Whipped</span>
                  <span>Buttercream</span>
                </span>
              </div>
            ) : null}

            {category.subcategories.map((sub) => {
              const items = rows.filter((item) => item.subcategory === sub.id);
              if (items.length === 0) return null;
              return (
                <div key={sub.id} className="mb-6">
                  <p className="mb-1 text-[11px] tracking-[0.2em] text-accent2 uppercase">
                    {sub.title}
                  </p>
                  <ul className="divide-y divide-line">
                    {items.map((item, index) => (
                      <MenuRow key={item.id} item={item} index={index} />
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs tracking-wide whitespace-nowrap ${
        active ? "bg-invert text-on-invert" : "bg-card text-muted hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}

function MenuRow({ item, index }: { item: MenuItem; index: number }) {
  const dual = isCake(item) && item.priceWhipped !== null && item.priceButtercream !== null;
  const src = item.images[0] ?? "/images/hero.jpg";

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ delay: (index % 10) * 0.03, duration: 0.4 }}
    >
      <Link
        href={`/menu/${item.id}`}
        className="menu-row group grid grid-cols-[72px_1fr] items-center gap-3 py-3 md:grid-cols-[88px_1fr_180px] md:gap-5"
      >
        <div className="relative h-[72px] w-[72px] overflow-hidden rounded-2xl bg-bg2 md:h-20 md:w-20">
          <Image
            src={src}
            alt={`${item.name} from Sue Patisserie`}
            fill
            sizes="88px"
            className="thumb object-cover transition duration-500"
          />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h4 className="font-display text-xl leading-tight md:text-2xl">
              {item.name}
            </h4>
            <span className="text-[10px] tracking-[0.14em] text-muted uppercase">
              {item.unit}
              {item.isCustomTheme ? " · starting" : ""}
            </span>
          </div>
          <p className="mt-0.5 line-clamp-2 text-sm text-muted">{item.description}</p>
          {dual ? (
            <dl className="mt-2 grid grid-cols-2 gap-2 text-xs md:hidden">
              <div>
                <dt className="text-[10px] tracking-[0.12em] text-muted uppercase">
                  Whipped
                </dt>
                <dd className="font-medium">{formatINR(item.priceWhipped ?? 0)}</dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.12em] text-muted uppercase">
                  Buttercream
                </dt>
                <dd className="font-medium">{formatINR(item.priceButtercream ?? 0)}</dd>
              </div>
            </dl>
          ) : (
            <p className="mt-1 font-medium md:hidden">
              {item.priceWhipped !== null ? formatINR(item.priceWhipped) : "On request"}
            </p>
          )}
        </div>
        <div className="hidden md:block">
          {dual ? (
            <div className="price-grid font-display text-lg">
              <span>{formatINR(item.priceWhipped ?? 0)}</span>
              <span>{formatINR(item.priceButtercream ?? 0)}</span>
            </div>
          ) : (
            <p className="text-right font-display text-lg">
              {item.priceWhipped !== null ? formatINR(item.priceWhipped) : "On request"}
            </p>
          )}
        </div>
      </Link>
    </motion.li>
  );
}
