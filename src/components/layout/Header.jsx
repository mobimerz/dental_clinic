"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Phone } from "lucide-react";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import { clinic, navLinks } from "@/data/clinic";
import { getLenis } from "@/lib/lenis";

const ease = [0.22, 1, 0.36, 1];

// Three bars that fold into an X.
function MenuIcon({ open }) {
  const bar = "absolute left-1/2 h-[2px] w-[18px] -translate-x-1/2 rounded-full bg-current";
  return (
    <span aria-hidden="true" className="relative block h-5 w-5">
      <motion.span className={bar} style={{ top: 4 }} animate={open ? { y: 5.5, rotate: 45 } : { y: 0, rotate: 0 }} transition={{ duration: 0.45, ease }} />
      <motion.span className={bar} style={{ top: 9.5 }} animate={open ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }} transition={{ duration: 0.3, ease }} />
      <motion.span className={bar} style={{ top: 15 }} animate={open ? { y: -5.5, rotate: -45 } : { y: 0, rotate: 0 }} transition={{ duration: 0.45, ease }} />
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [hovered, setHovered] = useState(null);
  const lastY = useRef(0);

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

  // Highlight the nav link for the section currently in view
  useEffect(() => {
    // Observe every section so links un-highlight over sections that aren't in the nav
    const sections = document.querySelectorAll("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
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
        scrolled || open
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
              const isActive = active === link.href;
              return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease }}
                >
                  <a
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    className={`relative block rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors duration-300 ${
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
                  </a>
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
          <a
            href={clinic.phone.tel}
            className="group hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-secondary transition-colors hover:text-primary xl:inline-flex"
          >
            <Phone className="h-4 w-4 text-primary group-hover:animate-[wiggle_0.6s_ease-in-out]" aria-hidden="true" />
            {clinic.phone.display}
          </a>
          <div className="hidden sm:block">
            <Button href="#appointment" icon={CalendarCheck} className="!px-5 !py-3">
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

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0, clipPath: "circle(0% at 92% 0%)" }}
            animate={{ height: "auto", opacity: 1, clipPath: "circle(150% at 92% 0%)" }}
            exit={{ height: 0, opacity: 0, clipPath: "circle(0% at 92% 0%)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-5">
              {navLinks.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%", rotate: 4, opacity: 0 }}
                    animate={{ y: "0%", rotate: 0, opacity: 1 }}
                    exit={{ y: "60%", opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.7, delay: 0.15 + 0.06 * i, ease }}
                    className="origin-left"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold transition-all duration-300 active:scale-[0.98] ${
                        active === link.href ? "bg-soft text-primary" : "text-secondary hover:bg-soft hover:pl-6"
                      }`}
                    >
                      {link.label}
                      <span aria-hidden="true" className="text-sm font-medium text-accent transition-transform duration-300 group-hover:translate-x-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </motion.div>
                </li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + navLinks.length * 0.06, ease }}
                className="mt-3 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2"
              >
                <Button href="#appointment" icon={CalendarCheck} onClick={() => setOpen(false)}>
                  Book Appointment
                </Button>
                <Button href={clinic.phone.tel} variant="secondary" icon={Phone}>
                  Call Now
                </Button>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
