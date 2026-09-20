"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { MenuItem } from "@/types/menu";
import { formatINR } from "@/lib/site";

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  return <ItemDetailModalInner key={item?.id ?? "closed"} item={item} onClose={onClose} />;
}

function ItemDetailModalInner({ item, onClose }: ItemDetailModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!item) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  const showFrostingPair =
    item !== null && item.priceWhipped !== null && item.priceButtercream !== null;

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-cocoa/45 backdrop-blur-sm"
            aria-label="Close details"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="item-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-ivory shadow-2xl sm:rounded-3xl"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[280px]">
                <Image
                  src={item.images[activeImage] ?? item.images[0] ?? "/images/hero.jpg"}
                  alt={`${item.name} — photo ${activeImage + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
                  {item.images.slice(0, 4).map((src, index) => (
                    <button
                      key={src + String(index)}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`h-12 w-12 overflow-hidden rounded-xl border-2 ${
                        activeImage === index ? "border-foam" : "border-transparent opacity-80"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`${item.name} thumbnail ${index + 1}`}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-[11px] tracking-[0.22em] text-gold uppercase">
                  {item.unit}
                  {item.isCustomTheme ? " · custom theme" : ""}
                </p>
                <h2 id="item-title" className="font-display mt-2 text-4xl text-cocoa">
                  {item.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cocoa/70">
                  {item.description}
                </p>

                {showFrostingPair ? (
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-cocoa/10 bg-foam p-4">
                      <p className="text-[10px] tracking-[0.16em] text-cocoa/50 uppercase">
                        Whipped cream frosting
                      </p>
                      <p className="mt-1 font-display text-2xl text-cocoa">
                        {formatINR(item.priceWhipped ?? 0)}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-rose/40 bg-blush/40 p-4">
                      <p className="text-[10px] tracking-[0.16em] text-cocoa/50 uppercase">
                        Buttercream frosting
                      </p>
                      <p className="mt-1 font-display text-2xl text-cocoa">
                        {formatINR(item.priceButtercream ?? 0)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-6 font-display text-3xl text-cocoa">
                    {item.priceWhipped !== null ? formatINR(item.priceWhipped) : "On request"}
                  </p>
                )}

                <h3 className="mt-8 text-xs tracking-[0.2em] text-cocoa/50 uppercase">
                  What goes into it
                </h3>
                <ul className="mt-3 space-y-2">
                  {item.ingredientBullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-cocoa/80"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`/contact?item=${encodeURIComponent(item.name)}`}
                    className="rounded-full bg-cocoa px-5 py-2.5 text-xs tracking-[0.16em] text-foam uppercase"
                  >
                    Inquire
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-cocoa/20 px-5 py-2.5 text-xs tracking-[0.16em] text-cocoa uppercase"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
