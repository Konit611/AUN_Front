import type { PairingRecommendation } from "@/app/lib/mock-data";
import PairingCard from "./pairing-card";

interface PairingsSectionProps {
  pairings: PairingRecommendation[];
  title: string;
  description: string;
}

export default function PairingsSection({
  pairings,
  title,
  description,
}: PairingsSectionProps) {
  return (
    <section className="bg-surface px-6 py-24 md:bg-bg md:px-8 md:py-0">
      <div className="max-w-[1280px] mx-auto">
        {/* Mobile */}
        <div className="md:hidden">
          <div className="flex flex-col gap-3 items-center mb-16">
            <p className="font-body text-[10px] text-text-muted/40 tracking-[3px] uppercase">
              Flavor Harmony
            </p>
            <h2 className="font-display text-[30px] leading-9 text-accent text-center">
              あなたにおすすめのペアリング
            </h2>
          </div>
          <div className="flex flex-col gap-8">
            {pairings.map((pairing) => (
              <PairingCard
                key={pairing.foodName}
                pairing={pairing}
                variant="mobile"
              />
            ))}
          </div>
        </div>

        {/* PC: 12-column grid */}
        <div className="hidden md:grid grid-cols-12 gap-16">
          <div className="col-span-4 flex flex-col gap-4">
            <p className="font-body font-bold text-xs text-accent tracking-[2.4px] uppercase">
              The Alchemy of Flavor
            </p>
            <h2 className="font-display text-4xl leading-10 text-accent">
              {title}
            </h2>
            <p className="font-body font-light text-base text-text-secondary leading-relaxed pt-2">
              {description}
            </p>
          </div>
          <div className="col-span-8 flex flex-col gap-6">
            {pairings.map((pairing) => (
              <PairingCard
                key={pairing.foodName}
                pairing={pairing}
                variant="desktop"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
