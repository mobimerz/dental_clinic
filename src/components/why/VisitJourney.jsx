"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, CalendarCheck, ClipboardList, HeartHandshake, MessageCircle, Stethoscope } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { card } from "@/components/ui/styles";
import { GlowOrb } from "@/components/common/FloatingShapes";

const steps = [
  {
    icon: MessageCircle,
    title: "Reach Out",
    text: "Message us on WhatsApp or call. Tell us what's bothering you and we'll find a time that suits you, mornings, evenings or Sunday.",
  },
  {
    icon: Stethoscope,
    title: "Unhurried Consultation",
    text: "A thorough check of your teeth and gums, with X-rays where needed. We listen first and examine gently.",
  },
  {
    icon: ClipboardList,
    title: "A Clear Plan",
    text: "Your options, the steps involved and what to expect, explained in plain language so you can decide with confidence.",
  },
  {
    icon: HeartHandshake,
    title: "Comfortable Treatment",
    text: "Care carried out at a calm pace with a painless, comfort-first approach, and we check in with you throughout.",
  },
  {
    icon: CalendarCheck,
    title: "Aftercare & Follow-up",
    text: "Simple aftercare guidance, a follow-up when needed and reminders for your next check-up to keep your smile healthy.",
  },
];

// "Your visit, step by step". On desktop the steps sit in a sideways row the reader moves through
// with the left/right arrows (or a trackpad swipe); the page itself scrolls normally the whole
// time, nothing is pinned. A progress line under the row shows how far along it is.
// On smaller screens the steps simply stack.
export default function VisitJourney() {
  const track = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
    setProgress(max > 0 ? el.scrollLeft / max : 1);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  // One card (plus the gap) per click.
  const step = (dir) => {
    const el = track.current;
    const first = el?.querySelector("li");
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: "smooth" });
  };

  const arrow =
    "flex h-12 w-12 items-center justify-center rounded-full bg-white text-secondary shadow-soft ring-1 ring-line transition-all duration-300 hover:bg-primary hover:text-white hover:ring-primary disabled:pointer-events-none disabled:opacity-35";

  return (
    <section aria-labelledby="journey-title" className="relative overflow-clip bg-soft">
      <div className="relative section-default">
        <GlowOrb className="-right-40 top-10 h-[460px] w-[460px] bg-accent/70" />
        <div className="container-page relative lg:flex lg:items-end lg:justify-between lg:gap-10">
          <SectionHeading
            id="journey-title"
            eyebrow="Your Visit, Step by Step"
            title="No Surprises. Just Clear, Gentle Care."
            description="Here's what a typical journey looks like at A-Zee Dental, from your first message to your follow-up."
            align="left"
          />
          <div className="hidden shrink-0 gap-3 lg:flex">
            <button type="button" onClick={() => step(-1)} disabled={edges.start} aria-label="Previous step" aria-controls="journey-track" className={arrow}>
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => step(1)} disabled={edges.end} aria-label="Next step" aria-controls="journey-track" className={arrow}>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="container-page header-gap relative">
          {/* Extra vertical padding inside the scroller so the cards' hover lift and shadow aren't clipped */}
          <div
            ref={track}
            id="journey-track"
            onScroll={update}
            className="lg:-mx-4 lg:-my-6 lg:snap-x lg:snap-mandatory lg:overflow-x-auto lg:scroll-px-4 lg:px-4 lg:py-6 lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden"
          >
            <ol className="journey-track flex flex-col gap-6 lg:w-max lg:flex-row">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <li
                  key={title}
                  className={`journey-card group relative flex flex-col overflow-hidden ${card} transition-[translate,box-shadow] duration-500 ease-premium hover:-translate-y-2 hover:shadow-lift hover:ring-accent lg:h-[340px] lg:w-[360px] lg:snap-start`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-3 -top-6 select-none text-[7rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_rgb(8_127_140/0.12)] transition-all duration-700 group-hover:[-webkit-text-stroke:1.5px_rgb(8_127_140/0.35)]"
                  >
                    {i + 1}
                  </span>
                  <span className="journey-icon relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#0A97A6] text-white shadow-glow transition-transform duration-500 ease-premium group-hover:-rotate-[10deg] group-hover:scale-110">
                    <Icon className="h-7 w-7 group-hover:icon-draw" aria-hidden="true" />
                  </span>
                  {/* Step label with a cue to the next card: right on desktop (the row scrolls sideways),
                      down on phones (cards stack). The last step has nothing after it, so no arrow. */}
                  <span className="relative flex min-h-[4.25rem] items-center gap-3 pt-8 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Step {String(i + 1).padStart(2, "0")}
                    {i < steps.length - 1 && (
                      <>
                        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-accent to-transparent" />
                        <span
                          aria-hidden="true"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft text-primary ring-1 ring-accent/60 transition-colors duration-500 group-hover:bg-primary group-hover:text-white"
                        >
                          <ArrowRight className="anim-nudge-x hidden h-4 w-4 lg:block" />
                          <ArrowDown className="anim-nudge-y h-4 w-4 lg:hidden" />
                        </span>
                      </>
                    )}
                  </span>
                  <h3 className="relative mt-2 text-h3 text-secondary">{title}</h3>
                  <p className="relative mt-3 text-body text-muted">{text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div aria-hidden="true" className="mt-8 hidden h-1 overflow-hidden rounded-full bg-white ring-1 ring-line lg:block">
            <div
              className="journey-progress h-full origin-left rounded-full bg-gradient-to-r from-accent via-primary to-[#0A97A6] transition-transform duration-300"
              style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
