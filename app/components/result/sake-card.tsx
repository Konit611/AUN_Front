import type { SakeRecommendation } from "@/app/lib/types";

interface SakeCardProps {
  sake: SakeRecommendation;
  variant: "mobile" | "desktop";
}

export default function SakeCard({ sake, variant }: SakeCardProps) {
  if (variant === "mobile") {
    return <MobileSakeCard sake={sake} />;
  }
  return <DesktopSakeCard sake={sake} />;
}

function MobileSakeCard({ sake }: { sake: SakeRecommendation }) {
  return (
    <div className="min-w-[280px] w-[280px] bg-surface border border-border rounded-xl p-5 shadow-sm">
      <div className="bg-surface-raised rounded-[32px] overflow-hidden">
        <div className="h-[298px] bg-surface-raised flex items-center justify-center">
          <span className="text-text-muted text-sm">🍶</span>
        </div>
      </div>
      <div className="pt-4 flex flex-col gap-3">
        <div className="flex gap-2">
          {sake.tags.map((tag) => (
            <span
              key={tag.label}
              className={`px-2 py-0.5 text-[10px] font-body font-bold tracking-[1px] rounded-sm ${
                tag.variant === "primary"
                  ? "bg-surface-raised text-accent"
                  : "bg-accent text-white"
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>
        <div>
          <h3 className="font-display font-bold text-lg leading-7 text-accent">
            {sake.name}
          </h3>
          <p className="font-body text-xs text-text-muted/70 leading-4">
            {sake.brewery}
          </p>
        </div>
        <div className="border-t border-surface-raised pt-2 flex justify-end">
          <span className="font-body font-bold text-xs text-accent flex items-center gap-1">
            詳しく見る
            <ChevronRight />
          </span>
        </div>
      </div>
    </div>
  );
}

function DesktopSakeCard({ sake }: { sake: SakeRecommendation }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-surface-raised rounded-[48px] overflow-hidden">
        <div className="h-[505px] flex items-center justify-center">
          <span className="text-text-muted text-2xl">🍶</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          {sake.tags.map((tag) => (
            <span
              key={tag.label}
              className={`px-3 py-1 text-[10px] font-body font-bold tracking-[0.5px] uppercase rounded-full ${
                tag.variant === "primary"
                  ? "bg-accent/10 text-accent"
                  : "bg-border text-text-secondary"
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>
        <h3 className="font-display text-xl leading-7 text-accent">
          {sake.name}
        </h3>
        <p className="font-body font-light text-sm text-text-secondary leading-5">
          {sake.region}・{sake.brewery} | {sake.description}
        </p>
      </div>
    </div>
  );
}

function ChevronRight() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
      <path
        d="M3 1.5l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
