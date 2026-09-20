import type { NavLink, SocialLink } from "@/types/menu";

export const siteConfig = {
  name: "Sue Patisserie",
  tagline: "100% eggless · scratch-made · wildly customizable",
  description:
    "Sue Patisserie is a premium home bakery crafting 100% eggless, scratch-made custom cakes and artisanal desserts with Amul butter, fresh cream, and fine chocolates.",
  url: "https://suepatisserie.example.com",
  locale: "en_IN",
  phoneDisplay: "+91 98450 16798",
  phoneHref: "tel:+919845016798",
  whatsappHref: "https://wa.me/919845016798",
  email: "hello@suepatisserie.com",
  address: "Home atelier, Bengaluru — made to order, pan-city delivery",
  hours: "Orders: Tue–Sun, 10:00–19:00 IST · 48-hour notice preferred",
} as const;

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://instagram.com/suepatisserie",
    label: "@suepatisserie",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/919845016798",
    label: "Chat for custom cakes",
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/suepatisserie",
    label: "Moodboards & florals",
  },
];

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
