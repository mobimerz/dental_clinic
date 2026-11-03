"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CalendarCheck, MapPin } from "lucide-react";
import Button from "@/components/common/Button";
import StarRating from "@/components/common/StarRating";
import { ToothIcon, ImplantIcon } from "@/components/common/DentalIcons";
import { FloatingTooth, GlowOrb, Sparkle } from "@/components/common/FloatingShapes";
import { clinic, clinicImages } from "@/data/clinic";

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
};

export default function Hero() {
  const img = clinicImages.doctorPortrait;

  return (
    <section id="home" aria-labelledby="hero-title" className="relative -mt-20 overflow-hidden pt-20">
      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#E6F5F4] via-soft to-white" />
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]" />
      <GlowOrb className="-left-32 top-10 -z-10 h-[420px] w-[420px] bg-accent/60" x={40} y={30} />
      <GlowOrb className="-right-24 bottom-0 -z-10 h-[380px] w-[380px] bg-primary/15" duration={22} x={-30} y={-20} />

      <div className="container-page grid items-center gap-12 pb-16 pt-8 sm:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-14">
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative max-w-xl">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 py-1.5 pl-1.5 pr-4 text-[0.8rem] font-semibold text-secondary shadow-soft ring-1 ring-line backdrop-blur">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              Dental &amp; Implant Centre · Pai Layout, Bengaluru
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            variants={item}
            className="mt-6 text-[2.85rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-secondary min-[400px]:text-[3.25rem] sm:text-6xl lg:text-[4.4rem]"
          >
            Your Smile,
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-[#0A97A6] to-primary bg-clip-text text-transparent">
                Our Priority.
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-accent sm:-bottom-3 sm:h-4"
              >
                <motion.path
                  d="M3 14C60 5 150 2 297 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, delay: 0.9, ease }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-muted sm:text-lg">
            Experience comfortable, personalized dental care designed to keep your smile healthy, confident and beautiful.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
            <Button href="#appointment" icon={CalendarCheck}>
              Book Your Appointment
            </Button>
            <Button href="#treatments" variant="secondary" arrow>
              Explore Treatments
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.ul
            variants={item}
            className="mt-10 grid grid-cols-3 divide-x divide-line rounded-3xl bg-white/70 py-4 shadow-soft ring-1 ring-line backdrop-blur sm:max-w-lg"
          >
            <li className="flex flex-col items-center gap-1 px-2 text-center">
              <span className="text-xl font-bold text-secondary sm:text-2xl">{clinic.rating.value}</span>
              <StarRating value={clinic.rating.value} size="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="text-[0.7rem] font-medium text-muted sm:text-xs">Google Rating</span>
            </li>
            <li className="flex flex-col items-center gap-1 px-2 text-center">
              <span className="text-xl font-bold text-secondary sm:text-2xl">{clinic.rating.count}</span>
              <span className="text-[0.7rem] font-medium leading-tight text-muted sm:text-xs">
                Patient
                <br />
                Reviews
              </span>
            </li>
            <li className="flex flex-col items-center gap-1 px-2 text-center">
              <ImplantIcon className="h-7 w-7 text-primary" />
              <span className="text-[0.7rem] font-medium leading-tight text-muted sm:text-xs">
                Dental &amp;
                <br />
                Implant Care
              </span>
            </li>
          </motion.ul>
        </motion.div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-[460px] lg:mr-0 lg:max-w-[500px]">
          {/* Decorative backdrop shapes */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.75rem] bg-gradient-to-br from-accent to-primary/40"
          />
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-2 border-dashed border-primary/25"
          />
          <FloatingTooth className="-left-8 top-16 text-primary/40 sm:-left-14" size="h-12 w-12" />
          <FloatingTooth className="-right-4 bottom-28 text-white sm:-right-10" size="h-9 w-9" duration={8} delay={1} />
          <Sparkle className="-left-3 bottom-1/3 h-6 w-6 text-primary" />
          <Sparkle className="right-10 -top-4 h-5 w-5 text-[#0A97A6]" delay={1.5} />

          {/* Image reveal */}
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0% round 44px)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 44px)" }}
            transition={{ duration: 1.3, ease, delay: 0.25 }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2.75rem] bg-accent shadow-lift"
          >
            <motion.div
              initial={{ scale: 1.18 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease, delay: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority
                sizes="(min-width: 1024px) 500px, (min-width: 640px) 460px, 92vw"
                className="object-cover object-[50%_22%]"
              />
            </motion.div>
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-secondary/70 to-transparent" />
            <div className="absolute left-4 top-4 rounded-2xl bg-secondary/55 px-4 py-2.5 text-white ring-1 ring-white/25 backdrop-blur-md sm:bottom-5 sm:left-auto sm:right-5 sm:top-auto sm:bg-white/15 sm:text-right">
              <p className="text-sm font-bold">Dr. Aysha Aslam</p>
              <p className="text-[0.72rem] text-white/80">A-Zee Dental &amp; Implant Centre</p>
            </div>
          </motion.div>

          {/* Floating rating card */}
          <motion.a
            href={clinic.links.googleProfile}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1, ease }}
            className="absolute -left-3 bottom-8 sm:-left-12"
            aria-label={`Rated ${clinic.rating.value} out of 5 on Google from ${clinic.rating.count} reviews`}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-lift ring-1 ring-line transition-shadow hover:ring-accent"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-soft text-2xl font-extrabold text-primary">
                {clinic.rating.value}
              </span>
              <span className="flex flex-col gap-1">
                <StarRating value={clinic.rating.value} size="h-3.5 w-3.5" />
                <span className="text-xs font-semibold text-secondary">
                  {clinic.rating.count} Google reviews
                </span>
              </span>
            </motion.div>
          </motion.a>

          {/* Floating chip */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease }}
            className="absolute -right-2 top-10 sm:-right-8"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="flex items-center gap-2.5 rounded-2xl bg-secondary px-4 py-3 text-white shadow-lift"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <ToothIcon className="h-5 w-5 text-accent" />
              </span>
              <span className="text-[0.8rem] font-semibold leading-tight">
                Personalized
                <br />
                Dental Care
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <a
        href="#trust"
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-secondary/20 pt-2"
        >
          <span className="h-2 w-1 rounded-full bg-primary" />
        </motion.span>
      </a>
    </section>
  );
}
