import SiteShell from "@/components/layout/SiteShell";
import Hero from "@/components/home/Hero";
import TrustStats from "@/components/home/TrustStats";
import AboutClinic from "@/components/home/AboutClinic";
import Treatments from "@/components/home/Treatments";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ClinicGallery from "@/components/home/ClinicGallery";
import PatientReviews from "@/components/home/PatientReviews";
import VisitInfo from "@/components/contact/VisitInfo";
import { getGoogleReviews } from "@/lib/googleReviews";

// Re-fetch Google reviews at most twice a day (keeps the page static and fast).
export const revalidate = 43200;

export default async function HomePage() {
  const google = await getGoogleReviews();

  return (
    <SiteShell>
      <Hero />
      <TrustStats />
      <AboutClinic />
      <Treatments />
      <WhyChooseUs linkToPage backdrop="bg-soft" />
      <ClinicGallery />
      <PatientReviews google={google} />
      <VisitInfo />
    </SiteShell>
  );
}
