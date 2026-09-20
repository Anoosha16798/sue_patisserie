"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site";
import { ThemeSwitch } from "@/components/ThemeProvider";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 ${
        scrolled ? "border-b border-line bg-bg/92 backdrop-blur-md" : "bg-bg"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 md:px-8 md:py-4"
        aria-label="Primary"
      >
        <Link href="/" className="font-script text-[1.85rem] leading-none text-fg md:text-[2.1rem]">
          {siteConfig.name}
        </Link>

        <ul className="hidden items-center gap-7 text-[12px] tracking-[0.16em] uppercase md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={active ? "text-fg" : "text-muted hover:text-fg"}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeSwitch />
          <Link
            href="/contact"
            className="rounded-full bg-invert px-4 py-2 text-[11px] tracking-[0.16em] text-on-invert uppercase"
          >
            Order
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeSwitch />
          <button
            type="button"
            className="px-2 py-1 text-[13px]"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open ? (
        <ul className="border-t border-line px-5 py-3 md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-[16px]"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" onClick={() => setOpen(false)} className="block py-2.5 text-[16px]">
              Order
            </Link>
          </li>
        </ul>
      ) : null}
    </header>
  );
}
