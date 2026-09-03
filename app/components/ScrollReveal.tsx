"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Mounted once in the root layout so every route gets the scroll-reveal
 * treatment, not just the home page. Re-runs on every route change
 * (`pathname` dependency) since the App Router keeps this layout mounted
 * across client-side navigations — without that, elements on a
 * client-navigated page would never be observed and would stay invisible
 * behind the `body.js-loaded .reveal { opacity: 0 }` rule in globals.css.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add("js-loaded");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );
    revealElements.forEach((el) => observer.observe(el));

    // Smoothly reveal hero elements right on page load
    const timer = setTimeout(() => {
      document.querySelectorAll(".hero-reveal").forEach((el) => {
        el.classList.add("revealed");
        observer.unobserve(el);
      });
    }, 60);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
