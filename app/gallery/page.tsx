import type { Metadata } from "next";
import { GalleryView } from "./GalleryView";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Project Gallery & Past Work | SS Carpentry & Renovations Ottawa",
  description:
    "Explore our portfolio of finished carpentry and renovation projects across Ottawa — custom kitchens, finished basements, feature walls, and tailored woodwork.",
  openGraph: {
    title: "Project Gallery | SS Carpentry & Renovations Ottawa",
    description:
      "Explore our portfolio of custom kitchens, basements, feature walls, and carpentry across Ottawa.",
    images: ["/assets/portfolio-kitchen.jpg"],
  },
};

export default function GalleryPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content">
        <GalleryView />
      </main>
      <SiteFooter />
    </>
  );
}
