"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, CalendarCheck, MapPin } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import TwoColumn from "@/components/ui/TwoColumn";
import { photo } from "@/components/ui/styles";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { clinic, clinicImages, whatsappLink } from "@/data/clinic";

// Starting masks for each reveal direction.
const masks = {
  up: "inset(100% 0% 0% 0% round 44px)",
  left: "inset(0% 100% 0% 0% round 44px)",
  right: "inset(0% 0% 0% 100% round 44px)",
  center: "inset(18% 18% 18% 18% round 44px)",
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
          { clipPath: "inset(0% 0% 0% 0% round 44px)", duration: 1.4 }
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
      className={`group ${photo} ${className}`}
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
      <div aria-hidden="true" className="g-curtain absolute inset-0 origin-right bg-primary [transform:scaleX(0)]" />
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
    <Section id="gallery" aria-labelledby="gallery-title">
      {/* Desktop: a text panel on the left (heading at the top, "Visit us" card at the bottom) beside a
          photo mosaic with a fixed 4:3 frame, capped at 520px tall. */}
      <Container>
        <TwoColumn layout="aside" align="stretch">
        <div className="flex flex-col gap-8 lg:justify-between">
          <div className="flex flex-col items-start">
            <SectionHeading id="gallery-title" eyebrow="Inside the Clinic" title="A Welcoming Space for Better Dental Care." align="left" />
            <Reveal delay={0.15} className="mt-7 flex max-w-xl flex-col items-start gap-8">
              <p className="text-lead text-muted">
                Step inside A-Zee Dental: a calm reception, well-equipped treatment rooms and a team focused on making
                every visit comfortable.
              </p>
              <Button href={whatsappLink()} external icon={CalendarCheck}>
                Plan Your Visit
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.3} variant="tilt">
            <a
              href={clinic.links.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 overflow-hidden rounded-[2rem] bg-primary p-6 text-white shadow-lift transition-shadow duration-500 hover:shadow-glow"
            >
              <span
                aria-hidden="true"
                className="anim-sway absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white/10 [--s:1.25]"
              />
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
              </span>
              <span className="relative min-w-0 flex-1">
                <span className="block text-sm font-medium text-white/70">Visit us at</span>
                <span className="block text-lg font-bold leading-snug">Pai Layout, Old Madras Road</span>
              </span>
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary transition-transform duration-500 ease-premium group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Get directions</span>
              </span>
            </a>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:aspect-[4/3] sm:max-h-[520px] sm:grid-cols-[1.1fr_1fr] sm:grid-rows-2 lg:self-center">
          <RevealImage
            image={clinicImages.dentistAtWork}
            caption="Gentle care for every age"
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
            position="object-[50%_45%]"
            from="up"
            className="aspect-[4/5] sm:row-span-2 sm:aspect-auto"
          />
          <RevealImage
            image={clinicImages.treatmentRoom}
            caption="Modern dental chair"
            delay={0.15}
            from="right"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            position="object-[50%_60%]"
            className="aspect-[4/3] sm:aspect-auto"
          />
          <RevealImage
            image={clinicImages.treatmentRoomAlt}
            caption="Treatment room"
            delay={0.25}
            from="center"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            position="object-[70%_60%]"
            className="aspect-[4/3] sm:aspect-auto"
          />
        </div>
        </TwoColumn>
      </Container>
    </Section>
  );
}
