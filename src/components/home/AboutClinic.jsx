"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CircleCheck } from "lucide-react";
import Reveal from "@/components/common/Reveal";
import Button from "@/components/common/Button";
import SectionHeading from "@/components/common/SectionHeading";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import TwoColumn from "@/components/ui/TwoColumn";
import { photo, photoFrame, photoMaskRadius } from "@/components/ui/styles";
import { FloatingTooth, Sparkle } from "@/components/common/FloatingShapes";
import { clinicImages } from "@/data/clinic";

const points = [
  "Routine check-ups & preventive care",
  "Advanced restorative & implant treatments",
  "A welcoming, comfortable environment",
  "Care planned around your needs",
];

const ease = [0.22, 1, 0.36, 1];

export default function AboutClinic() {
  const main = clinicImages.reception;
  const inset = clinicImages.treatmentRoom;

  return (
    <Section id="about" aria-labelledby="about-title" className="overflow-hidden">
      <Container>
        <TwoColumn layout="media" reverse>
          {/* Images: main photo in the hero's frame, inset photo hanging off its corner */}
          <div className="relative mx-auto w-full max-w-[460px] pb-12 pr-12 lg:max-w-none">
            {/* The observer sits on an unclipped wrapper: a fully clipped target never reports as in view */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              <motion.div
                variants={{
                  hidden: { clipPath: `inset(0% 100% 0% 0% round ${photoMaskRadius})` },
                  show: { clipPath: `inset(0% 0% 0% 0% round ${photoMaskRadius})`, transition: { duration: 1.2, ease } },
                }}
                className={`${photo} ${photoFrame}`}
              >
                <motion.div
                  variants={{ hidden: { scale: 1.35 }, show: { scale: 1, transition: { duration: 1.8, ease } } }}
                  className="absolute inset-x-0 -inset-y-[10%]"
                  data-speed="-0.15"
                >
                  <Image
                    src={main.src}
                    alt={main.alt}
                    fill
                    sizes="(min-width: 1024px) 380px, 88vw"
                    className="object-cover transition-transform duration-[1.6s] ease-premium hover:scale-105"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60, rotate: 6, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, delay: 0.35, ease }}
              data-speed="0.3"
              className="absolute bottom-0 right-0 w-[44%] overflow-hidden rounded-[2rem] border-[6px] border-white shadow-lift"
            >
              <div className="relative aspect-[3/4]">
                <Image src={inset.src} alt={inset.alt} fill sizes="(min-width: 1024px) 200px, 40vw" className="object-cover" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: -30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              whileHover={{ scale: 1.06 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              data-speed="-0.25"
              className="absolute -left-3 top-8 rounded-2xl bg-white px-4 py-3 shadow-lift ring-1 ring-line sm:-left-8"
            >
              <p className="text-xs font-medium text-muted">Located in</p>
              <p className="text-sm font-bold text-secondary">Pai Layout, Bengaluru</p>
            </motion.div>

            <div aria-hidden="true" className="bg-dots absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-3xl" />
            <FloatingTooth className="right-2 top-0 text-accent" size="h-10 w-10" speed={0.5} />
            <Sparkle className="bottom-24 left-1/2 h-5 w-5 text-primary/60" delay={0.8} />
          </div>

          {/* Copy */}
          <div className="flex flex-col items-start">
            <SectionHeading
              id="about-title"
              align="left"
              eyebrow="About the Clinic"
              eyebrowY={28}
              title={
                <>
                  Care That Makes You <span className="text-primary">Smile.</span>
                </>
              }
              description="At A-Zee Dental & Implant Centre, we focus on providing personalized dental care in a welcoming and comfortable environment. From routine check-ups to advanced dental treatments, our approach is centered around your oral health and confidence."
              descriptionMode="scrub"
              descriptionDelay={0}
            />

            <ul className="mt-8 grid w-full gap-3 sm:grid-cols-2">
              {points.map((point, i) => (
                <Reveal as="li" key={point} delay={0.15 + i * 0.09} y={16} variant="tilt">
                  <span className="group flex h-full items-start gap-3 rounded-2xl bg-soft p-4 text-small font-medium text-secondary ring-1 ring-accent/50 transition-all duration-500 ease-premium hover:-translate-y-1 hover:bg-white hover:shadow-lift hover:ring-accent">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform duration-500 ease-premium group-hover:rotate-[360deg] group-hover:scale-125" aria-hidden="true" />
                    {point}
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.4} className="mt-8">
              <Button href="/about" variant="fill">
                Learn More About Our Care
              </Button>
            </Reveal>
          </div>
        </TwoColumn>
      </Container>
    </Section>
  );
}
