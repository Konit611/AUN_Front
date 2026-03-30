import SectionHeading from "@/app/components/ui/section-heading";
import SeasonalPairingCard from "@/app/components/cards/seasonal-pairing-card";

const pairings = [
  {
    emoji: "🦪",
    food: "牡蠣フライ",
    sake: "久保田 萬寿",
    temperature: "冷酒 5-10°C",
    description:
      "揚げたてのサクサク感と、萬寿の華やかな香りが絶妙なコントラストを生みます。",
  },
  {
    emoji: "🐟",
    food: "戻り鰹のたたき",
    sake: "南部美人 特別純米",
    temperature: "冷酒 8-12°C",
    description:
      "鰹の脂に負けない純米酒の力強い旨味が、素材の味を一層引き立てます。",
  },
  {
    emoji: "🍆",
    food: "秋茄子の煮浸し",
    sake: "八海山 醸造",
    temperature: "ぬる燗 40°C",
    description:
      "出汁の旨味と、温めることで開くお酒の香りが穏やかな時間を提供します。",
  },
];

export default function SeasonalPairingsSection() {
  return (
    <section className="bg-bg px-6 py-16 md:px-12 md:py-32">
      <div className="max-w-[1184px] mx-auto flex flex-col gap-10 md:gap-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display font-bold text-[22px] md:text-[42px] text-accent leading-tight">
            季節のペアリング
          </h2>
          <span className="text-xs md:text-sm text-accent/60 tracking-widest uppercase whitespace-nowrap">
            SPRING Collection
          </span>
        </div>

        {/* Mobile: horizontal scroll / Desktop: 3-column grid */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:gap-10 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {pairings.map((pairing) => (
            <SeasonalPairingCard key={pairing.food} {...pairing} />
          ))}
        </div>
      </div>
    </section>
  );
}
