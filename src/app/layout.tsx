import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | 100% eggless cakes in Bengaluru`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Sue Patisserie",
    "eggless bakery Bengaluru",
    "eggless birthday cake",
    "custom theme cakes",
    "whipped cream frosting",
    "buttercream frosting",
    "professional certified baker Bengaluru",
    "eggless brownies",
    "eggless cheesecake",
    "baby shower cake",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | 100% eggless cakes in Bengaluru`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/real-gold-side.jpg",
        width: 1200,
        height: 630,
        alt: "Gold-dusted chocolate cake from Sue Patisserie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | 100% eggless cakes in Bengaluru`,
    description: siteConfig.description,
    images: ["/images/real-gold-side.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Bakery",
      "@id": `${siteConfig.url}/#bakery`,
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      image: `${siteConfig.url}/images/real-gold-side.jpg`,
      telephone: siteConfig.phoneDisplay,
      email: siteConfig.email,
      priceRange: "₹₹",
      servesCuisine: ["Eggless desserts", "Indian bakery"],
      menu: `${siteConfig.url}/menu`,
      sameAs: ["https://instagram.com/sue_patisserie"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "10:00",
        closes: "19:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: { "@id": `${siteConfig.url}/#bakery` },
    },
  ],
};

const themeBoot = `(function(){try{var t=localStorage.getItem('sue-theme');if(t==='dark')t='black';if(t==='white'||t==='black'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','white');}}catch(e){document.documentElement.setAttribute('data-theme','white');}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="white"
      suppressHydrationWarning
      className={`${display.variable} ${script.variable} ${body.variable} h-full antialiased`}
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
