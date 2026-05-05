import type { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: ResultPageProps): Promise<Metadata> {
  const { code } = await params;
  const persona = isValidCode(code) ? getPersona(code.toUpperCase()) : null;

  if (!persona) {
    return {
      title: "AUN — 日本酒パーソナリティ診断",
    };
  }

  const title = `${persona.name}（${persona.code}） — AUN 日本酒パーソナリティ`;
  const description = persona.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { code } = await params;

  if (!isValidCode(code)) {
    notFound();
  }

  const persona = getPersona(code);
  if (!persona) {
    notFound();
  }
  const colors = getPersonaColors(code);

  let data: ResultData;
  try {
    data = await apiFetch<ResultData>(`/quiz-results/${code}`);
  } catch {
    notFound();
  }

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
        userCode={persona.code}
        userName={persona.name}
        userDescription={persona.description}
        compatibleCode={persona.compatibleCode}
        compatibleName={persona.compatibleName}
        compatibleDescription={persona.compatibleDescription}
      />
    </div>
  );
}
