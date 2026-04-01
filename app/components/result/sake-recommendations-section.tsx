import type { SakeRecommendation } from "@/app/lib/mock-data";
import SakeCard from "./sake-card";

interface SakeRecommendationsSectionProps {
  sakes: SakeRecommendation[];
  typeCode: string;
}

export default function SakeRecommendationsSection({
  sakes,
  typeCode,
}: SakeRecommendationsSectionProps) {
  return (
    <section className="bg-bg px-6 py-24 md:px-8 md:py-20">
      <div className="max-w-[1280px] mx-auto">
        {/* Mobile heading */}
        <div className="md:hidden flex flex-col gap-3 items-center mb-12">
          <p className="font-body text-[10px] text-text-muted/40 tracking-[3px] uppercase">
            Selected for you
          </p>
          <h2 className="font-display text-[30px] leading-9 text-accent text-center">
            あなたにおすすめの日本酒
          </h2>
        </div>

        {/* PC heading */}
        <div className="hidden md:flex items-end justify-between mb-12">
          <div className="flex flex-col gap-4">
            <p className="font-body font-bold text-xs text-accent tracking-[2.4px] uppercase">
              Curated Selection
            </p>
            <h2 className="font-display text-4xl leading-10 text-accent">
              {typeCode}のための3選
            </h2>
          </div>
          <span className="flex items-center gap-2 text-sm text-accent border-b border-accent/20 pb-1 font-body">
            すべて見る
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path
                d="M2 1l4 3-4 3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex gap-6 overflow-x-auto scrollbar-hide -mx-6 px-6">
          {sakes.map((sake) => (
            <SakeCard key={sake.name} sake={sake} variant="mobile" />
          ))}
        </div>

        {/* PC: 3-column grid */}
        <div className="hidden md:grid grid-cols-3 gap-10">
          {sakes.map((sake) => (
            <SakeCard key={sake.name} sake={sake} variant="desktop" />
          ))}
        </div>
      </div>
    </section>
  );
}
