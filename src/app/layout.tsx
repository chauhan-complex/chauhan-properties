import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import FloatingDock from "@/components/floating-dock";
import { LangProvider } from "@/components/lang-provider";
import { ScrollProgress } from "@/components/primitives";
import { SITE } from "@/data/site";
import { getStats } from "@/lib/data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://chauhan.qd.je";

export const viewport: Viewport = {
  themeColor: "#0c1613",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: `${SITE.businessName} — Property Dealers in Sarojini Nagar, Lucknow`,
    template: `%s · ${SITE.businessName}`,
  },
  description: `${SITE.tagline} Land and plots at per sq.ft rates in Amausi, Gauri, Miranpur Pinwat, Aurawan and Piparsand. ${SITE.portfolioTotal} properties handled, ${getStats().total} published here. Call ${SITE.phone}.`,
  keywords: [
    "property dealers in Lucknow",
    "land for sale Sarojini Nagar",
    "plot Amausi Lucknow",
    "Miranpur Pinwat land rate",
    "Aurawan plot",
    "Piparsand land",
    "Gauri Lucknow property",
    "chauhan properties lucknow",
  ],
  openGraph: {
    title: `${SITE.businessName} — Land & property, Sarojini Nagar, Lucknow`,
    description: SITE.tagline,
    type: "website",
    locale: "en_IN",
    siteName: SITE.businessName,
    url: BASE,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/**
 * Sets <html lang> from the visitor's language cookie before the first paint,
 * so the CSS language switch (see globals.css) shows the right language
 * immediately — no flash, no server needed.
 */
const langScript = `(function(){try{var m=document.cookie.match(/(?:^|;\\s*)cp-lang=(hi|en)/);if(m&&m[1]==="hi"){document.documentElement.lang="hi";}}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  const stats = getStats();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.businessName,
    description: SITE.aboutShort,
    telephone: SITE.phone,
    email: SITE.email,
    url: BASE,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.officeAddress.replace(/,?\s*\n\s*/g, ", "),
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      postalCode: "226008",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 26.7458896, longitude: 80.8612501 },
    areaServed: ["Amausi", "Gauri", "Miranpur Pinwat", "Aurawan", "Piparsand", "Sarojini Nagar"],
    priceRange: "₹₹",
    openingHours: "Mo-Sa 10:00-20:00",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grain bg-paper text-ink antialiased">
        <LangProvider initialLang="en">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-cream"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <SiteHeader settings={SITE} />
          <main id="main" className="pb-16 md:pb-0">
            {children}
          </main>
          <SiteFooter published={stats.total} />
          <FloatingDock phone={SITE.phone} whatsapp={SITE.whatsapp} />
        </LangProvider>
      </body>
    </html>
  );
}
