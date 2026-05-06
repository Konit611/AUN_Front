import { cookies } from "next/headers";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import type { AdminSakana } from "@/app/lib/types";

export default async function AdminSakanaListPage() {
  const cookie = (await cookies()).toString();
  const sakanas = await apiFetch<AdminSakana[]>("/admin/sakana", { cookie });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
          肴帖
        </h1>
        <Link
          href="/admin/sakana/new"
          className="px-5 py-2.5 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent-hover transition-colors"
        >
          + 新規追加
        </Link>
      </div>

      <p className="font-body text-sm text-text-muted">
        全 {sakanas.length} 件
      </p>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-raised border-b border-border">
            <tr>
              <Th>料理名</Th>
              <Th>味わい (旨味/脂/塩)</Th>
              <Th>レシピ</Th>
              <Th>{""}</Th>
            </tr>
          </thead>
          <tbody>
            {sakanas.map((s) => (
              <tr
                key={s.id}
                className="border-b border-border/50 last:border-b-0 hover:bg-surface-raised/50 transition-colors"
              >
                <Td>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.emoji}</span>
                    <span className="font-body font-medium text-text-primary">
                      {s.name}
                    </span>
                  </div>
                </Td>
                <Td>
                  <span className="font-body text-xs text-text-muted tabular-nums">
                    {s.umami.toFixed(1)} / {s.fat.toFixed(1)} / {s.saltiness.toFixed(1)}
                  </span>
                </Td>
                <Td>
                  <span className="font-body text-xs text-text-muted">
                    {s.ingredients.length > 0 || s.steps.length > 0
                      ? `材料 ${s.ingredients.length} / 手順 ${s.steps.length}`
                      : "未登録"}
                  </span>
                </Td>
                <Td>
                  <Link
                    href={`/admin/sakana/${s.id}`}
                    className="text-accent font-body font-medium text-sm hover:underline"
                  >
                    編集
                  </Link>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
        {sakanas.length === 0 && (
          <p className="font-body text-sm text-text-muted text-center py-12">
            まだ料理が登録されていません
          </p>
        )}
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-5 py-3 font-body font-bold text-[10px] tracking-wider uppercase text-accent/60">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-5 py-4">{children}</td>;
}
