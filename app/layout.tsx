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
  title: {
    default: "SS Carpentry and Renovations | Bespoke Carpentry in Ottawa",
    template: "%s | SS Carpentry and Renovations",
  },
  description:
    "SS Carpentry and Renovations — bespoke kitchens, custom staircases, luxury fitted wardrobes, and whole-home renovations in Ottawa, ON. Direct master craftsmanship led by owner Akash with a 5.0★ Google rating.",
  keywords: [
    "SS Carpentry and Renovations",
    "carpenter Ottawa",
    "bespoke kitchens Ottawa",
    "custom staircases Ottawa",
    "fitted wardrobes Ottawa",
    "home renovations Ottawa",
    "custom cabinetry Ottawa",
    "millwork Ottawa",
    "Akash carpenter Ottawa",
    "Travertine Way Ottawa carpentry",
    "Barrhaven home renovations",
    "Westboro custom carpentry",
    "Kanata bespoke joinery",
    "Ottawa woodworker",
  ],
  authors: [{ name: "Akash", url: "https://sscarpentryandrenovations.com" }],
  creator: "Akash - SS Carpentry and Renovations",
  publisher: "SS Carpentry and Renovations",
  category: "Construction & Carpentry Services",
  applicationName: "SS Carpentry and Renovations",
  alternates: {
    canonical: "https://sscarpentryandrenovations.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/assets/ss-logo-cropped.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/assets/ss-logo-cropped.png",
    apple: [
      { url: "/assets/ss-logo-cropped.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "SS Carpentry and Renovations | Bespoke Carpentry & Renovations in Ottawa",
    description:
      "Hand-crafted bespoke kitchens, custom staircases, fitted wardrobes, and full home renovations in Ottawa. Owner-led precision by Akash with 5.0★ Google reviews.",
    url: "https://sscarpentryandrenovations.com",
    siteName: "SS Carpentry and Renovations",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "SS Carpentry and Renovations - Website Snapshot & Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SS Carpentry and Renovations | Bespoke Carpentry Ottawa",
    description:
      "Hand-built kitchens, custom staircases, luxury wardrobes and renovations in Ottawa. 5.0★ Google rated owner-led craftsmanship.",
    images: ["/assets/og-image.png"],
    creator: "@SSCarpentry",
  },
  other: {
    "geo.region": "CA-ON",
    "geo.placename": "Ottawa",
    "geo.position": "45.275;-75.733",
    ICBM: "45.275, -75.733",
    "format-detection": "telephone=yes",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "SS Carpentry and Renovations",
  image: "https://sscarpentryandrenovations.com/assets/og-image.png",
  logo: "https://sscarpentryandrenovations.com/assets/ss-logo-cropped.png",
  description:
    "Bespoke kitchens, custom staircases, fitted wardrobes, and whole-home renovations in Ottawa, ON. Hand-crafted with owner-led precision.",
  telephone: "+1-437-288-5105",
  email: "info@sscarpentryandrenovations.com",
  url: "https://sscarpentryandrenovations.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3008 Travertine Way",
    addressLocality: "Ottawa",
    addressRegion: "ON",
    postalCode: "K2J 7G4",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.275,
    longitude: -75.733,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  founder: {
    "@type": "Person",
    name: "Akash",
    jobTitle: "Owner & Master Craftsman",
  },
  priceRange: "$$$",
  areaServed: [
    { "@type": "City", name: "Ottawa" },
    { "@type": "AdministrativeArea", name: "Barrhaven" },
    { "@type": "AdministrativeArea", name: "Westboro" },
    { "@type": "AdministrativeArea", name: "Kanata" },
    { "@type": "AdministrativeArea", name: "Nepean" },
    { "@type": "AdministrativeArea", name: "The Glebe" },
    { "@type": "AdministrativeArea", name: "Rockcliffe Park" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "3",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <link rel="icon" href="/assets/ss-logo-cropped.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/ss-logo-cropped.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}


