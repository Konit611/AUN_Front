"use client";

import { useState } from "react";
import type { SakeDetailPairing } from "@/app/lib/types";

type TabKey = "synergy" | "contrast" | "cleanse";

const TABS: { key: TabKey; label: string; subtitle: string }[] = [
  {
    key: "synergy",
    label: "寄り添うペアリング",
    subtitle: "似た味わい同士が静かに重なる",
  },
  {
    key: "contrast",
    label: "意外な出会い",
    subtitle: "違うからこそ引き立て合う",
  },
  {
    key: "cleanse",
    label: "口直しの一杯",
    subtitle: "脂や濃さをすっと流す",
  },
];

interface DetailPairingsProps {
  pairings: SakeDetailPairing[];
  synergyPairings: SakeDetailPairing[];
  cleansePairings: SakeDetailPairing[];
  contrastPairings: SakeDetailPairing[];
}

export default function DetailPairings({
  pairings,
  synergyPairings,
  cleansePairings,
  contrastPairings,
}: DetailPairingsProps) {
  const [tab, setTab] = useState<TabKey>("synergy");
  const algoMap: Record<TabKey, SakeDetailPairing[]> = {
    synergy: synergyPairings,
    contrast: contrastPairings,
    cleanse: cleansePairings,
  };
  const activeTab = TABS.find((t) => t.key === tab)!;
  const activePairings = algoMap[tab];
  const hasManual = pairings.length > 0;

  return (
    <section className="flex flex-col gap-12 md:max-w-[1280px] md:mx-auto md:px-8 md:py-24">
      {hasManual && <ManualSection pairings={pairings} />}

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 md:gap-3">
          <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase md:block hidden">
            Discover More
          </span>
          <h2 className="font-display text-2xl md:text-4xl leading-8 md:leading-tight text-accent text-center md:text-left">
            ペアリングをもっと探す
          </h2>
        </div>

        <div className="flex gap-2 md:gap-3 px-2 md:px-0 overflow-x-auto md:flex-wrap">
          {TABS.map((t) => {
            const isActive = t.key === tab;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`shrink-0 px-5 py-3 rounded-full font-body text-sm md:text-base transition-colors duration-200 border ${
                  isActive
                    ? "bg-accent text-white border-accent"
                    : "bg-surface text-text-secondary border-border hover:border-accent/40"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <p className="font-body text-sm md:text-base text-text-secondary px-2 md:px-0 -mt-4">
          {activeTab.subtitle}
        </p>

        <PairingGrid pairings={activePairings} showDescription={false} />
      </div>
    </section>
  );
}

function ManualSection({ pairings }: { pairings: SakeDetailPairing[] }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 md:gap-3">
        <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase md:block hidden">
          Curator&apos;s Pick
        </span>
        <h2 className="font-display text-2xl md:text-4xl leading-8 md:leading-tight text-accent text-center md:text-left">
          醸造家からの一推し
        </h2>
      </div>
      <PairingGrid pairings={pairings} showDescription />
    </div>
  );
}

function PairingGrid({
  pairings,
  showDescription,
}: {
  pairings: SakeDetailPairing[];
  showDescription: boolean;
}) {
  if (pairings.length === 0) {
    return (
      <p className="font-body text-sm text-text-muted text-center py-8">
        現在おすすめできるペアリングはありません
      </p>
    );
  }

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-4">
        {pairings.map((pairing) => (
          <div
            key={pairing.foodName}
            className="bg-surface border border-border rounded-[48px] p-6 flex items-center gap-6"
          >
            <div className="w-16 h-16 bg-surface-raised rounded-full overflow-hidden flex items-center justify-center shrink-0">
              <span className="text-2xl">{pairing.emoji}</span>
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="font-body font-bold text-lg leading-7 text-text-primary truncate">
                {pairing.foodName}
              </span>
              {showDescription && pairing.description && (
                <span className="font-body text-xs text-text-secondary line-clamp-1">
                  {pairing.description}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-3 gap-8">
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
              {showDescription && pairing.description && (
                <p className="font-body text-sm leading-[22.75px] text-text-secondary">
                  {pairing.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
