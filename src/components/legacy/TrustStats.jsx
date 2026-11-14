// TEMPORARY: main's original version, kept so this page looks exactly as before until it is moved onto
// the layout system. Delete this file when the page that imports it is refactored.
"use client";

import { motion } from "motion/react";
import { HeartHandshake, MapPin, MessageSquareText, Star } from "lucide-react";
import Counter from "@/components/common/Counter";
import Reveal from "@/components/common/Reveal";
import { clinic } from "@/data/clinic";

const stats = [
  {
    icon: Star,
    value: <Counter value={clinic.rating.value} decimals={1} suffix="/5" />,
    label: "Google Rating",
    href: clinic.links.googleProfile,
  },
  {
    icon: MessageSquareText,
    value: <Counter value={clinic.rating.count} />,
    label: "Google Reviews",
    href: clinic.links.googleProfile,
  },
  {
    icon: HeartHandshake,
    value: "Personalized",
    label: "Dental Care Plans",
  },
  {
    icon: MapPin,
    value: "Pai Layout",
    label: "Convenient Bengaluru Location",
    href: clinic.links.googleMaps,
  },
];

// The stats card overlaps the hero above it. When the next section has its own surface
// (e.g. a dark band), `spaced` gives the card the standard section gap below it.
export default function TrustStats({ spaced = false }) {
  return (
    <section id="trust" aria-label="Why patients trust A-Zee Dental" className={`relative z-10 -mt-6 lg:-mt-10 ${spaced ? "section-pb" : ""}`}>
      <div className="container-page">
        {/* The card sits on the first screen, so it must reveal as soon as any of it is visible
            (the default -80px margin would leave it hidden until the user scrolls). */}
        <Reveal variant="tilt" delay={0.3} viewport={{ once: true, margin: "0px" }} className="grid grid-cols-2 overflow-hidden rounded-[2rem] bg-white shadow-lift ring-1 ring-line lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label, href }, i) => {
            const Tag = href ? motion.a : motion.div;
            return (
              <Tag
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group relative flex flex-col items-start gap-4 p-5 transition-colors duration-300 hover:bg-soft sm:flex-row sm:items-center sm:p-7 lg:py-5 ${
                  i % 2 === 0 ? "border-r border-line" : ""
                } ${i < 2 ? "border-b border-line lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""}`}
              >
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-accent to-primary transition-transform duration-700 ease-premium group-hover:scale-x-100" />
                <motion.span
                  initial={{ scale: 0, rotate: -120 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.4 + i * 0.12 }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-soft text-primary ring-1 ring-accent/60 transition-all duration-500 ease-premium group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-glow"
                >
                  <Icon className="h-5 w-5 group-hover:icon-draw" aria-hidden="true" />
                </motion.span>
                <span className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-secondary sm:text-[1.6rem]">{value}</span>
                  <span className="text-[0.82rem] leading-snug text-muted sm:text-sm">{label}</span>
                </span>
              </Tag>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
