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

const field =
  "w-full rounded-2xl bg-soft px-4 py-3.5 text-body text-ink ring-1 ring-line outline-none transition placeholder:text-muted/70 focus:bg-white focus:ring-2 focus:ring-primary";
const label = "mb-2 block text-sm font-semibold text-secondary";

// Loader icon that spins while the request is sending (passed to Button as its icon).
function Spinner({ className = "", ...props }) {
  return <Loader2 className={`${className} animate-spin`} {...props} />;
}

// Appointment request form. Posts to /api/appointment, which emails the clinic via Brevo.
export default function AppointmentForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    setFieldErrors({});
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFieldErrors(json.errors || {});
        throw new Error(json.error || "Something went wrong.");
      }
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err.message || `Something went wrong. Please call ${clinic.phone.display}.`);
      setStatus("error");
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <Section bg="soft" id="book" aria-labelledby="book-heading">
      <Container>
        <SectionHeading
          id="book-heading"
          eyebrow="Book a Visit"
          title="Request an Appointment."
          description="Send us your details and preferred time. We'll call you to confirm."
        />

        <Reveal y={30}>
          <div className={`header-gap mx-auto max-w-3xl bg-white shadow-lift ring-1 ring-line ${panel}`}>
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
                  <input id="ap-name" name="name" required autoComplete="name" className={field} aria-invalid={!!fieldErrors.name} />
                  {fieldErrors.name && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.name}</p>}
                </div>
                <div>
                  <label htmlFor="ap-phone" className={label}>Phone *</label>
                  <input id="ap-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91" className={field} aria-invalid={!!fieldErrors.phone} />
                  {fieldErrors.phone && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="ap-email" className={label}>Email</label>
                  <input id="ap-email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!fieldErrors.email} />
                  {fieldErrors.email && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.email}</p>}
                </div>
                <div>
                  <label htmlFor="ap-treatment" className={label}>Treatment</label>
                  <select id="ap-treatment" name="treatment" defaultValue="" className={field}>
                    <option value="">Not sure / general check-up</option>
                    {treatments.map((t) => (
                      <option key={t.slug} value={t.title}>{t.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="ap-date" className={label}>Preferred date</label>
                  <input id="ap-date" name="date" type="date" min={today} className={field} />
                </div>
                <div>
                  <label htmlFor="ap-time" className={label}>Preferred time</label>
                  <select id="ap-time" name="time" defaultValue="" className={field}>
                    <option value="">Any time</option>
                    <option>Morning (10:30 AM – 2:00 PM)</option>
                    <option>Evening (5:00 PM – 9:00 PM)</option>
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
