import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Marquee } from "../components/Marquee";
import { Story } from "../components/Story";
import { MenuSection } from "../components/MenuSection";
import { Branches } from "../components/Branches";
import { Events } from "../components/Events";
import { Testimonials } from "../components/Testimonials";
import { Faq } from "../components/Faq";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div data-testid="home-page">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <MenuSection />
        <Branches />
        <Events />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
