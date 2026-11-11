"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Award, CalendarCheck, Clock, MapPin, ShieldCheck, Smile, Star } from "lucide-react";
import { Eyebrow } from "@/components/common/SectionHeading";
import Tooth3D, { GlassBubble } from "@/components/common/Tooth3D";
import { FloatingTooth, GlowOrb, Sparkle } from "@/components/common/FloatingShapes";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

const ease = [0.22, 1, 0.36, 1];

// Chip icons are named by string so server pages can pass them.
const chipIcons = { award: Award, calendar: CalendarCheck, clock: Clock, pin: MapPin, shield: ShieldCheck, smile: Smile, star: Star };

// Opening banner for inner pages. The title's first line flips in letter by letter,
// the highlighted second line focuses in, and an optional photo opens behind two colour
// curtains with floating chips. Scrolling away lifts the copy and sinks the photo.
//   title      – first line of the heading
//   highlight  – second line, shown in the teal gradient with a drawn underline
//   chips      – one small floating card on the photo: { icon: "star" | "award" | …, label, value }
export default function PageHero({ eyebrow, title, highlight, description, image, imagePosition = "object-center", chips = [], children }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.set(q(".hero-intro"), { visibility: "visible" });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const chars = SplitText.create(q(".ph-line-1"), { type: "words,chars", charsClass: "inline-block" });
        const copy = SplitText.create(q(".ph-copy"), { type: "words" });

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(q(".ph-eyebrow"), { y: -18, scale: 0.85, opacity: 0, duration: 0.9 })
          .from(
            chars.chars,
            {
              yPercent: 90,
              rotateX: -95,
              opacity: 0,
              filter: "blur(10px)",
              transformOrigin: "50% 100% -20px",
              stagger: 0.028,
              duration: 1.2,
            },
            "-=0.6"
          )
          .from(
            q(".ph-line-2"),
            { yPercent: 70, opacity: 0, scale: 1.06, letterSpacing: "0.08em", filter: "blur(14px)", duration: 1.4 },
            "-=0.95"
          )
          .from(copy.words, { y: 16, opacity: 0, filter: "blur(6px)", duration: 0.8, stagger: 0.02 }, "-=1")
          .from(q(".ph-extra > *"), { y: 30, opacity: 0, scale: 0.94, stagger: 0.1, duration: 0.9 }, "-=0.8");

        const out = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        // Both columns lift by the same distance so they stay aligned while the hero scrolls away.
        gsap.to(q(".ph-copy-wrap"), { y: -70, opacity: 0.4, ease: "none", scrollTrigger: out });
        gsap.to(q(".ph-visual"), { y: -70, scale: 0.95, ease: "none", scrollTrigger: out });
        gsap.to(q(".ph-photo"), { yPercent: 10, ease: "none", scrollTrigger: out });

        return () => {
          chars.revert();
          copy.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      aria-labelledby="page-title"
      className="relative -mt-20 overflow-hidden pt-20"
    >
      {/* Background */}
      <div aria-hidden="true" className="fade-out-bottom pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E6F5F4] via-soft to-white" />
        <div className="bg-aurora absolute -inset-[20%] opacity-90" />
        <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]" />
        <GlowOrb className="-left-32 top-10 h-[420px] w-[420px] bg-accent/60" x={40} y={30} />
        <GlowOrb className="-right-24 bottom-0 h-[380px] w-[380px] bg-primary/15" duration={22} x={-30} y={-20} />
      </div>
      <GlassBubble className="left-[46%] top-[22%] hidden lg:block" size={30} delay={1.4} />
      <Sparkle className="left-[42%] top-[72%] hidden h-4 w-4 text-primary/50 lg:block" delay={0.6} />

      <div
        className={`container-page grid gap-12 pb-16 pt-8 sm:pt-12 lg:gap-10 ${
          image
            ? "lg:grid-cols-[minmax(0,1fr)_420px] lg:items-stretch lg:pb-20 lg:pt-10"
            : "lg:pb-20 lg:pt-14"
        }`}
      >
        <div className={`ph-copy-wrap relative ${image ? "max-w-xl xl:max-w-[44rem]" : "mx-auto max-w-3xl text-center"}`}>
          <div className={`hero-intro ${image ? "lg:flex lg:h-full lg:flex-col lg:justify-center" : ""}`}>
            <div className="ph-eyebrow">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>

            <h1
              id="page-title"
              className="mt-6 text-balance text-[clamp(2.1rem,10vw,2.75rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-secondary [perspective:700px] sm:text-[3.4rem] lg:text-[4.1rem]"
            >
              <span className="ph-line-1 inline-block">{title}</span>
              <br />
              <span className="relative inline-block">
                <span className="ph-line-2 inline-block bg-gradient-to-r from-primary via-[#0A97A6] to-primary bg-clip-text text-transparent text-shimmer">
                  {highlight}
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
                    transition={{ duration: 1.2, delay: 1.3, ease }}
                  />
                </svg>
              </span>
            </h1>

            <p className={`ph-copy mt-7 text-[1.05rem] leading-relaxed text-muted sm:text-lg ${image ? "max-w-md" : "mx-auto max-w-2xl"}`}>
              {description}
            </p>

            {children && <div className={`ph-extra mt-8 flex flex-col gap-3 min-[420px]:flex-row ${image ? "" : "justify-center"}`}>{children}</div>}
          </div>
        </div>

        {image && (
          <div className="ph-visual relative mx-auto w-full max-w-[460px] lg:mr-0 lg:max-w-[420px] lg:self-stretch">
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              transition={{ duration: 1.2, ease, delay: 0.2 }}
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.75rem] bg-gradient-to-br from-accent to-primary/40"
            />
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 1.15, rotate: 8 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              transition={{ duration: 1.5, ease, delay: 0.45 }}
              className="absolute inset-0 -translate-x-4 -translate-y-4 rounded-[2.75rem] border-2 border-primary/20"
            />
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease }}
              className="absolute -right-10 -top-10 h-40 w-40"
            >
              <div className="anim-spin-slow h-full w-full rounded-full border-2 border-dashed border-primary/25" />
            </motion.div>

            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 0% round 44px)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0% round 44px)" }}
              transition={{ duration: 1.3, ease, delay: 0.25 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2.75rem] bg-accent shadow-lift lg:aspect-auto lg:h-full"
            >
              <div className="ph-photo absolute inset-x-0 -inset-y-[6%]">
                <motion.div
                  initial={{ scale: 1.3, rotate: 2 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 2.2, ease, delay: 0.25 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 460px, 92vw"
                    className={`object-cover ${imagePosition}`}
                  />
                </motion.div>
              </div>
              <motion.div
                aria-hidden="true"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.55 }}
                className="absolute inset-0 z-[1] origin-top bg-primary"
              />
              <motion.div
                aria-hidden="true"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
                className="absolute inset-0 origin-top bg-accent"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-secondary/60 to-transparent" />
            </motion.div>

            <div className="pointer-events-none absolute inset-0">
              <Tooth3D className="-right-5 top-[42%] sm:-right-12" size={60} delay={1.5} />
              <FloatingTooth className="-left-6 top-10 text-primary/40 sm:-left-12" size="h-10 w-10" />
              <Sparkle className="right-8 -top-3 h-5 w-5 text-[#0A97A6]" delay={1.5} />
            </div>

            {chips.map(({ icon, label, value }, i) => {
              const Icon = chipIcons[icon];
              return (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: i === 0 ? -40 : 40, scale: 0.8, rotate: i === 0 ? -6 : 6 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 1.3 + i * 0.2, ease }}
                className={`absolute ${i === 0 ? "-left-3 bottom-10 sm:-left-12" : "-right-2 top-10 sm:-right-8"}`}
              >
                <div
                  className={`anim-float flex items-center gap-3 rounded-2xl p-3 pr-5 shadow-lift ${
                    i === 0 ? "bg-white ring-1 ring-line" : "bg-secondary text-white"
                  }`}
                  style={{ "--fy": i === 0 ? "-8px" : "8px", animationDuration: i === 0 ? "5s" : "6s" }}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      i === 0 ? "bg-soft text-primary" : "bg-white/10 text-accent"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className={`text-base font-bold ${i === 0 ? "text-secondary" : ""}`}>{value}</span>
                    <span className={`text-xs ${i === 0 ? "text-muted" : "text-white/70"}`}>{label}</span>
                  </span>
                </div>
              </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
