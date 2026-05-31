"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import type {
  PairingCategory,
  PairingGuideListItem,
  PairingGuideResponse,
} from "@/app/lib/types";
import EmptyState from "@/app/components/ui/empty-state";

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

function PairingCardMobile({ item }: { item: PairingGuideListItem }) {
  return (
    <Link href={`/pairing/${item.id}`} className="group block bg-surface border border-border rounded-2xl p-4 shadow-[0px_4px_20px_0px_rgba(43,58,103,0.03)] hover:border-accent transition-colors">
      <div className="flex gap-2 mb-2">
        {item.temperature && (
          <span className="px-2 py-0.5 text-[10px] font-body font-bold tracking-tight rounded-full bg-surface-raised text-accent uppercase">
            {item.temperature}
          </span>
        )}
      </div>

      <h3 className="font-display font-bold text-lg text-text-primary">
        {item.emoji} {item.foodName}{" "}
        <span className="text-accent/30">&times;</span> {item.sakeName}
      </h3>

      <div className="flex gap-4 mt-3">
        <div className="w-24 h-24 rounded-[32px] bg-surface-raised overflow-hidden flex items-center justify-center">
          {item.heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.heroImage} alt={item.foodName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl">{item.emoji}</span>
          )}
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

function PairingCardDesktop({ item }: { item: PairingGuideListItem }) {
  return (
    <Link href={`/pairing/${item.id}`} className="group block bg-surface border border-border/20 rounded-tl-[48px] overflow-hidden hover:border-accent transition-colors">
      <div className="relative h-[360px] lg:h-[420px] bg-surface-raised overflow-hidden flex items-center justify-center">
        {item.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.heroImage} alt={item.foodName} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
        ) : (
          <span className="text-8xl group-hover:scale-110 transition-transform">{item.emoji}</span>
        )}
        {item.temperature && (
          <div className="absolute top-6 right-6">
            <span className="px-3 py-1.5 text-[10px] font-body font-bold tracking-wider rounded-full bg-white/90 text-accent border border-accent/10 backdrop-blur-sm uppercase">
              {item.temperature}
            </span>
          </div>
        )}
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

/* ── Page ──────────────────────────────────────────────── */

export default function PairingGuidePage() {
  const [categories, setCategories] = useState<PairingCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    apiFetch<PairingGuideResponse>("/pairing-guide")
      .then((data) => {
        setCategories(data.categories);
        setLoadState("loaded");
      })
      .catch(() => setLoadState("error"));
  }, []);

  const displayed = activeCategory
    ? categories.filter((c) => c.slug === activeCategory)
    : categories;
  const items = displayed.flatMap((cat) => cat.items);
  const count = items.length;

  const title = activeCategory
    ? categories.find((c) => c.slug === activeCategory)?.title ?? "ペアリングガイド"
    : "ペアリングガイド";

  if (loadState === "error") {
    return (
      <div className="min-h-screen bg-bg">
        <EmptyState
          title="ペアリング情報を表示できませんでした"
          description="一時的に情報を取得できませんでした。しばらくしてから再度お試しください。"
          actionLabel="ホームに戻る"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* ── Mobile ────────────────────────────────────── */}
      <div className="md:hidden px-6 pt-8 pb-32">
        <div className="flex flex-col gap-2 mb-8">
          <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
            Pairing Guide
          </span>
          <h1 className="font-display font-bold text-[28px] text-accent">
            {title}
          </h1>
          <p className="font-body font-medium text-sm text-text-secondary tracking-wider">
            {count}件のペアリング
          </p>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6">
          <FilterChip
            label="すべて"
            active={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          />
          {categories.map((c) => (
            <FilterChip
              key={c.slug}
              label={c.label}
              active={activeCategory === c.slug}
              onClick={() => setActiveCategory(c.slug)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <PairingCardMobile key={item.id} item={item} />
          ))}
          {items.length === 0 && (
            <p className="font-body text-sm text-text-muted text-center py-12">
              ペアリングがありません
            </p>
          )}
        </div>
      </div>

      {/* ── Desktop ───────────────────────────────────── */}
      <div className="hidden md:block px-8 lg:px-12 pt-16 pb-24 max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
            Pairing Guide
          </span>
          <h1 className="font-display font-bold text-[60px] leading-none tracking-tight text-accent">
            {title}
          </h1>
          <p className="font-body text-sm text-text-secondary tracking-wider uppercase">
            {count}件のペアリング
          </p>
        </div>

        {/* Sidebar + Grid */}
        <div className="flex gap-12 pt-4">
          <aside className="w-64 shrink-0">
            <h3 className="font-body font-bold text-[10px] tracking-widest uppercase text-text-secondary mb-6">
              Category
            </h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setActiveCategory(null)}
                className={`text-left px-6 py-2.5 rounded-full font-body font-medium text-sm transition-colors cursor-pointer ${
                  activeCategory === null
                    ? "bg-accent text-white"
                    : "bg-surface-raised text-text-primary hover:bg-accent-light"
                }`}
              >
                すべて
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setActiveCategory(c.slug)}
                  className={`text-left px-6 py-2.5 rounded-full font-body font-medium text-sm transition-colors cursor-pointer ${
                    activeCategory === c.slug
                      ? "bg-accent text-white"
                      : "bg-surface-raised text-text-primary hover:bg-accent-light"
                  }`}
                >
                  {c.label}
                </button>
              ))}
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
                ペアリングがありません
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
