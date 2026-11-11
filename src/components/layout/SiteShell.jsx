import MotionProvider from "@/components/common/MotionProvider";
import FloatingContact from "@/components/common/FloatingContact";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Shared frame for every page: motion layer, header, footer and the floating contact button.
// It lives in each page (not the root layout) so smooth scroll and parallax re-initialise per route.
export default function SiteShell({ children }) {
  return (
    <MotionProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow-lift"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingContact />
    </MotionProvider>
  );
}
