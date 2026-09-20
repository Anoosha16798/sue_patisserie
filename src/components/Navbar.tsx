"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/site";
import { ThemeSwitch } from "@/components/ThemeProvider";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-bg/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 md:px-8"
        aria-label="Primary"
      >
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-script text-3xl text-fg group-hover:text-accent">
            {siteConfig.name}
          </span>
          <span className="mt-1 text-[10px] tracking-[0.28em] text-muted uppercase">
            Eggless · scratch-made
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`relative text-sm tracking-wide ${
                    active ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-px w-full bg-accent"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeSwitch />
          <Link
            href="/contact"
            className="rounded-full bg-invert px-4 py-2 text-xs tracking-[0.16em] text-on-invert uppercase"
          >
            Order
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeSwitch />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Toggle menu</span>
            <span className="flex flex-col gap-1.5">
              <span className={`h-px w-4 bg-fg transition ${open ? "translate-y-1 rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-fg transition ${open ? "-translate-y-0.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-bg md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-lg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
