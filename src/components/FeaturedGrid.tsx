"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { FeaturedMedia } from "@/types/menu";

interface FeaturedGridProps {
  items: FeaturedMedia[];
}

export function FeaturedGrid({ items }: FeaturedGridProps) {
  return (
    <div className="bento-grid">
      {items.map((item, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: index * 0.06, duration: 0.55 }}
          whileHover={{ scale: 1.01 }}
          className={`span-${item.span} group relative min-h-[220px] overflow-hidden rounded-3xl`}
        >
          <Link href={item.href} className="absolute inset-0">
            {item.video ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={item.image}
                aria-label={item.title}
              >
                <source src={item.video} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={item.image}
                alt={`${item.title} — ${item.caption}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-5 text-white">
              <p className="text-[10px] tracking-[0.22em] text-glow uppercase">
                {item.video ? "Loop" : "Featured"}
              </p>
              <h3 className="font-display text-2xl md:text-3xl">{item.title}</h3>
              <p className="mt-1 text-sm text-white/80">{item.caption}</p>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
