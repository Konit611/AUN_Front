import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { apiFetch, ApiError } from "@/app/lib/api";
import type { AdminArticle } from "@/app/lib/types";
import ArticleForm from "@/app/components/admin/article-form";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminArticleEditPage({ params }: Props) {
  const { slug } = await params;
  const cookie = (await cookies()).toString();

  let article: AdminArticle;
  try {
    article = await apiFetch<AdminArticle>(`/admin/articles/${slug}`, { cookie });
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/articles"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← 一覧に戻る
      </Link>
      <div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
          {article.emoji} {article.title}
        </h1>
        <p className="font-body text-xs text-text-muted mt-1">
          /{article.slug} · {article.date}
        </p>
      </div>
      <ArticleForm initial={article} />
    </div>
  );
}
