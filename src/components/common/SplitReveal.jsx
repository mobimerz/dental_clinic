"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

// Splits text with GSAP SplitText and reveals it as it scrolls into view.
//   mode="words"  – words rise out of line masks with a slight rotation (headings)
//   mode="lines"  – lines slide up from masks (body copy)
//   mode="scrub"  – words brighten one by one, tied to scroll position
export default function SplitReveal({ as: Tag = "div", mode = "words", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);

  useGSAP(
    () => {
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
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
