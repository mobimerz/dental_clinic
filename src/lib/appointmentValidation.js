// Field checks for the appointment form. Shared by the form (instant feedback) and
// /api/appointment (the real gate), so both always agree.

// name@domain.tld: no spaces, no leading/trailing or doubled dots, a dotted domain and a 2+ letter ending.
// (No lookbehind: older iPhone Safari can't parse it, and it would break the whole page.)
const EMAIL_RE = /^[A-Za-z0-9_%+'-]+(?:\.[A-Za-z0-9_%+'-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

// Phone as typed, reduced to digits plus a leading "+" if there was one.
function compactPhone(value) {
  const trimmed = value.trim();
  return (trimmed.startsWith("+") ? "+" : "") + trimmed.replace(/\D/g, "");
}

// Returns the number in a standard form, or null if it isn't valid.
//   Indian numbers (no code, or +91 / 91 / 0 in front): exactly 10 digits starting 2–9, which covers
//   mobiles (6–9) and landlines with their STD code (e.g. 080 for Bengaluru). → "+91 98450 12345"
//   Other countries: "+" and a country code, 8–15 digits in all. → "+44 7911123456"
export function normalizePhone(value) {
  if (typeof value !== "string") return null;
  if (/[^\d\s()+\-.]/.test(value)) return null; // letters or other symbols
  const p = compactPhone(value);

  let national = null;
  if (/^\d{10}$/.test(p)) national = p;
  else if (/^0\d{10}$/.test(p)) national = p.slice(1);
  else if (/^(\+91|91)\d{10}$/.test(p)) national = p.slice(-10);

  if (national) return /^[2-9]/.test(national) ? `+91 ${national.slice(0, 5)} ${national.slice(5)}` : null;
  if (/^\+(?!91)[1-9]\d{7,14}$/.test(p)) return p;
  return null;
}

export function isValidEmail(value) {
  return typeof value === "string" && value.length <= 120 && EMAIL_RE.test(value.trim());
}

// { field: message } for every field that fails. Empty object means the form is fine.
export function validateAppointment({ name = "", phone = "", email = "" }) {
  const errors = {};
  const n = name.trim();
  if (n.length < 2 || !/\p{L}/u.test(n)) errors.name = "Please enter your name.";
  if (!phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!normalizePhone(phone)) errors.phone = "Please enter a valid 10-digit mobile number.";
  if (email.trim() && !isValidEmail(email)) errors.email = "Please enter a valid email, e.g. name@gmail.com.";
  return errors;
}
