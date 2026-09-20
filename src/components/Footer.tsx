import Link from "next/link";
import { navLinks, siteConfig, socialLinks } from "@/lib/site";
import { AnimatedIllustration } from "@/components/AnimatedIllustration";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-cocoa/10 bg-cocoa text-foam">
      <AnimatedIllustration
        kind="cookie"
        className="absolute right-8 bottom-6 h-16 w-16 text-foam/15"
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="font-script text-4xl">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-foam/70">
            A premium home bakery in Bengaluru. 100% eggless, scratch-made with
            Amul butter, fresh cream, and fine chocolates. No premixes. Ever.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.22em] text-gold uppercase">Visit</p>
          <ul className="mt-4 space-y-2 text-sm text-foam/80">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foam">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.22em] text-gold uppercase">Say hello</p>
          <ul className="mt-4 space-y-2 text-sm text-foam/80">
            <li>
              <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            {socialLinks.map((social) => (
              <li key={social.name}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.name} · {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-foam/10 px-5 py-4 text-center text-[11px] tracking-wide text-foam/45">
        © {new Date().getFullYear()} {siteConfig.name}. Home-baked with obsessive care.
      </div>
    </footer>
  );
}
