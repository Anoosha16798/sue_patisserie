import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { AnimatedIllustration } from "@/components/AnimatedIllustration";
import { siteConfig, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Cake Inquiries",
  description:
    "Order custom eggless cakes from Sue Patisserie. Share flavour, frosting, and theme — or WhatsApp the atelier.",
  alternates: { canonical: "/contact" },
};

interface ContactPageProps {
  searchParams: Promise<{ item?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const presetItem = params.item;

  return (
    <div className="relative mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <AnimatedIllustration kind="pastry" className="absolute top-12 right-8 h-16 w-20" />
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-accent uppercase">Contact us</p>
          <h1 className="font-display mt-3 text-5xl">Let’s bake it in.</h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Tell us the date, flavour, and whether you are team whipped cream or
            team buttercream. Themes (birthday, wedding, gym, baby shower) need a
            little extra lead time.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="text-[10px] tracking-[0.18em] text-muted uppercase">
                Phone / WhatsApp
              </dt>
              <dd>
                <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
              </dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.18em] text-muted uppercase">Email</dt>
              <dd>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.18em] text-muted uppercase">Atelier</dt>
              <dd className="text-muted">{siteConfig.address}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.18em] text-muted uppercase">Hours</dt>
              <dd className="text-muted">{siteConfig.hours}</dd>
            </div>
          </dl>
          <ul className="mt-8 flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-line px-4 py-2 text-xs tracking-wide"
                >
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[2rem] border border-line bg-card p-6 md:p-8">
          <ContactForm presetItem={presetItem} />
        </div>
      </div>
    </div>
  );
}
