import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";
import { clinic, whatsappLink } from "@/data/clinic";

function InfoRow({ icon: Icon, title, children }) {
  return (
    <div className="flex gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-soft text-primary ring-1 ring-accent/60">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">{title}</h3>
        <div className="mt-1.5 text-[0.98rem] leading-relaxed text-secondary">{children}</div>
      </div>
    </div>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 sm:py-28 lg:py-32">
      <div className="container-page">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact & Location"
          title="Visit A-Zee Dental & Implant Centre."
          description="Conveniently located in Pai Layout, off Old Madras Road in Bengaluru."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="flex flex-col gap-8 rounded-[2rem] bg-white p-7 shadow-soft ring-1 ring-line sm:p-10">
            <InfoRow icon={MapPin} title="Address">
              <address className="not-italic">
                {clinic.address.line1},<br />
                {clinic.address.line2},<br />
                {clinic.address.city}, {clinic.address.state} {clinic.address.postalCode}
              </address>
            </InfoRow>

            <InfoRow icon={Phone} title="Phone">
              <a href={clinic.phone.tel} className="font-semibold transition-colors hover:text-primary">
                {clinic.phone.display}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center gap-1.5 text-sm font-medium text-[#178F49] hover:underline"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp
              </a>
            </InfoRow>

            <InfoRow icon={Clock} title="Clinic Timings">
              <dl className="space-y-2.5">
                {clinic.hours.map((h) => (
                  <div key={h.days} className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-semibold sm:w-40 sm:shrink-0">{h.days}</dt>
                    <dd className="text-muted">
                      {h.slots.map((s) => (
                        <span key={s} className="block">
                          {s}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-muted">{clinic.hoursNote}</p>
            </InfoRow>

            <div className="mt-auto flex flex-col gap-3 border-t border-line pt-8 sm:flex-row">
              <Button href={clinic.links.directions} external icon={Navigation}>
                Get Directions
              </Button>
              <Button href={clinic.phone.tel} variant="secondary" icon={Phone}>
                Call the Clinic
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative min-h-[380px] overflow-hidden rounded-[2rem] bg-soft shadow-soft ring-1 ring-line lg:min-h-full">
            <iframe
              title={`Map showing the location of ${clinic.name}`}
              src={clinic.links.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[20%]"
              allowFullScreen
            />
            <a
              href={clinic.links.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-white/95 p-4 shadow-lift backdrop-blur transition hover:ring-2 hover:ring-accent sm:left-auto sm:max-w-xs"
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-secondary">{clinic.name}</span>
                <span className="block text-xs text-muted">Open in Google Maps</span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
