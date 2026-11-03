"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleCheck, MessageCircle, Phone, RotateCcw, Send } from "lucide-react";
import { clinic, whatsappLink } from "@/data/clinic";
import { treatments } from "@/data/treatments";
import { SELECT_TREATMENT_EVENT } from "@/lib/booking";

const OTHER = "Not sure / General consultation";
const treatmentOptions = [...treatments.map((t) => t.title), OTHER];

const empty = { name: "", phone: "", date: "", treatment: "", message: "" };

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

// Accepts 10-digit Indian mobile numbers, with optional +91 / 91 / 0 prefix.
const normalisePhone = (value) => {
  const digits = value.replace(/[^\d]/g, "");
  const local = digits.replace(/^(91|0)(?=\d{10}$)/, "");
  return /^[6-9]\d{9}$/.test(local) ? local : null;
};

function validate(values) {
  const errors = {};
  const name = values.name.trim();
  if (!name) errors.name = "Please enter the patient's name.";
  else if (name.length < 2 || !/^[\p{L} .'-]+$/u.test(name)) errors.name = "Please enter a valid name.";

  if (!values.phone.trim()) errors.phone = "Please enter a phone number.";
  else if (!normalisePhone(values.phone)) errors.phone = "Enter a valid 10-digit mobile number.";

  if (!values.date) errors.date = "Please choose a preferred date.";
  else if (values.date < todayISO()) errors.date = "Please choose today or a future date.";

  if (!values.treatment) errors.treatment = "Please select a treatment.";
  if (values.message.length > 500) errors.message = "Please keep your message under 500 characters.";
  return errors;
}

function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function buildMessage(v) {
  return [
    `Hello ${clinic.shortName}, I would like to request an appointment.`,
    "",
    `Name: ${v.name.trim()}`,
    `Phone: +91 ${normalisePhone(v.phone)}`,
    `Preferred date: ${formatDate(v.date)}`,
    `Treatment: ${v.treatment}`,
    v.message.trim() ? `Message: ${v.message.trim()}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function Field({ id, label, error, optional, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-secondary">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[0.8rem] font-medium text-[#C2410C]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass = (hasError) =>
  `w-full rounded-2xl border bg-soft/60 px-4 py-3.5 text-[0.95rem] text-ink placeholder:text-muted/70 outline-none transition-all duration-300 focus:bg-white focus:ring-4 ${
    hasError ? "border-[#EA580C]/60 focus:border-[#EA580C] focus:ring-[#EA580C]/10" : "border-line focus:border-primary focus:ring-primary/10"
  }`;

export default function AppointmentForm() {
  const uid = useId();
  const nameRef = useRef(null);
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const [minDate, setMinDate] = useState("");

  useEffect(() => setMinDate(todayISO()), []);

  // Pre-select a treatment when a "Learn More" link is used elsewhere on the page
  useEffect(() => {
    const onSelect = (e) => {
      setSubmitted(null);
      setValues((v) => ({ ...v, treatment: treatmentOptions.includes(e.detail) ? e.detail : v.treatment }));
    };
    window.addEventListener(SELECT_TREATMENT_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_TREATMENT_EVENT, onSelect);
  }, []);

  const update = (field) => (e) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, phone: true, date: true, treatment: true, message: true });
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    const link = whatsappLink(buildMessage(values));
    window.open(link, "_blank", "noopener,noreferrer");
    setSubmitted({ name: values.name.trim().split(" ")[0], link });
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setTouched({});
    setSubmitted(null);
    setTimeout(() => nameRef.current?.focus(), 50);
  };

  const describedBy = (field) => (errors[field] && touched[field] ? `${uid}-${field}-error` : undefined);
  const showError = (field) => (touched[field] ? errors[field] : undefined);

  return (
    <div id="appointment-form" className="relative rounded-[2rem] bg-white p-6 shadow-lift ring-1 ring-line sm:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="flex min-h-[460px] flex-col items-center justify-center text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-soft text-primary ring-8 ring-soft/60"
            >
              <CircleCheck className="h-8 w-8" aria-hidden="true" />
            </motion.span>
            <h3 className="mt-6 text-2xl font-bold text-secondary">Thank you, {submitted.name}!</h3>
            <p className="mt-3 max-w-sm leading-relaxed text-muted">
              Your enquiry is ready in WhatsApp. Please press <strong className="text-secondary">send</strong> there.
              Our team will get back to you to confirm an available time.
            </p>
            <p className="mt-3 max-w-sm text-xs text-muted">
              Your appointment is confirmed only once the clinic contacts you.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={submitted.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1FAF5A] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#178F49]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Open WhatsApp again
              </a>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-secondary ring-1 ring-line transition hover:text-primary hover:ring-accent"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" /> New enquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-labelledby={`${uid}-title`}
          >
            <h3 id={`${uid}-title`} className="text-xl font-bold text-secondary sm:text-2xl">
              Request an Appointment
            </h3>
            <p className="mt-1.5 text-sm text-muted">Share a few details and we&apos;ll get back to you to confirm.</p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field id={`${uid}-name`} label="Patient Name" error={showError("name")}>
                <input
                  ref={nameRef}
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Full name"
                  value={values.name}
                  onChange={update("name")}
                  onBlur={blur("name")}
                  aria-invalid={!!showError("name")}
                  aria-describedby={describedBy("name")}
                  className={inputClass(showError("name"))}
                />
              </Field>
              <Field id={`${uid}-phone`} label="Phone Number" error={showError("phone")}>
                <input
                  id={`${uid}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="98765 43210"
                  value={values.phone}
                  onChange={update("phone")}
                  onBlur={blur("phone")}
                  aria-invalid={!!showError("phone")}
                  aria-describedby={describedBy("phone")}
                  className={inputClass(showError("phone"))}
                />
              </Field>
              <Field id={`${uid}-date`} label="Preferred Date" error={showError("date")}>
                <input
                  id={`${uid}-date`}
                  name="date"
                  type="date"
                  min={minDate || undefined}
                  value={values.date}
                  onChange={update("date")}
                  onBlur={blur("date")}
                  aria-invalid={!!showError("date")}
                  aria-describedby={describedBy("date")}
                  className={`${inputClass(showError("date"))} min-h-[52px]`}
                />
              </Field>
              <Field id={`${uid}-treatment`} label="Treatment of Interest" error={showError("treatment")}>
                <select
                  id={`${uid}-treatment`}
                  name="treatment"
                  value={values.treatment}
                  onChange={update("treatment")}
                  onBlur={blur("treatment")}
                  aria-invalid={!!showError("treatment")}
                  aria-describedby={describedBy("treatment")}
                  className={`${inputClass(showError("treatment"))} min-h-[52px] appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23087F8C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10 ${
                    values.treatment ? "" : "text-muted/80"
                  }`}
                >
                  <option value="" disabled>
                    Select a treatment
                  </option>
                  {treatmentOptions.map((t) => (
                    <option key={t} value={t} className="text-ink">
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field id={`${uid}-message`} label="Message" optional error={showError("message")}>
                  <textarea
                    id={`${uid}-message`}
                    name="message"
                    rows={3}
                    maxLength={600}
                    placeholder="Tell us briefly about your concern or a preferred time of day"
                    value={values.message}
                    onChange={update("message")}
                    onBlur={blur("message")}
                    aria-invalid={!!showError("message")}
                    aria-describedby={describedBy("message")}
                    className={`${inputClass(showError("message"))} resize-none`}
                  />
                </Field>
              </div>
            </div>

            <button
              type="submit"
              className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-white shadow-glow transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              Send Enquiry via WhatsApp
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
            </button>
            <p className="mt-4 flex flex-wrap items-center justify-center gap-x-1.5 text-center text-xs text-muted">
              This sends an enquiry, not a confirmed booking. Prefer to talk?
              <a href={clinic.phone.tel} className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                <Phone className="h-3 w-3" aria-hidden="true" /> {clinic.phone.display}
              </a>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
