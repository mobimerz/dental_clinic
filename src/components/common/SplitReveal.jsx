"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

// Splitting text forces layout reads, so doing it for every heading on page load blocks the
// main thread. Each instance waits until it is about to scroll into view (well before its
// reveal trigger at 85–88%), then splits and sets its start state while still off screen.
function useNearViewport(ref) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === "undefined") return setNear(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px 400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, near]);
  return near;
}

// Splits text with GSAP SplitText and reveals it as it scrolls into view.
//   mode="words"  – words rise out of line masks with a slight rotation (headings)
//   mode="lines"  – lines slide up from masks (body copy)
//   mode="scrub"  – words brighten one by one, tied to scroll position
export default function SplitReveal({ as: Tag = "div", mode = "words", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  const near = useNearViewport(ref);

  useGSAP(
    () => {
      if (!near) return;
      const el = ref.current;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(el, {
          type: mode === "lines" ? "lines" : "lines,words",
          linesClass: "split-line",
          mask: mode === "scrub" ? undefined : "lines",
          autoSplit: true,
          onSplit(self) {
            if (mode === "scrub") {
              return gsap.fromTo(
                self.words,
                { opacity: 0.18 },
                {
                  opacity: 1,
                  stagger: 0.08,
                  ease: "none",
                  scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 45%", scrub: true },
                }
              );
            }
            const targets = mode === "lines" ? self.lines : self.words;
            return gsap.from(targets, {
              yPercent: 115,
              rotate: mode === "lines" ? 0 : 7,
              opacity: 0,
              transformOrigin: "0% 100%",
              duration: mode === "lines" ? 1.05 : 1.2,
              stagger: mode === "lines" ? 0.1 : 0.055,
              ease: "expo.out",
              delay,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [near] }
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
