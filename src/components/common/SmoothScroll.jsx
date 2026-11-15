"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";
import { jumpTo, setLenis } from "@/lib/lenis";

// Lenis smooth scrolling driven by GSAP's ticker, plus the site-wide `data-speed` parallax.
// Starts when the browser is idle after first render, so it never competes with page load.
// Touch devices skip Lenis entirely: it doesn't smooth touch scrolling, it only adds a per-frame
// loop. In-page links still glide there via jumpTo's native smooth-scroll fallback.
export default function SmoothScroll() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    const start = () => mm.add(MOTION_OK, () => {
      const touch = window.matchMedia("(pointer: coarse)").matches;
      const lenis = touch
        ? null
        : new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 1.4,
          });
      setLenis(lenis);

      lenis?.on("scroll", ScrollTrigger.update);

      // Same-page #links (side menus, "Read details" cards, footer links) always scroll through Lenis.
      // A native hash jump moves the page behind Lenis's back, and the next wheel scroll pulls it
      // back to where it was. Capture phase, so it runs before Next's <Link> handles the click.
      const onClick = (e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const a = e.target.closest?.("a[href*='#']");
        if (!a || a.target === "_blank") return;
        const url = new URL(a.href, window.location.href);
        if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.hash.length < 2) return;
        const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        // The "skip to content" link keeps native behaviour so keyboard focus moves with it.
        if (!el || el.tagName === "MAIN") return;
        e.preventDefault();
        jumpTo(el);
        window.history.replaceState(null, "", url.hash);
      };
      document.addEventListener("click", onClick, true);

      // Arriving from another page with a #hash: once layout has settled, land on that element.
      const landOnHash = () => {
        const id = decodeURIComponent(window.location.hash.slice(1));
        const el = id && document.getElementById(id);
        if (!el) return;
        ScrollTrigger.refresh();
        jumpTo(el, { immediate: true });
      };
      const hashTimer = setTimeout(landOnHash, 400);
      const tick = (time) => lenis.raf(time * 1000);
      if (lenis) {
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }

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
        document.removeEventListener("click", onClick, true);
        clearTimeout(hashTimer);
        gsap.ticker.remove(tick);
        lenis?.destroy();
        setLenis(null);
      };
    });

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : window.setTimeout(start, 300);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
}
