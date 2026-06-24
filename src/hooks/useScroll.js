import { useState, useEffect } from "react";

/**
 * useScrollReveal
 * Adds IntersectionObserver to all elements with class "reveal".
 * When they enter the viewport, adds class "visible".
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // If scrolled to bottom, force-activate the last section
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 60;
      if (atBottom && sectionIds.length > 0) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      const active = sectionIds.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 120 && bottom > 120;
      });

      if (active) setActiveSection(active);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds]);

  return { scrolled, activeSection };
}
