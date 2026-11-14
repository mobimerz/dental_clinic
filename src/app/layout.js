import { Plus_Jakarta_Sans } from "next/font/google";
import { clinic } from "@/data/clinic";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const title = "A-Zee Dental & Implant Centre | Dentist & Dental Implants in Bengaluru";
const description =
  "Visit A-Zee Dental & Implant Centre in Pai Layout, Bengaluru for personalized dental care, dental implants, root canal treatment, cosmetic dentistry and more.";

export const metadata = {
  // NEXT_PUBLIC_SITE_URL can point at a custom domain later; the fallback is the live Vercel URL,
  // so Open Graph / Twitter image URLs never resolve to localhost in production.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dental-clinic-omega-five.vercel.app"),
  title: {
    default: title,
    template: `%s | ${clinic.name}`,
  },
  description,
  keywords: [
    "dentist in Bengaluru",
    "dental clinic Pai Layout",
    "dental implants Bengaluru",
    "root canal treatment",
    "cosmetic dentistry",
    "Old Madras Road dentist",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: clinic.name,
    title,
    description,
    images: [
      {
        url: "/images/clinic/treatment-room-2.jpg",
        width: 1040,
        height: 780,
        alt: "Treatment room at A-Zee Dental & Implant Centre",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport = {
  themeColor: "#087F8C",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  telephone: clinic.phone.display,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${clinic.address.line1}, ${clinic.address.line2}`,
    addressLocality: clinic.address.city,
    addressRegion: clinic.address.state,
    postalCode: clinic.address.postalCode,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: clinic.address.geo.lat,
    longitude: clinic.address.geo.lng,
  },
  hasMap: clinic.links.googleMaps,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <noscript>
          <style>{`.hero-intro{visibility:visible}`}</style>
        </noscript>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
