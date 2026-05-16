import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { apiFetch, ApiError } from "@/app/lib/api";
import type { AdminSakanaCategory } from "@/app/lib/types";
import SakanaCategoryForm from "@/app/components/admin/sakana-category-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminSakanaCategoryEditPage({ params }: Props) {
  const { id } = await params;
  const cookie = (await cookies()).toString();

  let categories: AdminSakanaCategory[];
  try {
    categories = await apiFetch<AdminSakanaCategory[]>(
      "/admin/sakana-categories",
      { cookie },
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
        href="/admin/sakana/categories"
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
      <SakanaCategoryForm initial={category} />
    </div>
  );
}
