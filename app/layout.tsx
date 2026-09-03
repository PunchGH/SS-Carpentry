import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { ScrollReveal } from "./components/ScrollReveal";
import { COMPANY } from "./data/company";
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
    default: "SS Carpentry and Renovations | Kitchen, Bathroom & Renovation Contractor in Ottawa",
    template: "%s | SS Carpentry and Renovations",
  },
  description:
    "SS Carpentry and Renovations — custom architectural millwork, TV feature walls, kitchen & bathroom renovations, flooring and legal basement secondary suites in Ottawa, ON. Owner-led precision with a 5.0★ Google rating.",
  keywords: [
    "SS Carpentry and Renovations",
    "custom millwork Ottawa",
    "architectural media wall Ottawa",
    "TV feature wall Ottawa",
    "slat wall installation Ottawa",
    "custom cabinetry Ottawa",
    "carpenter Ottawa",
    "home renovations Ottawa",
    "kitchen renovation Ottawa",
    "bathroom renovation Ottawa",
    "basement apartment Ottawa",
    "legal basement Ottawa",
    "flooring installation Ottawa",
    "tile installation Ottawa",
    "owner operated renovations Ottawa",
    "Travertine Way Ottawa carpentry",
    "Barrhaven home renovations",
    "Westboro custom carpentry",
    "Kanata home renovations",
    "Ottawa woodworker",
  ],
  authors: [{ name: "SS Carpentry and Renovations", url: "https://sscarpentryandrenovations.com" }],
  creator: "SS Carpentry and Renovations",
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
    title: "SS Carpentry and Renovations | Kitchen, Bathroom & Renovation Contractor in Ottawa",
    description:
      "Custom architectural millwork, TV feature walls, kitchen & bathroom renovations, flooring, and legal secondary suites in Ottawa. Owner-led precision with 5.0★ Google reviews.",
    url: "https://sscarpentryandrenovations.com",
    siteName: "SS Carpentry and Renovations",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 800,
        type: "image/jpeg",
        alt: "SS Carpentry and Renovations - Website Snapshot & Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SS Carpentry and Renovations | Kitchen, Bathroom & Renovation Contractor in Ottawa",
    description:
      "Custom architectural millwork, TV feature walls, kitchen & bathroom renovations, flooring, and legal secondary suites in Ottawa. 5.0★ Google rated owner-led craftsmanship.",
    images: ["/assets/og-image.jpg"],
    creator: "@SSCarpentry",
  },
  other: {
    "geo.region": "CA-ON",
    "geo.placename": "Ottawa",
    "geo.position": `${COMPANY.geo.latitude};${COMPANY.geo.longitude}`,
    ICBM: `${COMPANY.geo.latitude}, ${COMPANY.geo.longitude}`,
    "format-detection": "telephone=yes",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: COMPANY.name,
  image: "https://sscarpentryandrenovations.com/assets/og-image.jpg",
  logo: "https://sscarpentryandrenovations.com/assets/ss-logo-cropped.png",
  description:
    "Custom architectural millwork, built-in TV feature walls, kitchen and bathroom renovations, flooring and tiling, and legal basement secondary suites in Ottawa, ON. Hand-crafted with owner-led precision.",
  telephone: COMPANY.phones[0].href.replace("tel:", ""),
  email: COMPANY.email,
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
    latitude: COMPANY.geo.latitude,
    longitude: COMPANY.geo.longitude,
  },
  // TODO(owner): opening hours, copied verbatim from the Google Business Profile.
  // Removed rather than guessed: the previous value claimed Mon-Sat 08:00-18:00,
  // which contradicts the only sourced data we have (companyinfo.md: "Opens 9 AM").
  // Wrong hours in schema surface directly in Google and conflict with the GBP,
  // so this stays out until the real weekly schedule is read off the profile.
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Renovation and Carpentry Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Kitchens & Bathrooms",
          url: "https://sscarpentryandrenovations.com/services/kitchens-bathrooms",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "TV Walls & Custom Millwork",
          url: "https://sscarpentryandrenovations.com/services/tv-walls-lighting-panels",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Flooring & Tiling",
          url: "https://sscarpentryandrenovations.com/services/flooring-tiling",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Legal Basements",
          url: "https://sscarpentryandrenovations.com/services/legal-basements",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: COMPANY.rating.toFixed(1),
    reviewCount: String(COMPANY.reviewCount),
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
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}


