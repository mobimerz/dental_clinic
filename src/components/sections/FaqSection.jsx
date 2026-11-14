"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import { FloatingTooth, Sparkle } from "@/components/common/FloatingShapes";

const ease = [0.22, 1, 0.36, 1];

function FaqItem({ q, a, open, onToggle, index, hero }) {
  const id = useId();
  return (
    <Reveal as="li" delay={index * 0.06} y={20}>
      <div
        className={`group ring-1 transition-[background-color,box-shadow,ring-color] duration-500 ease-premium ${hero ? "rounded-[2rem]" : "rounded-3xl"} ${
          open ? "bg-white shadow-lift ring-accent" : "bg-white/60 ring-line hover:bg-white hover:ring-accent/70"
        }`}
      >
        <h3>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={id}
            className={`flex w-full items-center justify-between gap-5 text-left ${hero ? "rounded-[2rem] p-6" : "rounded-3xl px-6 py-5 sm:px-7"}`}
          >
            <span className="flex items-center gap-4">
              <span
                className={`text-xs font-bold tracking-[0.14em] transition-colors duration-500 ${open ? "text-primary" : "text-accent group-hover:text-primary"}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={`font-semibold text-secondary ${hero ? "text-body md:text-lg" : "text-[1.02rem] sm:text-lg"}`}>{q}</span>
            </span>
            <motion.span
              animate={{ rotate: open ? 135 : 0 }}
              transition={{ duration: 0.5, ease }}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                open ? "bg-primary text-white shadow-glow" : "bg-soft text-primary ring-1 ring-accent/60"
              }`}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          </button>
        </h3>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease }}
              className="overflow-hidden"
            >
              <motion.p
                initial={{ y: -10, filter: "blur(4px)" }}
                animate={{ y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease, delay: 0.08 }}
                className={hero ? "px-6 pb-6 text-body text-muted sm:pl-[3.5625rem]" : "px-6 pb-6 text-[0.97rem] leading-relaxed text-muted sm:px-7 sm:pl-[4.6rem]"}
              >
                {a}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

// Accordion of common questions. Only one answer is open at a time.
//   rhythm="hero" puts it on the layout system (aside layout, hero header rhythm, 24px item padding).
export default function FaqSection({ eyebrow = "FAQs", title, description, items, id = "faq", rhythm = "legacy" }) {
  const [open, setOpen] = useState(0);
  const hero = rhythm === "hero";

  return (
    <section aria-labelledby={`${id}-title`} className={`relative overflow-clip bg-soft ${hero ? "section-default" : "section-y"}`}>
      <div aria-hidden="true" className="bg-dots absolute inset-x-0 top-0 h-64 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <FloatingTooth className="left-[5%] top-32 hidden text-primary/15 lg:block" size="h-14 w-14" speed={0.4} />
      <Sparkle className="right-[10%] top-24 hidden h-5 w-5 text-primary/40 md:block" />

      <div
        className={`container-page relative grid ${
          hero ? "gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-10" : "gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
        }`}
      >
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading rhythm={rhythm} id={`${id}-title`} eyebrow={eyebrow} title={title} description={description} align="left" />
        </div>
        <ul className="flex flex-col gap-3">
          {items.map((item, i) => (
            <FaqItem key={item.q} {...item} index={i} hero={hero} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ul>
      </div>
    </section>
  );
}
