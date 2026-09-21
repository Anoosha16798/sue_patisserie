import type { NavLink, SocialLink } from "@/types/menu";

export const siteConfig = {
  name: "Sue Patisserie",
  tagline: "100% eggless · scratch-made · wildly customizable",
  description:
    "Sue Patisserie is a professional certified baker in Bengaluru. 100% eggless cakes, brownies, macarons and desserts, made from scratch with Amul butter, Amul fresh cream and premium chocolates. No premixes. Custom birthday, wedding, baby shower and theme cakes.",
  url: "https://suepatisserie.example.com",
  locale: "en_IN",
  phoneDisplay: "+91 1234567890",
  phoneHref: "tel:+911234567890",
  whatsappHref: "https://wa.me/911234567890",
  email: "hello@suepatisserie.com",
  address: "Bengaluru — made to order, pan-city delivery",
  hours: "Orders: Tue–Sun, 10:00–19:00 IST · 48-hour notice preferred",
  instagram: "@sue_patisserie",
} as const;

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://instagram.com/sue_patisserie",
    label: "@sue_patisserie",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/911234567890",
    label: "Chat for custom cakes",
  },
];

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
