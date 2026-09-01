/**
 * THE FOUR SERVICE LINES
 *
 * Drives three things at once — the home page craft cards, the /services/[slug]
 * routes, and each page's SEO metadata. Add a service here and its page exists.
 *
 * FOR WHOEVER FILLS THE REMAINING PAGES: `legal-basements` below is the worked
 * example. Match its depth. Every field marked `draft: true` is a placeholder
 * that renders a visible DRAFT tag — replace the value AND flip the flag when
 * the owner supplies the real answer.
 */

export type PriceBand = {
  from: string;
  typical: string;
  /** What moves the number up or down — friction guide Stage 3. */
  drivers: string[];
  draft: boolean;
};

export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  /** Card + page H1. */
  title: string;
  /** Nav / breadcrumb short form. */
  navLabel: string;
  /** Card eyebrow. */
  badge: string;
  /** Card body. Keep ≤ 110 characters so all four cards match height. */
  blurb: string;
  image: string;
  alt: string;
  /** True while the image doesn't actually depict this service. */
  imageDraft: boolean;
  /** Page lead paragraph. */
  intro: string;
  whatsIncluded: string[];
  /** Explicitly out of scope — friction guide Stage 7, prevents quote disputes. */
  notIncluded: string[];
  steps: { title: string; copy: string }[];
  priceBand: PriceBand;
  faqs: ServiceFaq[];
  seo: { title: string; description: string };
  /** "complete" = written properly. "draft" = skeleton awaiting real copy. */
  contentStatus: "complete" | "draft";
};

export const SERVICES: Service[] = [
  {
    slug: "kitchens-bathrooms",
    title: "Kitchens & Bathrooms",
    navLabel: "Kitchens & Bathrooms",
    badge: "Our signature",
    blurb:
      "Full kitchen and bathroom renovations — cabinetry, counters, tile and fixtures, fitted to the millimetre.",
    image: "/assets/craft-kitchen.jpg",
    alt: "Fitted kitchen renovation in Ottawa",
    imageDraft: false,
    intro:
      "Kitchens and bathrooms are the two rooms where poor workmanship shows every single day. A cabinet slightly out of square, a misaligned tile, or an unsealed transition will cause frustration for years. We handle the full renovation from structural framing and subfloor leveling to precision cabinetry, countertop fitting, and waterproofing behind every tile, ensuring one team owns the finished standard.",
    whatsIncluded: [
      "On-site measurement, layout review, and floor/wall surface assessment",
      "Demolition and clean removal of old cabinetry, surfaces, and fixtures",
      "Subfloor leveling, wall truing, and moisture-resistant backer board installation",
      "Cabinetry assembly, scribing, and secure wall anchoring",
      "Countertop templating coordination and precise installation",
      "Waterproofing systems behind shower and tub surrounds, plus floor and wall tiling",
      "Trim carpentry, door adjustments, drawer tuning, and hardware installation",
      "TODO(owner): confirm — is plumbing rough-in and fixture installation handled in-house or by a licensed trade partner?",
      "TODO(owner): confirm — is electrical rough-in and lighting handled by a licensed ESA/ECRA electrician?",
    ],
    notIncluded: [
      "Supply of major kitchen appliances, range hoods, or decorative lighting unless specified in contract",
      "Structural load-bearing wall removal or beam installation unless engineered drawings and permits are obtained",
      "Remediation of pre-existing hidden damage (e.g. historical water leaks, structural rot, or non-code wiring)",
      "TODO(owner): confirm standard exclusions — are tiles, plumbing fixtures, and vanities supplied by homeowner or contractor?",
    ],
    steps: [
      {
        title: "On-site assessment & scope",
        copy: "We inspect the existing layout, measure room dimensions, check electrical and plumbing positions, and identify any structural constraints before quoting.",
      },
      {
        title: "Itemized quote & schedule",
        copy: "You receive an itemized quote outlining exact scope, allowances, and target build phases. TODO(owner): confirm standard quotation turnaround and deposit schedule.",
      },
      {
        title: "Prep, build & fit",
        copy: "We set up dust barriers, complete demolition, true the framing and subfloors, and fit cabinetry and tile with tight tolerances throughout.",
      },
      {
        title: "Final walkthrough & adjustments",
        copy: "We inspect every door hinge, drawer glide, tile joint, and silicone bead together with you to ensure complete alignment before handover.",
      },
    ],
    priceBand: {
      from: "$00,000",
      typical: "$00,000 – $00,000",
      drivers: [
        "Cabinetry grade — custom millwork vs semi-custom manufactured boxes",
        "Countertop material choice (quartz, granite, porcelain, or laminate)",
        "Whether plumbing stacks or supply lines need relocation within walls or slab",
        "Tile format, shower niche build-outs, and custom glass enclosures",
        "TODO(owner): confirm real starting and typical costs for Ottawa kitchens and bathrooms",
      ],
      draft: true,
    },
    faqs: [
      {
        q: "Can we use the kitchen or bathroom while work is underway?",
        a: "If you have a second bathroom in the home, living on-site is straightforward. For kitchens, we maintain dust barriers and temporary access where possible, but sinks and cooking appliances are decommissioned during active rough-in and cabinet fitting. TODO(owner): confirm standard guidance on on-site living.",
      },
      {
        q: "Do you handle layout changes and moving plumbing lines?",
        a: "Yes. Relocating sinks, dishwashers, or shower drains is common during a renovation. We assess floor joist direction and plumbing clearances during the initial site visit to ensure proposed changes meet Ontario Building Code.",
      },
      {
        q: "Who provides the tile, fixtures, and cabinetry?",
        a: "We can work with homeowner-supplied materials or source directly through local trade suppliers. Finalizing selections before demolition ensures all items are on-site without stalling work.",
      },
      {
        q: "How long does a typical kitchen or bathroom renovation take?",
        a: "TODO(owner): confirm realistic project timelines for typical Ottawa kitchen and bathroom renovations.",
      },
    ],
    seo: {
      title: "Kitchen & Bathroom Renovations in Ottawa",
      description:
        "Full kitchen and bathroom renovations in Ottawa — cabinetry, counters, tiling and fixtures, fitted by one team. Free estimate.",
    },
    contentStatus: "draft",
  },

  {
    slug: "tv-walls-lighting-panels",
    title: "TV Walls & Lighting Panels",
    navLabel: "TV Walls & Lighting",
    badge: "Feature work",
    blurb:
      "Built-in media walls and backlit panelling — cable managed, mounted flush, lit the way you want it.",
    // TODO(owner): placeholder image — shows joinery, not a media wall.
    image: "/assets/craft-wardrobe.jpg",
    alt: "Placeholder image — awaiting TV wall photography",
    imageDraft: true,
    intro:
      "A custom media feature wall integrates screens, soundbars, consoles, and ambient lighting into a clean architectural feature. Eliminating visible cords requires solid internal framing, dedicated in-wall cable conduits, precision panel joints, and concealed LED extrusion channels that cast soft indirect light without exposed wiring.",
    whatsIncluded: [
      "On-site assessment of wall dimensions, screen size, soundbar, and component layout",
      "Structural timber framing and solid wood blocking to anchor screens and floating cabinetry",
      "In-wall cable management conduits with access boxes for complete wire concealment",
      "Precision installation of acoustic slat wall panels, architectural wood veneer, or painted panels",
      "Integrated LED extrusion channels with diffusers for clean accent backlighting",
      "Secure flush mounting of television brackets and floating media consoles",
      "TODO(owner): confirm — is high-voltage outlet installation handled by a licensed trade partner?",
    ],
    notIncluded: [
      "Televisions, audio receivers, gaming consoles, soundbars, and streaming devices",
      "Audio/video system calibration and home automation network configuration",
      "Structural modifications to exterior walls or load-bearing studs without engineering approval",
      "TODO(owner): confirm exclusions — are TV brackets and LED controllers supplied by homeowner or contractor?",
    ],
    steps: [
      {
        title: "Design & equipment review",
        copy: "We measure the wall, note your screen model, audio gear, and storage preferences, and select panel materials, wood species, and lighting layout.",
      },
      {
        title: "Specification & quote",
        copy: "You receive a clear specification with dimensions, finish details, and fixed pricing. TODO(owner): confirm quote lead time.",
      },
      {
        title: "Framing & wiring rough-in",
        copy: "We install internal stud blocking, run concealed cable chase pathways, and prepare low-voltage LED channel housings.",
      },
      {
        title: "Panelling & screen mounting",
        copy: "Decorative panels are scribed and fitted, lighting diffusers installed, and the TV bracket is leveled and test-mounted flush.",
      },
    ],
    priceBand: {
      from: "$0,000",
      typical: "$0,000 – $00,000",
      drivers: [
        "Overall wall width, ceiling height, and room symmetry",
        "Panel materials (natural wood acoustic slats, architectural fluting, stone veneer, or painted finish)",
        "Inclusion of integrated floating lower cabinets, soft-close drawers, or electric fireplaces",
        "Number of independent LED lighting zones, drivers, and dimmer controls",
        "TODO(owner): confirm real starting and typical costs for feature walls in Ottawa",
      ],
      draft: true,
    },
    faqs: [
      {
        q: "Will all cables and power cords be completely hidden?",
        a: "Yes. We install dedicated in-wall conduits between your television and media console, allowing HDMI and power cables to pass through without visible wires.",
      },
      {
        q: "Can the wall support large screens (75″ to 85″+)?",
        a: "Yes. We install solid structural blocking tied into wall studs behind the decorative panel, engineered to safely carry large displays and articulating brackets.",
      },
      {
        q: "Can we integrate an electric fireplace or floating console?",
        a: "Yes. Recessed electric fireplaces, soundbar niches, and custom floating credenzas can be framed directly into the feature wall design.",
      },
      {
        q: "How are the LED lights controlled?",
        a: "LED accent lighting can connect to a wall switch, a wireless remote, or smart home lighting systems. TODO(owner): confirm standard lighting controllers used.",
      },
      {
        q: "How long does installation take?",
        a: "TODO(owner): confirm typical on-site installation timeframe (e.g. 2 to 4 days).",
      },
    ],
    seo: {
      title: "TV Feature Walls & Lighting Panels in Ottawa",
      description:
        "Built-in TV feature walls and backlit panelling in Ottawa — cable managed and flush mounted. Free estimate.",
    },
    contentStatus: "draft",
  },

  {
    slug: "flooring-tiling",
    title: "Flooring & Tiling",
    navLabel: "Flooring & Tiling",
    badge: "Surfaces",
    blurb:
      "Hardwood, engineered, vinyl and tile — levelled properly underneath so the finish lasts.",
    // TODO(owner): placeholder image — needs a flooring or tiling job.
    image: "/assets/portfolio-kitchen.jpg",
    alt: "Placeholder image — awaiting flooring and tiling photography",
    imageDraft: true,
    intro:
      "Most flooring and tile failures start in the subfloor. Hollow sounds, cracked grout lines, squeaking boards, and separating seams are almost always caused by uneven or flexible subfloors. We inspect, screw down, level, and waterproof the subfloor before laying hardwood, engineered planks, luxury vinyl, or porcelain tile so the finished surface stays stable and flat.",
    whatsIncluded: [
      "Subfloor deflection inspection, moisture testing, and level checking prior to install",
      "Removal and disposal of existing flooring, underlayment, and old tack strips",
      "Subfloor preparation — screwing down loose subfloor sheets, grinding high spots, and applying self-leveling compound to low areas",
      "Uncoupling membranes and waterproof underlayment for tile to prevent substrate movement and cracked grout",
      "Precision cutting, expansion gap allowances around perimeters, and layout alignment across adjoining rooms",
      "Baseboard and shoe molding removal and reinstall, or fitting of new trim",
      "TODO(owner): confirm — do you supply flooring materials or fit customer-supplied products?",
    ],
    notIncluded: [
      "Structural joist replacement or foundation leveling unless specifically quoted",
      "Moving heavy specialist items (e.g. pianos or pool tables) without prior agreement",
      "Supply of specialty tiles, hardwood planks, or transitions unless agreed in the materials schedule",
      "TODO(owner): confirm standard exclusions regarding disposal fees and appliance disconnection",
    ],
    steps: [
      {
        title: "Measure & subfloor check",
        copy: "We measure square footage, check transition heights between rooms, test subfloor flatness with a straightedge, and inspect door clearances.",
      },
      {
        title: "Itemized quote",
        copy: "You receive an estimate detailing square footage, subfloor prep requirements, trim transitions, and waste factor. TODO(owner): confirm quote turnaround time.",
      },
      {
        title: "Prep & installation",
        copy: "Old flooring is removed, subfloors are reinforced and leveled, underlayment or membranes are set, and planks or tiles are installed to specification.",
      },
      {
        title: "Trim & walkthrough",
        copy: "Baseboards and transition thresholds are installed, tile grout is sealed, and we walk the completed floor with you.",
      },
    ],
    priceBand: {
      from: "$0.00 / sq ft",
      typical: "$0.00 – $00.00 / sq ft",
      drivers: [
        "Extent of subfloor leveling and repair required before installation",
        "Material type (luxury vinyl plank, engineered hardwood, solid hardwood, porcelain, or large-format tile)",
        "Installation pattern (straight, diagonal, herringbone, or chevron)",
        "Number of doorways, stair transitions, and custom floor vents to integrate",
        "TODO(owner): confirm real starting and typical labor/material rates per sq ft in Ottawa",
      ],
      draft: true,
    },
    faqs: [
      {
        q: "Why is subfloor preparation so important?",
        a: "Even premium flooring will fail if installed over an uneven or flexible subfloor. Luxury vinyl planks can separate at locking joints, hardwood can squeak, and tile grout will crack. Leveling and reinforcing the subfloor prevents these failures before installation begins.",
      },
      {
        q: "Can you install new tile over existing tile or vinyl?",
        a: "We do not recommend tiling over existing finished floors. Removing old layers down to the wooden subfloor or concrete slab and installing an uncoupling membrane ensures long-term bond strength and avoids awkward floor height changes at doorways.",
      },
      {
        q: "Do you reinstall baseboards and trim after flooring is installed?",
        a: "Yes. We can remove and reinstall existing baseboards, install new shoe molding, or supply and install new baseboards to match your updated space.",
      },
      {
        q: "How long after installation before we can walk on the floors?",
        a: "Floating luxury vinyl and click engineered floors can be walked on immediately. Glued hardwood and tiled surfaces typically require 24 to 48 hours for adhesives and grout to cure. TODO(owner): confirm specific curing recommendations.",
      },
      {
        q: "How long does a typical flooring or tiling job take?",
        a: "TODO(owner): confirm realistic turnaround time based on average room/home square footage in Ottawa.",
      },
    ],
    seo: {
      title: "Flooring & Tiling Installation in Ottawa",
      description:
        "Hardwood, engineered, vinyl and tile installation in Ottawa, with proper subfloor preparation. Free estimate.",
    },
    contentStatus: "draft",
  },

  /* ─────────────────────────────────────────────────────────────
     WORKED EXAMPLE — match this depth for the three pages above.
     This page targets the feasibility questions homeowners search
     before they ever look for a contractor (friction guide Stage 2).
     ───────────────────────────────────────────────────────────── */
  {
    slug: "legal-basements",
    title: "Legal Basements",
    navLabel: "Legal Basements",
    badge: "Permits & code",
    blurb:
      "Secondary suites built to Ontario Building Code — permitted, inspected, and legal to rent.",
    // TODO(owner): placeholder image — needs a finished basement suite.
    image: "/assets/craft-renovation.jpg",
    alt: "Placeholder image — awaiting finished basement photography",
    imageDraft: true,
    intro:
      "A basement apartment is only worth building if it is legal. An unpermitted suite can't be insured properly, can't be declared when you sell, and can be ordered closed. A legal secondary suite is a permitted, inspected unit that meets the Ontario Building Code and your local zoning — which is what makes it rentable, insurable, and an asset rather than a liability.",
    whatsIncluded: [
      "Assessment of whether your basement can meet code before you spend anything",
      "Framing, insulation and drywall to the permitted drawings",
      "Egress windows sized and installed to code",
      "Fire separation between units, and the required alarms and detectors",
      "Kitchen and bathroom fit-out for the suite",
      "Flooring, trim and finishing throughout",
    ],
    notIncluded: [
      "TODO(owner): who pulls the permit — you or the homeowner?",
      "TODO(owner): are licensed electrical and plumbing subcontracted or in-house?",
      "TODO(owner): is the zoning check included, or the homeowner's responsibility?",
    ],
    steps: [
      {
        title: "Feasibility check",
        copy: "Before any money is committed, we look at the three things that decide whether a legal suite is even possible: ceiling height, whether an egress window can be installed, and what your zoning allows.",
      },
      {
        title: "Drawings & permit",
        copy: "Drawings are prepared for the building permit and submitted. TODO(owner): confirm who submits and who carries the permit cost.",
      },
      {
        title: "Build & inspections",
        copy: "We build to the permitted drawings and coordinate the inspections at each required stage, so nothing gets closed up before it has been signed off.",
      },
      {
        title: "Final sign-off",
        copy: "Final inspection, then we walk the unit with you. You end up with a suite that has paperwork behind it.",
      },
    ],
    priceBand: {
      from: "$00,000",
      typical: "$00,000 – $00,000",
      drivers: [
        "Whether an egress window needs cutting into the foundation",
        "Existing ceiling height, and whether the floor has to be lowered",
        "How far services have to be moved for a second kitchen and bathroom",
        "TODO(owner): confirm these are the real cost drivers, and the real numbers",
      ],
      draft: true,
    },
    faqs: [
      {
        q: "What actually makes a basement apartment legal?",
        a: "It comes down to meeting the Ontario Building Code requirements for a secondary suite and your municipality's zoning. In practice the deciding factors are usually ceiling height, a compliant egress window, fire separation between the units, and interconnected smoke and carbon monoxide alarms. A permit and the inspections that follow are what turn that work into a legal unit.",
      },
      {
        q: "My ceiling feels low — is it a non-starter?",
        a: "Not automatically. Minimum height requirements apply, and where an existing basement falls short the floor can sometimes be lowered — though that is significant structural work and changes the budget considerably. This is exactly what the feasibility check is for, and it is worth knowing before you commit to anything.",
      },
      {
        q: "Do I really need an egress window?",
        a: "A legal bedroom needs a compliant means of escape. Where there isn't one, it means cutting an opening into the foundation wall and installing a window well. It is one of the most common reasons a basement that looks finished isn't actually legal.",
      },
      {
        q: "Can you finish a basement without making it a legal suite?",
        a: "Yes — a finished basement for your own family's use is a different project from a rentable secondary suite, and costs less. It is worth being clear which one you want at the start, because the requirements differ substantially.",
      },
      {
        q: "How long does the process take?",
        a: "TODO(owner): confirm realistic timeline, including how long permits typically take in Ottawa.",
      },
    ],
    seo: {
      title: "Legal Basement Apartments & Secondary Suites in Ottawa",
      description:
        "Legal basement apartments in Ottawa built to Ontario Building Code — egress windows, fire separation, permits and inspections. Free feasibility check.",
    },
    contentStatus: "complete",
  },
];

export const getService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);
