"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Navigation, Phone } from "lucide-react";
import Tilt from "@/components/common/Tilt";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { clinic, whatsappLink } from "@/data/clinic";

const cards = [
  {
    icon: Phone,
    label: "Call the Clinic",
    value: clinic.phone.display,
    text: "Speak to the team about appointments or a dental concern.",
    href: clinic.phone.tel,
    fill: "from-secondary to-[#0e4252]",
  },
  {
    icon: WhatsAppIcon,
    label: "Chat on WhatsApp",
    value: "Quick replies",
    text: "Book, reschedule or ask a question. Message us anytime.",
    href: whatsappLink(),
    external: true,
    fill: "from-[#1FAF5A] to-[#178F49]",
  },
  {
    icon: Navigation,
    label: "Get Directions",
    value: "Pai Layout",
    text: "Off Old Madras Road, Dooravani Nagar, Bengaluru 560016.",
    href: clinic.links.directions,
    external: true,
    fill: "from-primary to-[#0A97A6]",
  },
];

const ease = [0.22, 1, 0.36, 1];

// Three ways to get in touch. On hover a colour fill sweeps up through the card,
// turning its text white, and the arrow flies out and back in.
export default function ContactCards() {
  return (
    <section aria-label="Ways to contact us" className="relative z-10 -mt-10 lg:-mt-16">
      <ul className="container-page grid gap-5 md:grid-cols-3">
        {cards.map(({ icon: Icon, label, value, text, href, external, fill }, i) => (
          <motion.li
            key={label}
            initial={{ opacity: 0, y: 70, rotateX: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.1, delay: 1 + i * 0.12, ease }}
            style={{ transformPerspective: 1000 }}
          >
            <Tilt max={10} scale={1.03} className="h-full">
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white p-7 shadow-lift ring-1 ring-line sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-br ${fill} transition-transform duration-700 ease-premium group-hover:scale-y-100`}
                />
                <span className="relative flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-primary ring-1 ring-accent/60 transition-all duration-500 ease-premium group-hover:rotate-[-10deg] group-hover:bg-white/15 group-hover:text-white group-hover:ring-white/30">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-soft text-primary transition-colors duration-500 group-hover:bg-white group-hover:text-secondary">
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-500 ease-premium group-hover:-translate-y-8 group-hover:translate-x-8" aria-hidden="true" />
                    <ArrowUpRight
                      className="absolute h-5 w-5 -translate-x-8 translate-y-8 transition-transform duration-500 ease-premium group-hover:translate-x-0 group-hover:translate-y-0"
                      aria-hidden="true"
                    />
                  </span>
                </span>
                <span className="relative mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-primary transition-colors duration-500 group-hover:text-white/80">
                  {label}
                </span>
                <span className="relative mt-2 text-2xl font-bold tracking-tight text-secondary transition-colors duration-500 group-hover:text-white">
                  {value}
                </span>
                <span className="relative mt-3 text-[0.95rem] leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/75">
                  {text}
                </span>
              </a>
            </Tilt>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
