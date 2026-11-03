"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useSpring, useTransform } from "motion/react";

// Pulls its child towards the cursor while hovered, then springs back.
// The inner layer travels further than the outer one for a subtle depth effect.
export default function Magnetic({ children, strength = 0.32, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const spring = { stiffness: 230, damping: 16, mass: 0.5 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const ix = useTransform(x, (v) => v * 0.35);
  const iy = useTransform(y, (v) => v * 0.35);

  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={`inline-flex *:flex-1 ${className}`}
    >
      <motion.span style={{ x: ix, y: iy }} className="inline-flex *:flex-1">
        {children}
      </motion.span>
    </motion.span>
  );
}
