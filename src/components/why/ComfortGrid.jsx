"use client";

import { motion } from "motion/react";
import { Clock, MapPin, MessageCircle, MoonStar, ShieldCheck, Users } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { clinic } from "@/data/clinic";

const features = [
  {
    icon: ShieldCheck,
    title: "Hygiene You Can See",
    text: "Clean, well-maintained treatment rooms and careful sterilisation, something patients regularly mention in their reviews.",
  },
  {
    icon: MoonStar,
    title: "Evening Appointments",
    text: "Open until 9 PM Monday to Saturday, so a dental visit doesn't have to mean taking time off work or school.",
  },
  {
    icon: Clock,
    title: "Open on Sundays",
    text: "Sunday morning slots for when the week gets busy, or a toothache can't wait until Monday.",
  },
  {
    icon: Users,
    title: "Family Under One Roof",
    text: "Children, parents and grandparents can all be seen at the same clinic, by a team that knows your family.",
  },
  {
    icon: MessageCircle,
    title: "Easy WhatsApp Booking",
    text: "Message us to book, reschedule or ask a quick question. No long phone queues.",
  },
  {
    icon: MapPin,
    title: "Easy to Reach",
    text: "In Pai Layout, just off Old Madras Road, convenient from KR Puram, Dooravani Nagar and nearby areas.",
  },
];

const words = ["Preventive", "Painless", "Personalized", `${clinic.rating.value}★ on Google`, `Since ${clinic.established}`, "Family Dentistry"];

function Marquee({ reverse = false }) {
  const row = [...words, ...words];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={`anim-marquee flex shrink-0 items-center gap-8 pr-8 ${reverse ? "[animation-direction:reverse]" : ""}`}>
        {row.concat(row).map((w, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className={`text-3xl font-extrabold tracking-tight sm:text-5xl ${i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_var(--color-primary)]" : "text-secondary"}`}>
              {w}
            </span>
            <span aria-hidden="true" className="h-3 w-3 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

const ease = [0.22, 1, 0.36, 1];

// "The little things": a grid of everyday conveniences, introduced by two marquee rows
// of the clinic's values running in opposite directions.
export default function ComfortGrid() {
  return (
    <section aria-labelledby="comfort-title" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="flex flex-col gap-4">
        <Marquee />
        <Marquee reverse />
      </div>

      <div className="container-page mt-20">
        <SectionHeading
          id="comfort-title"
          eyebrow="The Little Things"
          title="Small Details That Make a Big Difference."
          description="Great dental care isn't only about the treatment. It's also about how easy and comfortable the whole experience feels."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: (i % 3) * 0.1, ease }}
            >
              <article className="group relative h-full overflow-hidden rounded-[2rem] bg-white p-7 ring-1 ring-line transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift hover:ring-accent sm:p-8">
                {/* Teal disc expands from the icon to flood the card */}
                <span
                  aria-hidden="true"
                  className="absolute left-7 top-7 h-14 w-14 scale-0 rounded-full bg-secondary transition-transform duration-[900ms] ease-premium group-hover:scale-[14] sm:left-8 sm:top-8"
                />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-primary ring-1 ring-accent/60 transition-all duration-500 ease-premium group-hover:rotate-[-8deg] group-hover:bg-primary group-hover:text-white group-hover:ring-transparent">
                  <Icon className="h-6 w-6 group-hover:icon-draw" aria-hidden="true" />
                </span>
                <h3 className="relative mt-6 text-xl font-bold text-secondary transition-colors duration-500 group-hover:text-white">{title}</h3>
                <p className="relative mt-3 text-[0.95rem] leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/70">
                  {text}
                </p>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
