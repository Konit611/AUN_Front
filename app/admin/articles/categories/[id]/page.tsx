import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import type { AdminArticleCategory } from "@/app/lib/types";
import ArticleCategoryForm from "@/app/components/admin/article-category-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminArticleCategoryEditPage({ params }: Props) {
  const { id } = await params;
  const cookie = (await cookies()).toString();

  const categories = await apiFetch<AdminArticleCategory[]>(
    "/admin/article-categories",
    { cookie }
  );
  const category = categories.find((c) => c.id === parseInt(id, 10));
  if (!category) notFound();

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/articles/categories"
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
      <ArticleCategoryForm initial={category} />
    </div>
  );
}
