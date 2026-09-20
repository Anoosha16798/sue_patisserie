import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Order from Sue Patisserie. Share flavour, frosting and theme details.",
  alternates: { canonical: "/contact" },
};

interface ContactPageProps {
  searchParams: Promise<{ item?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;

  return (
    <div className="mx-auto grid max-w-[980px] gap-12 px-5 py-14 md:grid-cols-2 md:px-8 md:py-20">
      <div>
        <h1 className="font-display text-3xl font-medium md:text-4xl">Contact</h1>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
          Tell us the date, flavour, and whipped cream or buttercream. Themes
          need a little extra time.
        </p>
        <dl className="mt-8 space-y-4 text-[14px]">
          <div>
            <dt className="text-[11px] tracking-[0.12em] text-muted uppercase">Phone</dt>
            <dd>
              <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.12em] text-muted uppercase">Email</dt>
            <dd>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.12em] text-muted uppercase">Hours</dt>
            <dd className="text-muted">{siteConfig.hours}</dd>
          </div>
        </dl>
        <ul className="mt-6 flex gap-4 text-[13px] text-muted">
          {socialLinks.map((social) => (
            <li key={social.name}>
              <a href={social.href} target="_blank" rel="noreferrer">
                {social.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-line bg-card p-6 md:p-8">
        <ContactForm presetItem={params.item} />
      </div>
    </div>
  );
}
