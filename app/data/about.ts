import { COMPANY } from "./company";

export type CredentialItem = {
  label: string;
  value: string;
  subtext?: string;
  draft: boolean;
};

export type CoreValue = {
  number: string;
  title: string;
  description: string;
};

export type AboutData = {
  title: string;
  lead: string;
  foundingYear: {
    year: string;
    yearsOfExperience: string;
    draft: boolean;
  };
  story: {
    paragraphs: string[];
    draft: boolean;
  };
  owner: {
    role: string;
    bio: string[];
    draft: boolean;
  };
  credentials: {
    legalName: CredentialItem;
    hstNumber: CredentialItem;
    wsib: CredentialItem;
    liabilityInsurance: CredentialItem;
    licensedTrades: CredentialItem;
  };
  team: {
    modelTitle: string;
    modelDescription: string;
    draft: boolean;
  };
  values: CoreValue[];
  serviceAreas: string[];
};

export const ABOUT_DATA: AboutData = {
  title: "Carpentry Led by the Maker",
  lead:
    "We are an owner-operated residential carpentry and renovation contractor in Ottawa. When you hire us, the owner measures your space, manages your build, and completes the work with zero sales reps or layers of bureaucracy.",

  foundingYear: {
    year: "2024", // TODO(owner): confirm exact business founding date
    yearsOfExperience: "Years of trade experience", // TODO(owner): confirm total years
    draft: true,
  },

  story: {
    paragraphs: [
      "SS Carpentry and Renovations was established in Ottawa to provide homeowners with an alternative to large, impersonal general contracting firms where communication breaks down between sales reps, project managers, and rotating subcontractors.",
      "We believe that high-end residential carpentry—whether it is a full kitchen transformation, custom solid walnut shelving, or an architectural media wall—requires one accountable craftsman owning the tolerances from initial laser measurement to the final silicone bead.",
      "By keeping our operating structure lean and focused, every project gets our undivided attention, clean daily job sites, and fixed itemized pricing with nothing hidden underneath.",
    ],
    draft: true,
  },

  owner: {
    role: "Owner & Lead Carpenter",
    bio: [
      "As the founder and lead carpenter of SS Carpentry and Renovations, the owner brings hands-on mastery in precision joinery, structural framing, cabinetry installation, and interior finishing across Ottawa homes.",
      "Rather than supervising from an off-site office, the owner is on site every single day during active construction. Every cut, mitre joint, cabinet scribe, and tile transition is fitted under his direct scrutiny.",
    ],
    draft: true,
  },

  credentials: {
    legalName: {
      label: "Registered Business",
      value: COMPANY.name,
      subtext: "Ontario Registered Business Entity",
      draft: false,
    },
    hstNumber: {
      label: "HST / Business Number",
      value: "TODO(owner): Registered Business #",
      subtext: "Official Canada Revenue Agency Registration",
      draft: true,
    },
    wsib: {
      label: "WSIB Ontario Coverage",
      value: "Active & In Good Standing",
      subtext: "TODO(owner): WSIB Clearance / Account #",
      draft: true,
    },
    liabilityInsurance: {
      label: "Commercial General Liability",
      value: "$2,000,000 Policy Coverage",
      subtext: "TODO(owner): Insurance provider & policy certificate",
      draft: true,
    },
    licensedTrades: {
      label: "Regulated Trades Compliance",
      value: "Licensed Trade Partners (ESA / ECRA & Plumbers)",
      subtext: "Specialized high-voltage electrical and plumbing handled by certified trade partners",
      draft: false,
    },
  },

  team: {
    modelTitle: "Owner on Every Site — By Design",
    modelDescription:
      "We deliberately operate as a dedicated, owner-led team. We do not run five concurrent sites with unsupervised labor. When we start your renovation, you have our focused attention until the walkthrough is signed off.",
    draft: false,
  },

  values: [
    {
      number: "01",
      title: "Millimetre Tolerances",
      description:
        "Walls in Ottawa homes are rarely straight, and floors are rarely level. We true substrates, scribe trim tight to ceilings, and ensure joints are seamless before finishing.",
    },
    {
      number: "02",
      title: "A Tidy Site Every Single Day",
      description:
        "Dust barriers installed, floors protected with heavy board, and work areas swept at the end of every shift. You still live in your home while we renovate.",
    },
    {
      number: "03",
      title: "Fixed Written Pricing",
      description:
        "One comprehensive, itemized quote detailing exact materials, scope, and allowances. No surprise extras, hidden fees, or shifting budget targets.",
    },
    {
      number: "04",
      title: "Direct Accountability",
      description:
        "You deal directly with the person who actually builds your project. Inquiries receive same-day answers and projects stay on target.",
    },
  ],

  serviceAreas: [
    "Westboro",
    "Kanata",
    "Barrhaven",
    "The Glebe",
    "Rockcliffe Park",
    "Stittsville",
    "Nepean",
    "Orleans",
    "Centretown",
    "Manotick",
    "Riverside South",
    "Alta Vista",
  ],
};
