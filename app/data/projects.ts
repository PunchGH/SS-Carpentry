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
  {
    slug: "kanata-basement-living-suite",
    title: "Full Basement Suite & Recreation Room",
    serviceSlug: "legal-basements",
    neighbourhood: "Kanata",
    propertyType: "2000s Single Family Home",
    scope: [
      "Subfloor insulation & moisture barrier",
      "Framing, drywall & acoustic soundproofing",
      "Recessed pot lights & electrical sub-panel",
      "Luxury vinyl plank flooring throughout",
      "Full 3-piece bathroom with custom tile shower",
    ],
    completed: "May 2024",
    duration: "5 weeks on site",
    summary:
      "Transforming an unfinished concrete basement in Kanata into a warm, fully compliant living suite and recreation area.",
    description: [
      "The goal was to convert an empty, chilly unfinished basement into a versatile family entertainment suite and guest quarters with an added full bathroom.",
      "We framed the perimeter with thermal break insulation, installed acoustic insulation in the ceiling joists to isolate noise from upstairs, and coordinated all electrical and plumbing rough-ins with certified trades.",
      "High-grade luxury vinyl plank was laid over leveled subfloors, creating a durable, warm living space that feels like a natural continuation of the upper floors.",
    ],
    heroImage: "/assets/portfolio-renovation.jpg",
    images: [
      {
        src: "/assets/portfolio-renovation.jpg",
        alt: "Finished Kanata basement suite and open living area",
        caption: "Open recreation room with smooth ceilings, pot lights, and acoustic insulation",
      },
      {
        src: "/assets/craft-renovation.jpg",
        alt: "Lower level bathroom and hallway transition",
        caption: "Waterproof vinyl plank flooring and custom 3-piece bathroom integration",
      },
    ],
    reviewName: "The Hartley Project",
    draft: true,
    imageDraft: true,
  },
  {
    slug: "rockcliffe-oak-staircase",
    title: "Solid White Oak Staircase & Railings",
    serviceSlug: "flooring-tiling",
    neighbourhood: "Rockcliffe Park",
    propertyType: "Contemporary Executive Residence",
    scope: [
      "Solid white oak treads & risers",
      "Concealed stringer fastening",
      "Architectural matte black iron spindles",
      "Custom profiled handrail with satin polyurethane finish",
    ],
    completed: "September 2024",
    duration: "1 week on site",
    summary:
      "A tailored white oak staircase rebuild in Rockcliffe Park featuring clean lines, silent tread anchoring, and modern iron spindles.",
    description: [
      "The original stairs suffered from loose treads, squeaks, and outdated carpet covering. The homeowner requested a clean, architectural timber focal point that connected the main floor to the second level.",
      "We disassembled the carpeted structure down to the framing, reinforced stringers to eliminate squeaking permanently, and fitted solid white oak treads scribed to the walls.",
      "The handrail was custom milled and finished with a durable matte polyurethane seal for a silky, hand-smooth touch.",
    ],
    heroImage: "/assets/portfolio-staircase.jpg",
    images: [
      {
        src: "/assets/portfolio-staircase.jpg",
        alt: "Solid white oak staircase with black iron spindles in Rockcliffe Park",
        caption: "Solid white oak treads fitted to reinforced stringers with zero squeaks",
      },
      {
        src: "/assets/craft-staircase.jpg",
        alt: "Handrail joinery and finish detail",
        caption: "Custom milled handrail with satin protective finish and modern iron spindles",
      },
    ],
    draft: true,
    imageDraft: true,
  },
  {
    slug: "glebe-acoustic-media-wall",
    title: "Acoustic Slat Media Wall & Concealed Storage",
    serviceSlug: "tv-walls-lighting-panels",
    neighbourhood: "The Glebe",
    propertyType: "Century Brick Home",
    scope: [
      "Natural oak acoustic wood slat panelling",
      "Internal stud blocking for 75-inch screen",
      "Concealed in-wall power & HDMI conduits",
      "Diffused warm-white LED backlighting",
      "Integrated floating lower media console",
    ],
    completed: "November 2024",
    duration: "4 days on site",
    summary:
      "Custom acoustic slat feature wall with flush TV mounting, indirect backlighting, and 100% hidden cable management in The Glebe.",
    description: [
      "Designed for a homeowner looking to declutter their living room while improving room acoustics and adding modern architectural character.",
      "We installed solid internal wood blocking to anchor the 75-inch television flush against the wall, ran hidden in-wall conduits to route all gaming consoles and audio receivers into a floating lower console, and integrated recessed LED channel diffusers.",
      "The natural oak acoustic slats add texture and warmth without a single visible cable or exposed power outlet.",
    ],
    heroImage: "/assets/portfolio-wardrobe.jpg",
    images: [
      {
        src: "/assets/portfolio-wardrobe.jpg",
        alt: "Acoustic wood slat feature wall and floating cabinetry in The Glebe",
        caption: "Natural oak slat wall with fully concealed wiring and flush television mount",
      },
      {
        src: "/assets/craft-wardrobe.jpg",
        alt: "Floating media credenza and LED lighting",
        caption: "Floating console with soft-close drawers and indirect ambient LED backlighting",
      },
    ],
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
