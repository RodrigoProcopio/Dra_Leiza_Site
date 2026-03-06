import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import PacientArea from "../components/sections/PacientArea";
import PublicationsSection from "../components/sections/PublicationsSection";
import ContactSection from "../components/sections/ContactSection";
import Seo from "./seo/Seo";

export default function App() {
  return (
    <div className="min-h-screen">
      <Seo />
      <Header />

      <main className="pt-16 md:pt-20">
        <HeroSection />
        <AboutSection />
        <PacientArea />
        <PublicationsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
