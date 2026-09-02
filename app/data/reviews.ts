/**
 * Real Google reviews. Verbatim — never edit the wording.
 *
 * NOTE: the third review names the owner ("Akash"). That is a deliberate,
 * approved exception to removing his name from the site: these are the
 * customer's own published words and each card links to the original on
 * Google, so altering the text would misrepresent a real review.
 * See IMPLEMENTATION_PLAN_FRONTEND.md §E.
 *
 * TODO(owner): dates are missing for the other reviews — the friction
 * guide's highest-weighted stage (vetting) expects dated reviews. Ron Hunt's
 * date is known; the rest need reading off the Google Business Profile.
 */

export type Review = {
  name: string;
  tag: string;
  reviewUrl: string;
  text: string;
  avatar?: string;
  /** ISO date the review was posted. Undefined = still unknown, renders undated. */
  date?: string;
  /** Google "Local Guide" badge — a credibility signal worth showing. */
  localGuide?: boolean;
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * "2026-09-01" -> "September 2026".
 *
 * Parses the ISO string by hand rather than via `new Date()`: that would treat
 * the value as UTC midnight and can render the previous month in western
 * timezones, which would also mismatch between server and client.
 */
export function formatReviewDate(iso: string): string {
  const [year, month] = iso.split("-");
  const name = MONTHS[Number(month) - 1];
  return name ? `${name} ${year}` : year;
}

export const REVIEWS: Review[] = [
  {
    name: "Ron Hunt",
    tag: "Kitchen makeover",
    avatar: "/Google Reviewer Pfp/Ron Hunt.png",
    // TODO(owner): direct permalink to this review, from the GBP reviews list.
    reviewUrl:
      "https://www.google.com/maps/search/?api=1&query=SS%20Carpentry%20and%20Renovations&query_place_id=ChIJnT3tXwD9zUwRCidzjIIUTs8",
    text: "Went the extra mile on many facets of our kitchen makeover. Friendly and knowledgeable. Would hire again.",
    date: "2026-09-01",
    localGuide: true,
  },
  {
    name: "Arman Sandhu",
    tag: "Kitchen & tile renovation",
    avatar: "/Google Reviewer Pfp/Arman Sandhu.png",
    reviewUrl:
      "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT25wUGExbGZRek4wWm5ndGVqWnZOemRxZW1VNVRFRRAB!2m1!1s0x0:0xcf4e14828c73270a!3m1!1s2@1:CAIQACodChtycF9oOnpPa1lfQzN0ZngtejZvNzdqemU5TEE%7C%7C?hl=en",
    text: "We had SS Carpentry and Renovations complete work on our kitchen and tiles, and we’re very happy with the results. The workmanship was excellent, the finishing was clean and professional, and they paid great attention to detail. They were reliable, respectful, and easy to work with throughout the project. Our kitchen looks amazing, and we’re very pleased with how everything turned out. I would definitely recommend SS Carpentry and Renovations to anyone looking for quality renovation work.",
  },
  {
    name: "Sumeta Saroya",
    tag: "Deck & custom joinery",
    avatar: "/Google Reviewer Pfp/unnamed.png",
    reviewUrl:
      "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT25nMU1YcHdPRjloWW5kb2QyUk5ORjgwT0dSRGVuYxAB!2m1!1s0x0:0xcf4e14828c73270a!3m1!1s2@1:CAIQACodChtycF9oOng1MXpwOF9hYndod2RNNF80OGRDenc%7C%7C?hl=en",
    text: "We had an amazing experience getting our backyard deck and some accent work done in our bedrooms. Akash made custom walnut floating shelves and did a really good job installing everything. Whole work was done ahead of schedule and quality workmanship. Highly recommended.",
  },
  {
    name: "The Hartley Project",
    tag: "Google review",
    avatar: "/Google Reviewer Pfp/The Hartley Project.png",
    reviewUrl:
      "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2xoaVdscDRYMmhqVDBaM1F6WnZSM0pDWkdWUFVGRRAB!2m1!1s0x0:0xcf4e14828c73270a!3m1!1s2@1:CAIQACodChtycF9oOlhiWlp4X2hjT0Z3QzZvR3JCZGVPUFE%7C%7C?hl=en",
    text: "Great Job! Clean execution and superb attention to woodwork details.",
  },
];
