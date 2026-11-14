import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

export function Eyebrow({ children, inverted = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] ${
        inverted ? "bg-white/10 text-accent ring-1 ring-white/15" : "bg-soft text-primary ring-1 ring-accent/70"
      }`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          aria-hidden="true"
          className={`absolute inset-0 animate-ping rounded-full [animation-duration:2.2s] ${inverted ? "bg-accent" : "bg-primary"}`}
        />
        <span className={`relative h-1.5 w-1.5 rounded-full ${inverted ? "bg-accent" : "bg-primary"}`} />
      </span>
      {children}
    </span>
  );
}

// The one section header used by every section. Rhythm copies the Home hero:
// eyebrow → title 24px, title → description 28px. Follow it with `header-gap` on the content below.
// Alignment rule: centred when a full-width grid follows; left when the header sits in a column
// of a two-column layout.
//   eyebrowY / descriptionMode / descriptionDelay keep each section's original entrance motion.
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  inverted = false,
  id,
  eyebrowY = 16,
  descriptionMode = "lines",
  descriptionDelay = 0.2,
  className = "",
  children,
}) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col ${centered ? "mx-auto max-w-2xl items-center text-center" : "max-w-xl items-start"} ${className}`}>
      {eyebrow && (
        <Reveal y={eyebrowY}>
          <Eyebrow inverted={inverted}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <SplitReveal
        as="h2"
        id={id}
        className={`text-balance text-h2 ${eyebrow ? "mt-6" : ""} ${inverted ? "text-white" : "text-secondary"}`}
      >
        {title}
      </SplitReveal>
      {description && (
        <SplitReveal
          as="p"
          mode={descriptionMode}
          delay={descriptionDelay}
          className={`mt-7 text-lead ${inverted ? "text-white/70" : "text-muted"}`}
        >
          {description}
        </SplitReveal>
      )}
      {children}
    </div>
  );
}
