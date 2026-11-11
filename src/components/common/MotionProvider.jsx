"use client";

import { MotionConfig } from "motion/react";
import SmoothScroll from "./SmoothScroll";

// Honour the user's OS-level "reduce motion" preference for every Motion animation,
// and mount the site-wide motion layer (smooth scroll).
export default function MotionProvider({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <SmoothScroll />
    </MotionConfig>
  );
}
