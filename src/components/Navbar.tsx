"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/site";

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
        scrolled
          ? "border-b border-cocoa/10 bg-ivory/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8"
        aria-label="Primary"
      >
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-script text-3xl text-cocoa group-hover:text-rose">
            {siteConfig.name}
          </span>
          <span className="mt-1 text-[10px] tracking-[0.28em] text-cocoa/55 uppercase">
            Home bakery · eggless
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`relative text-sm tracking-wide transition-colors ${
                    active ? "text-cocoa" : "text-cocoa/60 hover:text-cocoa"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-px w-full bg-gold"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className="hidden rounded-full bg-cocoa px-4 py-2 text-xs tracking-[0.16em] text-foam uppercase transition hover:bg-ink md:inline-flex"
        >
          Order inquiry
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/15 text-cocoa md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Toggle menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={`h-px w-4 bg-cocoa transition ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-cocoa transition ${open ? "-translate-y-0.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-cocoa/10 bg-ivory md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-lg text-cocoa"
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
