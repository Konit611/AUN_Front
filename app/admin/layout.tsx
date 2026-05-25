import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { apiFetch, ApiError } from "@/app/lib/api";
import type { MeUser } from "@/app/lib/types";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = (await cookies()).toString();
  let me: MeUser | null = null;
  try {
    me = await apiFetch<MeUser>("/auth/me", { cookie });
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      redirect("/login?next=/admin");
    }
    throw err;
  }
  if (!me?.is_admin) {
    redirect("/forbidden");
  }

  return (
    <div className="bg-bg min-h-screen">
      <div className="flex flex-col md:flex-row md:min-h-screen">
        <aside className="md:w-64 md:shrink-0 border-b md:border-b-0 md:border-r border-border bg-surface">
          <div className="p-6 md:p-8 flex flex-col gap-6 md:gap-8 md:sticky md:top-0">
            <div className="flex flex-col gap-1">
              <span className="font-body font-bold text-[10px] tracking-[2.4px] uppercase text-accent/60">
                AUN Admin
              </span>
              <h1 className="font-display font-bold text-2xl text-accent">
                管理画面
              </h1>
              <span className="font-body text-xs text-text-muted truncate">
                {me.email}
              </span>
            </div>

            <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
              <NavItem href="/admin" label="ダッシュボード" />
              <NavItem href="/admin/sake" label="日本酒" />
              <NavItem href="/admin/sake/flavors" label="└ 味わいタグ" />
              <NavItem href="/admin/sakana" label="肴帖" />
              <NavItem
                href="/admin/sakana/categories"
                label="└ カテゴリ"
              />
              <NavItem href="/admin/pairing" label="ペアリングガイド" />
              <NavItem
                href="/admin/pairing/categories"
                label="└ カテゴリ"
              />
              <NavItem href="/admin/articles" label="読み物" />
              <NavItem
                href="/admin/articles/categories"
                label="└ カテゴリ"
              />
              <NavItem href="/admin/data" label="データ管理" />
            </nav>

            <Link
              href="/"
              className="font-body text-xs text-text-muted hover:text-accent transition-colors"
            >
              ← サイトに戻る
            </Link>
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-12 max-w-[1280px]">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="shrink-0 px-4 py-2.5 rounded-lg font-body font-medium text-sm text-text-secondary hover:bg-surface-raised hover:text-accent transition-colors whitespace-nowrap"
    >
      {label}
    </Link>
  );
}
