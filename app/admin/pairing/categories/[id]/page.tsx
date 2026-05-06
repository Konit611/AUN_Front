import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { apiFetch, ApiError } from "@/app/lib/api";
import type { AdminPairingCategory } from "@/app/lib/types";
import CategoryForm from "@/app/components/admin/category-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminCategoryEditPage({ params }: Props) {
  const { id } = await params;
  const cookie = (await cookies()).toString();

  let categories: AdminPairingCategory[];
  try {
    categories = await apiFetch<AdminPairingCategory[]>(
      "/admin/pairing-categories",
      { cookie }
    );
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw err;
  }
  const category = categories.find((c) => c.id === parseInt(id, 10));
  if (!category) notFound();

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/pairing/categories"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← カテゴリ一覧に戻る
      </Link>
      <div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
          {category.label}
        </h1>
        <p className="font-body text-xs text-text-muted mt-1">/{category.slug}</p>
      </div>
      <CategoryForm initial={category} />
    </div>
  );
}
