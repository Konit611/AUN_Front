import HeroSection from "@/app/components/sections/hero-section";
import SeasonalPairingsSection from "@/app/components/sections/seasonal-pairings-section";
import FindByFoodSection from "@/app/components/sections/find-by-food-section";
import ClassicPairingsSection from "@/app/components/sections/classic-pairings-section";
import BottomCTASection from "@/app/components/sections/bottom-cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SeasonalPairingsSection />
      <FindByFoodSection />
      <ClassicPairingsSection />
      <BottomCTASection />
    </>
  );
}
