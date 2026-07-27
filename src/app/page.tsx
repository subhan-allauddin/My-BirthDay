import AboutMe from "./components/home_page_components/AboutMe";
import CountdownCard from "./components/home_page_components/CountdownCard";
import HeroSection from "./components/home_page_components/HeroSections";
import WishesSection from "./components/home_page_components/WishesSection";
import Footer from "./components/main_components/Footer";
import CodingJourney from "./components/home_page_components/CodingJourney";
import ProjectsSection from "./components/home_page_components/ProjectsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
        <CountdownCard targetDate="2026-07-28T00:00:00" />

      <div className="hidden md:block">
              <AboutMe />
      </div>

      <div id="journey">
        <CodingJourney />
      </div>

      <div id="projects">
        <ProjectsSection />
      </div>

      <WishesSection />
      <Footer />
    </>
  );
}
