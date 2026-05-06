import Link from "next/link";
import ArticleForm from "@/app/components/admin/article-form";

export default function AdminArticleNewPage() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/articles"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← 一覧に戻る
      </Link>
      <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
        新規記事を追加
      </h1>
      <ArticleForm />
    </div>
  );
}
