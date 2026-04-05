import { notFound } from "next/navigation";
import { getPersona, getPersonaColors, isValidCode } from "@/app/lib/persona";
import { apiFetch } from "@/app/lib/api";
import type { ResultData } from "@/app/lib/types";
import HeroSection from "@/app/components/result/hero-section";
import SakeRecommendationsSection from "@/app/components/result/sake-recommendations-section";
import PairingsSection from "@/app/components/result/pairings-section";
import CompatibilitySection from "@/app/components/result/compatibility-section";

interface ResultPageProps {
  params: Promise<{ code: string }>;
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { code } = await params;

  if (!isValidCode(code)) {
    notFound();
  }

  const persona = getPersona(code)!;
  const colors = getPersonaColors(code);
  const data = await apiFetch<ResultData>(`/quiz-results/${code}`);

  return (
    <div className="flex flex-col gap-0">
      <HeroSection
        typeCode={persona.code}
        typeName={persona.name}
        description={persona.description}
        gradientFrom={colors.gradientFrom}
        gradientTo={colors.gradientTo}
      />

      <SakeRecommendationsSection
        sakes={data.sakes}
        typeCode={persona.code}
      />

      <PairingsSection
        pairings={data.pairings}
        title={data.pairingSectionTitle}
        description={data.pairingSectionDescription}
      />

      <CompatibilitySection
        compatibleCode={persona.compatibleCode}
        compatibleName={persona.compatibleName}
        compatibleDescription={persona.compatibleDescription}
      />
    </div>
  );
}
