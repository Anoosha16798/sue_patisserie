import Link from "next/link";
import { navLinks, siteConfig, socialLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 text-[13px] md:grid-cols-3 md:px-8">
        <div>
          <p className="font-script text-3xl">{siteConfig.name}</p>
          <p className="mt-2 max-w-xs leading-relaxed text-muted">
            Professional certified baker. 100% eggless, made from scratch. No premixes.
          </p>
        </div>
        <ul className="space-y-1 text-muted">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-fg">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-1 text-muted">
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
    </footer>
  );
}
