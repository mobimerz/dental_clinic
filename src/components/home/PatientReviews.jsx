"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Quote, Star } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";
import StarRating from "@/components/common/StarRating";
import Counter from "@/components/common/Counter";
import Tilt from "@/components/common/Tilt";
import { clinic } from "@/data/clinic";
import { reviews } from "@/data/reviews";

function RatingSummary({ rating, count, live }) {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-secondary p-8 text-white sm:p-10">
      <span
        aria-hidden="true"
        className="anim-orb absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/40 blur-2xl"
        style={{ animationDuration: "10s", "--ox": "-20px", "--oy": "20px" }}
      />
      <div className="relative">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Google Rating</p>
        <p className="mt-4 flex items-end gap-2">
          <span className="text-7xl font-extrabold leading-none tracking-tight">
            <Counter value={rating} decimals={1} />
          </span>
          <span className="pb-2 text-lg font-medium text-white/60">/ {clinic.rating.outOf}</span>
        </p>
        <StarRating value={rating} size="h-6 w-6" className="mt-4" />
        <p className="mt-4 text-white/70">
          Based on <strong className="font-semibold text-white">{count} reviews</strong> on our Google
          Business Profile.
        </p>
      </div>
      <div className="relative mt-10 flex flex-col gap-3">
        <Button href={clinic.links.googleProfile} external variant="light" icon={ExternalLink}>
          Read More Google Reviews
        </Button>
        <p className="text-center text-xs text-white/50">
          {live ? "Live rating and reviews from Google." : `Rating as listed on Google, ${clinic.rating.checkedOn}.`}
        </p>
      </div>
    </div>
  );
}

const AUTOPLAY_MS = 6500;
const ease = [0.22, 1, 0.36, 1];

// Each review card swings in like the next card of a deck, its words rise in sequence
// and the stars pop one by one. Swipe on touch, arrows/dots everywhere, autoplay with
// a progress bar that pauses on hover.
const cardMotion = {
  enter: (dir) => ({ opacity: 0, x: dir >= 0 ? 90 : -90, rotateY: dir >= 0 ? -28 : 28, scale: 0.92 }),
  center: { opacity: 1, x: 0, rotateY: 0, scale: 1, transition: { duration: 0.75, ease } },
  exit: (dir) => ({
    opacity: 0,
    x: dir >= 0 ? -90 : 90,
    rotateY: dir >= 0 ? 22 : -22,
    scale: 0.9,
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
  }),
};

function ReviewCarousel({ items }) {
  const [[index, direction], setState] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const paginate = useCallback(
    (dir) => setState(([i]) => [(i + dir + items.length) % items.length, dir]),
    [items.length]
  );

  // Autoplay is driven by the progress bar itself, so pausing on hover keeps them in sync.
  // No autoplay for visitors who prefer reduced motion.
  const reduce = useReducedMotion();
  const autoplay = items.length > 1 && !reduce;

  const review = items[index];
  const words = review.text.split(" ");

  return (
    <div
      className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-8 shadow-lift ring-1 ring-line sm:p-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Patient reviews from Google"
    >
      <span
        aria-hidden="true"
        className="anim-sway absolute -right-6 -top-6"
        style={{ "--from": "12deg", "--to": "22deg", "--s": 1.08 }}
      >
        <Quote className="h-36 w-36 text-soft" />
      </span>

      <div className="relative flex items-center justify-between">
        <motion.span
          key={`q${index}`}
          initial={{ scale: 0.4, rotate: -30, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-glow"
        >
          <Quote className="h-6 w-6" aria-hidden="true" />
        </motion.span>
        <span className="text-sm font-semibold tabular-nums text-muted">
          <span className="text-secondary">{String(index + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
        </span>
      </div>

      {/* Deck: two ghost cards peek out behind the active review */}
      <div className="relative mt-6 min-h-[230px] [perspective:1200px]">
        <span aria-hidden="true" className="absolute inset-x-6 -bottom-3 top-4 rotate-[1.5deg] rounded-3xl bg-soft ring-1 ring-line" />
        <span aria-hidden="true" className="absolute inset-x-3 -bottom-1.5 top-2 -rotate-1 rounded-3xl bg-white ring-1 ring-line" />

        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.figure
            key={index}
            custom={direction}
            variants={cardMotion}
            initial="enter"
            animate="center"
            exit="exit"
            drag={items.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.35}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70 || info.velocity.x < -400) paginate(1);
              else if (info.offset.x > 70 || info.velocity.x > 400) paginate(-1);
            }}
            className="relative cursor-grab rounded-3xl bg-white p-6 ring-1 ring-line active:cursor-grabbing sm:p-7"
            aria-live="polite"
          >
            <span className="flex gap-0.5" role="img" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 14, delay: 0.25 + i * 0.07 }}
                >
                  <Star className={`h-4 w-4 ${i < review.rating ? "text-star" : "text-star/30"}`} fill="currentColor" strokeWidth={0} />
                </motion.span>
              ))}
            </span>
            <blockquote className="mt-4 text-lg leading-relaxed text-secondary sm:text-xl">
              <span className="sr-only">{review.text}</span>
              <span aria-hidden="true">
                “
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block whitespace-pre"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease, delay: 0.2 + Math.min(i, 40) * 0.018 }}
                  >
                    {word}{i < words.length - 1 ? " " : ""}
                  </motion.span>
                ))}
                ”
              </span>
              {review.truncated && review.url && (
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 whitespace-nowrap text-sm font-semibold text-primary hover:underline"
                >
                  Read full review
                </a>
              )}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.45 }}
                className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-[#0A97A6] font-bold text-white"
              >
                {review.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={review.photo} alt="" referrerPolicy="no-referrer" loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  review.name.charAt(0)
                )}
              </motion.span>
              <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.55, ease }}>
                {review.profileUrl ? (
                  <a
                    href={review.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-semibold text-secondary transition-colors hover:text-primary"
                  >
                    {review.name}
                  </a>
                ) : (
                  <span className="block font-semibold text-secondary">{review.name}</span>
                )}
                <span className="block text-sm text-muted">Google review{review.date ? ` · ${review.date}` : ""}</span>
              </motion.span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="relative mt-8 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setState([i, i > index ? 1 : -1])}
              aria-label={`Show review ${i + 1}`}
              aria-current={i === index}
              className={`relative h-2 overflow-hidden rounded-full transition-all duration-500 ${i === index ? "w-10 bg-accent/60" : "w-2 bg-line hover:bg-accent"}`}
            >
              {/* Autoplay progress fills the active dot */}
              {i === index && autoplay && (
                <span
                  key={index}
                  onAnimationEnd={() => paginate(1)}
                  className="absolute inset-y-0 left-0 w-full origin-left bg-primary"
                  style={{
                    animation: `review-progress ${AUTOPLAY_MS}ms linear forwards`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.88 }}
            onClick={() => paginate(-1)}
            aria-label="Previous review"
            className="group flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-line transition hover:bg-primary hover:text-white hover:ring-primary"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.88 }}
            onClick={() => paginate(1)}
            aria-label="Next review"
            className="group flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-line transition hover:bg-primary hover:text-white hover:ring-primary"
          >
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Shown while there are no live Google reviews and none in data/reviews.js.
function ReviewsCallout() {
  return (
    <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-[2rem] bg-white p-8 shadow-lift ring-1 ring-line sm:p-12">
      <span
        aria-hidden="true"
        className="anim-sway absolute -right-4 -top-4"
        style={{ "--from": "12deg", "--to": "22deg", "--s": 1.08 }}
      >
        <Quote className="h-40 w-40 text-soft" />
      </span>
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

// `google` is the live Google Business Profile data fetched on the server (null when not configured).
export default function PatientReviews({ google = null }) {
  const items = google?.reviews?.length ? google.reviews : reviews;
  const rating = google?.rating ?? clinic.rating.value;
  const count = google?.count ?? clinic.rating.count;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative overflow-hidden bg-soft py-24 sm:py-28 lg:py-32">
      <div aria-hidden="true" data-speed="0.2" className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container-page relative">
        <SectionHeading
          id="reviews-title"
          eyebrow="Patient Reviews"
          title="What Our Patients Say."
          description={`Rated ${rating} out of ${clinic.rating.outOf} across ${count} reviews on Google.`}
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal variant="tilt">
            <Tilt max={6} radius="rounded-[2rem]" shadow={false} className="h-full">
              <RatingSummary rating={rating} count={count} live={!!google} />
            </Tilt>
          </Reveal>
          <Reveal delay={0.12} variant="tilt">
            <Tilt max={4} scale={1.01} radius="rounded-[2rem]" shadow={false} className="h-full">
              {items.length > 0 ? <ReviewCarousel items={items} /> : <ReviewsCallout />}
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
