import { notFound } from "next/navigation";
import { getSakeDetail } from "@/app/lib/mock-sake-detail";
import DetailHero from "@/app/components/encyclopedia/detail-hero";
import DetailSpecs from "@/app/components/encyclopedia/detail-specs";
import DetailPairings from "@/app/components/encyclopedia/detail-pairings";
import DetailBottomBar from "@/app/components/encyclopedia/detail-bottom-bar";

interface SakeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function SakeDetailPage({ params }: SakeDetailPageProps) {
  const { id } = await params;
  const sake = getSakeDetail(id);

  if (!sake) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <div className="px-6 md:px-0 pt-4 md:pt-0 pb-44 md:pb-0">
        <DetailHero sake={sake} />

        <div className="mt-12 md:mt-0">
          <DetailSpecs sake={sake} />
        </div>

        <div className="mt-12 md:mt-0">
          <DetailPairings pairings={sake.pairings} sakeName={sake.name} />
        </div>
      </div>

      <DetailBottomBar />
    </div>
  );
}
