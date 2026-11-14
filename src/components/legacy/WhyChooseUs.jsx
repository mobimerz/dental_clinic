// TEMPORARY: main's original version, kept so this page looks exactly as before until it is moved onto
// the layout system. Delete this file when the page that imports it is refactored.
"use client";

import { useRef } from "react";
import { ClipboardList, HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";
import { GlowOrb, Sparkle } from "@/components/common/FloatingShapes";
import { ToothIcon } from "@/components/common/DentalIcons";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

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

// `linkToPage` adds a button to the full Why Choose Us page (used on the home page).
// `backdrop` is the surface of the section above: the dark panel opens out from an inset card
// while scrolling in, and the space around that card should continue the previous section.
export default function WhyChooseUs({ linkToPage = false, backdrop = "bg-white" }) {
  const root = useRef(null);

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

        gsap.to(q(".why-tooth"), {
          rotate: 40,
          yPercent: -30,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });

        // Timeline rail fills as you scroll through the list
        const list = q(".why-list")[0];
        gsap.fromTo(
          q(".why-progress"),
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 60%", end: "bottom 60%", scrub: true } }
        );

        // Each step slides in, then lights up while it sits at the reading line
        q(".why-item").forEach((item) => {
          const body = item.querySelector(".why-body");
          const node = item.querySelector(".why-node");
          gsap.from(body, {
            x: 70,
            opacity: 0,
            ease: "expo.out",
            duration: 1.2,
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          });
          gsap.from(node, {
            scale: 0,
            rotate: -90,
            ease: "back.out(2)",
            duration: 0.9,
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          });
          gsap.set(item, { "--dim": 0.4 });
          ScrollTrigger.create({
            trigger: item,
            start: "top 62%",
            end: "bottom 62%",
            toggleClass: { targets: item, className: "is-active" },
            onToggle: (self) => gsap.to(item, { "--dim": self.isActive ? 1 : 0.4, duration: 0.5, ease: "power2.out" }),
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div className={backdrop}>
      <section
        ref={root}
        id="why-choose-us"
        aria-labelledby="why-title"
        className="relative overflow-clip bg-secondary section-y text-white"
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
            {linkToPage && (
              <Reveal delay={0.3} className="mt-8">
                <Button href="/why-choose-us" variant="ghost" arrow>
                  See What Sets Us Apart
                </Button>
              </Reveal>
            )}
          </div>

          <ol className="why-list relative">
            {/* Rail and its scroll-driven fill, running through the centre of the icon nodes */}
            <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-0.5 sm:bottom-7 sm:left-7 sm:top-7 -translate-x-1/2 rounded-full bg-white/10" />
            <span
              aria-hidden="true"
              className="why-progress absolute bottom-6 left-6 top-6 w-0.5 sm:bottom-7 sm:left-7 sm:top-7 -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-accent via-[#0A97A6] to-accent shadow-[0_0_14px_rgb(185_229_226/0.6)]"
            />

            {features.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="why-item group relative grid grid-cols-[3rem_1fr] gap-4 pb-10 sm:grid-cols-[3.5rem_1fr] last:pb-0 sm:gap-7 sm:pb-14">
                <span className="why-node relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-secondary text-accent ring-1 ring-white/15 transition-all duration-500 ease-premium group-hover:scale-110 group-[.is-active]:bg-gradient-to-br group-[.is-active]:from-primary group-[.is-active]:to-[#0A97A6] group-[.is-active]:text-white group-[.is-active]:shadow-glow group-[.is-active]:ring-accent/60">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full ring-2 ring-accent/50 opacity-0 group-[.is-active]:animate-ping group-[.is-active]:opacity-100 [animation-duration:2.4s]"
                  />
                  <Icon className="relative h-6 w-6 group-hover:icon-draw" aria-hidden="true" />
                </span>

                <div className="why-body -mt-1 rounded-3xl border-l-2 border-transparent py-1 pl-1 transition-[background-color,border-color,padding] duration-500 ease-premium group-hover:border-accent/60 group-hover:bg-white/[0.04] group-hover:pl-5 sm:pr-6">
                  {/* Dimmed until the step reaches the reading line (--dim is driven by GSAP) */}
                  <div style={{ opacity: "var(--dim, 1)" }}>
                    <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                      <span aria-hidden="true" className="h-px w-8 bg-accent/40 transition-all duration-500 group-hover:w-14 group-[.is-active]:w-14" />
                    </span>
                    <h3 className="mt-3 text-[clamp(0.85rem,4.3vw,1.05rem)] font-bold leading-snug min-[400px]:text-lg sm:text-2xl">{title}</h3>
                    <p className="mt-3 max-w-md text-[0.97rem] leading-relaxed text-white/65">{text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
