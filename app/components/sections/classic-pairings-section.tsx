import SectionHeading from "@/app/components/ui/section-heading";
import ClassicPairingCard from "@/app/components/cards/classic-pairing-card";

const pairings = [
  {
    emoji: "🍣",
    food: "寿司（白身・赤身）",
    sake: "醸し人九平次",
    temperature: "冷酒 5-10°C",
    description:
      "シャリの酸味とネタの甘みを、九平次のモダンな酸が包み込みます。",
  },
  {
    emoji: "🥩",
    food: "牛すき焼き",
    sake: "獺祭 純米大吟醸 45",
    temperature: "常温 15-20°C",
    description:
      "濃厚な割り下の味わいを、獺祭のキレのある後口がリセットします。",
  },
  {
    emoji: "🧀",
    food: "ブルーチーズ",
    sake: "新政 No.6 S-type",
    temperature: "冷酒 5-8°C",
    description:
      "チーズの塩気と、新政のクリーミーな質感が最高のマリアージュを奏でます。",
  },
  {
    emoji: "🥢",
    food: "お出汁の湯豆腐",
    sake: "菊姫 山廃仕込",
    temperature: "熱燗 45-50°C",
    description:
      "山廃特有のコクと温度が、お出汁の繊細な風味を奥深く広げます。",
  },
];

export default function ClassicPairingsSection() {
  return (
    <section className="bg-bg px-6 py-16 md:px-12 md:py-32">
      <div className="max-w-[1184px] mx-auto flex flex-col gap-10 md:gap-20">
        <SectionHeading
          title="定番ペアリング"
          subtitle="TIMELESS CLASSICS"
          linkText="すべて見る"
          linkHref="/pairing"
        />

        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10">
          {pairings.map((pairing) => (
            <ClassicPairingCard key={pairing.food} {...pairing} />
          ))}
        </div>
      </div>
    </section>
  );
}
