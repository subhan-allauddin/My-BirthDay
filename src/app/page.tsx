import AboutMeStrip from "./components/home_page_components/AboutMeStrip";
import CountdownCard from "./components/home_page_components/CountdownCard";
import HeroSection from "./components/home_page_components/HeroSections";
import HighlightCards from "./components/home_page_components/HighlightCards";
import MemoriesPreview from "./components/home_page_components/MemoriesPreview";
import WishesSection from "./components/home_page_components/WishesSection";
import Footer from "./components/main_components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CountdownCard targetDate="2026-07-28T00:00:00" />
      <AboutMeStrip />
      <HighlightCards />
      <MemoriesPreview />
      <WishesSection />
      <Footer />
    </>
  );
}
