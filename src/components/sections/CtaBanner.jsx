"use client";

import { useRef } from "react";
import { Clock, Phone } from "lucide-react";
import Button from "@/components/common/Button";
import SplitReveal from "@/components/common/SplitReveal";
import Reveal from "@/components/common/Reveal";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { ToothIcon } from "@/components/common/DentalIcons";
import { FloatingTooth, GlowOrb, Sparkle } from "@/components/common/FloatingShapes";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { clinic, whatsappLink } from "@/data/clinic";

// Closing call-to-action for inner pages: a dark panel that opens out as it scrolls in,
// with a large tooth turning slowly in the background.
export default function CtaBanner({
  title = "Ready for a Healthier, Happier Smile?",
  description = "Message us on WhatsApp or give us a call. We'll help you find a time that suits you.",
  message,
}) {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          q(".cta-panel"),
          { clipPath: "inset(8% 10% 8% 10% round 64px)", scale: 0.96 },
          {
            clipPath: "inset(0% 0% 0% 0% round 40px)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 40%", scrub: true },
          }
        );
        gsap.to(q(".cta-tooth"), {
          rotate: 30,
          yPercent: -20,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="cta-title" className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-page">
        <div className="cta-panel relative overflow-hidden rounded-[2.5rem] bg-secondary px-6 py-16 text-white sm:px-12 sm:py-20 lg:px-20">
          <GlowOrb className="-right-32 -top-32 h-[420px] w-[420px] bg-primary/50" />
          <GlowOrb className="-bottom-40 -left-24 h-[360px] w-[360px] bg-[#0A97A6]/30" duration={22} x={-30} />
          <ToothIcon
            aria-hidden="true"
            className="cta-tooth pointer-events-none absolute -bottom-16 -right-10 h-72 w-72 text-white/[0.05] sm:h-96 sm:w-96"
          />
          <FloatingTooth className="left-[6%] top-10 hidden text-accent/30 md:block" size="h-9 w-9" />
          <Sparkle className="right-[30%] top-10 h-5 w-5 text-accent/60" delay={0.4} />
          <Sparkle className="bottom-12 left-[40%] h-4 w-4 text-accent/40" delay={1.6} />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <SplitReveal
                as="h2"
                id="cta-title"
                className="text-balance text-[1.9rem] font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
              >
                {title}
              </SplitReveal>
              <SplitReveal as="p" mode="lines" delay={0.2} className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
                {description}
              </SplitReveal>
              <Reveal delay={0.3} className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
                <Button href={whatsappLink(message)} external icon={WhatsAppIcon} variant="light">
                  Chat on WhatsApp
                </Button>
                <Button href={clinic.phone.tel} icon={Phone} variant="ghost">
                  {clinic.phone.display}
                </Button>
              </Reveal>
            </div>

            <Reveal variant="tilt" delay={0.2}>
              <div className="rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur sm:p-7">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                  <Clock className="h-4 w-4" aria-hidden="true" /> Clinic Timings
                </p>
                <dl className="mt-5 space-y-4">
                  {clinic.hours.map((h) => (
                    <div key={h.days} className="flex flex-col gap-1 border-b border-white/10 pb-4 last:border-0 last:pb-0 sm:flex-row sm:justify-between">
                      <dt className="font-semibold">{h.days}</dt>
                      <dd className="text-white/70 sm:text-right">
                        {h.slots.map((s) => (
                          <span key={s} className="block">
                            {s}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
