"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CalendarCheck } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";
import { clinicImages } from "@/data/clinic";

const ease = [0.22, 1, 0.36, 1];

function RevealImage({ image, className, sizes, delay = 0, caption, position = "object-center" }) {
  return (
    <motion.figure
      initial={{ clipPath: "inset(10% 10% 10% 10% round 32px)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 32px)", opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.2, delay, ease }}
      className={`group relative overflow-hidden rounded-[2rem] bg-accent ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className={`object-cover ${position} transition-transform duration-[1.4s] ease-premium group-hover:scale-[1.06]`}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent opacity-80" />
      {caption && (
        <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-secondary backdrop-blur">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

export default function ClinicGallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative py-24 sm:py-28 lg:py-36">
      <div className="container-page">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            id="gallery-title"
            eyebrow="Inside the Clinic"
            title="A Welcoming Space for Better Dental Care."
            description="Step inside A-Zee Dental: a calm reception, well-equipped treatment rooms and a team focused on making every visit comfortable."
            align="left"
          />
          <Reveal delay={0.1} className="hidden lg:block">
            <Button href="#appointment" icon={CalendarCheck}>
              Plan Your Visit
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-12 md:grid-rows-[260px_260px] lg:grid-rows-[300px_300px]">
          <RevealImage
            image={clinicImages.dentistAtWork}
            caption="Gentle care for every age"
            sizes="(min-width: 768px) 40vw, 100vw"
            position="object-[50%_45%]"
            className="aspect-[4/5] md:col-span-5 md:row-span-2 md:aspect-auto"
          />
          <RevealImage
            image={clinicImages.treatmentRoomAlt}
            caption="Treatment room"
            delay={0.15}
            sizes="(min-width: 768px) 58vw, 100vw"
            className="aspect-[4/3] md:col-span-7 md:aspect-auto"
          />
          <RevealImage
            image={clinicImages.treatmentRoom}
            caption="Modern dental chair"
            delay={0.25}
            sizes="(min-width: 768px) 30vw, 100vw"
            position="object-[50%_60%]"
            className="aspect-[4/3] md:col-span-4 md:aspect-auto"
          />
          <Reveal
            delay={0.35}
            className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-primary p-7 text-white md:col-span-3"
          >
            <span aria-hidden="true" className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
            <p className="relative text-sm font-medium text-white/75">Visit us at</p>
            <div className="relative">
              <p className="text-2xl font-bold leading-tight">Pai Layout,<br />Old Madras Road</p>
              <a href="#contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-white">
                Get directions →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
