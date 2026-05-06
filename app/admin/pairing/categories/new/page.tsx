import Link from "next/link";
import CategoryForm from "@/app/components/admin/category-form";

export default function AdminCategoryNewPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/pairing/categories"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← カテゴリ一覧に戻る
      </Link>
      <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
        新規カテゴリを追加
      </h1>
      <CategoryForm />
    </div>
  );
}
