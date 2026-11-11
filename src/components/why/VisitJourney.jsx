"use client";

import { useRef } from "react";
import { CalendarCheck, ClipboardList, HeartHandshake, MessageCircle, Stethoscope } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { GlowOrb } from "@/components/common/FloatingShapes";
import { gsap, useGSAP } from "@/lib/gsap";

const steps = [
  {
    icon: MessageCircle,
    title: "Reach Out",
    text: "Message us on WhatsApp or call. Tell us what's bothering you and we'll find a time that suits you, mornings, evenings or Sunday.",
  },
  {
    icon: Stethoscope,
    title: "Unhurried Consultation",
    text: "A thorough check of your teeth and gums, with X-rays where needed. We listen first and examine gently.",
  },
  {
    icon: ClipboardList,
    title: "A Clear Plan",
    text: "Your options, the steps involved and what to expect, explained in plain language so you can decide with confidence.",
  },
  {
    icon: HeartHandshake,
    title: "Comfortable Treatment",
    text: "Care carried out at a calm pace with a painless, comfort-first approach, and we check in with you throughout.",
  },
  {
    icon: CalendarCheck,
    title: "Aftercare & Follow-up",
    text: "Simple aftercare guidance, a follow-up when needed and reminders for your next check-up to keep your smile healthy.",
  },
];

// "Your visit, step by step". On desktop the section pins and the steps travel sideways
// as you scroll, with a progress line filling beneath; on smaller screens it's a vertical list.
export default function VisitJourney() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = q(".journey-track")[0];
        const distance = () => track.scrollWidth - track.parentElement.clientWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: q(".journey-pin")[0],
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo(
          q(".journey-progress"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: q(".journey-pin")[0],
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
        q(".journey-card").forEach((card) => {
          gsap.from(card.querySelector(".journey-icon"), {
            scale: 0,
            rotate: -120,
            ease: "back.out(2)",
            duration: 0.9,
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 85%", once: true },
          });
        });
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        q(".journey-card").forEach((card) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="journey-title" className="relative overflow-clip bg-soft">
      <div className="journey-pin relative flex min-h-screen flex-col justify-center py-16 sm:py-20 lg:py-24">
        <GlowOrb className="-right-40 top-10 h-[460px] w-[460px] bg-accent/70" />
        <div className="container-page relative">
          <SectionHeading
            id="journey-title"
            eyebrow="Your Visit, Step by Step"
            title="No Surprises. Just Clear, Gentle Care."
            description="Here's what a typical journey looks like at A-Zee Dental, from your first message to your follow-up."
            align="left"
          />
        </div>

        <div className="container-page relative mt-12 lg:mt-14">
          <div className="lg:overflow-visible">
            <ol className="journey-track flex flex-col gap-5 lg:w-max lg:flex-row lg:gap-6 lg:pr-[10vw]">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <li
                  key={title}
                  className="journey-card group relative flex flex-col overflow-hidden rounded-[2rem] bg-white p-7 shadow-soft ring-1 ring-line transition-[translate,box-shadow] duration-500 ease-premium hover:-translate-y-2 hover:shadow-lift hover:ring-accent sm:p-8 lg:h-[340px] lg:w-[360px]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-3 -top-6 select-none text-[7rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_rgb(8_127_140/0.12)] transition-all duration-700 group-hover:[-webkit-text-stroke:1.5px_rgb(8_127_140/0.35)]"
                  >
                    {i + 1}
                  </span>
                  <span className="journey-icon relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#0A97A6] text-white shadow-glow transition-transform duration-500 ease-premium group-hover:-rotate-[10deg] group-hover:scale-110">
                    <Icon className="h-7 w-7 group-hover:icon-draw" aria-hidden="true" />
                  </span>
                  <span className="relative mt-auto pt-8 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative mt-2 text-xl font-bold text-secondary sm:text-2xl">{title}</h3>
                  <p className="relative mt-3 text-[0.95rem] leading-relaxed text-muted">{text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div aria-hidden="true" className="mt-10 hidden h-1 overflow-hidden rounded-full bg-white ring-1 ring-line lg:block">
            <div className="journey-progress h-full origin-left rounded-full bg-gradient-to-r from-accent via-primary to-[#0A97A6]" />
          </div>
        </div>
      </div>
    </section>
  );
}
