import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import type { PaginatedResponse, SakanaListItem } from "@/app/lib/types";
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
      className="group block bg-surface border border-border rounded-tl-[32px] rounded-br-[32px] md:rounded-tl-[48px] md:rounded-br-[48px] overflow-hidden hover:border-accent transition-colors"
    >
      <div className="h-[200px] md:h-[260px] bg-surface-raised flex items-center justify-center overflow-hidden">
        {sakana.foodImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={sakana.foodImageUrl}
            alt={sakana.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <span className="text-7xl md:text-8xl group-hover:scale-110 transition-transform">
            {sakana.emoji}
          </span>
        )}
      </div>
      <div className="p-5 md:p-6 flex flex-col gap-3">
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

export default async function SakanaListPage() {
  let items: SakanaListItem[];
  try {
    const data = await apiFetch<PaginatedResponse<SakanaListItem>>("/sakana");
    items = data.items;
  } catch {
    items = [];
  }

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

        {items.length === 0 ? (
          <EmptyState
            title="肴データを表示できませんでした"
            description="一時的に情報を取得できませんでした。しばらくしてから再度お試しください。"
            actionLabel="ホームに戻る"
            actionHref="/"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((sakana) => (
              <SakanaCard key={sakana.id} sakana={sakana} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
