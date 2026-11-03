"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

// Trailing ring that follows the mouse, swells over interactive elements and shows
// a label over anything marked with data-cursor-label. Mouse/trackpad only.
export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 520, damping: 40, mass: 0.6 });
  const dx = useSpring(x, { stiffness: 1400, damping: 60 });
  const dy = useSpring(y, { stiffness: 1400, damping: 60 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target instanceof Element ? e.target : null;
      const labelled = target?.closest("[data-cursor-label]");
      setLabel(labelled ? labelled.getAttribute("data-cursor-label") : "");
      setHovering(!!target?.closest("a, button, [role='button'], input, select, textarea, label"));
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 88 : hovering ? 56 : 34;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: sx, y: sy }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border ${
            label
              ? "border-primary bg-primary text-white shadow-glow"
              : hovering
                ? "border-primary/50 bg-primary/10 backdrop-blur-[2px]"
                : "border-primary/45"
          }`}
          animate={{ width: size, height: size, scale: down ? 0.82 : 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="text-[0.7rem] font-bold uppercase tracking-[0.14em]"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x: dx, y: dy }} animate={{ opacity: visible && !label ? 1 : 0 }}>
        <span className="block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
      </motion.div>
    </div>
  );
}
