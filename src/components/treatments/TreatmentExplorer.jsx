"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { card, cardFill } from "@/components/ui/styles";
import Reveal from "@/components/common/Reveal";
import Tilt from "@/components/common/Tilt";
import { FloatingTooth, Sparkle } from "@/components/common/FloatingShapes";
import { treatmentIcons } from "@/components/common/treatmentIcons";
import { treatmentCategories, treatments } from "@/data/treatments";
import { ScrollTrigger } from "@/lib/gsap";

const ease = [0.22, 1, 0.36, 1];
const categoryLabel = Object.fromEntries(treatmentCategories.map((c) => [c.id, c.label]));

function ExplorerCard({ t, index }) {
  const Icon = treatmentIcons[t.icon];
  return (
    <Tilt max={9} scale={1.03} className="h-full">
      <a
        href={`#${t.slug}`}
        className={`group relative overflow-hidden ${card} ${cardFill} transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift hover:ring-accent`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(300px_circle_at_var(--mx,50%)_var(--my,50%),rgb(185_229_226/0.55),transparent_45%)]"
        />
        <span className="relative flex items-start justify-between">
          <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-soft p-3 text-primary ring-1 ring-accent/60 transition-all duration-500 ease-premium group-hover:-rotate-[8deg] group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-glow">
            <Icon className="h-7 w-7 group-hover:icon-draw" aria-hidden="true" />
          </span>
          <span className="rounded-full bg-soft px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary">
            {categoryLabel[t.category]}
          </span>
        </span>
        <h3 className="relative mt-6 text-h3 text-secondary">{t.title}</h3>
        <p className="relative mt-2 flex-1 text-small text-muted">{t.description}</p>
        <span className="relative mt-6 flex items-center justify-between text-sm font-semibold text-primary">
          <span>Read details</span>
          <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-soft transition-colors duration-500 group-hover:bg-primary group-hover:text-white">
            <ArrowDown className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-y-0.5 group-hover:animate-bounce" aria-hidden="true" />
          </span>
        </span>
        <span aria-hidden="true" className="absolute right-6 top-[4.6rem] text-xs font-bold md:right-8 md:top-[5.1rem] text-line transition-colors duration-500 group-hover:text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
      </a>
    </Tilt>
  );
}

// Filterable grid of every treatment. Switching category slides the teal pill across
// the tabs while cards reflow, leave and arrive with a spring.
export default function TreatmentExplorer() {
  const [category, setCategory] = useState("all");
  const visible = category === "all" ? treatments : treatments.filter((t) => t.category === category);

  // Filtering changes this section's height, which moves everything below it; recompute scroll
  // positions once the cards have settled so reveals and the guide's highlight stay in sync.
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => clearTimeout(id);
  }, [category]);

  return (
    <Section bg="soft" id="explorer" aria-labelledby="explorer-title" className="overflow-clip">
      <div aria-hidden="true" className="bg-dots absolute inset-x-0 top-0 h-64 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <FloatingTooth className="left-[4%] top-40 hidden text-primary/20 lg:block" size="h-14 w-14" speed={0.5} />
      <Sparkle className="right-[14%] top-28 hidden h-5 w-5 text-primary/50 md:block" speed={0.3} />

      <Container className="relative">
        <SectionHeading
          id="explorer-title"
          eyebrow="Find Your Treatment"
          title="Browse by What You Need."
          description="Pick a category to narrow things down, then open any treatment to see who it helps and what to expect."
        />

        <Reveal delay={0.2} className="header-gap flex justify-center">
          <div
            role="tablist"
            aria-label="Treatment categories"
            className="scrollbar-soft flex max-w-full gap-1 overflow-x-auto rounded-full bg-white p-1.5 shadow-soft ring-1 ring-line"
          >
            {treatmentCategories.map((c) => {
              const active = c.id === category;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(c.id)}
                  className={`relative shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300 sm:px-5 ${
                    active ? "text-white" : "text-secondary hover:text-primary"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 rounded-full bg-primary shadow-glow"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.ul layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((t, i) => (
              <motion.li
                key={t.slug}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 40, rotateX: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, transition: { duration: 0.7, delay: i * 0.05, ease } }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.3 } }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                style={{ transformPerspective: 1000 }}
              >
                <ExplorerCard t={t} index={treatments.indexOf(t)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </Container>
    </Section>
  );
}
