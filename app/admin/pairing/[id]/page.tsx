import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { apiFetch, ApiError } from "@/app/lib/api";
import type { AdminPairingItem } from "@/app/lib/types";
import PairingForm from "@/app/components/admin/pairing-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminPairingEditPage({ params }: Props) {
  const { id } = await params;
  const cookie = (await cookies()).toString();

  let item: AdminPairingItem;
  try {
    item = await apiFetch<AdminPairingItem>(`/admin/pairings/${id}`, { cookie });
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/pairing"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← 一覧に戻る
      </Link>
      <div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
          {item.recipeEmoji} {item.recipeName} × {item.sakeName}
        </h1>
        <p className="font-body text-xs text-text-muted mt-1">ID: {item.id}</p>
      </div>
      <PairingForm initial={item} />
    </div>
  );
}
