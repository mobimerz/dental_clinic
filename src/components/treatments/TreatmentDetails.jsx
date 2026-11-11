"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { CircleCheck } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { treatmentIcons } from "@/components/common/treatmentIcons";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { treatmentCategories, treatments } from "@/data/treatments";
import { whatsappLink } from "@/data/clinic";

const categoryLabel = Object.fromEntries(treatmentCategories.map((c) => [c.id, c.label]));

function DetailPanel({ t, index }) {
  const Icon = treatmentIcons[t.icon];
  return (
    <article
      id={t.slug}
      aria-labelledby={`${t.slug}-title`}
      className="detail-panel group relative scroll-mt-28 overflow-hidden rounded-[2.25rem] bg-white p-7 shadow-soft ring-1 ring-line transition-shadow duration-700 ease-premium hover:shadow-lift sm:p-10"
    >
      <span
        aria-hidden="true"
        className="detail-glow absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/50 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="detail-num pointer-events-none absolute -right-2 top-2 select-none text-[7rem] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgb(8_127_140/0.1)] sm:text-[9rem]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <header className="relative flex flex-wrap items-center gap-4">
        <span className="detail-icon flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#0A97A6] text-white shadow-glow">
          <Icon className="h-8 w-8" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-primary">{categoryLabel[t.category]}</span>
          <h3 id={`${t.slug}-title`} className="mt-1 text-2xl font-bold tracking-tight text-secondary sm:text-3xl">
            {t.title}
          </h3>
        </span>
      </header>

      <p className="detail-copy relative mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-[1.05rem]">{t.summary}</p>

      <div className="relative mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-soft p-6 ring-1 ring-accent/50">
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">May help if you have</h4>
          <ul className="mt-4 space-y-3">
            {t.helpsWith.map((item) => (
              <li key={item} className="detail-check flex items-start gap-3 text-[0.95rem] text-ink">
                <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl p-6 ring-1 ring-line">
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">What to expect</h4>
          <ol className="relative mt-4 space-y-4">
            <span aria-hidden="true" className="absolute bottom-3 left-[13px] top-3 w-px bg-line" />
            <span aria-hidden="true" className="detail-rail absolute bottom-3 left-[13px] top-3 w-px origin-top bg-primary" />
            {t.steps.map((step, i) => (
              <li key={step} className="detail-step relative flex items-start gap-3 text-[0.95rem] text-ink">
                <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-primary ring-1 ring-accent">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="relative mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">Suitability is confirmed at your consultation.</p>
        <Button
          href={whatsappLink(`Hello A-Zee Dental, I would like to know more about ${t.title}.`)}
          external
          icon={WhatsAppIcon}
          className="!py-3"
        >
          Ask About {t.title}
        </Button>
      </div>
    </article>
  );
}

// Every treatment in depth. A sticky index on the left tracks the panel being read;
// each panel builds itself in (icon spin, copy, checklist, then a rail drawing through the steps).
export default function TreatmentDetails() {
  const root = useRef(null);
  const [active, setActive] = useState(treatments[0].slug);
  // A menu click highlights its item straight away, and the panels the page passes on the way
  // (the scroll itself is handled site-wide in SmoothScroll) don't flicker the highlight.
  const jumping = useRef(false);
  const jumpTimer = useRef(null);
  const goTo = (slug) => {
    setActive(slug);
    jumping.current = true;
    clearTimeout(jumpTimer.current);
    jumpTimer.current = setTimeout(() => (jumping.current = false), 1600);
  };

  useGSAP(
    () => {
      const panels = gsap.utils.toArray(".detail-panel", root.current);

      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => self.isActive && !jumping.current && setActive(panel.id),
        });
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        panels.forEach((panel) => {
          const q = gsap.utils.selector(panel);
          const tl = gsap.timeline({
            defaults: { ease: "expo.out" },
            scrollTrigger: { trigger: panel, start: "top 82%", once: true },
          });
          tl.from(panel, { y: 80, opacity: 0, scale: 0.96, duration: 1.2 })
            .from(q(".detail-icon"), { scale: 0, rotate: -120, duration: 1, ease: "back.out(1.8)" }, "-=0.9")
            .from(q(".detail-num"), { xPercent: 40, opacity: 0, duration: 1.4 }, "<")
            .from(q(".detail-copy"), { y: 20, opacity: 0, duration: 0.9 }, "-=1.1")
            .from(q(".detail-check"), { x: -24, opacity: 0, stagger: 0.08, duration: 0.8 }, "-=0.7")
            .from(q(".detail-step"), { x: 24, opacity: 0, stagger: 0.09, duration: 0.8 }, "<")
            .fromTo(q(".detail-rail"), { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: "power2.inOut" }, "<0.1");

          gsap.to(q(".detail-glow"), {
            yPercent: 60,
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="details-title" className="relative section-y">
      <div className="container-page">
        <SectionHeading
          id="details-title"
          eyebrow="Treatment Guide"
          title="Everything You'd Want to Know."
          description="A plain-language guide to each treatment: what it's for, who it can help and how your visits usually go."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          <nav aria-label="Treatments" className="hidden lg:block">
            <ol className="sticky top-28 space-y-1 rounded-3xl bg-soft p-3 ring-1 ring-line">
              {treatments.map((t, i) => {
                const isActive = active === t.slug;
                return (
                  <li key={t.slug}>
                    <a
                      href={`#${t.slug}`}
                      onClick={() => goTo(t.slug)}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                        isActive ? "text-white" : "text-secondary hover:text-primary"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="detail-index"
                          className="absolute inset-0 rounded-2xl bg-primary shadow-glow"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                      <span className={`relative w-5 shrink-0 text-xs tabular-nums ${isActive ? "text-accent" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="relative">{t.title}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="flex flex-col gap-8">
            {treatments.map((t, i) => (
              <DetailPanel key={t.slug} t={t} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
