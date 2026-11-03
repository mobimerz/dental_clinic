import { ArrowRight } from "lucide-react";

const variants = {
  primary:
    "bg-primary text-white shadow-glow hover:bg-primary-dark hover:shadow-[0_14px_34px_-10px_rgb(8_127_140/0.65)]",
  secondary: "bg-white text-secondary ring-1 ring-line shadow-soft hover:ring-accent hover:text-primary",
  dark: "bg-secondary text-white hover:bg-[#0e4252]",
  light: "bg-white text-secondary hover:bg-soft",
  ghost: "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/20",
};

// Anchor-styled button. Renders a <button> when no href is given.
export default function Button({
  href,
  children,
  variant = "primary",
  icon: Icon,
  arrow = false,
  className = "",
  external = false,
  ...rest
}) {
  const classes = `group/btn relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold transition-all duration-300 ease-premium hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${className}`;

  const content = (
    <>
      {Icon && <Icon className="h-[18px] w-[18px]" aria-hidden="true" />}
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-premium group-hover/btn:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (!href) {
    return (
      <button type="button" className={classes} {...rest}>
        {content}
      </button>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
