import { cookies } from "next/headers";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import type {
  AdminArticle,
  AdminPairingItem,
  AdminSakana,
  AdminSakeListItem,
} from "@/app/lib/types";

async function safeCount<T>(path: string, cookie: string): Promise<number | null> {
  try {
    const rows = await apiFetch<T[]>(path, { cookie });
    return rows.length;
  } catch {
    return null;
  }
}

export default async function AdminDashboardPage() {
  const cookie = (await cookies()).toString();

  const [sakes, sakanas, articles, pairings] = await Promise.all([
    safeCount<AdminSakeListItem>("/admin/sakes", cookie),
    safeCount<AdminSakana>("/admin/sakana", cookie),
    safeCount<AdminArticle>("/admin/articles", cookie),
    safeCount<AdminPairingItem>("/admin/pairings", cookie),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display font-bold text-3xl md:text-4xl text-accent">
          ようこそ
        </h1>
        <p className="font-body text-sm md:text-base text-text-secondary mt-2">
          AUN のコンテンツを管理します。左メニューから対象を選んでください。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <DashCard
          href="/admin/sake"
          title="日本酒"
          description="銘柄、味わいの 5 軸、ペアリング設定"
          count={sakes}
          unit="銘柄"
        />
        <DashCard
          href="/admin/sakana"
          title="肴帖"
          description="食材プロファイル 6 軸と調理レシピ"
          count={sakanas}
          unit="品"
        />
        <DashCard
          href="/admin/articles"
          title="読み物"
          description="記事の作成と編集（下書き対応）"
          count={articles}
          unit="記事"
        />
        <DashCard
          href="/admin/pairing"
          title="ペアリングガイド"
          description="キュレーションされたペアリング記事"
          count={pairings}
          unit="件"
        />
      </div>

      <Link
        href="/admin/data"
        className="self-start font-body text-sm text-text-muted hover:text-accent transition-colors"
      >
        データ管理（書き出し / 復元） →
      </Link>
    </div>
  );
}

function DashCard({
  href,
  title,
  description,
  count,
  unit,
}: {
  href: string;
  title: string;
  description: string;
  count: number | null;
  unit: string;
}) {
  return (
    <Link
      href={href}
      className="group block bg-surface border border-border rounded-2xl p-6 hover:border-accent transition-colors flex flex-col gap-3"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display font-bold text-xl text-accent">
          {title}
        </h2>
        {count !== null ? (
          <span className="font-body text-xs text-text-muted tabular-nums">
            <b className="font-display font-bold text-2xl text-accent tabular-nums">
              {count}
            </b>
            <span className="ml-1">{unit}</span>
          </span>
        ) : (
          <span className="font-body text-xs text-text-muted">—</span>
        )}
      </div>
      <p className="font-body text-sm text-text-secondary leading-6">
        {description}
      </p>
    </Link>
  );
}
