import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Magnetic from "./Magnetic";

const variants = {
  primary:
    "bg-primary text-white shadow-glow hover:bg-primary-dark hover:shadow-[0_14px_34px_-10px_rgb(8_127_140/0.65)]",
  secondary: "bg-white text-secondary ring-1 ring-line shadow-soft hover:ring-accent hover:text-primary",
  dark: "bg-secondary text-white hover:bg-[#0e4252]",
  light: "bg-white text-secondary hover:bg-soft",
  ghost: "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/20",
};

// Light variants get a teal shine, dark ones a white shine.
const shine = {
  primary: "via-white/45",
  secondary: "via-accent/70",
  dark: "via-white/30",
  light: "via-accent/70",
  ghost: "via-white/35",
};

// Magnetic, anchor-styled button. Renders a <button> when no href is given.
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
  const classes = `group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-[0.95rem] font-semibold transition-all duration-300 ease-premium hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${variants[variant]} ${className}`;

  const content = (
    <>
      {/* Light sweep on hover */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]">
        <span
          className={`absolute inset-y-0 -left-3/4 w-1/2 -skew-x-[20deg] bg-gradient-to-r from-transparent ${shine[variant]} to-transparent transition-[left] duration-[900ms] ease-premium group-hover/btn:left-[130%]`}
        />
      </span>
      {Icon && (
        <Icon
          className="relative h-[18px] w-[18px] transition-transform duration-500 ease-premium group-hover/btn:-rotate-12 group-hover/btn:scale-110"
          aria-hidden="true"
        />
      )}
      {/* Text roll: the label slides up and a copy slides in from below */}
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-premium group-hover/btn:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-premium group-hover/btn:translate-y-0"
        >
          {children}
        </span>
      </span>
      {arrow && (
        <ArrowRight
          className="relative h-4 w-4 transition-transform duration-300 ease-premium group-hover/btn:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  const element = !href ? (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  ) : href.startsWith("/") ? (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  ) : (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {content}
    </a>
  );

  return <Magnetic>{element}</Magnetic>;
}
