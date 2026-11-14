import SiteShell from "@/components/layout/SiteShell";
import PageBanner from "@/components/sections/PageBanner";
import CtaBanner from "@/components/sections/CtaBanner";
import FaqSection from "@/components/sections/FaqSection";
import TreatmentExplorer from "@/components/treatments/TreatmentExplorer";
import TreatmentDetails from "@/components/treatments/TreatmentDetails";
import Button from "@/components/common/Button";
import { clinic, clinicImages } from "@/data/clinic";
import { treatments } from "@/data/treatments";

export const metadata = {
  title: "Dental Treatments",
  description:
    "Dental implants, root canal treatment, braces and clear aligners, whitening, crowns, dentures, kids' dentistry and more at A-Zee Dental & Implant Centre, Pai Layout, Bengaluru.",
  alternates: { canonical: "/treatments" },
};

const faqs = [
  {
    q: "How do I know which treatment is right for me?",
    a: "Start with a consultation. We examine your teeth and gums, take X-rays if needed and explain your options in plain language, so you can choose with confidence.",
  },
  {
    q: "Is root canal treatment painful?",
    a: "Root canal treatment is done under local anaesthesia, and our focus is on keeping it as comfortable and painless as possible. Most patients find it relieves the pain they came in with.",
  },
  {
    q: "Do you treat children?",
    a: "Yes. We're a family dental clinic and see children for check-ups, cavity care and treatments like space maintainers, as well as teens, adults and seniors.",
  },
  {
    q: "Do you offer clear aligners like Invisalign?",
    a: "Yes. Alongside traditional braces we offer clear aligners, which are removable so you can eat what you like and brush as usual. We'll check whether they suit your teeth at the assessment.",
  },
  {
    q: "How often should I have a check-up and cleaning?",
    a: "Most people benefit from a check-up and professional cleaning about every six months. Catching a cavity while it's small keeps treatment simple.",
  },
  {
    q: "How can I book an appointment?",
    a: `Message us on WhatsApp or call ${clinic.phone.display}. We're open Monday to Saturday (morning and evening) and Sunday mornings.`,
  },
];

export default function TreatmentsPage() {
  return (
    <SiteShell>
      <PageBanner
        crumb="Treatments"
        eyebrow="Our Treatments"
        title="Complete Dental Care,"
        highlight="Under One Roof."
        description={`From routine check-ups to implants, aligners and smile makeovers: ${treatments.length} treatments for children and adults, planned around your comfort.`}
        image={clinicImages.treatmentRoom}
        imagePosition="object-[50%_60%]"
        chips={[
          { icon: "shield", value: "Painless", label: "Comfort-first care" },
        ]}
      >
        <Button href="#explorer" arrow>
          Browse Treatments
        </Button>
        <Button href="/contact" variant="secondary">
          Book a Consultation
        </Button>
      </PageBanner>
      <TreatmentExplorer />
      <TreatmentDetails />
      <FaqSection
        rhythm="hero"
        id="treatment-faq"
        title="Questions About Treatment?"
        description="A few things patients often ask before their first visit. Anything else, just message us."
        items={faqs}
      />
      <CtaBanner rhythm="hero" bg="white" title="Not Sure Where to Start? Let's Talk." message="Hello A-Zee Dental, I would like to book a consultation." />
    </SiteShell>
  );
}
