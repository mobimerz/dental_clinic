"use client";

import { MotionConfig } from "motion/react";
import SmoothScroll from "./SmoothScroll";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";

// Honour the user's OS-level "reduce motion" preference for every Motion animation,
// and mount the site-wide motion layer (smooth scroll, cursor, progress bar).
export default function MotionProvider({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      {children}
      <CustomCursor />
      <SmoothScroll />
    </MotionConfig>
  );
}
