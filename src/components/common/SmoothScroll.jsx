"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";
import { HEADER_OFFSET, setLenis } from "@/lib/lenis";

// Lenis smooth scrolling driven by GSAP's ticker, plus the site-wide `data-speed` parallax.
export default function SmoothScroll() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: { offset: HEADER_OFFSET, duration: 1.4, force: true },
        touchMultiplier: 1.4,
      });
      setLenis(lenis);

      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Any element with data-speed drifts against the scroll. It animates the CSS
      // `translate` property, so it stacks with Motion/Tailwind transforms on the same node.
      gsap.utils.toArray("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed) || 0;
        gsap.fromTo(
          el,
          { "--py": `${speed * 160}px` },
          {
            "--py": `${speed * -160}px`,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
}
