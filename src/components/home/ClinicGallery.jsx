"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CalendarCheck } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { clinicImages } from "@/data/clinic";

// Starting masks for each reveal direction.
const masks = {
  up: "inset(100% 0% 0% 0% round 32px)",
  left: "inset(0% 100% 0% 0% round 32px)",
  right: "inset(0% 0% 0% 100% round 32px)",
  center: "inset(18% 18% 18% 18% round 32px)",
};

// Layered reveal: the frame's mask opens, a teal curtain wipes off, the photo settles
// from a zoom, then keeps drifting inside its frame as the page scrolls.
function RevealImage({ image, className, sizes, delay = 0, caption, position = "object-center", from = "up" }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          delay,
          defaults: { ease: "expo.inOut" },
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
        tl.fromTo(
          ref.current,
          { clipPath: masks[from] },
          { clipPath: "inset(0% 0% 0% 0% round 32px)", duration: 1.4 }
        )
          .fromTo(q(".g-curtain"), { scaleX: 1 }, { scaleX: 0, duration: 1.1 }, "-=0.75")
          .fromTo(q(".g-zoom"), { scale: 1.45, rotate: from === "center" ? 0 : 2 }, { scale: 1, rotate: 0, duration: 2, ease: "expo.out" }, "<-0.3")
          .from(q("figcaption"), { y: 30, opacity: 0, duration: 0.9, ease: "expo.out" }, "-=1.2");

        gsap.fromTo(
          q(".g-parallax"),
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <figure
      ref={ref}
      className={`group relative overflow-hidden rounded-[2rem] bg-accent ${className}`}
    >
      <div className="g-parallax absolute inset-x-0 -inset-y-[9%]">
        <div className="g-zoom absolute inset-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className={`object-cover ${position} transition-[transform,filter] duration-[1.4s] ease-premium group-hover:rotate-1 group-hover:scale-[1.08] group-hover:saturate-[1.15]`}
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100"
      />
      {/* Hover: a soft teal iris closes in around the frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 [background:radial-gradient(ellipse_at_center,transparent_45%,rgb(8_127_140/0.35))]"
      />
      <div aria-hidden="true" className="g-curtain absolute inset-0 origin-right bg-primary" style={{ transform: "scaleX(0)" }} />
      {caption && (
        <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-secondary backdrop-blur transition-all duration-500 ease-premium group-hover:-translate-y-1 group-hover:bg-white group-hover:px-5 group-hover:shadow-lift">
          {caption}
        </figcaption>
      )}
    </figure>
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
            from="up"
            className="aspect-[4/5] md:col-span-5 md:row-span-2 md:aspect-auto"
          />
          <RevealImage
            image={clinicImages.treatmentRoomAlt}
            caption="Treatment room"
            delay={0.15}
            from="right"
            sizes="(min-width: 768px) 58vw, 100vw"
            className="aspect-[4/3] md:col-span-7 md:aspect-auto"
          />
          <RevealImage
            image={clinicImages.treatmentRoom}
            caption="Modern dental chair"
            delay={0.25}
            from="center"
            sizes="(min-width: 768px) 30vw, 100vw"
            position="object-[50%_60%]"
            className="aspect-[4/3] md:col-span-4 md:aspect-auto"
          />
          <Reveal
            delay={0.35}
            variant="tilt"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-primary p-7 text-white md:col-span-3"
          >
            <motion.span
              aria-hidden="true"
              animate={{ scale: [1, 1.25, 1], rotate: [0, 30, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10"
            />
            <motion.span
              aria-hidden="true"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-white/[0.06]"
            />
            <p className="relative text-sm font-medium text-white/75">Visit us at</p>
            <div className="relative">
              <p className="text-2xl font-bold leading-tight transition-transform duration-500 ease-premium group-hover:-translate-y-1">
                Pai Layout,<br />Old Madras Road
              </p>
              <a href="#contact" className="group/dir mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-white">
                Get directions <span className="inline-block transition-transform duration-300 group-hover/dir:translate-x-1.5">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
