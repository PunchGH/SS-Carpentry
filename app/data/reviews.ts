/**
 * Real Google reviews. Verbatim — never edit the wording.
 *
 * NOTE: the second review names the owner ("Akash"). That is a deliberate,
 * approved exception to removing his name from the site: these are the
 * customer's own published words and each card links to the original on
 * Google, so altering the text would misrepresent a real review.
 * See IMPLEMENTATION_PLAN_FRONTEND.md §E.
 *
 * TODO(owner): review dates are missing — the friction guide's highest-weighted
 * stage (vetting) expects dated reviews.
 */

export type Review = {
  name: string;
  tag: string;
  reviewUrl: string;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Arman Sandhu",
    tag: "Kitchen & tile renovation",
    reviewUrl:
      "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT25wUGExbGZRek4wWm5ndGVqWnZOemRxZW1VNVRFRRAB!2m1!1s0x0:0xcf4e14828c73270a!3m1!1s2@1:CAIQACodChtycF9oOnpPa1lfQzN0ZngtejZvNzdqemU5TEE%7C%7C?hl=en",
    text: "We had SS Carpentry and Renovations complete work on our kitchen and tiles, and we’re very happy with the results. The workmanship was excellent, the finishing was clean and professional, and they paid great attention to detail. They were reliable, respectful, and easy to work with throughout the project. Our kitchen looks amazing, and we’re very pleased with how everything turned out. I would definitely recommend SS Carpentry and Renovations to anyone looking for quality renovation work.",
  },
  {
    name: "Sumeta Saroya",
    tag: "Deck & custom joinery",
    reviewUrl:
      "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT25nMU1YcHdPRjloWW5kb2QyUk5ORjgwT0dSRGVuYxAB!2m1!1s0x0:0xcf4e14828c73270a!3m1!1s2@1:CAIQACodChtycF9oOng1MXpwOF9hYndod2RNNF80OGRDenc%7C%7C?hl=en",
    text: "We had an amazing experience getting our backyard deck and some accent work done in our bedrooms. Akash made custom walnut floating shelves and did a really good job installing everything. Whole work was done ahead of schedule and quality workmanship. Highly recommended.",
  },
  {
    name: "The Hartley Project",
    tag: "Google review",
    reviewUrl:
      "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2xoaVdscDRYMmhqVDBaM1F6WnZSM0pDWkdWUFVGRRAB!2m1!1s0x0:0xcf4e14828c73270a!3m1!1s2@1:CAIQACodChtycF9oOlhiWlp4X2hjT0Z3QzZvR3JCZGVPUFE%7C%7C?hl=en",
    text: "Great Job! Clean execution and superb attention to woodwork details.",
  },
];
