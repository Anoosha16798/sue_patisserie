import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Eggless cake menu`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "eggless bakery menu",
    "custom cakes Bengaluru",
    "whipped cream frosting",
    "buttercream frosting",
    "Sue Patisserie",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Eggless cake menu`,
    description: siteConfig.description,
    images: [{ url: "/images/real-gold-side.jpg", width: 1200, height: 630, alt: "Sue Patisserie chocolate cake" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Eggless cake menu`,
    description: siteConfig.description,
    images: ["/images/real-gold-side.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phoneDisplay,
  email: siteConfig.email,
  menu: `${siteConfig.url}/menu`,
  servesCuisine: "Eggless desserts",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
};

const themeBoot = `(function(){try{var t=localStorage.getItem('sue-theme');if(t==='white'||t==='dark'||t==='pastel'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','white');}}catch(e){document.documentElement.setAttribute('data-theme','white');}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="white"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-fg">
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
