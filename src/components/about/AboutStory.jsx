"use client";

import { useRef } from "react";
import Image from "next/image";
import { Award, CalendarHeart, MessageSquareText, Star } from "lucide-react";
import Counter from "@/components/common/Counter";
import Reveal from "@/components/common/Reveal";
import SplitReveal from "@/components/common/SplitReveal";
import { Eyebrow } from "@/components/common/SectionHeading";
import { FloatingTooth, Sparkle } from "@/components/common/FloatingShapes";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { clinic, clinicImages } from "@/data/clinic";

const yearsOpen = new Date().getFullYear() - clinic.established;

const stats = [
  { icon: CalendarHeart, value: <Counter value={clinic.established} duration={2.2} />, label: "Caring for smiles since" },
  { icon: Award, value: <Counter value={clinic.doctor.experienceYears} suffix="+" />, label: "Years of dental experience" },
  { icon: Star, value: <Counter value={clinic.rating.value} decimals={1} suffix="/5" />, label: "Google rating" },
  { icon: MessageSquareText, value: <Counter value={clinic.rating.count} suffix="+" />, label: "Google reviews" },
];

// "Our story": the clinic's own description brightening word by word, a pair of photos that slide apart, and a row of counting stats.
export default function AboutStory() {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: q(".story-photos")[0], start: "top 80%", once: true } });
        tl.fromTo(
          q(".story-photo-a"),
          { clipPath: "inset(0% 0% 100% 0% round 32px)" },
          { clipPath: "inset(0% 0% 0% 0% round 32px)", duration: 1.4, ease: "expo.inOut" }
        )
          .fromTo(q(".story-photo-a img"), { scale: 1.4 }, { scale: 1, duration: 2, ease: "expo.out" }, "<0.3")
          .fromTo(
            q(".story-photo-b"),
            { clipPath: "inset(100% 0% 0% 0% round 28px)", y: 60 },
            { clipPath: "inset(0% 0% 0% 0% round 28px)", y: 0, duration: 1.4, ease: "expo.inOut" },
            "-=1.6"
          )
          .from(q(".story-badge"), { scale: 0, rotate: -40, duration: 1, ease: "back.out(2)" }, "-=0.6");

        gsap.from(q(".story-stat"), {
          y: 50,
          opacity: 0,
          rotateX: -40,
          transformPerspective: 900,
          stagger: 0.12,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: q(".story-stats")[0], start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="story-title" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="flex flex-col items-start">
          <Reveal>
            <Eyebrow>Our Story</Eyebrow>
          </Reveal>
          <SplitReveal
            as="h2"
            id="story-title"
            className="mt-5 text-balance text-[1.75rem] font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-[2.85rem]"
          >
            A Family Dental Clinic, <span className="text-primary">Rooted in Pai Layout.</span>
          </SplitReveal>
          <SplitReveal as="p" mode="scrub" className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            Established in {clinic.established}, A-Zee Dental &amp; Implant Centre is a family dental clinic in Bengaluru
            providing comprehensive dental care for children and adults. For over {yearsOpen} years, families from Pai
            Layout, Old Madras Road and nearby neighbourhoods have trusted us with everything from their first check-up to
            implants and smile makeovers.
          </SplitReveal>
          <SplitReveal as="p" mode="lines" delay={0.1} className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Our focus has stayed the same since day one: preventive, painless and personalized dental care that helps
            every patient keep a healthy, confident smile.
          </SplitReveal>
        </div>

        <div className="story-photos relative mx-auto w-full max-w-[520px] pb-20 pl-8 sm:pl-16">
          <div className="story-photo-a relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
            <Image
              src={clinicImages.treatmentRoomAlt.src}
              alt={clinicImages.treatmentRoomAlt.alt}
              fill
              sizes="(min-width: 1024px) 440px, 85vw"
              className="object-cover transition-transform duration-[1.6s] ease-premium hover:scale-105"
            />
          </div>
          <div
            data-speed="0.25"
            className="story-photo-b absolute bottom-0 left-0 w-[46%] overflow-hidden rounded-[1.75rem] border-[6px] border-white shadow-lift"
          >
            <div className="relative aspect-square">
              <Image src={clinicImages.reception.src} alt={clinicImages.reception.alt} fill sizes="240px" className="object-cover" />
            </div>
          </div>
          <div
            data-speed="-0.2"
            className="story-badge absolute -right-2 top-8 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-primary text-center text-white shadow-glow sm:-right-6 sm:h-32 sm:w-32"
          >
            <span className="text-3xl font-extrabold leading-none sm:text-4xl">{yearsOpen}+</span>
            <span className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent">Years in<br />Pai Layout</span>
          </div>
          <FloatingTooth className="-left-2 top-1/3 text-accent" size="h-10 w-10" speed={0.4} />
          <Sparkle className="bottom-28 right-6 h-5 w-5 text-primary/60" delay={0.8} />
        </div>
      </div>

      <div className="container-page relative mt-20">
        <ul className="story-stats grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <li key={label} className="story-stat">
              {/* Hover styles live on this inner card so their CSS transition never fights the GSAP entrance */}
              <div className="group relative h-full overflow-hidden rounded-3xl bg-white p-6 shadow-soft ring-1 ring-line transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift hover:ring-accent sm:p-7">
                <span aria-hidden="true" className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/0 blur-2xl transition-colors duration-700 group-hover:bg-accent/70" />
                <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-soft text-primary ring-1 ring-accent/60 transition-all duration-500 ease-premium group-hover:-rotate-6 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-5 w-5 group-hover:icon-draw" aria-hidden="true" />
                </span>
                <p className="relative mt-5 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">{value}</p>
                <p className="relative mt-1.5 text-sm text-muted">{label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
