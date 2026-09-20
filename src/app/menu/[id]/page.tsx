import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMenuItemById, menuItems } from "@/data/menu";
import { formatINR, siteConfig } from "@/lib/site";
import { AnimatedIllustration } from "@/components/AnimatedIllustration";

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

  return (
    <article className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <Link href="/menu" className="text-xs tracking-[0.16em] text-muted uppercase">
        ← Full menu
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:aspect-[5/4]">
            <Image
              src={hero}
              alt={`${item.name} from Sue Patisserie`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {item.images.slice(1, 5).map((src, index) => (
              <div
                key={src + String(index)}
                className="relative aspect-square overflow-hidden rounded-2xl"
              >
                <Image
                  src={src}
                  alt={`${item.name} detail photo ${index + 2}`}
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.22em] text-accent uppercase">
            {item.unit}
            {item.isCustomTheme ? " · custom" : ""}
          </p>
          <h1 className="font-display mt-2 text-5xl leading-tight">{item.name}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted">{item.description}</p>

          {dual ? (
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-line bg-card p-5">
                <p className="text-[10px] tracking-[0.16em] text-muted uppercase">
                  Whipped cream frosting
                </p>
                <p className="font-display mt-2 text-3xl">
                  {formatINR(item.priceWhipped ?? 0)}
                </p>
              </div>
              <div className="rounded-3xl bg-invert p-5 text-on-invert">
                <p className="text-[10px] tracking-[0.16em] uppercase opacity-70">
                  Buttercream frosting
                </p>
                <p className="font-display mt-2 text-3xl">
                  {formatINR(item.priceButtercream ?? 0)}
                </p>
              </div>
            </div>
          ) : (
            <p className="font-display mt-8 text-4xl">
              {item.priceWhipped !== null ? formatINR(item.priceWhipped) : "On request"}
            </p>
          )}

          <h2 className="mt-10 text-xs tracking-[0.2em] text-muted uppercase">
            What’s in it
          </h2>
          <ul className="mt-3 space-y-3">
            {item.ingredientBullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {bullet}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/contact?item=${encodeURIComponent(item.name)}`}
              className="rounded-full bg-invert px-5 py-3 text-xs tracking-[0.16em] text-on-invert uppercase"
            >
              Order this
            </Link>
            <Link
              href="/menu"
              className="rounded-full border border-line px-5 py-3 text-xs tracking-[0.16em] uppercase"
            >
              Back to menu
            </Link>
          </div>
          <AnimatedIllustration kind="kids" className="mt-10 h-24 w-36 text-fg/20" />
        </div>
      </div>
    </article>
  );
}
