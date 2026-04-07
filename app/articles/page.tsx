"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import {
  formatDate,
  type ArticleListItem,
  type ArticlesResponse,
  type CategoryFilter,
} from "@/app/lib/types";

type Article = ArticleListItem;

function ArticleCardFeatured({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block bg-surface border border-border rounded-tl-[48px] rounded-br-[48px] overflow-hidden hover:border-accent transition-colors"
    >
      <div className="md:flex">
        {/* Image */}
        <div className="md:w-1/2 h-[240px] md:h-[400px] bg-surface-raised flex items-center justify-center">
          <span className="text-7xl md:text-8xl group-hover:scale-110 transition-transform">
            {article.emoji}
          </span>
        </div>
        {/* Content */}
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-[10px] font-body font-bold tracking-widest uppercase rounded-full bg-accent/10 text-accent">
              {article.categoryLabel}
            </span>
            <span className="text-xs font-body text-text-muted">
              {article.readTime}
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl md:text-[32px] md:leading-[1.3] text-accent">
            {article.title}
          </h2>
          <p className="font-body text-sm text-text-secondary leading-relaxed">
            {article.subtitle}
          </p>
          <p className="font-body text-sm text-text-muted leading-relaxed line-clamp-3 md:line-clamp-4">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-body text-text-muted">
              {formatDate(article.date)}
            </span>
            <span className="font-body font-bold text-xs text-accent tracking-wider uppercase flex items-center gap-1">
              Read more
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block bg-surface border border-border rounded-tl-[32px] rounded-br-[32px] md:rounded-tl-[48px] md:rounded-br-[48px] overflow-hidden hover:border-accent transition-colors"
    >
      {/* Image */}
      <div className="h-[180px] md:h-[240px] bg-surface-raised flex items-center justify-center">
        <span className="text-5xl md:text-6xl group-hover:scale-110 transition-transform">
          {article.emoji}
        </span>
      </div>
      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="px-3 py-0.5 text-[10px] font-body font-bold tracking-widest uppercase rounded-full bg-accent/10 text-accent">
            {article.categoryLabel}
          </span>
          <span className="text-xs font-body text-text-muted">
            {article.readTime}
          </span>
        </div>
        <h3 className="font-display font-bold text-lg md:text-xl text-accent group-hover:text-accent-hover transition-colors">
          {article.title}
        </h3>
        <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-2">
          {article.subtitle}
        </p>
        <span className="text-xs font-body text-text-muted pt-1">
          {formatDate(article.date)}
        </span>
      </div>
    </Link>
  );
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<CategoryFilter[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    apiFetch<ArticlesResponse>("/articles")
      .then((data) => {
        setArticles(data.items);
        setCategoryFilters(data.filters.categories);
      })
      .catch(() => {});
  }, []);

  const filtered =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <div className="min-h-screen bg-bg">
      <div className="px-6 md:px-8 lg:px-12 pt-8 md:pt-16 pb-32 md:pb-24 max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-2 mb-8 md:mb-12">
          <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
            Articles & Stories
          </span>
          <h1 className="font-display font-bold text-[28px] md:text-[60px] md:leading-none md:tracking-tight text-accent">
            読みもの
          </h1>
          <p className="font-body text-sm text-text-secondary leading-relaxed mt-1">
            日本酒の世界を深く知るための読みもの。蔵元の物語、酒の知識、文化を紐解きます。
          </p>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-6 md:pb-10 -mx-6 px-6 md:mx-0 md:px-0">
          {categoryFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveCategory(f.key)}
              className={`px-6 py-2 rounded-full font-body font-medium text-sm whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === f.key
                  ? "bg-accent text-white"
                  : "bg-accent-light text-accent hover:bg-accent/20"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="font-body text-sm text-text-muted text-center py-24">
            記事がありません
          </p>
        ) : (
          <>
            {/* Featured article */}
            {featured && <ArticleCardFeatured article={featured} />}

            {/* Rest of articles */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
                {rest.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
