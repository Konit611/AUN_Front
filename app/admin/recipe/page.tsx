import { cookies } from "next/headers";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import type { AdminRecipe } from "@/app/lib/types";

export default async function AdminRecipeListPage() {
  const cookie = (await cookies()).toString();
  const recipes = await apiFetch<AdminRecipe[]>("/admin/recipes", { cookie });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
          料理 / レシピ
        </h1>
        <Link
          href="/admin/recipe/new"
          className="px-5 py-2.5 rounded-full bg-accent text-white font-body font-medium text-sm hover:bg-accent-hover transition-colors"
        >
          + 新規追加
        </Link>
      </div>

      <p className="font-body text-sm text-text-muted">
        全 {recipes.length} 件
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
            {recipes.map((r) => (
              <tr
                key={r.id}
                className="border-b border-border/50 last:border-b-0 hover:bg-surface-raised/50 transition-colors"
              >
                <Td>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{r.emoji}</span>
                    <span className="font-body font-medium text-text-primary">
                      {r.name}
                    </span>
                  </div>
                </Td>
                <Td>
                  <span className="font-body text-xs text-text-muted tabular-nums">
                    {r.umami.toFixed(1)} / {r.fat.toFixed(1)} / {r.saltiness.toFixed(1)}
                  </span>
                </Td>
                <Td>
                  <span className="font-body text-xs text-text-muted">
                    {r.ingredients.length > 0 || r.steps.length > 0
                      ? `材料 ${r.ingredients.length} / 手順 ${r.steps.length}`
                      : "未登録"}
                  </span>
                </Td>
                <Td>
                  <Link
                    href={`/admin/recipe/${r.id}`}
                    className="text-accent font-body font-medium text-sm hover:underline"
                  >
                    編集
                  </Link>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
        {recipes.length === 0 && (
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
