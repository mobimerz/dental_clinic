// Transactional email via Brevo (https://developers.brevo.com/reference/sendtransacemail).
// Runs on the server only: BREVO_API_KEY never reaches the browser.
//
// Required env: BREVO_API_KEY, BREVO_SENDER_EMAIL (must be a sender verified in Brevo),
// CLINIC_INBOX_EMAIL (where appointment requests are delivered). Optional: BREVO_SENDER_NAME.

const ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const TIMEOUT_MS = 10_000;

export function brevoConfig() {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const inbox = process.env.CLINIC_INBOX_EMAIL;
  if (!apiKey || !senderEmail || !inbox) return null;
  return {
    apiKey,
    sender: { email: senderEmail, name: process.env.BREVO_SENDER_NAME || "A-Zee Dental" },
    inbox,
  };
}

// Sends one email. Throws on a non-2xx response or after TIMEOUT_MS, so a slow
// Brevo call can never hang the request indefinitely.
export async function sendEmail(config, { to, subject, html, text, replyTo }) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": config.apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: config.sender,
      to: Array.isArray(to) ? to : [to],
      subject,
      htmlContent: html,
      textContent: text,
      ...(replyTo ? { replyTo } : {}),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Brevo send failed: ${res.status} ${detail}`);
  }
  return res.json();
}

export const escapeHtml = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
