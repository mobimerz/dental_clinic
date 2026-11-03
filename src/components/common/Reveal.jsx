"use client";

import { motion } from "motion/react";

// Scroll-triggered fade-up used across sections.
export default function Reveal({ children, delay = 0, y = 28, className, as = "div", ...rest }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}
