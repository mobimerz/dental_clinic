"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Baby, User, Users } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Tilt from "@/components/common/Tilt";
import { treatments } from "@/data/treatments";

const bySlug = Object.fromEntries(treatments.map((t) => [t.slug, t]));

const groups = [
  {
    icon: Baby,
    title: "Little Smiles",
    tag: "Children",
    text: "Friendly first visits, cavity care for milk teeth and space maintainers that keep growing smiles on track.",
    slugs: ["kids-dentistry", "general-dental-care", "teeth-cleaning"],
  },
  {
    icon: User,
    title: "Confident Adults",
    tag: "Teens & Adults",
    text: "From fillings and root canals to aligners and whitening, care that fits around work and family life.",
    slugs: ["root-canal-treatment", "dental-braces", "teeth-whitening", "cosmetic-dentistry"],
  },
  {
    icon: Users,
    title: "Lasting Comfort",
    tag: "Seniors",
    text: "Restoring chewing comfort and confidence with implants, dentures, crowns and bridges.",
    slugs: ["dental-implants", "dentures", "crowns-and-bridges"],
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function CareForAll() {
  return (
    <section aria-labelledby="care-title" className="relative bg-soft section-y">
      <div className="container-page">
        <SectionHeading
          id="care-title"
          eyebrow="Care for Every Age"
          title="One Clinic for the Whole Family."
          description="As a family dental clinic, we look after children, adults and seniors under one roof, so everyone's care stays joined up."
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {groups.map(({ icon: Icon, title, tag, text, slugs }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 80, rotate: i === 0 ? -4 : i === 2 ? 4 : 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, delay: i * 0.12, ease }}
            >
              <Tilt max={8} scale={1.02} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white p-7 shadow-soft ring-1 ring-line transition-all duration-500 ease-premium hover:shadow-lift hover:ring-accent sm:p-8">
                  {/* Teal fill rises from the bottom on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-soft to-transparent transition-[height] duration-700 ease-premium group-hover:h-full"
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-soft text-primary ring-1 ring-accent/60 transition-all duration-500 ease-premium group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-primary group-hover:text-white group-hover:shadow-glow">
                      <Icon className="h-7 w-7 group-hover:icon-draw" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary ring-1 ring-accent/60">
                      {tag}
                    </span>
                  </div>
                  <h3 className="relative mt-6 text-xl font-bold text-secondary sm:text-2xl">{title}</h3>
                  <p className="relative mt-3 text-[0.95rem] leading-relaxed text-muted md:min-h-[4.875em]">{text}</p>
                  <ul className="relative mt-6 flex flex-1 flex-col gap-1 border-t border-line pt-5">
                    {slugs.map((slug) => (
                      <li key={slug}>
                        <Link
                          href={`/treatments#${slug}`}
                          className="group/link flex items-center justify-between rounded-xl px-3 py-2.5 text-[0.95rem] font-semibold text-secondary transition-all duration-300 hover:bg-white hover:pl-4 hover:text-primary hover:shadow-soft"
                        >
                          {bySlug[slug].title}
                          <ArrowUpRight
                            className="h-4 w-4 text-accent transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-primary"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              </Tilt>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
