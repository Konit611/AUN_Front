import Link from "next/link";
import RecipeForm from "@/app/components/admin/recipe-form";

export default function AdminRecipeNewPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/recipe"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← 一覧に戻る
      </Link>
      <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
        新規料理を追加
      </h1>
      <RecipeForm />
    </div>
  );
}
