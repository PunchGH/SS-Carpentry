import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#0a0908",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sscarpentryandrenovations.com"),
  title: "SS Carpentry and Renovations | Bespoke Carpentry in Ottawa",
  description:
    "SS Carpentry and Renovations — bespoke kitchens, custom staircases, fitted wardrobes and full home renovations in Ottawa, Canada. Owner-led master craftsmanship by Akash.",
  keywords: [
    "SS Carpentry and Renovations",
    "carpenter Ottawa",
    "bespoke kitchens Ottawa",
    "home renovations Ottawa",
    "custom staircases Ottawa",
    "fitted wardrobes Ottawa",
    "carpentry Travertine Way Ottawa",
    "Akash carpenter",
  ],
  authors: [{ name: "Akash - SS Carpentry and Renovations" }],
  creator: "SS Carpentry and Renovations",
  icons: {
    icon: [
      { url: "/assets/ss-mark-tight.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/assets/ss-mark-tight.png",
    apple: [
      { url: "/assets/ss-mark-tight.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "SS Carpentry and Renovations | Bespoke Carpentry & Renovations in Ottawa",
    description:
      "Hand-built kitchens, custom staircases, fitted wardrobes, and full renovations in Ottawa crafted with owner-led precision.",
    url: "https://sscarpentryandrenovations.com",
    siteName: "SS Carpentry and Renovations",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SS Carpentry and Renovations - Bespoke Craftsmanship in Ottawa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SS Carpentry and Renovations | Ottawa Bespoke Carpentry",
    description:
      "Hand-built bespoke kitchens, staircases, wardrobes and renovations in Ottawa. Direct owner craft with a 5.0★ Google rating.",
    images: ["/assets/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <link rel="icon" href="/assets/ss-mark-tight.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/ss-mark-tight.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}

