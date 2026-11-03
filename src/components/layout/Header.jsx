"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import { clinic, navLinks } from "@/data/clinic";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-premium ${
        scrolled || open
          ? "bg-white/85 shadow-[0_1px_0_rgb(11_52_64/0.06),0_10px_30px_-18px_rgb(11_52_64/0.25)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className={`container-page flex items-center justify-between transition-all duration-500 ${scrolled ? "h-[72px]" : "h-20"}`}>
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-ink/80 hover:text-primary"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-soft ring-1 ring-accent/60"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={clinic.phone.tel}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-secondary transition-colors hover:text-primary xl:inline-flex"
          >
            <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
            {clinic.phone.display}
          </a>
          <div className="hidden sm:block">
            <Button href="#appointment" icon={CalendarCheck} className="!px-5 !py-3">
              Book Appointment
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-secondary shadow-soft ring-1 ring-line transition hover:text-primary lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-5">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold transition-colors ${
                      active === link.href ? "bg-soft text-primary" : "text-secondary hover:bg-soft"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-3 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
                <Button href="#appointment" icon={CalendarCheck} onClick={() => setOpen(false)}>
                  Book Appointment
                </Button>
                <Button href={clinic.phone.tel} variant="secondary" icon={Phone}>
                  Call Now
                </Button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
