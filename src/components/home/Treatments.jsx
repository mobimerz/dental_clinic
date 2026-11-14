"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { card, cardFill } from "@/components/ui/styles";
import Tilt from "@/components/common/Tilt";
import Magnetic from "@/components/common/Magnetic";
import { FloatingTooth, Sparkle } from "@/components/common/FloatingShapes";
import { treatmentIcons as icons } from "@/components/common/treatmentIcons";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { featuredTreatments } from "@/data/treatments";
import { clinicImages } from "@/data/clinic";

// Clinic photos that bloom in behind a card's content on hover.
const hoverImages = [
  clinicImages.treatmentRoom,
  clinicImages.dentistAtWork,
  clinicImages.treatmentRoomAlt,
  clinicImages.reception,
];

const iconMotion = {
  rest: { rotate: 0, scale: 1, y: 0 },
  hover: { rotate: [0, -14, 10, -4, 0], scale: 1.14, y: -2, transition: { duration: 0.8, ease: "easeInOut" } },
};

function TreatmentCard({ t, i }) {
  const Icon = icons[t.icon];
  const photo = hoverImages[i % hoverImages.length];
  return (
    <Tilt max={10} scale={1.03} className="h-full">
      <motion.article
        initial="rest"
        whileHover="hover"
        animate="rest"
        className={`group relative overflow-hidden ${card} ${cardFill} transition-all duration-500 ease-premium hover:-translate-y-2 hover:shadow-lift hover:ring-accent`}
      >
        {/* Photo bloom: a circular mask grows from the cursor */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [clip-path:circle(0%_at_var(--mx,50%)_var(--my,50%))] transition-[clip-path] duration-[900ms] ease-premium group-hover:[clip-path:circle(150%_at_var(--mx,50%)_var(--my,50%))]"
        >
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
            className="scale-125 object-cover opacity-[0.13] transition-transform duration-[1.4s] ease-premium group-hover:scale-100"
          />
          <span className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white" />
        </span>
        {/* Cursor spotlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,50%),rgb(185_229_226/0.55),transparent_45%)]"
        />
        {/* Hover wash */}
        <span
          aria-hidden="true"
          className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/0 blur-2xl transition-all duration-700 group-hover:bg-accent/60"
        />

        <Magnetic strength={0.5} className="relative self-start">
          <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-primary ring-1 ring-accent/60 transition-all duration-500 ease-premium group-hover:-rotate-[8deg] group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-glow">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl ring-2 ring-primary/40 opacity-0 group-hover:animate-ping group-hover:opacity-100 [animation-duration:1.4s] [animation-iteration-count:1]"
            />
            <motion.span variants={iconMotion} className="flex">
              <Icon className="h-7 w-7 group-hover:icon-draw" aria-hidden="true" />
            </motion.span>
          </span>
        </Magnetic>
        <span className="absolute right-6 top-7 overflow-hidden text-sm md:right-8 md:top-9 font-semibold text-line transition-colors duration-500 group-hover:text-accent">
          <span className="block transition-transform duration-500 ease-premium group-hover:-translate-y-full">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span aria-hidden="true" className="absolute inset-0 block translate-y-full text-primary transition-transform duration-500 ease-premium group-hover:translate-y-0">
            {String(i + 1).padStart(2, "0")}
          </span>
        </span>
        <h3 className="relative mt-6 text-h3 text-secondary transition-transform duration-500 ease-premium group-hover:translate-x-1">
          {t.title}
        </h3>
        <p className="relative mt-2 flex-1 text-small text-muted">{t.description}</p>
        <Link
          href={`/treatments#${t.slug}`}
          className="relative mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary"
          aria-label={`Learn more about ${t.title}`}
        >
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1.5px]">
            Learn More
          </span>
          <span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full transition-colors duration-500 group-hover:bg-primary group-hover:text-white">
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:-translate-y-6 group-hover:translate-x-6"
              aria-hidden="true"
            />
            <ArrowUpRight
              className="absolute h-4 w-4 -translate-x-6 translate-y-6 transition-transform duration-500 ease-premium group-hover:translate-x-0 group-hover:translate-y-0"
              aria-hidden="true"
            />
          </span>
        </Link>
      </motion.article>
    </Tilt>
  );
}

export default function Treatments() {
  const grid = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray(".treatment-card", grid.current);
        gsap.set(cards, { opacity: 0, y: 90, rotateX: -32, transformPerspective: 1000, transformOrigin: "50% 0%" });
        ScrollTrigger.batch(cards, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "expo.out", overwrite: true }),
        });
      });
      return () => mm.revert();
    },
    { scope: grid }
  );

  return (
    <Section bg="soft" id="treatments" aria-labelledby="treatments-title" className="overflow-clip">
      <div aria-hidden="true" className="bg-dots absolute inset-x-0 top-0 h-64 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <FloatingTooth className="left-[4%] top-40 hidden text-primary/20 lg:block" size="h-14 w-14" speed={0.5} />
      <FloatingTooth className="right-[6%] top-[45%] hidden text-accent lg:block" size="h-10 w-10" duration={9} speed={-0.4} />
      <Sparkle className="right-[18%] top-28 hidden h-5 w-5 text-primary/50 md:block" speed={0.3} />

      <Container className="relative">
        <SectionHeading
          id="treatments-title"
          eyebrow="Our Treatments"
          title="Complete Dental Care, All Under One Roof."
          description="From preventive check-ups to implants and smile makeovers, explore the treatments available at A-Zee Dental."
        />

        <ul ref={grid} className="header-gap grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTreatments.map((t, i) => (
            <li key={t.slug} className="treatment-card">
              <TreatmentCard t={t} i={i} />
            </li>
          ))}
        </ul>

        <Reveal delay={0.1} className="header-gap flex justify-center">
          <Button href="/treatments" variant="secondary" arrow>
            View All Treatments
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
