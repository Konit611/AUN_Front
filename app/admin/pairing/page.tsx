import { cookies } from "next/headers";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import type {
  AdminPairingCategory,
  AdminPairingItem,
} from "@/app/lib/types";

export default async function AdminPairingListPage() {
  const cookie = (await cookies()).toString();
  const [categories, items] = await Promise.all([
    apiFetch<AdminPairingCategory[]>("/admin/pairing-categories", { cookie }),
    apiFetch<AdminPairingItem[]>("/admin/pairings", { cookie }),
  ]);

  const byCat = new Map<number, AdminPairingItem[]>();
  for (const item of items) {
    const arr = byCat.get(item.categoryId) ?? [];
    arr.push(item);
    byCat.set(item.categoryId, arr);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
          ペアリングガイド
        </h1>
        <Link
          href="/admin/pairing/new"
          className="px-5 py-2.5 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent-hover transition-colors"
        >
          + 新規追加
        </Link>
      </div>

      <p className="font-body text-sm text-text-muted">
        全 {items.length} 件 / カテゴリ {categories.length} 件
      </p>

      <div className="flex flex-col gap-6">
        {categories.map((cat) => {
          const catItems = byCat.get(cat.id) ?? [];
          return (
            <div
              key={cat.id}
              className="bg-surface border border-border rounded-2xl overflow-hidden"
            >
              <div className="bg-surface-raised px-5 py-3 border-b border-border flex items-baseline gap-3">
                <h2 className="font-display font-bold text-base text-accent">
                  {cat.label}
                </h2>
                <span className="font-body text-xs text-text-muted">
                  {cat.title} · /{cat.slug}
                </span>
                <span className="font-body text-xs text-text-muted ml-auto">
                  {catItems.length} 件
                </span>
              </div>
              {catItems.length === 0 ? (
                <p className="px-5 py-6 font-body text-sm text-text-muted text-center">
                  このカテゴリにはまだ項目がありません
                </p>
              ) : (
                <ul>
                  {catItems.map((item) => (
                    <li
                      key={item.id}
                      className="border-b border-border/50 last:border-b-0 hover:bg-surface-raised/50 transition-colors"
                    >
                      <Link
                        href={`/admin/pairing/${item.id}`}
                        className="flex items-center gap-4 px-5 py-3"
                      >
                        <span className="text-2xl">{item.sakanaEmoji}</span>
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="font-body font-medium text-text-primary truncate">
                            {item.sakanaName}
                            <span className="text-text-muted">
                              {" × "}
                              {item.sakeName}
                            </span>
                          </span>
                          <span className="font-body text-xs text-text-muted truncate">
                            {item.temperature} / {item.season}
                          </span>
                        </div>
                        <span className="font-body text-sm text-accent">
                          編集
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
