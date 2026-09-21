import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & orders",
  description:
    "Order an eggless cake from Sue Patisserie in Bengaluru. Share date, flavour, whipped cream or buttercream, and theme. Phone, WhatsApp and email.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {

  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <header className="mb-10 text-center">
          <p className="font-script text-4xl text-accent md:text-5xl">write to us</p>
          <h1 className="font-display text-4xl italic md:text-5xl">A cake, a date, a note.</h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] text-muted">
            Tell us the occasion, the flavour, and whether you prefer whipped
            cream or buttercream. We will confirm availability.
          </p>
        </header>

        <div className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="photo relative bg-bg2">
            <div className="relative min-h-[280px] lg:h-full">
              <Image
                src="/images/real-roses.jpg"
                alt="Floral buttercream cake from Sue Patisserie"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                <p className="font-script text-3xl">order hours</p>
                <p className="mt-1 text-sm text-white/85">{siteConfig.hours}</p>
                <dl className="mt-6 space-y-3 text-sm">
                  <div>
                    <dt className="text-[10px] tracking-[0.18em] text-white/60 uppercase">Phone</dt>
                    <dd>
                      <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-[0.18em] text-white/60 uppercase">Email</dt>
                    <dd>
                      <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-[0.18em] text-white/60 uppercase">Studio</dt>
                    <dd>{siteConfig.address}</dd>
                  </div>
                </dl>
                <ul className="mt-6 flex gap-4 text-[12px] tracking-[0.14em] uppercase">
                  {socialLinks.map((social) => (
                    <li key={social.name}>
                      <a href={social.href} target="_blank" rel="noreferrer">
                        {social.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div className="card-soft border border-line p-6 md:p-10">
            <p className="font-display text-2xl italic">Inquiry</p>
            <p className="mt-1 mb-6 text-[13px] text-muted">
              Forty-eight hours’ notice is preferred. Themes need a little extra time.
            </p>
            <Suspense fallback={<p className="text-sm text-muted">Loading form…</p>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
