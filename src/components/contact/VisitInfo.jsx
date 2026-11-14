"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Clock, Copy, Check, MapPin, Navigation } from "lucide-react";
import Button from "@/components/common/Button";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import TwoColumn from "@/components/ui/TwoColumn";
import { card, photo, photoMaskRadius } from "@/components/ui/styles";
import { clinic } from "@/data/clinic";

// Monday to Saturday share the same hours, so they are listed as one row (day 0 = Sunday).
const DAY_GROUPS = [
  { label: "Monday – Saturday", days: [1, 2, 3, 4, 5, 6] },
  { label: "Sunday", days: [0] },
];
const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const format = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

// Current day and minute-of-day in Bengaluru, wherever the visitor is.
function nowInIndia() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type).value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

function getStatus() {
  const { day, minutes } = nowInIndia();
  const today = clinic.schedule[day];
  const current = today.find(([open, close]) => minutes >= toMinutes(open) && minutes < toMinutes(close));
  if (current) return { day, open: true, text: `Open now · until ${format(current[1])}` };
  const later = today.find(([open]) => toMinutes(open) > minutes);
  if (later) return { day, open: false, text: `Closed now · opens ${format(later[0])} today` };
  const tomorrow = clinic.schedule[(day + 1) % 7];
  return { day, open: false, text: `Closed now · opens ${format(tomorrow[0][0])} tomorrow` };
}

// Live open/closed status, computed in the browser only (so it never mismatches the server render).
function useClinicStatus() {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const update = () => setStatus(getStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);
  return status;
}

function CopyAddress() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(clinic.address.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address is still on screen to copy by hand.
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-full bg-soft px-3.5 py-2 text-sm font-semibold text-primary ring-1 ring-accent/60 transition-all duration-300 hover:bg-primary hover:text-white"
    >
      {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
    </button>
  );
}

export default function VisitInfo() {
  const root = useRef(null);
  const status = useClinicStatus();

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: q(".map-frame")[0], start: "top 80%", once: true } });
        tl.fromTo(
          q(".map-frame"),
          { clipPath: "inset(12% 12% 12% 12% round 48px)" },
          { clipPath: `inset(0% 0% 0% 0% round ${photoMaskRadius})`, duration: 1.5, ease: "expo.inOut" }
        )
          .fromTo(q(".map-curtain"), { scaleY: 1 }, { scaleY: 0, duration: 1.1, ease: "expo.inOut" }, "-=0.9")
          .from(q(".map-pin"), { y: -80, opacity: 0, duration: 1, ease: "bounce.out" }, "-=0.4");
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <Section ref={root} aria-labelledby="visit-title">
      <Container>
        <TwoColumn layout="aside">
        <div>
          <SectionHeading
            id="visit-title"
            eyebrow="Visit the Clinic"
            title="Find Us in Pai Layout."
            description="We're on 1st Main Road in Pai Layout, just off Old Madras Road. Message or call ahead and we'll have a time ready for you."
            align="left"
          />

          <Reveal delay={0.15} className="mt-8">
            <div className={card}>
              <div className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-soft text-primary ring-1 ring-accent/60">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Address</p>
                  <address className="mt-2 not-italic leading-relaxed text-secondary">
                    {clinic.address.line1},<br />
                    {clinic.address.line2},<br />
                    {clinic.address.city}, {clinic.address.state} {clinic.address.postalCode}
                  </address>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <CopyAddress />
                    <a
                      href={clinic.links.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-secondary ring-1 ring-line transition-all duration-300 hover:text-primary hover:ring-accent"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-line pt-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                    <Clock className="h-4 w-4" aria-hidden="true" /> Clinic Timings
                  </p>
                  {status && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        status.open ? "bg-[#1FAF5A]/10 text-[#178F49]" : "bg-soft text-muted"
                      }`}
                    >
                      <span className="relative flex h-2 w-2">
                        {status.open && <span className="absolute inset-0 animate-ping rounded-full bg-[#1FAF5A]" />}
                        <span className={`relative h-2 w-2 rounded-full ${status.open ? "bg-[#1FAF5A]" : "bg-muted"}`} />
                      </span>
                      {status.text}
                    </motion.span>
                  )}
                </div>

                <ul className="mt-6 space-y-1">
                  {DAY_GROUPS.map(({ label, days }) => {
                    const today = days.includes(status?.day);
                    return (
                      <li
                        key={label}
                        className={`flex items-start justify-between gap-4 rounded-xl px-3 py-2 text-body transition-colors ${
                          today ? "bg-soft font-semibold text-secondary ring-1 ring-accent/60" : "text-ink"
                        }`}
                      >
                        <span>
                          {label}
                          {today && <span className="ml-2 text-xs font-semibold text-primary">Today</span>}
                        </span>
                        <span className="text-right text-muted">
                          {clinic.schedule[days[0]].map(([o, c]) => (
                            <span key={o} className="block">
                              {format(o)} – {format(c)}
                            </span>
                          ))}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-4 text-xs text-muted">{clinic.hoursNote}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* The map has the photo frame: fixed 4:3 ratio, capped at 520px, never stretched to the text column */}
        <div className="relative">
          <div className={`map-frame ring-1 ring-line ${photo} aspect-[4/3] max-h-[520px] w-full`}>
            <iframe
              title={`Map showing ${clinic.name}`}
              src={clinic.links.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[30%] transition-[filter] duration-700 hover:grayscale-0"
            />
            <div aria-hidden="true" className="map-curtain absolute inset-0 origin-top bg-primary [transform:scaleY(0)]" />
            <div className="map-pin pointer-events-none absolute left-4 top-4 flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-lift ring-1 ring-line backdrop-blur">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-bold text-secondary">{clinic.shortName}</span>
                <span className="text-xs text-muted">Pai Layout, Bengaluru</span>
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-end">
              <Button href={clinic.links.directions} external icon={Navigation}>
                Get Directions
              </Button>
            </div>
          </div>
        </div>
        </TwoColumn>
      </Container>
    </Section>
  );
}
