"use client";

import { CalendarCheck, Clock, Phone } from "lucide-react";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";
import { Eyebrow } from "@/components/common/SectionHeading";
import { FloatingTooth, GlowOrb, Sparkle } from "@/components/common/FloatingShapes";
import AppointmentForm from "./AppointmentForm";
import { clinic } from "@/data/clinic";

export default function AppointmentCTA() {
  const focusForm = (e) => {
    e.preventDefault();
    const form = document.getElementById("appointment-form");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => form?.querySelector("input")?.focus({ preventScroll: true }), 450);
  };

  return (
    <section id="appointment" aria-labelledby="appointment-title" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-[#DDF2F0] via-[#EEF8F7] to-[#CDEBE8]" />
      <GlowOrb className="-left-24 top-1/4 -z-10 h-[360px] w-[360px] bg-white/70" />
      <GlowOrb className="-right-24 -top-24 -z-10 h-[420px] w-[420px] bg-accent" duration={20} x={-30} y={30} />
      <FloatingTooth className="left-[6%] top-16 hidden text-primary/25 md:block" size="h-14 w-14" />
      <Sparkle className="bottom-20 left-[40%] hidden h-6 w-6 text-primary/50 lg:block" />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>Book Your Visit</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="appointment-title"
              className="mt-5 text-balance text-[2rem] font-bold leading-[1.1] tracking-tight text-secondary sm:text-4xl lg:text-[2.85rem]"
            >
              Ready to Give Your Smile the Care It Deserves?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">
              Take the first step towards better oral health. Get in touch with our team to schedule your dental visit.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
            <Button href={clinic.phone.tel} variant="dark" icon={Phone}>
              Call Now
            </Button>
            <Button href="#appointment-form" icon={CalendarCheck} onClick={focusForm}>
              Book an Appointment
            </Button>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 max-w-md rounded-3xl bg-white/60 p-6 ring-1 ring-white backdrop-blur">
            <p className="flex items-center gap-2 text-sm font-semibold text-secondary">
              <Clock className="h-4 w-4 text-primary" aria-hidden="true" /> Clinic Timings
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              {clinic.hours.map((h) => (
                <div key={h.days} className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                  <dt className="font-medium text-ink/80">{h.days}</dt>
                  <dd className="text-right text-muted">
                    {h.slots.map((s) => (
                      <span key={s} className="block">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={40}>
          <AppointmentForm />
        </Reveal>
      </div>
    </section>
  );
}
