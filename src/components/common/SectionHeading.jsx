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

export default function SectionHeading({ eyebrow, title, description, align = "center", inverted = false, id }) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col gap-4 ${centered ? "mx-auto max-w-2xl items-center text-center" : "max-w-xl items-start"}`}>
      {eyebrow && (
        <Reveal y={16}>
          <Eyebrow inverted={inverted}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <SplitReveal
        as="h2"
        id={id}
        className={`text-balance text-[1.75rem] font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.85rem] ${
          inverted ? "text-white" : "text-secondary"
        }`}
      >
        {title}
      </SplitReveal>
      {description && (
        <SplitReveal
          as="p"
          mode="lines"
          delay={0.2}
          className={`text-base leading-relaxed sm:text-lg ${inverted ? "text-white/70" : "text-muted"}`}
        >
          {description}
        </SplitReveal>
      )}
    </div>
  );
}
