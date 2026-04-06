import { notFound } from "next/navigation";
import Link from "next/link";
import DetailHeader from "@/app/components/layout/detail-header";
import { apiFetch } from "@/app/lib/api";
import type { PairingGuideItem, PairingCategory } from "@/app/lib/types";

interface PairingDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PairingDetailPage({
  params,
}: PairingDetailPageProps) {
  const { id } = await params;

  let pairing: PairingGuideItem;
  let categories: PairingCategory[];
  try {
    [pairing, categories] = await Promise.all([
      apiFetch<PairingGuideItem>(`/pairing-guide/items/${id}`),
      apiFetch<PairingCategory[]>("/pairing-guide/categories"),
    ]);
  } catch {
    notFound();
  }
  const category = categories.find((c) => c.items.some((item) => item.id === id));
  const related = (category?.items ?? [])
    .filter((item) => item.id !== id)
    .slice(0, 2);

  return (
    <div className="bg-bg min-h-screen">
      <DetailHeader backHref="/pairing" />

      {/* ── Hero ──────────────────────────────────── */}
      <div className="bg-surface-raised">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          {/* Desktop Breadcrumb */}
          <nav className="hidden md:flex items-center gap-2 text-xs font-body tracking-wider uppercase text-text-secondary pt-8">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <Chevron />
            <Link href="/pairing" className="hover:text-accent transition-colors">Pairing Guide</Link>
            {category && (
              <>
                <Chevron />
                <span className="text-text-secondary">{category.label}</span>
              </>
            )}
            <Chevron />
            <span className="font-bold text-accent">{pairing.foodName}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 pt-6 md:pt-12 pb-10 md:pb-16">
            {/* Text */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-[10px] font-body font-bold tracking-widest uppercase rounded-full bg-accent/10 text-accent">
                  {pairing.season}
                </span>
                <span className="px-3 py-1 text-[10px] font-body font-bold tracking-widest uppercase rounded-full bg-accent/10 text-accent">
                  {pairing.temperature}
                </span>
              </div>
              <h1 className="font-display font-bold text-[28px] md:text-[48px] leading-tight tracking-tight text-accent">
                {pairing.emoji} {pairing.foodName}
              </h1>
              <p className="font-body font-medium text-lg md:text-xl text-text-secondary">
                &times; {pairing.sakeName}
              </p>
              <p className="font-body text-sm text-text-muted">
                {pairing.sakeBrewery} / {pairing.sakeType}
              </p>
            </div>

            {/* Image placeholders */}
            <div className="flex gap-4 md:gap-6 md:shrink-0">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-[32px] md:rounded-[48px] bg-bg flex items-center justify-center">
                <span className="text-5xl md:text-7xl">{pairing.emoji}</span>
              </div>
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-[32px] md:rounded-[48px] bg-bg flex items-center justify-center">
                <span className="text-5xl md:text-7xl">🍶</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────── */}
      <div className="max-w-[720px] mx-auto px-6 md:px-8 py-10 md:py-16 flex flex-col gap-10 md:gap-14">
        {/* Introduction */}
        <p className="font-body text-base md:text-lg text-text-primary/85 leading-[1.9]">
          {pairing.body}
        </p>

        {/* Why it works */}
        <section className="flex flex-col gap-3">
          <h2 className="font-display font-bold text-xl md:text-2xl text-accent">
            なぜ合うのか
          </h2>
          <p className="font-body text-base md:text-lg text-text-primary/85 leading-[1.9]">
            {pairing.whyItWorks}
          </p>
        </section>

        {/* How to enjoy */}
        <section className="flex flex-col gap-3">
          <h2 className="font-display font-bold text-xl md:text-2xl text-accent">
            楽しみ方
          </h2>
          <p className="font-body text-base md:text-lg text-text-primary/85 leading-[1.9]">
            {pairing.howToEnjoy}
          </p>
        </section>

        {/* Specs card */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <SpecRow label="料理" value={`${pairing.emoji} ${pairing.foodName}`} />
          <SpecRow label="日本酒" value={pairing.sakeName} />
          <SpecRow label="蔵元" value={pairing.sakeBrewery} />
          <SpecRow label="種類" value={pairing.sakeType} />
          <SpecRow label="温度" value={pairing.temperature} />
          <SpecRow label="季節" value={pairing.season} />
        </div>
      </div>

      {/* ── Related ───────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10 md:py-16">
            <h2 className="font-display font-bold text-xl md:text-2xl text-accent mb-6 md:mb-8">
              同じカテゴリのペアリング
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/pairing/${item.id}`}
                  className="group flex gap-4 items-center bg-surface border border-border rounded-2xl p-4 hover:border-accent transition-colors"
                >
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-surface-raised flex items-center justify-center">
                    <span className="text-2xl">{item.emoji}</span>
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="font-display font-bold text-base text-accent group-hover:text-accent-hover transition-colors truncate">
                      {item.emoji} {item.foodName} &times; {item.sakeName}
                    </h3>
                    <p className="font-body text-xs text-text-muted truncate">
                      {item.temperature} / {item.season}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Back link ─────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pb-32 md:pb-16">
        <Link
          href="/pairing"
          className="inline-flex items-center gap-2 font-body font-bold text-sm text-accent hover:text-accent-hover transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7 1L3 5L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ペアリング一覧に戻る
        </Link>
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-4 px-5 py-3 border-b border-border/50 last:border-b-0">
      <span className="font-body font-bold text-xs text-accent/60 tracking-wider w-14 shrink-0">
        {label}
      </span>
      <span className="font-body text-sm text-text-primary">{value}</span>
    </div>
  );
}

function Chevron() {
  return (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
      <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
