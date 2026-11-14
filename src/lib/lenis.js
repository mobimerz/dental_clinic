// Shared handle to the Lenis smooth-scroll instance (null when reduced motion is on).
let instance = null;

export const HEADER_OFFSET = -88;

// Fired on window when an in-page jump starts: detail = { id, duration } (seconds).
export const JUMP_EVENT = "anchorjump";

export function setLenis(lenis) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

// Document position of an element from layout alone. getBoundingClientRect would include
// entrance transforms (e.g. a panel still waiting to slide up 80px), which lands the scroll too low.
export function layoutTop(el) {
  let top = 0;
  for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
  return top;
}

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Smooth in-page jump. Ease-in-out with a distance-based duration, so long jumps don't crawl through
// the last stretch (the site's ease-out scroll curve made them look like they stopped one item early).
export function jumpTo(el, { immediate = false } = {}) {
  if (!el) return;
  const target = Math.max(0, layoutTop(el) + HEADER_OFFSET);
  if (!instance) {
    window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
    return;
  }
  const distance = Math.abs(target - instance.scroll);
  const duration = immediate ? 0 : Math.min(1.6, 0.6 + distance / 6000);
  if (el.id) window.dispatchEvent(new CustomEvent(JUMP_EVENT, { detail: { id: el.id, duration } }));
  instance.scrollTo(target, immediate ? { immediate: true, force: true } : { duration, easing: easeInOutCubic, force: true });
}
