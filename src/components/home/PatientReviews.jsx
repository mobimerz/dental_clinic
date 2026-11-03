"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Quote } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";
import StarRating from "@/components/common/StarRating";
import Counter from "@/components/common/Counter";
import Tilt from "@/components/common/Tilt";
import { clinic } from "@/data/clinic";
import { reviews } from "@/data/reviews";

function RatingSummary() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-secondary p-8 text-white sm:p-10">
      <motion.span
        aria-hidden="true"
        animate={{ scale: [1, 1.3, 1], x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/40 blur-2xl"
      />
      <div className="relative">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Google Rating</p>
        <p className="mt-4 flex items-end gap-2">
          <span className="text-7xl font-extrabold leading-none tracking-tight">
            <Counter value={clinic.rating.value} decimals={1} />
          </span>
          <span className="pb-2 text-lg font-medium text-white/60">/ {clinic.rating.outOf}</span>
        </p>
        <StarRating value={clinic.rating.value} size="h-6 w-6" className="mt-4" />
        <p className="mt-4 text-white/70">
          Based on <strong className="font-semibold text-white">{clinic.rating.count} reviews</strong> on our Google
          Business Profile.
        </p>
      </div>
      <div className="relative mt-10 flex flex-col gap-3">
        <Button href={clinic.links.googleProfile} external variant="light" icon={ExternalLink}>
          Read More Google Reviews
        </Button>
        <p className="text-center text-xs text-white/50">Rating as listed on Google, {clinic.rating.checkedOn}.</p>
      </div>
    </div>
  );
}

function ReviewCarousel() {
  const [[index, direction], setState] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const paginate = useCallback(
    (dir) => setState(([i]) => [(i + dir + reviews.length) % reviews.length, dir]),
    []
  );

  useEffect(() => {
    if (paused || reviews.length < 2) return;
    const id = setInterval(() => paginate(1), 6500);
    return () => clearInterval(id);
  }, [paused, paginate]);

  const review = reviews[index];

  return (
    <div
      className="relative flex h-full flex-col justify-between rounded-[2rem] bg-white p-8 shadow-lift ring-1 ring-line sm:p-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Patient reviews from Google"
    >
      <Quote className="h-12 w-12 text-accent" aria-hidden="true" />
      <div className="relative mt-6 min-h-[200px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.figure
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            aria-live="polite"
          >
            <StarRating value={review.rating} />
            <blockquote className="mt-4 text-lg leading-relaxed text-secondary sm:text-xl">“{review.text}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-soft font-bold text-primary">
                {review.name.charAt(0)}
              </span>
              <span>
                <span className="block font-semibold text-secondary">{review.name}</span>
                <span className="block text-sm text-muted">Google review{review.date ? ` · ${review.date}` : ""}</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setState([i, i > index ? 1 : -1])}
              aria-label={`Show review ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-primary" : "w-2 bg-line hover:bg-accent"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous review"
            className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-line transition hover:bg-primary hover:text-white hover:ring-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next review"
            className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-line transition hover:bg-primary hover:text-white hover:ring-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Shown while no verified reviews have been added to data/reviews.js.
function ReviewsCallout() {
  return (
    <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-[2rem] bg-white p-8 shadow-lift ring-1 ring-line sm:p-12">
      <motion.span
        aria-hidden="true"
        className="absolute -right-4 -top-4"
        animate={{ rotate: [12, 22, 12], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Quote className="h-40 w-40 text-soft" />
      </motion.span>
      <div className="relative">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Real patients · Real feedback</p>
        <h3 className="mt-4 max-w-md text-balance text-2xl font-bold leading-snug text-secondary sm:text-3xl">
          Read what our patients have shared about their visits on Google.
        </h3>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          We believe the most honest reviews come straight from our patients. Browse every review on our Google Business
          Profile, or share your own experience after your visit.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={clinic.links.googleProfile} external arrow>
            Read Google Reviews
          </Button>
          <Button href={clinic.links.googleProfile} external variant="secondary">
            Share Your Experience
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PatientReviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative overflow-hidden bg-soft py-24 sm:py-28 lg:py-32">
      <div aria-hidden="true" data-speed="0.2" className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container-page relative">
        <SectionHeading
          id="reviews-title"
          eyebrow="Patient Reviews"
          title="What Our Patients Say."
          description={`Rated ${clinic.rating.value} out of ${clinic.rating.outOf} across ${clinic.rating.count} reviews on Google.`}
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal variant="tilt">
            <Tilt max={6} radius="rounded-[2rem]" shadow={false} className="h-full">
              <RatingSummary />
            </Tilt>
          </Reveal>
          <Reveal delay={0.12} variant="tilt">
            <Tilt max={4} scale={1.01} radius="rounded-[2rem]" shadow={false} className="h-full">
              {reviews.length > 0 ? <ReviewCarousel /> : <ReviewsCallout />}
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
