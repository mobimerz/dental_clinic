import MotionProvider from "@/components/common/MotionProvider";
import FloatingContact from "@/components/common/FloatingContact";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/home/AnnouncementBar";
import Hero from "@/components/home/Hero";
import TrustStats from "@/components/home/TrustStats";
import AboutClinic from "@/components/home/AboutClinic";
import Treatments from "@/components/home/Treatments";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ClinicGallery from "@/components/home/ClinicGallery";
import PatientReviews from "@/components/home/PatientReviews";
import AppointmentCTA from "@/components/home/AppointmentCTA";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <MotionProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow-lift"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Hero />
        <TrustStats />
        <AboutClinic />
        <Treatments />
        <WhyChooseUs />
        <ClinicGallery />
        <PatientReviews />
        <AppointmentCTA />
        <ContactSection />
      </main>
      <Footer />
      <FloatingContact />
    </MotionProvider>
  );
}
