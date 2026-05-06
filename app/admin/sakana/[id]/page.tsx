import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { apiFetch, ApiError } from "@/app/lib/api";
import type { AdminSakana } from "@/app/lib/types";
import SakanaForm from "@/app/components/admin/sakana-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminSakanaEditPage({ params }: Props) {
  const { id } = await params;
  const cookie = (await cookies()).toString();

  let sakana: AdminSakana;
  try {
    sakana = await apiFetch<AdminSakana>(`/admin/sakana/${id}`, { cookie });
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/sakana"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← 一覧に戻る
      </Link>
      <div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
          {sakana.emoji} {sakana.name}
        </h1>
        <p className="font-body text-xs text-text-muted mt-1">
          ID: {sakana.id}
        </p>
      </div>
      <SakanaForm initial={sakana} />
    </div>
  );
}
