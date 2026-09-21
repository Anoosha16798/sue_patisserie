"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { MenuItem } from "@/types/menu";
import { formatINR } from "@/lib/site";

interface MenuCardProps {
  item: MenuItem;
  index?: number;
  onSelect: (item: MenuItem) => void;
}

export function MenuCard({ item, index = 0, onSelect }: MenuCardProps) {
  const showFrostingPair =
    item.priceWhipped !== null && item.priceButtercream !== null;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ delay: (index % 8) * 0.04, duration: 0.55 }}
      whileHover={{ y: -4 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cocoa/8 bg-foam shadow-[0_12px_40px_-24px_rgba(59,36,24,0.45)]"
    >
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="flex h-full flex-col text-left"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.images[0] ?? "/images/hero.jpg"}
            alt={`${item.name} from Sue Patisserie`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          {item.isCustomTheme ? (
            <span className="absolute top-3 left-3 rounded-full bg-ivory/90 px-3 py-1 text-[10px] tracking-[0.18em] text-cocoa uppercase">
              Custom theme
            </span>
          ) : null}
          <span className="absolute right-3 bottom-3 rounded-full bg-cocoa/80 px-3 py-1 text-[10px] tracking-wide text-foam uppercase">
            {item.unit}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-2xl text-cocoa">{item.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cocoa/65">
            {item.description}
          </p>
          <div className="mt-4 flex flex-1 flex-col justify-end">
            {showFrostingPair ? (
              <dl className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-2xl bg-cream/80 px-3 py-2">
                  <dt className="text-[10px] tracking-[0.14em] text-cocoa/50 uppercase">
                    Whipped cream
                  </dt>
                  <dd className="mt-1 font-medium text-cocoa">
                    {formatINR(item.priceWhipped ?? 0)}
                  </dd>
                </div>
                <div className="rounded-2xl bg-blush/50 px-3 py-2">
                  <dt className="text-[10px] tracking-[0.14em] text-cocoa/50 uppercase">
                    Buttercream
                  </dt>
                  <dd className="mt-1 font-medium text-cocoa">
                    {formatINR(item.priceButtercream ?? 0)}
                  </dd>
                </div>
              </dl>
            ) : (
              <p className="text-sm font-medium text-cocoa">
                {item.priceWhipped !== null ? formatINR(item.priceWhipped) : "On request"}
              </p>
            )}
            <p className="mt-3 text-[11px] tracking-[0.16em] text-gold uppercase">
              View details →
            </p>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
