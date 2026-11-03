// Shared handle to the Lenis smooth-scroll instance (null when reduced motion is on).
let instance = null;

export const HEADER_OFFSET = -88;

export function setLenis(lenis) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

// Smooth-scroll to an element, falling back to native scrolling without Lenis.
export function scrollToElement(el, options = {}) {
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { offset: HEADER_OFFSET, duration: 1.4, ...options });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: options.block || "start" });
  }
}
