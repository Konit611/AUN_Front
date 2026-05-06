import { cookies } from "next/headers";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import type { AdminPairingCategory } from "@/app/lib/types";

export default async function AdminCategoryListPage() {
  const cookie = (await cookies()).toString();
  const categories = await apiFetch<AdminPairingCategory[]>(
    "/admin/pairing-categories",
    { cookie }
  );

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/pairing"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← ペアリング一覧に戻る
      </Link>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
          ペアリング カテゴリ
        </h1>
        <Link
          href="/admin/pairing/categories/new"
          className="px-5 py-2.5 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent-hover transition-colors"
        >
          + 新規カテゴリ
        </Link>
      </div>

      <p className="font-body text-sm text-text-muted">全 {categories.length} 件</p>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-raised border-b border-border">
            <tr>
              <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
                順序
              </th>
              <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
                ラベル
              </th>
              <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
                slug
              </th>
              <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
                タイトル
              </th>
              <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
                {""}
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr
                key={c.id}
                className="border-b border-border/50 last:border-b-0 hover:bg-surface-raised/50 transition-colors"
              >
                <td className="px-5 py-4 font-body text-xs text-text-muted tabular-nums">
                  {c.position}
                </td>
                <td className="px-5 py-4 font-body font-medium text-text-primary">
                  {c.label}
                </td>
                <td className="px-5 py-4 font-body text-xs text-text-muted">
                  {c.slug}
                </td>
                <td className="px-5 py-4 font-body text-sm text-text-secondary">
                  {c.title}
                </td>
                <td className="px-5 py-4">
                  <Link
                    href={`/admin/pairing/categories/${c.id}`}
                    className="text-accent font-body font-medium text-sm hover:underline"
                  >
                    編集
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && (
          <p className="font-body text-sm text-text-muted text-center py-12">
            まだカテゴリが登録されていません
          </p>
        )}
      </div>
    </div>
  );
}
