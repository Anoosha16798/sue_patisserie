import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMenuItemById, menuItems } from "@/data/menu";
import { formatINR, siteConfig } from "@/lib/site";

interface ItemPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams(): { id: string }[] {
  return menuItems.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: ItemPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getMenuItemById(id);
  if (!item) {
    return { title: "Item not found" };
  }
  const dual =
    item.priceWhipped !== null && item.priceButtercream !== null;
  const priceNote = dual
    ? `Whipped cream ${formatINR(item.priceWhipped ?? 0)}, buttercream ${formatINR(item.priceButtercream ?? 0)}`
    : item.priceWhipped !== null
      ? formatINR(item.priceWhipped)
      : "Price on request";
  return {
    title: item.name,
    description: `${item.description} ${priceNote}. 100% eggless, scratch-made at ${siteConfig.name}.`,
    alternates: { canonical: `/menu/${item.id}` },
    openGraph: {
      title: `${item.name} | ${siteConfig.name}`,
      description: item.description,
      images: item.images.slice(0, 1).map((url) => ({
        url,
        alt: item.name,
      })),
    },
  };
}

export default async function MenuItemPage({ params }: ItemPageProps) {
  const { id } = await params;
  const item = getMenuItemById(id);
  if (!item) notFound();

  const dual =
    item.category === "signature-cakes" &&
    item.priceWhipped !== null &&
    item.priceButtercream !== null;
  const hero = item.images[0] ?? "/images/hero.jpg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.description,
    image: item.images.map((src) => `${siteConfig.url}${src}`),
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: item.priceWhipped ?? undefined,
      availability: "https://schema.org/LimitedAvailability",
      url: `${siteConfig.url}/menu/${item.id}`,
    },
  };

  return (
    <article className="mx-auto max-w-[980px] px-5 py-12 md:px-8 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/menu" className="text-[13px] text-muted">
        ← Menu
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="photo relative aspect-[4/5]">
            <Image
              src={hero}
              alt={`${item.name} from Sue Patisserie`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {item.images.slice(1, 5).map((src, index) => (
              <div key={src + String(index)} className="photo-sm relative aspect-square">
                <Image
                  src={src}
                  alt={`${item.name}, photo ${index + 2}`}
                  fill
                  sizes="15vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-script text-2xl text-accent">{item.unit}</p>
          <h1 className="font-display mt-1 text-4xl italic md:text-5xl">{item.name}</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{item.description}</p>

          {dual ? (
            <div className="mt-8 grid grid-cols-2 gap-px bg-line">
              <div className="bg-bg py-4 pr-4">
                <p className="text-[11px] text-muted">Whipped cream frosting</p>
                <p className="mt-1 text-xl tabular-nums">{formatINR(item.priceWhipped ?? 0)}</p>
              </div>
              <div className="bg-bg py-4 pl-4">
                <p className="text-[11px] text-muted">Buttercream frosting</p>
                <p className="mt-1 text-xl tabular-nums">{formatINR(item.priceButtercream ?? 0)}</p>
              </div>
            </div>
          ) : (
            <p className="mt-8 text-xl tabular-nums">
              {item.priceWhipped !== null ? formatINR(item.priceWhipped) : "On request"}
            </p>
          )}

          <h2 className="mt-10 text-[12px] tracking-[0.14em] text-muted uppercase">
            What goes in
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed">
            {item.ingredientBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>

          <div className="mt-8 flex gap-6 text-[13px]">
            <Link
              href={`/contact?item=${encodeURIComponent(item.name)}`}
              className="rounded-full bg-invert px-5 py-2.5 text-[12px] tracking-[0.14em] text-on-invert uppercase"
            >
              Order this
            </Link>
            <Link href="/menu" className="text-muted">
              Back to menu
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

