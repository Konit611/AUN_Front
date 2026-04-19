import { notFound } from "next/navigation";
import Link from "next/link";
import DetailHeader from "@/app/components/layout/detail-header";
import { apiFetch } from "@/app/lib/api";
import {
  formatDate,
  type Article,
  type ArticlesResponse,
  type ArticleBlock,
} from "@/app/lib/types";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

function BlockRenderer({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="font-body text-base md:text-lg text-text-primary/85 leading-[1.9] md:leading-[2]">
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2 className="font-display font-bold text-xl md:text-2xl text-accent mt-4">
          {block.text}
        </h2>
      );
    case "image":
      return (
        <figure className="my-2">
          <div className="bg-surface-raised rounded-tl-[32px] rounded-br-[32px] h-[200px] md:h-[320px] flex items-center justify-center">
            <span className="text-6xl md:text-7xl">{block.emoji}</span>
          </div>
          <figcaption className="font-body text-xs text-text-muted text-center mt-3">
            {block.caption}
          </figcaption>
        </figure>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-accent pl-6 py-2 my-2">
          <p className="font-display text-lg md:text-xl text-accent/80 leading-relaxed italic">
            {block.text}
          </p>
          <cite className="font-body text-sm text-text-muted not-italic block mt-2">
            — {block.author}
          </cite>
        </blockquote>
      );
    default:
      return null;
  }
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { slug } = await params;

  let article: Article;
  let articlesResponse: ArticlesResponse;
  try {
    [article, articlesResponse] = await Promise.all([
      apiFetch<Article>(`/articles/${slug}`),
      apiFetch<ArticlesResponse>("/articles"),
    ]);
  } catch {
    notFound();
  }
  const related = articlesResponse.items
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-bg">
      <DetailHeader backHref="/articles" />
      {/* Hero */}
      <div className="bg-surface-raised">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <nav className="hidden md:flex items-center gap-2 text-xs font-body tracking-wider uppercase text-text-secondary pt-8">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Link
              href="/articles"
              className="hover:text-accent transition-colors"
            >
              読みもの
            </Link>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-bold text-accent">{article.categoryLabel}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 pt-8 md:pt-12 pb-12 md:pb-16">
            {/* Text */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-[10px] font-body font-bold tracking-widest uppercase rounded-full bg-accent/10 text-accent">
                  {article.categoryLabel}
                </span>
                <span className="text-xs font-body text-text-muted">
                  {article.readTime}
                </span>
              </div>
              <h1 className="font-display font-bold text-[28px] md:text-[48px] leading-[1.2] tracking-tight text-accent">
                {article.title}
              </h1>
              <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed">
                {article.subtitle}
              </p>
              <span className="text-sm font-body text-text-muted">
                {formatDate(article.date)}
              </span>
            </div>
            {/* Image */}
            <div className="md:w-[320px] lg:w-[400px] shrink-0">
              <div className="bg-bg rounded-tl-[48px] rounded-br-[48px] h-[200px] md:h-[300px] flex items-center justify-center">
                <span className="text-7xl md:text-8xl">{article.emoji}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <article className="max-w-[720px] mx-auto px-6 md:px-8 py-12 md:py-16 flex flex-col gap-6">
        {article.body.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t border-border bg-bg">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-16">
            <h2 className="font-display font-bold text-xl md:text-2xl text-accent mb-8">
              関連する記事
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/articles/${r.slug}`}
                  className="group flex gap-4 items-center bg-surface border border-border rounded-2xl p-4 hover:border-accent transition-colors"
                >
                  <div className="w-16 h-16 shrink-0 rounded-xl bg-surface-raised flex items-center justify-center">
                    <span className="text-2xl">{r.emoji}</span>
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="font-display font-bold text-base text-accent group-hover:text-accent-hover transition-colors truncate">
                      {r.title}
                    </h3>
                    <p className="font-body text-xs text-text-muted truncate">
                      {r.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pb-32 md:pb-16">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 font-body font-bold text-sm text-accent hover:text-accent-hover transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7 1L3 5L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          記事一覧に戻る
        </Link>
      </div>
    </div>
  );
}
