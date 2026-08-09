import { useState, useEffect } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * useScrollReveal
 * Adds IntersectionObserver to all elements with class "reveal".
 * When they enter the viewport, adds class "visible".
 * Each element is unobserved once revealed - the animation only runs once.
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    // No animation to stage: show everything straight away.
    if (prefersReducedMotion()) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/**
 * useActiveSection
 * Tracks which section is currently in the viewport.
 * Returns: { scrolled (bool), activeSection (string) }
 */
export function useActiveSection(sectionIds = []) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");

  // Nav pill background. window.scrollY is a cheap read - no layout forced.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (elements.length === 0) return;

    // A section counts as active while it covers the middle of the viewport.
    // Doing this with an observer avoids reading getBoundingClientRect() for
    // every section on every scroll event, which forced a reflow each frame.
    const observer = new IntersectionObserver(
      (entries) => {
        const entered = entries.filter((e) => e.isIntersecting);
        if (entered.length === 0) return;
        // Topmost wins when two sections briefly straddle the midline.
        const top = entered.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b
        );
        setActiveSection(top.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));

    // The last section is often shorter than half the viewport, so the midline
    // never reaches it. Pin it once the page is scrolled to the end.
    let frame = 0;
    const lastId = sectionIds[sectionIds.length - 1];
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 60;
        if (atBottom) setActiveSection(lastId);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sectionIds]);

  return { scrolled, activeSection };
}
