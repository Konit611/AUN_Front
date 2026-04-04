import type { SakeDetailPairing } from "@/app/lib/mock-sake-detail";

interface DetailPairingsProps {
  pairings: SakeDetailPairing[];
  sakeName: string;
}

export default function DetailPairings({
  pairings,
  sakeName,
}: DetailPairingsProps) {
  const shortName = sakeName.split(" ")[0];

  return (
    <section>
      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-8">
        <h2 className="font-display text-2xl leading-8 text-accent text-center">
          このお酒に合うペアリング
        </h2>
        <div className="flex flex-col gap-4">
          {pairings.map((pairing) => (
            <div
              key={pairing.foodName}
              className="bg-surface border border-border rounded-[48px] p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-surface-raised rounded-full overflow-hidden flex items-center justify-center shrink-0">
                  <span className="text-2xl">{pairing.emoji}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-body font-bold text-lg leading-7 text-text-primary">
                    {pairing.emoji} {pairing.foodName}
                  </span>
                  <span className="font-body text-xs text-text-secondary line-clamp-1">
                    {pairing.description}
                  </span>
                </div>
              </div>
              <span className="font-display font-bold text-base text-accent">
                {shortName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex flex-col gap-12 max-w-[1280px] mx-auto px-8 py-24">
        <div className="flex flex-col gap-2">
          <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
            Food Recommendations
          </span>
          <h2 className="font-display font-bold text-4xl text-accent">
            このお酒に合うペアリング
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {pairings.map((pairing) => (
            <div
              key={pairing.foodName}
              className="bg-surface border border-border/30 rounded-[48px] relative overflow-hidden"
            >
              <div className="mx-8 mt-8 rounded-[32px] overflow-hidden">
                <div className="h-48 bg-surface-raised flex items-center justify-center">
                  <span className="text-5xl">{pairing.emoji}</span>
                </div>
              </div>
              <div className="px-8 pt-6 pb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{pairing.emoji}</span>
                  <h3 className="font-display font-bold text-xl text-accent">
                    {pairing.foodName}
                  </h3>
                </div>
                <p className="font-body text-sm leading-[22.75px] text-text-secondary">
                  {pairing.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
