"use client";

import { createContext, useContext, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { CalendarCheck, Clock, MapPin } from "lucide-react";
import Button from "@/components/common/Button";
import StarRating from "@/components/common/StarRating";
import Tilt from "@/components/common/Tilt";
import Tooth3D, { GlassBubble } from "@/components/common/Tooth3D";
import { FloatingTooth, GlowOrb, Sparkle } from "@/components/common/FloatingShapes";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { clinic, clinicImages, whatsappLink } from "@/data/clinic";

const ease = [0.22, 1, 0.36, 1];

// Monday to Saturday share one set of timings; Sunday's shorter hours are listed on the Contact page.
const weekdayHours = clinic.hours[0];

// Smoothed pointer position across the hero, from -1 to 1 on each axis.
const PointerContext = createContext(null);

// Shifts its children with the pointer. Higher `depth` = closer to the viewer.
function Depth({ depth = 10, className = "", children }) {
  const { x, y } = useContext(PointerContext);
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth);
  return (
    <motion.div style={{ x: tx, y: ty }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const img = clinicImages.doctorPortrait;
  const root = useRef(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const pointer = {
    x: useSpring(px, { stiffness: 70, damping: 20, mass: 0.7 }),
    y: useSpring(py, { stiffness: 70, damping: 20, mass: 0.7 }),
  };

  const onPointerMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    px.set((e.clientX / window.innerWidth - 0.5) * 2);
    py.set((e.clientY / window.innerHeight - 0.5) * 2);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.set(q(".hero-intro"), { visibility: "visible" });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const chars = SplitText.create(q(".hero-line-1"), { type: "chars", charsClass: "inline-block" });
        const copy = SplitText.create(q(".hero-copy"), { type: "words" });

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(q(".hero-badge"), { y: -24, scale: 0.85, opacity: 0, duration: 1 })
          .from(q(".hero-badge-icon"), { rotate: -200, scale: 0, duration: 1.1, ease: "back.out(2)" }, "<0.1")
          .from(
            chars.chars,
            {
              yPercent: 90,
              rotateX: -95,
              opacity: 0,
              filter: "blur(10px)",
              transformOrigin: "50% 100% -20px",
              stagger: 0.035,
              duration: 1.3,
            },
            "-=0.7"
          )
          .from(
            q(".hero-line-2"),
            { yPercent: 70, opacity: 0, scale: 1.08, letterSpacing: "0.1em", filter: "blur(14px)", duration: 1.5 },
            "-=1"
          )
          .from(copy.words, { y: 18, opacity: 0, filter: "blur(6px)", duration: 0.9, stagger: 0.025 }, "-=1.1")
          .from(q(".hero-cta > *"), { y: 34, opacity: 0, scale: 0.9, stagger: 0.12, duration: 1 }, "-=0.85");

        // Scrolling away: both columns lift together by the same distance (so they stay aligned
        // and nothing slides toward the next section); the copy fades, the portrait shrinks a touch.
        const out = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q(".hero-copy-wrap"), { y: -80, opacity: 0.35, ease: "none", scrollTrigger: out });
        gsap.to(q(".hero-visual"), { y: -80, scale: 0.94, ease: "none", scrollTrigger: out });
        gsap.to(q(".hero-photo"), { yPercent: 12, ease: "none", scrollTrigger: out });

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
    <PointerContext.Provider value={pointer}>
      <section
        ref={root}
        id="home"
        aria-labelledby="hero-title"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative -mt-20 overflow-hidden pt-20 lg:flex lg:min-h-[min(calc(100svh-98px),860px)] lg:flex-col"
      >
        {/* Background */}
        <div aria-hidden="true" className="fade-out-bottom pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#E6F5F4] via-soft to-white" />
          <div className="bg-aurora absolute -inset-[20%] opacity-90" />
          <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]" />
          <GlowOrb className="-left-32 top-10 h-[420px] w-[420px] bg-accent/60" x={40} y={30} />
          <GlowOrb className="-right-24 bottom-0 h-[380px] w-[380px] bg-primary/15" duration={22} x={-30} y={-20} />
        </div>

        {/* Far-field floating elements */}
        <Depth depth={-18} className="pointer-events-none absolute inset-0 -z-10">
          <GlassBubble className="left-[46%] top-[18%] hidden lg:block" size={34} delay={1.4} />
          <GlassBubble className="bottom-[14%] left-[8%] hidden md:block" size={22} duration={9} delay={1.8} />
          <Sparkle className="left-[40%] top-[70%] hidden h-4 w-4 text-primary/50 lg:block" delay={0.6} />
        </Depth>

        {/* On desktop the photo takes the copy block's height, so both columns start and end on the same lines
            without stretching the gaps inside the copy. */}
        <div className="container-page grid gap-12 pb-16 pt-8 sm:pt-12 lg:w-full lg:flex-1 lg:grid-cols-[minmax(0,1fr)_420px] lg:content-center lg:items-stretch lg:gap-10 lg:pb-16 lg:pt-6">
          {/* Copy */}
          <div className="hero-copy-wrap relative max-w-xl xl:max-w-[44rem]">
            <div className="hero-intro lg:flex lg:h-full lg:flex-col lg:justify-center">
              {/* Address and Mon–Sat timings share one two-line pill, so adding the timings
                  does not push the heading down. Narrower screens stack them, icons in one column. */}
              <div className="hero-badge">
                <span className="inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1.5 rounded-[1.25rem] xl:flex-nowrap bg-white/80 py-1.5 pl-1.5 pr-4 text-[0.8rem] font-semibold leading-snug text-secondary shadow-soft ring-1 ring-line backdrop-blur">
                  <span className="flex min-w-0 basis-full items-center gap-2.5 xl:flex-1 xl:basis-auto">
                    <span className="hero-badge-icon inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-balance">{clinic.address.full}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2.5 xl:border-l xl:border-line xl:pl-3">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-soft text-primary ring-1 ring-accent/60">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block">{weekdayHours.days}</span>
                      <span className="block font-medium text-muted">{weekdayHours.slots.map((s) => s.replace(/:00/g, "")).join(" · ")}</span>
                    </span>
                  </span>
                </span>
              </div>

              <h1
                id="hero-title"
                className="mt-6 text-[clamp(2.2rem,11.4vw,2.85rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-secondary [perspective:700px] min-[400px]:text-[3.25rem] sm:text-6xl lg:text-[4.1rem]"
              >
                <span className="hero-line-1 inline-block">Your Smile,</span>
                <br />
                <span className="relative inline-block">
                  <span className="hero-line-2 inline-block bg-gradient-to-r from-primary via-[#0A97A6] to-primary bg-clip-text text-transparent text-shimmer">
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
                      transition={{ duration: 1.2, delay: 1.5, ease }}
                    />
                  </svg>
                </span>
              </h1>

              <p className="hero-copy mt-7 max-w-md text-[1.05rem] leading-relaxed text-muted sm:text-lg">
                Experience comfortable, personalized dental care designed to keep your smile healthy, confident and beautiful.
              </p>

              <div className="hero-cta mt-8 flex flex-col gap-3 min-[420px]:flex-row">
                <Button href={whatsappLink()} external icon={CalendarCheck}>
                  Book Your Appointment
                </Button>
                <Button href="/treatments" variant="secondary" arrow>
                  Explore Treatments
                </Button>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="hero-visual relative mx-auto w-full max-w-[460px] lg:mr-0 lg:max-w-[420px] lg:self-stretch">
            {/* Decorative backdrop shapes */}
            <Depth depth={-10} className="absolute inset-0">
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
            </Depth>
            <Depth depth={-24} className="absolute -right-10 -top-10 h-40 w-40">
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.6, ease }}
                className="h-full w-full"
              >
                <div className="anim-spin-slow h-full w-full rounded-full border-2 border-dashed border-primary/25" />
              </motion.div>
            </Depth>
            <Depth depth={28} className="pointer-events-none absolute inset-0">
              <FloatingTooth className="-left-8 top-16 text-primary/40 sm:-left-14" size="h-12 w-12" />
              <FloatingTooth className="-right-4 bottom-28 text-white sm:-right-10" size="h-9 w-9" duration={8} delay={1} />
              <Sparkle className="-left-3 bottom-1/3 h-6 w-6 text-primary" />
              <Sparkle className="right-10 -top-4 h-5 w-5 text-[#0A97A6]" delay={1.5} />
            </Depth>
            {/* Image reveal: mask opens upward, then two colour curtains lift off the photo */}
            <Depth depth={8} className="relative lg:h-full">
              <motion.div
                initial={{ clipPath: "inset(100% 0% 0% 0% round 44px)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0% round 44px)" }}
                transition={{ duration: 1.3, ease, delay: 0.25 }}
                className="relative aspect-[4/5] overflow-hidden rounded-[2.75rem] bg-accent shadow-lift lg:aspect-auto lg:h-full"
              >
                <div className="hero-photo absolute inset-x-0 -inset-y-[6%]">
                  <motion.div
                    initial={{ scale: 1.3, rotate: 2 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 2.2, ease, delay: 0.25 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 420px, (min-width: 640px) 460px, 92vw"
                      className="object-cover object-[50%_22%]"
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
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-secondary/70 to-transparent" />
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease, delay: 1.6 }}
                  className="absolute left-4 top-4 rounded-2xl bg-secondary/55 px-4 py-2.5 text-white ring-1 ring-white/25 backdrop-blur-md sm:bottom-5 sm:left-auto sm:right-5 sm:top-auto sm:bg-white/15 sm:text-right"
                >
                  <p className="text-sm font-bold">Dr. Aysha Aslam</p>
                  <p className="text-[0.72rem] text-white/80">A-Zee Dental &amp; Implant Centre</p>
                </motion.div>
              </motion.div>
            </Depth>
            {/* 3D teeth orbiting the portrait */}
            <Depth depth={42} className="pointer-events-none absolute inset-0">
              <Tooth3D className="-right-6 top-[38%] sm:-right-14" size={68} delay={1.5} />
              <Tooth3D className="-left-4 -top-6 sm:-left-10" size={46} duration={11} delay={1.8} tint="#9FD9D4" />
              {/* Sits in the gap below the photo, clear of the rating card and the name badge */}
              <GlassBubble className="-bottom-7 right-[44%]" size={30} delay={2} />
            </Depth>
            {/* Floating rating card */}
            <Depth depth={34} className="absolute -left-3 bottom-8 sm:-left-12">
              <motion.a
                href={clinic.links.googleProfile}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -40, scale: 0.8, rotate: -6 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 1.3, ease }}
                className="block"
                aria-label={`Rated ${clinic.rating.value} out of 5 on Google from ${clinic.rating.count} reviews`}
              >
                <div className="anim-float">
                  <Tilt max={14} scale={1.06} radius="rounded-2xl" shadow={false}>
                    <div className="flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-lift ring-1 ring-line transition-shadow hover:ring-accent">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-soft text-2xl font-extrabold text-primary">
                        {clinic.rating.value}
                      </span>
                      <span className="flex flex-col gap-1">
                        <StarRating value={clinic.rating.value} size="h-3.5 w-3.5" />
                        <span className="text-xs font-semibold text-secondary">{clinic.rating.count} Google reviews</span>
                      </span>
                    </div>
                  </Tilt>
                </div>
              </motion.a>
            </Depth>
          </div>
        </div>
      </section>
    </PointerContext.Provider>
  );
}
