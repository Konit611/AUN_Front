import { cookies } from "next/headers";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import type { AdminArticle } from "@/app/lib/types";

export default async function AdminArticleListPage() {
  const cookie = (await cookies()).toString();
  const articles = await apiFetch<AdminArticle[]>("/admin/articles", { cookie });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
          読み物
        </h1>
        <Link
          href="/admin/articles/new"
          className="px-5 py-2.5 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent-hover transition-colors"
        >
          + 新規記事
        </Link>
      </div>

      <p className="font-body text-sm text-text-muted">全 {articles.length} 件</p>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-raised border-b border-border">
            <tr>
              <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
                タイトル
              </th>
              <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
                カテゴリ
              </th>
              <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
                日付
              </th>
              <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
                ブロック
              </th>
              <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
                {""}
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr
                key={a.slug}
                className="border-b border-border/50 last:border-b-0 hover:bg-surface-raised/50 transition-colors"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{a.emoji}</span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-body font-medium text-text-primary truncate">
                        {a.title}
                      </span>
                      <span className="font-body text-xs text-text-muted truncate">
                        /{a.slug}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 font-body text-sm text-text-secondary">
                  {a.categoryLabel}
                </td>
                <td className="px-5 py-4 font-body text-xs text-text-muted tabular-nums">
                  {a.date}
                </td>
                <td className="px-5 py-4 font-body text-xs text-text-muted">
                  {a.body.length} 個
                </td>
                <td className="px-5 py-4">
                  <Link
                    href={`/admin/articles/${a.slug}`}
                    className="text-accent font-body font-medium text-sm hover:underline"
                  >
                    編集
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 && (
          <p className="font-body text-sm text-text-muted text-center py-12">
            まだ記事が登録されていません
          </p>
        )}
      </div>
    </div>
  );
}
