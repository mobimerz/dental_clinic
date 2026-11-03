import { ClipboardList, HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import { GlowOrb } from "@/components/common/FloatingShapes";
import { ToothIcon } from "@/components/common/DentalIcons";

const features = [
  {
    icon: HeartHandshake,
    title: "Personalized Patient Care",
    text: "Every visit begins by listening. Your treatment is planned around your concerns, comfort and goals.",
  },
  {
    icon: ClipboardList,
    title: "Clear Treatment Guidance",
    text: "We explain your options, the steps involved and what to expect, so you can decide with confidence.",
  },
  {
    icon: ShieldCheck,
    title: "Focus on Hygiene & Comfort",
    text: "Clean, well-kept treatment rooms and a calm, gentle approach to make each appointment feel at ease.",
  },
  {
    icon: Stethoscope,
    title: "Comprehensive Dental Services",
    text: "Preventive, restorative, cosmetic and implant care in one place, for you and your family.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-title"
      className="relative overflow-hidden bg-secondary py-24 text-white sm:py-28 lg:py-32"
    >
      <GlowOrb className="-right-40 -top-40 h-[520px] w-[520px] bg-primary/40" />
      <GlowOrb className="-bottom-48 -left-40 h-[460px] w-[460px] bg-[#0A97A6]/25" duration={24} x={-40} />
      <ToothIcon
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-[-6rem] h-[26rem] w-[26rem] text-white/[0.04]"
      />

      <div className="container-page relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="why-title"
            eyebrow="Why Choose A-Zee Dental?"
            title="Your Comfort Comes First."
            description="We believe great dentistry starts with trust: honest advice, gentle care and a space that puts you at ease."
            align="left"
            inverted
          />
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 0.1}
              className={`group rounded-[1.75rem] bg-white/[0.05] p-7 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-500 ease-premium hover:-translate-y-1 hover:bg-white/[0.09] hover:ring-accent/40 ${
                i % 2 === 1 ? "sm:translate-y-10 sm:hover:translate-y-9" : ""
              }`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#0A97A6] text-white shadow-glow transition-transform duration-500 ease-premium group-hover:-rotate-6 group-hover:scale-105">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-bold">{title}</h3>
              <p className="mt-2.5 text-[0.93rem] leading-relaxed text-white/65">{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
