import SiteShell from "@/components/layout/SiteShell";
import PageBanner from "@/components/sections/PageBanner";
import FaqSection from "@/components/sections/FaqSection";
import ContactCards from "@/components/contact/ContactCards";
import VisitInfo from "@/components/contact/VisitInfo";
import AppointmentForm from "@/components/contact/AppointmentForm";
import { Clock } from "lucide-react";
import { clinic } from "@/data/clinic";

export const metadata = {
  title: "Contact Us",
  description: `Call ${clinic.phone.display}, message us on WhatsApp or visit A-Zee Dental & Implant Centre at ${clinic.address.full}.`,
  alternates: { canonical: "/contact" },
};

const faqs = [
  {
    q: "How do I book an appointment?",
    a: `The quickest way is to message us on WhatsApp. You can also call ${clinic.phone.display} during clinic hours and we'll find a time that suits you.`,
  },
  {
    q: "What are your timings?",
    a: "Monday to Saturday, 10:30 AM – 2:00 PM and 5:00 PM – 9:00 PM. Sunday, 10:30 AM – 1:00 PM. Timings can change on holidays, so please call ahead to confirm.",
  },
  {
    q: "Where exactly is the clinic?",
    a: `${clinic.address.full}. Tap "Get Directions" for turn-by-turn navigation in Google Maps.`,
  },
  {
    q: "I have a toothache. Can I be seen soon?",
    a: "Message or call us and describe the problem. We'll do our best to see you at the earliest available slot.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Any previous dental X-rays or reports, a list of medicines you take, and any questions you'd like to ask. That's all.",
  },
];

// Clinic timings card for the right side of the banner.
function TimingsCard() {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-lift ring-1 ring-line sm:p-8">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-soft text-primary ring-1 ring-accent/60">
          <Clock className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="text-xl font-bold text-secondary">Clinic Timings</h2>
      </div>
      <dl className="mt-6 divide-y divide-line">
        {clinic.hours.map(({ days, slots }) => (
          <div key={days} className="py-4 first:pt-0 last:pb-0">
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{days}</dt>
            {slots.map((slot) => (
              <dd key={slot} className="mt-1.5 text-lg font-semibold text-secondary">
                {slot}
              </dd>
            ))}
          </div>
        ))}
      </dl>
      <p className="mt-5 text-sm text-muted">{clinic.hoursNote}</p>
    </div>
  );
}

export default function ContactPage() {
  return (
    <SiteShell>
      <PageBanner
        eyebrow="Get in Touch"
        title="We're Here to Help"
        highlight="Your Smile Shine."
        description="Call, message or drop by. Whether it's a check-up or a toothache that can't wait, we'll help you find a time that works."
        aside={<TimingsCard />}
      />
      <ContactCards />
      <AppointmentForm />
      <VisitInfo />
      <FaqSection
        id="contact-faq"
        eyebrow="Before You Visit"
        title="Good to Know."
        description="Quick answers about booking, timings and finding us."
        items={faqs}
      />
    </SiteShell>
  );
}
