"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, CircleCheck } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import { Eyebrow } from "@/components/common/SectionHeading";
import { FloatingTooth, Sparkle } from "@/components/common/FloatingShapes";
import { clinicImages } from "@/data/clinic";

const points = [
  "Routine check-ups & preventive care",
  "Advanced restorative & implant treatments",
  "A welcoming, comfortable environment",
  "Care planned around your needs",
];

const ease = [0.22, 1, 0.36, 1];

export default function AboutClinic() {
  const main = clinicImages.reception;
  const inset = clinicImages.treatmentRoom;

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Images */}
        <div className="relative mx-auto w-full max-w-[540px] pb-16 pr-10 sm:pr-16 lg:mx-0">
          {/* The observer sits on an unclipped wrapper: a fully clipped target never reports as in view */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.div
              variants={{
                hidden: { clipPath: "inset(0% 100% 0% 0% round 36px)" },
                show: { clipPath: "inset(0% 0% 0% 0% round 36px)", transition: { duration: 1.2, ease } },
              }}
              className="relative aspect-square overflow-hidden rounded-[2.25rem] shadow-lift"
            >
              <Image
                src={main.src}
                alt={main.alt}
                fill
                sizes="(min-width: 1024px) 480px, 88vw"
                className="object-cover transition-transform duration-[1.6s] ease-premium hover:scale-105"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.35, ease }}
            className="absolute bottom-0 right-0 w-[44%] overflow-hidden rounded-[1.75rem] border-[6px] border-white shadow-lift"
          >
            <div className="relative aspect-[3/4]">
              <Image src={inset.src} alt={inset.alt} fill sizes="(min-width: 1024px) 240px, 40vw" className="object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="absolute -left-3 top-8 rounded-2xl bg-white px-4 py-3 shadow-lift ring-1 ring-line sm:-left-8"
          >
            <p className="text-xs font-medium text-muted">Located in</p>
            <p className="text-sm font-bold text-secondary">Pai Layout, Bengaluru</p>
          </motion.div>

          <div aria-hidden="true" className="bg-dots absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-3xl" />
          <FloatingTooth className="right-2 top-0 text-accent" size="h-10 w-10" />
          <Sparkle className="bottom-24 left-1/2 h-5 w-5 text-primary/60" delay={0.8} />
        </div>

        {/* Copy */}
        <div className="flex flex-col items-start">
          <Reveal>
            <Eyebrow>About the Clinic</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="about-title"
              className="mt-5 text-balance text-[2rem] font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-[2.85rem]"
            >
              Care That Makes You <span className="text-primary">Smile.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              At A-Zee Dental &amp; Implant Centre, we focus on providing personalized dental care in a welcoming and
              comfortable environment. From routine check-ups to advanced dental treatments, our approach is centered
              around your oral health and confidence.
            </p>
          </Reveal>

          <ul className="mt-8 grid w-full gap-3 sm:grid-cols-2">
            {points.map((point, i) => (
              <Reveal as="li" key={point} delay={0.15 + i * 0.07} y={16}>
                <span className="flex h-full items-start gap-3 rounded-2xl bg-soft p-4 text-[0.92rem] font-medium text-secondary ring-1 ring-accent/50">
                  <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  {point}
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.4}>
            <a
              href="#treatments"
              className="group mt-10 inline-flex items-center gap-3 text-[0.95rem] font-semibold text-secondary"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white transition-all duration-500 ease-premium group-hover:bg-primary group-hover:shadow-glow">
                <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-45" aria-hidden="true" />
              </span>
              <span className="border-b border-secondary/20 pb-0.5 transition-colors group-hover:border-primary group-hover:text-primary">
                Learn More About Our Care
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
