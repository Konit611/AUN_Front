import { notFound } from "next/navigation";
import Link from "next/link";
import DetailHeader from "@/app/components/layout/detail-header";
import { getJournalEntry, type SakeProfile } from "@/app/lib/mock-journal";
import StarRating from "@/app/components/mypage/star-rating";

interface JournalDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JournalDetailPage({
  params,
}: JournalDetailPageProps) {
  const { id } = await params;
  const entry = getJournalEntry(id);

  if (!entry) {
    notFound();
  }

  return (
    <div className="bg-bg min-h-screen">
      <DetailHeader backHref="/mypage" />

      {/* Desktop breadcrumb */}
      <div className="hidden md:block max-w-[1280px] mx-auto px-8 pt-12">
        <nav className="flex items-center gap-2 text-xs font-body tracking-wider uppercase text-text-secondary">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <ChevronRight />
          <Link href="/mypage" className="hover:text-accent transition-colors">
            マイページ
          </Link>
          <ChevronRight />
          <span className="font-bold text-accent">{entry.sakeName}</span>
        </nav>
      </div>

      <div className="max-w-[720px] mx-auto px-6 md:px-8 pt-6 md:pt-12 pb-32 md:pb-24">
        {/* Image */}
        <div className="bg-surface border border-border rounded-[48px] overflow-hidden">
          <div className="aspect-[4/3] bg-surface-raised flex items-center justify-center">
            <span className="text-6xl">🍶</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 mt-8">
          {/* Category + Date */}
          <div className="flex items-center gap-3">
            {entry.category && (
              <span className="px-3 py-1 text-[10px] font-body font-bold tracking-widest uppercase rounded-full bg-accent/10 text-accent">
                {entry.category}
              </span>
            )}
            <span className="text-xs font-body text-text-muted">
              {entry.date}
            </span>
          </div>

          {/* Name + Brewery */}
          <div className="flex flex-col gap-1">
            <h1 className="font-display font-bold text-[28px] md:text-[40px] leading-tight text-accent">
              {entry.sakeName}
            </h1>
            {entry.brewery && (
              <p className="font-body font-medium text-base text-text-secondary">
                {entry.brewery}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-2">
            <span className="font-body font-bold text-xs text-text-secondary/70 tracking-wider uppercase">
              Rating
            </span>
            <StarRating rating={entry.rating} size="md" />
          </div>

          {/* 4-Axis Profile */}
          <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col gap-4">
            <span className="font-body font-bold text-[10px] text-accent/60 tracking-widest uppercase">
              Sake Profile
            </span>
            <ProfileAxis label={["甘口", "辛口"]} value={entry.tasting.profile.sweetDry} />
            <ProfileAxis label={["重厚", "軽快"]} value={entry.tasting.profile.heavyLight} />
            <ProfileAxis label={["華やか", "穏やか"]} value={entry.tasting.profile.richCalm} />
            <ProfileAxis label={["力強い", "滑らか"]} value={entry.tasting.profile.boldSmooth} />
          </div>

          {/* Tasting Detail */}
          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            <TastingRow label="香り" value={entry.tasting.aroma} />
            <TastingRow label="味わい" value={entry.tasting.taste} />
            <TastingRow label="余韻" value={entry.tasting.finish} />
            <TastingRow label="温度" value={entry.tasting.temperature} />
            {entry.tasting.pairing && (
              <TastingRow label="相性" value={entry.tasting.pairing} />
            )}
          </div>

          {entry.tasting.memo && (
            <div className="bg-surface-raised rounded-2xl px-5 py-4">
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                {entry.tasting.memo}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileAxis({
  label,
  value,
}: {
  label: [string, string];
  value: number;
}) {
  // value 0~100, 50が中央。ドットを左端(0%)~右端(100%)に配置
  return (
    <div className="flex items-center gap-3">
      <span className="font-body font-bold text-xs text-accent w-14 text-right shrink-0">
        {label[0]}
      </span>
      <div className="flex-1 relative h-6 flex items-center">
        {/* Track */}
        <div className="w-full h-[2px] bg-border rounded-full" />
        {/* Center tick */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-2 bg-border" />
        {/* Dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent shadow-sm"
          style={{ left: `calc(${value}% - 6px)` }}
        />
      </div>
      <span className="font-body font-bold text-xs text-accent w-14 shrink-0">
        {label[1]}
      </span>
    </div>
  );
}

function TastingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-4 px-5 py-3 border-b border-border/50 last:border-b-0">
      <span className="font-body font-bold text-xs text-accent/60 tracking-wider w-12 shrink-0">
        {label}
      </span>
      <span className="font-body text-sm text-text-primary">
        {value}
      </span>
    </div>
  );
}

function ChevronRight() {
  return (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
      <path
        d="M1 1L5 5L1 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
