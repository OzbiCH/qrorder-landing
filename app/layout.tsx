import type { Metadata } from "next";
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
        {/* Google Site Verification (füge dein Token ein wenn du eins bekommst) */}
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}
        
        {/* Favicon */}
        <link rel="icon" href="/tabscan-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/tabscan-icon.png" />
        
        {/* Additional SEO */}
        <meta name="theme-color" content="#DC2626" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}