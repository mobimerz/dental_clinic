// Central, editable business configuration for A-Zee Dental & Implant Centre.
// Update details here — every section of the site reads from this file.

export const clinic = {
  name: "A-Zee Dental & Implant Centre",
  shortName: "A-Zee Dental",
  tagline: "Dental & Implant Care in Bengaluru",
  description:
    "Personalized dental care, dental implants, root canal treatment, cosmetic dentistry and more in Pai Layout, Bengaluru.",

  phone: {
    display: "+91 97313 76106",
    tel: "tel:+919731376106",
    whatsapp: "919731376106", // international format, digits only
  },

  address: {
    line1: "No. 160, 1st Main Road, 10th Cross",
    line2: "Pai Layout, Old Madras Road, Dooravani Nagar",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560016",
    full: "No. 160, 1st Main Road, 10th Cross, Pai Layout, Old Madras Road, Dooravani Nagar, Bengaluru, Karnataka 560016",
    geo: { lat: 12.9935919, lng: 77.6672914 },
  },

  links: {
    googleProfile: "https://share.google/hgH9EObfTyfUqRAtN",
    googleMaps:
      "https://www.google.com/maps/search/?api=1&query=A-Zee+Dental+%26+Implant+Centre+Bengaluru",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=A-Zee+Dental+%26+Implant+Centre+Bengaluru",
    mapEmbed:
      "https://maps.google.com/maps?q=A-Zee%20Dental%20%26%20Implant%20Centre%2C%20Pai%20Layout%2C%20Bengaluru&z=16&output=embed",
  },

  // Google Business Profile rating. Update periodically.
  rating: {
    value: 4.9,
    outOf: 5,
    count: 311,
    checkedOn: "November 2026",
  },

  // Listed timings — subject to clinic confirmation.
  hours: [
    { days: "Monday – Saturday", slots: ["10:30 AM – 2:00 PM", "5:00 PM – 9:00 PM"] },
    { days: "Sunday", slots: ["10:30 AM – 1:00 PM"] },
  ],
  hoursNote: "Timings are subject to change. Please call ahead to confirm.",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Treatments", href: "#treatments" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Contact", href: "#contact" },
];

export const whatsappLink = (message = "Hello A-Zee Dental, I would like to enquire about an appointment.") =>
  `https://wa.me/${clinic.phone.whatsapp}?text=${encodeURIComponent(message)}`;

// Real photographs from the clinic's Google Business Profile.
// To replace a photo, drop a new file into /public/images/clinic and update the path here.
export const clinicImages = {
  doctorPortrait: {
    src: "/images/clinic/dr-aysha-aslam.jpg",
    alt: "Dr. Aysha Aslam smiling in a treatment room at A-Zee Dental & Implant Centre",
    width: 720,
    height: 1280,
  },
  treatmentRoom: {
    src: "/images/clinic/treatment-room-1.jpg",
    alt: "Dental treatment room with a teal dental chair and LED lamp at A-Zee Dental",
    width: 1600,
    height: 2133,
  },
  treatmentRoomAlt: {
    src: "/images/clinic/treatment-room-2.jpg",
    alt: "Second treatment room with a dental chair and sterilised work area at A-Zee Dental",
    width: 1040,
    height: 780,
  },
  dentistAtWork: {
    src: "/images/clinic/dentist-at-work.jpg",
    alt: "A dentist at A-Zee Dental treating a young patient in the dental chair",
    width: 1080,
    height: 1920,
  },
  reception: {
    src: "/images/clinic/reception.jpg",
    alt: "Reception and waiting area at A-Zee Dental with a wooden front desk",
    width: 840,
    height: 840,
  },
};
