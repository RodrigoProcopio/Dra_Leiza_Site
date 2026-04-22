import { Suspense, lazy } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/layout/ScrollToTop";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import StatsSection from "../components/sections/StatsSection";
import Seo from "./seo/Seo";

// Lazy load das seções mais pesadas
const TimelineSection     = lazy(() => import("../components/sections/TimelineSection"));
const PublicationsSection = lazy(() => import("../components/sections/PublicationsSection"));
const PacientArea         = lazy(() => import("../components/sections/PacientArea"));
const ContactSection      = lazy(() => import("../components/sections/ContactSection"));

export default function App() {
  return (
    <div className="min-h-screen">
      <Seo />
      <Header />
      <main className="pt-16 md:pt-20">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <Suspense fallback={<div className="h-96" />}>
          <TimelineSection />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <PublicationsSection />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <PacientArea />
        </Suspense>
        <Suspense fallback={<div className="h-96" />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}