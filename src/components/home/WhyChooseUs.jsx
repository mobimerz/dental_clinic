"use client";

import { useRef } from "react";
import { ClipboardList, HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { GlowOrb, Sparkle } from "@/components/common/FloatingShapes";
import { ToothIcon } from "@/components/common/DentalIcons";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const features = [
  {
    icon: HeartHandshake,
    title: "Personalized Patient Care",
    text: "Every visit begins by listening. Your treatment is planned around your concerns, comfort and goals.",
  },
  {
    icon: ClipboardList,
    title: "Clear Treatment Guidance",
    text: "We explain your options, the steps involved and what to expect, so you can decide with confidence.",
  },
  {
    icon: ShieldCheck,
    title: "Focus on Hygiene & Comfort",
    text: "Clean, well-kept treatment rooms and a calm, gentle approach to make each appointment feel at ease.",
  },
  {
    icon: Stethoscope,
    title: "Comprehensive Dental Services",
    text: "Preventive, restorative, cosmetic and implant care in one place, for you and your family.",
  },
];

export default function WhyChooseUs() {
  const root = useRef(null);

  const onCardMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Section-to-section transition: the dark panel opens out from an inset rounded card.
        gsap.fromTo(
          root.current,
          { clipPath: "inset(0% 4% 0% 4% round 56px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 25%", scrub: true },
          }
        );

        // Storytelling: the sticky heading's progress rail fills as the cards scroll past.
        gsap.fromTo(
          q(".why-progress"),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: q(".why-cards")[0], start: "top 70%", end: "bottom 60%", scrub: true },
          }
        );

        gsap.to(q(".why-tooth"), {
          rotate: 40,
          yPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });

        q(".why-card").forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 120, rotateY: i % 2 ? -18 : 18, scale: 0.9, transformPerspective: 1000 },
            {
              opacity: 1,
              y: 0,
              rotateY: 0,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 98%", end: "top 62%", scrub: 0.8 },
            }
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="why-choose-us"
      aria-labelledby="why-title"
      className="relative overflow-clip bg-secondary py-24 text-white sm:py-28 lg:py-32"
    >
      <GlowOrb className="-right-40 -top-40 h-[520px] w-[520px] bg-primary/40" speed={0.4} />
      <GlowOrb className="-bottom-48 -left-40 h-[460px] w-[460px] bg-[#0A97A6]/25" duration={24} x={-40} speed={-0.3} />
      <Sparkle className="left-[46%] top-24 hidden h-5 w-5 text-accent/60 lg:block" speed={0.6} />
      <Sparkle className="bottom-24 right-[8%] h-4 w-4 text-accent/40" delay={1.2} speed={-0.4} />
      <ToothIcon
        aria-hidden="true"
        className="why-tooth pointer-events-none absolute -right-20 bottom-[-6rem] h-[26rem] w-[26rem] text-white/[0.04]"
      />

      <div className="container-page relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="why-title"
            eyebrow="Why Choose A-Zee Dental?"
            title="Your Comfort Comes First."
            description="We believe great dentistry starts with trust: honest advice, gentle care and a space that puts you at ease."
            align="left"
            inverted
          />
          <div aria-hidden="true" className="mt-10 hidden h-40 w-[3px] overflow-hidden rounded-full bg-white/10 lg:block">
            <div className="why-progress h-full w-full origin-top rounded-full bg-gradient-to-b from-accent to-primary" />
          </div>
        </div>

        <ul className="why-cards grid gap-5 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className={i % 2 === 1 ? "sm:translate-y-10" : ""}>
              <div
                onPointerMove={onCardMove}
                className="why-card group relative h-full overflow-hidden rounded-[1.75rem] bg-white/[0.05] p-7 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-500 ease-premium hover:-translate-y-1 hover:bg-white/[0.09] hover:ring-accent/40"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(260px_circle_at_var(--mx)_var(--my),rgb(185_229_226/0.16),transparent_60%)]"
                />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#0A97A6] text-white shadow-glow transition-transform duration-500 ease-premium group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="h-6 w-6 transition-transform duration-700 ease-premium group-hover:rotate-[360deg] group-hover:icon-draw" aria-hidden="true" />
                </span>
                <span aria-hidden="true" className="absolute right-7 top-8 text-4xl font-extrabold text-white/[0.06] transition-all duration-500 group-hover:-translate-y-1 group-hover:text-accent/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative mt-6 text-lg font-bold">{title}</h3>
                <p className="relative mt-2.5 text-[0.93rem] leading-relaxed text-white/65">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
