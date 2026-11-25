"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import Button from "@/components/common/Button";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { panel } from "@/components/ui/styles";
import { clinic } from "@/data/clinic";
import { treatments } from "@/data/treatments";
import { validateAppointment } from "@/lib/appointmentValidation";

const field =
  "w-full rounded-2xl bg-soft px-4 py-3.5 text-body text-ink ring-1 ring-line outline-none transition placeholder:text-muted/70 focus:bg-white focus:ring-2 focus:ring-primary aria-[invalid=true]:bg-red-50/60 aria-[invalid=true]:ring-red-400";
const label = "mb-2 block text-sm font-semibold text-secondary";

// Time slots per day, built from the clinic timings so the form never offers a closed session.
// Sunday has a single morning session; Monday–Saturday have a morning and an evening one.
const [weekdayHours, sundayHours] = clinic.hours;
const sessionNames = ["Morning", "Evening"];
const slotLabels = (slots) => slots.map((slot, i) => `${sessionNames[i]} (${slot})`);
const weekdaySlots = slotLabels(weekdayHours.slots);
const sundaySlots = slotLabels(sundayHours.slots);

// "YYYY-MM-DD" of a local date (toISOString would give yesterday's date before 5:30 AM in India).
function localISODate(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Weekday of a "YYYY-MM-DD" value, read as a local date (0 = Sunday).
function weekdayOf(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}

// Treatment dropdown: A–Z, with "Others" added last in the markup.
const treatmentOptions = treatments.map((t) => t.title).sort((a, b) => a.localeCompare(b, "en"));

// Loader icon that spins while the request is sending (passed to Button as its icon).
function Spinner({ className = "", ...props }) {
  return <Loader2 className={`${className} animate-spin`} {...props} />;
}

// Appointment request form. Posts to /api/appointment, which emails the clinic via Brevo.
export default function AppointmentForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // No date picked yet: show every session. A Sunday only offers the Sunday session.
  const timeSlots = date && weekdayOf(date) === 0 ? sundaySlots : weekdaySlots;

  function onDateChange(e) {
    const next = e.target.value;
    setDate(next);
    const slots = next && weekdayOf(next) === 0 ? sundaySlots : weekdaySlots;
    if (time && !slots.includes(time)) setTime("");
  }

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    // Check here first so mistakes show instantly; the server runs the same checks.
    const errors = validateAppointment(values);
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setError("");
      setStatus("idle");
      form.elements[Object.keys(errors)[0]]?.focus();
      return;
    }

    setStatus("sending");
    setError("");
    setFieldErrors({});
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFieldErrors(json.errors || {});
        throw new Error(json.error || "Something went wrong.");
      }
      form.reset();
      setDate("");
      setTime("");
      setStatus("sent");
    } catch (err) {
      setError(err.message || `Something went wrong. Please call ${clinic.phone.display}.`);
      setStatus("error");
    }
  }

  const today = localISODate();

  // After a field has shown an error, re-check it as the user edits so the message clears once fixed.
  function recheck(e) {
    const { name, value } = e.target;
    if (!fieldErrors[name]) return;
    const errs = validateAppointment({ name: "xx", phone: "9999999999", email: "", [name]: value });
    setFieldErrors((prev) => ({ ...prev, [name]: errs[name] }));
  }

  // Check a field when the user leaves it, but only once they've typed something.
  function checkOnBlur(e) {
    const { name, value } = e.target;
    if (!value.trim()) return;
    const errs = validateAppointment({ name: "xx", phone: "9999999999", email: "", [name]: value });
    setFieldErrors((prev) => ({ ...prev, [name]: errs[name] }));
  }

  return (
    <Section bg="soft" id="book" data-jump-show="book-form" aria-labelledby="book-heading">
      <Container>
        <SectionHeading
          id="book-heading"
          eyebrow="Book a Visit"
          title="Request an Appointment."
          description="Send us your details and preferred time. We'll call you to confirm."
        />

        <Reveal y={30}>
          <div id="book-form" className={`header-gap mx-auto max-w-3xl bg-white shadow-lift ring-1 ring-line ${panel}`}>
            {status === "sent" ? (
              <div role="status" className="flex flex-col items-center py-10 text-center">
                <CheckCircle2 className="h-14 w-14 text-primary" aria-hidden="true" />
                <h3 className="mt-6 text-h3-lg text-secondary">Request received</h3>
                <p className="mt-3 max-w-md text-muted">
                  Thank you. We'll call you shortly to confirm your appointment. Need us sooner? Call{" "}
                  <a href={clinic.phone.tel} className="font-semibold text-primary">
                    {clinic.phone.display}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
                {/* Honeypot for bots */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                <div>
                  <label htmlFor="ap-name" className={label}>Full name *</label>
                  <input id="ap-name" name="name" required autoComplete="name" maxLength={80} onChange={recheck} onBlur={checkOnBlur} className={field} aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? "ap-name-error" : undefined} />
                  {fieldErrors.name && <p id="ap-name-error" className="mt-1.5 text-sm text-red-600">{fieldErrors.name}</p>}
                </div>
                <div>
                  <label htmlFor="ap-phone" className={label}>Phone *</label>
                  <input id="ap-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" maxLength={20} placeholder="10-digit mobile number" onChange={recheck} onBlur={checkOnBlur} className={field} aria-invalid={!!fieldErrors.phone} aria-describedby={fieldErrors.phone ? "ap-phone-error" : undefined} />
                  {fieldErrors.phone && <p id="ap-phone-error" className="mt-1.5 text-sm text-red-600">{fieldErrors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="ap-email" className={label}>Email</label>
                  <input id="ap-email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={120} onChange={recheck} onBlur={checkOnBlur} className={field} aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? "ap-email-error" : undefined} />
                  {fieldErrors.email && <p id="ap-email-error" className="mt-1.5 text-sm text-red-600">{fieldErrors.email}</p>}
                </div>
                <div>
                  <label htmlFor="ap-treatment" className={label}>Treatment</label>
                  <select id="ap-treatment" name="treatment" defaultValue="" className={field}>
                    <option value="" disabled hidden>Select a treatment</option>
                    {treatmentOptions.map((title) => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="ap-date" className={label}>Preferred date</label>
                  <input id="ap-date" name="date" type="date" min={today} value={date} onChange={onDateChange} className={field} />
                </div>
                <div>
                  <label htmlFor="ap-time" className={label}>Preferred time</label>
                  <select id="ap-time" name="time" value={time} onChange={(e) => setTime(e.target.value)} className={field}>
                    <option value="">Any time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="ap-message" className={label}>Message</label>
                  <textarea id="ap-message" name="message" rows={4} maxLength={1000} placeholder="Tell us briefly about your concern (optional)" className={field} />
                </div>

                {status === "error" && (
                  <p role="alert" className="text-sm font-medium text-red-600 sm:col-span-2">{error}</p>
                )}

                {/* Full width on phones (the column stretches it), natural width from 640px */}
                <div className="flex flex-col sm:col-span-2 sm:flex-row">
                  <Button type="submit" disabled={status === "sending"} icon={status === "sending" ? Spinner : Send}>
                    {status === "sending" ? "Sending…" : "Request Appointment"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
