import type { SakeDetail } from "@/app/lib/mock-sake-detail";

interface DetailSpecsProps {
  sake: SakeDetail;
}

export default function DetailSpecs({ sake }: DetailSpecsProps) {
  const specs = [
    { label: "Type / 特定名称", value: sake.type },
    { label: "Region / 産地", value: sake.region },
    { label: "Rice / 使用米", value: sake.rice },
    { label: "Polishing / 精米歩合", value: sake.polishing },
  ];

  return (
    <section>
      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-6">
        <div className="bg-surface-raised rounded-[48px] p-8">
          <div className="flex flex-col gap-3">
            {specs.slice(0, 2).map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between pb-2 border-b border-border/20"
              >
                <span className="font-body font-bold text-xs text-text-secondary/70 tracking-[1.2px] uppercase">
                  {spec.label.split(" / ")[0]}
                </span>
                <span className="font-body font-medium text-base text-text-primary">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-surface border border-border/10 rounded-[48px] p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <span className="font-body font-bold text-xs text-text-secondary/70 tracking-[1.2px] uppercase">
              Flavor Profile
            </span>
            <FlavorChips tags={sake.flavorTags} variant="mobile" />
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block bg-surface-raised px-8 py-24">
        <div className="grid grid-cols-3 gap-12 max-w-[1280px] mx-auto">
          <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-12">
            {specs.map((spec) => (
              <div key={spec.label} className="flex flex-col gap-3">
                <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
                  {spec.label}
                </span>
                <span className="font-display text-2xl text-accent">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-6">
            <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
              Flavor Profile
            </span>
            <FlavorChips tags={sake.flavorTags} variant="desktop" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FlavorChips({
  tags,
  variant,
}: {
  tags: { label: string; primary: boolean }[];
  variant: "mobile" | "desktop";
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <span
          key={tag.label}
          className={`px-5 py-2 rounded-full font-body font-medium text-sm ${
            variant === "desktop"
              ? tag.primary
                ? "bg-accent text-white"
                : "bg-surface-raised text-accent"
              : "bg-surface-raised text-text-secondary"
          }`}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}
