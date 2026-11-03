"use client";

import { useId } from "react";
import { motion } from "motion/react";

// Glossy, shaded tooth that floats and turns in 3D space. Decorative only.
export default function Tooth3D({ className = "", size = 64, duration = 9, delay = 0, tint = "#B9E5E2" }) {
  const id = useId().replace(/:/g, "");
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{ width: size, height: size, transformPerspective: 600 }}
      initial={{ opacity: 0, scale: 0.4, rotateY: -90 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: [-28, 28, -28],
        rotateX: [10, -12, 10],
        rotateZ: [-8, 6, -8],
        y: [0, -16, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] },
        default: { duration, delay, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-[0_14px_18px_rgb(8_127_140/0.28)]">
        <defs>
          <linearGradient id={`b${id}`} x1="0.15" y1="0" x2="0.85" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#F3FAFA" />
            <stop offset="1" stopColor={tint} />
          </linearGradient>
          <radialGradient id={`h${id}`} cx="0.32" cy="0.25" r="0.5">
            <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M32 12.3c-4.2-3.4-9.8-4.4-14.6-2.1-6.1 3-8.2 10.7-6.1 18 1.4 5 3 9.2 4.2 15.1 1.1 6.1 2.2 11.5 5.9 11.5 4.3 0 4.3-7 5.6-12.3.8-2.9 2.6-4.5 5-4.5s4.2 1.6 5 4.5c1.3 5.3 1.3 12.3 5.6 12.3 3.7 0 4.8-5.4 5.9-11.5 1.2-5.9 2.8-10.1 4.2-15.1 2.1-7.3 0-15-6.1-18-4.8-2.3-10.4-1.3-14.6 2.1z"
          fill={`url(#b${id})`}
          stroke="#087F8C"
          strokeOpacity="0.25"
          strokeWidth="1.2"
        />
        <ellipse cx="22" cy="19" rx="7" ry="5" fill={`url(#h${id})`} transform="rotate(-25 22 19)" />
        <path d="M25.5 22.5c2 1.7 4.2 2.6 6.5 2.6s4.5-.9 6.5-2.6" fill="none" stroke="#087F8C" strokeOpacity="0.3" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

// Translucent glass bubble that bobs gently.
export function GlassBubble({ className = "", size = 40, duration = 7, delay = 0 }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_30%_28%,rgb(255_255_255/0.95),rgb(185_229_226/0.45)_45%,rgb(8_127_140/0.18))] shadow-[inset_0_-6px_14px_rgb(8_127_140/0.18),0_10px_24px_-10px_rgb(8_127_140/0.4)] ring-1 ring-white/70 backdrop-blur-[2px] ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: [1, 1.08, 1], y: [0, -18, 0], x: [0, 6, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        default: { duration, delay, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}
