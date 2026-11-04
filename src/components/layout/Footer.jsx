import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import Logo from "@/components/common/Logo";
import Reveal from "@/components/common/Reveal";
import StarRating from "@/components/common/StarRating";
import { clinic, navLinks, whatsappLink } from "@/data/clinic";
import { treatments } from "@/data/treatments";

function Column({ title, children, delay = 0 }) {
  return (
    <Reveal delay={delay} variant="tilt">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">{title}</h2>
      <div className="mt-5">{children}</div>
    </Reveal>
  );
}

const linkClass =
  "inline-block text-[0.93rem] text-white/65 transition-all duration-300 ease-premium hover:translate-x-1 hover:text-white";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-secondary pb-28 pt-20 text-white sm:pb-10">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div aria-hidden="true" data-speed="0.4" className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />

      <div className="container-page relative">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Logo inverted />
            <p className="mt-6 text-[0.93rem] leading-relaxed text-white/65">
              Personalized dental and implant care in a welcoming, comfortable environment, right here in Pai Layout,
              Bengaluru.
            </p>
            <a
              href={clinic.links.googleProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10 transition hover:bg-white/10"
            >
              <span className="text-2xl font-bold">{clinic.rating.value}</span>
              <span className="flex flex-col gap-1">
                <StarRating value={clinic.rating.value} size="h-3.5 w-3.5" />
                <span className="text-xs text-white/60">{clinic.rating.count} Google reviews</span>
              </span>
            </a>
          </div>

          <Column title="Quick Links" delay={0.1}>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  {l.href ? (
                    <a href={l.href} className={linkClass}>
                      {l.label}
                    </a>
                  ) : (
                    <span className="inline-block text-[0.93rem] text-white/65">{l.label}</span>
                  )}
                </li>
              ))}
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Book Appointment
                </a>
              </li>
            </ul>
          </Column>

          <Column title="Treatments" delay={0.2}>
            <ul className="space-y-3">
              {treatments.map((t) => (
                <li key={t.slug}>
                  <a href="#treatments" className={linkClass}>
                    {t.title}
                  </a>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Contact" delay={0.3}>
            <ul className="space-y-4 text-[0.93rem]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <address className="not-italic leading-relaxed text-white/65">{clinic.address.full}</address>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={clinic.phone.tel} className={linkClass}>
                  {clinic.phone.display}
                </a>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  WhatsApp us
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="leading-relaxed text-white/65">
                  {clinic.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.slots.join(", ")}
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <a
                  href={clinic.links.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-accent transition-colors hover:text-white"
                >
                  View on Google Maps <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </Column>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {clinic.name}. All rights reserved.
          </p>
          <p>Pai Layout, Old Madras Road, Bengaluru</p>
        </div>
      </div>
    </footer>
  );
}
