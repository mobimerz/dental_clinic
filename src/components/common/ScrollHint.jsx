"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getLenis } from "@/lib/lenis";

// "There's more below" cue, pinned to the bottom centre of the screen on every page. It shows
// while the visitor is still at the top of a page that has more to scroll, and fades away as soon
// as they scroll. Clicking it moves the page down by most of a screen.
export default function ScrollHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const more = document.documentElement.scrollHeight - window.innerHeight > 200;
      setVisible(more && window.scrollY < 40);
    };
    // A short delay so it appears after the banner has drawn in, not on top of it.
    const timer = setTimeout(update, 600);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const goDown = () => {
    const target = Math.round(window.innerHeight * 0.75);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={goDown}
      aria-label="Scroll down to see more"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/95 py-2.5 pl-4 pr-3 text-sm font-semibold text-secondary shadow-lift ring-1 ring-line backdrop-blur transition-all duration-500 ease-premium hover:bg-primary hover:text-white hover:ring-primary sm:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      Scroll to explore
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-soft text-primary motion-safe:animate-bounce">
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </span>
    </button>
  );
}
