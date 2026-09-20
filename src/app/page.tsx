import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MenuBoard } from "@/components/MenuBoard";

export const metadata: Metadata = {
  title: "Eggless cake menu",
  description:
    "Sue Patisserie menu: 100% eggless cakes with whipped cream and buttercream prices, plus teacakes, cupcakes, biscuits, brownies and jars. Scratch-made at home with Amul butter.",
  alternates: { canonical: "/" },
};

const gallery = [
  { src: "/images/real-gold-side.jpg", alt: "Gold-dusted chocolate cake", href: "/menu/gold-dusted-chocolate" },
  { src: "/images/real-jungle.jpg", alt: "Jungle theme cake", href: "/menu/jungle-lion-king" },
  { src: "/images/real-red-velvet.jpg", alt: "Red velvet birthday cake", href: "/menu/red-velvet" },
  { src: "/images/real-pineapple.jpg", alt: "Pineapple cake slice", href: "/menu/pineapple" },
] as const;

export default function HomePage() {
  return (
    <div className="px-5 pb-20 md:px-8">
      <section className="mx-auto max-w-[980px] pt-8 pb-10 md:pt-12">
        <div className="photo-strip">
          {gallery.map((shot) => (
            <Link
              key={shot.src}
              href={shot.href}
              className="relative aspect-[4/5] overflow-hidden bg-bg2"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
                priority
              />
            </Link>
          ))}
        </div>
      </section>
      <MenuBoard />
    </div>
  );
}
