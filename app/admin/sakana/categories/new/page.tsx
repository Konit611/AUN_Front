import Link from "next/link";
import SakanaCategoryForm from "@/app/components/admin/sakana-category-form";

export default function AdminSakanaCategoryNewPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/sakana/categories"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← カテゴリ一覧に戻る
      </Link>
      <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
        新規カテゴリを追加
      </h1>
      <SakanaCategoryForm />
    </div>
  );
}
