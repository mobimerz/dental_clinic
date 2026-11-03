"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

// 3D pointer tilt with a moving glare highlight and a shadow that follows the tilt.
// Also exposes --mx / --my (cursor position in %) to children for spotlight effects.
export default function Tilt({
  children,
  className = "",
  max = 9,
  scale = 1.02,
  glare = true,
  shadow = true,
  radius = "rounded-[1.75rem]",
  ...rest
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rx = useSpring(0, spring);
  const ry = useSpring(0, spring);
  const s = useSpring(1, spring);
  const hover = useSpring(0, spring);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.55), transparent 55%)`;
  const boxShadow = useTransform([rx, ry, hover], ([x, y, h]) =>
    shadow
      ? `${-y * 1.6}px ${x * 1.6 + 18 + h * 14}px ${36 + h * 28}px -16px rgb(11 52 64 / ${0.1 + h * 0.18})`
      : "none"
  );

  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
    ref.current.style.setProperty("--mx", `${px * 100}%`);
    ref.current.style.setProperty("--my", `${py * 100}%`);
  };
  const onEnter = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    s.set(scale);
    hover.set(1);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    s.set(1);
    hover.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, scale: s, transformPerspective: 1100, boxShadow }}
      className={`group/tilt relative ${radius} ${className}`}
      {...rest}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden="true"
          style={{ background: glareBg, opacity: hover }}
          className={`pointer-events-none absolute inset-0 z-20 ${radius} mix-blend-soft-light`}
        />
      )}
    </motion.div>
  );
}
