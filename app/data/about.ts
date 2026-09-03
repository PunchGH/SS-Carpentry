import { COMPANY } from "./company";

export type CredentialItem = {
  label: string;
  /**
   * Customer-facing. Must state only what the business can stand behind today.
   * An unconfirmed figure is never written here — promise the document instead
   * of asserting the number, and let `needs` carry what we still have to get.
   */
  value: string;
  /** Customer-facing supporting line. Never contains a TODO or an internal note. */
  subtext?: string;
  /**
   * Team-facing only. Surfaced as a tooltip on the draft marker and never
   * rendered as page copy — see DraftTag / DraftBlock / PlaceholderImage.
   */
  needs?: string;
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

  /**
   * The single source of truth for what this business claims about its
   * licensing, insurance and compliance. Both /about and /contact render from
   * here so the two pages can never state different things again.
   *
   * Rule: until the owner supplies a document, `value` promises the document
   * rather than asserting the figure. "Certificate on request" is checkable and
   * true today; "$2,000,000 Policy Coverage" was neither.
   */
  credentials: {
    legalName: {
      label: "Registered Business",
      value: COMPANY.name,
      subtext: "Ontario-registered business entity.",
      draft: false,
    },
    hstNumber: {
      label: "HST / Business Number",
      value: "Shown on every quote and invoice",
      subtext: "Our registered number appears in writing on the paperwork you receive.",
      needs: "Registered legal business name and HST / business number",
      draft: true,
    },
    wsib: {
      label: "WSIB Ontario Coverage",
      value: "Clearance certificate on request",
      subtext: "Ask us and we will send a current WSIB clearance certificate before work starts.",
      needs: "Active WSIB clearance number and account status",
      draft: true,
    },
    liabilityInsurance: {
      label: "Commercial General Liability",
      value: "Certificate of insurance on request",
      subtext: "Proof of coverage goes out with your quote, before anyone is on site.",
      needs: "Insurance provider, coverage amount and policy certificate",
      draft: true,
    },
    licensedTrades: {
      label: "Regulated Trades Compliance",
      value: "Regulated work goes to licensed trades",
      subtext: "Electrical and plumbing that requires a licence is carried out by certified trade partners.",
      needs:
        "Confirm electrical (ESA/ECRA) and plumbing arrangements across all services — in-house vs licensed trade partners",
      draft: true,
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
