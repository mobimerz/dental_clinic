import SiteShell from "@/components/layout/SiteShell";
import PageBanner from "@/components/sections/PageBanner";
import CtaBanner from "@/components/sections/CtaBanner";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PatientReviews from "@/components/home/PatientReviews";
import TrustStats from "@/components/home/TrustStats";
import VisitJourney from "@/components/why/VisitJourney";
import ComfortGrid from "@/components/why/ComfortGrid";
import Button from "@/components/common/Button";
import { clinic, clinicImages } from "@/data/clinic";
import { getGoogleReviews } from "@/lib/googleReviews";

export const revalidate = 43200;

export const metadata = {
  title: "Why Choose Us",
  description: `Rated ${clinic.rating.value}/5 by ${clinic.rating.count}+ patients on Google. Discover why families in Pai Layout, Bengaluru trust A-Zee Dental for gentle, personalized dental care.`,
  alternates: { canonical: "/why-choose-us" },
};

export default async function WhyChooseUsPage() {
  const google = await getGoogleReviews();

  return (
    <SiteShell>
      <PageBanner
        crumb="Why Choose Us"
        eyebrow="Why Patients Choose Us"
        title="Trusted by Families,"
        highlight={`Rated ${clinic.rating.value} on Google.`}
        description={`More than ${clinic.rating.count} patients have shared their experience on Google. Here's what makes a visit to A-Zee Dental feel different.`}
        image={clinicImages.reception}
        chips={[
          { icon: "star", value: `${clinic.rating.value} / 5`, label: `${clinic.rating.count} Google reviews` },
        ]}
      >
        <Button href="#reviews" arrow>
          Read Patient Reviews
        </Button>
        <Button href="/contact" variant="secondary">
          Plan Your Visit
        </Button>
      </PageBanner>
      <TrustStats spaced />
      <WhyChooseUs />
      <VisitJourney />
      <ComfortGrid />
      <PatientReviews google={google} />
      <CtaBanner bg="white" title="Experience the Difference for Yourself." />
    </SiteShell>
  );
}
