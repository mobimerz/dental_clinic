"use client";

import { motion } from "motion/react";
import { Clock, MapPin, MessageCircle, MoonStar, ShieldCheck, Users } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { card } from "@/components/ui/styles";

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

const ease = [0.22, 1, 0.36, 1];

// "The little things": a grid of everyday conveniences.
export default function ComfortGrid() {
  return (
    <Section aria-labelledby="comfort-title" className="overflow-hidden">
      <Container>
        <SectionHeading
          id="comfort-title"
          eyebrow="The Little Things"
          title="Small Details That Make a Big Difference."
          description="Great dental care isn't only about the treatment. It's also about how easy and comfortable the whole experience feels."
        />

        <ul className="header-gap grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 60, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: (i % 3) * 0.1, ease }}
            >
              <article className={`group relative h-full overflow-hidden ${card} transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift hover:ring-accent`}>
                {/* Teal disc expands from the icon to flood the card */}
                <span
                  aria-hidden="true"
                  className="absolute left-6 top-6 h-14 w-14 scale-0 rounded-full bg-secondary transition-transform duration-[900ms] ease-premium group-hover:scale-[14] md:left-8 md:top-8"
                />
                {/* Desktop: icon sits beside the title to keep the cards short */}
                <div className="relative flex flex-col lg:flex-row lg:items-center lg:gap-4">
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-soft text-primary ring-1 ring-accent/60 transition-all duration-500 ease-premium group-hover:rotate-[-8deg] group-hover:bg-primary group-hover:text-white group-hover:ring-transparent">
                    <Icon className="h-6 w-6 group-hover:icon-draw" aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-6 text-h3 text-secondary transition-colors duration-500 group-hover:text-white lg:mt-0">{title}</h3>
                </div>
                <p className="relative mt-3 text-body text-muted transition-colors lg:mt-4 duration-500 group-hover:text-white/70">
                  {text}
                </p>
              </article>
            </motion.li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
