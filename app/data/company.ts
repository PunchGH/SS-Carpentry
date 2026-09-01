/**
 * Single source of truth for business facts.
 * Nothing here may be duplicated inline in a component — change it once, here.
 */

export const COMPANY = {
  name: "SS Carpentry and Renovations",
  short: "SS Carpentry",
  suffix: "& Renovations",
  slogan: "Renovate, reimagine, rebuild",
  address: "3008 Travertine Way, Ottawa, ON K2J 7G4, Canada",
  locality: "Ottawa",
  region: "ON",
  phones: [
    { display: "647-939-0241", href: "tel:+16479390241", label: "Primary" },
    { display: "437-288-5105", href: "tel:+14372885105", label: "Alternate" },
  ],
  email: "ssrenovations.ottawa@gmail.com",
  rating: 5.0,
  reviewCount: 3,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=SS%20Carpentry%20and%20Renovations&query_place_id=ChIJnT3tXwD9zUwRCidzjIIUTs8",
} as const;

/** Convenience: the number used for "call now" CTAs. */
export const PRIMARY_PHONE = COMPANY.phones[0];
