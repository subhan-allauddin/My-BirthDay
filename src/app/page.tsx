import AboutMe from "./components/home_page_components/AboutMe";
import CountdownCard from "./components/home_page_components/CountdownCard";
import HeroSection from "./components/home_page_components/HeroSections";
import WishesSection from "./components/home_page_components/WishesSection";
import Footer from "./components/main_components/Footer";
import CodingJourney from "./components/home_page_components/CodingJourney";
import ProjectsSection from "./components/home_page_components/ProjectsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CountdownCard />
      <AboutMe />
      <CodingJourney />
      <ProjectsSection />
      <WishesSection />
      <Footer />
    </main>
  );
}
