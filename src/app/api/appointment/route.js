import { brevoConfig, sendEmail } from "@/lib/brevo";
import { clinicNotificationEmail, patientConfirmationEmail } from "@/lib/emailTemplates";
import { clinic } from "@/data/clinic";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{6,18}$/;
const clip = (v, n) => (typeof v === "string" ? v.trim().slice(0, n) : "");

// Appointment request from the Contact page form.
// Emails the clinic inbox (reply-to = patient) and, if the patient gave an email,
// sends them a confirmation. Both emails are sent in parallel.
export async function POST(request) {
  const config = brevoConfig();
  if (!config) {
    console.error("Appointment form: Brevo env vars missing (BREVO_API_KEY, BREVO_SENDER_EMAIL, CLINIC_INBOX_EMAIL).");
    return Response.json({ error: "Email is not configured yet. Please call or WhatsApp us." }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (body.company) return Response.json({ ok: true });

  const data = {
    name: clip(body.name, 80),
    phone: clip(body.phone, 20),
    email: clip(body.email, 120),
    treatment: clip(body.treatment, 80),
    date: clip(body.date, 20),
    time: clip(body.time, 40),
    message: clip(body.message, 1000),
  };

  const errors = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!PHONE_RE.test(data.phone)) errors.phone = "Please enter a valid phone number.";
  if (data.email && !EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email.";
  if (Object.keys(errors).length) return Response.json({ error: "Please check the form.", errors }, { status: 422 });

  const clinicMail = sendEmail(config, {
    to: { email: config.inbox, name: clinic.shortName },
    replyTo: data.email ? { email: data.email, name: data.name } : undefined,
    ...clinicNotificationEmail(data),
  });

  const patientMail = data.email
    ? sendEmail(config, {
        to: { email: data.email, name: data.name },
        replyTo: { email: config.inbox, name: clinic.shortName },
        ...patientConfirmationEmail(data),
      })
    : null;

  const [clinicResult, patientResult] = await Promise.allSettled([clinicMail, patientMail]);

  if (clinicResult.status === "rejected") {
    console.error("Appointment form: clinic email failed", clinicResult.reason);
    return Response.json(
      { error: "We couldn't send your request. Please call or WhatsApp us." },
      { status: 502 },
    );
  }
  if (patientResult.status === "rejected") {
    console.error("Appointment form: patient confirmation failed", patientResult.reason);
  }

  return Response.json({ ok: true });
}
