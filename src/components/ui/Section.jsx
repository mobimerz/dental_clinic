// One section wrapper for every page.
//   variant  – "default" (64 / 80 / 96px) | "compact" (40 / 48 / 56px) | "overlap" (pulls up into the banner above)
//   bg       – "white" | "soft" | "dark"; pages alternate white / soft so sections separate by surface, not by extra space
//   spaced   – overlap only: keeps the compact gap below when the next section has a different surface
// `ref` and any other props (id, aria-*) pass straight through to the <section>.
const variants = {
  default: "section-default",
  compact: "section-compact",
  overlap: "overlap-up",
};

const backgrounds = {
  white: "",
  soft: "bg-soft",
  dark: "bg-secondary text-white",
};

export default function Section({ variant = "default", bg = "white", spaced = false, className = "", children, ...rest }) {
  const classes = [
    "relative",
    variants[variant],
    backgrounds[bg],
    variant === "overlap" && spaced ? "overlap-spaced" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} {...rest}>
      {children}
    </section>
  );
}
