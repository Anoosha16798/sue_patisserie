import Link from "next/link";
import { navLinks, siteConfig, socialLinks } from "@/lib/site";
import { AnimatedIllustration } from "@/components/AnimatedIllustration";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-line bg-invert text-on-invert">
      <AnimatedIllustration
        kind="cookie"
        className="absolute right-8 bottom-6 h-16 w-16 text-on-invert/20"
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="font-script text-4xl">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-on-invert/70">
            Premium home bakery. 100% eggless, scratch-made with Amul butter,
            Amul fresh cream, and premium chocolates. No premixes. Custom themes
            welcome.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.22em] text-glow uppercase">Visit</p>
          <ul className="mt-4 space-y-2 text-sm text-on-invert/80">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.22em] text-glow uppercase">Say hello</p>
          <ul className="mt-4 space-y-2 text-sm text-on-invert/80">
            <li>
              <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
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
    </footer>
  );
}
