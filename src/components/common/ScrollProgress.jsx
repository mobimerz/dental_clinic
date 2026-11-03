"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Thin gradient bar along the top edge that tracks page scroll.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-accent via-primary to-[#0A97A6]"
    />
  );
}
