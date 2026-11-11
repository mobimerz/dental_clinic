import SiteShell from "@/components/layout/SiteShell";
import PageHero from "@/components/sections/PageHero";
import FaqSection from "@/components/sections/FaqSection";
import ContactCards from "@/components/contact/ContactCards";
import VisitInfo from "@/components/contact/VisitInfo";
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

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        crumb="Contact"
        eyebrow="Get in Touch"
        title="We're Here to Help"
        highlight="Your Smile Shine."
        description="Call, message or drop by. Whether it's a check-up or a toothache that can't wait, we'll help you find a time that works."
      />
      <ContactCards />
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
