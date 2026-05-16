"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import type {
  PaginatedResponse,
  SakanaCategory,
  SakanaListItem,
} from "@/app/lib/types";
import EmptyState from "@/app/components/ui/empty-state";

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "易しい",
  medium: "ふつう",
  hard: "難しい",
};

function totalTime(s: SakanaListItem): string | null {
  const a = s.prepTimeMin ?? 0;
  const b = s.cookTimeMin ?? 0;
  const total = a + b;
  return total > 0 ? `${total}分` : null;
}

function SakanaCard({ sakana }: { sakana: SakanaListItem }) {
  const time = totalTime(sakana);
  const difficulty = sakana.difficulty
    ? DIFFICULTY_LABEL[sakana.difficulty] ?? sakana.difficulty
    : null;

  return (
    <Link
      href={`/sakana/${sakana.id}`}
      className="group block bg-surface-raised border border-border rounded-tl-[32px] rounded-br-[32px] md:rounded-tl-[48px] md:rounded-br-[48px] overflow-hidden hover:border-accent transition-colors"
    >
      <div className="bg-white m-4 rounded-tl-[24px] rounded-br-[24px] md:rounded-tl-[32px] md:rounded-br-[32px] overflow-hidden">
        <div className="h-[200px] md:h-[260px] flex items-center justify-center">
          {sakana.foodImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={sakana.foodImageUrl}
              alt={sakana.name}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
            />
          ) : (
            <span className="text-7xl md:text-8xl group-hover:scale-110 transition-transform">
              {sakana.emoji}
            </span>
          )}
        </div>
      </div>
      <div className="px-6 pb-6 pt-2 flex flex-col gap-3">
        <h3 className="font-display font-bold text-lg md:text-xl text-accent group-hover:text-accent-hover transition-colors">
          {sakana.name}
        </h3>
        <div className="flex flex-wrap gap-2">
          {time && (
            <span className="px-3 py-0.5 text-[10px] font-body font-bold tracking-widest uppercase rounded-full bg-accent/10 text-accent">
              {time}
            </span>
          )}
          {difficulty && (
            <span className="px-3 py-0.5 text-[10px] font-body font-bold tracking-widest uppercase rounded-full border border-accent/40 text-accent">
              {difficulty}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function SakanaListPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <SakanaListPageInner />
    </Suspense>
  );
}

function SakanaListPageInner() {
  const params = useSearchParams();
  const initialCategory = params.get("category");

  const [items, setItems] = useState<SakanaListItem[]>([]);
  const [categories, setCategories] = useState<SakanaCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategory,
  );
  const [loadState, setLoadState] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  useEffect(() => {
    apiFetch<SakanaCategory[]>("/sakana-categories").then(setCategories);
  }, []);

  useEffect(() => {
    const qs = activeCategory ? `?category=${activeCategory}` : "";
    setLoadState("loading");
    apiFetch<PaginatedResponse<SakanaListItem>>(`/sakana${qs}`)
      .then((data) => {
        setItems(data.items);
        setLoadState("loaded");
      })
      .catch(() => setLoadState("error"));
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-bg">
      <div className="px-6 md:px-8 lg:px-12 pt-8 md:pt-16 pb-32 md:pb-24 max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-2 mb-8 md:mb-12">
          <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
            Sakana Notebook
          </span>
          <h1 className="font-display font-bold text-[28px] md:text-[60px] md:leading-none md:tracking-tight text-accent">
            肴帖
          </h1>
          <p className="font-body text-sm text-text-secondary leading-relaxed mt-1">
            日本酒に寄り添う一皿。素材と味わいから探す、酒の肴のレシピ帖。
          </p>
        </div>

        {/* Mobile filter chips */}
        <div className="md:hidden flex gap-2 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 mb-2">
          <FilterChip
            label="すべて"
            active={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          />
          {categories.map((c) => (
            <FilterChip
              key={c.id}
              label={c.label}
              active={activeCategory === c.slug}
              onClick={() => setActiveCategory(c.slug)}
            />
          ))}
        </div>

        <div className="md:flex md:gap-12 md:pt-4">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-56 shrink-0">
            <h3 className="font-body font-bold text-[10px] tracking-widest uppercase text-text-secondary mb-6">
              Category
            </h3>
            <div className="flex flex-col gap-3">
              <SidebarItem
                label="すべて"
                active={activeCategory === null}
                onClick={() => setActiveCategory(null)}
              />
              {categories.map((c) => (
                <SidebarItem
                  key={c.id}
                  label={c.label}
                  active={activeCategory === c.slug}
                  onClick={() => setActiveCategory(c.slug)}
                />
              ))}
            </div>
          </aside>

          <div className="flex-1">
            {loadState === "error" ? (
              <EmptyState
                title="肴データを表示できませんでした"
                description="一時的に情報を取得できませんでした。しばらくしてから再度お試しください。"
                actionLabel="ホームに戻る"
                actionHref="/"
              />
            ) : items.length === 0 ? (
              <p className="font-body text-sm text-text-muted text-center py-12">
                {loadState === "loading"
                  ? "読み込み中..."
                  : "条件に一致する肴がありません"}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {items.map((sakana) => (
                  <SakanaCard key={sakana.id} sakana={sakana} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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

function SidebarItem({
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
      className={`text-left px-6 py-2.5 rounded-full font-body font-medium text-sm transition-colors cursor-pointer ${
        active
          ? "bg-accent text-white"
          : "bg-surface-raised text-text-primary hover:bg-accent-light"
      }`}
    >
      {label}
    </button>
  );
}
