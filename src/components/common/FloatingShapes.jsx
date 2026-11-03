"use client";

import { motion } from "motion/react";
import { ToothIcon } from "./DentalIcons";

// Gently floating tooth outlines and sparkles used as background decoration.
export function FloatingTooth({ className = "", size = "h-10 w-10", duration = 7, delay = 0, rotate = 8 }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      animate={{ y: [0, -14, 0], rotate: [-rotate, rotate, -rotate] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <ToothIcon className={size} />
    </motion.div>
  );
}

export function Sparkle({ className = "", delay = 0 }) {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`pointer-events-none absolute ${className}`}
      animate={{ scale: [0.7, 1.1, 0.7], opacity: [0.4, 1, 0.4], rotate: [0, 45, 0] }}
      transition={{ duration: 4.5, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M12 2c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" fill="currentColor" />
    </motion.svg>
  );
}

// Slow drifting gradient orbs for "gentle background movement".
export function GlowOrb({ className = "", duration = 18, x = 30, y = 20 }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={{ x: [0, x, 0], y: [0, y, 0], scale: [1, 1.08, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
