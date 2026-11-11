import Link from "next/link";
import { clinic } from "@/data/clinic";

export function LogoMark({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0A97A6" />
          <stop offset="1" stopColor="#087F8C" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#logo-grad)" />
      <path
        d="M24 12.6c-2.5-2-5.8-2.6-8.6-1.3-3.6 1.8-4.8 6.3-3.6 10.6.9 3 1.8 5.4 2.5 8.9.7 3.6 1.3 6.8 3.5 6.8 2.6 0 2.5-4.1 3.3-7.3.5-1.7 1.5-2.6 2.9-2.6s2.4.9 2.9 2.6c.8 3.2.7 7.3 3.3 7.3 2.2 0 2.8-3.2 3.5-6.8.7-3.5 1.6-5.9 2.5-8.9 1.2-4.3 0-8.8-3.6-10.6-2.8-1.3-6.1-.7-8.6 1.3z"
        fill="#fff"
      />
      <path d="M19.5 18.5c1.4 1.3 2.9 1.9 4.5 1.9s3.1-.6 4.5-1.9" fill="none" stroke="#087F8C" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ inverted = false }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${clinic.name} — home`}>
      <LogoMark className="h-10 w-10 shrink-0 transition-transform duration-500 ease-premium group-hover:-rotate-6" />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className={`text-[1.2rem] font-extrabold tracking-tight ${inverted ? "text-white" : "text-secondary"}`}>
          A-Zee <span className="text-primary">Dental</span>
        </span>
        <span className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${inverted ? "text-accent/80" : "text-muted"}`}>
          & Implant Centre
        </span>
      </span>
    </Link>
  );
}
