import type { PairingRecommendation } from "@/app/lib/mock-data";

interface PairingCardProps {
  pairing: PairingRecommendation;
  variant: "mobile" | "desktop";
}

export default function PairingCard({ pairing, variant }: PairingCardProps) {
  if (variant === "mobile") {
    return <MobilePairingCard pairing={pairing} />;
  }
  return <DesktopPairingCard pairing={pairing} />;
}

function MobilePairingCard({
  pairing,
}: {
  pairing: PairingRecommendation;
}) {
  return (
    <div className="bg-surface-raised rounded-[48px] p-6 flex flex-col gap-8">
      <div className="h-40 rounded-[32px] bg-border/30 overflow-hidden flex items-center justify-center">
        <span className="text-4xl">{pairing.emoji}</span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl drop-shadow-sm">{pairing.emoji}</span>
            <h3 className="font-display font-bold text-lg text-accent">
              {pairing.foodName}{" "}
              <span className="font-body font-normal text-text-muted/40">
                ×
              </span>{" "}
              {pairing.sakeName}
            </h3>
          </div>
          <span className="px-2 py-0.5 text-[9px] font-body font-bold text-white bg-accent rounded-sm whitespace-nowrap">
            {pairing.temperature}
          </span>
        </div>
        <p className="font-body text-sm text-text-secondary leading-relaxed">
          {pairing.description}
        </p>
      </div>
    </div>
  );
}

function DesktopPairingCard({
  pairing,
}: {
  pairing: PairingRecommendation;
}) {
  return (
    <div className="bg-surface border border-border/10 rounded-[48px] p-8 flex items-center gap-8 shadow-[0px_20px_40px_0px_rgba(43,58,103,0.04)]">
      <span className="text-4xl shrink-0">{pairing.emoji}</span>
      <div className="flex-1 flex flex-col gap-1">
        <h4 className="font-body font-bold text-base text-accent leading-6">
          {pairing.foodName} × {pairing.sakeName}
        </h4>
        <p className="font-body font-light text-sm text-text-secondary leading-5">
          {pairing.description}
        </p>
      </div>
      <svg
        width="20"
        height="10"
        viewBox="0 0 20 10"
        fill="none"
        className="shrink-0 text-accent/30"
      >
        <path
          d="M1 5h18M15 1l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
