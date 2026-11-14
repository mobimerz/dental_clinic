"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Baby, HeartPulse, Quote, Smile } from "lucide-react";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";
import SplitReveal from "@/components/common/SplitReveal";
import StarRating from "@/components/common/StarRating";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { Eyebrow } from "@/components/common/SectionHeading";
import { GlowOrb, Sparkle } from "@/components/common/FloatingShapes";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { clinic, clinicImages, whatsappLink } from "@/data/clinic";

const highlights = [
  { icon: HeartPulse, title: `${clinic.doctor.experienceYears} years of smile care`, text: "Experience across everyday and advanced dental treatments." },
  { icon: Smile, title: "Painless, gentle approach", text: "Comfort comes first, from the first check-up to complex procedures." },
  { icon: Baby, title: "Care for the whole family", text: "Children and adults are treated with the same patience and attention." },
];

// Circular badge whose lettering slowly turns around the portrait's corner.
function SpinningBadge() {
  return (
    <div className="relative h-32 w-32 sm:h-36 sm:w-36">
      <svg viewBox="0 0 120 120" className="anim-spin-slow absolute inset-0 h-full w-full [animation-duration:24s]" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-secondary text-[10.5px] font-bold uppercase tracking-[0.28em]">
          <textPath href="#badge-circle">Painless · Family · Dentistry ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-[30%] flex items-center justify-center rounded-full bg-primary text-white shadow-glow">
        <Smile className="h-6 w-6" aria-hidden="true" />
      </span>
    </div>
  );
}

export default function DoctorSpotlight() {
  const root = useRef(null);
  const img = clinicImages.doctorPortrait;

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: q(".doc-frame")[0], start: "top 78%", once: true } });
        tl.fromTo(
          q(".doc-frame"),
          { clipPath: "circle(0% at 50% 60%)" },
          { clipPath: "circle(75% at 50% 50%)", duration: 1.6, ease: "expo.inOut" }
        ).fromTo(q(".doc-frame img"), { scale: 1.35 }, { scale: 1, duration: 2.2, ease: "expo.out" }, "<0.2");

        gsap.to(q(".doc-photo"), {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="doctor-title" className="relative overflow-hidden bg-soft section-y">
      <div aria-hidden="true" className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_left,black,transparent_60%)]" />
      <GlowOrb className="-left-32 top-20 h-[420px] w-[420px] bg-accent/70" />

      <div className="container-page relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-20">
        <div className="relative mx-auto w-full max-w-[420px] lg:self-start xl:flex xl:max-w-none xl:flex-col xl:self-stretch">
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, rotate: -14, scale: 0.85 }}
            whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 -translate-x-5 translate-y-5 rounded-[2.75rem] bg-gradient-to-br from-primary/30 to-accent"
          />
          <div className="doc-frame relative aspect-[4/5] overflow-hidden rounded-[2.75rem] bg-accent shadow-lift xl:aspect-auto xl:flex-1">
            <div className="doc-photo absolute inset-x-0 -inset-y-[8%]">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 520px, 90vw" className="object-cover object-[50%_20%]" />
            </div>
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-secondary/80 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 text-white">
              <p className="text-lg font-bold">{clinic.doctor.name}</p>
              <p className="text-sm text-white/80">{clinic.doctor.focus}</p>
            </div>
          </div>
          <Reveal delay={0.6} variant="tilt" className="absolute -right-4 -top-8 sm:-right-12">
            <SpinningBadge />
          </Reveal>
          <Sparkle className="-left-4 top-1/4 h-6 w-6 text-primary" delay={0.4} />
        </div>

        <div className="flex flex-col items-start">
          <Reveal>
            <Eyebrow>Meet Your Dentist</Eyebrow>
          </Reveal>
          <SplitReveal
            as="h2"
            id="doctor-title"
            className="mt-5 text-balance text-[1.75rem] font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-[2.85rem]"
          >
            {`${clinic.doctor.name}.`}
          </SplitReveal>
          <SplitReveal as="p" mode="lines" delay={0.15} className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            With {clinic.doctor.experienceYears} years of trusted smile care, {clinic.doctor.shortName} leads the clinic
            with a simple belief: dental visits should feel calm, clear and comfortable. Patients often mention how she
            listens, explains every step and makes sure they are at ease before anything begins.
          </SplitReveal>

          <ul className="mt-8 grid w-full gap-3 lg:mt-6 lg:gap-2.5">
            {highlights.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={0.15 + i * 0.1} y={18}>
                <div className="group flex items-start gap-4 rounded-2xl bg-white p-4 ring-1 ring-line transition-all duration-500 ease-premium hover:translate-x-2 hover:shadow-lift hover:ring-accent sm:p-5 lg:py-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-soft text-primary ring-1 ring-accent/60 transition-all duration-500 ease-premium group-hover:rotate-[-8deg] group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5 group-hover:icon-draw" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-bold text-secondary">{title}</span>
                    <span className="mt-1 block text-[0.92rem] leading-relaxed text-muted">{text}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3} className="mt-8 w-full lg:mt-6">
            <figure className="relative overflow-hidden rounded-3xl bg-secondary p-6 text-white sm:p-7 lg:px-7 lg:py-5">
              <Quote className="absolute -right-2 -top-2 h-20 w-20 text-white/[0.06]" aria-hidden="true" />
              <StarRating value={5} size="h-4 w-4" />
              <blockquote className="mt-2.5 text-lg font-semibold leading-snug">
                “Highly skilled, gentle, and genuinely caring.”
              </blockquote>
              <figcaption className="mt-2 text-sm text-white/60">Rakesh Bhargava, Google review</figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.4} className="mt-8 lg:mt-6">
            <Button href={whatsappLink(`Hello ${clinic.doctor.shortName}, I would like to book a consultation.`)} external icon={WhatsAppIcon}>
              Book a Consultation
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
