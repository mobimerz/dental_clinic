"use client";

import { MotionConfig } from "motion/react";

// Honour the user's OS-level "reduce motion" preference for every Motion animation.
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
