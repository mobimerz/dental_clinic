"use client";

import { useRef } from "react";
import { HandHeart, ShieldPlus, Syringe } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { panel } from "@/components/ui/styles";
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
    word: "Comfortable",
    icon: Syringe,
    title: "Your comfort comes first.",
    text: "We believe dental care should feel reassuring at every step. With a gentle approach, clear communication and attention to your needs, we strive to make every visit a relaxed and positive experience.",
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

// Sticky offsets: each card stops 28px below the one before it, so the stack stays readable.
const stickyTop = ["top-[110px]", "top-[138px]", "top-[166px]"];

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
    <Section ref={root} aria-labelledby="values-title">
      <Container>
        <SectionHeading
          rhythm="hero"
          id="values-title"
          eyebrow="Our Philosophy"
          title="Preventive. Comfortable. Personalized."
          description="Three words that shape every appointment at A-Zee Dental, whether it's a quick check-up or a full smile makeover."
        />

        <ol className="header-gap">
          {values.map(({ word, icon: Icon, title, text, points, theme, muted, chip }, i) => (
            <li key={word} className={`value-card sticky pb-8 last:pb-0 ${stickyTop[i]}`}>
              <article className={`value-inner relative origin-top overflow-hidden shadow-lift ${panel} ${theme}`}>
                <ToothIcon aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-6 h-56 w-56 opacity-[0.07] sm:h-72 sm:w-72" />
                <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
                  <div>
                    <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${chip}`}>
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <p className="value-word mt-6 text-[clamp(2rem,9vw,4.1rem)] font-extrabold leading-none tracking-[-0.04em]">
                      {word}
                    </p>
                    <p className={`mt-3 text-sm font-semibold uppercase tracking-[0.2em] ${muted}`}>
                      {String(i + 1).padStart(2, "0")} / {String(values.length).padStart(2, "0")}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-h3-lg">{title}</h3>
                    <p className={`mt-4 text-lead ${muted}`}>{text}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
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
      </Container>
    </Section>
  );
}
