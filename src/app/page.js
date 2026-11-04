import MotionProvider from "@/components/common/MotionProvider";
import FloatingContact from "@/components/common/FloatingContact";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import TrustStats from "@/components/home/TrustStats";
import AboutClinic from "@/components/home/AboutClinic";
import Treatments from "@/components/home/Treatments";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ClinicGallery from "@/components/home/ClinicGallery";
import PatientReviews from "@/components/home/PatientReviews";
import { getGoogleReviews } from "@/lib/googleReviews";

// Re-fetch Google reviews at most twice a day (keeps the page static and fast).
export const revalidate = 43200;

export default async function HomePage() {
  const google = await getGoogleReviews();

  return (
    <MotionProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow-lift"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <TrustStats />
        <AboutClinic />
        <Treatments />
        <WhyChooseUs />
        <ClinicGallery />
        <PatientReviews google={google} />
      </main>
      <Footer />
      <FloatingContact />
    </MotionProvider>
  );
}
