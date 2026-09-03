import { REVIEWS, type Review } from "./reviews";
import { SERVICES, type Service } from "./services";

export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  serviceSlug: "kitchens-bathrooms" | "tv-walls-lighting-panels" | "flooring-tiling" | "legal-basements";
  neighbourhood: string;
  propertyType: string;
  scope: string[];
  completed: string; // Dated Month + Year (Stage 4 proof)
  duration: string; // Specific on-site timeframe (Stage 1 & 4 proof)
  summary: string;
  description: string[];
  heroImage: string;
  images: ProjectImage[];
  reviewName?: string;
  beforeImages?: ProjectImage[];
  draft: boolean;
  imageDraft: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "westboro-custom-kitchen",
    title: "Walnut & Quartz Kitchen Renovation",
    serviceSlug: "kitchens-bathrooms",
    neighbourhood: "Westboro",
    propertyType: "1980s Detached Two-Storey",
    scope: [
      "Custom walnut cabinetry fitted to ceiling",
      "Quartz waterfall island & solid counters",
      "Concealed LED under-cabinet task lighting",
      "Large-format porcelain tile floor",
      "Subfloor leveling & plumbing reconfiguration",
    ],
    completed: "October 2024",
    duration: "3 weeks on site",
    summary:
      "A complete kitchen transformation in Westboro featuring precision walnut millwork, quartz waterfall surfaces, and flush tile transitions.",
    description: [
      "The homeowners wanted to open up a compartmentalized 1980s kitchen and create a warm, modern cooking and entertaining space with clean lines and maximum storage.",
      "We stripped the room to the studs, leveled an uneven subfloor across the adjoining dining room, and relocated plumbing and electrical rough-ins with our licensed trade partners. Custom walnut cabinetry was built and scribed on site to align seamlessly with the ceiling without gaps.",
      "The result is a bright, functional space anchored by a quartz waterfall island and concealed ambient lighting that elevates everyday living.",
    ],
    heroImage: "/assets/portfolio-kitchen.jpg",
    images: [
      {
        src: "/assets/portfolio-kitchen.jpg",
        alt: "Fitted walnut kitchen with quartz waterfall island in Westboro",
        caption: "Custom walnut cabinetry scribed tight to ceiling with integrated task lighting",
      },
      {
        src: "/assets/craft-kitchen.jpg",
        alt: "Countertop and undermount sink detailing",
        caption: "Quartz waterfall counter templated to tight tolerances with undermount sink",
      },
      {
        src: "/assets/fullbleed-kitchen.jpg",
        alt: "Pantry pullouts and seamless joinery",
        caption: "Concealed soft-close pantry storage and precision tile floor alignment",
      },
    ],
    reviewName: "Arman Sandhu",
    draft: true,
    imageDraft: true,
  },
  {
    slug: "barrhaven-deck-custom-shelving",
    title: "Backyard Deck & Custom Walnut Floating Shelves",
    serviceSlug: "kitchens-bathrooms",
    neighbourhood: "Barrhaven",
    propertyType: "Modern Suburban Two-Storey",
    scope: [
      "Custom outdoor entertaining deck",
      "Solid walnut floating bedroom shelves",
      "Concealed internal steel rod mounting",
      "Precision mitred trim & hand-finished edges",
    ],
    completed: "July 2024",
    duration: "1.5 weeks on site",
    summary:
      "Custom exterior deck construction paired with hand-crafted solid walnut floating shelves in Barrhaven.",
    description: [
      "This Barrhaven project combined exterior carpentry with precision interior joinery. The client needed a durable, beautiful outdoor entertaining deck as well as custom architectural bedroom shelving.",
      "The deck was framed with solid timber footings and tight, clean board spacing. For the interior, we milled solid walnut floating shelves with internal steel bracket mortises, allowing clean, bracketless spans that hold heavy loads securely.",
      "Both interior and exterior elements were completed ahead of schedule with zero mess left on site.",
    ],
    heroImage: "/assets/portfolio-deck.jpg",
    images: [
      {
        src: "/assets/portfolio-deck.jpg",
        alt: "Outdoor deck and custom woodwork in Barrhaven",
        caption: "Solid timber deck construction with clean edge mitres and sturdy footing",
      },
      {
        src: "/assets/craft-wardrobe.jpg",
        alt: "Solid walnut floating shelving",
        caption: "Hand-finished walnut floating shelves mounted securely with concealed brackets",
      },
    ],
    reviewName: "Sumeta Saroya",
    draft: true,
    imageDraft: true,
  },
];

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByService(serviceSlug: string): Project[] {
  return PROJECTS.filter((p) => p.serviceSlug === serviceSlug);
}

export function getRelatedProjects(currentSlug: string, limit = 2): Project[] {
  return PROJECTS.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

export function getProjectReview(project: Project): Review | undefined {
  if (!project.reviewName) return undefined;
  return REVIEWS.find((r) => r.name.toLowerCase() === project.reviewName?.toLowerCase());
}

export function getProjectService(project: Project): Service | undefined {
  return SERVICES.find((s) => s.slug === project.serviceSlug);
}
