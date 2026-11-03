import { HeartHandshake, MapPin, MessageSquareText, Star } from "lucide-react";
import Counter from "@/components/common/Counter";
import Reveal from "@/components/common/Reveal";
import { clinic } from "@/data/clinic";

const stats = [
  {
    icon: Star,
    value: <Counter value={clinic.rating.value} decimals={1} suffix="/5" />,
    label: "Google Rating",
    href: clinic.links.googleProfile,
  },
  {
    icon: MessageSquareText,
    value: <Counter value={clinic.rating.count} />,
    label: "Google Reviews",
    href: clinic.links.googleProfile,
  },
  {
    icon: HeartHandshake,
    value: "Personalized",
    label: "Dental Care Plans",
  },
  {
    icon: MapPin,
    value: "Pai Layout",
    label: "Convenient Bengaluru Location",
    href: clinic.links.googleMaps,
  },
];

export default function TrustStats() {
  return (
    <section id="trust" aria-label="Why patients trust A-Zee Dental" className="relative z-10 -mt-6 lg:-mt-10">
      <div className="container-page">
        <Reveal className="grid grid-cols-2 overflow-hidden rounded-[2rem] bg-white shadow-lift ring-1 ring-line lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label, href }, i) => {
            const Tag = href ? "a" : "div";
            return (
              <Tag
                key={label}
                {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group relative flex flex-col items-start gap-4 p-5 transition-colors duration-300 hover:bg-soft sm:flex-row sm:items-center sm:p-7 ${
                  i % 2 === 0 ? "border-r border-line" : ""
                } ${i < 2 ? "border-b border-line lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""}`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-soft text-primary ring-1 ring-accent/60 transition-all duration-500 ease-premium group-hover:-rotate-6 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-secondary sm:text-[1.6rem]">{value}</span>
                  <span className="text-[0.82rem] leading-snug text-muted sm:text-sm">{label}</span>
                </span>
              </Tag>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
