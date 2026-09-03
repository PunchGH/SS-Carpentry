/**
 * Ottawa Legal Basement Apartment Guide & Regulatory Claims
 * Source of truth for all statutory building code, zoning, and permit data.
 *
 * Sourced: 2026-09-02 from primary municipal and provincial authorities.
 * Strictly adheres to /mnt/d/Prototype/SS Carpentry/LEGAL_BASEMENTS_RESEARCH.md.
 * RULE: No unsourced numbers. Every figure must have a primary source.
 */

import type { ServiceFaq as Faq } from "../services";

export type Claim = {
  id: string;
  statement: string;
  source: string;
  url: string;
  retrieved: string;
  codeReference?: string;
  annualRecheck?: boolean;
  notes?: string;
};

export const LEGAL_BASEMENT_META = {
  title: "Ottawa Legal Basement Apartment Guide",
  subtitle:
    "Requirements, Ontario Building Code thresholds, and City of Ottawa dual zoning rules for secondary dwelling units.",
  lastReviewed: "2026-09-02",
  reviewCadence: {
    zoning: "Quarterly (tracking 25 outstanding OLT appeals on By-law 2026-50)",
    buildingCode: "Annual (2024 Ontario Building Code O. Reg. 163/24 transition)",
    secondUnitGuide: "Annual (Ministry of Municipal Affairs and Housing guidance)",
  },
  disclaimer:
    "Guidance only, not a legal or building code ruling; the City of Ottawa Chief Building Official and inspectors have final legal authority.",
  authorities: {
    ottawaDio: {
      label: "City of Ottawa Development Information Officer (DIO)",
      phone: "613-580-2424 ext. 23434",
      email: "dioinquiry@ottawa.ca",
      url: "https://ottawa.ca/en/planning-development-and-construction/building-and-renovating/do-i-need-building-permit/adding-apartment-additional-dwelling-units",
    },
    esa: {
      label: "Electrical Safety Authority (ESA)",
      phone: "1-877-372-7233",
      displayPhone: "1-877-ESA-SAFE (372-7233)",
      url: "https://esasafe.com",
    },
    ontarioCode: {
      label: "Ontario Building Code (O. Reg. 163/24)",
      url: "https://www.ontario.ca/page/2024-ontario-building-code",
    },
  },
} as const;

/**
 * Verified claims directory. Every statutory assertion on the guide page
 * maps directly to an entry in this array.
 */
export const LEGAL_BASEMENT_CLAIMS: Claim[] = [
  {
    id: "OBC-2024-MANDATORY",
    statement:
      "The 2024 Ontario Building Code (O. Reg. 163/24) replaced the 2012 Building Code effective January 1, 2025, and became mandatory for all permit applications submitted on or after April 1, 2025.",
    source: "Government of Ontario — 2024 Ontario Building Code",
    url: "https://www.ontario.ca/page/2024-ontario-building-code",
    retrieved: "2026-09-02",
    codeReference: "O. Reg. 163/24",
    annualRecheck: true,
  },
  {
    id: "OBC-NBC-HARMONIZE",
    statement:
      "The 2024 Ontario Building Code harmonizes provincial provisions with the National Building Code of Canada 2020 secondary suite provisions, eliminating approximately 1,730 provincial variations.",
    source: "Government of Ontario / McMillan LLP Regulatory Transition",
    url: "https://www.ontario.ca/page/2024-ontario-building-code",
    retrieved: "2026-09-02",
    codeReference: "O. Reg. 163/24 & NBC 2020",
    annualRecheck: true,
  },
  {
    id: "CEILING-BASEMENT-MIN",
    statement:
      "A basement secondary dwelling unit requires a minimum clear ceiling height of 1.95 m (6' 4¾\") over the entire required floor area, including the complete route to the exit.",
    source: "Government of Ontario — Add a second unit to your house",
    url: "https://www.ontario.ca/page/add-second-unit-your-house",
    retrieved: "2026-09-02",
    codeReference: "Division B, Table 11.5.1.1.C., Compliance Alternative 102",
    annualRecheck: true,
  },
  {
    id: "CEILING-ATTIC-MIN",
    statement:
      "For second units located in an attic, at least 50% of the required floor area must have a clear ceiling height of 2.03 m (6' 8\"). Areas with ceiling height below 1.4 m (4' 7\") are excluded from floor area calculations.",
    source: "Government of Ontario — Add a second unit to your house",
    url: "https://www.ontario.ca/page/add-second-unit-your-house",
    retrieved: "2026-09-02",
    codeReference: "Division B, Table 11.5.1.1.C., Compliance Alternative 102",
    annualRecheck: true,
  },
  {
    id: "EGRESS-BASEMENT-WINDOW",
    statement:
      "Basement and ground-floor secondary suite bedrooms require an escape/egress window with a minimum clear open area of 0.38 m² (4.1 sq ft), no openable dimension less than 460 mm (18\"), and a sill height no higher than 900 mm (2' 11\") above the floor.",
    source: "Government of Ontario — Add a second unit to your house",
    url: "https://www.ontario.ca/page/add-second-unit-your-house",
    retrieved: "2026-09-02",
    codeReference: "Division B, Table 11.5.1.1.C., Compliance Alternative 136",
    annualRecheck: true,
  },
  {
    id: "EGRESS-UPPER-WINDOW",
    statement:
      "Upper-floor secondary suite bedrooms require an escape window with a minimum height of 1,060 mm (3' 6\"), a minimum width of 560 mm (1' 10\"), and a sill height not exceeding 900 mm (2' 11\") above the floor.",
    source: "Government of Ontario — Add a second unit to your house",
    url: "https://www.ontario.ca/page/add-second-unit-your-house",
    retrieved: "2026-09-02",
    codeReference: "Division B, Table 11.5.1.1.C., Compliance Alternative 136",
    annualRecheck: true,
  },
  {
    id: "FIRE-SEPARATION-STANDARD",
    statement:
      "Fire separation between dwelling units, and between dwelling units and common areas, must provide a minimum 30-minute fire-resistance rating.",
    source: "Government of Ontario — Add a second unit to your house",
    url: "https://www.ontario.ca/page/add-second-unit-your-house",
    retrieved: "2026-09-02",
    codeReference: "Division B, Table 11.5.1.1.C., Compliance Alternatives 147, 152, 153",
    annualRecheck: true,
  },
  {
    id: "FIRE-SEPARATION-REDUCED-ALARMS",
    statement:
      "The fire separation rating may be reduced to 15 minutes if the whole house is equipped with interconnected smoke alarms. A standard assembly example uses 38×89 mm wood studs, 13 mm drywall on both sides, and fibre insulation.",
    source: "Government of Ontario — Add a second unit to your house",
    url: "https://www.ontario.ca/page/add-second-unit-your-house",
    retrieved: "2026-09-02",
    codeReference: "Division B, Table 11.5.1.1.C., Compliance Alternatives 147, 152, 153",
    annualRecheck: true,
  },
  {
    id: "ALARMS-SMOKE-CAN-ULC",
    statement:
      "Smoke alarms must meet CAN/ULC S531, feature visual flashing-light activation (strobe), and be installed on every level of the home, outside sleeping areas, in each bedroom of the second unit, and in common hallways or utility areas.",
    source: "Government of Ontario — Add a second unit to your house",
    url: "https://www.ontario.ca/page/add-second-unit-your-house",
    retrieved: "2026-09-02",
    codeReference: "Division B, Subsection 9.10.19",
    annualRecheck: true,
  },
  {
    id: "ALARMS-CARBON-MONOXIDE",
    statement:
      "Carbon monoxide alarms are mandatory where the furnace burns natural gas, propane or similar fuels, or where an attached garage exists. Alarms must be situated near sleeping areas in the second unit and in the furnace room if enclosed.",
    source: "Government of Ontario — Add a second unit to your house",
    url: "https://www.ontario.ca/page/add-second-unit-your-house",
    retrieved: "2026-09-02",
    codeReference: "Division B, Articles 9.33.4.1 & 9.33.4.2, Compliance Alternative 197",
    annualRecheck: true,
  },
  {
    id: "NATURAL-LIGHT-GLAZING",
    statement:
      "Natural light glazing must equal at least 5% of the floor area in living and dining rooms, and 2.5% of the floor area in bedrooms. Glazing is not mandatory in kitchens, bathrooms, or laundry areas.",
    source: "Government of Ontario — Add a second unit to your house",
    url: "https://www.ontario.ca/page/add-second-unit-your-house",
    retrieved: "2026-09-02",
    codeReference: "Division B, Article 9.7.2.3, Compliance Alternative 107",
    annualRecheck: true,
  },
  {
    id: "ELECTRICAL-ESA-PERMIT",
    statement:
      "A separate electrical permit is required for secondary unit wiring, and a final Electrical Safety Authority (ESA) inspection certificate is mandatory before occupancy (1-877-ESA-SAFE / 372-7233).",
    source: "Government of Ontario — Add a second unit to your house",
    url: "https://www.ontario.ca/page/add-second-unit-your-house",
    retrieved: "2026-09-02",
    codeReference: "Ontario Electrical Safety Code / ESA Notification",
    annualRecheck: true,
  },
  {
    id: "OTTAWA-ZONING-2026-50",
    statement:
      "City of Ottawa Council enacted comprehensive Zoning By-law 2026-50 on March 11, 2026, establishing new Neighbourhood Zones N1 through N6 (with N5 and N6 governing mid- and high-rise contexts).",
    source: "City of Ottawa — Zoning By-law No. 2026-50",
    url: "https://ottawa.ca/en/living-ottawa/laws-licences-and-permits/laws/laws-z/zoning-law-law-no-2026-50",
    retrieved: "2026-09-02",
    codeReference: "Ottawa By-law No. 2026-50",
    annualRecheck: false,
    notes: "Requires quarterly check while appeals are resolved.",
  },
  {
    id: "OTTAWA-DUAL-BYLAW-RULE",
    statement:
      "Applications deemed complete on or after March 11, 2026 must comply with BOTH By-law 2008-250 AND By-law 2026-50 — 'the most restrictive provisions from both by-laws applying'. Applications complete prior to March 11, 2026 are evaluated under By-law 2008-250 only.",
    source: "City of Ottawa — Zoning By-law No. 2026-50",
    url: "https://ottawa.ca/en/living-ottawa/laws-licences-and-permits/laws/laws-z/zoning-law-law-no-2026-50",
    retrieved: "2026-09-02",
    codeReference: "Ottawa Transition Provisions, By-law 2026-50",
    annualRecheck: false,
    notes: "Requires quarterly check while appeals are resolved.",
  },
  {
    id: "OTTAWA-APPEALS-STATUS",
    statement:
      "On July 2, 2026, the Ontario Land Tribunal (OLT) issued an oral decision bringing un-appealed portions of By-law 2026-50 into effect retroactive to March 11, 2026. Twenty-five appeals remain active; the July 7, 2026 Council memo remains the authority on sections not in force.",
    source: "City of Ottawa — Update on Status of Appeals, July 7 2026 Memo to Council",
    url: "https://ottawa.ca/en/city-hall/open-transparent-and-accountable-government/public-disclosure/memoranda-issued-members-council/memoranda-issued-planning-development-and-building-services/update-status-appeals-new-zoning-law-july-7-2026",
    retrieved: "2026-09-02",
    codeReference: "OLT Oral Decision (July 2, 2026) & Council Memo (July 7, 2026)",
    annualRecheck: false,
    notes: "Requires quarterly check while appeals are resolved.",
  },
  {
    id: "OTTAWA-PERMIT-MANDATORY",
    statement:
      "A building permit is legally mandatory before proceeding with an additional dwelling unit. Even when minimal physical construction is needed, a formal 'Change of Use' permit must be reviewed for Building Code and applicable law compliance.",
    source: "City of Ottawa — Adding an apartment (additional dwelling units)",
    url: "https://ottawa.ca/en/planning-development-and-construction/building-and-renovating/do-i-need-building-permit/adding-apartment-additional-dwelling-units",
    retrieved: "2026-09-02",
    codeReference: "Building Code Act, 1992, s. 8 & 10",
    annualRecheck: true,
  },
  {
    id: "OTTAWA-MUNICIPAL-UNITS-COUNT",
    statement:
      "Properties connected to City of Ottawa municipal water and wastewater services are permitted up to two additional dwelling units (e.g., two basement or internal suites, or one interior suite plus a detached coach house).",
    source: "City of Ottawa — Adding an apartment (additional dwelling units)",
    url: "https://ottawa.ca/en/planning-development-and-construction/building-and-renovating/do-i-need-building-permit/adding-apartment-additional-dwelling-units",
    retrieved: "2026-09-02",
    codeReference: "City of Ottawa ADU Provisions / Planning Act s. 16(3)",
    annualRecheck: true,
  },
  {
    id: "OTTAWA-SEPTIC-UNITS-COUNT",
    statement:
      "Properties on private services (well and septic) are restricted to a maximum of one additional dwelling unit or coach house, and reserve sewage disposal capacity must be formally confirmed by the Ottawa Septic Office.",
    source: "City of Ottawa — Adding an apartment (additional dwelling units)",
    url: "https://ottawa.ca/en/planning-development-and-construction/building-and-renovating/do-i-need-building-permit/adding-apartment-additional-dwelling-units",
    retrieved: "2026-09-02",
    codeReference: "Ottawa Septic Office / Part 8 OBC",
    annualRecheck: true,
  },
  {
    id: "OTTAWA-BCIN-DESIGNER-REQ",
    statement:
      "Where two additional dwelling units are added within the principal building, drawings must be created and sealed by a designer registered with a Building Code Identification Number (BCIN). A homeowner may take design responsibility for one ADU where no other exists, or for a coach house.",
    source: "City of Ottawa — Adding an apartment (additional dwelling units)",
    url: "https://ottawa.ca/en/planning-development-and-construction/building-and-renovating/do-i-need-building-permit/adding-apartment-additional-dwelling-units",
    retrieved: "2026-09-02",
    codeReference: "Building Code Act, 1992 / O. Reg. 163/24 Qualifications",
    annualRecheck: true,
  },
  {
    id: "OTTAWA-GROUND-FLOOR-ACCESS",
    statement:
      "A new secondary dwelling unit must be situated on the same lot and provide separate access on the ground floor, unless specific building and fire codes allow an approved alternate means of egress.",
    source: "City of Ottawa — Adding an apartment (additional dwelling units)",
    url: "https://ottawa.ca/en/planning-development-and-construction/building-and-renovating/do-i-need-building-permit/adding-apartment-additional-dwelling-units",
    retrieved: "2026-09-02",
    codeReference: "City of Ottawa Zoning & Part 9 OBC",
    annualRecheck: true,
  },
  {
    id: "OTTAWA-NO-PARKING-MANDATE",
    statement:
      "No additional motor vehicle parking space is required for a secondary dwelling unit in Ottawa. If a parking space is provided, it cannot be situated in the front yard; tandem parking in the existing driveway is expressly permitted.",
    source: "City of Ottawa — Adding an apartment (additional dwelling units)",
    url: "https://ottawa.ca/en/planning-development-and-construction/building-and-renovating/do-i-need-building-permit/adding-apartment-additional-dwelling-units",
    retrieved: "2026-09-02",
    codeReference: "City of Ottawa Zoning By-laws (2008-250 & 2026-50)",
    annualRecheck: true,
  },
  {
    id: "OTTAWA-15-DAY-FIRST-REVIEW",
    statement:
      "The City of Ottawa operates under a Council-approved enhanced service level target of 15 business days for first review of complete residential secondary dwelling unit permit applications.",
    source: "City of Ottawa — Adding an apartment (additional dwelling units)",
    url: "https://ottawa.ca/en/planning-development-and-construction/building-and-renovating/do-i-need-building-permit/adding-apartment-additional-dwelling-units",
    retrieved: "2026-09-02",
    codeReference: "City of Ottawa Enhanced Service Level (Council Approved)",
    annualRecheck: true,
  },
  {
    id: "OTTAWA-48-HR-INSPECTION",
    statement:
      "Mandatory municipal construction inspections must be booked at least 48 hours in advance, and approved City-stamped permit drawings must be physically present on site for the inspector.",
    source: "City of Ottawa — Adding an apartment (additional dwelling units)",
    url: "https://ottawa.ca/en/planning-development-and-construction/building-and-renovating/do-i-need-building-permit/adding-apartment-additional-dwelling-units",
    retrieved: "2026-09-02",
    codeReference: "City of Ottawa Inspection Standards",
    annualRecheck: true,
  },
  {
    id: "OTTAWA-PRE-2005-EXCEPTION",
    statement:
      "Secondary dwelling units were permitted prior to 2005 in Cumberland-Urban, Gloucester, Nepean-Urban, Osgoode, Goulbourn, and West Carleton. Units established before 2005 in those areas must comply with the Building Code and Fire Code.",
    source: "City of Ottawa — Adding an apartment (additional dwelling units)",
    url: "https://ottawa.ca/en/planning-development-and-construction/building-and-renovating/do-i-need-building-permit/adding-apartment-additional-dwelling-units",
    retrieved: "2026-09-02",
    codeReference: "Ottawa By-law Historical Amalgamation Standards",
    annualRecheck: true,
  },
  {
    id: "FINANCIAL-TAX-INSURANCE-NOTICES",
    statement:
      "Creating a legal secondary suite can trigger an MPAC property tax reassessment; gross rental income is taxable under the federal Income Tax Act; and homeowners must notify their property insurance provider, as homeowner policies typically require endorsement or adjustment for secondary rental units.",
    source: "City of Ottawa & Government of Ontario Advisory Notices",
    url: "https://ottawa.ca/en/planning-development-and-construction/building-and-renovating/do-i-need-building-permit/adding-apartment-additional-dwelling-units",
    retrieved: "2026-09-02",
    codeReference: "Assessment Act / Income Tax Act / Insurance Bureau of Canada",
    annualRecheck: true,
  },
  {
    id: "FIRE-CODE-RETROFIT-9-8",
    statement:
      "Ontario Fire Code (O. Reg. 213/07) Section 9.8 (Retrofit — Two Unit Residential Occupancies) governs two-unit homes established on or before July 14, 1994, with stacked or shared-egress suites, covering containment, means of escape, alarms, and electrical reviews.",
    source: "Ontario Fire Code (O. Reg. 213/07) / CanLII",
    url: "https://www.canlii.org/en/on/laws/regu/o-reg-213-07/latest/o-reg-213-07.html",
    retrieved: "2026-09-02",
    codeReference: "O. Reg. 213/07, Part 9, Section 9.8",
    annualRecheck: true,
  },
];

/**
 * 5 core factors that determine feasibility, displayed prominently above the fold.
 */
export const CORE_FEASIBILITY_FACTORS = [
  {
    num: "01",
    title: "Ceiling Height",
    stat: "1.95 m (6' 4¾\")",
    summary:
      "Clear continuous height over the entire required floor area and throughout the path of travel to the exit door. Attic suites require 2.03 m (6' 8\") over at least 50% of the area.",
    citation: "Div B, Table 11.5.1.1.C., CA 102",
  },
  {
    num: "02",
    title: "Egress Windows",
    stat: "0.38 m² (4.1 sq ft)",
    summary:
      "Every basement bedroom must have an emergency escape window with at least 0.38 m² of unobstructed openable area, no dimension under 460 mm (18\"), and sill height no more than 900 mm (2' 11\") from the floor.",
    citation: "Div B, Table 11.5.1.1.C., CA 136",
  },
  {
    num: "03",
    title: "Fire Separation",
    stat: "30 min / 15 min",
    summary:
      "A 30-minute fire separation between units and common areas, reducible to 15 minutes if the whole home has interconnected CAN/ULC S531 smoke alarms with flashing strobe lights.",
    citation: "Div B, CA 147, 152, 153 & 9.10.19",
  },
  {
    num: "04",
    title: "Separate Ground Access",
    stat: "Ground-floor entry",
    summary:
      "Ottawa requires secondary suites to have separate access on the ground floor (or approved exterior stair/walkout path) unless explicit building and fire code provisions permit an alternate route.",
    citation: "City of Ottawa ADU Provisions",
  },
  {
    num: "05",
    title: "Ottawa Dual Zoning",
    stat: "Most restrictive applies",
    summary:
      "Applications deemed complete on or after March 11, 2026 must comply with both By-law 2008-250 and By-law 2026-50. Up to 2 ADUs on municipal services, 1 on private septic.",
    citation: "Ottawa By-laws 2008-250 & 2026-50",
  },
] as const;

/**
 * Common blockers and whether they can be resolved or require major structural intervention.
 */
export const COMMON_BLOCKERS = [
  {
    title: "Ceiling height under 1.95 m (6' 4¾\")",
    category: "Major Structural or Prohibitive",
    canBeFixed: "Yes, but costly",
    description:
      "If foundation footings or existing concrete floor slabs do not provide 1.95 m of clear headroom, the basement requires underpinning the foundation walls or bench-footing and excavating the concrete slab. This is the single highest cost driver in basement conversions.",
    codeRef: "Div B, Table 11.5.1.1.C., CA 102",
  },
  {
    title: "No compliant bedroom egress window",
    category: "Standard Renovation Fix",
    canBeFixed: "Straightforward to rectify",
    description:
      "Older basements almost universally have small slider hopper windows (approx. 14\"×24\"). A compliant egress window requires concrete saw-cutting an enlarged opening in the foundation wall, installing an engineered lintel, excavating an exterior window well with 550 mm clearance, and tying into foundation drainage.",
    codeRef: "Div B, Table 11.5.1.1.C., CA 136",
  },
  {
    title: "Bulkheads and ductwork dipping below clearance",
    category: "Technical Carpentry & HVAC",
    canBeFixed: "Rerouting possible",
    description:
      "Main supply trunk lines and plumbing drain stacks often drop below 1.95 m in central hallways. Resolving this requires reconfiguring ductwork into flat wide plenums, rerouting returns between floor joists, or boxing bulkheads outside the primary path of travel.",
    codeRef: "Div B, CA 102 & Part 9 OBC",
  },
  {
    title: "Private septic capacity constraints",
    category: "Site & Utility Blocker",
    canBeFixed: "Requires Ottawa Septic Office review",
    description:
      "Homes on private well and septic are restricted to a maximum of one additional dwelling unit. The existing septic tank volume and leaching bed area must be reviewed by the Ottawa Septic Office. If the bed is undersized for the added bedroom count, a septic expansion is required before permit issuance.",
    codeRef: "Ottawa Septic Office / OBC Part 8",
  },
  {
    title: "Lack of direct exterior access",
    category: "Access & Site Plan",
    canBeFixed: "Walk-up stairwell installation",
    description:
      "Secondary suites must have ground-floor separate access. If no grade walkout exists, a concrete exterior walk-up stairwell with retaining walls, a frost footing, area drain, and exterior door can be added on detached or semi-detached lots with sufficient setback clearance.",
    codeRef: "Ottawa ADU Guidelines",
  },
  {
    title: "Shared furnace sharing air between units",
    category: "HVAC & Fire Separation",
    canBeFixed: "Dedicated heating or fire dampers",
    description:
      "Standard forced-air systems circulate air between floors, which compromises fire separation and air quality. Solutions include installing independent heating and cooling (ductless mini-split heat pumps) or installing an approved independent second furnace with fire dampers.",
    codeRef: "OBC Div B, Subsection 9.10.13",
  },
] as const;

/**
 * What moves the cost band when turning an Ottawa basement into a legal suite.
 */
export const COST_DRIVERS = [
  {
    driver: "Foundation concrete cutting & egress window wells",
    impact: "Standard Requirement",
    details:
      "Diamond saw-cutting concrete foundation walls, structural lintel installation, galvanized steel or timber window wells, gravel bed, and drainage connection to weeping tile.",
  },
  {
    driver: "Ceiling height adjustment (underpinning vs framing adjustments)",
    impact: "Highest Potential Variance",
    details:
      "Preserving 1.95 m (6' 4¾\") clear height. If slab excavation, benching, or underpinning is required, structural engineering and significant excavation labour apply.",
  },
  {
    driver: "Fire separation & acoustic decoupling",
    impact: "Standard Requirement",
    details:
      "Type X drywall or double 13 mm drywall, resilient channel, Roxul/mineral fibre sound insulation in joist bays, and fire-rated door assemblies at all common entry points.",
  },
  {
    driver: "Dedicated electrical subpanel & ESA certification",
    impact: "Mandatory Safety",
    details:
      "Adding a 100A subpanel for the secondary suite, arc-fault circuit interrupters (AFCI), interconnected CAN/ULC S531 smoke alarms with strobes, CO detectors, and mandatory ESA inspection fees.",
  },
  {
    driver: "Independent plumbing drainage & backwater protection",
    impact: "Mechanical Scope",
    details:
      "Trenching basement concrete slab for new bathroom, shower, laundry, and kitchen drain lines. Installing an approved backwater valve to protect the basement suite from municipal sewer surcharge.",
  },
  {
    driver: "Heating, ventilation & HRV integration",
    impact: "Comfort & Code",
    details:
      "Dedicated ductless heat pump system or secondary furnace, independent Heat Recovery Ventilator (HRV) for fresh air exchange, and continuous bathroom/kitchen exhaust venting to exterior.",
  },
] as const;

/**
 * Frequently asked questions regarding Ottawa legal basement suites.
 */
export const LEGAL_BASEMENT_FAQS: Faq[] = [
  {
    q: "What is the exact minimum ceiling height for a legal basement apartment in Ottawa?",
    a: "Under the Ontario Building Code (O. Reg. 163/24, Div B Table 11.5.1.1.C Compliance Alternative 102), the minimum clear ceiling height for a basement secondary suite is 1.95 m (6' 4¾\") over the entire required floor area, including the complete route to the exit. For attic suites, at least 50% must reach 2.03 m (6' 8\"), and areas under 1.4 m (4' 7\") cannot count toward the required floor area.",
  },
  {
    q: "What size must the bedroom egress window be?",
    a: "Every basement bedroom must have an egress window with a minimum clear openable area of 0.38 m² (4.1 sq ft), with no openable dimension less than 460 mm (18\"), and a sill height no greater than 900 mm (2' 11\") from the finished floor (Compliance Alternative 136). The window well outside must provide at least 550 mm (1' 10\") of horizontal clearance in front of the open sash.",
  },
  {
    q: "What is the City of Ottawa dual zoning by-law rule?",
    a: "On March 11, 2026, Ottawa City Council enacted comprehensive Zoning By-law 2026-50. Applications deemed complete on or after March 11, 2026 must comply with BOTH the legacy By-law 2008-250 and the new By-law 2026-50, with the most restrictive provisions from both by-laws applying. While the Ontario Land Tribunal brought un-appealed portions into effect on July 2, 2026, 25 appeals remain pending.",
  },
  {
    q: "How many additional dwelling units can I legally add to my Ottawa home?",
    a: "On properties serviced by City municipal water and sewer, you can add up to two additional dwelling units (such as two basement/interior suites, or one interior suite plus a detached coach house). On private services (well and septic), you are limited to a maximum of one additional dwelling unit, and the septic system capacity must be verified and approved by the Ottawa Septic Office.",
  },
  {
    q: "Do I need a BCIN registered designer to draw my plans?",
    a: "If you are adding two additional dwelling units within the principal building, the drawings must be prepared and stamped by a designer registered with a Building Code Identification Number (BCIN). A homeowner may take design responsibility for only one ADU where no other additional suite exists, or for a coach house.",
  },
  {
    q: "Does a legal basement apartment require an extra parking space?",
    a: "No. Under City of Ottawa zoning by-laws, no additional vehicular parking space is required for a secondary dwelling unit. If you choose to provide parking, it cannot be located in the front yard; however, tandem parking in your existing driveway is explicitly permitted.",
  },
  {
    q: "What are the fire separation and alarm requirements?",
    a: "The Ontario Building Code requires a 30-minute fire separation between units and common spaces. This rating can be reduced to 15 minutes if the whole house is protected by interconnected smoke alarms complying with CAN/ULC S531 with visual flashing strobe lights. Hardwired carbon monoxide detectors are mandatory if there are fuel-burning appliances or an attached garage.",
  },
  {
    q: "How long does the City of Ottawa take to review a secondary suite permit?",
    a: "The City of Ottawa operates under a Council-approved enhanced service level target of 15 business days for the first review of complete secondary dwelling unit permit applications. Inspections during construction must be scheduled at least 48 hours in advance, with City-stamped plans on site.",
  },
  {
    q: "Will adding a legal basement apartment increase my property taxes?",
    a: "Yes, potentially. The Municipal Property Assessment Corporation (MPAC) assesses secondary dwelling units and may adjust your home's assessed property value to reflect the added self-contained unit. In addition, rental revenue is taxable income under the federal Income Tax Act, and you must notify your property insurance carrier to update your homeowner policy.",
  },
];
