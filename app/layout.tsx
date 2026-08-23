import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO Metadata für TabScan
export const metadata: Metadata = {
  // Basic Meta Tags
  title: "TabScan - Digitale Lösungen für Gastronomie",
  description: "Die Schweizer Speisekarten-Lösung für Restaurants. Digitale Menüs, QR-Codes, Bestellsystem & Kitchen Display. Made in Switzerland.",
  keywords: "digitale Speisekarte, QR Code Menü, Restaurant Bestellsystem, Gastronomie Software, Schweiz, TabScan",
  
  // Canonical URL
  alternates: {
    canonical: "https://tabscan.ch",
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: "https://tabscan.ch",
    siteName: "TabScan",
    title: "TabScan - Digitale Lösungen für Gastronomie",
    description: "Die Schweizer Speisekarten-Lösung für Restaurants. Digitale Menüs, QR-Codes, Bestellsystem & Kitchen Display.",
    images: [
      {
        url: "https://tabscan.ch/tabscan-logo.png",
        width: 1200,
        height: 630,
        alt: "TabScan Logo - Digitale Lösungen für Gastronomie",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "TabScan - Digitale Lösungen für Gastronomie",
    description: "Die Schweizer Speisekarten-Lösung für Restaurants.",
    images: ["https://tabscan.ch/tabscan-logo.png"],
  },

  // Viewport & Other Meta Tags
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  
  // Metadata Base
  metadataBase: new URL("https://tabscan.ch"),
  
  // Application Name
  applicationName: "TabScan",
  formatDetection: {
    telephone: false,
  },

  // Additional SEO
  authors: [
    {
      name: "TabScan",
      url: "https://tabscan.ch",
    },
  ],
  creator: "Ozbi Gruppe",
  publisher: "TabScan",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* ========== GOOGLE ANALYTICS ========== */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6JPK6V01JT"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6JPK6V01JT', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* ========== GOOGLE SEARCH CONSOLE ========== */}
        {/* WICHTIG: Diese Verification muss du nach Setup in Google Search Console erhalten */}
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}
        
        {/* ========== FAVICON ========== */}
        <link rel="icon" href="/tabscan-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/tabscan-icon.png" />
        
        {/* ========== SITEMAP & ROBOTS ========== */}
        <link rel="sitemap" href="https://tabscan.ch/sitemap.xml" />
        
        {/* ========== ADDITIONAL SEO ========== */}
        <meta name="theme-color" content="#DC2626" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* ========== LANGUAGE ALTERNATIVES ========== */}
        <link rel="alternate" hrefLang="de-CH" href="https://tabscan.ch" />
        <link rel="alternate" hrefLang="x-default" href="https://tabscan.ch" />
        
        {/* ========== SCHEMA.ORG STRUCTURED DATA ========== */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "TabScan",
              description: "Digitale Speisekarten-Lösung für Restaurants",
              url: "https://tabscan.ch",
              applicationCategory: "BusinessApplication",
              offers: {
                "@type": "Offer",
                priceCurrency: "CHF",
                price: "49",
                description: "Starting from CHF 49/month"
              },
              author: {
                "@type": "Organization",
                name: "TabScan",
                url: "https://tabscan.ch",
                logo: "https://tabscan.ch/tabscan-logo.png"
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "50"
              }
            })
          }}
        />

        {/* ========== ORGANIZATION SCHEMA ========== */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TabScan",
              url: "https://tabscan.ch",
              logo: "https://tabscan.ch/tabscan-logo.png",
              description: "Swiss digital solutions for restaurants",
              sameAs: [
                "https://www.linkedin.com/company/tabscan",
                "https://www.twitter.com/tabscan"
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                email: "info@ozbi.ch"
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "CH",
                addressLocality: "Switzerland"
              }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}