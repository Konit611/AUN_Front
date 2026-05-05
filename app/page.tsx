import HeroSection from "@/app/components/sections/hero-section";
import SeasonalPairingsSection from "@/app/components/sections/seasonal-pairings-section";
import FindByFoodSection from "@/app/components/sections/find-by-food-section";
import ClassicPairingsSection from "@/app/components/sections/classic-pairings-section";
import BottomCTASection from "@/app/components/sections/bottom-cta-section";
import { apiFetch } from "@/app/lib/api";
import type { HomeData } from "@/app/lib/types";

const EMPTY_HOME: HomeData = {
  seasonal: { label: "", items: [] },
  classic: { items: [] },
  foodCategories: [],
};

export default async function Home() {
  let data: HomeData;
  try {
    data = await apiFetch<HomeData>("/home");
  } catch {
    data = EMPTY_HOME;
  }

  return (
    <>
      <HeroSection />
      <SeasonalPairingsSection
        label={data.seasonal.label}
        items={data.seasonal.items}
      />
      <FindByFoodSection categories={data.foodCategories} />
      <ClassicPairingsSection items={data.classic.items} />
      <BottomCTASection />
    </>
  );
}
