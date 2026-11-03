import { ToothIcon } from "./DentalIcons";

// Gently floating tooth outlines and sparkles used as background decoration.
// Loops are CSS keyframes (see globals.css) so they cost no JavaScript per frame.
// `speed` adds scroll parallax (see SmoothScroll); negative values drift the other way.
export function FloatingTooth({ className = "", size = "h-10 w-10", duration = 7, delay = 0, rotate = 8, speed }) {
  return (
    <div
      aria-hidden="true"
      data-speed={speed}
      className={`anim-float-tooth pointer-events-none absolute ${className}`}
      style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s`, "--r": `${rotate}deg` }}
    >
      <ToothIcon className={size} />
    </div>
  );
}

export function Sparkle({ className = "", delay = 0, speed }) {
  return (
    <svg
      aria-hidden="true"
      data-speed={speed}
      viewBox="0 0 24 24"
      className={`anim-sparkle pointer-events-none absolute ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <path d="M12 2c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" fill="currentColor" />
    </svg>
  );
}

// Slow drifting gradient orbs for "gentle background movement".
export function GlowOrb({ className = "", duration = 18, x = 30, y = 20, speed }) {
  return (
    <div
      aria-hidden="true"
      data-speed={speed}
      className={`anim-orb pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ animationDuration: `${duration}s`, "--ox": `${x}px`, "--oy": `${y}px` }}
    />
  );
}
