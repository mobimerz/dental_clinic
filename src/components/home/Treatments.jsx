"use client";

import { motion } from "motion/react";
import { ArrowUpRight, ShieldCheck, Smile, Sparkles } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import {
  BracesIcon,
  CrownBridgeIcon,
  ImplantIcon,
  RootCanalIcon,
  WisdomToothIcon,
} from "@/components/common/DentalIcons";
import { treatments } from "@/data/treatments";
import { selectTreatment } from "@/lib/booking";

const icons = {
  implant: ImplantIcon,
  rootCanal: RootCanalIcon,
  smile: Smile,
  sparkles: Sparkles,
  braces: BracesIcon,
  crown: CrownBridgeIcon,
  wisdom: WisdomToothIcon,
  shield: ShieldCheck,
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Treatments() {
  return (
    <section id="treatments" aria-labelledby="treatments-title" className="relative bg-soft py-24 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="bg-dots absolute inset-x-0 top-0 h-64 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-page relative">
        <SectionHeading
          id="treatments-title"
          eyebrow="Our Treatments"
          title="Complete Dental Care, All Under One Roof."
          description="From preventive check-ups to implants and smile makeovers, explore the treatments available at A-Zee Dental."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {treatments.map((t, i) => {
            const Icon = icons[t.icon];
            return (
              <motion.li
                key={t.slug}
                custom={i}
                variants={card}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white p-7 shadow-soft ring-1 ring-line transition-all duration-500 ease-premium hover:-translate-y-2 hover:shadow-lift hover:ring-accent">
                  {/* Hover wash */}
                  <span
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/0 blur-2xl transition-all duration-700 group-hover:bg-accent/60"
                  />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-primary ring-1 ring-accent/60 transition-all duration-500 ease-premium group-hover:-rotate-[8deg] group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-glow">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <span className="absolute right-7 top-8 text-sm font-semibold text-line transition-colors duration-500 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative mt-6 text-lg font-bold text-secondary">{t.title}</h3>
                  <p className="relative mt-2.5 flex-1 text-[0.92rem] leading-relaxed text-muted">{t.description}</p>
                  <a
                    href="#appointment"
                    onClick={() => selectTreatment(t.title)}
                    className="relative mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary"
                    aria-label={`Learn more about ${t.title} and send an enquiry`}
                  >
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1.5px]">
                      Learn More
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </article>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
