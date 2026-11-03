"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, MessageSquareText, Phone, X } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { clinic, whatsappLink } from "@/data/clinic";

const actions = [
  {
    label: "WhatsApp",
    href: whatsappLink(),
    external: true,
    icon: WhatsAppIcon,
    className: "bg-[#1FAF5A] text-white hover:bg-[#178F49]",
  },
  {
    label: "Call Now",
    href: clinic.phone.tel,
    icon: Phone,
    className: "bg-secondary text-white hover:bg-[#0e4252]",
  },
  {
    label: "Book Appointment",
    href: "#appointment",
    icon: CalendarCheck,
    className: "bg-white text-primary ring-1 ring-line hover:bg-soft",
  },
];

export default function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [nearForm, setNearForm] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Step out of the way while the appointment form is on screen
  useEffect(() => {
    const target = document.getElementById("appointment-form");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setNearForm(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (nearForm) setOpen(false);
  }, [nearForm]);

  const show = visible && !nearForm;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
        >
          <AnimatePresence>
            {open && (
              <motion.ul
                id="quick-contact"
                className="flex flex-col items-end gap-2.5"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{ show: { transition: { staggerChildren: 0.06, staggerDirection: -1 } }, hidden: {} }}
              >
                {actions.map(({ label, href, external, icon: Icon, className }) => (
                  <motion.li
                    key={label}
                    variants={{
                      hidden: { opacity: 0, y: 12, scale: 0.9 },
                      show: { opacity: 1, y: 0, scale: 1 },
                    }}
                  >
                    <a
                      href={href}
                      onClick={() => setOpen(false)}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`flex items-center gap-2.5 rounded-full py-2.5 pl-4 pr-2.5 text-sm font-semibold shadow-lift transition-all duration-300 hover:-translate-x-1 ${className}`}
                    >
                      {label}
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="quick-contact"
            aria-label={open ? "Close quick contact options" : "Open quick contact options"}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-glow transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            {!open && <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-primary/40 [animation-duration:2.4s]" />}
            <motion.span
              key={open ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="relative"
            >
              {open ? <X className="h-6 w-6" /> : <MessageSquareText className="h-6 w-6" />}
            </motion.span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
