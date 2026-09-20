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
        scrolled ? "border-b border-line bg-bg/90 backdrop-blur-sm" : "bg-bg"
      }`}
    >
      <nav
        className="mx-auto flex max-w-[980px] items-center justify-between px-5 py-4 md:px-8"
        aria-label="Primary"
      >
        <Link href="/" className="font-display text-[1.45rem] tracking-[0.04em]">
          {siteConfig.name}
        </Link>

        <ul className="hidden items-center gap-8 text-[13px] tracking-[0.08em] md:flex">
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
          <Link href="/contact" className="text-[13px] tracking-[0.08em]">
            Order
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
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
                className="block py-2 text-[15px]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
