import {
  SeasonalPairingCardMobile,
  SeasonalPairingCardDesktop,
} from "@/app/components/cards/seasonal-pairing-card";
import type { HomePairingCard } from "@/app/lib/types";

interface SeasonalPairingsSectionProps {
  label: string;
  items: HomePairingCard[];
}

export default function SeasonalPairingsSection({
  label,
  items,
}: SeasonalPairingsSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="bg-bg px-6 py-16 md:px-12 md:py-32">
      <div className="max-w-[1184px] mx-auto flex flex-col gap-10 md:gap-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display font-bold text-[22px] md:text-[42px] text-accent leading-tight">
            特集ペアリング
          </h2>
          <span className="text-xs md:text-sm text-accent/60 tracking-widest uppercase whitespace-nowrap">
            {label}
          </span>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:hidden">
          {items.map((item) => (
            <SeasonalPairingCardMobile key={item.id} {...item} />
          ))}
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-10">
          {items.map((item) => (
            <SeasonalPairingCardDesktop key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
