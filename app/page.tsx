import { cookies } from "next/headers";
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
  featuredSake: null,
};

export default async function Home() {
  const cookie = (await cookies()).toString();
  let data: HomeData;
  try {
    data = await apiFetch<HomeData>("/home", { cookie });
  } catch {
    data = EMPTY_HOME;
  }

  return (
    <>
      <HeroSection featuredSake={data.featuredSake} />
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
