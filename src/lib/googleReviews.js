// Live patient reviews from the clinic's Google Business Profile, via the Google Places API (New).
// Runs on the server only: the API key never reaches the browser.
//
// Setup (see README): set GOOGLE_PLACES_API_KEY, and optionally GOOGLE_PLACE_ID.
// Without a key this returns null and the site falls back to src/data/reviews.js.

import { clinic } from "@/data/clinic";

const API = "https://places.googleapis.com/v1";
export const REVIEWS_REVALIDATE = 60 * 60 * 12; // refresh from Google twice a day
const MAX_CHARS = 320;

// Find the clinic's place ID by name + address when GOOGLE_PLACE_ID isn't set.
async function resolvePlaceId(key) {
  if (process.env.GOOGLE_PLACE_ID) return process.env.GOOGLE_PLACE_ID;
  const res = await fetch(`${API}/places:searchText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({ textQuery: `${clinic.name}, ${clinic.address.full}` }),
    next: { revalidate: 60 * 60 * 24 * 7 },
  });
  if (!res.ok) throw new Error(`Places text search failed: ${res.status}`);
  const data = await res.json();
  return data.places?.[0]?.id ?? null;
}

function shorten(text) {
  if (text.length <= MAX_CHARS) return { text, truncated: false };
  const cut = text.slice(0, MAX_CHARS);
  return { text: `${cut.slice(0, cut.lastIndexOf(" "))}…`, truncated: true };
}

// Shape a Places API place into what the reviews section renders.
export function mapPlace(place) {
  const reviews = (place.reviews ?? [])
    .map((r) => {
      const raw = (r.originalText?.text ?? r.text?.text ?? "").trim();
      if (!raw) return null;
      const { text, truncated } = shorten(raw);
      return {
        name: r.authorAttribution?.displayName ?? "Google user",
        photo: r.authorAttribution?.photoUri ?? null,
        profileUrl: r.authorAttribution?.uri ?? null,
        url: r.googleMapsUri ?? place.googleMapsUri ?? null,
        rating: r.rating ?? 5,
        date: r.relativePublishTimeDescription ?? "",
        text,
        truncated,
      };
    })
    .filter(Boolean);

  return {
    reviews,
    rating: place.rating ?? null,
    count: place.userRatingCount ?? null,
    mapsUrl: place.googleMapsUri ?? null,
  };
}

export async function getGoogleReviews() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;
  try {
    const placeId = await resolvePlaceId(key);
    if (!placeId) return null;
    const res = await fetch(`${API}/places/${placeId}?languageCode=en`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "reviews,rating,userRatingCount,googleMapsUri",
      },
      next: { revalidate: REVIEWS_REVALIDATE },
    });
    if (!res.ok) throw new Error(`Places details failed: ${res.status}`);
    return mapPlace(await res.json());
  } catch (err) {
    // A Google outage or bad key must never break the page — fall back quietly.
    console.error("[google-reviews]", err.message);
    return null;
  }
}
