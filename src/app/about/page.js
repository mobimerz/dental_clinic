import SiteShell from "@/components/layout/SiteShell";
import PageBanner from "@/components/sections/PageBanner";
import CtaBanner from "@/components/sections/CtaBanner";
import AboutStory from "@/components/about/AboutStory";
import DoctorSpotlight from "@/components/about/DoctorSpotlight";
import ValuesStack from "@/components/about/ValuesStack";
import CareForAll from "@/components/about/CareForAll";
import ClinicGallery from "@/components/home/ClinicGallery";
import Button from "@/components/common/Button";
import { clinic, clinicImages } from "@/data/clinic";

export const metadata = {
  title: "About Us",
  description: `A family dental clinic in Pai Layout, Bengaluru since ${clinic.established}. Meet ${clinic.doctor.name} and discover our preventive, painless and personalized approach to dental care.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageBanner
        crumb="About"
        eyebrow={`Since ${clinic.established}`}
        title="Caring for Smiles"
        highlight={`Since ${clinic.established}.`}
        description="A family dental clinic in Pai Layout, Bengaluru, built on preventive, painless and personalized care for children and adults alike."
        image={clinicImages.dentistAtWork}
        imagePosition="object-[50%_35%]"
        chips={[
          { icon: "star", value: `${clinic.rating.value} / 5`, label: `${clinic.rating.count} Google reviews` },
        ]}
      >
        <Button href="/treatments" arrow>
          Explore Treatments
        </Button>
        <Button href="/contact" variant="secondary">
          Visit the Clinic
        </Button>
      </PageBanner>
      <AboutStory />
      <DoctorSpotlight />
      <ValuesStack />
      <CareForAll />
      <ClinicGallery />
      <CtaBanner rhythm="hero" bg="soft" title="Let's Look After Your Smile, Together." />
    </SiteShell>
  );
}
