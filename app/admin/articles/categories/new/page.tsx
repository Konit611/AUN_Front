import Link from "next/link";
import ArticleCategoryForm from "@/app/components/admin/article-category-form";

export default function AdminArticleCategoryNewPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/articles/categories"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← カテゴリ一覧に戻る
      </Link>
      <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
        新規カテゴリを追加
      </h1>
      <ArticleCategoryForm />
    </div>
  );
}
