import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { apiFetch, ApiError } from "@/app/lib/api";
import type { AdminFlavor } from "@/app/lib/types";
import FlavorForm from "@/app/components/admin/flavor-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminFlavorEditPage({ params }: Props) {
  const { id } = await params;
  const cookie = (await cookies()).toString();

  let flavors: AdminFlavor[];
  try {
    flavors = await apiFetch<AdminFlavor[]>("/admin/flavors", { cookie });
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw err;
  }
  const flavor = flavors.find((f) => f.id === id);
  if (!flavor) notFound();

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/sake/flavors"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← タグ一覧に戻る
      </Link>
      <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
        {flavor.label}
      </h1>
      <FlavorForm initial={flavor} />
    </div>
  );
}
