"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Phone, X } from "lucide-react";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import { clinic, navLinks, whatsappLink } from "@/data/clinic";
import { getLenis } from "@/lib/lenis";

const ease = [0.22, 1, 0.36, 1];

// Three bars that fold into an X.
function MenuIcon({ open }) {
  const bar = "absolute left-1/2 h-[2px] w-[18px] -translate-x-1/2 rounded-full bg-current";
  return (
    <span aria-hidden="true" className="relative block h-5 w-5">
      <motion.span className={`${bar} top-[4px]`} animate={open ? { y: 5.5, rotate: 45 } : { y: 0, rotate: 0 }} transition={{ duration: 0.45, ease }} />
      <motion.span className={`${bar} top-[9.5px]`} animate={open ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }} transition={{ duration: 0.3, ease }} />
      <motion.span className={`${bar} top-[15px]`} animate={open ? { y: -5.5, rotate: -45 } : { y: 0, rotate: 0 }} transition={{ duration: 0.45, ease }} />
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [hovered, setHovered] = useState(null);
  const lastY = useRef(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // The active link is only known on the client: the prerendered HTML can be built without the route,
  // so highlighting during hydration produced a mismatch (React error #418) and a full client re-render.
  // Waiting for mount keeps the first client render identical to the server HTML.
  const active = mounted ? pathname : null;
  // A section link stays highlighted on its sub-pages too (Blog on /blog/<article>).
  const isCurrent = (href) =>
    active != null && (href === "/" ? active === "/" : active === href || active.startsWith(`${href}/`));

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Tuck the header away while scrolling down, bring it back on any upward scroll
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 320);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      animate={{ y: hidden && !open ? "-110%" : "0%" }}
      transition={{ duration: 0.55, ease }}
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-premium ${
        scrolled
          ? "bg-white/85 shadow-[0_1px_0_rgb(11_52_64/0.06),0_10px_30px_-18px_rgb(11_52_64/0.25)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className={`container-page flex items-center justify-between transition-all duration-500 ${scrolled ? "h-[72px]" : "h-20"}`}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease }}>
          <Logo />
        </motion.div>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1" onMouseLeave={() => setHovered(null)}>
            {navLinks.map((link, i) => {
              const isActive = isCurrent(link.href);
              return (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onMouseEnter={() => setHovered(link.href)}
                    className={`relative block whitespace-nowrap rounded-full px-3 py-2 text-[0.92rem] xl:px-4 font-medium transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-ink/80 hover:text-primary"
                    }`}
                  >
                    {hovered === link.href && !isActive && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 -z-10 rounded-full bg-secondary/[0.05]"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-soft ring-1 ring-accent/60"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="flex items-center gap-2"
        >
          <div className="hidden sm:block">
            <Button href={whatsappLink()} external icon={CalendarCheck} className="!px-5 !py-3">
              Book Appointment
            </Button>
          </div>
          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            whileTap={{ scale: 0.88 }}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full shadow-soft ring-1 transition-colors duration-300 lg:hidden ${
              open ? "bg-primary text-white ring-primary" : "bg-white text-secondary ring-line hover:text-primary"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <MenuIcon open={open} />
          </motion.button>
        </motion.div>
      </div>

      {/* Portalled to <body>: the header itself is transformed (hide-on-scroll), which would
          otherwise trap a position:fixed drawer inside it. */}
      {mounted && createPortal(<MobileDrawer open={open} isCurrent={isCurrent} onClose={() => setOpen(false)} />, document.body)}
    </motion.header>
  );
}

// Off-canvas menu that slides in from the right over the page. Only transform and opacity
// animate (GPU-composited), so it opens instantly on phones and never pushes content.
function MobileDrawer({ open, isCurrent, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (open) closeRef.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-secondary/45"
          />
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            role="dialog"
            aria-modal="true"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease }}
            className="absolute inset-y-0 right-0 flex h-dvh w-[min(85vw,360px)] flex-col overflow-y-auto bg-white shadow-[-20px_0_60px_-20px_rgb(11_52_64/0.35)] will-change-transform"
          >
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-line px-5">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Menu</span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-soft active:scale-90"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <ul className="flex flex-col gap-1 px-3 py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.06 + 0.03 * i, ease }}
                >
                  <Link
                    href={link.href}
                    aria-current={isCurrent(link.href) ? "page" : undefined}
                    onClick={onClose}
                    className={`block rounded-2xl px-4 py-3.5 text-lg font-semibold transition-colors duration-200 active:bg-soft ${
                      isCurrent(link.href) ? "bg-soft text-primary" : "text-secondary hover:bg-soft"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto grid gap-3 border-t border-line p-5">
              <Button href={whatsappLink()} external icon={CalendarCheck} onClick={onClose} className="w-full">
                Book Appointment
              </Button>
              <Button href={clinic.phone.tel} variant="secondary" icon={Phone} className="w-full">
                Call Now
              </Button>
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
