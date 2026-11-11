"use client";

import { useRef } from "react";
import { HandHeart, ShieldPlus, Syringe } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { ToothIcon } from "@/components/common/DentalIcons";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

// The clinic's own three-word promise from its Google Business Profile.
const values = [
  {
    word: "Preventive",
    icon: ShieldPlus,
    title: "Small problems, caught early.",
    text: "Regular check-ups, professional cleaning and early fillings keep treatment simple. We'd always rather prevent a problem than repair one.",
    points: ["Six-monthly check-ups", "Professional cleaning", "Early cavity care"],
    theme: "bg-white text-secondary ring-1 ring-line",
    muted: "text-muted",
    chip: "bg-soft text-primary ring-1 ring-accent/60",
  },
  {
    word: "Painless",
    icon: Syringe,
    title: "Gentle at every step.",
    text: "Local anaesthesia, a calm pace and a team that checks in with you throughout, so even root canals and extractions feel manageable.",
    points: ["Comfort-first techniques", "Nothing rushed", "Clear aftercare"],
    theme: "bg-primary text-white",
    muted: "text-white/75",
    chip: "bg-white/15 text-white ring-1 ring-white/25",
  },
  {
    word: "Personalized",
    icon: HandHeart,
    title: "Planned around you.",
    text: "Every mouth and every budget is different. We explain your options honestly and build a plan that fits your needs, comfort and goals.",
    points: ["Options explained", "Plans that fit you", "Care for every age"],
    theme: "bg-secondary text-white",
    muted: "text-white/65",
    chip: "bg-white/10 text-accent ring-1 ring-white/15",
  },
];

// Cards stack on top of each other while scrolling; each one settles back and dims
// as the next slides over it.
export default function ValuesStack() {
  const root = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".value-card", root.current);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.querySelector(".value-inner"), {
            scale: 0.9 + i * 0.025,
            rotate: i % 2 ? 1.5 : -1.5,
            filter: "brightness(0.85)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top 85%", end: "top 20%", scrub: true },
          });
        });
        cards.forEach((card) => {
          gsap.from(card.querySelector(".value-word"), {
            xPercent: 30,
            opacity: 0,
            ease: "expo.out",
            duration: 1.4,
            scrollTrigger: { trigger: card, start: "top 75%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="values-title" className="relative section-y">
      <div className="container-page">
        <SectionHeading
          id="values-title"
          eyebrow="Our Philosophy"
          title="Preventive. Painless. Personalized."
          description="Three words that shape every appointment at A-Zee Dental, whether it's a quick check-up or a full smile makeover."
        />

        <ol className="mt-16">
          {values.map(({ word, icon: Icon, title, text, points, theme, muted, chip }, i) => (
            <li key={word} className="value-card sticky pb-8 last:pb-0" style={{ top: `${110 + i * 28}px` }}>
              <article className={`value-inner relative origin-top overflow-hidden rounded-[2.5rem] p-8 shadow-lift sm:p-12 lg:p-14 ${theme}`}>
                <ToothIcon aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-6 h-56 w-56 opacity-[0.07] sm:h-72 sm:w-72" />
                <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
                  <div>
                    <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${chip}`}>
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <p className="value-word mt-6 text-[clamp(2rem,9vw,5.5rem)] font-extrabold leading-none tracking-[-0.04em]">
                      {word}
                    </p>
                    <p className={`mt-3 text-sm font-semibold uppercase tracking-[0.2em] ${muted}`}>
                      {String(i + 1).padStart(2, "0")} / {String(values.length).padStart(2, "0")}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold sm:text-3xl">{title}</h3>
                    <p className={`mt-4 text-base leading-relaxed sm:text-lg ${muted}`}>{text}</p>
                    <ul className="mt-7 flex flex-wrap gap-2.5">
                      {points.map((p) => (
                        <li key={p} className={`rounded-full px-4 py-2 text-sm font-semibold ${chip}`}>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
