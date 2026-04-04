"use client";

import { useState } from "react";
import Link from "next/link";
import {
  getAllCategories,
  getSeasonFilters,
  getFoodCategoryFilters,
  type PairingGuideItem,
} from "@/app/lib/mock-pairing-guide";

const categories = getAllCategories();
const seasonFilters = getSeasonFilters();
const foodCategoryFilters = getFoodCategoryFilters();

/* ── Shared Components ─────────────────────────────────── */

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-body font-medium text-sm whitespace-nowrap transition-colors cursor-pointer ${
        active
          ? "bg-accent text-white"
          : "bg-accent-light text-accent hover:bg-accent/20"
      }`}
    >
      {label}
    </button>
  );
}

function PairingCardMobile({ item }: { item: PairingGuideItem }) {
  return (
    <Link href={`/pairing/${item.id}`} className="group block bg-surface border border-border rounded-2xl p-4 shadow-[0px_4px_20px_0px_rgba(43,58,103,0.03)] hover:border-accent transition-colors">
      <div className="flex gap-2 mb-2">
        <span className="px-2 py-0.5 text-[10px] font-body font-bold tracking-tight rounded-full bg-surface-raised text-accent uppercase">
          {item.temperature}
        </span>
        <span className="px-2 py-0.5 text-[10px] font-body font-bold tracking-tight rounded-full bg-surface-raised text-accent uppercase">
          {item.season}
        </span>
      </div>

      <h3 className="font-display font-bold text-lg text-text-primary">
        {item.emoji} {item.foodName}{" "}
        <span className="text-accent/30">&times;</span> {item.sakeName}
      </h3>

      <div className="flex gap-4 mt-3">
        <div className="w-24 h-24 rounded-[32px] bg-surface-raised overflow-hidden flex items-center justify-center">
          <span className="text-4xl">{item.emoji}</span>
        </div>
        <div className="w-24 h-24 rounded-[32px] bg-surface-raised overflow-hidden flex items-center justify-center">
          <span className="text-4xl">🍶</span>
        </div>
      </div>

      <p className="font-body text-sm text-text-secondary leading-relaxed mt-4">
        {item.description}
      </p>

      <div className="flex justify-end mt-4">
        <span className="font-body font-bold text-sm text-accent flex items-center gap-1 group-hover:text-accent-hover transition-colors">
          詳しく見る
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function PairingCardDesktop({ item }: { item: PairingGuideItem }) {
  return (
    <Link href={`/pairing/${item.id}`} className="group block bg-surface border border-border/20 rounded-tl-[48px] overflow-hidden hover:border-accent transition-colors">
      <div className="relative h-[360px] lg:h-[420px] bg-surface-raised overflow-hidden flex items-center justify-center">
        <span className="text-8xl group-hover:scale-110 transition-transform">{item.emoji}</span>
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          <span className="px-3 py-1 text-[10px] font-body font-bold tracking-wider rounded-full bg-accent/90 text-white backdrop-blur-sm uppercase">
            {item.season}
          </span>
          <span className="px-3 py-1.5 text-[10px] font-body font-bold tracking-wider rounded-full bg-white/90 text-accent border border-accent/10 backdrop-blur-sm uppercase">
            {item.temperature}
          </span>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-2">
        <h3 className="font-display font-bold text-2xl text-accent">
          {item.emoji} {item.foodName}
        </h3>
        <p className="font-body font-medium text-lg text-text-secondary">
          &times; {item.sakeName}
        </p>
        <p className="font-body text-sm text-text-secondary leading-relaxed pt-2">
          {item.description}
        </p>
        <span className="font-body font-bold text-xs text-accent tracking-wider uppercase flex items-center gap-2 pt-6 group-hover:text-accent-hover transition-colors">
          詳しく見る
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

/* ── Filtering Logic ───────────────────────────────────── */

function useFilteredItems(
  activeSeason: string,
  activeFood: string | null
) {
  const displayed = activeFood
    ? categories.filter((c) => c.slug === activeFood)
    : categories;

  const seasonFilter = seasonFilters.find((f) => f.key === activeSeason);

  const items = displayed.flatMap((cat) =>
    cat.items.filter((item) => {
      if (activeSeason === "all" || activeSeason === "your-type") return true;
      return seasonFilter && "match" in seasonFilter
        ? item.season === seasonFilter.match
        : true;
    })
  );

  return { items, count: items.length };
}

/* ── Page ──────────────────────────────────────────────── */

export default function PairingGuidePage() {
  const [activeSeason, setActiveSeason] = useState("all");
  const [activeFood, setActiveFood] = useState<string | null>(null);

  const { items, count } = useFilteredItems(activeSeason, activeFood);

  const title = activeFood
    ? categories.find((c) => c.slug === activeFood)?.title ?? "ペアリングガイド"
    : "ペアリングガイド";

  return (
    <div className="min-h-screen bg-bg">
      {/* ── Mobile ────────────────────────────────────── */}
      <div className="md:hidden px-6 pt-8 pb-32">
        <div className="flex flex-col gap-1 mb-6">
          <h1 className="font-display font-bold text-[28px] text-accent">
            {title}
          </h1>
          <p className="font-body font-medium text-sm text-text-secondary tracking-wider">
            {count}件のペアリング
          </p>
        </div>

        {/* Season / condition filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 -mx-6 px-6">
          {seasonFilters.map((f) => (
            <FilterChip
              key={f.key}
              label={f.label}
              active={activeSeason === f.key}
              onClick={() => setActiveSeason(f.key)}
            />
          ))}
        </div>

        {/* Food category filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6">
          <FilterChip
            label="すべての料理"
            active={activeFood === null}
            onClick={() => setActiveFood(null)}
          />
          {foodCategoryFilters.map((f) => (
            <FilterChip
              key={f.key}
              label={f.label}
              active={activeFood === f.key}
              onClick={() => setActiveFood(activeFood === f.key ? null : f.key)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <PairingCardMobile key={item.id} item={item} />
          ))}
          {items.length === 0 && (
            <p className="font-body text-sm text-text-muted text-center py-12">
              条件に一致するペアリングがありません
            </p>
          )}
        </div>
      </div>

      {/* ── Desktop ───────────────────────────────────── */}
      <div className="hidden md:block px-8 lg:px-12 pt-16 pb-24 max-w-[1280px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-body tracking-wider uppercase text-text-secondary mb-12">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <Link href="/pairing" className="hover:text-accent transition-colors" onClick={() => { setActiveFood(null); setActiveSeason("all"); }}>
            Pairing Guide
          </Link>
          {activeFood && (
            <>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-bold text-accent">
                {categories.find((c) => c.slug === activeFood)?.label}
              </span>
            </>
          )}
        </nav>

        {/* Header */}
        <div className="flex flex-col gap-4 mb-12">
          <h1 className="font-display font-bold text-[60px] leading-none tracking-tight text-accent">
            {title}
          </h1>
          <p className="font-body text-sm text-text-secondary tracking-wider uppercase">
            {count}件のペアリング found for this category
          </p>
        </div>

        {/* Sidebar + Grid */}
        <div className="flex gap-12 pt-4">
          <aside className="w-64 shrink-0 flex flex-col gap-10">
            {/* Food category */}
            <div>
              <h3 className="font-body font-bold text-[10px] tracking-widest uppercase text-text-secondary mb-6">
                Food Category
              </h3>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setActiveFood(null)}
                  className={`text-left px-6 py-2.5 rounded-full font-body font-medium text-sm transition-colors cursor-pointer ${
                    activeFood === null
                      ? "bg-accent text-white"
                      : "bg-surface-raised text-text-primary hover:bg-accent-light"
                  }`}
                >
                  すべて
                </button>
                {foodCategoryFilters.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setActiveFood(activeFood === f.key ? null : f.key)}
                    className={`text-left px-6 py-2.5 rounded-full font-body font-medium text-sm transition-colors cursor-pointer ${
                      activeFood === f.key
                        ? "bg-accent text-white"
                        : "bg-surface-raised text-text-primary hover:bg-accent-light"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Season / condition */}
            <div>
              <h3 className="font-body font-bold text-[10px] tracking-widest uppercase text-text-secondary mb-6">
                Season / Condition
              </h3>
              <div className="flex flex-col gap-3">
                {seasonFilters.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setActiveSeason(f.key)}
                    className={`text-left px-6 py-2.5 rounded-full font-body font-medium text-sm transition-colors cursor-pointer ${
                      activeSeason === f.key
                        ? "bg-accent text-white"
                        : "bg-surface-raised text-text-primary hover:bg-accent-light"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Cards Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {items.map((item) => (
                <PairingCardDesktop key={item.id} item={item} />
              ))}
            </div>
            {items.length === 0 && (
              <p className="font-body text-sm text-text-muted text-center py-24">
                条件に一致するペアリングがありません
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
