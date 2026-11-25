"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1];

// Wrapper that used to animate sections in on scroll. It now renders them in their final state
// on page load (initial={false}), so nothing waits for the reader to scroll to it.
//   variant="fade"  – fade-up (default)
//   variant="clip"  – inset mask opens out from the centre
//   variant="tilt"  – rises while un-tilting from a 3D angle
export default function Reveal({ children, delay = 0, y = 28, variant = "fade", className, as = "div", viewport, ...rest }) {
  const Component = motion[as];
  const states = {
    fade: {
      hidden: { opacity: 0, y },
      show: { opacity: 1, y: 0 },
    },
    clip: {
      hidden: { opacity: 0, clipPath: "inset(14% 14% 14% 14% round 32px)", scale: 1.04 },
      show: { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 32px)", scale: 1, transitionEnd: { clipPath: "none" } },
    },
    tilt: {
      hidden: { opacity: 0, y: y * 2, rotateX: -24, transformPerspective: 1000 },
      show: { opacity: 1, y: 0, rotateX: 0, transformPerspective: 1000 },
    },
  }[variant];

  return (
    <Component
      className={className}
      initial={false}
      animate="show"
      variants={states}
      transition={{ duration: variant === "clip" ? 1.2 : 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </Component>
  );
}
