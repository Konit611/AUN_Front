import { cookies } from "next/headers";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import type { AdminSakeListItem } from "@/app/lib/types";

export default async function AdminSakeListPage() {
  const cookie = (await cookies()).toString();
  const sakes = await apiFetch<AdminSakeListItem[]>("/admin/sakes", { cookie });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
          日本酒
        </h1>
        <Link
          href="/admin/sake/new"
          className="px-5 py-2.5 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent-hover transition-colors"
        >
          + 新規追加
        </Link>
      </div>

      <p className="font-body text-sm text-text-muted">全 {sakes.length} 件</p>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-raised border-b border-border">
            <tr>
              <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
                ID
              </th>
              <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
                銘柄
              </th>
              <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
                蔵元
              </th>
              <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
                種類
              </th>
              <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
                {""}
              </th>
            </tr>
          </thead>
          <tbody>
            {sakes.map((s) => (
              <tr
                key={s.id}
                className="border-b border-border/50 last:border-b-0 hover:bg-surface-raised/50 transition-colors"
              >
                <td className="px-5 py-4 font-body text-xs text-text-muted">
                  {s.id}
                </td>
                <td className="px-5 py-4 font-body font-medium text-text-primary">
                  {s.name}
                </td>
                <td className="px-5 py-4 font-body text-sm text-text-secondary">
                  {s.brewery}
                </td>
                <td className="px-5 py-4 font-body text-xs text-text-muted">
                  {s.type}
                </td>
                <td className="px-5 py-4">
                  <Link
                    href={`/admin/sake/${s.id}`}
                    className="text-accent font-body font-medium text-sm hover:underline"
                  >
                    編集
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sakes.length === 0 && (
          <p className="font-body text-sm text-text-muted text-center py-12">
            まだ日本酒が登録されていません
          </p>
        )}
      </div>
    </div>
  );
}
