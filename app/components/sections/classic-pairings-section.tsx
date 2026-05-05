import SectionHeading from "@/app/components/ui/section-heading";
import ClassicPairingCard from "@/app/components/cards/classic-pairing-card";
import type { HomePairingCard } from "@/app/lib/types";

interface ClassicPairingsSectionProps {
  items: HomePairingCard[];
}

export default function ClassicPairingsSection({
  items,
}: ClassicPairingsSectionProps) {
  if (items.length === 0) return null;

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
          {items.map((item) => (
            <ClassicPairingCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
