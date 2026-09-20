import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { galleryShots } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Lookbook of Sue Patisserie cakes and desserts: gold chocolate, jungle themes, brownies, coffee macarons, blueberry cheesecake, baby shower and birthday cakes. 100% eggless, Bengaluru.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | Sue Patisserie",
    description: "Cakes, brownies, macarons and cheesecakes from a professional certified baker in Bengaluru.",
    images: [{ url: "/images/real-jungle.jpg", alt: "Jungle theme cake from Sue Patisserie" }],
  },
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <header className="mb-10 text-center">
        <p className="font-script text-4xl text-accent">the lookbook</p>
        <h1 className="font-display text-4xl italic md:text-5xl">Gallery</h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] text-muted">
          Real cakes from the kitchen — tap any photo for flavour, frosting and
          price.
        </p>
      </header>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {galleryShots.map((shot) => (
          <Link
            key={shot.src}
            href={shot.href}
            className="group mb-4 block break-inside-avoid"
          >
            <div className="photo relative aspect-[4/5] w-full">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <p className="px-1 py-3 font-display text-lg">{shot.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
