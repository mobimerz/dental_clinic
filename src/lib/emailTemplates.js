// HTML email templates for appointment requests.
// Email clients ignore <style> blocks and external CSS inconsistently, so everything here is
// table-based with inline styles. No images: the header is a text wordmark, so nothing breaks
// when a client blocks images.

import { clinic, whatsappLink } from "@/data/clinic";

const C = {
  primary: "#087f8c",
  primaryDark: "#066a75",
  secondary: "#0b3440",
  soft: "#f3fafa",
  accent: "#b9e5e2",
  ink: "#18333b",
  muted: "#6f858a",
  line: "#e2eeee",
  whatsapp: "#1FAF5A",
};
const FONT = "'Plus Jakarta Sans','Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export const escapeHtml = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const nl2br = (s) => escapeHtml(s).replace(/\n/g, "<br>");

// "2026-11-18" -> "Wednesday, 18 November 2026"
function formatDate(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(d);
}

const receivedAt = () =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata",
  }).format(new Date()) + " IST";

const digits = (phone) => phone.replace(/\D/g, "").replace(/^0+/, "");
// Indian numbers typed without a country code get +91 for WhatsApp links.
const waNumber = (phone) => {
  const d = digits(phone);
  return d.length === 10 ? `91${d}` : d;
};

function button(href, label, bg) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-table;margin:4px 6px 4px 0">
  <tr><td style="border-radius:999px;background:${bg}">
    <a href="${escapeHtml(href)}" target="_blank" style="display:inline-block;padding:12px 22px;font-family:${FONT};font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px">${label}</a>
  </td></tr></table>`;
}

function detailRows(rows) {
  return rows
    .map(
      ([k, v], i) => `<tr>
  <td style="padding:12px 16px;${i ? `border-top:1px solid ${C.line};` : ""}font-family:${FONT};font-size:13px;font-weight:600;color:${C.muted};text-transform:uppercase;letter-spacing:.06em;width:38%;vertical-align:top">${k}</td>
  <td style="padding:12px 16px;${i ? `border-top:1px solid ${C.line};` : ""}font-family:${FONT};font-size:15px;color:${C.ink};vertical-align:top">${v}</td>
</tr>`,
    )
    .join("");
}

function hoursHtml() {
  return clinic.hours
    .map((h) => `<strong style="color:${C.secondary}">${escapeHtml(h.days)}</strong><br>${h.slots.map(escapeHtml).join(" &nbsp;·&nbsp; ")}`)
    .join("<br><br>");
}

// Shared outer frame: preheader, wordmark header band, white card, footer.
function layout({ preheader, eyebrow, title, body, footerNote }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${C.soft};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.soft}">
<tr><td align="center" style="padding:28px 12px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px">

    <tr><td style="background:${C.secondary};background-image:linear-gradient(135deg,${C.secondary} 0%,${C.primary} 100%);border-radius:24px 24px 0 0;padding:28px 32px">
      <div style="font-family:${FONT};font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-.01em">${escapeHtml(clinic.shortName)}<span style="color:${C.accent}">.</span></div>
      <div style="font-family:${FONT};font-size:12px;color:${C.accent};letter-spacing:.14em;text-transform:uppercase;margin-top:4px">Dental &amp; Implant Centre · Bengaluru</div>
    </td></tr>

    <tr><td style="background:#ffffff;padding:32px;border-left:1px solid ${C.line};border-right:1px solid ${C.line}">
      <div style="display:inline-block;background:${C.soft};border:1px solid ${C.accent};border-radius:999px;padding:6px 12px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${C.primary}">${eyebrow}</div>
      <h1 style="margin:16px 0 0;font-family:${FONT};font-size:26px;line-height:1.25;font-weight:800;color:${C.secondary}">${title}</h1>
      ${body}
    </td></tr>

    <tr><td style="background:${C.secondary};border-radius:0 0 24px 24px;padding:24px 32px">
      <div style="font-family:${FONT};font-size:14px;font-weight:700;color:#ffffff">${escapeHtml(clinic.name)}</div>
      <div style="font-family:${FONT};font-size:13px;line-height:1.6;color:#c9dfe0;margin-top:6px">${escapeHtml(clinic.address.full)}</div>
      <div style="font-family:${FONT};font-size:13px;margin-top:10px">
        <a href="${clinic.phone.tel}" style="color:${C.accent};text-decoration:none;font-weight:600">${escapeHtml(clinic.phone.display)}</a>
        <span style="color:#5e8a91">&nbsp;·&nbsp;</span>
        <a href="${clinic.links.directions}" style="color:${C.accent};text-decoration:none;font-weight:600">Get directions</a>
      </div>
      ${footerNote ? `<div style="font-family:${FONT};font-size:12px;line-height:1.6;color:#8fb0b4;margin-top:14px">${footerNote}</div>` : ""}
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;
}

function requestRows(d, { forClinic }) {
  const rows = [];
  if (forClinic) {
    rows.push(["Name", escapeHtml(d.name)]);
    rows.push(["Phone", `<a href="tel:+${digits(d.phone)}" style="color:${C.primary};font-weight:600;text-decoration:none">${escapeHtml(d.phone)}</a>`]);
    rows.push(["Email", d.email ? `<a href="mailto:${escapeHtml(d.email)}" style="color:${C.primary};text-decoration:none">${escapeHtml(d.email)}</a>` : `<span style="color:${C.muted}">Not provided</span>`]);
  }
  rows.push(["Treatment", escapeHtml(d.treatment || "General check-up / not sure")]);
  rows.push(["Preferred date", escapeHtml(formatDate(d.date) || "Any day")]);
  rows.push(["Preferred time", escapeHtml(d.time || "Any time")]);
  if (d.message) rows.push(["Message", nl2br(d.message)]);
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;border:1px solid ${C.line};border-radius:16px;border-collapse:separate;overflow:hidden">${detailRows(rows)}</table>`;
}

const p = (html, extra = "") =>
  `<p style="margin:14px 0 0;font-family:${FONT};font-size:15px;line-height:1.65;color:${C.ink};${extra}">${html}</p>`;

// Email to the clinic inbox.
export function clinicNotificationEmail(d) {
  const firstName = d.name.split(" ")[0];
  const actions = [
    button(`tel:+${digits(d.phone)}`, `Call ${escapeHtml(firstName)}`, C.primary),
    button(`https://wa.me/${waNumber(d.phone)}?text=${encodeURIComponent(`Hello ${firstName}, this is ${clinic.shortName} regarding your appointment request.`)}`, "WhatsApp", C.whatsapp),
    d.email ? button(`mailto:${d.email}?subject=${encodeURIComponent(`Your appointment at ${clinic.shortName}`)}`, "Reply by email", C.secondary) : "",
  ].join("");

  const html = layout({
    preheader: `${d.name} · ${d.phone} · ${d.treatment || "General check-up"} · ${formatDate(d.date) || "Any day"}`,
    eyebrow: "New website request",
    title: `New appointment request from ${escapeHtml(d.name)}`,
    body: `${p(`Received ${escapeHtml(receivedAt())} via the website Contact page. Please call the patient to confirm a slot.`, `color:${C.muted}`)}
${requestRows(d, { forClinic: true })}
<div style="margin-top:24px">${actions}</div>
${d.email ? p(`Replying to this email goes straight to ${escapeHtml(d.email)}.`, `font-size:13px;color:${C.muted}`) : ""}`,
    footerNote: "This is an automated notification from the clinic website.",
  });

  const text = [
    `New appointment request from ${d.name}`,
    `Received ${receivedAt()}`,
    "",
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Email: ${d.email || "Not provided"}`,
    `Treatment: ${d.treatment || "General check-up / not sure"}`,
    `Preferred date: ${formatDate(d.date) || "Any day"}`,
    `Preferred time: ${d.time || "Any time"}`,
    d.message ? `Message: ${d.message}` : "",
  ].filter((l) => l !== null).join("\n");

  return { subject: `New appointment request: ${d.name}${d.date ? ` · ${formatDate(d.date)}` : ""}`, html, text };
}

// Confirmation to the patient.
export function patientConfirmationEmail(d) {
  const firstName = d.name.split(" ")[0];
  const html = layout({
    preheader: `Thanks ${firstName}, we've received your request and will call you on ${d.phone} to confirm.`,
    eyebrow: "Request received",
    title: `Thank you, ${escapeHtml(firstName)}. We'll be in touch soon.`,
    body: `${p(`We've received your appointment request at ${escapeHtml(clinic.name)}. Our team will call you on <strong style="color:${C.secondary}">${escapeHtml(d.phone)}</strong> during clinic hours to confirm a time that suits you.`)}
${p(`<strong style="color:${C.secondary}">This is a request, not a confirmed booking yet.</strong> Your appointment is confirmed once we speak with you.`, `font-size:14px`)}
<div style="margin-top:28px;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${C.primary}">Your request</div>
${requestRows(d, { forClinic: false })}

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;background:${C.soft};border:1px solid ${C.accent};border-radius:16px">
<tr><td style="padding:20px">
  <div style="font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${C.primary}">Clinic hours</div>
  <div style="font-family:${FONT};font-size:14px;line-height:1.6;color:${C.ink};margin-top:10px">${hoursHtml()}</div>
</td></tr></table>

${p("Need us sooner, or want to change something? Call or message us:")}
<div style="margin-top:14px">
  ${button(clinic.phone.tel, "Call the clinic", C.primary)}
  ${button(whatsappLink(`Hello ${clinic.shortName}, this is ${d.name}. I sent an appointment request on the website.`), "WhatsApp us", C.whatsapp)}
  ${button(clinic.links.directions, "Get directions", C.secondary)}
</div>
${p("<strong style=\"color:" + C.secondary + "\">For your first visit,</strong> please bring any previous dental X-rays or reports and a list of medicines you take.", "font-size:14px")}
${p(`Warm regards,<br><strong style="color:${C.secondary}">The ${escapeHtml(clinic.shortName)} team</strong>`)}`,
    footerNote: `You're receiving this because you requested an appointment on our website. If this wasn't you, please ignore this email or call us on ${escapeHtml(clinic.phone.display)}.`,
  });

  const text = [
    `Hi ${firstName},`,
    "",
    `Thank you for contacting ${clinic.name}. We've received your appointment request and will call you on ${d.phone} to confirm a time.`,
    "This is a request, not a confirmed booking yet.",
    "",
    "Your request",
    `Treatment: ${d.treatment || "General check-up / not sure"}`,
    `Preferred date: ${formatDate(d.date) || "Any day"}`,
    `Preferred time: ${d.time || "Any time"}`,
    d.message ? `Message: ${d.message}` : "",
    "",
    "Clinic hours",
    ...clinic.hours.map((h) => `${h.days}: ${h.slots.join(", ")}`),
    "",
    `Call: ${clinic.phone.display}`,
    `WhatsApp: ${whatsappLink()}`,
    `Directions: ${clinic.links.directions}`,
    "",
    `Warm regards,\nThe ${clinic.shortName} team`,
    clinic.address.full,
  ].join("\n");

  return { subject: `We've received your appointment request · ${clinic.shortName}`, html, text };
}
